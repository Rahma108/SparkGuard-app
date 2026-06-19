import { BASE_URL } from "../../../config/config.service.js";
import { AdminApproachEnum } from "../../common/enums/email.enum.js";
import { RoleEnum } from "../../common/enums/user.enum.js";
import { NotFoundException , BadRequestException } from "../../common/utils/index.js";
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

const mapUser = (user) => {
    return {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
        profilePicture: user.profilePicture
            ? `${BASE_URL}/uploads/general/${user.profilePicture}`
            : null
    };
};

// Get All Users In DB...
export const getAllUsersService = async () => {
    const users = await UserModel.find({
        isDeleted: false,
        role: { $ne: RoleEnum.Admin }
    }).select("email role _id profilePicture status");

    return users.map(mapUser);
};

export const softDeleteUserService = async (userId) => {

    const user = await UserModel.findById(userId);

    if (!user) {
        throw NotFoundException({ message: "User not found" });
    }

    //  لو already deleted
    if (user.isDeleted || user.status === AdminApproachEnum.DELETED) {
        throw BadRequestException({
            message: "User is already deleted❕"
        });
    }

    //  لو rejected
    if (user.status === AdminApproachEnum.REJECTED) {
        throw BadRequestException({
            message: "Cannot delete a rejected user❌"
        });
    }

    //  الحالات المسموح بيها بس
    const allowedStatuses = [
        AdminApproachEnum.ACTIVE,
        AdminApproachEnum.PENDING,
        AdminApproachEnum.APPROVED
    ];

    if (!allowedStatuses.includes(user.status)) {
        throw BadRequestException({
            message: "User cannot be deleted in this state"
        });
    }

    //  حفظ الحالة القديمة
    user.previousStatus = user.status;

    //  soft delete
    user.status = AdminApproachEnum.DELETED;
    user.isDeleted = true;

    await user.save();

    return { message: "User deleted successfully" };
};

export const restoreUserService = async (userId) => {

    const user = await UserModel.findById(userId);

    if (!user) {
        throw NotFoundException({ message: "User not found ✖️" });
    }

    user.status = user.previousStatus || AdminApproachEnum.PENDING; 
    user.isDeleted = false;
    user.previousStatus = undefined; 

    await user.save();

    return {
        message: "User restored successfully"
    };
};

// Get all Users Deleted ... btn deleted
// getAllDeletedUsers
export const getAllDeletedUsers = async () => {
    const users = await UserModel.find({
        isDeleted: true,
        role: { $ne: RoleEnum.Admin }
    }).select("email role _id profilePicture status");

    return users.map(mapUser);
};
// getAllActivated
export const getAllActiveUsers = async () => {
    const users = await UserModel.find({
        status: AdminApproachEnum.ACTIVE,
        role: { $ne: RoleEnum.Admin }
    }).select("email role _id profilePicture status");

    return users.map(mapUser);
};

export const getAllRejectedUsers = async () => {
    const users = await UserModel.find({
        status: AdminApproachEnum.REJECTED,
        role: { $ne: RoleEnum.Admin}
    }).select("email role _id status");

    return users.map(({ _id, email, role, status }) => ({
        id: _id,
        email,
        role,
        status
    }));
};