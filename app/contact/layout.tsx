import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { contactPageSchema, createMetadata, PAGE_SEO } from "@/lib/seo"

export const metadata: Metadata = createMetadata(PAGE_SEO.contact)

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      {children}
    </>
  )
}
