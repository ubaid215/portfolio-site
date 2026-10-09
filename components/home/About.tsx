"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"
import styles from "./About.module.css"

const VALUES = [
  { title: "One person, from idea to launch", desc: "Work directly with me on the decisions, design, and development that bring your project to life." },
  { title: "Your priorities come first", desc: "A clear scope puts time and budget into the features that matter most to your business." },
  { title: "Progress you can see", desc: "Working demos and clear updates give your team a voice throughout the build." },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-about-frame]", { clipPath: "inset(10% 7% 10% 7% round 1rem)" }, {
        clipPath: "inset(0% 0% 0% 0% round 1rem)", ease: "none",
        scrollTrigger: { trigger: section, start: "top 85%", end: "top 20%", scrub: 0.8 },
      })
      gsap.fromTo("[data-about-image]", { yPercent: -6, scale: 1.12 }, {
        yPercent: 6, scale: 1.04, ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      })
      gsap.fromTo("[data-about-value]", { x: 40 }, {
        x: 0, stagger: 0.14, ease: "none",
        scrollTrigger: { trigger: "[data-about-values]", start: "top 90%", end: "top 48%", scrub: 0.7 },
      })
    }, section)
    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [])

  return (
    <section ref={sectionRef} id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.layout}>
        <div className={styles.visual}>
          <div className={styles.photo} data-about-frame>
            <div className={styles.image} data-about-image>
              <Image src="/images/professional-img.png" alt="Muhammad Ubaidullah" fill sizes="(max-width: 800px) 90vw, 40vw" />
            </div>
            <div className={styles.caption}><span>Problem Solver.</span><span>Invested in your next move.</span></div>
          </div>
          <div className={styles.location}><span>Faisalabad, Pakistan</span><span>Working worldwide <ArrowUpRight size={15} aria-hidden="true" /></span></div>
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>The person behind the work</p>
          <h2 id="about-heading" className={styles.heading}>Your goals shape<br />what I build.</h2>
          <p className={styles.lead}>Hi, I&apos;m <strong>Muhammad Ubaidullah</strong>. I help founders and teams turn their next big idea into a website, a digital product, or a practical AI solution.</p>
          <p className={styles.description}>From online stores to restaurant systems, every project starts with the same question: what would make this better for the people using it?</p>
          <div className={styles.values} data-about-values>
            {VALUES.map((value, index) => (
              <div className={styles.value} key={value.title} data-about-value>
                <span className={styles.number}>0{index + 1}</span>
                <div><h3>{value.title}</h3><p>{value.desc}</p></div>
              </div>
            ))}
          </div>
          <Link className={styles.link} href="/contact">A project partner. An extension of your team.<ArrowUpRight size={20} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}