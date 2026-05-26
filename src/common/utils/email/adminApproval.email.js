
import { sendEmail } from "./send.email.js";
import { approvalTemplate } from "./template.email.js";

export const sendApprovalEmail = async ({ email, name, link }) => {
    return await sendEmail({
        to: email,
        subject: "🎉 Your Account Has Been Approved!",
        html: approvalTemplate({ name, link })
    });
};