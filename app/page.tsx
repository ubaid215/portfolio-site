import { Hero }        from "@/components/home/Hero"
import { TechMarquee } from "@/components/home/TechMarquee"
import { FeaturedWork } from "@/components/home/FeaturedWork"
import { About }        from "@/components/home/About"
import { Skills }       from "@/components/home/Skills"
import { ContactCTA }   from "@/components/home/ContactCTA"

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero: Full-viewport animated headline */}
      <Hero />

      {/* Section 2 — Tech Stack: Infinite dual-row marquee */}
      <TechMarquee />

      {/* Section 3 — Featured Work: Project cards grid */}
      <FeaturedWork />

      {/* Section 4 — About: Two-column with photo & value props */}
      <About />

      {/* Section 5 — Skills: Stats + categorized skill pills */}
      <Skills />

      {/* Section 6 — Contact CTA: Above footer call-to-action */}
      <ContactCTA />
    </>
  )
}