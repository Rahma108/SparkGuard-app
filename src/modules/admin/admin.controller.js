import {Router} from 'express'


const router = Router() 
// /admin
router.post("/", authentication(), async (req, res, next) => {
});


export default router

