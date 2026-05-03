import {Router} from 'express'
import { authentication } from '../../common/utils/index.js';


const router = Router() 
// /admin
router.post("/", authentication(), async (req, res, next) => {
});


export default router

