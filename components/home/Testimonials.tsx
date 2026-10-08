"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import { TESTIMONIALS, TESTIMONIAL_STATUS } from "@/lib/testimonials"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"
import styles from "./Testimonials.module.css"

const EASE = [0.16, 1, 0.3, 1] as const

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeId, setActiveId] = useState(TESTIMONIALS[0].id)
  const reducedMotion = useReducedMotion()
  const active = TESTIMONIALS.find((story) => story.id === activeId) ?? TESTIMONIALS[0]
  const status = TESTIMONIAL_STATUS[active.kind]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-testimonial-heading]", { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)", ease: "none",
        scrollTrigger: { trigger: section, start: "top 90%", end: "top 60%", scrub: 0.7 },
      })
      gsap.fromTo("[data-testimonial-rule]", { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: section, start: "top 85%", end: "top 45%", scrub: 0.8 },
      })
    }, section)
    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.container}>
        <div className={styles.headingRow}>
          <h2 id="testimonials-title" className={styles.heading} data-testimonial-heading>
            A good build is a shared effort.
          </h2>
          <p className={styles.introduction}>
            Website, e-commerce, restaurant, and accounting work.
            Testimonial drafts and illustrative examples are identified below.
          </p>
        </div>

        <div className={styles.rule} aria-hidden="true"><span data-testimonial-rule /></div>

        <div className={styles.layout}>
          <div className={styles.story} id="testimonial-story" role="region" aria-label="Selected testimonial or product note" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                className={styles.figure}
                key={active.id}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
              >
                <div className={styles.statusRow}>
                  <span className={styles.status}>{status.label}</span>
                  <span className={styles.context}>{active.context}</span>
                </div>

                <div className={styles.quoteStage}>
                  {active.kind === "product-note" ? (
                    <p className={styles.quote}>{active.quote}</p>
                  ) : (
                    <blockquote className={styles.quote}>
                      <p>{active.quote}</p>
                    </blockquote>
                  )}
                </div>

                <figcaption className={styles.attribution}>
                  <span className={styles.initials} aria-hidden="true">
                    {active.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                  </span>
                  <div>
                    <span className={styles.name}>{active.name}</span>
                    <span className={styles.attributionDetail}>{active.attribution}</span>
                  </div>
                </figcaption>

                <p className={styles.disclosure}>{status.note}</p>
                {active.link && (
                  <Link className={styles.projectLink} href={active.link.href}>
                    {active.link.label}
                    <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
                  </Link>
                )}
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className={styles.selector} role="group" aria-label="Choose a testimonial draft, sample, or product note">
            {TESTIMONIALS.map((story) => (
              <button
                key={story.id}
                type="button"
                className={styles.storyButton}
                aria-pressed={active.id === story.id}
                aria-controls="testimonial-story"
                onClick={() => setActiveId(story.id)}
              >
                <span className={styles.buttonCopy}>
                  <span className={styles.buttonName}>{story.name}</span>
                  <span className={styles.buttonContext}>{story.context}</span>
                </span>
                <span className={styles.buttonStatus}>{TESTIMONIAL_STATUS[story.kind].label}</span>
                <ChevronRight className={styles.buttonArrow} size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
