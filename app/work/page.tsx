import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { createMetadata, PAGE_SEO, workPageSchema } from "@/lib/seo"
import WorkGallery from "./WorkGallery"

export const metadata: Metadata = createMetadata(PAGE_SEO.work)

export default function WorkPage() {
  return (
    <>
      <JsonLd data={workPageSchema} />
      <WorkGallery />
    </>
  )
}
