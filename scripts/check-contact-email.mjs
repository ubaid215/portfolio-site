import nextEnv from "@next/env"
import { createContactTransport, getGmailConfiguration } from "../lib/contact-mailer.ts"

// Uses Next's environment loading order. Never print credentials.
nextEnv.loadEnvConfig(process.cwd(), true)
try {
  const auth = getGmailConfiguration()
  const transport = createContactTransport(auth)
  await transport.verify()
  console.log("Gmail authentication and SMTP connection verified.")
  if (process.argv.includes("--send-test")) {
    const result = await transport.sendMail({
      from: { name: "ubaid.dev · Contact check", address: auth.user }, to: auth.user,
      subject: "ubaid.dev — contact form delivery check",
      text: "This test confirms that your portfolio can send email to your configured Gmail account. Please check your inbox and spam folder. No visitor data is included.",
    })
    if (!result.accepted.some((recipient) => (typeof recipient === "string" ? recipient : recipient.address).toLowerCase() === auth.user.toLowerCase())) {
      throw new Error("Gmail did not accept the test email.")
    }
    console.log("Gmail accepted the test email. Check your inbox and spam folder to confirm receipt.")
  } else { console.log("No email sent. Add --send-test to send one test to your own configured Gmail.") }
  transport.close()
} catch (error) {
  const code = error?.code
  console.error(code ? `Gmail check failed (${code}). See docs/contact-email-setup.md.` : "Gmail is missing configuration or did not accept the message. See docs/contact-email-setup.md.")
  process.exitCode = 1
}
