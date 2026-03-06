
// logic



import { decrypt } from "../../common/utils/"
export const profile= async  (user)=>{
    user.phone = decrypt(user.phone)
    return user
}

