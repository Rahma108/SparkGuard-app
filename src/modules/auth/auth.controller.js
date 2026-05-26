
import {Router} from 'express'
import { activateAccount, login, requestForgotPasswordCode, resendForgotPasswordCode, signup,  verifyForgotPasswordCode } from './auth.service.js'
import { successResponse } from '../../common/utils/response/success.response.js'
import * as validators from './auth.validation.js'
import { validation } from '../../common/utils/middleware/validation.middleware.js'
const router = Router() 
// 
router.post(
    "/signup",
    validation(validators.signupSchema),
    async (req, res) => {
        const result = await signup(req.body);
        return successResponse({ res, status: 201, result });
    }
);


router.get("/activate", async (req, res) => {
    try {
        const { token } = req.query;

        await activateAccount(token);

        return res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>Account Activated</title>
        </head>

        <body style="margin:0;font-family:Arial;background:#0f172a;display:flex;justify-content:center;align-items:center;height:100vh;">

            <div style="
                width:500px;
                background:#111827;
                border-radius:16px;
                border:1px solid #1f2937;
                box-shadow:0 10px 40px rgba(0,0,0,0.6);
                text-align:center;
                padding:40px;
                color:#e5e7eb;
            ">

                <div style="
                    background:linear-gradient(135deg,#f59e0b,#f97316);
                    padding:20px;
                    border-radius:12px;
                    color:black;
                    font-weight:bold;
                    font-size:18px;
                    margin-bottom:20px;
                ">
                    ⚡ Electricity System
                </div>

                <h2 style="margin:10px 0;color:#22c55e;">Account Activated 🎉</h2>

                <p style="color:#cbd5e1;font-size:14px;line-height:1.6;">
                    Your account has been successfully activated.<br/>
                    You can now go back to the application and login.
                </p>

                <div style="
                    margin-top:25px;
                    padding:12px;
                    background:#0b1220;
                    border-radius:10px;
                    font-size:12px;
                    color:#94a3b8;
                ">
                    You can close this page now
                </div>

            </div>

        </body>
        </html>
        `);

    } catch (err) {
        return res.status(400).send(`
        <html>
        <body style="background:#0f172a;color:white;text-align:center;padding-top:100px;font-family:Arial;">
            <h2 style="color:#ef4444;">Activation Failed ❌</h2>
            <p>${err.message}</p>
        </body>
        </html>
        `);
    }
});

router.post(
    "/login",
    validation(validators.loginSchema),
    async (req , res , next ) => {
        const result = await login(req.body , `${req.protocol}://${req.host}`)  // http://localhost:300
        return successResponse({ res, result });
    }
);


// Forget Password 
router.post('/request-forgot-password-code' ,  validation(validators.verifyEmailSchema) , async(req , res , next )=>{
    await requestForgotPasswordCode(req.body)
    return  successResponse({res , status:201})

})
router.patch('/verify-forgot-password-code' ,  validation(validators.verifyForgotPasswordSchema) , async(req , res , next )=>{
    await verifyForgotPasswordCode(req.body)
    return  successResponse({res , status:200})

})

router.patch('/resend-forgot-password-code' ,  validation(validators.resetForgotPasswordSchema) , async(req , res , next )=>{
    await resendForgotPasswordCode(req.body)
    return  successResponse({res , status:200})
})


// router.patch('/confirm-email' ,  validation(validators.confirmEmailSchema) , async(req , res , next )=>{
//     const result = await confirmEmail(req.body)
//     return  successResponse({res})

// })

// router.patch('/resend-confirm-email' ,  validation(validators.resendConfirmEmailSchema) , async(req , res , next )=>{
//     const result = await reSendConfirmEmail(req.body)
//     return  successResponse({res})

// })
export default router


