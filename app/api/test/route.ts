import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(req: Request) {
  const { name, email, projectType, budget, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `New inquiry — ${name} (${projectType || "General"})`,
    html: notificationEmailHTML(name, email, projectType, budget, message),
  })

  await transporter.sendMail({
    from: `"Muhammad Ubaidullah" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Got your message, ${name.split(" ")[0]} — talk soon ✦`,
    html: thankYouEmailHTML(name, projectType),
  })

  return NextResponse.json({ success: true })
}

/* ─────────────────────────────────────────────
   NOTIFICATION EMAIL  (you receive this)
   Table-based layout — survives all email clients
   ───────────────────────────────────────────── */
function notificationEmailHTML(
  name: string,
  email: string,
  projectType: string,
  budget: string,
  message: string
): string {
  const field = (label: string, value: string) =>
    value
      ? `
        <tr>
          <td style="padding:0 0 16px 0;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="
                  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                  font-size:10px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;
                  color:#00A880;background:rgba(0,168,128,0.10);
                  padding:3px 10px;border-radius:999px;white-space:nowrap;
                  width:1%;vertical-align:middle;
                ">${label}</td>
                <td style="width:12px;"></td>
                <td style="
                  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                  font-size:15px;font-weight:500;color:#0A0E1A;vertical-align:middle;
                  word-break:break-word;
                ">${escapeHtml(value)}</td>
              </tr>
            </table>
          </td>
        </tr>`
      : ""

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New inquiry</title>
</head>
<body style="margin:0;padding:0;background:#F0EFEC;-webkit-font-smoothing:antialiased;">
  <!--[if mso]><table width="100%"><tr><td><![endif]-->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F0EFEC;padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table cellpadding="0" cellspacing="0" border="0" width="560"
               style="background:#FFFFFF;border-radius:20px;overflow:hidden;
                      border:1px solid rgba(10,14,26,0.08);
                      box-shadow:0 8px 32px rgba(0,0,0,0.07);">

          <!-- Accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#00A880,#00D9A6);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 40px 40px;">

              <!-- Title -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td>
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                               font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;
                               color:#9CA3AF;margin:0 0 6px;">
                      Portfolio contact form
                    </p>
                    <h1 style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                                font-size:24px;font-weight:700;letter-spacing:-0.01em;color:#0A0E1A;margin:0;">
                      New inquiry received
                    </h1>
                  </td>
                </tr>
              </table>

              <!-- Fields -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%"
                     style="border-top:1px solid rgba(10,14,26,0.08);padding-top:24px;">
                ${field("Name",    name)}
                ${field("Email",   email)}
                ${field("Project", projectType)}
                ${field("Budget",  budget || "Not specified")}
              </table>

              <!-- Message block -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:4px;">
                <tr>
                  <td style="
                    background:#F6F5F2;border-left:3px solid #00A880;
                    border-radius:0 12px 12px 0;padding:20px 24px;
                  ">
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                               font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
                               color:#9CA3AF;margin:0 0 12px;">
                      Message
                    </p>
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                               font-size:15px;line-height:1.7;color:#1A1E2C;
                               margin:0;white-space:pre-wrap;word-break:break-word;">
                      ${escapeHtml(message)}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Reply CTA -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:28px;border-top:1px solid rgba(10,14,26,0.08);padding-top:20px;">
                <tr>
                  <td>
                    <a href="mailto:${escapeHtml(email)}"
                       style="display:inline-block;background:#0A0E1A;color:#FFFFFF;
                              font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                              font-size:14px;font-weight:600;text-decoration:none;
                              padding:12px 24px;border-radius:999px;letter-spacing:0.01em;">
                      Reply to ${escapeHtml(name.split(" ")[0])} →
                    </a>
                  </td>
                  <td align="right" valign="middle">
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                               font-size:12px;color:#9CA3AF;margin:0;">
                      ${escapeHtml(email)}
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
        <!-- / Card -->

        <!-- Footer -->
        <table cellpadding="0" cellspacing="0" border="0" width="560" style="margin-top:20px;">
          <tr>
            <td align="center">
              <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                         font-size:12px;color:#9CA3AF;margin:0;">
                Sent from your portfolio contact form at ubaid.dev
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
  <!--[if mso]></td></tr></table><![endif]-->
</body>
</html>`
}

/* ─────────────────────────────────────────────
   THANK-YOU EMAIL  (client receives this)
   Table-based layout — survives all email clients
   ───────────────────────────────────────────── */
function thankYouEmailHTML(name: string, projectType: string): string {
  const firstName = name.split(" ")[0]

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Message received</title>
</head>
<body style="margin:0;padding:0;background:#F0EFEC;-webkit-font-smoothing:antialiased;">
  <!--[if mso]><table width="100%"><tr><td><![endif]-->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F0EFEC;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table cellpadding="0" cellspacing="0" border="0" width="520"
               style="background:#FFFFFF;border-radius:24px;overflow:hidden;
                      border:1px solid rgba(0,168,128,0.15);
                      box-shadow:0 16px 48px rgba(0,0,0,0.09);">

          <!-- Gradient top bar -->
          <tr>
            <td style="height:5px;background:linear-gradient(90deg,#007A60,#00A880,#00D9A6);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:44px 44px 48px 44px;text-align:center;">

              <!-- Check icon (pure CSS circle, no image dependency) -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom:28px;">
                <tr>
                  <td align="center" valign="middle"
                      style="width:64px;height:64px;border-radius:50%;
                             background:#00A880;
                             font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                             font-size:28px;font-weight:700;color:#FFFFFF;line-height:64px;">
                    ✓
                  </td>
                </tr>
              </table>

              <!-- Greeting -->
              <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                         font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;
                         color:#00A880;margin:0 0 10px;">
                Message received
              </p>

              <!-- Headline -->
              <h1 style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                          font-size:28px;font-weight:700;letter-spacing:-0.02em;
                          color:#0A0E1A;margin:0 0 16px;line-height:1.2;">
                Thanks, ${escapeHtml(firstName)}!
              </h1>

              <!-- Body text -->
              <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                         font-size:16px;color:#4B5563;line-height:1.75;
                         margin:0 auto 28px;max-width:380px;">
                I've received your message and I'll review it carefully.
                You'll hear back from me within <strong style="color:#0A0E1A;">24 hours</strong> — 
                usually much sooner.
              </p>

              ${projectType ? `
              <!-- Project type chip -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 28px;">
                <tr>
                  <td style="
                    background:rgba(0,168,128,0.08);border:1px solid rgba(0,168,128,0.20);
                    border-radius:12px;padding:14px 24px;text-align:left;
                  ">
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                               font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;
                               color:#00A880;margin:0 0 4px;">
                      Project type
                    </p>
                    <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                               font-size:15px;font-weight:600;color:#0A0E1A;margin:0;">
                      ${escapeHtml(projectType)}
                    </p>
                  </td>
                </tr>
              </table>
              ` : ""}

              <!-- Timeline badge -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 32px;">
                <tr>
                  <td style="
                    background:#F6F5F2;border-radius:999px;padding:8px 20px;
                    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                    font-size:13px;color:#6B7280;
                  ">
                    ⏱ Response expected within 24 hours
                  </td>
                </tr>
              </table>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 40px;">
                <tr>
                  <td style="border-radius:999px;background:#0A0E1A;">
                    <a href="mailto:ubaidtech274@gmail.com"
                       style="display:inline-block;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                              font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none;
                              padding:14px 32px;border-radius:999px;letter-spacing:0.01em;">
                      Reply directly →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td style="height:1px;background:rgba(10,14,26,0.08);font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Signature -->
              <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                         font-size:14px;color:#6B7280;margin:0 0 4px;">
                Best regards,
              </p>
              <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                         font-size:16px;font-weight:700;color:#0A0E1A;margin:0 0 4px;">
                Muhammad Ubaidullah
              </p>
              <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                         font-size:13px;color:#9CA3AF;margin:0 0 24px;">
                Full-Stack Developer · ubaid.dev
              </p>

              <!-- Social links -->
              <table cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  <td style="padding:0 8px;">
                    <a href="https://ubaid.dev"
                       style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                              font-size:12px;color:#00A880;text-decoration:none;font-weight:500;">
                      Portfolio
                    </a>
                  </td>
                  <td style="font-size:12px;color:#D1D5DB;">·</td>
                  <td style="padding:0 8px;">
                    <a href="https://github.com/ubaid215"
                       style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                              font-size:12px;color:#00A880;text-decoration:none;font-weight:500;">
                      GitHub
                    </a>
                  </td>
                  <td style="font-size:12px;color:#D1D5DB;">·</td>
                  <td style="padding:0 8px;">
                    <a href="https://linkedin.com/in/ubaidullah-mernstack-developer"
                       style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
                              font-size:12px;color:#00A880;text-decoration:none;font-weight:500;">
                      LinkedIn
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
        <!-- / Card -->

      </td>
    </tr>
  </table>
  <!--[if mso]></td></tr></table><![endif]-->
</body>
</html>`
}

function escapeHtml(str: string): string {
  if (!str) return ""
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}