"use client"

import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { PROJECTS, type Project, type ProjectCategory } from "@/lib/projects"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"
import styles from "./page.module.css"

const EASE = [0.16, 1, 0.3, 1] as const
const FILTERS: ("All" | ProjectCategory)[] = ["All", "Full Stack", "Frontend", "SaaS", "Client Work"]
const POINTER_MOTION = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"

function attachPointerDepth(target: HTMLElement, surface: HTMLElement, travel: number, tilt: number) {
  const options = { duration: 0.7, ease: "power3.out" }
  const xTo = gsap.quickTo(surface, "x", options)
  const yTo = gsap.quickTo(surface, "y", options)
  const rotateXTo = gsap.quickTo(surface, "rotationX", options)
  const rotateYTo = gsap.quickTo(surface, "rotationY", options)
  gsap.set(surface, { transformPerspective: 1100 })
  let bounds: DOMRect | null = null
  let scrollPosition = 0
  let viewportWidth = 0

  const move = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return
    if (!bounds || scrollPosition !== window.scrollY || viewportWidth !== window.innerWidth) {
      bounds = target.getBoundingClientRect()
      scrollPosition = window.scrollY
      viewportWidth = window.innerWidth
    }
    const x = gsap.utils.clamp(-0.5, 0.5, (event.clientX - bounds.left) / bounds.width - 0.5)
    const y = gsap.utils.clamp(-0.5, 0.5, (event.clientY - bounds.top) / bounds.height - 0.5)
    xTo(x * travel)
    yTo(y * travel)
    rotateXTo(-y * tilt)
    rotateYTo(x * tilt)
  }
  const reset = () => { bounds = null; xTo(0); yTo(0); rotateXTo(0); rotateYTo(0) }
  target.addEventListener("pointermove", move, { passive: true })
  target.addEventListener("pointerleave", reset)
  target.addEventListener("pointercancel", reset)
  target.addEventListener("focusin", reset)
  return () => {
    target.removeEventListener("pointermove", move)
    target.removeEventListener("pointerleave", reset)
    target.removeEventListener("pointercancel", reset)
    target.removeEventListener("focusin", reset)
    ;[xTo, yTo, rotateXTo, rotateYTo].forEach((to) => to.tween.kill())
  }
}

function WorkPreview() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    const visibilityChange = () => setHidden(document.hidden)
    observer.observe(stage)
    visibilityChange()
    document.addEventListener("visibilitychange", visibilityChange)
    const media = gsap.matchMedia()
    media.add(POINTER_MOTION, () => {
      const composition = stage.parentElement
      if (!composition) return
      const cleanups = Array.from(stage.querySelectorAll<HTMLElement>("[data-preview-depth]")).map((surface, index) =>
        attachPointerDepth(composition, surface, index === 0 ? 18 : -28, index === 0 ? 3 : -4)
      )
      return () => cleanups.forEach((cleanup) => cleanup())
    }, stage)
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibilityChange); media.revert() }
  }, [])

  return (
      <div ref={stageRef} className={styles.previewStage} data-motion={hidden || !visible ? "paused" : "running"} aria-hidden="true">
        {[PROJECTS[0], PROJECTS[2]].map((project) => (
          <div className={styles.previewFrame} key={project.slug}>
            <div className={styles.previewFloat}>
              <div className={styles.previewDepth} data-preview-depth>
                <div className={styles.previewScreen}>
                  <Image src={project.coverImage} alt="" fill sizes="(max-width: 760px) 75vw, 42vw" loading="eager" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  )
}

function ProjectStory({ project, featured }: { project: Project; featured: boolean }) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const link = linkRef.current
    if (!link) return
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-work-mask]", { clipPath: "inset(7% 4% 7% 4% round 0.85rem)" }, {
        clipPath: "inset(0% 0% 0% 0% round 0.85rem)", ease: "none",
        scrollTrigger: { trigger: link, start: "top 93%", end: "top 38%", scrub: 0.8 },
      })
      gsap.fromTo("[data-work-copy]", { y: 30 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: link, start: "top 88%", end: "top 48%", scrub: 0.7 },
      })
    }, link)
    media.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-screen-depth]", { yPercent: 9, scale: 1.04 }, {
        yPercent: -9, scale: 1, ease: "none",
        scrollTrigger: { trigger: link, start: "top bottom", end: "bottom top", scrub: 1 },
      })
    }, link)
    media.add(POINTER_MOTION, () => {
      const target = link.querySelector<HTMLElement>("[data-work-surface]")
      const surface = link.querySelector<HTMLElement>("[data-work-tilt]")
      if (target && surface) return attachPointerDepth(target, surface, 8, 10)
    }, link)
    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [featured])

  return (
    <Link href={`/work/${project.slug}`} ref={linkRef} className={styles.projectLink} aria-label={`View ${project.title} case study`}>
      <div className={styles.media} data-work-surface style={{ "--project-surface": project.mockupColor } as CSSProperties}>
        <div className={styles.mediaMask} data-work-mask>
          <div className={styles.screenDepth} data-screen-depth>
            <div className={styles.screenTilt} data-work-tilt>
              <div className={styles.screen}>
                {imageError ? <div className={styles.fallback}>{project.title}</div> : <Image src={project.coverImage} alt={`${project.title} interface`} fill sizes={featured ? "(max-width: 760px) 90vw, 58vw" : "(max-width: 760px) 90vw, 50vw"} onError={() => setImageError(true)} />}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mediaNote} aria-hidden="true"><span>{project.categories.includes("SaaS") ? "Connected product" : project.categories.includes("Frontend") ? "Digital presence" : "Business application"}</span><span>{project.year}</span></div>
      </div>
      <div className={styles.copy} data-work-copy>
        <div className={styles.details}><span>{project.index} / Case study</span><span>{project.categories.includes("Frontend") ? "Design & development" : "Full stack development"}</span></div>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.description}>{project.shortDesc}</p>
        <p className={styles.stack}>{project.stack.slice(0, 3).join(" / ")}</p>
        <div className={styles.caseAction} aria-hidden="true">
          <span className={styles.actionText}><span>Explore the case study</span><span>See how it came together</span></span>
          <span className={styles.caseArrow}><ArrowUpRight size={21} strokeWidth={1.5} /></span>
        </div>
      </div>
    </Link>
  )
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | ProjectCategory>("All")
  const rootRef = useRef<HTMLDivElement>(null)
  const refreshFrame = useRef(0)
  const reducedMotion = useReducedMotion()
  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter((project) => project.categories.includes(activeFilter))

  const scheduleRefresh = useCallback(() => {
    cancelAnimationFrame(refreshFrame.current)
    refreshFrame.current = requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  useEffect(() => {
    scheduleRefresh()
    return () => cancelAnimationFrame(refreshFrame.current)
  }, [activeFilter, scheduleRefresh])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const media = gsap.matchMedia()
    media.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to("[data-work-hero-title]", { y: -60, ease: "none", scrollTrigger: { trigger: "[data-work-hero]", start: "top top", end: "bottom top", scrub: 0.9 } })
    }, root)
    return () => media.revert()
  }, [])

  return (
    <div className={styles.page} ref={rootRef}>
      <section className={`${styles.hero} ${styles.container}`} aria-labelledby="work-heading" data-work-hero>
        <div className={styles.heroComposition}>
          <div>
            <h1 id="work-heading" className={styles.heading} data-work-hero-title aria-label="Selected Work">
              <span className={`${styles.titleLine} ${styles.selected}`}><span>Selected</span></span>
              <span className={`${styles.titleLine} ${styles.work}`}><span>Work.</span></span>
            </h1>
            <p className={styles.intro}>Built for the people using it.<br />Websites, products, and everyday business systems. Explore the thinking behind the interface.</p>
          </div>
          <WorkPreview />
        </div>
        <div className={styles.heroRail}>
          <div className={styles.collection}><span>{PROJECTS.length.toString().padStart(2, "0")} selected case studies</span><span>2025 — 2026</span></div>
          <Link href="#projects" className={styles.explore}>Explore the projects<span className={styles.exploreIcon} aria-hidden="true"><ArrowDown size={17} strokeWidth={1.5} /><ArrowDown size={17} strokeWidth={1.5} /></span></Link>
        </div>
      </section>

      <section id="projects" className={`${styles.gallery} ${styles.container}`} aria-label="Project collection">
        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="Filter projects">
            {FILTERS.map((filter) => {
              const active = activeFilter === filter
              const count = filter === "All" ? PROJECTS.length : PROJECTS.filter((project) => project.categories.includes(filter)).length
              return (
                <button key={filter} type="button" className={styles.filter} aria-pressed={active} aria-controls="work-projects" onClick={() => setActiveFilter(filter)}>
                  {active && <motion.span className={styles.activeFilter} data-framer-motion layoutId="work-active-filter" transition={{ duration: reducedMotion ? 0 : 0.6, ease: EASE }} />}
                  <span>{filter}</span><span className={styles.filterCount}>{count.toString().padStart(2, "0")}</span>
                </button>
              )
            })}
          </div>
          <p className={styles.results} role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "project" : "projects"} in view</p>
        </div>
        <div id="work-projects" className={styles.grid}>
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project, index) => (
              <motion.article
                key={project.slug}
                className={`${styles.project} ${index === 0 ? styles.featured : ""}`}
                layout={!reducedMotion}
                initial={{ opacity: 1, y: reducedMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -15 }}
                transition={{ duration: reducedMotion ? 0 : 0.55, ease: EASE }}
                onLayoutAnimationComplete={scheduleRefresh}
              >
                <ProjectStory project={project} featured={index === 0} />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
        {filtered.length === 0 && <p className={styles.empty}>No projects in this category yet. Explore all projects to see the full collection.</p>}
        <div className={styles.closing}><p>Your next project could start here.</p><Link href="/contact">Let&apos;s find the right approach<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </section>
    </div>
  )
}
