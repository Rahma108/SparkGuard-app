
import express from 'express'
import { adminRouter, authRouter , predictionRouter, userRouter  } from './modules/index.js'
import { NODE_ENV, port } from '../config/config.service.js'
import { GlobalError } from './common/utils/response/error.response.js';
import cors from 'cors'
import { connectRedis , connectDB  } from './DB/index.js';
import helmet from 'helmet';
import { Limiter } from './common/utils/middleware/limiter.js';
console.log({NODE_ENV});
async function bootstrap(){
const app = express()

// convert buffer data .....................
app.set("trust proxy", true)
app.use(express.json());
app.use(cors() , Limiter , helmet() )

// DB ....
await connectDB()
await connectRedis()
//application routing ......................
app.get('/' , (req , res , next )=>{
    res.send('Hello')
    
})

app.use('/auth',authRouter)
app.use('/user', userRouter)
app.use('/predict', predictionRouter)
app.use('/admin' ,adminRouter


)
// invalid routing ....................
app.use('{/*dummy}' , (req , res , next)=>{
        return res.status(404).json({message : "invalid routing "})
})

// Handle Error ....................
app.use(GlobalError)
      // routes
app.listen(port , ()=>{
    console.log(`Listening on port ${port} 🚀🚀🚀🚀`);
    
})
}
export default bootstrap