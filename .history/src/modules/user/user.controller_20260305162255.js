
import {Router} from 'express'
import { profile } from './user.service.js'

const router = Router() // app
router.get('/' , (req , res , next )=>{
    const result = profile(req.query.id)
    return s
})
export default router

