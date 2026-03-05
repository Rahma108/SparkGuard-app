
import {Router} from 'express'
import { login, signup } from './auth.service.js'
import { successResponse } from '../../common/utils/response/success.response.js'
import * as validators from './auth.validation.js'
import { validation } from '../../common/utils/middleware/validation.middleware.js'
const router = Router() 
router.post('/signup', validation(validators.signupSchema) , async(req , res , next )=>{
    const result = await signup(req.body)
    return successResponse({res , status:201 , result})
})

router.post('/login' ,  authentication(TokenTypeEnum.refresh) ,authorization(endPoint.profile),validation(validators.loginSchema), async(req , res , next )=>{

    const result = await login(req.body , `${req.protocol}://${req.host}`)
    return successResponse({res ,  result})
})

export default router


