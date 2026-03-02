
import {resolve} from 'node:path'
import {config} from 'dotenv'



// لازم اعمل install ===> npm i cross-env 
export const NODE_ENV = process.env.NODE_ENV

const envPath = {
    development : `.env.dev`,
    production :`.env.prod`
}

config({path:resolve(`./config/${envPath[NODE_ENV]}`)})
export const port = process.env.PORT ?? 7000

export const DB_URI = process.env.DB_URI

export const SALT_ROUND= parseInt(process.env.SALT_ROUND ?? '10') 




