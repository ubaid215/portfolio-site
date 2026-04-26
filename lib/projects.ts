// lib/projects.ts
// Central data source for all project pages

export type ProjectCategory = "Full Stack" | "Frontend" | "SaaS" | "Client Work"

export interface Project {
  slug: string
  index: string
  title: string
  tagline: string
  year: string
  role: string
  status: "Production" | "Shipped" | "Live"
  categories: ProjectCategory[]
  stack: string[]
  shortDesc: string
  // Case Study
  problem: string
  problemPoints: string[]
  approach: string
  approachPoints: { title: string; desc: string }[]
  outcome: string
  outcomeStats: { value: string; label: string }[]
  // Visuals (placeholder paths — swap with real screenshots)
  heroBg: string        // gradient or color for hero
  accentColor: string   // per-project accent override (still uses --accent for brand)
  mockupColor: string   // bg color for screenshot placeholders
}

export const PROJECTS: Project[] = [
  {
    slug: "ecommerce-platform",
    index: "01",
    title: "E-Commerce Platform + CMS",
    tagline: "Full retail engine with custom content management",
    year: "2024",
    role: "Solo Full Stack Developer",
    status: "Production",
    categories: ["Full Stack", "Client Work"],
    stack: ["React", "Node.js", "MongoDB", "Redux", "Express", "Cloudinary", "Stripe", "JWT"],
    shortDesc:
      "End-to-end retail platform with live inventory management, analytics dashboard, and a bespoke CMS — shipped solo from DB schema to cloud deployment.",
    problem:
      "A growing retail business was running their entire operation through spreadsheets and WhatsApp messages. Orders were getting lost, inventory was a mess, and they had zero visibility into what was actually selling. They needed a single system that their non-technical team could actually use.",
    problemPoints: [
      "No centralized inventory tracking — stockouts happened silently",
      "Zero analytics — decisions made on gut feel, not data",
      "Manual order processing consuming 4+ hours per day",
      "No branded online storefront — losing customers to competitors",
    ],
    approach:
      "I started with a week of discovery — sitting with the operations team and mapping every workflow they had. The architecture decision that mattered most: a custom CMS over a headless solution like Contentful, because their catalog structure didn't fit standard schemas.",
    approachPoints: [
      { title: "Custom CMS First", desc: "Built a product management system shaped around their actual catalog — nested categories, variant SKUs, and bulk upload. The team was managing 300+ products in day one." },
      { title: "Real-Time Inventory", desc: "MongoDB change streams power live stock level updates. When an order comes in, inventory adjusts instantly across all views — no batch jobs, no lag." },
      { title: "Analytics Dashboard", desc: "Revenue by product, by category, by date range. Exportable to CSV. The owner went from zero visibility to checking their dashboard before morning coffee." },
      { title: "Stripe Integration", desc: "Embedded checkout with webhook-driven order fulfillment. Payment failures, refunds, and disputes all handled without manual intervention." },
    ],
    outcome:
      "The client went from spreadsheet chaos to a fully-automated retail operation. Within 60 days of launch, they reported a measurable reduction in order errors and significant time savings.",
    outcomeStats: [
      { value: "4hrs", label: "Daily time saved on order processing" },
      { value: "300+", label: "Products migrated on day one" },
      { value: "0", label: "Abandoned repos — shipped to production" },
      { value: "60d", label: "To full operational adoption" },
    ],
    heroBg: "linear-gradient(135deg, #0D1520 0%, #0A1628 50%, #061018 100%)",
    accentColor: "#00D9A6",
    mockupColor: "#111827",
  },
  {
    slug: "school-management",
    index: "02",
    title: "School Management System",
    tagline: "Multi-portal platform — students, teachers, parents, admin",
    year: "2024",
    role: "Solo Full Stack Developer",
    status: "Production",
    categories: ["Full Stack", "SaaS", "Client Work"],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "WebSocket", "Redis", "BullMQ", "JWT"],
    shortDesc:
      "A four-portal school platform handling attendance, grading, fee collection, real-time notifications, and parent communication — built solo end-to-end.",
    problem:
      "A private school network was running on paper registers and phone calls. Attendance was tracked manually, fee receipts were handwritten, and parents had no window into their child's progress. The admin team was drowning in paperwork.",
    problemPoints: [
      "Attendance tracked on paper — errors, loss, no historical data",
      "Fee collection untracked — outstanding balances unknown until month end",
      "Parents completely in the dark — complaints and missed communications",
      "No grade history — teachers kept personal notes that couldn't be shared",
    ],
    approach:
      "The biggest architectural challenge was four completely different user types with vastly different permissions and views. I used NestJS guards with role-based access control at the route level, with Prisma Row-Level Security ensuring data isolation between portals.",
    approachPoints: [
      { title: "Four Isolated Portals", desc: "Student, Teacher, Parent, and Admin dashboards share a codebase but are completely isolated by role. One authentication system, four experiences." },
      { title: "Real-Time Attendance", desc: "Teachers mark attendance via a mobile-optimized interface. Parents receive a push notification the moment their child is marked absent — via WebSocket, no polling." },
      { title: "Automated Fee Management", desc: "Fee schedules, payment deadlines, and overdue alerts are automated with BullMQ. The accounts team went from manual follow-ups to exception-based management." },
      { title: "Grade Book & Reports", desc: "Teachers enter grades; parents see them immediately. End-of-term report cards generate as PDFs with a single click." },
    ],
    outcome:
      "The school eliminated paper-based administration entirely within the first term. The system now handles 500+ students across three campuses from a single dashboard.",
    outcomeStats: [
      { value: "500+", label: "Students on platform" },
      { value: "4", label: "User portals, one codebase" },
      { value: "3", label: "Campuses managed centrally" },
      { value: "100%", label: "Paper attendance eliminated" },
    ],
    heroBg: "linear-gradient(135deg, #0A0E1A 0%, #0E1628 50%, #080C18 100%)",
    accentColor: "#00D9A6",
    mockupColor: "#1C2333",
  },
  {
    slug: "restaurant-pos",
    index: "03",
    title: "Restaurant POS + CMS",
    tagline: "Full point-of-sale with kitchen flow and revenue analytics",
    year: "2023",
    role: "Solo Full Stack Developer",
    status: "Production",
    categories: ["Full Stack", "Client Work"],
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "WebSocket", "Mongoose", "JWT"],
    shortDesc:
      "A cohesive restaurant platform — table ordering, kitchen display system, menu CMS, and end-of-day revenue reporting — all in one.",
    problem:
      "A busy restaurant was using three different tools: a basic POS that couldn't talk to their kitchen, a manual menu printed weekly, and a spreadsheet for daily revenue. Nothing connected. Errors were constant. Peak hour was chaos.",
    problemPoints: [
      "Orders lost in transit from front-of-house to kitchen",
      "Menu updates required reprinting every week — costly and slow",
      "Zero revenue analytics — no idea which items were profitable",
      "Table turnover blindspot — no visibility into table status",
    ],
    approach:
      "I designed this as one system, not three tools glued together. The core insight: the menu CMS, POS, and kitchen display all read from the same data model. A menu change in the CMS reflects on the POS and kitchen screen instantly.",
    approachPoints: [
      { title: "Unified Data Model", desc: "Menu items, orders, and table states live in one MongoDB schema. Every interface reads from the same source — consistency guaranteed, no sync issues." },
      { title: "Kitchen Display System", desc: "WebSocket-powered kitchen screen shows orders in real-time. Chefs mark items ready; the status updates on the server's POS instantly." },
      { title: "Table Management", desc: "Visual floor plan with live table states — available, occupied, billed. Servers see the entire restaurant at a glance." },
      { title: "Revenue Dashboard", desc: "Daily, weekly, monthly revenue breakdowns. Best-selling items, peak hour analysis, average ticket size. Exportable for accounting." },
    ],
    outcome:
      "The restaurant eliminated order errors during peak service and gained their first real view into what their business looked like as a data set.",
    outcomeStats: [
      { value: "~0", label: "Order errors during peak service" },
      { value: "Real-time", label: "Kitchen-to-server communication" },
      { value: "Daily", label: "Revenue reports, automated" },
      { value: "1", label: "System replacing 3 tools" },
    ],
    heroBg: "linear-gradient(135deg, #100A0A 0%, #1A0E0E 50%, #0D0808 100%)",
    accentColor: "#00D9A6",
    mockupColor: "#1C1010",
  },
  {
    slug: "donation-dashboard",
    index: "04",
    title: "Donation Manager + WhatsApp Bot",
    tagline: "Campaign dashboard with official WhatsApp Business API",
    year: "2024",
    role: "Solo Full Stack Developer",
    status: "Production",
    categories: ["Full Stack", "SaaS", "Client Work"],
    stack: ["React", "Node.js", "MongoDB", "Meta API", "BullMQ", "Redis", "Mongoose", "JWT"],
    shortDesc:
      "A donor management platform with automated WhatsApp messaging, campaign tracking, and bulk template broadcasting — powered by the official Meta Business API.",
    problem:
      "A charitable organization was manually messaging thousands of donors via personal WhatsApp accounts — risking bans, unable to track responses, and losing donor relationships. They needed a scalable, compliant solution.",
    problemPoints: [
      "Personal WhatsApp accounts at risk of ban for bulk messaging",
      "No donor CRM — contacts in spreadsheets, no history",
      "Campaign performance invisible — no open rates, no response tracking",
      "Donation receipts sent manually, days late",
    ],
    approach:
      "The Meta WhatsApp Business API has strict rate limits and template approval requirements. I built a queue-based architecture with BullMQ and Redis that respects those limits while still enabling bulk campaigns — sending thousands of messages without a single ban.",
    approachPoints: [
      { title: "Queue-Based Messaging", desc: "BullMQ with Redis handles message dispatch. Campaigns queue up and send within Meta's rate limits — no manual throttling, no failed deliveries." },
      { title: "Template Management", desc: "Dashboard for creating, submitting, and tracking Meta template approvals. Approved templates are available for campaigns immediately." },
      { title: "Donor CRM", desc: "Full donor profiles with donation history, campaign engagement, and communication logs. Segment donors by amount, recency, or campaign participation." },
      { title: "Automated Receipts", desc: "Every donation triggers a WhatsApp receipt within seconds. Donors get immediate acknowledgment; the team gets zero manual work." },
    ],
    outcome:
      "The organization moved from risky personal accounts to a fully compliant, trackable messaging operation — with a donor database they could actually use.",
    outcomeStats: [
      { value: "10k+", label: "Messages sent via official API" },
      { value: "0", label: "Account bans since launch" },
      { value: "Instant", label: "Donation receipt delivery" },
      { value: "100%", label: "Meta API compliant" },
    ],
    heroBg: "linear-gradient(135deg, #0A0E1A 0%, #0A1018 50%, #060C14 100%)",
    accentColor: "#00D9A6",
    mockupColor: "#1A2030",
  },
  {
    slug: "tax-websites",
    index: "05",
    title: "Tax Firm Websites (×2)",
    tagline: "Lead-generating web presence for professional tax firms",
    year: "2023",
    role: "Frontend Developer",
    status: "Live",
    categories: ["Frontend", "Client Work"],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel", "Resend"],
    shortDesc:
      "Two polished, conversion-optimized websites for UK-based tax advisory firms — fast, SEO-ready, and built to turn organic traffic into consultation bookings.",
    problem:
      "Two independent tax advisory firms were operating with outdated, template-based websites that ranked poorly on Google and converted almost no visitors into enquiries. Their competitors had modern sites. They didn't.",
    problemPoints: [
      "Template sites with no SEO optimization — invisible on Google",
      "No conversion path — visitors left without making contact",
      "Mobile experience broken — major traffic source ignored",
      "No trust signals — no case studies, no credentials, no social proof",
    ],
    approach:
      "Tax websites live or die on trust and speed. I treated both as conversion tools, not brochures — every section has a clear job to do. The technical stack is optimized for Core Web Vitals because in competitive local search, a 0.5s load time difference means rankings.",
    approachPoints: [
      { title: "SEO-First Architecture", desc: "Next.js App Router with server-side rendering. Structured data markup, semantic HTML, and optimized metadata for every service page." },
      { title: "Conversion-Led Design", desc: "Clear hierarchy: what you do → who it's for → why trust you → how to start. Every page ends with a friction-free contact path." },
      { title: "Performance Optimization", desc: "Core Web Vitals scores above 95 across all three metrics. Lazy-loaded images, font subsetting, and minimal JavaScript payload." },
      { title: "Contact & Lead Flow", desc: "Multi-step enquiry form connected to Resend for instant email notifications. No leads fall through the cracks." },
    ],
    outcome:
      "Both firms saw improvements in organic search visibility and enquiry volume within the first 90 days post-launch.",
    outcomeStats: [
      { value: "95+", label: "Lighthouse performance score" },
      { value: "2", label: "Firms, both live in production" },
      { value: "<1.5s", label: "Time to First Contentful Paint" },
      { value: "90d", label: "To measurable SEO improvements" },
    ],
    heroBg: "linear-gradient(135deg, #0A0C14 0%, #0E1020 50%, #080A12 100%)",
    accentColor: "#00D9A6",
    mockupColor: "#12151F",
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const idx = PROJECTS.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? PROJECTS[idx - 1] : null,
    next: idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null,
  }
}