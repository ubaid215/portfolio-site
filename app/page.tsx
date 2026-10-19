import type { Metadata } from "next"
import { Hero }        from "@/components/home/Hero"
import { Services }    from "@/components/home/Services"
import { FeaturedWork } from "@/components/home/FeaturedWork"
import { About }        from "@/components/home/About"
import { Skills }       from "@/components/home/Skills"
import { Testimonials } from "@/components/home/Testimonials"
import { ContactCTA }   from "@/components/home/ContactCTA"
import { HomeMotion } from "@/components/home/HomeMotion"
import { JsonLd } from "@/components/seo/JsonLd"
import { createMetadata, homePageSchema, PAGE_SEO } from "@/lib/seo"

export const metadata: Metadata = createMetadata(PAGE_SEO.home)

export default function HomePage() {
  return (
    <HomeMotion>
      <JsonLd data={homePageSchema} />
      <Hero />
      <About />
      <Services />
      <FeaturedWork />
      <Skills />
      <Testimonials />
      <ContactCTA />
    </HomeMotion>
  )
}
