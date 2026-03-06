
// logic


   export const profile= async  (user)=>{
    user.phone = decrypt(user.phone)
    return user
}
}
