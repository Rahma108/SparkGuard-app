
import {Router} from 'express'
import { login, signup } from './auth.service.js'
import { successResponse } from '../../common/utils/response/success.response.js'
import { authentication, authorization } from '../../common/utils/middleware/index.js'
import { TokenTypeEnum } from '../../common/enums/i'
import { endPoint } from '../user/user.authorization.js'
const router = Router() // app
router.post('/signup',  authentication(TokenTypeEnum.access) ,authorization(endPoint.profile) , async(req , res , next )=>{
    const result = await signup(req.body)
    return successResponse({res , status:201 , result})
})

router.post('/login' , async(req , res , next )=>{
    const result = await login(req.body)
    return successResponse({res , result})
})

export default router


