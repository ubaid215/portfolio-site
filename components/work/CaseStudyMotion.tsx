"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"

export function CaseStudyMotion({ children, className, onChapterChange }: { children: ReactNode; className: string; onChapterChange: (id: string) => void }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let disposed = false
    const media = gsap.matchMedia()
    const chapterContext = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-case-chapter]").forEach((chapter) => {
        ScrollTrigger.create({ trigger: chapter, start: "top 40%", end: "bottom 40%", onEnter: () => onChapterChange(chapter.id), onEnterBack: () => onChapterChange(chapter.id) })
      })
    }, root)

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const entrance = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } })
        .from("[data-case-title]", { yPercent: 110, duration: 1.35 })
        .from("[data-case-introduction]", { opacity: 0, y: 18, duration: 1.1 }, 0.18)
        .from("[data-case-facts] > div", { opacity: 0, y: 14, stagger: 0.1, duration: 1 }, 0.35)
      let started = false
      const observer = new MutationObserver(() => { if (document.documentElement.dataset.siteIntro === "done") start() })
      const start = () => {
        if (started) return
        started = true
        observer.disconnect()
        entrance.play()
      }
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-site-intro"] })
      if (document.documentElement.dataset.siteIntro === "done") start()
      const fallback = window.setTimeout(start, 3500)

      const reveal = (selector: string, from: gsap.TweenVars, duration: number) => {
        root.querySelectorAll(selector).forEach((element) => gsap.from(element, { ...from, duration, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } }))
      }
      reveal("[data-case-heading]", { y: 14, clipPath: "inset(0 0 100% 0)" }, 1.1)
      reveal("[data-case-copy]", { opacity: 0.45, y: 14 }, 1.1)
      reveal("[data-case-detail]", { opacity: 0.35, y: 14 }, 0.95)
      reveal("[data-case-screen]", { y: 20 }, 1.3)

      const delivery = root.querySelector("[data-case-delivery]")
      if (delivery) {
        const trigger = { trigger: delivery, start: "top 78%", end: "bottom 70%", scrub: 0.85 }
        gsap.fromTo(delivery.querySelectorAll("[data-case-letter]"), { color: "var(--fg-muted)" }, { color: "var(--fg)", duration: 0.8, stagger: 0.025, ease: "none", scrollTrigger: trigger })
        gsap.fromTo(delivery.querySelector("[data-case-rule]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: trigger })
      }
      return () => { observer.disconnect(); window.clearTimeout(fallback) }
    }, root)

    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const cover = root.querySelector("[data-case-cover]")
      if (cover) gsap.fromTo(cover, { yPercent: 2, scale: 1.035 }, { yPercent: -2, scale: 1, ease: "none", scrollTrigger: { trigger: cover.parentElement, start: "top bottom", end: "bottom top", scrub: 1.2 } })
    }, root)

    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert(); chapterContext.revert() }
  }, [onChapterChange])

  return <div ref={rootRef} className={className}>{children}</div>
}
