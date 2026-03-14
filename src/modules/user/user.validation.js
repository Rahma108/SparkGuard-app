import joi from 'joi'
import { generalValidationFields } from '../../common/validation.js'

export const updatePasswordSchema= {
    body:joi.object().keys({
        oldPassword:generalValidationFields.password.required(),
        password:generalValidationFields.password.not(joi.ref("oldPassword")).required(),
        confirmPassword:generalValidationFields.confirmPassword("password").required(),

    }).required()
}