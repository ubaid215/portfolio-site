export interface ContactInquiry {
  name: string
  email: string
  projectType: string
  budget: string
  message: string
}

export type ContactValidation =
  | { ok: true; data: ContactInquiry }
  | { ok: false; error: string }

export function validateContactPayload(value: unknown): ContactValidation {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, error: "Enter your contact details and project description." }
  }

  const input = value as Record<string, unknown>
  const fields = ["name", "email", "projectType", "message"] as const
  for (const field of fields) {
    if (typeof input[field] !== "string" || !input[field].trim()) {
      return { ok: false, error: "Complete all required fields before sending." }
    }
  }

  const name = (input.name as string).trim()
  const email = (input.email as string).trim()
  const projectType = (input.projectType as string).trim()
  const message = (input.message as string).trim()
  const budget = typeof input.budget === "string" ? input.budget.trim() : ""

  if (name.length > 120 || email.length > 254 || projectType.length > 120 || budget.length > 80 || message.length > 5000) {
    return { ok: false, error: "Shorten your message or contact details and try again." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address so I can reply." }
  }
  if (/[\r\n\u0000]/.test(name + projectType + budget)) {
    return { ok: false, error: "Use a single line for your name, service, and budget." }
  }

  return { ok: true, data: { name, email, projectType, budget, message } }
}
