import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

/**
 * Search and AI answer engines are both useful acquisition channels for this
 * site, so the public pages stay crawlable for all of them. Only the contact
 * API is excluded; robots.txt is not used to hide pages from the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
