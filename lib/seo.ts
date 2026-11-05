// lib/seo.ts
// Single source of truth for SEO metadata, canonical URLs and structured data.
//
// IMPORTANT: the canonical host must be a host that actually serves this site.
// `ubaid.dev` currently has no A/AAAA record, so it cannot be the canonical
// origin until it is attached to the deployment. Set NEXT_PUBLIC_SITE_URL in
// the hosting environment (for example https://ubaid.dev) to switch every
// canonical, sitemap entry, Open Graph URL and schema @id at build time.

import type { Metadata } from "next"
import { PROJECTS } from "./projects"
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "./site"

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://ubaiddev-eta.vercel.app")

export const SITE_URL = configuredSiteUrl.replace(/\/+$/, "")
export const SITE_NAME = "Muhammad Ubaidullah"
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const SITE_UPDATED = new Date("2026-10-19T00:00:00.000Z")

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`
}

export interface PageSeo {
  title: string
  description: string
  path: string
  keywords: string[]
  image?: string
}

/**
 * Keyword targets are chosen around buyer intent, not vanity volume.
 * Broad head terms ("web design company", "SEO agency", "AI agency") are owned
 * by marketplaces, SaaS vendors and large agencies. These pages target the
 * service + outcome language a buyer actually types when they are ready to hire,
 * and the vertical language the work can honestly support.
 */
export const PAGE_SEO: Record<"home" | "services" | "work" | "about" | "contact" | "restaurants" | "guides" | "book" | "privacy", PageSeo> = {
  restaurants: {
    title: "Custom Restaurant POS & Kitchen Display System | Fixed Price",
    description:
      "A restaurant POS, kitchen display, menu manager and sales dashboard built around how your restaurant works. Fixed price, no per-terminal fees, you own it.",
    path: "/restaurants",
    keywords: [
      "custom restaurant POS",
      "restaurant POS system development",
      "kitchen display system",
      "restaurant management system",
      "restaurant ordering system",
      "restaurant software developer",
    ],
  },
  guides: {
    title: "Guides — Restaurant Systems, Dashboards & Web Projects",
    description:
      "Practical guides for business owners deciding on a restaurant system, a custom dashboard or a new website: what to choose, what it costs, what to ask.",
    path: "/guides",
    keywords: [
      "custom software guide",
      "restaurant POS guide",
      "custom dashboard cost",
      "web app development cost",
    ],
  },
  book: {
    title: "Book a Free 20-Minute Call — Muhammad Ubaidullah",
    description:
      "Pick a time for a free 20-minute call about your website, dashboard, restaurant system or automation. You leave with a clear next step, whether or not we work together.",
    path: "/book",
    keywords: ["book a call with a developer", "free project consultation", "hire full stack developer"],
  },
  privacy: {
    title: "Privacy Notice — Muhammad Ubaidullah",
    description: "What this website collects through analytics, the contact form and call booking, and how that information is used.",
    path: "/privacy",
    keywords: [],
  },
  home: {
    title: "Full Stack Developer: Websites, Dashboards & AI Automation",
    description:
      "Independent full stack developer building business websites, custom dashboards, technical SEO and AI automation that connects the tools you already use.",
    path: "/",
    keywords: [
      "full stack developer",
      "freelance web developer",
      "website development for small business",
      "custom dashboard development",
      "AI automation services",
      "technical SEO services",
      "Next.js developer",
      "business website development",
    ],
  },
  services: {
    title: "Web Development, Dashboard, SEO & AI Automation Services",
    description:
      "Website and SaaS development, custom dashboards, AI automation and technical SEO. Scope, starting budgets and clear next steps before you commit.",
    path: "/services",
    keywords: [
      "web development services",
      "website development services",
      "custom dashboard development",
      "internal tool development",
      "dashboard development services",
      "AI automation services",
      "AI workflow automation",
      "generative AI development",
      "SEO services",
      "technical SEO",
      "SaaS development services",
      "digital marketing services",
    ],
  },
  work: {
    title: "Selected Work — Websites, Dashboards & Business Systems",
    description:
      "Five delivered projects: an ecommerce platform, a school management system, a restaurant POS, a donation dashboard and two tax firm websites.",
    path: "/work",
    keywords: [
      "full stack developer portfolio",
      "web development case studies",
      "dashboard development case study",
      "ecommerce platform case study",
      "SaaS development case study",
      "business system development",
    ],
  },
  about: {
    title: "About Muhammad Ubaidullah — Full Stack Developer",
    description:
      "Independent full stack developer in Faisalabad, working remotely with founders and teams on websites, dashboards, AI automation and search growth.",
    path: "/about",
    keywords: [
      "hire full stack developer",
      "freelance developer Pakistan",
      "remote full stack developer",
      "Next.js developer",
      "AI automation developer",
      "dashboard developer",
    ],
  },
  contact: {
    title: "Contact — Start a Website, Dashboard or AI Project",
    description:
      "Have a project or a role in mind? Talk to Muhammad Ubaidullah about websites, dashboards, AI automation, SEO or joining your team.",
    path: "/contact",
    keywords: [
      "hire full stack developer",
      "contact web developer",
      "start a website project",
      "dashboard development enquiry",
      "AI automation project",
    ],
  },
}

interface CaseStudySeo {
  title: string
  description: string
  keywords: string[]
}

/**
 * Case-study titles bypass the root title template so each one keeps its brand
 * suffix without exceeding the snippet width. Descriptions come from the
 * on-page copy, not from invented outcomes.
 */
export const CASE_STUDY_SEO: Record<string, CaseStudySeo> = {
  "ecommerce-platform": {
    title: "E-Commerce Platform & Custom CMS | Ubaidullah",
    description:
      "A retail storefront, inventory workflow, order management and custom CMS built as one connected system.",
    keywords: [
      "ecommerce platform development",
      "custom ecommerce CMS",
      "inventory management system",
      "order management system",
      "online store development",
    ],
  },
  "school-management": {
    title: "School Management System — Four Portals | Ubaidullah",
    description:
      "Student, teacher, parent and admin portals sharing attendance, grades and fee workflows, built with role-based access.",
    keywords: [
      "school management system",
      "school portal development",
      "student information system",
      "role-based dashboard",
      "education software development",
    ],
  },
  "restaurant-pos": {
    title: "Restaurant POS & Kitchen Display System | Ubaidullah",
    description:
      "Table ordering, a real-time kitchen display, menu CMS and end-of-day revenue reporting in one connected system.",
    keywords: [
      "restaurant POS system",
      "kitchen display system",
      "restaurant management software",
      "menu CMS",
      "restaurant revenue dashboard",
    ],
  },
  "donation-dashboard": {
    title: "Donor CRM & WhatsApp Dashboard | Ubaidullah",
    description:
      "Donor records, campaign tracking, approved Meta templates and queued WhatsApp messaging in a single dashboard.",
    keywords: [
      "donor management system",
      "donor CRM",
      "WhatsApp Business API integration",
      "nonprofit dashboard",
      "campaign management dashboard",
    ],
  },
  "tax-websites": {
    title: "Tax Firm Websites — Two Client Builds | Ubaidullah",
    description:
      "Two responsive tax advisory sites with clearer service pages, contact routes and structured page metadata.",
    keywords: [
      "tax firm website design",
      "professional services website",
      "accounting firm website",
      "SEO website development",
      "responsive business website",
    ],
  },
}

export function createMetadata({
  title,
  description,
  path,
  keywords,
  image,
  type = "website",
}: PageSeo & { type?: "website" | "article" }): Metadata {
  const socialImage = image ?? "/opengraph-image"
  const socialImageMeta = image
    ? { url: image, alt: title }
    : { url: socialImage, width: 1200, height: 630, alt: title }

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_US",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images: [socialImageMeta],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  }
}

export function caseStudyMetadata(slug: string) {
  const project = PROJECTS.find((item) => item.slug === slug)
  if (!project) return null
  const seo = CASE_STUDY_SEO[slug]
  const path = `/work/${slug}`
  return createMetadata({
    title: seo?.title ?? `${project.title} | Ubaidullah`,
    description: seo?.description ?? project.shortDesc,
    path,
    keywords: seo?.keywords ?? project.stack,
    image: project.coverImage,
    type: "article",
  })
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

const PERSON_DESCRIPTION =
  "Independent full stack developer building business websites, SaaS products, custom dashboards and practical AI automation for founders and teams worldwide."

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Muhammad Ubaidullah",
  givenName: "Muhammad",
  familyName: "Ubaidullah",
  jobTitle: "Full Stack Developer",
  description: PERSON_DESCRIPTION,
  url: SITE_URL,
  image: absoluteUrl("/images/professional-img.png"),
  email: `mailto:${CONTACT_EMAIL}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Faisalabad",
    addressCountry: "PK",
  },
  brand: { "@type": "Brand", name: "ubaid.dev" },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  knowsAbout: [
    "Website development",
    "Business website development",
    "Ecommerce development",
    "SaaS development",
    "Custom dashboard development",
    "Internal tool development",
    "AI automation",
    "Generative AI",
    "AI workflow automation",
    "Search engine optimization",
    "Technical SEO",
    "Digital marketing",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "MongoDB",
    "OpenAI API",
    "Claude API",
    "LangChain",
    "n8n",
  ],
  knowsLanguage: ["English"],
}

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: ["ubaid.dev", "Ubaidullah"],
  description: PERSON_DESCRIPTION,
  publisher: { "@id": PERSON_ID },
  inLanguage: "en",
}

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
}

interface SeoService {
  id: string
  name: string
  serviceType: string
  description: string
  url: string
  keywords: string[]
  deliverables: string[]
  minPrice?: number
}

/**
 * These mirror the services and budget ranges visible on /services, /about and
 * the contact form. The dashboard line is a real offer: it appears in the
 * published budget table, the About capabilities and the contact project types.
 */
const SEO_SERVICES: SeoService[] = [
  {
    id: "website-development",
    name: "Website development",
    serviceType: "Website development",
    description:
      "Business websites, landing pages, and online stores with responsive layouts, content management, and the integrations your customer journey needs.",
    url: "/services/website-development",
    keywords: [
      "business website development",
      "small business website design",
      "landing page development",
      "ecommerce website development",
      "custom website development",
    ],
    deliverables: ["Business websites", "E-commerce", "Landing pages"],
  },
  {
    id: "saas-development",
    name: "SaaS & web applications",
    serviceType: "SaaS and web application development",
    description:
      "From a focused MVP to a custom application: user roles, subscription flows, dashboards, APIs, and a technical foundation that supports the next release.",
    url: "/services/saas-development",
    keywords: [
      "SaaS development",
      "SaaS MVP development",
      "custom web application development",
      "API integration development",
      "subscription platform development",
    ],
    deliverables: ["Product MVPs", "Custom dashboards", "API integrations"],
    minPrice: 2500,
  },
  {
    id: "dashboard-development",
    name: "Dashboard & internal tool development",
    serviceType: "Custom dashboard and internal tool development",
    description:
      "Custom dashboards and internal tools that bring orders, stock, donors, attendance and everyday operations into one view your team can actually use.",
    url: "/services/saas-development#dashboards",
    keywords: [
      "custom dashboard development",
      "dashboard development services",
      "internal tool development",
      "operations dashboard",
      "KPI dashboard development",
      "business intelligence dashboard",
      "client reporting dashboard",
    ],
    deliverables: ["Operations dashboards", "Admin panels", "Reporting dashboards"],
    minPrice: 900,
  },
  {
    id: "ai-automation",
    name: "AI automation",
    serviceType: "AI workflow automation",
    description:
      "Automate lead routing, document processing, customer follow-ups, and internal handoffs, with clear review points and a way for your team to take over.",
    url: "/services/ai-automation",
    keywords: [
      "AI automation services",
      "AI workflow automation",
      "business process automation",
      "AI lead follow-up",
      "CRM automation",
      "AI integration services",
    ],
    deliverables: ["Workflow automation", "AI assistants", "CRM integrations"],
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    serviceType: "Generative AI integration",
    description:
      "Knowledge assistants, document search, content drafting, and LLM integrations with source references, evaluation, and human review shaped around the use case.",
    url: "/services#generative-ai",
    keywords: [
      "generative AI development",
      "LLM integration",
      "AI knowledge assistant",
      "document search AI",
      "OpenAI API integration",
      "Claude API integration",
    ],
    deliverables: ["Knowledge assistants", "Content workflows", "LLM integrations"],
  },
  {
    id: "seo",
    name: "Search engine optimization",
    serviceType: "Search engine optimization",
    description:
      "Technical SEO, site structure, service-page content, metadata, and search measurement, with priorities based on the site's current condition and audience.",
    url: "/services#seo",
    keywords: [
      "SEO services",
      "technical SEO",
      "on-page SEO",
      "SEO audit services",
      "small business SEO",
      "search strategy",
    ],
    deliverables: ["Technical SEO", "On-page SEO", "Search strategy"],
  },
  {
    id: "digital-marketing",
    name: "Digital marketing",
    serviceType: "Digital marketing",
    description:
      "Campaign planning, content direction, email journeys, and conversion tracking that connect marketing activity with a useful next step for your audience.",
    url: "/services#digital-marketing",
    keywords: [
      "digital marketing services",
      "campaign strategy",
      "email marketing automation",
      "conversion tracking",
      "content strategy",
    ],
    deliverables: ["Campaign strategy", "Content & email", "Conversion tracking"],
  },
]

function serviceSchema(service: SeoService) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${service.url}`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url: `${SITE_URL}${service.url}`,
    provider: { "@id": PERSON_ID },
    areaServed: "Worldwide",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Small businesses, founders and growing teams",
    },
    keywords: service.keywords.join(", "),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} deliverables`,
      itemListElement: service.deliverables.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
    ...(service.minPrice
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: service.minPrice,
            },
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}${service.url.split("#")[0]}`,
          },
        }
      : {}),
  }
}

export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: PAGE_SEO.home.title,
  description: PAGE_SEO.home.description,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: absoluteUrl("/opengraph-image"),
    width: 1200,
    height: 630,
  },
  inLanguage: "en",
  dateModified: SITE_UPDATED.toISOString(),
  keywords: PAGE_SEO.home.keywords.join(", "),
}

export function servicesPageSchema(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/services#webpage`,
        url: absoluteUrl("/services"),
        name: PAGE_SEO.services.title,
        description: PAGE_SEO.services.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "OfferCatalog",
          name: "Web development, dashboard, SEO and AI automation services",
          itemListElement: SEO_SERVICES.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@id": `${SITE_URL}${service.url}` },
          })),
        },
        inLanguage: "en",
        dateModified: SITE_UPDATED.toISOString(),
        keywords: PAGE_SEO.services.keywords.join(", "),
      },
      ...SEO_SERVICES.map(serviceSchema),
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/services#faq`,
        isPartOf: { "@id": `${SITE_URL}/services#webpage` },
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  }
}

export const workPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/work#webpage`,
  url: absoluteUrl("/work"),
  name: PAGE_SEO.work.title,
  description: PAGE_SEO.work.description,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
  inLanguage: "en",
  dateModified: SITE_UPDATED.toISOString(),
  keywords: PAGE_SEO.work.keywords.join(", "),
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/work/${project.slug}`),
      item: {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/work/${project.slug}#case-study`,
        name: project.title,
        description: project.shortDesc,
        image: absoluteUrl(project.coverImage),
        url: absoluteUrl(`/work/${project.slug}`),
        creator: { "@id": PERSON_ID },
        keywords: [...project.stack, ...project.categories].join(", "),
      },
    })),
  },
}

export function caseStudySchema(slug: string) {
  const project = PROJECTS.find((item) => item.slug === slug)
  if (!project) return null
  const seo = CASE_STUDY_SEO[slug]
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/work/${slug}#case-study`,
    name: seo?.title ?? project.title,
    headline: project.title,
    description: seo?.description ?? project.shortDesc,
    url: absoluteUrl(`/work/${slug}`),
    image: absoluteUrl(project.coverImage),
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    genre: "Case study",
    about: project.categories.map((category) => ({
      "@type": "Thing",
      name: category,
    })),
    keywords: [...project.stack, ...project.categories, project.year].join(", "),
    isPartOf: { "@id": `${SITE_URL}/work#webpage` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/work/${slug}#webpage`,
    },
    inLanguage: "en",
    dateModified: SITE_UPDATED.toISOString(),
  }
}

export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/about#webpage`,
  url: absoluteUrl("/about"),
  name: PAGE_SEO.about.title,
  description: PAGE_SEO.about.description,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": PERSON_ID },
  inLanguage: "en",
  dateModified: SITE_UPDATED.toISOString(),
  keywords: PAGE_SEO.about.keywords.join(", "),
}

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  url: absoluteUrl("/contact"),
  name: PAGE_SEO.contact.title,
  description: PAGE_SEO.contact.description,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
  mainEntity: {
    "@type": "ContactPoint",
    contactType: "Project enquiries",
    email: CONTACT_EMAIL,
    url: absoluteUrl("/contact"),
    availableLanguage: ["English"],
    areaServed: "Worldwide",
  },
  inLanguage: "en",
  dateModified: SITE_UPDATED.toISOString(),
  keywords: PAGE_SEO.contact.keywords.join(", "),
}

/** Static list used by /llms.txt and by future service landing pages. */
export const LLM_SERVICES = SEO_SERVICES.map(({ name, description, url }) => ({
  name,
  description,
  url: absoluteUrl(url.split("#")[0]),
}))


/* ------------------------------------------------------------------ */
/* Acquisition pages: service landing pages, restaurants, guides       */
/* ------------------------------------------------------------------ */

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

function faqSchema(id: string, faqs: readonly { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${id}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
}

export function servicePageSchema(page: {
  slug: string
  name: string
  seoDescription: string
  keywords: string[]
  included: string[]
  faqs: { question: string; answer: string }[]
}) {
  const path = `/services/${page.slug}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}${path}`,
        name: page.name,
        description: page.seoDescription,
        url: absoluteUrl(path),
        provider: { "@id": PERSON_ID },
        areaServed: "Worldwide",
        keywords: page.keywords.join(", "),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${page.name} deliverables`,
          itemListElement: page.included.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item },
          })),
        },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: page.name, path },
      ]),
      faqSchema(path, page.faqs),
    ],
  }
}

export function restaurantPageSchema(
  packages: readonly { name: string; price: number; description: string }[],
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}/restaurants`,
        name: "Custom restaurant POS and kitchen display system",
        serviceType: "Restaurant management software development",
        description: PAGE_SEO.restaurants.description,
        url: absoluteUrl("/restaurants"),
        provider: { "@id": PERSON_ID },
        areaServed: "Worldwide",
        audience: { "@type": "BusinessAudience", audienceType: "Restaurants, cafés and takeaways" },
        offers: packages.map((item) => ({
          "@type": "Offer",
          name: item.name,
          description: item.description,
          priceCurrency: "USD",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: item.price },
          url: absoluteUrl("/restaurants"),
        })),
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Restaurants", path: "/restaurants" },
      ]),
      faqSchema("/restaurants", faqs),
    ],
  }
}

export function guideSchema(guide: {
  slug: string
  title: string
  description: string
  keywords: string[]
  published: string
  updated: string
}) {
  const path = `/guides/${guide.slug}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${SITE_URL}${path}#article`,
        headline: guide.title,
        description: guide.description,
        url: absoluteUrl(path),
        datePublished: guide.published,
        dateModified: guide.updated,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        keywords: guide.keywords.join(", "),
        inLanguage: "en",
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: guide.title, path },
      ]),
    ],
  }
}
