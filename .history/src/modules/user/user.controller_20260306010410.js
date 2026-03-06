
import {Router} from 'express'
import { profile, rotateToken } from './user.service.js'
import { successResponse } from '../../common/utils/response/success.response.js'
import {authentication , authorization} from '../../common/utils/middleware/index.js'
import {endPoint} from './user.authorization.js'
import { TokenTypeEnum } from '../../common/enums/security.enum.js'
const router = Router() // app
router.get('/' , authentication(TokenTypeEnum.access) , authorization(endPoint.profile), async (req , res , next )=>{
    
    const result = await profile(req.user)
    return successResponse({res , result})
})

router.get('/rotate' , authentication(TokenTypeEnum.refresh) , async (req , res , next )=>{
    
    const result = await rotateToken(req.user , `${req.protocol}://${req.host}`)
    return successResponse({res , result})
})

export default router

