
// logic--- queries ....
import { create, findOne, UserModel } from "../../DB/index.js"
import { ProviderEnum } from "../../common/enums/user.enum.js"
import { ConflictException} from "../../common/utils/response/index.js"
import {  generateHash  , encrypt} from "../../common/utils/security/index.js"
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
    , data : [{userName , email , password: await generateHash(password) , gender , phone : encrypt(phone) 
        , Provider: ProviderEnum.System  , role:role }] })
    // Send a verification code to email after registration
        await sendOtpFunction({ email: user.email });
   return user
}

export const login = async(inputs)=>{
  const {email , password} = inputs 
  const user = await findOne({
    model:UserModel ,
    filter:{email ,Provider:ProviderEnum.System}
  })
  if(!user){
    
  }
  




  
  return []

}
