// lib/guides.ts
// Buyer guides. Each answers one decision a prospective client is making, draws
// on a delivered project, and links to the matching offer. Competitor products
// are described in general terms only; no third-party prices are quoted.

export interface GuideSection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface Guide {
  slug: string
  title: string
  seoTitle: string
  description: string
  keywords: string[]
  published: string // ISO date
  updated: string
  readingMinutes: number
  summary: string
  sections: GuideSection[]
  related: { label: string; href: string }[]
}

export const GUIDES: Guide[] = [
  {
    slug: "custom-restaurant-pos-vs-subscription",
    title: "Custom restaurant POS or a subscription system: how to decide",
    seoTitle: "Custom Restaurant POS vs Subscription POS: How to Decide",
    description:
      "When an off-the-shelf POS is the right call, when a custom restaurant system pays off, and the questions to ask before you spend anything.",
    keywords: [
      "custom restaurant POS",
      "restaurant POS system development",
      "kitchen display system",
      "restaurant management software",
      "custom POS vs subscription POS",
    ],
    published: "2026-10-21",
    updated: "2026-10-21",
    readingMinutes: 6,
    summary:
      "If your restaurant runs a standard service and you need card hardware working tomorrow, a subscription POS is usually the right choice. A custom system earns its cost when your workflow does not fit the box, when several tools refuse to talk to each other, or when you want to own your data and stop paying per terminal.",
    sections: [
      {
        heading: "Start with the honest answer",
        paragraphs: [
          "Most small restaurants should start with an established subscription POS. They come with card terminals, receipt printers, support lines and years of edge cases already handled. If that fits how you work, building your own is money you do not need to spend.",
          "The trouble starts when the box no longer fits: orders get lost between the front desk and the kitchen, menu changes have to be made in three places, and the reports you actually want need an export, a spreadsheet and an evening.",
        ],
      },
      {
        heading: "When a subscription POS is the better choice",
        paragraphs: ["Choose an off-the-shelf system when most of these are true:"],
        list: [
          "You run a standard counter or table service with no unusual steps",
          "You need integrated card payments and hardware immediately",
          "You cannot tolerate any setup period before going live",
          "The built-in reports already answer your questions",
          "You do not mind a monthly fee per location or terminal",
        ],
      },
      {
        heading: "When a custom system makes sense",
        paragraphs: ["A custom build starts to pay off when several of these are true:"],
        list: [
          "Your workflow is specific: set menus, custom modifiers, a shared kitchen, a delivery counter, or several brands from one kitchen",
          "You are stitching together separate tools for ordering, the kitchen, the menu and reporting",
          "You want one menu that updates the POS, the kitchen screen and your website at once",
          "You want reports built around your decisions: best sellers, peak hours, average ticket, staff performance",
          "Per-terminal and add-on fees keep growing as you add screens or branches",
          "You want your sales data in a database you own, not only in a vendor dashboard",
        ],
      },
      {
        heading: "What a custom restaurant system should include at minimum",
        paragraphs: [
          "In the restaurant system I built, the core decision was a single data model: menu items, orders and table states are shared across every screen. A menu change in the CMS shows on the POS and the kitchen display immediately, and the kitchen marks items ready so the front of house sees it in real time.",
          "Whoever builds yours, insist on these basics:",
        ],
        list: [
          "One menu source that every screen reads from",
          "A real-time kitchen display, not a printer-only workflow",
          "Staff logins with roles: owner, manager, server, kitchen",
          "Table or order status visible at a glance",
          "End-of-day and period reports with an export for your accountant",
          "A clear plan for what happens if the internet connection drops",
        ],
      },
      {
        heading: "Compare the real costs, not only the sticker price",
        paragraphs: [
          "A subscription is a monthly fee per location or terminal, plus paid add-ons, plus card processing fees. A custom system is a one-time build, plus hosting, plus card processing if you take payments through it, plus any support plan you choose.",
          "Put both on a three-year view with the number of screens and branches you expect. For a single small café the subscription usually wins. For a busy restaurant with several screens, specific workflows or plans for a second branch, the comparison often changes.",
        ],
      },
      {
        heading: "Questions to ask any developer before you commit",
        paragraphs: [],
        list: [
          "Will I own the code, the hosting account and the data?",
          "Is the price fixed, and what exactly is included?",
          "Will I see a working demo every week, before the final payment?",
          "Which of my existing tablets, screens and printers will work?",
          "How are card payments handled, and who is the payment provider?",
          "What happens after launch if something breaks?",
        ],
      },
    ],
    related: [
      { label: "Restaurant system packages and prices", href: "/restaurants" },
      { label: "The restaurant POS case study", href: "/work/restaurant-pos" },
    ],
  },
  {
    slug: "custom-dashboard-cost",
    title: "What changes the cost of a custom dashboard or web app",
    seoTitle: "Custom Dashboard & Web App Cost: What Changes the Price",
    description:
      "The six things that move the price of a custom dashboard, internal tool or SaaS MVP, with real budget ranges and how to cut scope without cutting value.",
    keywords: [
      "custom dashboard cost",
      "how much does a web app cost",
      "internal tool development cost",
      "SaaS MVP cost",
      "admin dashboard development price",
    ],
    published: "2026-10-21",
    updated: "2026-10-21",
    readingMinutes: 5,
    summary:
      "My dashboards and internal tools start from $900 and usually take 3–7 weeks. Product MVPs start from $2,500 over 6–14 weeks. Where your project lands depends mostly on six things: roles, data sources, real-time needs, reporting, data migration and design.",
    sections: [
      {
        heading: "1. How many kinds of users there are",
        paragraphs: [
          "Every role, such as owner, staff, customer or parent, needs its own permissions, screens and tests. The school system I built has four portals, for students, teachers, parents and admins, sharing one login system. That is a very different budget from a single admin panel.",
        ],
      },
      {
        heading: "2. How many systems it connects to",
        paragraphs: [
          "Each integration, whether payments, WhatsApp, email, accounting or an existing database, adds setup, error handling and testing. Some APIs, like WhatsApp Business, also bring approval steps and rate limits. The donation platform I built needed a message queue just to pace campaigns within those limits.",
        ],
      },
      {
        heading: "3. Whether it needs to update in real time",
        paragraphs: [
          "A dashboard that refreshes when you reload it is simpler than one that pushes changes to every screen instantly, like a kitchen display. Real time is worth it when people act on the update within seconds; otherwise, skip it.",
        ],
      },
      {
        heading: "4. How much reporting you need",
        paragraphs: [
          "One summary screen is quick. Filterable reports by product, category and date range, with exports and charts, take longer, but they are often the reason the project exists. Decide which three numbers you check every week and start there.",
        ],
      },
      {
        heading: "5. Whether existing data has to move in",
        paragraphs: [
          "Importing years of spreadsheets means cleaning duplicates, mismatched names and missing fields. A clean start with only current records is much cheaper. A one-time import script is a reasonable middle ground.",
        ],
      },
      {
        heading: "6. How custom the design needs to be",
        paragraphs: [
          "Internal tools rarely need a bespoke visual identity; a clean, consistent interface is enough. Customer-facing products usually do need more design work, because the interface is part of what you are selling.",
        ],
      },
      {
        heading: "How to cut cost without cutting value",
        paragraphs: [],
        list: [
          "Build the one workflow that saves the most time first, and plan the rest as release two",
          "Start with one or two roles and add the others once the core works",
          "Use exports before building complex in-app reports",
          "Choose reload-based updates unless people genuinely act within seconds",
          "Import only current records at launch",
        ],
      },
    ],
    related: [
      { label: "Web applications & dashboards service", href: "/services/saas-development" },
      { label: "The school management case study", href: "/work/school-management" },
      { label: "The donation dashboard case study", href: "/work/donation-dashboard" },
    ],
  },
]

export function getGuide(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug)
}
