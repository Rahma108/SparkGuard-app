
// logic
import { decrypt } from "../../common/utils/security/index.js"
export const profile= async  (user)=>{
    user.phone = decrypt(user.phone)
    return user
}


