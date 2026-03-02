import {Router} from 'express'
import { login, signup } from './auth.service.js'
const router = Router() // app

router.post('/signup' , async(req , res , next )=>{
    const result = await signup(req.body)
    return successResponse()
})

router.post('/login' , async(req , res , next )=>{
    const result = await login(req.body)
    return res.status(200).json({message : "Done login" , result })
})

export default router


