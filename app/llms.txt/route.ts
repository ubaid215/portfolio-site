import { GUIDES } from "@/lib/guides"
import { PROJECTS } from "@/lib/projects"
import { LLM_SERVICES, PAGE_SEO, SITE_URL } from "@/lib/seo"
import { CONTACT_EMAIL } from "@/lib/site"

export const dynamic = "force-static"

/**
 * `llms.txt` is not used by Google Search. It is a small, low-maintenance
 * summary for AI tools and assistants that do read it. The same facts are
 * present in the HTML and JSON-LD, so nothing here is hidden from visitors.
 */
export function GET() {
  const body = [
    "# Muhammad Ubaidullah — ubaid.dev",
    "",
    "> Independent full stack developer building business websites, custom dashboards, SaaS products and practical AI automation. Based in Faisalabad, Pakistan; working with founders and teams worldwide.",
    "",
    `Canonical site: ${SITE_URL}`,
    `Contact: ${CONTACT_EMAIL}`,
    `Services: ${SITE_URL}/services`,
    `Restaurant systems (fixed-price packages): ${SITE_URL}/restaurants`,
    `Book a free 20-minute call: ${SITE_URL}/book`,
    `Selected work: ${SITE_URL}/work`,
    `About: ${SITE_URL}/about`,
    "",
    "## Services",
    "",
    ...LLM_SERVICES.map((service) => `- ${service.name}: ${service.description} (${service.url})`),
    "",
    "## Selected work",
    "",
    ...PROJECTS.map(
      (project) => `- ${project.title} (${SITE_URL}/work/${project.slug}): ${project.shortDesc}`,
    ),
    "",
    "## Guides",
    "",
    ...GUIDES.map((guide) => `- ${guide.title} (${SITE_URL}/guides/${guide.slug}): ${guide.description}`),
    "",
    "## Page summaries",
    "",
    `- Home: ${PAGE_SEO.home.description}`,
    `- Services: ${PAGE_SEO.services.description}`,
    `- Restaurants: ${PAGE_SEO.restaurants.description}`,
    `- Work: ${PAGE_SEO.work.description}`,
    `- About: ${PAGE_SEO.about.description}`,
    "",
    "## Boundaries",
    "",
    "- No delivered client project uses a large language model; AI automation is offered as a capability with a demonstration-first approach.",
    "- Case studies describe delivered scope. Unverified business outcomes are not claimed.",
    "",
  ].join("\n")

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
