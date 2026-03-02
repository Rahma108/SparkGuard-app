import {Router} from 'express'
import { login, signup } from './auth.service.js'
import { successResponse } from '../../common/utils/index.js'
const router = Router() // app

router.post('/signup' , async(req , res , next )=>{
    const result = await signup(req.body)
    return successResponse({message:""})
})

router.post('/login' , async(req , res , next )=>{
    const result = await login(req.body)
    return res.status(200).json({message : "Done login" , result })
})

export default router


