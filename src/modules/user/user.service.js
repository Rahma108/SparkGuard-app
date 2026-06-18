
// logic

import { createLoginCredentials} from "../../common/utils/security/token.security.js";
import { LogoutEnum } from '../../common/enums/security.enum.js';
import {baseRevokeTokenKey, deleteKeys, keys, revokeTokenKey, set} from '../../common/services/index.js'
import { compareHash, ConflictException, decrypt, generateHash } from "../../common/utils/index.js";
import { ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN } from "../../../config/config.service.js";
import fs from 'fs'
import path, { resolve } from 'node:path';


export const updatePassword= async  ({oldPassword , password} , user , issuer )=>{
    if (!await compareHash(oldPassword , user.password )) {
        throw ConflictException({message:"Invalid Old Password ❌"})
    }
    for (const hash of user.oldPasswords || [] ) {
        if (await compareHash(password , hash )) {
        throw ConflictException({message:"Sorry This Password Is Weak you have already used it before ‼️"})
    }
    }
    user.oldPasswords.push(user.password)
    user.password = await generateHash(password)
    user.changeCredentialTime = new Date() // Logout ..
    await user.save()
    await deleteKeys(await keys(baseRevokeTokenKey(user._id)))
    return await createLoginCredentials(user , issuer)
}

export const dashboard = async () => {
    const data = {
        totalScans: 0,
        gridHealth: "98%",
        aiAccuracy: "94.2%",
        region: "Zone-A"
    }

    return data
}
export const profile= async  (user)=>{
    if (!user) {
    throw new Error("User not found");
    }
    if (user.phone) user.phone = decrypt(user.phone);
    return  {userName: user.userName,
    email: user.email}
}


export const updatedProfile= async  (user , data)=>{
    const { userName } =data
    if (!userName) {
        throw new Error("userName is required")
    }
    user.userName = userName
    await user.save()
    return {
        userName: user.userName,
        email: user.email
    }
}


const BASE_PATH = resolve("./uploads/general");

export const profilePicture = async (file, user) => {

    if (!file) {
        throw new Error("No file uploaded ❌");
    }

    // حذف القديمة
    if (user.profilePicture) {
        const oldPath = resolve(BASE_PATH, user.profilePicture);

        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
        }
    }

    // DB: نخزن filename فقط
    user.profilePicture = file.filename;
    await user.save();

    return {
        message: "Profile picture uploaded successfully ✅",
        finalPath: file.finalPath,         
        filename: file.filename
    };
};
export const removeProfilePicture = async (user) => {

    if (!user.profilePicture) {
        throw new Error("Profile Picture is Not Found ❌");
    }

    const imagePath = resolve(BASE_PATH, user.profilePicture);

    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }

    user.profilePicture = null;
    await user.save();

    return {
        message: "Profile picture removed successfully ✅"
    };
};

export const createRevokeToken = async( { userId ,jti , ttl  })=>{
    await set({
                key: revokeTokenKey({userId, jti}),
                value : jti ,
                ttl 
            })
    return ;
}
export const rotateToken = async  (user , {iat , jti , subject } , issuer)=>{
    if((iat+ ACCESS_EXPIRES_IN )* 1000 >= Date.now() + (30000)  ){
        throw ConflictException({message: "Current access token still valid "})
    }
    await createRevokeToken({userId:subject , jti , ttl:iat  + REFRESH_EXPIRES_IN })
    return await createLoginCredentials(user , issuer )
}

export const logout = async({flag}, user, {iat , jti ,subject}) => {
    // use consistent userId from decoded token
    let status = 200
    switch (flag) {
        case LogoutEnum.All:
            user.changeCredentialTime= new Date(Date.now()) 
            await user.save()

            await deleteKeys(await keys(baseRevokeTokenKey(subject)))
            break;
    
        default:
            await createRevokeToken({userId:subject , jti , ttl:iat  + REFRESH_EXPIRES_IN })
            status=201
            break;
        }
    return status
}
