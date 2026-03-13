import { createClient } from "redis";
import { REDIS_URL } from "../../config/config.service.js";
export const redisClient = createClient({
    url:REDIS_URL
})

export const connectRedis = async()=>{
    try {
        await redisClient.connect()
        console.log(`REDIS_DB CONNECTED SUCCESSFULLY 🤩 `);
        
        
    } catch (error) {
        console.log(`FAIL TO CONNECT ON REDIS_DB 🫠${error}`);
        
        
    }
}