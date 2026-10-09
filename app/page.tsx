import type { Metadata } from "next"
import { Hero }        from "@/components/home/Hero"
import { Services }    from "@/components/home/Services"
import { FeaturedWork } from "@/components/home/FeaturedWork"
import { About }        from "@/components/home/About"
import { Skills }       from "@/components/home/Skills"
import { Testimonials } from "@/components/home/Testimonials"
import { ContactCTA }   from "@/components/home/ContactCTA"
import { HomeMotion } from "@/components/home/HomeMotion"

const description = "Websites, SaaS products, AI automation, generative AI, SEO and digital marketing. Explore Muhammad Ubaidullah's services and selected project work."

export const metadata: Metadata = {
  title: { absolute: "Muhammad Ubaidullah | Web, SaaS & AI Development" },
  description,
  openGraph: { title: "Muhammad Ubaidullah | Web, SaaS & AI Development", description },
  twitter: { title: "Muhammad Ubaidullah | Web, SaaS & AI Development", description },
}

export default function HomePage() {
  return (
    <HomeMotion>
      <Hero />
      <Services />
      <FeaturedWork />
      <About />
      <Skills />
      <Testimonials />
      <ContactCTA />
    </HomeMotion>
  )
}
