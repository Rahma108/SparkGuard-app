import joi from 'joi'
import { generalValidationFields } from '../../common/validation.js'
import { fieldValidation } from '../../common/utils/multer.js'

export const updatePasswordSchema= {
    body:joi.object().keys({
        oldPassword:generalValidationFields.password.required(),
        password:generalValidationFields.password.not(joi.ref("oldPassword")).required(),
        confirmPassword:generalValidationFields.confirmPassword("password").required(),

    }).required()

}
export const profilePicture ={
    file:generalValidationFields.file(fieldValidation.image).required()
}

