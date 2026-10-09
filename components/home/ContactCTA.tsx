"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"
import styles from "./ContactCTA.module.css"

export function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Plays once as the section arrives, on its own timeline. Scrub would tie
      // the masked headline to the scrollbar, so stopping mid-reveal left the
      // words cut in half.
      gsap.fromTo("[data-contact-line]", { yPercent: 60 }, {
        yPercent: 0, duration: 1.1, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      })
      gsap.fromTo("[data-contact-arrow]", { rotate: -45 }, {
        rotate: 0, ease: "none",
        scrollTrigger: { trigger: section, start: "top 90%", end: "top 20%", scrub: 0.8 },
      })
    }, section)
    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [])

  return (
    <section ref={sectionRef} id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.container}>
        <div className={styles.topline}><p>Let&apos;s work together</p><span><i aria-hidden="true" />Open to projects &amp; team opportunities</span></div>
        <div className={styles.invitation}>
          <h2 id="contact-heading" className={styles.heading}>
            <span className={styles.line}><span data-contact-line>Your next chapter.</span></span>
            <span className={styles.line}><span data-contact-line>Let&apos;s build it.</span></span>
          </h2>
          <Link href="/contact" className={styles.discuss} data-magnetic aria-label="Discuss your project">
            <span className={styles.arrow} data-contact-arrow><ArrowUpRight strokeWidth={1.1} aria-hidden="true" /></span>
            <span>Let&apos;s talk</span>
          </Link>
        </div>
        <div className={styles.bottom}>
          <p>Whether you&apos;re planning a launch or improving what you already have, let&apos;s turn your goal into a clear plan for the build.</p>
          <div className={styles.socials}><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={17} aria-hidden="true" /></a><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={17} aria-hidden="true" /></a><span>PKT / GMT+5</span></div>
        </div>
      </div>
    </section>
  )
}