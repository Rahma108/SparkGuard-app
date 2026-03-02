
import {Router} from 'express'
import { profile } from './user.service.js'

const router = Router() // app
router.get('/' , (req , res , next )=>{
    const result = profile(req.query.id)
    return res.status(200).json({message : "profile" , result})
})
export default router

