// lib/faqs.ts
// The FAQ copy is shared by the visible /services page and its FAQPage schema,
// so the structured data can never drift from what a visitor is shown.

export const SERVICE_FAQS = [
  {
    question: "What do I need before we start?",
    answer:
      "A goal, a challenge, or a rough idea is enough to start the conversation. I’ll help you work through the people using the product, the priorities, and what belongs in the first version.",
  },
  {
    question: "Can we start small and build from there?",
    answer:
      "Yes. We can agree on a focused first release, review what people need, and plan the next steps around what we learn. Scope and priorities stay part of the conversation as the product grows.",
  },
  {
    question: "How do you decide where AI belongs?",
    answer:
      "We look at the task, the information it needs, and what a useful result looks like. Before connecting a model, we discuss the data, providers, access, and the points where your team should review or take over.",
  },
  {
    question: "Can you work with our existing team or product?",
    answer:
      "I can collaborate on an existing product or take responsibility for a focused build. We’ll discuss the role, the codebase, and the way we’ll communicate before deciding how the work fits together.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We agree on ownership, documentation, and any ongoing support before launch. For SEO, marketing, or an evolving product, we can also discuss a continued working arrangement around a clear set of priorities.",
  },
] as const
