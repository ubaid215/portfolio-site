import type { MetadataRoute } from "next"
import { GUIDES } from "@/lib/guides"
import { PROJECTS } from "@/lib/projects"
import { SERVICE_PAGES } from "@/lib/service-pages"
import { SITE_UPDATED, SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: {
    path: string
    priority: number
    changeFrequency: "weekly" | "monthly" | "yearly"
    images?: string[]
  }[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/restaurants", priority: 0.9, changeFrequency: "monthly" },
    ...SERVICE_PAGES.map((page) => ({ path: `/services/${page.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/guides", priority: 0.7, changeFrequency: "weekly" },
    ...GUIDES.map((guide) => ({ path: `/guides/${guide.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    { path: "/book", priority: 0.6, changeFrequency: "yearly" },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" },
    ...PROJECTS.map((project) => ({
      path: `/work/${project.slug}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
      images: [project.coverImage, ...project.screenshots.map((shot) => shot.src)],
    })),
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  ]

  return pages.map(({ path, priority, changeFrequency, images }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: SITE_UPDATED,
    changeFrequency,
    priority,
    ...(images ? { images: images.map((image) => `${SITE_URL}${image}`) } : {}),
  }))
}
