
// logic--- queries ....
import { ACTIVATION_SECRET, Admin_TOKEN_SECURITY_KEY, BASE_URL } from "../../../config/config.service.js"
import { create, createOne, findOne, findOneAndUpdate, UserModel } from "../../DB/index.js"
import { AdminApproachEnum, EmailEnum } from "../../common/enums/index.js"
import { ProviderEnum, RoleEnum } from "../../common/enums/user.enum.js"
import { baseRevokeTokenKey, deleteKeys, get, increment, keys, otpBlockKey, otpKey, otpMaxRequestKey, set, ttl} from "../../common/services/index.js"
import { sendApprovalEmail } from "../../common/utils/email/adminApproval.email.js"
import { createNumberOtp, emailEmitter, emailTemplate, sendEmail} from "../../common/utils/index.js"
import { BadRequestException, ConflictException, NotFoundException, UnauthorizedException} from "../../common/utils/response/index.js"
import {  generateHash , compareHash, createLoginCredentials, verifyToken, generateToken} from "../../common/utils/security/index.js"
export const verifyEmailOtp = async({ email , subject=EmailEnum.ConfirmEmail , title = "Verify Account" }={} )=>{
       //Check Block Conditional .
      const blockKey= otpBlockKey({email , type:subject })
      const remainingBlockTime = await ttl(blockKey)
      if(remainingBlockTime>0){
          throw ConflictException({message:`You have reached Max Request Trial Count please try again later after ${remainingBlockTime} sec. `})
      }

      const oldCodeTTL = await ttl(otpKey({email , type:subject}))
      if(oldCodeTTL > 0 ){
          throw ConflictException({message:`Sorry we can not send new otp until first one get expired please try again after ${oldCodeTTL} `})

      }
      //check Max Request Trials 
      const maxTrialKey = otpMaxRequestKey({email , type:subject })
        const checkOtpMaxRequest = Number(await get(maxTrialKey) || 0 )
        if(checkOtpMaxRequest>=3){
              await set({
              key:  blockKey , 
              value : 0
            , ttl:300 })
    
          throw ConflictException({message:"You have reached Max Request Trial Count please try again later after 300 sec. "})

        }
      const code = await createNumberOtp()
        await set({
          key: otpKey({email , type:subject }) , 
          value : await generateHash(code.toString())
        , ttl: 120
      })
        await sendEmail({
            to:email ,
            subject,
            html:emailTemplate({code , title })
        })
      checkOtpMaxRequest  > 0 ? await increment(maxTrialKey): await set({key : maxTrialKey , value : 1 , ttl : 300 })
      return ;
}


export const signup = async (inputs) => {
  const { userName, email, password } = inputs;

  const exists = await findOne({
    model: UserModel,
    filter: { email }
  });

  if (exists) {
    throw ConflictException({ message: "Email already exists ‼️" });
  }

  const user = await create({
  model: UserModel,
  data: {
    userName,
    email,
    password: await generateHash(password),
    provider: ProviderEnum.System,
    status: AdminApproachEnum.PENDING
  }
});

  return {
    message: "Signup successful, waiting for admin approval ⏳"
  };
};

export const approveUser = async (userId) => {

  const user = await findOne({
    model: UserModel,
    filter: { _id: userId }
  });

  if (!user) {
    throw NotFoundException({ message: "User not found ❌" });
  }

  //  ممنوع admin يتأثر
  if (user.role === RoleEnum.Admin) {
    throw BadRequestException({ message: "Admins cannot be activated ❌" });
  }

  user.status = AdminApproachEnum.APPROVED;
  await user.save();

  const token = await generateToken({
    payload: {
      userId: user._id.toString(),
      type: "ACTIVATION"
    },
    secretKey: ACTIVATION_SECRET,
    options: { expiresIn: "1h" }
  });

  const link = `${BASE_URL}/auth/activate?token=${token}`;

  emailEmitter.emit("sendEmail", async () => {
    await sendApprovalEmail({
      email: user.email,
      name: user.userName,
      link
    });
  });

  return { message: "User approved successfully 🚀" };
};
export const activateAccount = async (token) => {

  const decoded = await verifyToken({
    token,
    secretKey: ACTIVATION_SECRET
  });

  if (decoded.type !== "ACTIVATION") {
    throw BadRequestException({ message: "Invalid token ❌" });
  }

  const user = await findOne({
    model: UserModel,
    filter: {
      _id: decoded.userId,
      role: RoleEnum.User  
    }
  });

  if (!user) {
    throw NotFoundException({ message: "User not found ❌" });
  }

  // activate ONLY user
  user.status = AdminApproachEnum.ACTIVE;
  await user.save();

  return { message: "Account activated successfully ✔️" };
};


export const login = async (inputs, issuer) => {
  const { email, password } = inputs;

  // 1. find user
  const user = await findOne({
    model: UserModel,
    filter: { email, Provider: ProviderEnum.System }
  });

  if (!user) {
    throw NotFoundException({ message: "Invalid credentials ❌" });
  }

  // 2. password check
  const match = await compareHash(password, user.password);

  if (!match) {
    throw NotFoundException({ message: "Invalid credentials ❌" });
  }

  // 3. admin bypass
  const isAdmin = user.role === RoleEnum.Admin;

  // 4. USER ONLY status logic
  if (!isAdmin) {
    switch (user.status) {
      case AdminApproachEnum.PENDING:
        throw UnauthorizedException({
          message: "Account not approved yet ⏳"
        });

      case AdminApproachEnum.REJECTED:
        throw UnauthorizedException({
          message: "Account rejected ❌"
        });

      case AdminApproachEnum.APPROVED:
        throw UnauthorizedException({
          message: "Account not activated yet ⚡"
        });

      case AdminApproachEnum.ACTIVE:
        break;

      default:
        throw UnauthorizedException({
          message: "Invalid account status"
        });
    }
  }

  // 6. generate tokens
  return await createLoginCredentials(user, issuer);
};
// export const reSendConfirmEmail = async(inputs)=>{
//   const {email} = inputs
//     const account = await findOne({
//     model:UserModel ,
//     select :"email" ,
//     filter:{email , confirmEmail: { $eq: null } , Provider:ProviderEnum.System } 
//   })
//   if(!account){
//     throw NotFoundException({message:"Fail to find Match account ❌"})
//   }
//     // Re-Send a verification code to email after registration
//   await verifyEmailOtp({email})
//   return ;
// }

// Forget Password ...
// 1- Request Code ..
// 2- Verify Code ...
// 3- Update Code ..

export const requestForgotPasswordCode = async({email})=>{
    const account = await findOne({
    model:UserModel ,
    select :"email" ,
    filter:{email , confirmEmail:{ $ne: null } , Provider:ProviderEnum.System } 
  })
  if(!account){
    throw NotFoundException({message:"Fail to find Match account ❌"})
  }
  emailEmitter.emit("sendEmail" ,async ()=>{
          await verifyEmailOtp({email , subject:EmailEnum.ForgotPassword })
      })
  return ;
}

export const verifyForgotPasswordCode = async({email , otp })=>{
  const hashOtp = await get(otpKey({email , type:EmailEnum.ForgotPassword }))
  if(!hashOtp){
    throw NotFoundException({message : "Expired OTP ❌"})
  }
  if(!await compareHash(otp , hashOtp )){
      throw ConflictException({message:"Invalid OTP 😊"})
  }
  return ;
}


export const resendForgotPasswordCode= async({email , otp , password })=>{
    await verifyForgotPasswordCode({email ,otp })
    const account = await findOneAndUpdate({
      model:UserModel ,
      filter :{email , confirmEmail:{ $ne: null } , Provider:ProviderEnum.System } ,
      update:{
        password:await generateHash(password),
        changeCredentialTime:new Date() // All Logout
      }

    })
    if(!account){
      throw NotFoundException({message:"Fail to find Match account ❌"})
    }
    Promise.allSettled([
          deleteKeys(await keys((otpKey({email , type:EmailEnum.ForgotPassword })))),
          deleteKeys(await keys(baseRevokeTokenKey(account._id.toString())))
    ])
  return ;
}




