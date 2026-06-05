
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

<body style="margin:0; font-family:Arial; background:#ffffff; display:flex; justify-content:center; align-items:center; height:100vh;">

    <div style="
        width:500px;
        background:#ffffff;
        border-radius:16px;
        border:1px solid #e5e7eb;
        box-shadow:0 4px 24px rgba(0,0,0,0.10);
        text-align:center;
        overflow:hidden;
        color:#1f2937;
    ">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1d4ed8, #2563eb); padding:30px 25px 20px;">

            <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto 14px auto;">
              <tr>
                <td align="center" valign="middle"
                    style="width:90px; height:90px; border-radius:50%; background:#ffffff;
                           border:4px solid #fbbf24; text-align:center; vertical-align:middle;">
                  <svg width="36" height="44" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg"
                       style="display:block; margin:auto;">
                    <polygon points="18,0 6,22 16,22 14,40 26,18 16,18" fill="#fbbf24"/>
                  </svg>
                </td>
              </tr>
            </table>

            <div>
              <span style="font-size:20px; font-weight:900; color:#fff; letter-spacing:1px;">SPARK</span>
              <span style="font-size:20px; font-weight:900; color:#fbbf24; letter-spacing:1px;"> GUARD</span>
            </div>
            <p style="margin:6px 0 0; font-size:12px; color:#bfdbfe; letter-spacing:2px; text-transform:uppercase;">Electricity Management System</p>
        </div>

        <!-- Title bar -->
        <div style="background:#eff6ff; padding:14px 25px; text-align:center; border-bottom:2px solid #fbbf24;">
            <h2 style="margin:0; font-size:16px; color:#22c55e; letter-spacing:1px;">Account Activated 🎉</h2>
        </div>

        <!-- Body -->
        <div style="padding:35px 30px; text-align:center;">
            <p style="color:#374151; font-size:14px; line-height:1.6;">
                Your account has been successfully activated.<br/>
                You can now go back to the application and login.
            </p>

            <div style="
                margin-top:25px;
                padding:12px;
                background:#f3f4f6;
                border-radius:10px;
                font-size:12px;
                color:#6b7280;
                border:1px solid #e5e7eb;
            ">
                You can close this page now
            </div>
        </div>

        <!-- Footer -->
        <div style="background:#f3f4f6; border-top:1px solid #e5e7eb; text-align:center; padding:16px; font-size:11px; color:#9ca3af;">
            <span style="color:#1d4ed8; font-weight:bold;">SPARK</span><span style="color:#fbbf24; font-weight:bold;">GUARD</span>
            &nbsp;•&nbsp; Electricity Management System &nbsp;•&nbsp; Secure Access Portal
        </div>

    </div>

</body>
</html>
`);

} catch (err) {
    return res.status(400).send(`
    <html>
    <body style="background:#ffffff; color:#1f2937; text-align:center; padding-top:100px; font-family:Arial;">
        <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto 14px auto;">
          <tr>
            <td align="center" valign="middle"
                style="width:70px; height:70px; border-radius:50%; background:#fff;
                       border:3px solid #fbbf24; text-align:center; vertical-align:middle;">
              <svg width="28" height="34" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg"
                   style="display:block; margin:auto;">
                <polygon points="18,0 6,22 16,22 14,40 26,18 16,18" fill="#fbbf24"/>
              </svg>
            </td>
          </tr>
        </table>
        <h2 style="color:#ef4444;">Activation Failed ❌</h2>
        <p style="color:#6b7280;">${err.message}</p>
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


