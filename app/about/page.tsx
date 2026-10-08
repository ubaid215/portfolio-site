import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "Meet Muhammad Ubaidullah, an independent full stack developer helping founders and teams turn business goals into websites, products, and practical AI solutions.",
}

const PROCESS = [
  {
    title: "Start with the goal",
    description: "We talk about your business, your audience, and what a successful project would change for them.",
  },
  {
    title: "Choose the first move",
    description: "Together, we decide what to build first, agree on the scope, and make the trade-offs clear before work begins.",
  },
  {
    title: "Make progress visible",
    description: "You review working features as they take shape. Your feedback helps refine the experience while decisions are still easy to change.",
  },
  {
    title: "Prepare for what follows",
    description: "We plan the launch, documentation, and handover so your team knows how to use the product and what comes next.",
  },
]

export default function AboutPage() {
  return (
    <>
      <section style={{ background: "var(--bg)", padding: "clamp(8rem, 12vw, 11rem) 1.5rem clamp(4rem, 8vw, 7rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 430px), 1fr))", gap: "clamp(2.5rem, 6vw, 6rem)", alignItems: "center" }}>
          <div>
            <h1 className="type-page" style={{ color: "var(--fg)", margin: "0 0 1.5rem" }}>
              I build with your bigger picture in mind.
            </h1>
            <p style={{ color: "var(--fg-sub)", fontSize: "clamp(1.05rem, 2vw, 1.25rem)", lineHeight: 1.6, maxWidth: "55ch", margin: "0 0 1.25rem" }}>
              I&apos;m Muhammad Ubaidullah, an independent full stack developer based in Faisalabad, Pakistan. I work with founders and teams on the websites, products, and AI solutions that move their business forward.
            </p>
            <p style={{ color: "var(--fg-muted)", lineHeight: 1.75, maxWidth: "62ch", margin: "0 0 2rem" }}>
              My projects include online stores, school platforms, restaurant systems, and donor management tools. Across each, I connect the details of the build to the people who will use it: your customers, your team, and you.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
              <Link href="/work" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--accent)", color: "var(--accent-text)", padding: "0.875rem 1.4rem", borderRadius: 9999, textDecoration: "none", fontWeight: 600 }}>
                See my work <ArrowUpRight size={16} />
              </Link>
              <Link href="/Ubaidullah_Resume.pdf" target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--fg-sub)", padding: "0.875rem 1rem", textDecoration: "none" }}>
                <Download size={16} /> View Résumé
              </Link>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%", minHeight: "clamp(360px, 45vw, 560px)", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--bg-card)" }}>
            <Image src="/images/professional-img.png" alt="Portrait of Muhammad Ubaidullah" fill priority sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "center top" }} />
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-sub)", borderTop: "1px solid var(--border)", padding: "clamp(4rem, 8vw, 7rem) 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 className="type-section" style={{ color: "var(--fg)", maxWidth: "18ch", margin: "0 0 1rem" }}>
            A clear path from idea to launch.
          </h2>
          <p style={{ maxWidth: "60ch", color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 0 3rem" }}>
            You should know what we&apos;re building, why it matters, and where things stand. Here&apos;s how we get there together.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.5rem" }}>
            {PROCESS.map(({ title, description }, index) => (
              <div key={title} style={{ borderTop: "1px solid var(--border-strong)", paddingTop: "1.25rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", color: "var(--accent-ink)" }}>0{index + 1}</span>
                <h3 style={{ color: "var(--fg)", fontSize: "1.1rem", margin: "1rem 0 0.5rem" }}>{title}</h3>
                <p style={{ color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vw, 7rem) 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 className="type-section" style={{ color: "var(--fg)", margin: "0 0 1rem" }}>
            Need someone to own the build?
          </h2>
          <p style={{ color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 auto 2rem", maxWidth: "55ch" }}>
            Bring me in for a focused project or to work alongside your team. Tell me what you&apos;re building and where you need support.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--accent)", color: "var(--accent-text)", padding: "0.95rem 1.5rem", borderRadius: 9999, textDecoration: "none", fontWeight: 600 }}>
            Let&apos;s talk about working together <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
