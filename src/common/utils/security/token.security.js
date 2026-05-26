import jwt from 'jsonwebtoken'
import { RoleEnum } from '../../enums/user.enum.js'
import { ACCESS_EXPIRES_IN, Admin_REFRESH_TOKEN_SECURITY_KEY, Admin_TOKEN_SECURITY_KEY, REFRESH_EXPIRES_IN, User_REFRESH_TOKEN_SECURITY_KEY , User_TOKEN_SECURITY_KEY } from '../../../../config/config.service.js'
import { AudienceEnum, TokenTypeEnum } from '../../enums/security.enum.js'
import { BadRequestException, UnauthorizedException } from '../response/error.response.js'
import { findOne } from '../../../DB/database.repository.js'
import { UserModel } from '../../../DB/index.js'
import {randomUUID} from 'node:crypto'
import { get, revokeTokenKey } from '../../services/index.js'




export const generateToken = async ({payload = {} , secretKey , options = {}  })=>{
    return  jwt.sign(payload , secretKey , options )
}

export const verifyToken = async ({token , secretKey  } = {} )=>{
    return  jwt.verify(token ,  secretKey )
}
export const getTokenSignature = async (role) => {

    if (role === RoleEnum.Admin) {
        return {
        accessSignature: Admin_TOKEN_SECURITY_KEY,
        refreshSignature: Admin_REFRESH_TOKEN_SECURITY_KEY,
        audience: AudienceEnum.Admin
        };
    }

    return {
        accessSignature: User_TOKEN_SECURITY_KEY,
        refreshSignature: User_REFRESH_TOKEN_SECURITY_KEY,
        audience: AudienceEnum.User
    };
};

// export const getTokenSignatureLevel = async () => {
//     return RoleEnum.User
// }

export const createLoginCredentials = async (user, issuer) => {
    if (typeof issuer !== "string") {
        throw new Error("Issuer must be string");
    }

    const { accessSignature, refreshSignature, audience } =
        await getTokenSignature(user.role);

    const jwtId = randomUUID();

    const access_token = await generateToken({
        payload: {
            sub: user._id.toString(),
            role: user.role
        },
        secretKey: accessSignature,
        options: {
            issuer,
            audience: [TokenTypeEnum.access, audience],
            expiresIn: ACCESS_EXPIRES_IN,
            jwtid: jwtId
        }
    });

    const refresh_token = await generateToken({
        payload: {
            sub: user._id.toString()
        },
        secretKey: refreshSignature,
        options: {
            issuer,
            audience: [TokenTypeEnum.refresh, audience],
            expiresIn: REFRESH_EXPIRES_IN,
            jwtid: jwtId
        }
    });

    return { access_token, refresh_token };
};

export const decodeToken = async ({
    token,
    tokenType = TokenTypeEnum.access
} = {}) => {

    // 1. decode first (cheap)
    const decoded = jwt.decode(token);

    if (!decoded?.aud?.length) {
        throw BadRequestException({ message: "Invalid token audience" });
    }

    const [decodedType, audience] = decoded.aud;

    if (decodedType !== tokenType) {
        throw BadRequestException({ message: "Invalid token type" });
    }

    // 2. determine role safely
    const role =
        audience === AudienceEnum.Admin
            ? RoleEnum.Admin
            : RoleEnum.User;

    const { accessSignature, refreshSignature } =
        await getTokenSignature(role);

    // 3. verify AFTER selecting correct secret
    const verifiedData = await verifyToken({
        token,
        secretKey:
            tokenType === TokenTypeEnum.refresh
                ? refreshSignature
                : accessSignature
    });

    // 4. find user (FIXED: use sub)
    const user = await findOne({
        model: UserModel,
        filter: { _id: verifiedData.sub }
    });

    if (!user) {
        throw UnauthorizedException({ message: "User not found" });
    }

    // 5. session check
    if (
        user.changeCredentialTime &&
        user.changeCredentialTime.getTime() > decoded.iat * 1000
    ) {
        throw UnauthorizedException({ message: "Session expired" });
    }

    return { user, decoded };
};