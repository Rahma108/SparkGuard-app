
import express from 'express'
import { authRouter , userRouter  } from './modules/index.js'
// import { NODE_ENV } from '../config/config.service.js'
import { GlobalError } from './common/utils/response/error.response.js';
import cors from 'cors'
// import { connectRedis , connectDB  } from './DB/index.js';
// console.log({NODE_ENV});
async function bootstrap(){
const app = express()

// convert buffer data .....................
app.use(express.json());
app.use(cors())

// DB ....
// await connectDB()
// await connectRedis()
//application routing ......................
app.get('/' , (req , res , next )=>{
    res.send('Hello')
    
})

app.use('/auth',authRouter)
app.use('/user', userRouter)

// invalid routing ....................
app.use('{/*dummy}' , (req , res , next)=>{
        return res.status(404).json({message : "invalid routing "})
})
// Handle Error ....................
app.use(GlobalError)
      // routes
    app.get("/", (req, res) => {
        res.send("API is working 🚀");
    });

    return app;
}
export default bootstrap