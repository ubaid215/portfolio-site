"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { TECHNOLOGY_AREAS } from "@/lib/technology"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"
import styles from "./Skills.module.css"

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      section.querySelectorAll<HTMLElement>("[data-technology-area]").forEach((row) => {
        gsap.fromTo(row.querySelector("[data-technology-tools]"), { x: 24 }, {
          x: 0, ease: "none",
          scrollTrigger: { trigger: row, start: "top 92%", end: "top 70%", scrub: 0.65 },
        })
      })
    }, section)
    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [])

  return (
    <section id="skills" ref={sectionRef} className={styles.section} aria-labelledby="skills-title">
      <div className={styles.container}>
        <div className={styles.headingRow}>
          <h2 id="skills-title" className={styles.heading}>The stack behind your next move.</h2>
          <p className={styles.lead}>
            Modern web foundations, connected services, and practical AI.
            I choose the tools around the product and the people using it.
          </p>
        </div>

        <div className={styles.areas}>
          {TECHNOLOGY_AREAS.map((area) => (
            <div key={area.id} className={`${styles.area} ${area.id === "ai" ? styles.aiArea : ""}`} data-technology-area>
              <div className={styles.areaCopy}>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
              <ul className={styles.tools} aria-label={`${area.title} tools`} data-technology-tools>
                {area.tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.closing}>
          <p>A useful product starts with the right problem. The stack follows from there.</p>
          <Link href="/services#ai-automation">
            Explore AI & automation <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
