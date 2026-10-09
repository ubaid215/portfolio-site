import { NextResponse } from "next/server"
import { validateContactPayload } from "@/lib/contact-validation"
import { createContactTransport, deliverContactInquiry, getGmailConfiguration } from "@/lib/contact-mailer"
import { CONTACT_EMAIL } from "@/lib/site"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let payload: unknown
  try { payload = await request.json() }
  catch { return NextResponse.json({ error: "Send a valid enquiry." }, { status: 400 }) }
  const validation = validateContactPayload(payload)
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 })

  let auth: ReturnType<typeof getGmailConfiguration>
  try { auth = getGmailConfiguration() }
  catch {
    return NextResponse.json({ error: `The form is temporarily unavailable. Please email ${CONTACT_EMAIL} directly.` }, { status: 503 })
  }
  try {
    await deliverContactInquiry(createContactTransport(auth), auth.user, validation.data, CONTACT_EMAIL)
    return NextResponse.json({ success: true })
  } catch (error) {
    // Log only the diagnostic code. Credentials and visitor messages stay out of logs.
    console.error("[contact] Gmail delivery failed", { code: (error as { code?: string })?.code || "DELIVERY_FAILED" })
    return NextResponse.json({ error: `Your message could not be sent. Please email ${CONTACT_EMAIL} directly.` }, { status: 503 })
  }
}