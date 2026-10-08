import { Hero }        from "@/components/home/Hero"
import { FeaturedWork } from "@/components/home/FeaturedWork"
import { About }        from "@/components/home/About"
import { Skills }       from "@/components/home/Skills"
import { ContactCTA }   from "@/components/home/ContactCTA"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <About />
      <Skills />
      <ContactCTA />
    </>
  )
}
