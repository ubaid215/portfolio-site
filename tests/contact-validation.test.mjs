import test from "node:test"
import assert from "node:assert/strict"
import { validateContactPayload } from "../lib/contact-validation.ts"

const valid = {
  name: "  Jane Smith  ",
  email: "  jane@example.com  ",
  projectType: "Full Stack Web App",
  budget: "Let's discuss",
  message: "  We need an operations dashboard for our team.  ",
}

test("accepts and normalizes a complete inquiry", () => {
  assert.deepEqual(validateContactPayload(valid), {
    ok: true,
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      projectType: "Full Stack Web App",
      budget: "Let's discuss",
      message: "We need an operations dashboard for our team.",
    },
  })
})

test("rejects missing fields and malformed email addresses", () => {
  assert.equal(validateContactPayload({ ...valid, email: "not-an-email" }).ok, false)
  assert.equal(validateContactPayload({ ...valid, projectType: "" }).ok, false)
  assert.equal(validateContactPayload({ ...valid, message: "   " }).ok, false)
  assert.equal(validateContactPayload(null).ok, false)
})

test("rejects excessively long input before sending email", () => {
  assert.equal(validateContactPayload({ ...valid, message: "x".repeat(5001) }).ok, false)
})
