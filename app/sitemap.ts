import type { MetadataRoute } from "next"
import { PROJECTS } from "@/lib/projects"
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
    { path: "/work", priority: 0.8, changeFrequency: "monthly" },
    ...PROJECTS.map((project) => ({
      path: `/work/${project.slug}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
      images: [project.coverImage, ...project.screenshots.map((shot) => shot.src)],
    })),
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ]

  return pages.map(({ path, priority, changeFrequency, images }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: SITE_UPDATED,
    changeFrequency,
    priority,
    ...(images ? { images: images.map((image) => `${SITE_URL}${image}`) } : {}),
  }))
}
