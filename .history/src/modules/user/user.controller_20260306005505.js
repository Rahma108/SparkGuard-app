
import {Router} from 'express'
import { profile } from './user.service.js'
import { successResponse } from '../../common/utils/response/success.response.js'
import {authentication , authorization} from '../../common/utils/middleware/index.js'
import {end}
const router = Router() // app
router.get('/' , authentication() , authorization(endPoint.profile), async (req , res , next )=>{
    
    const result = await profile(req.user)
    return successResponse({res , result})
})

router.get('/rotate' , authentication(TokenTypeEnum.refresh) , async (req , res , next )=>{
    
    const result = await rotateToken(req.user , `${req.protocol}://${req.host}`)
    return successResponse({res , result})
})

export default router

