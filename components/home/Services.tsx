"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { SERVICE_OFFERINGS } from "@/lib/services"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"
import styles from "./Services.module.css"

export function Services({ standalone = false }: { standalone?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const Heading = standalone ? "h1" : "h2"

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const heading = section.querySelector("[data-service-heading]")
      gsap.fromTo("[data-service-word]", { x: (index) => index * 28, y: 36 }, {
        x: 0, y: 0, stagger: 0.12, ease: "none",
        scrollTrigger: { trigger: heading, start: "top 90%", end: "bottom 65%", scrub: 0.6 },
      })

      section.querySelectorAll<HTMLElement>("[data-service-row]").forEach((row) => {
        gsap.fromTo(row.querySelector("[data-service-content]"), { y: 45 }, {
          y: 0, ease: "none",
          scrollTrigger: { trigger: row, start: "top 94%", end: "top 68%", scrub: 0.5 },
        })
        ScrollTrigger.create({
          trigger: row, start: "top 58%", end: "bottom 58%",
          toggleClass: { targets: row, className: styles.activeRow },
        })
      })
    }, section)

    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-service-screen]", { yPercent: 8, rotate: -5 }, {
        yPercent: -8, rotate: -1, ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      })
      gsap.fromTo("[data-service-progress]", { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: section, start: "top 30%", end: "bottom 80%", scrub: 0.5 },
      })
    }, section)

    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className={`${styles.section} ${standalone ? styles.standalone : ""}`}
    >
      <div className={styles.layout}>
        <div className={styles.introduction}>
          <Heading id="services-title" className={styles.heading} data-service-heading>
            <span data-service-word>Build.</span>{" "}
            <span data-service-word>Automate.</span>{" "}
            <span data-service-word>Grow.</span>
          </Heading>
          <p className={styles.lead}>
            Websites, SaaS products, AI workflows, and digital marketing.
            The right pieces, built around what your business needs next.
          </p>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.visualCopy}>
              <span>From the first click</span>
              <ArrowRight size={22} strokeWidth={1.4} />
              <span>to the work behind it.</span>
            </div>
            <div className={styles.screen} data-service-screen>
              <Image
                src="/images/projects/finaccont/cover.png"
                alt=""
                fill
                sizes="(max-width: 899px) 80vw, 35vw"
                className={styles.screenImage}
              />
            </div>
            <div className={styles.visualFooter}>Interfaces. Integrations. Everyday workflows.</div>
          </div>

          <Link className={styles.contact} href="/contact">
            Let&apos;s map out your project
            <ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" />
          </Link>
          <div className={styles.progressTrack} aria-hidden="true">
            <span data-service-progress />
          </div>
        </div>

        <div className={styles.serviceList}>
          {SERVICE_OFFERINGS.map((service) => (
            <article
              key={service.id}
              id={standalone ? service.id : undefined}
              className={styles.serviceRow}
              data-service-row
            >
              <div data-service-content>
                <Link
                  href={standalone ? "/contact" : `/services#${service.id}`}
                  className={styles.serviceLink}
                  aria-label={`${standalone ? "Discuss" : "Explore"} ${service.title}`}
                >
                  <h3>{service.title}</h3>
                  <ArrowUpRight className={styles.serviceArrow} size={24} strokeWidth={1.5} aria-hidden="true" />
                  <div className={styles.flowWindow} aria-hidden="true">
                    <div className={styles.flowTrack}>
                      {[0, 1].map((group) => (
                        <span className={styles.flowGroup} key={group}>
                          {[0, 1].map((item) => (
                            <span className={styles.flowItem} key={item}>
                              {service.flowLabel}<ArrowUpRight size={30} strokeWidth={1.5} />
                            </span>
                          ))}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
                <p className={styles.description}>{service.description}</p>
                {standalone && <p className={styles.detail}>{service.detail}</p>}
                <ul className={styles.deliverables} aria-label={`${service.title} includes`}>
                  {service.deliverables.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
