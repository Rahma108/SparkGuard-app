
// logic

import { decrypt } from "dotenv"


export const profile= async  (user)=>{
    user.phone = decrypt(user.phone)
    return user
}

