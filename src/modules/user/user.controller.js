
import {Router} from 'express'
import { logout, profile, rotateToken } from './user.service.js'
import { successResponse } from '../../common/utils/response/success.response.js'
import {authentication , authorization} from '../../common/utils/middleware/index.js'
import { TokenTypeEnum } from '../../common/enums/security.enum.js'
const router = Router() // app
router.get('/' , authentication() , authorization(), async (req , res , next )=>{
    
    const result = await profile(req.user)
    return successResponse({res , result})
})

router.get('/rotate' , authentication(TokenTypeEnum.refresh), authorization() , async (req , res , next )=>{
    
    const result = await rotateToken(req.user , `${req.protocol}://${req.host}`)
    return successResponse({res , result})
})

router.post('/logout', authentication() ,  async(req , res , next)=>{
    const status = await logout(req.body, req.user, req.decoded )
    return successResponse({res  , status:status  })
})
export default router

