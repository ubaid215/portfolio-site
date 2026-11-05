// lib/service-pages.ts
// Dedicated landing pages for the first commercial priorities. Each one answers
// a single buying question and points at real project evidence. The other
// offers (generative AI, SEO, digital marketing) stay on /services until there
// is distinct evidence to support a page of their own.

export interface ServicePage {
  slug: string
  name: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
  eyebrow: string
  headline: string
  lead: string
  situations: { title: string; detail: string }[]
  included: string[]
  price: string
  timing: string
  priceNote: string
  proof: { slug: string; note: string }[]
  faqs: { question: string; answer: string }[]
  relatedGuide?: string
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "website-development",
    name: "Website development",
    seoTitle: "Business Website Development for Service Firms | Ubaidullah",
    seoDescription:
      "Fast, search-ready business websites with clear service pages and a direct enquiry path. Built in Next.js, handed over with full ownership.",
    keywords: [
      "business website development",
      "freelance website developer",
      "service business website",
      "Next.js website developer",
      "SEO-ready website",
    ],
    eyebrow: "Website development",
    headline: "A website that turns visitors into enquiries.",
    lead:
      "Clear service pages, a fast experience on a phone, and a contact path that reaches your inbox. Built so search engines can understand what you offer, and handed over so you own it.",
    situations: [
      { title: "Your site looks fine but nobody enquires", detail: "Visitors cannot tell what you do, who it is for, or how to start. We fix the structure before the styling." },
      { title: "You are invisible in search", detail: "No service pages, no metadata, no sitemap. The technical foundation is part of the build, not an add-on." },
      { title: "You are stuck with a template", detail: "Slow builders and plugin sprawl. A custom build loads fast and does only what your business needs." },
    ],
    included: [
      "Service pages written around what your customers search for",
      "Mobile-first, fast-loading build in Next.js",
      "Titles, descriptions, structured data, sitemap and robots policy",
      "Enquiry form that delivers to your inbox, with spam checks",
      "Analytics and Search Console set up with lead tracking",
      "Handover: your domain, your hosting account, your code",
    ],
    price: "From $900",
    timing: "2–5 weeks",
    priceNote: "Fixed quote after a short call. Most service-business sites fall between $900 and $2,500 depending on page count and content.",
    proof: [
      { slug: "tax-websites", note: "Two tax advisory sites with dedicated service pages, structured metadata and direct enquiry routes." },
    ],
    faqs: [
      { question: "Do you write the content?", answer: "I structure every page and draft the copy from a short questionnaire and call. You review and correct the facts about your business before anything goes live." },
      { question: "Can I edit the site myself afterwards?", answer: "Yes. Where you need to change content often, I add a simple editing workflow. We agree on what you will edit before the build starts." },
      { question: "Will you guarantee rankings?", answer: "No honest developer can. I build the technical and content foundation search engines need, set up measurement, and show you what to track." },
    ],
  },
  {
    slug: "saas-development",
    name: "Web applications & dashboards",
    seoTitle: "Custom Dashboard & Web App Development | Ubaidullah",
    seoDescription:
      "Custom dashboards, internal tools and SaaS MVPs with role-based access, reporting and integrations. Fixed scope, weekly demos, full code ownership.",
    keywords: [
      "custom dashboard development",
      "internal tool development",
      "SaaS MVP developer",
      "custom web application development",
      "admin panel development",
    ],
    eyebrow: "Web applications & dashboards",
    headline: "Replace the spreadsheets your team is outgrowing.",
    lead:
      "Dashboards, portals and internal tools that bring your orders, stock, people and numbers into one place, with the right view for each role. Or a focused MVP to test a product idea.",
    situations: [
      { title: "Work lives in spreadsheets and chats", detail: "Orders on WhatsApp, stock in a sheet, reports built by hand every Friday. One system removes the copying." },
      { title: "Different people need different views", detail: "Owners, staff, customers or parents each see what they need, and nothing they should not." },
      { title: "You want to test a product idea", detail: "A first release with the core workflow, accounts and payments, scoped so you can learn before you spend more." },
    ],
    included: [
      "Discovery session that turns your workflow into a written scope",
      "Role-based logins and permissions",
      "Dashboards and reports, with CSV export where you need it",
      "Integrations with payments, messaging or the tools you already use",
      "A working demo every week you can click through",
      "Deployment, documentation and full code ownership",
    ],
    price: "From $900",
    timing: "3–14 weeks",
    priceNote: "Dashboards and internal tools start from $900 (3–7 weeks). Product MVPs start from $2,500 (6–14 weeks). The fixed quote follows the agreed scope.",
    proof: [
      { slug: "school-management", note: "Four role-based portals sharing attendance, grades and fee workflows." },
      { slug: "ecommerce-platform", note: "Inventory, orders and sales reporting replacing spreadsheets and WhatsApp orders." },
      { slug: "donation-dashboard", note: "Donor CRM with queued WhatsApp messaging and template management." },
    ],
    faqs: [
      { question: "Can we start with a small first version?", answer: "Yes, and I recommend it. We pick the one workflow that saves the most time, ship that, and plan the next release from real use." },
      { question: "Who owns the code?", answer: "You do. The repository, hosting and data accounts are in your name or transferred to you at handover." },
      { question: "Can you work on our existing system?", answer: "Often, yes. I review the codebase first and tell you honestly whether extending it or replacing a part of it is the better investment." },
    ],
    relatedGuide: "custom-dashboard-cost",
  },
  {
    slug: "ai-automation",
    name: "AI automation",
    seoTitle: "AI Workflow Automation with n8n, OpenAI & Claude | Ubaidullah",
    seoDescription:
      "Automate lead follow-up, enquiry routing and repetitive admin with n8n and AI models, with human review points your team controls.",
    keywords: [
      "AI workflow automation",
      "n8n automation developer",
      "AI lead follow-up automation",
      "business process automation",
      "OpenAI API integration",
    ],
    eyebrow: "AI automation",
    headline: "Stop doing the same admin task fifty times a week.",
    lead:
      "Connect your forms, inbox, CRM and messaging so enquiries get answered, routed and followed up automatically. AI drafts the reply; your team approves what matters.",
    situations: [
      { title: "Leads wait hours for a reply", detail: "An enquiry arrives, gets summarised and routed, and a draft reply is ready for approval in minutes." },
      { title: "Your team copies data between tools", detail: "Form to CRM to spreadsheet to email. A workflow moves it once, correctly, and logs what happened." },
      { title: "Follow-ups fall through the cracks", detail: "Quotes and unanswered enquiries get a timed, personalised nudge instead of being forgotten." },
    ],
    included: [
      "A workflow map of what happens today and what to automate first",
      "n8n workflows connecting your existing tools",
      "OpenAI or Claude steps with clear prompts and review points",
      "Error alerts and a manual fallback when something fails",
      "Data and credential boundaries documented",
      "A handover session so your team can run and adjust it",
    ],
    price: "Quoted by workflow",
    timing: "1–4 weeks",
    priceNote: "Most single workflows are a fixed quote agreed on the first call. Ongoing AI provider and hosting costs are shown up front.",
    proof: [
      { slug: "donation-dashboard", note: "Queued WhatsApp messaging that paces campaigns around API limits, with approved templates and receipts triggered by donation events." },
    ],
    faqs: [
      { question: "Do you have AI client case studies?", answer: "Not published yet. The donation platform shows the messaging and queue work behind it. On the call we map your workflow and agree a small, fixed-price first automation, so you can judge the result before committing to more." },
      { question: "Will AI send messages without anyone checking?", answer: "Only where you decide it should. By default, AI prepares drafts and summaries and a person approves anything customer-facing." },
      { question: "What does it cost to run?", answer: "You pay the AI provider and hosting directly. I estimate monthly running costs from your volumes before we build, so there are no surprises." },
    ],
  },
]

export function getServicePage(slug: string) {
  return SERVICE_PAGES.find((page) => page.slug === slug)
}
