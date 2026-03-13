import {EventEmitter} from 'node:events'
import { EmailEnum } from '../../enums/index.js';


export const emailEmitter = new EventEmitter()

emailEmitter.on(EmailEnum.ConfirmEmail , async(emailFunction)=>{
    try {
    
        await emailFunction()

    } catch (error) {
        console.log(`Fail to Sent User Email ${error} ❌`);

    }

})