import { GITHUB, INSTAGRAM_LINK, LINKEDIN_LINK} from "../../../../config/config.service.js"

export const emailTemplate = ({code , title} = {})=>{
    return `<!DOCTYPE html>
                <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
                <style type="text/css">
                body{background-color: #88BDBF;margin: 0px;}
                </style>
                <body style="margin:0px;"> 
                <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
                <tr>
                <td>
                <table border="0" width="100%">
                <tr>
                <td>
                <h1>
                    <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
                </h1>
                </td>
                <td>
                <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                <tr>
                <td>
                <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
                <tr>
                <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
                <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
                </td>
                </tr>
                <tr>
                <td>
                <h1 style="padding-top:25px; color:#630E2B">${title}</h1>
                </td>
                </tr>
                <tr>
                <td>
                <p style="padding:0px 100px;">
                </p>
                </td>
                </tr>
                <tr>
                <td>
                <p style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">${code}</p>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                <tr>
                <td>
                <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
                <tr>
                <td>
                <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
                </td>
                </tr>
                <tr>
                <td>
                <div style="margin-top:20px;">

                <a href="${LINKEDIN_LINK}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="50px" hight="50px"></span></a>
                
                <a href="${INSTAGRAM_LINK}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
                <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
                </a>
                
                <a href="${GITHUB}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="50px" hight="50px"></span>
                </a>

                </div>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </table>
                </body>
                </html>`
}

export const approvalTemplate = ({ name, link }) => {
  return `
  <div style="font-family: Arial; background:#0f172a; padding:30px;">

    <div style="max-width:600px;margin:auto;background:#111827;border-radius:14px;overflow:hidden;
                box-shadow:0 10px 40px rgba(0,0,0,0.5); border:1px solid #1f2937">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#f59e0b,#f97316);
                  padding:25px;text-align:center;color:#000;">
        <h2 style="margin:0;font-size:22px;">⚡ Electricity System</h2>
        <p style="margin:5px 0 0;font-size:13px;">Account Activation Portal</p>
      </div>

      <!-- Body -->
      <div style="padding:30px;text-align:center;color:#e5e7eb;">

        <h3 style="margin-bottom:10px;">Hello ${name || "Engineer"} 👷‍♂️</h3>

        <p style="font-size:14px;line-height:1.7;color:#cbd5e1;">
          Your account has been <b style="color:#f59e0b;">approved by the system administrator</b>.
          You can now activate your access to the Electricity Management Platform.
        </p>

        <!-- Button -->
        <a href="${link}"
           style="display:inline-block;margin-top:25px;padding:14px 28px;
           background:linear-gradient(135deg,#f59e0b,#f97316);
           color:#000;text-decoration:none;
           border-radius:8px;font-weight:bold;font-size:14px;">
          ⚡ Activate Account
        </a>

        <p style="margin-top:20px;font-size:12px;color:#94a3b8;">
          This activation link is valid for <b>1 hour</b> for security reasons.
        </p>

      </div>

      <!-- Footer -->
      <div style="background:#0b1220;text-align:center;padding:15px;font-size:11px;color:#64748b;">
        Electricity Management System • Secure Access Portal
      </div>

    </div>

  </div>
  `;
};