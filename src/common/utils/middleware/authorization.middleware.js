// import { forbiddenException } from "../response/error.response.js"
// export const authorization =  ( )=>{
//     return async  (req , res , next )=>{
//         if (!req.user) {
//             throw forbiddenException({message:"User not logged in" })
//     }
//     next();

//     }
// }

import { forbiddenException } from "../response/error.response.js";

export const authorization = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
        if (!req.user) {
            throw forbiddenException({ message: "User not logged in" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw forbiddenException({ message: "Access denied" });
        }

        next();
        } catch (error) {
        next(error);
        }
    };
};