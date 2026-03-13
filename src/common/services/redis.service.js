import { json } from "express";
import { redisClient } from "../../DB/index.js";

export const revokeTokenKey = ({userId , jti })=>{
    return `${baseRevokeTokenKey(userId)}::${jti}`
}

export const otpKey = (email)=>{
    return `OTP:USER::${email}`
}
export const otpMaxRequestKey = (email)=>{
    return `OTP:USER::${email}::Request`
}
export const otpBlockKey = (email)=>{
    return `OTP:USER::${email}::Block::Request`
}
export const baseRevokeTokenKey = (userId)=>{
    return `RevokeToken::${userId}`
}
export const set = async({
    key , 
    value ,
    ttl 
} = {} )=>{
    try {
        let data = typeof value === 'string'?value : JSON.stringify(value)

        return ttl ? await redisClient.set(key , data, {Ex:ttl} ) : await redisClient.set(key , data);

    } catch (error) {
        console.log(`FAIL IN REDIS SET OPERATIONS ${error}🫠`);
        
        
    }
}
export const update = async({
    key , 
    value ,
    ttl 
} = {} )=>{
    try {
        if(!await redisClient.exists(key)){
            return 0;
        }
        return await redisClient.set({key , value , ttl})

    } catch (error) {
        console.log(`FAIL IN REDIS UPDATE OPERATIONS ${error}🫠`);
        
        
    }
}

export const get = async(key )=>{
    try {
        try {
            return JSON.parse(await redisClient.get(key))
        } catch (error) {
            return redisClient.get(key)
        }

    } catch (error) {
        console.log(`FAIL IN REDIS GET OPERATIONS ${error}🫠`);
        
        
    }
}

export const ttl = async(key )=>{
    try {
            return redisClient.ttl(key)
    } catch (error) {
        console.log(`FAIL IN REDIS TTL OPERATIONS ${error}🫠`);
        
        
    }
}

export const exists = async(key )=>{
    try {
            return redisClient.exists(key)
    } catch (error) {
        console.log(`FAIL IN REDIS EXISTS OPERATIONS ${error}🫠`);
    }
}

export const expire = async({key , ttl} = {} )=>{
    try {
            return redisClient.expire(key , ttl )
    } catch (error) {
        console.log(`FAIL IN REDIS EXPIRE OPERATIONS ${error}🫠`);
    }
}

export const mGet = async(keys=[])=>{
    try {
        if(!keys.length)return 0;
            return redisClient.mGet(keys)
    } catch (error) {
        console.log(`FAIL IN REDIS MGET OPERATIONS ${error}🫠`);
    }
}
export const keys = async(prefix)=>{
    try {
        if(!keys.length)return 0;
            return redisClient.keys(`${prefix}*`)
    } catch (error) {
        console.log(`FAIL IN REDIS KEYS OPERATIONS ${error}🫠`);
    }
}
export const deleteKeys = async(keys)=>{
    try {
        if(!keys.length)return 0;
        return redisClient.del(keys)
    } catch (error) {
        console.log(`FAIL IN REDIS DELETE_KEYS OPERATIONS ${error}🫠`);
        }

}

export const increment = async(key)=>{
    try {
        if(!await redisClient.exists(key))return 0;

        return redisClient.incr(key)

    } catch (error) {
        console.log(`FAIL IN REDIS INCREMENT OPERATIONS ${error}🫠`);
        
        
    }
}