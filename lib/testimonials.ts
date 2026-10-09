export interface Testimonial {
  id: string
  name: string
  context: string
  story: string
  product?: boolean
  link?: { label: string; href: string }
}

// Each story is written in Muhammad's voice about documented project work, so
// no wording is put in a client's mouth. The three client names and project
// contexts were supplied by the owner; the project details come from
// lib/projects.ts. Finaccont is his own product rather than customer feedback.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "hussnain-akbar",
    name: "Hussnain Akbar",
    context: "Business website & SEO",
    story: "We started with how his services are explained. The site now reads clearly on a phone, with the page titles, descriptions, and internal links underneath that help the right pages get found.",
    link: { label: "Explore website & SEO services", href: "/services#website-development" },
  },
  {
    id: "raees-ali",
    name: "Raees Ali",
    context: "E-commerce platform",
    story: "Stock lived in spreadsheets and orders arrived over WhatsApp. The storefront and the office behind it share one system: a catalog with variant SKUs, stock that moves when an order is recorded, and sales reporting by product and date.",
    link: { label: "See the e-commerce project", href: "/work/ecommerce-platform" },
  },
  {
    id: "usman",
    name: "Usman",
    context: "Restaurant management system",
    story: "Orders were slipping between the front desk and the kitchen. Menu, POS, and kitchen screen read from one data model, so a menu change lands everywhere at once and the day's numbers are ready without a spreadsheet.",
    link: { label: "See the restaurant project", href: "/work/restaurant-pos" },
  },
  {
    id: "finaccont",
    name: "Finaccont",
    context: "My accounting software",
    product: true,
    story: "Finaccont is my accounting software: a product focused on making everyday financial work easier to understand and manage through a clear interface.",
  },
]
