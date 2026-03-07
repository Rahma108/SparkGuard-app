
// logic

import { createLoginCredentials} from "../../common/utils/security/token.security.js";
import { createOne, deleteMany} from "../../DB/index.js";
import { TokenModel } from '../../DB/model/index.js';
import { REFRESH_EXPIRES_IN } from '../../../config/config.service.js';
import { LogoutEnum } from '../../common/enums/security.enum.js';
import { decrypt } from "../../common/utils/index.js";
export const profile= async  (user)=>{
      if (!user) {
    throw new Error("User not found");
  }
   if (user.phone) user.phone = decrypt(user.phone);
    return user
}

export const rotateToken = async  (user, issuer)=>{
    return await createLoginCredentials(user , issuer )
}


export const logout = async({flag}, user, decoded) => {
    // use consistent userId from decoded token
    const userId = decoded.sub || decoded.subject;

    if (!userId || !decoded?.jti || !decoded?.iat) {
        throw new Error("Invalid decoded token: missing sub/subject, jti, or iat");
    }

    let status = 200;

    switch (flag) {
        case LogoutEnum.All:
            // revoke all tokens by updating changeCredentialTime and deleting token entries
            user.changeCredentialTime = new Date();
            await user.save();

            await deleteMany({ 
                model: TokenModel, 
                filter: { userId: user._id } 
            });
            break;

        default:
            // revoke current token
            await createOne({
                model: TokenModel,
                data: {
                    userId: userId, 
                    jwtid: decoded.jti,
                    expiresIn: new Date((decoded.iat + REFRESH_EXPIRES_IN) * 1000)
                }
            });
            status = 201;
            break;
    }

    return status;
}
