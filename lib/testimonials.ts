export type TestimonialKind = "draft" | "sample" | "product-note"

export interface Testimonial {
  id: string
  name: string
  context: string
  kind: TestimonialKind
  quote: string
  attribution: string
  link?: { label: string; href: string }
}

// The owner supplied the first three names and their project contexts.
// Quotes are proposed wording, not verbatim or approved client feedback.
// The remaining people are illustrative samples; Finaccont is an owned product.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "hussnain-akbar",
    name: "Hussnain Akbar",
    context: "Business website & SEO",
    kind: "draft",
    quote: "Our business needed an online presence that felt professional and made our services easy to understand. Ubaidullah brought the website, content, and SEO foundations together with care.",
    attribution: "Proposed wording for Hussnain Akbar",
    link: { label: "Explore website & SEO services", href: "/services#website-development" },
  },
  {
    id: "raees-ali",
    name: "Raees Ali",
    context: "E-commerce platform",
    kind: "draft",
    quote: "The store needed to work for our customers and for the people managing it. Ubaidullah connected the shopping experience with the catalog, orders, and stock in one platform.",
    attribution: "Proposed wording for Raees Ali",
    link: { label: "See the e-commerce project", href: "/work/ecommerce-platform" },
  },
  {
    id: "usman",
    name: "Usman",
    context: "Restaurant management system",
    kind: "draft",
    quote: "A restaurant has a lot happening at once. Ubaidullah understood how the front desk, kitchen, and management needed to work together and shaped the system around that everyday reality.",
    attribution: "Proposed wording for Usman",
    link: { label: "See the restaurant project", href: "/work/restaurant-pos" },
  },
  {
    id: "finaccont",
    name: "Finaccont",
    context: "My accounting software",
    kind: "product-note",
    quote: "Finaccont is my accounting software: a product focused on making everyday financial work easier to understand and manage through a clear interface.",
    attribution: "Muhammad Ubaidullah · Creator of Finaccont",
  },
  {
    id: "sample-ayesha",
    name: "Ayesha Khan",
    context: "Sample · SaaS founder",
    kind: "sample",
    quote: "We had plenty of ideas for the product. What helped most was having a developer who could ask the right questions, focus the first release, and make the build easy to follow.",
    attribution: "Illustrative name and SaaS project scenario",
  },
  {
    id: "sample-bilal",
    name: "Bilal Ahmed",
    context: "Sample · AI automation",
    kind: "sample",
    quote: "The automation was shaped around how our team worked. The useful part was connecting the steps while keeping a clear place for people to review and take over.",
    attribution: "Illustrative name and automation scenario",
  },
  {
    id: "sample-sara",
    name: "Sara Malik",
    context: "Sample · Digital presence",
    kind: "sample",
    quote: "The design, message, and customer journey felt connected. We could explain what we offered clearly and give visitors a straightforward way to get in touch.",
    attribution: "Illustrative name and website scenario",
  },
]

export const TESTIMONIAL_STATUS: Record<TestimonialKind, { label: string; note: string }> = {
  draft: {
    label: "Draft quote",
    note: "Proposed testimonial copy. This wording has not been supplied or approved by the named client.",
  },
  sample: {
    label: "Sample quote",
    note: "Illustrative name and feedback, shown as a sample rather than an actual client endorsement.",
  },
  "product-note": {
    label: "Creator's note",
    note: "An introduction to my own product, rather than independent customer feedback.",
  },
}
