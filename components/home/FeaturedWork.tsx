"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { PROJECTS } from "@/lib/projects"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"
import styles from "./FeaturedWork.module.css"

const FEATURED = PROJECTS.slice(0, 4)
const PROJECT_FOCUS: Record<string, string[]> = {
  "ecommerce-platform": ["Storefront", "Inventory", "Custom CMS"],
  "school-management": ["Connected portals", "Attendance", "Fee management"],
  "restaurant-pos": ["Ordering", "Kitchen workflow", "Reporting"],
  "donation-dashboard": ["Donor CRM", "WhatsApp API", "Automated messaging"],
}

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-work-heading]", { y: 50 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: section, start: "top 90%", end: "top 55%", scrub: 0.7 },
      })

      section.querySelectorAll<HTMLElement>("[data-project-card]").forEach((card, index) => {
        gsap.fromTo(card.querySelector("[data-project-link]"), { y: index % 2 ? 90 : 55, scale: 0.96 }, {
          y: 0, scale: 1, ease: "none",
          scrollTrigger: { trigger: card, start: "top 95%", end: "top 60%", scrub: 0.65 },
        })
      })
    }, section)

    media.add("(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      section.querySelectorAll<HTMLElement>("[data-project-card]").forEach((card, index) => {
        gsap.fromTo(card.querySelector("[data-project-image]"), {
          yPercent: 8, rotate: index % 2 === 0 ? -4 : 4,
        }, {
          yPercent: -8, rotate: index % 2 === 0 ? -1 : 1, ease: "none",
          scrollTrigger: {
            trigger: card, start: "top bottom", end: "bottom top",
            scrub: 0.9, invalidateOnRefresh: true,
          },
        })
      })
    }, section)

    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [])

  return (
    <section id="work" ref={sectionRef} className={styles.section} aria-labelledby="work-title">
      <div className={styles.container}>
        <div className={styles.headingRow} data-work-heading>
          <h2 id="work-title" className={styles.heading}>
            Selected work.<br />Real workflows.
          </h2>
          <div className={styles.headingAside}>
            <p>
              A closer look at the interfaces, integrations, and product decisions
              that bring a business workflow together.
            </p>
            <Link href="/work" className={styles.allWork}>
              Explore all projects <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.projectGrid}>
          {FEATURED.map((project) => (
            <article className={styles.projectCard} key={project.slug} data-project-card>
              <Link
                className={styles.projectLink}
                href={`/work/${project.slug}`}
                aria-label={`View ${project.title} case study`}
                style={{ "--project-surface": project.mockupColor } as CSSProperties}
                data-project-link
              >
                <div className={styles.projectMedia}>
                  <div className={styles.tags} aria-hidden="true">
                    {PROJECT_FOCUS[project.slug].map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className={styles.productPlane} data-project-image>
                    <div className={styles.imageZoom}>
                      <Image
                        src={project.coverImage}
                        alt={`${project.title} interface`}
                        fill
                        sizes="(max-width: 700px) 92vw, (max-width: 1000px) 55vw, 48vw"
                        className={styles.coverImage}
                      />
                    </div>
                  </div>
                  <div className={styles.mediaCaption} aria-hidden="true">
                    <span>{project.categories.includes("SaaS") ? "Web application" : "Custom development"}</span>
                    <span>{project.year}</span>
                  </div>
                </div>

                <div className={styles.projectCopy}>
                  <div className={styles.projectTitleRow}>
                    <h3>{project.title}</h3>
                    <span className={styles.projectArrow} aria-hidden="true">
                      <ArrowUpRight size={23} strokeWidth={1.5} />
                    </span>
                  </div>
                  <p>{project.shortDesc}</p>
                  <span className={styles.caseLink} aria-hidden="true">Explore the case study</span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.closing}>
          <p>Have a different challenge in mind?</p>
          <Link href="/contact">
            Let&apos;s find the right approach
            <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
