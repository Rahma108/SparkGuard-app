<<<<<<< HEAD
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



=======
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



>>>>>>> d999e0648c20aa5e0c5ea4b62cd27880d6db0d49
