
// logic--- queries ....
import { UserModel } from "../../DB/index.js"
import { ProviderEnum } from "../../common/enums/user.enum.js"
import { BadRequestException, ConflictException, NotFoundException } from "../../common/utils/response/index.js"
import { compareHash, generateHash  , encrypt , decrypt, createLoginCredentials} from "../../common/utils/security/index.js"

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
  const [user] = await create({ model:UserModel 
    , data : [{userName , email , password: await generateHash(password) , gender , phone : encrypt(phone) 
        , Provider: ProviderEnum.System  , role:role }] })
  
  return []
}

export const login = async(inputs)=>{
   return []

}
