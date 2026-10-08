import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "Meet Muhammad Ubaidullah and learn how he scopes, builds, and delivers web applications for operational teams.",
}

const PROCESS = [
  {
    title: "Understand the work",
    description: "We map the people, decisions, and manual steps involved before choosing a technical approach.",
  },
  {
    title: "Define a useful first release",
    description: "I turn that workflow into a clear scope, including what the first version needs to do and what can wait.",
  },
  {
    title: "Build in visible steps",
    description: "You see working features as the application takes shape, with space to correct assumptions early.",
  },
  {
    title: "Launch and hand over",
    description: "The work includes deployment and documentation so the product can keep evolving after launch.",
  },
]

export default function AboutPage() {
  return (
    <>
      <section style={{ background: "var(--bg)", padding: "clamp(8rem, 12vw, 11rem) 1.5rem clamp(4rem, 8vw, 7rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 430px), 1fr))", gap: "clamp(2.5rem, 6vw, 6rem)", alignItems: "center" }}>
          <div>
            <h1 className="type-page" style={{ color: "var(--fg)", margin: "0 0 1.5rem" }}>
              Work with the person who builds it.
            </h1>
            <p style={{ color: "var(--fg-sub)", fontSize: "clamp(1.05rem, 2vw, 1.25rem)", lineHeight: 1.6, maxWidth: "55ch", margin: "0 0 1.25rem" }}>
              I&apos;m Muhammad Ubaidullah, a full stack developer based in Faisalabad, Pakistan. I build web applications for teams whose day-to-day work has outgrown spreadsheets and disconnected tools.
            </p>
            <p style={{ color: "var(--fg-muted)", lineHeight: 1.75, maxWidth: "62ch", margin: "0 0 2rem" }}>
              My project work includes retail inventory, school administration, restaurant operations, and donor management. I focus on understanding the workflow, making clear product decisions, and building software the team can use.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
              <Link href="/work" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--accent)", color: "var(--accent-text)", padding: "0.875rem 1.4rem", borderRadius: 9999, textDecoration: "none", fontWeight: 600 }}>
                Explore the Work <ArrowUpRight size={16} />
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
            From workflow to working software.
          </h2>
          <p style={{ maxWidth: "60ch", color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 0 3rem" }}>
            A clear process helps us solve the right problem and spot misunderstandings before they become expensive changes.
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
            Have a workflow that needs a better tool?
          </h2>
          <p style={{ color: "var(--fg-muted)", lineHeight: 1.7, margin: "0 auto 2rem", maxWidth: "55ch" }}>
            Tell me what happens today and what you need to change. I&apos;ll reply with a useful next step.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--accent)", color: "var(--accent-text)", padding: "0.95rem 1.5rem", borderRadius: 9999, textDecoration: "none", fontWeight: 600 }}>
            Discuss a Project <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
