
// logic



import { decrypt } from "../../common/"
export const profile= async  (user)=>{
    user.phone = decrypt(user.phone)
    return user
}

