import type { Metadata } from "next"
import { createMetadata, PAGE_SEO } from "@/lib/seo"

export const metadata: Metadata = createMetadata(PAGE_SEO.services)

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
