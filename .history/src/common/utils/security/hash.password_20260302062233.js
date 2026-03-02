
// npm i bcrypt to hash password ....

// Don’t forget to hash the password 

import bcrypt from 'bcrypt'
const saltRounds = 10;

//Hash password 
export const HashPassword = async (password)=>{
    return await bcrypt.hash(password , saltRounds)
}
// compare 
export const ComparePasswordWithHash = async(password , HashPassword)=>{
    return await bcrypt.compare(password , HashPassword)
}



