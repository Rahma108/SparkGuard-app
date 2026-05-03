import { RoleEnum } from "../../common/enums/user.enum.js";


export const endPoint = {
    //ALL
    profile: [RoleEnum.User, RoleEnum.Admin],

    //USER
    user: [RoleEnum.User],

    //ADMIN
    adminStats: [RoleEnum.Admin],

    predictions: [RoleEnum.Admin]
};