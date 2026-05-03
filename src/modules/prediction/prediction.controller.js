import {Router} from 'express'
import { checkReadingsService } from './prediction.service.js';
import { authentication, authorization, BadRequestException, successResponse } from '../../common/utils/index.js';
import { endPoint } from '../user/user.authorization.js';


const router = Router() 

// app.use('/predict', predictionRouter) 
// http://44.205.57.36/predict
router.post("/",authentication() , authorization(endPoint.user), async (req, res, next) => {
    try {
        const { readings } = req.body;
        if (!readings || !Array.isArray(readings)) {
            throw BadRequestException("readings must be an array")
        }
        const result = await checkReadingsService(readings);

        return successResponse({res , result})

    } catch (error) {
        next(error);
    }
});


export default router

