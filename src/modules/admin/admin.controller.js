import {Router} from 'express'
import { authentication, authorization, successResponse } from '../../common/utils/index.js';
import { getAllDeletedUsers, getAllUsersService, getPredictionsService, getStatsService, restoreUserService, softDeleteUserService } from './admin.service.js';
import { endPoint } from '../user/user.authorization.js';
import { approveUser } from '../auth/auth.service.js';


const router = Router() 

router.patch(
    "/approve/:id",
    authentication(),
    async (req, res) => {
        const result = await approveUser(req.params.id);
        return successResponse({ res, result });
    }
);

// GET /admin/stats
// total predictions
// theft (not normal)
// normal
// /admin/stats
router.get("/stats",authentication(),authorization(endPoint.adminStats),async (req, res, next) => {
    try {
        const result = await getStatsService();
        return successResponse({ res, result });
    } catch (error) {
        next(error);
    }
});

// GET /admin/predictions
// {
//      "prediction": 0,
//       "confidence": 1,
//       "variation": 0
// }
// GET /admin/predictions
router.get(
    "/predictions",
    authentication(),
    authorization(endPoint.predictions),
    async (req, res, next) => {
        try {
        const result = await getPredictionsService();
        return successResponse({ res, result });

        } catch (error) {
        next(error);
        }
    }
);


//  GET /admin/users
router.get(
    "/users",
    authentication(),
    authorization(endPoint.adminStats),
    async (req, res, next) => {
        try {
        const result = await getAllUsersService();
        return successResponse({ res, result });
        } catch (error) {
        next(error);
        }
    }
);


//  DELETE /admin/users/:id
router.delete(
    "/users/:id",
    authentication(),
    authorization(endPoint.adminStats),
    async (req, res, next) => {
        try {
        const { id } = req.params;
        const result = await softDeleteUserService(id);

        return successResponse({ res, result });
        } catch (error) {
        next(error);
        }
    }
);

// restore user

// PATCH /admin/users/:id/restore
router.patch(
    "/users/:id/restore",
    authentication(),
    authorization(endPoint.adminStats),
    async (req, res, next) => {
        try {
        const { id } = req.params;

        const result = await restoreUserService(id);

        return successResponse({ res, result });

        } catch (error) {
        next(error);
        }
    }
);


// Get all Users Deleted ... btn deleted

router.get(
    "/deletedUsers",
    authentication(),
    authorization(endPoint.adminStats),
    async (req, res, next) => {
        try {
        const result = await getAllDeletedUsers();
        return successResponse({ res, result });
        } catch (error) {
        next(error);
        }
    }
);


export default router

