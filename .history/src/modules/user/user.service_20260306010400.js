
// logic
import { createLoginCredentials, decrypt } from "../../common/utils/security/index.js"
export const profile= async  (user)=>{
    user.phone = decrypt(user.phone)
    return user
}

export const rotateToken = async  (user, issuer)=>{
    return await createLoginCredentials(user , issuer )
}


