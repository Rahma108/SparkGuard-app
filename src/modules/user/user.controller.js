
import {Router} from 'express'
import { dashboard, logout, profile, profilePicture, removeProfilePicture, rotateToken, updatedProfile, updatePassword } from './user.service.js'
import { successResponse } from '../../common/utils/response/success.response.js'
import {authentication , authorization, validation} from '../../common/utils/middleware/index.js'
import { TokenTypeEnum } from '../../common/enums/security.enum.js'
import * as validators from './user.validation.js'
import { endPoint } from './user.authorization.js'
import multer from 'multer'
import { fieldValidation, upload } from '../../common/utils/multer.js'
const router = Router() // app

router.patch('/password' ,
    authentication() ,
    authorization(endPoint.user),
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
router.get('/' , authentication() , authorization(endPoint.profile) , async (req , res , next )=>{
    const result = await profile(req.user)
    return successResponse({res , result})
})
// Update Profile
router.patch("/updateProfile",authentication(),async (req, res, next) => {
        const result = await updatedProfile(req.user, req.body)
        return successResponse({ res, result })
    }
)

router.patch(
    '/profile-picture',
    authentication(),
    upload("general", [...fieldValidation.image], 10).single("attachment"),
    validation(validators.profilePicture),
    async (req, res) => {
        const account = await profilePicture(req.file, req.user);
        return successResponse({ res, result: { account } });
    }
);

router.delete('/remove-profile-picture' ,
    authentication()
    , async(req , res , next )=>{
    const account = await removeProfilePicture(  req.user )
    return successResponse({res ,result:{account} })
})

router.get('/rotate' , authentication(TokenTypeEnum.refresh) ,  async (req , res , next )=>{ 
    const result = await rotateToken(req.user , req.decoded ,`${req.protocol}://${req.host}`)
    return successResponse({res , result})
})

router.post('/logout', authentication() , authorization(endPoint.profile),  async(req , res , next)=>{
    const status = await logout(req.body, req.user, req.decoded )
    return successResponse({res  , status:status  })
})
export default router

