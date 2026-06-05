import { AdminApproachEnum } from "../../common/enums/email.enum.js";
import { RoleEnum } from "../../common/enums/user.enum.js";
import { NotFoundException } from "../../common/utils/index.js";
import { UserModel } from "../../DB/index.js";
import { PredictionModel } from "../../DB/model/prediction.model.js";

export const getStatsService = async () => {
    const total = await PredictionModel.countDocuments();

    const theft = await PredictionModel.countDocuments({
        result: "not normal"
    });

    const normal = await PredictionModel.countDocuments({
        result: "normal"
    });

    return {
        total,
        theft,
        normal
    };
};


export const getPredictionsService = async () => {
    const data = await PredictionModel.find()
        .select("prediction confidence variation -_id")
        .sort({ createdAt: -1 });

    return data.map(item => ({
        prediction: item.prediction,
        confidence: item.confidence,
        variation: item.variation
    }));
};

// Get All Users In DB...
export const getAllUsersService = async () => {
    const users = await UserModel.find({ isDeleted: false , role: { $ne: RoleEnum.Admin } })
        .select("email role _id");

    return users.map(user => ({
        id: user._id,
        email: user.email,
        role: user.role
    }));
};


export const softDeleteUserService = async (userId) => {
    const user = await UserModel.findByIdAndUpdate(
        userId,
        { isDeleted: true  , status: AdminApproachEnum.PENDING },
        { new: true }
    );

    if (!user) {
        throw NotFoundException({ message: "User not found" });
    }

    return { message: "User deleted successfully" };
};


export const restoreUserService = async (userId) => {

    const user = await UserModel.findByIdAndUpdate(
        userId,
        { isDeleted: false , status: AdminApproachEnum.ACTIVE },
        { new: true }
    );

    if (!user) {
        throw NotFoundException({ message: "User not found ✖️" });
    }

    return {
        message: "User restored successfully"
    };
};



// Get all Users Deleted ... btn deleted
// getAllDeletedUsers
export const getAllDeletedUsers= async () => {
    const users = await UserModel.find({ isDeleted: true , role: { $ne: RoleEnum.Admin } })
        .select("email role _id");

    return users.map(user => ({
        id: user._id,
        email: user.email,
        role: user.role
    }));
};

// getAllActivated
export const getAllActiveUsers= async () => {
    const users = await UserModel.find({ status: AdminApproachEnum.ACTIVE , role: { $ne: RoleEnum.Admin } })
        .select("email role _id status");

    return users.map(user => ({
        id: user._id,
        email: user.email,
        role: user.role,
        status:user.status
    }));
};