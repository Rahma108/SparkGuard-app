
// logic--- queries ....
import { ClientID } from "../../../config/config.service.js"
import { create, createOne, findOne, UserModel } from "../../DB/index.js"
import { ProviderEnum } from "../../common/enums/user.enum.js"
import { ConflictException, NotFoundException} from "../../common/utils/response/index.js"
import {  generateHash  , encrypt, decrypt, compareHash, createLoginCredentials} from "../../common/utils/security/index.js"
import { sendOtpFunction } from "../otp/otp.service.js"
export const signup = async (inputs)=>{
  // UserName , email , password , confirmPassword  , phone required , gender optional , role optional
  const {userName , email ,  password , phone , gender , role  } = inputs 
  const checkEmailExists = await findOne({
    model:UserModel ,
    select :"email" ,
    filter:{email} ,
    options:{
      lean:true 
    }
  })
  if(checkEmailExists){
    throw  ConflictException({message:"Email Already Exists ‼️"})

  }
  // Store
  const [user] = await create({ model:UserModel 
    , data : [{userName , email , password: await generateHash(password) , gender , phone : phone ? encrypt(phone) : null
        , Provider: ProviderEnum.System  , role:role }] })
    // Send a verification code to email after registration
        await sendOtpFunction({ email: user.email });
   return user
}


export const login = async(inputs , issuer)=>{
  const {email , password} = inputs 
  const user = await findOne({
    model:UserModel ,
    filter:{email ,Provider:ProviderEnum.System}
  })
  if(!user){
    throw NotFoundException({message:"Invalid Login Credentials ❌"})
  }
  //Decrypt Phone
  if (user.phone) user.phone = decrypt(user.phone);
  //Hash Password
  const match = await compareHash(password , user.password )
  if(!match){
        throw NotFoundException({message : "Invalid Login Credentials .❌"})
  }
      // Token 
  return await createLoginCredentials(user , issuer)
}


const verifyGoogleAccount = async(idToken)=>{
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken,
        audience: ClientID , 
    });
    const payload = ticket.getPayload();
    console.log(payload);
    if(!payload?.email_verified){
      throw BadRequestException({message:"Fail to verify authenticated this account with google 🫠"})

    }
    return payload


}

export const loginWithGmail = async({idToken , issuer})=>{
  if (!idToken) {
    throw new BadRequestException({ message: "idToken is required" });
}
  const payload = await verifyGoogleAccount(idToken)
  const user = await findOne({model:UserModel , email:payload.email  , provider:ProviderEnum.Google })
  if(!user){
    throw NotFoundException({message : "Invalid Login Credentials ."})

  }

  return await createLoginCredentials(user, issuer) 
}


export const signupWithGmail = async({idToken , issuer})=>{
  if (!idToken) {
    throw new BadRequestException({ message: "idToken is required" });
}
const payload = await verifyGoogleAccount(idToken)

//  1- User Exists in Database  And Provider == System  ==> Throw Error ..
//  2- User Exists in Database  And Provider == Google  ==> Redirect google Login 
//  3- User Not Exists ==> Create with Provider Google .

  const checkUserExist = await findOne({model:UserModel , email:payload.email })
  if(checkUserExist){
    // 1- User Exists in Database  And Provider == System  ==> Throw Error ..
    if(checkUserExist.provider == ProviderEnum.System){
    throw ConflictException({message:"Account Already Exist With Different Provider ‼️"})

  }
  // 2- User Exists in Database  And Provider == Google  ==> Redirect google Login 
  // const result = await loginWithGmail({idToken} , issuer )

  // return {result , status:200 }
    const token = await createLoginCredentials(checkUserExist, issuer);
    return { account: token, status: 200 };

  }

  //  3- User Not Exists ==> Create with Provider Google .
  // New user → create + login
  const newUser = await createOne({
    model: UserModel,
    data: {
      firstName: payload.given_name || '',
      lastName: payload.family_name || '',
      email: payload.email,
      provider: ProviderEnum.Google,
      profilePicture: payload.picture,
      confirmEmail: new Date()
    }
  });

  const token = await createLoginCredentials(newUser, issuer);
  return { account: token , status: 201 };

  //token

}