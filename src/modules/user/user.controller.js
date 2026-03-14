
import {Router} from 'express'
import { dashboard, logout, profile, rotateToken, updatedProfile, updatePassword } from './user.service.js'
import { successResponse } from '../../common/utils/response/success.response.js'
import {authentication , authorization, validation} from '../../common/utils/middleware/index.js'
import { TokenTypeEnum } from '../../common/enums/security.enum.js'
import * as validators from './user.validation.js'
const router = Router() // app



router.patch('/password' ,
    authentication() ,
    validation(validators.updatePasswordSchema)
    , async(req , res , next )=>{
    const credentials = await updatePassword(req.body , req.user ,`${req.protocol}://${req.host}` )
    return successResponse({res , result : {...credentials} } )
})
// Dashboard Page .
router.get("/dashboard",authentication(),async (req, res, next) => {
    const result = await dashboard()
    return successResponse({ res, result })
}
)
//Profile
router.get('/' , authentication() , authorization(), async (req , res , next )=>{
    const result = await profile(req.user)
    return successResponse({res , result})
})
// Update Profile
router.patch("/updateProfile",authentication(),async (req, res, next) => {
        const result = await updatedProfile(req.user, req.body)
        return successResponse({ res, result })
    }
)
router.get('/rotate' , authentication(TokenTypeEnum.refresh) , async (req , res , next )=>{ 
    const result = await rotateToken(req.user , req.decoded ,`${req.protocol}://${req.host}`)
    return successResponse({res , result})
})

router.post('/logout', authentication() ,  async(req , res , next)=>{
    const status = await logout(req.body, req.user, req.decoded )
    return successResponse({res  , status:status  })
})
export default router

