
export const EmailEnum = {
    ConfirmEmail:"Confirm_Email",
    ForgotPassword:"Forgot_Password" ,
    TwoStepsVerification :"TwoStepsVerification"
}


export const AdminApproachEnum = { 
        PENDING : "PENDING",    // signup
        ACTIVE : "ACTIVE",     // user clicked activation link
        REJECTED:"REJECTED",   // admin rejected
        APPROVED :"APPROVED"   // admin approved + email sent
}