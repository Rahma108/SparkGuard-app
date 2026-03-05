
// logic--- queries ....
import {User}
export const signup =async (inputs)=>{
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


  return []
}

export const login = async(inputs)=>{
   return []

}
