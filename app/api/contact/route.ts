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

  // Send notification to yourself
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `New inquiry — ${name} (${projectType || "General"})`,
    html: notificationEmailHTML(name, email, projectType, budget, message),
  })

  // Send thank-you email to the client
  await transporter.sendMail({
    from: `"Muhammad Ubaidullah" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Thank you for reaching out, ${name.split(" ")[0]}! ✨`,
    html: thankYouEmailHTML(name, projectType),
  })

  return NextResponse.json({ success: true })
}

// Notification email for you (admin)
function notificationEmailHTML(name: string, email: string, projectType: string, budget: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body, table, td, div, p, a {
          margin: 0;
          padding: 0;
          border: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Geist', Helvetica, Arial, sans-serif;
          line-height: 1.5;
        }
        body {
          background-color: #F8F7F4;
          width: 100%;
          height: 100%;
          -webkit-font-smoothing: antialiased;
          padding: 20px 0;
        }
        .email-wrapper { max-width: 600px; margin: 0 auto; background-color: #F8F7F4; }
        .email-card {
          background: #FFFFFF;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(10, 14, 26, 0.06);
        }
        .accent-bar { height: 4px; background: #00D9A6; width: 100%; }
        .content { padding: 32px 36px 40px 36px; }
        .title {
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #0A0E1A;
          margin-bottom: 8px;
          line-height: 1.2;
        }
        .subhead {
          font-size: 14px;
          color: #6B7280;
          border-bottom: 1px solid rgba(10, 14, 26, 0.08);
          padding-bottom: 24px;
          margin-bottom: 28px;
        }
        .field { margin-bottom: 20px; display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
        .field-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #00D9A6;
          background: rgba(0, 217, 166, 0.08);
          padding: 4px 12px;
          border-radius: 100px;
          display: inline-block;
          min-width: 85px;
          text-align: center;
        }
        .field-value { font-size: 16px; font-weight: 500; color: #0A0E1A; word-break: break-word; flex: 1; }
        .field-value a { color: #00D9A6; text-decoration: none; border-bottom: 1px solid rgba(0, 217, 166, 0.3); }
        .message-block {
          margin: 28px 0 24px 0;
          background: #F8F7F4;
          border-radius: 20px;
          padding: 20px 24px;
          border-left: 3px solid #00D9A6;
        }
        .message-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9CA3AF;
          margin-bottom: 12px;
          display: block;
        }
        .message-content { font-size: 16px; line-height: 1.6; color: #1A1E2C; white-space: pre-wrap; word-break: break-word; }
        .divider { height: 1px; background: linear-gradient(90deg, rgba(10, 14, 26, 0.06), rgba(10, 14, 26, 0.01)); margin: 24px 0 20px 0; }
        .footer { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 11px; color: #9CA3AF; }
        .reply-chip {
          background: rgba(0, 217, 166, 0.06);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          color: #00D9A6;
        }
        @media (prefers-color-scheme: dark) {
          body { background-color: #0A0E1A !important; }
          .email-wrapper { background-color: #0A0E1A !important; }
          .email-card { background: #111827 !important; border: 1px solid rgba(248, 247, 244, 0.08) !important; }
          .title { color: #F8F7F4 !important; }
          .subhead { color: #9CA3AF !important; border-bottom-color: rgba(248, 247, 244, 0.08) !important; }
          .field-value { color: #E5E7EB !important; }
          .message-block { background: #1C2333 !important; border-left-color: #00F0B8 !important; }
          .message-content { color: #E5E7EB !important; }
          .field-label { background: rgba(0, 217, 166, 0.12) !important; color: #00F0B8 !important; }
        }
        @media only screen and (max-width: 560px) {
          .content { padding: 24px 24px 32px 24px; }
          .field { flex-direction: column; gap: 6px; margin-bottom: 18px; }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-card">
          <div class="accent-bar"></div>
          <div class="content">
            <div class="title">New inquiry</div>
            <div class="subhead">From your portfolio contact form</div>
            <div class="field"><div class="field-label">Name</div><div class="field-value">${escapeHtml(name)}</div></div>
            <div class="field"><div class="field-label">Email</div><div class="field-value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div></div>
            ${projectType ? `<div class="field"><div class="field-label">Project</div><div class="field-value">${escapeHtml(projectType)}</div></div>` : ''}
            <div class="field"><div class="field-label">Budget</div><div class="field-value">${budget ? escapeHtml(budget) : 'Not specified'}</div></div>
            <div class="message-block"><div class="message-label">Message</div><div class="message-content">${escapeHtml(message)}</div></div>
            <div class="divider"></div>
            <div class="footer"><div class="reply-chip"><strong>↳ Reply directly</strong> — ${escapeHtml(email)}</div></div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Thank-you email for the client
function thankYouEmailHTML(name: string, projectType: string): string {
  const firstName = name.split(" ")[0]
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for reaching out</title>
      <style>
        body, table, td, div, p, a {
          margin: 0;
          padding: 0;
          border: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Geist', Helvetica, Arial, sans-serif;
          line-height: 1.5;
        }
        body {
          background: linear-gradient(135deg, #F8F7F4 0%, #EEECEA 100%);
          width: 100%;
          height: 100%;
          -webkit-font-smoothing: antialiased;
          padding: 40px 0;
        }
        .email-wrapper { max-width: 560px; margin: 0 auto; }
        .email-card {
          background: #FFFFFF;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(0, 217, 166, 0.15);
        }
        .accent-bar { height: 6px; background: linear-gradient(90deg, #00D9A6, #00F0B8, #00D9A6); width: 100%; }
        .content { padding: 40px 40px 48px 40px; text-align: center; }
        .checkmark {
          width: 64px;
          height: 64px;
          background: #00D9A6;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 8px 20px rgba(0, 217, 166, 0.25);
        }
        .checkmark span { font-size: 32px; color: #0A0E1A; font-weight: 600; }
        .title {
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #0A0E1A;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .greeting { font-size: 18px; color: #00D9A6; font-weight: 500; margin-bottom: 16px; }
        .message {
          font-size: 16px;
          color: #4B5563;
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .project-note {
          background: rgba(0, 217, 166, 0.06);
          border-radius: 20px;
          padding: 20px 24px;
          margin: 24px 0;
          border-left: 3px solid #00D9A6;
          text-align: left;
        }
        .project-note p { margin-bottom: 8px; color: #374151; }
        .project-note strong { color: #00D9A6; font-weight: 600; }
        .timeline {
          display: inline-block;
          background: #F3F4F6;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 13px;
          color: #6B7280;
          margin: 16px 0 24px;
        }
        .btn {
          display: inline-block;
          background: #00D9A6;
          color: #0A0E1A;
          padding: 14px 32px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          margin: 16px 0 24px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 217, 166, 0.2);
        }
        .signature {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(10, 14, 26, 0.08);
          font-size: 14px;
          color: #6B7280;
        }
        .signature-name { font-weight: 600; color: #0A0E1A; margin-top: 4px; }
        .footer-links {
          margin-top: 16px;
          font-size: 12px;
          color: #9CA3AF;
        }
        .footer-links a { color: #00D9A6; text-decoration: none; margin: 0 8px; }
        @media (prefers-color-scheme: dark) {
          body { background: linear-gradient(135deg, #0A0E1A 0%, #111827 100%) !important; }
          .email-card { background: #111827 !important; border-color: rgba(0, 217, 166, 0.2) !important; }
          .title { color: #F8F7F4 !important; }
          .greeting { color: #00F0B8 !important; }
          .message { color: #9CA3AF !important; }
          .project-note { background: rgba(0, 217, 166, 0.08) !important; }
          .project-note p { color: #D1D5DB !important; }
          .timeline { background: #1F2937 !important; color: #9CA3AF !important; }
          .signature { border-top-color: rgba(248, 247, 244, 0.08) !important; }
          .signature-name { color: #F8F7F4 !important; }
        }
        @media only screen and (max-width: 560px) {
          .content { padding: 32px 24px 40px 24px; }
          .title { font-size: 24px; }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-card">
          <div class="accent-bar"></div>
          <div class="content">
            <div class="checkmark"><span>✓</span></div>
            <div class="greeting">Hello ${escapeHtml(firstName)},</div>
            <div class="title">Thank you for reaching out! ✨</div>
            <div class="message">
              I've received your inquiry and I'm genuinely excited to learn more about your project.
              I'll review your message carefully and get back to you within <strong>24 hours</strong>.
            </div>
            
            ${projectType ? `
            <div class="project-note">
              <p>📋 <strong>Project type:</strong> ${escapeHtml(projectType)}</p>
              <p style="margin-bottom: 0;">⚡ I'll prepare a tailored response based on your requirements.</p>
            </div>
            ` : ''}
            
            <div class="timeline">
              ⏱️ Response expected within 24 hours (usually faster)
            </div>
            
            <a href="mailto:ubaidtech274@gmail.com" class="btn">
              Reply directly →
            </a>
            
            <div class="signature">
              Best regards,<br/>
              <div class="signature-name">Muhammad Ubaidullah</div>
              <div style="font-size: 12px; margin-top: 4px;">Full-Stack Developer | ubaid.dev</div>
            </div>
            
            <div class="footer-links">
              <a href="https://ubaid.dev">Portfolio</a> • 
              <a href="https://github.com/ubaid215">GitHub</a> • 
              <a href="https://linkedin.com/in/ubaidullah-mernstack-developer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// XSS protection helper
function escapeHtml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}