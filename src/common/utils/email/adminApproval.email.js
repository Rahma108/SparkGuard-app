
import { sendEmail } from "./send.email.js";
import { approvalTemplate, rejectionTemplate } from "./template.email.js";

export const sendApprovalEmail = async ({ email, name, link }) => {
    return await sendEmail({
        to: email,
        subject: "🎉 Your Account Has Been Approved",
        html: approvalTemplate({ name, link })
    });
};



// Rejected 
//rejectUser
export const sendRejectionEmail = async ({ email, name }) => {
    return await sendEmail({
        to: email,
        subject: "❌ Account Request Rejected",
        html: rejectionTemplate({ name })
    });
};