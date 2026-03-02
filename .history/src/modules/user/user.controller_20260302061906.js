<<<<<<< HEAD
import {Router} from 'express'
import { profile } from './user.service.js'

const router = Router() // app
router.get('/' , (req , res , next )=>{
    const result = profile(req.query.id)
    return res.status(200).json({message : "profile" , result})
})
export default router

=======
import {Router} from 'express'
import { profile } from './user.service.js'

const router = Router() // app
router.get('/' , (req , res , next )=>{
    const result = profile(req.query.id)
    return res.status(200).json({message : "profile" , result})
})
export default router

>>>>>>> d999e0648c20aa5e0c5ea4b62cd27880d6db0d49
