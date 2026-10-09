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
  categories: ProjectCategory[]
  stack: string[]
  shortDesc: string
  // Case Study
  problem: string
  problemPoints: string[]
  approach: string
  approachPoints: { title: string; desc: string }[]
  outcome: string
  // Visuals
  heroBg: string          // gradient or color for hero
  accentColor: string     // per-project accent override
  mockupColor: string     // bg color for screenshot placeholders
  coverImage: string      // card cover — /public/projects/{slug}/cover.png
  screenshots: {
    src: string           // /public/images/projects/{slug}/screen-1.png …
    alt: string
    span?: boolean        // true = full-width (16/9), false = half-width (4/3)
  }[]
}

export const PROJECTS: Project[] = [
  {
    slug: "ecommerce-platform",
    index: "01",
    title: "E-Commerce Platform + CMS",
    tagline: "Full retail engine with custom content management",
    year: "2025",
    role: "Solo Full Stack Developer",
    categories: ["Full Stack", "Client Work"],
    stack: ["React", "Node.js", "MongoDB", "Redux", "Express", "Cloudinary", "Stripe", "JWT"],
    shortDesc:
      "A retail storefront, inventory workflow, order management, and a custom CMS brought into one system.",
    problem:
      "A growing retail business was running their entire operation through spreadsheets and WhatsApp messages. Orders were getting lost, inventory was a mess, and they had zero visibility into what was actually selling. They needed a single system that their non-technical team could actually use.",
    problemPoints: [
      "No centralized inventory tracking — stockouts happened silently",
      "Zero analytics — decisions made on gut feel, not data",
      "Manual order processing took time away from customer service",
      "No branded online storefront — losing customers to competitors",
    ],
    approach:
      "I mapped the retail workflow around products, stock, orders, and reporting. A custom CMS gave the team a catalog interface aligned with its product structure.",
    approachPoints: [
      { title: "Custom CMS", desc: "Product management supports nested categories, variant SKUs, and bulk upload." },
      { title: "Inventory", desc: "Stock levels update across the management views when orders are recorded." },
      { title: "Analytics Dashboard", desc: "Sales reporting can be viewed by product, category, and date range, with CSV export." },
      { title: "Stripe Integration", desc: "Checkout and payment events connect to the order workflow through Stripe." },
    ],
    outcome:
      "Delivered a storefront and a shared back office for products, orders, stock, and sales reporting. The interface gives the team one place to manage the retail workflow.",
    heroBg: "linear-gradient(135deg, #0D1520 0%, #0A1628 50%, #061018 100%)",
    accentColor: "#00D9A6",
    mockupColor: "#111827",
    coverImage: "/images/projects/ecommerce-platform/cover.png",
    screenshots: [
      { src: "/images/projects/ecommerce-platform/screen-1.png", alt: "Dashboard overview", span: true },
      { src: "/images/projects/ecommerce-platform/screen-2.png", alt: "Product CMS", span: false },
      { src: "/images/projects/ecommerce-platform/screen-3.png", alt: "Retail storefront", span: false },
      { src: "/images/projects/ecommerce-platform/screen-4.png", alt: "Product browsing", span: false },
    ],
  },
  {
    slug: "school-management",
    index: "02",
    title: "School Management System",
    tagline: "Multi-portal platform — students, teachers, parents, admin",
    year: "2026",
    role: "Solo Full Stack Developer",
    categories: ["Full Stack", "SaaS", "Client Work"],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "WebSocket", "Redis", "BullMQ", "JWT"],
    shortDesc:
      "Four connected portals for attendance, grades, fees, and communication between school staff and families.",
    problem:
      "A private school network was running on paper registers and phone calls. Attendance was tracked manually, fee receipts were handwritten, and parents had no window into their child's progress. The admin team was drowning in paperwork.",
    problemPoints: [
      "Attendance tracked on paper — errors, loss, no historical data",
      "Fee collection untracked — outstanding balances unknown until month end",
      "Parents completely in the dark — complaints and missed communications",
      "No grade history — teachers kept personal notes that couldn't be shared",
    ],
    approach:
      "The central design challenge was giving students, teachers, parents, and administrators different views of shared school data. Role-based permissions shape each portal.",
    approachPoints: [
      { title: "Four Isolated Portals", desc: "Student, Teacher, Parent, and Admin dashboards share a codebase but are completely isolated by role. One authentication system, four experiences." },
      { title: "Attendance", desc: "Teachers record attendance in a mobile-friendly view; the system can notify parents about absences." },
      { title: "Fee Management", desc: "Fee schedules, deadlines, and overdue alerts live in the accounts workflow." },
      { title: "Grade Book & Reports", desc: "Teachers enter grades; parents see them immediately. End-of-term report cards generate as PDFs with a single click." },
    ],
    outcome:
      "Delivered connected views for students, teachers, parents, and administrators, with shared attendance, grades, and fee workflows.",
    heroBg: "linear-gradient(135deg, #0A0E1A 0%, #0E1628 50%, #080C18 100%)",
    accentColor: "#00D9A6",
    mockupColor: "#1C2333",
    coverImage: "/images/projects/school-management/cover.png",
    screenshots: [
      { src: "/images/projects/school-management/screen-1.png", alt: "Admin dashboard", span: true },
      { src: "/images/projects/school-management/screen-2.png", alt: "Teacher portal — student overview", span: false },
      { src: "/images/projects/school-management/screen-3.png", alt: "Student enrollment", span: false },
      { src: "/images/projects/school-management/screen-4.png", alt: "Student portal", span: false },
    ],
  },
  {
    slug: "restaurant-pos",
    index: "03",
    title: "Restaurant POS + CMS",
    tagline: "Full point-of-sale with kitchen flow and revenue analytics",
    year: "2026",
    role: "Solo Full Stack Developer",
    categories: ["Full Stack", "Client Work"],
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "WebSocket", "Mongoose", "JWT"],
    shortDesc:
      "A cohesive restaurant platform — table ordering, kitchen display system, menu CMS, and end-of-day revenue reporting — all in one.",
    problem:
      "The restaurant needed ordering, kitchen status, menu changes, and reporting to work together. Its previous process split these jobs across separate tools.",
    problemPoints: [
      "Orders lost in transit from front-of-house to kitchen",
      "Menu updates required reprinting every week — costly and slow",
      "Zero revenue analytics — no idea which items were profitable",
      "Table turnover blindspot — no visibility into table status",
    ],
    approach:
      "I designed this as one system, not three tools glued together. The core insight: the menu CMS, POS, and kitchen display all read from the same data model. A menu change in the CMS reflects on the POS and kitchen screen instantly.",
    approachPoints: [
      { title: "Unified Data Model", desc: "Menu items, orders, and table states share a data model across the interfaces." },
      { title: "Kitchen Display System", desc: "WebSocket-powered kitchen screen shows orders in real-time. Chefs mark items ready; the status updates on the server's POS instantly." },
      { title: "Table Management", desc: "Visual floor plan with live table states — available, occupied, billed. Servers see the entire restaurant at a glance." },
      { title: "Revenue Dashboard", desc: "Daily, weekly, monthly revenue breakdowns. Best-selling items, peak hour analysis, average ticket size. Exportable for accounting." },
    ],
    outcome:
      "Delivered a shared flow from table orders to kitchen status, menu changes, and revenue reporting. The team can follow service from one connected system.",
    heroBg: "linear-gradient(135deg, #100A0A 0%, #1A0E0E 50%, #0D0808 100%)",
    accentColor: "#00D9A6",
    mockupColor: "#1C1010",
    coverImage: "/images/projects/restaurant-pos/cover.png",
    screenshots: [
      { src: "/images/projects/restaurant-pos/screen-1.png", alt: "POS order view", span: true },
      { src: "/images/projects/restaurant-pos/screen-2.png", alt: "Restaurant menu", span: false },
      { src: "/images/projects/restaurant-pos/screen-3.png", alt: "Restaurant homepage", span: false },
      { src: "/images/projects/restaurant-pos/screen-4.png", alt: "Revenue dashboard", span: false },
    ],
  },
  {
    slug: "donation-dashboard",
    index: "04",
    title: "Donation Manager + WhatsApp Bot",
    tagline: "Campaign dashboard with official WhatsApp Business API",
    year: "2026",
    role: "Solo Full Stack Developer",
    categories: ["Full Stack", "SaaS", "Client Work"],
    stack: ["React", "Node.js", "MongoDB", "Meta API", "BullMQ", "Redis", "Mongoose", "JWT"],
    shortDesc:
      "A donor management platform with automated WhatsApp messaging, campaign tracking, and bulk template broadcasting — powered by the official Meta Business API.",
    problem:
      "The organization needed to organize donor records and campaign communication instead of managing them through personal accounts and spreadsheets.",
    problemPoints: [
      "Personal WhatsApp accounts at risk of ban for bulk messaging",
      "No donor CRM — contacts in spreadsheets, no history",
      "Campaign performance invisible — no open rates, no response tracking",
      "Donation receipts sent manually, days late",
    ],
    approach:
      "WhatsApp Business messaging requires approved templates and rate-aware sending. I used a queue-based architecture with BullMQ and Redis to coordinate campaigns.",
    approachPoints: [
      { title: "Queue-Based Messaging", desc: "BullMQ and Redis coordinate dispatch so campaigns can be paced around API limits." },
      { title: "Template Management", desc: "Dashboard for creating, submitting, and tracking Meta template approvals. Approved templates are available for campaigns immediately." },
      { title: "Donor CRM", desc: "Full donor profiles with donation history, campaign engagement, and communication logs. Segment donors by amount, recency, or campaign participation." },
      { title: "Receipt Workflow", desc: "Donation events can trigger WhatsApp acknowledgments through the messaging queue." },
    ],
    outcome:
      "Delivered donor records, campaign tracking, approved template management, and queued WhatsApp messaging in a single dashboard.",
    heroBg: "linear-gradient(135deg, #0A0E1A 0%, #0A1018 50%, #060C14 100%)",
    accentColor: "#00D9A6",
    mockupColor: "#1A2030",
    coverImage: "/images/projects/donation-dashboard/cover.png",
    screenshots: [
      { src: "/images/projects/donation-dashboard/screen-1.png", alt: "Donation dashboard", span: true },
      { src: "/images/projects/donation-dashboard/screen-2.png", alt: "Donation entry", span: false },
      { src: "/images/projects/donation-dashboard/screen-3.png", alt: "Donation reports", span: false },
    ],
  },
  {
    slug: "tax-websites",
    index: "05",
    title: "Tax Firm Websites (×2)",
    tagline: "Lead-generating web presence for professional tax firms",
    year: "2025",
    role: "Frontend Developer",
    categories: ["Frontend", "Client Work"],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel", "Resend"],
    shortDesc:
      "Two tax advisory websites with clearer service navigation, contact paths, and responsive layouts.",
    problem:
      "Two tax advisory firms needed clearer service pages, contact routes, and mobile presentation for prospective clients.",
    problemPoints: [
      "Service pages needed clearer page titles and metadata",
      "Enquiry paths were difficult to find",
      "Mobile presentation needed attention",
      "Credentials and service details needed stronger placement",
    ],
    approach:
      "The sites were structured to explain the firms' services, establish credibility, and give visitors a clear next step. Responsive layouts and page metadata supported that goal.",
    approachPoints: [
      { title: "SEO-First Architecture", desc: "Next.js App Router with server-side rendering. Structured data markup, semantic HTML, and optimized metadata for every service page." },
      { title: "Conversion-Led Design", desc: "Clear hierarchy: what you do → who it's for → why trust you → how to start. Every page ends with a friction-free contact path." },
      { title: "Performance Work", desc: "Images, fonts, and JavaScript were considered as part of page performance." },
      { title: "Contact & Lead Flow", desc: "Enquiry forms connect visitors with the firms through email notifications." },
    ],
    outcome:
      "Delivered two responsive sites with dedicated service pages, structured metadata, and direct enquiry routes. Search and conversion gains need client analytics to verify.",
    heroBg: "linear-gradient(135deg, #0A0C14 0%, #0E1020 50%, #080A12 100%)",
    accentColor: "#00D9A6",
    mockupColor: "#12151F",
    coverImage: "/images/projects/tax-websites/cover.png",
    screenshots: [
      { src: "/images/projects/tax-websites/screen-1.png", alt: "Homepage hero", span: true },
      { src: "/images/projects/tax-websites/screen-2.png", alt: "Firm vision and approach", span: false },
      { src: "/images/projects/tax-websites/screen-3.png", alt: "Contact form", span: false },
    ],
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
