import { GITHUB, INSTAGRAM_LINK, LINKEDIN_LINK} from "../../../../config/config.service.js"

export const emailTemplate = ({code, title} = {}) => {
    return `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<style type="text/css">
  body { background-color: #ffffff; margin: 0px; }
</style>
<body style="margin:0px; font-family:Arial,sans-serif; background:#ffffff; padding:30px;">

<table border="0" width="100%" style="max-width:600px;margin:auto;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">

  <!-- Logo row -->
  <tr><td style="padding:20px 25px;">
    <table border="0" width="100%"><tr>
      <td>
        <span style="font-size:16px;font-weight:900;color:#1d4ed8;vertical-align:middle;letter-spacing:1px;">SPARK</span>
        <span style="font-size:16px;font-weight:900;color:#fbbf24;vertical-align:middle;letter-spacing:1px;"> GUARD</span>
      </td>
      <td style="text-align:right;">
        <a href="http://localhost:4200/#/" target="_blank" style="text-decoration:none;color:#1d4ed8;font-size:13px;">View In Website</a>
      </td>
    </tr></table>
  </td></tr>

  <!-- Main card -->
  <tr><td style="padding:0 25px 25px;">
    <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      
      <!-- Blue header -->
      <tr><td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);height:60px;"></td></tr>

      <!-- Title -->
      <tr><td style="padding-top:25px;">
        <h1 style="color:#1d4ed8;margin:0;font-size:22px;">${title}</h1>
      </td></tr>

      <!-- Divider -->
      <tr><td style="padding:15px 40px 0;">
        <div style="height:1px;background:linear-gradient(to right,transparent,#1d4ed8,#fbbf24,#1d4ed8,transparent);"></div>
      </td></tr>

      <!-- Code -->
      <tr><td style="padding:25px 40px 35px;">
        <p style="margin:0;border-radius:8px;padding:14px 28px;color:#fbbf24;background:linear-gradient(135deg,#1d4ed8,#2563eb);font-size:28px;font-weight:bold;letter-spacing:6px;display:inline-block;border:2px solid #fbbf24;">${code}</p>
      </td></tr>

    </table>
  </td></tr>

  <!-- Stay in touch -->
  <tr><td style="padding:0 25px 25px;text-align:center;">
    <h3 style="margin:0 0 16px;color:#1f2937;font-size:14px;letter-spacing:1px;text-transform:uppercase;">Stay in touch</h3>
    <a href="${LINKEDIN_LINK}" style="text-decoration:none;">
      <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="40" height="40" style="border-radius:50%;border:2px solid #1d4ed8;margin:0 6px;">
    </a>
    <a href="${INSTAGRAM_LINK}" style="text-decoration:none;">
      <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="40" height="40" style="border-radius:50%;border:2px solid #fbbf24;margin:0 6px;">
    </a>
    <a href="${GITHUB}" style="text-decoration:none;">
      <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="40" height="40" style="border-radius:50%;border:2px solid #1f2937;margin:0 6px;">
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f3f4f6;border-top:1px solid #e5e7eb;text-align:center;padding:14px;font-size:11px;color:#9ca3af;">
    <span style="color:#1d4ed8;font-weight:bold;">SPARK</span><span style="color:#fbbf24;font-weight:bold;">GUARD</span>
    &nbsp;•&nbsp; Electricity Management System &nbsp;•&nbsp; Secure Access Portal
  </td></tr>

</table>
</body>
</html>`
}

export const approvalTemplate = ({ name, link }) => {
  return `
  <div style="background:#ffffff; padding:30px; font-family: Arial, sans-serif;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:14px; overflow:hidden;
                box-shadow:0 4px 24px rgba(0,0,0,0.10); border:1px solid #e5e7eb;">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1d4ed8, #2563eb); padding:30px 25px 20px; text-align:center;">
        <div>
          <span style="font-size:20px; font-weight:900; color:#fff; letter-spacing:1px;">SPARK</span>
          <span style="font-size:20px; font-weight:900; color:#fbbf24; letter-spacing:1px;"> GUARD</span>
        </div>
        <p style="margin:6px 0 0; font-size:12px; color:#bfdbfe; letter-spacing:2px; text-transform:uppercase;">Electricity Management System</p>
      </div>

      <!-- Title bar -->
      <div style="background:#eff6ff; padding:14px 25px; text-align:center; border-bottom:2px solid #fbbf24;">
        <h2 style="margin:0; font-size:16px; color:#1d4ed8; letter-spacing:1px;">⚡ Account Activation Portal</h2>
      </div>

      <!-- Body -->
      <div style="padding:35px 30px; text-align:center; color:#1f2937;">
        <h3 style="margin-bottom:10px; color:#1d4ed8; font-size:18px;">Hello ${name || "Engineer"} 👷‍♂️</h3>
        <p style="font-size:14px; line-height:1.8; color:#374151;">
          Your account has been <b style="color:#d97706;">approved by the system administrator</b>.<br>
          You can now activate your access to the Electricity Management Platform.
        </p>
        <div style="height:1px; background:linear-gradient(to right, transparent, #1d4ed8, #fbbf24, #1d4ed8, transparent); margin:25px 0;"></div>
        <a href="${link}" style="display:inline-block; margin-top:5px; padding:14px 32px;
           background: linear-gradient(135deg, #1d4ed8, #2563eb);
           color:#fbbf24; text-decoration:none;
           border-radius:8px; font-weight:bold; font-size:14px;
           border:2px solid #fbbf24; letter-spacing:0.5px;">
          ⚡ Activate Account
        </a>
        <p style="margin-top:22px; font-size:12px; color:#6b7280;">
          This activation link is valid for <b style="color:#d97706;">1 hour</b> for security reasons.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f3f4f6; border-top:1px solid #e5e7eb; text-align:center; padding:16px; font-size:11px; color:#9ca3af;">
        <span style="color:#1d4ed8; font-weight:bold;">SPARK</span><span style="color:#fbbf24; font-weight:bold;">GUARD</span>
        &nbsp;•&nbsp; Electricity Management System &nbsp;•&nbsp; Secure Access Portal
      </div>

    </div>
  </div>
`
};

export const rejectionTemplate = ({ name }) => {
  return `
  <div style="background:#ffffff; padding:30px; font-family: Arial, sans-serif;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:14px; overflow:hidden;
                box-shadow:0 4px 24px rgba(0,0,0,0.10); border:1px solid #e5e7eb;">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1d4ed8, #2563eb); padding:30px 25px 20px; text-align:center;">
        <div>
          <span style="font-size:20px; font-weight:900; color:#fff; letter-spacing:1px;">SPARK</span>
          <span style="font-size:20px; font-weight:900; color:#fbbf24; letter-spacing:1px;"> GUARD</span>
        </div>
        <p style="margin:6px 0 0; font-size:12px; color:#bfdbfe; letter-spacing:2px; text-transform:uppercase;">
          Electricity Management System
        </p>
      </div>

      <!-- Title -->
      <div style="background:#eff6ff; padding:14px 25px; text-align:center; border-bottom:2px solid #f87171;">
        <h2 style="margin:0; font-size:16px; color:#dc2626; letter-spacing:1px;">
          ❌ Account Request Update
        </h2>
      </div>

      <!-- Body -->
      <div style="padding:35px 30px; text-align:center; color:#1f2937;">
        <h3 style="margin-bottom:10px; color:#1d4ed8; font-size:18px;">
          Hello ${name || "Engineer"} 👷‍♂️
        </h3>

        <p style="font-size:14px; line-height:1.8; color:#374151;">
          We regret to inform you that your account request has been 
          <b style="color:#dc2626;">rejected</b> by the system administrator.
        </p>

        <div style="height:1px; background:linear-gradient(to right, transparent, #dc2626, #fbbf24, #dc2626, transparent); margin:25px 0;"></div>

        <p style="font-size:13px; color:#6b7280;">
          If you believe this was a mistake, please contact support or try registering again with valid information.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f3f4f6; border-top:1px solid #e5e7eb; text-align:center; padding:16px; font-size:11px; color:#9ca3af;">
        <span style="color:#1d4ed8; font-weight:bold;">SPARK</span>
        <span style="color:#fbbf24; font-weight:bold;">GUARD</span>
        &nbsp;•&nbsp; Electricity Management System &nbsp;•&nbsp; Secure Access Portal
      </div>

    </div>
  </div>
  `;
};
