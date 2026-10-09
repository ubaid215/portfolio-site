# Contact enquiries → Gmail

The contact form sends the complete enquiry to `GMAIL_USER`, using that same Google account to authenticate. Replying to a notification addresses the visitor. A visitor acknowledgment is attempted only after Gmail accepts the owner notification; its failure does not cause duplicate enquiries.

## Set up locally (Windows)

1. Enable [2-Step Verification](https://myaccount.google.com/security) on the Google account that should receive enquiries.
2. Open [Google App Passwords](https://myaccount.google.com/apppasswords), create one named “ubaid.dev contact”, and keep the generated 16-character password private. Google explains account restrictions in its [app password guide](https://support.google.com/accounts/answer/185833).
3. In a terminal in the project folder, run:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-gmail.ps1
   ```

   The script asks for the Gmail address and a hidden app password, saves them in the Git-ignored `.env.local`, verifies SMTP authentication, and sends one test email **to that same account**. It preserves unrelated environment variables. Credentials are never printed.
4. Check Gmail’s inbox and spam folder for **ubaid.dev — contact form delivery check**. SMTP acceptance means Google accepted the message; seeing it in Gmail confirms receipt.
5. Restart `npm run dev`. Submit the contact form using an email address you control to test the enquiry and acknowledgment together.

If App Passwords is unavailable, follow Google’s guide: the account may be managed by an organization, protected by Advanced Protection, or configured with security-key-only verification. Do not use your regular Google password.

## Configure the live website

In your hosting project’s environment settings, add these **server-only** variables using the same values:

```dotenv
GMAIL_USER=your-address@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

Set them for the environment where the site runs, then redeploy. Never prefix them with `NEXT_PUBLIC_` or commit real values. Local `.env.local` does not configure hosting.

The public `hi@ubaid.dev` address remains unchanged. It must have its own working mailbox or forwarding arrangement for direct email links; this SMTP setup sends **form enquiries** to Gmail and does not create domain email forwarding.

## Check again

```powershell
node --experimental-strip-types scripts/check-contact-email.mjs
node --experimental-strip-types scripts/check-contact-email.mjs --send-test
```

The first command only verifies configuration and authentication. The second also sends a test to your configured account.

Errors: `EAUTH` usually requires a valid app password; `ETIMEDOUT` / `ECONNECTION` indicate an SMTP connection problem. Check hosting SMTP access and Google account security activity. If you change your Google password, regenerate the app password. [Nodemailer’s Gmail guide](https://nodemailer.com/guides/using-gmail) describes Google’s connection restrictions.

## Verification without credentials

```powershell
node --experimental-strip-types --test tests/contact-mailer.test.mjs
```

These tests use a mock transport: owner routing, reply-to, escaped HTML, text fallback, SMTP failure/rejection, acknowledgment failure, and payload validation. They do not send mail. Without real credentials and an inbox check, live delivery remains unverified.
