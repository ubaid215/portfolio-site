import assert from "node:assert/strict"
import { test } from "node:test"
import { getGmailConfiguration, deliverContactInquiry } from "../lib/contact-mailer.ts"
import { validateContactPayload } from "../lib/contact-validation.ts"

const mailbox = "owner@example.com"
const inquiry = { name: "Alex <script>", email: "visitor@example.com", projectType: "AI Automation", budget: "Under $2,500", message: "Connect our tools.\nKeep <details> intact." }

test("configuration requires credentials and normalizes Google's spaced app password", () => {
  assert.throws(() => getGmailConfiguration({}), /not configured/)
  assert.deepEqual(getGmailConfiguration({ GMAIL_USER: " owner@example.com ", GMAIL_APP_PASSWORD: "abcd efgh ijkl mnop" }), { user: mailbox, pass: "abcdefghijklmnop" })
})
test("owner notification carries reply-to, readable text and escaped HTML", async () => {
  const messages = []
  const transport = { sendMail: async (mail) => { messages.push(mail); return { accepted: [mail.to], rejected: [] } } }
  const result = await deliverContactInquiry(transport, mailbox, inquiry, "hi@ubaid.dev")
  assert.equal(result.accepted, true)
  assert.equal(messages[0].to, mailbox)
  assert.equal(messages[0].replyTo, inquiry.email)
  assert.match(messages[0].text, /Connect our tools\./)
  assert.match(messages[0].html, /Alex &lt;script&gt;/)
  assert.doesNotMatch(messages[0].html, /Alex <script>/)
  assert.equal(messages[1].to, inquiry.email)
})
test("an SMTP rejection never sends an acknowledgment or reports success", async () => {
  let calls = 0
  const transport = { sendMail: async () => { calls++; return { accepted: [], rejected: [mailbox] } } }
  await assert.rejects(deliverContactInquiry(transport, mailbox, inquiry, "hi@ubaid.dev"), /not accepted/)
  assert.equal(calls, 1)
})
test("SMTP failure is propagated", async () => {
  const transport = { sendMail: async () => { throw new Error("SMTP unavailable") } }
  await assert.rejects(deliverContactInquiry(transport, mailbox, inquiry, "hi@ubaid.dev"), /SMTP unavailable/)
})
test("failed acknowledgment cannot turn an accepted enquiry into a retry", async () => {
  let calls = 0
  const transport = { sendMail: async () => { if (++calls === 2) throw new Error("Ack failed"); return { accepted: [mailbox], rejected: [] } } }
  assert.deepEqual(await deliverContactInquiry(transport, mailbox, inquiry, "hi@ubaid.dev"), { accepted: true, acknowledgmentSent: false })
})
test("malformed, blank, invalid email, oversized and header-injection payloads are rejected", () => {
  for (const value of [null, [], {}, { ...inquiry, name: " " }, { ...inquiry, email: "bad@" }, { ...inquiry, message: "x".repeat(5001) }, { ...inquiry, name: "Alex\r\nBcc: injected@example.com" }]) {
    assert.equal(validateContactPayload(value).ok, false)
  }
  const result = validateContactPayload({ ...inquiry, name: " Alex ", budget: undefined })
  assert.equal(result.ok, true)
  assert.equal(result.data.name, "Alex")
  assert.equal(result.data.budget, "")
})
