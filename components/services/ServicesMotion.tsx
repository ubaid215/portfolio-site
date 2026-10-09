"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"

export function ServicesMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const media = gsap.matchMedia()
    const stage = root.querySelector<HTMLElement>("[data-services-stage]")
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-services-panel]"))
    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-services-chapter-button]"))
    let chapterTimeline: gsap.core.Timeline | null = null
    let disposed = false

    const activate = (index: number) => {
      panels.forEach((panel, i) => { panel.dataset.active = String(i === index) })
      buttons.forEach((button, i) => {
        button.dataset.active = String(i === index)
        if (i === index) button.setAttribute("aria-current", "step")
        else button.removeAttribute("aria-current")
      })
    }

    media.add("(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)", () => {
      if (!stage) return
      stage.dataset.enhanced = "true"
      activate(0)
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 24 })
      gsap.set("[data-services-progress]", { scaleY: 0 })
      chapterTimeline = gsap.timeline({
        onUpdate: () => {
          const progress = chapterTimeline?.progress() ?? 0
          activate(progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2)
        },
        scrollTrigger: {
          trigger: stage, start: "top top", end: () => `+=${Math.round(window.innerHeight * 2.7)}`,
          pin: true, pinSpacing: true, anticipatePin: 1, scrub: 0.85, invalidateOnRefresh: true,
        },
      })
      chapterTimeline.to(panels[0], { autoAlpha: 0, y: -24, duration: 0.25 }, 1.1)
        .to(panels[1], { autoAlpha: 1, y: 0, duration: 0.3 }, 1.3)
        .to(panels[1], { autoAlpha: 0, y: -24, duration: 0.25 }, 2.55)
        .to(panels[2], { autoAlpha: 1, y: 0, duration: 0.3 }, 2.75)
        .to("[data-services-progress]", { scaleY: 1, duration: 4.1, ease: "none" }, 0)
      return () => {
        chapterTimeline = null
        delete stage.dataset.enhanced
        panels.forEach((panel) => { delete panel.dataset.active })
        buttons.forEach((button) => { delete button.dataset.active; button.removeAttribute("aria-current") })
      }
    }, root)

    media.add({ narrow: "(max-width: 999px)", short: "(max-height: 649px)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      if (!context.conditions?.motion || !(context.conditions.narrow || context.conditions.short)) return
      panels.forEach((panel, index) => ScrollTrigger.create({ trigger: panel, start: "top 55%", end: "bottom 55%", onEnter: () => activate(index), onEnterBack: () => activate(index) }))
    }, root)

    media.add("(prefers-reduced-motion: no-preference)", () => {
      root.querySelectorAll<HTMLElement>("[data-services-line]").forEach((line) => {
        gsap.fromTo(line, { yPercent: 110 }, {
          yPercent: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: line.parentElement, start: "top 90%", once: true },
        })
      })
      root.querySelectorAll<HTMLElement>("[data-services-reveal]").forEach((element) => {
        gsap.fromTo(element, { clipPath: "inset(0% 0% 100% 0%)", y: 20 }, {
          clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        })
      })
      gsap.fromTo("[data-services-process-progress]", { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: "[data-services-process]", start: "top 75%", end: "bottom 40%", scrub: 0.7 },
      })
    }, root)

    media.add("(min-width: 1000px) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
      const visual = root.querySelector<HTMLElement>("[data-services-hero-visual]")
      const cards = root.querySelectorAll<HTMLElement>("[data-services-hero-card]")
      if (!visual) return
      const moves = Array.from(cards).map((card, index) => ({
        x: gsap.quickTo(card, "x", { duration: 1.2, ease: "power3.out" }),
        y: gsap.quickTo(card, "y", { duration: 1.2, ease: "power3.out" }),
        depth: index === 0 ? 9 : 16,
      }))
      const onMove = (event: PointerEvent) => {
        const bounds = visual.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5
        moves.forEach((move) => { move.x(x * move.depth); move.y(y * move.depth) })
      }
      const reset = () => moves.forEach((move) => { move.x(0); move.y(0) })
      visual.addEventListener("pointermove", onMove)
      visual.addEventListener("pointerleave", reset)
      return () => { visual.removeEventListener("pointermove", onMove); visual.removeEventListener("pointerleave", reset) }
    }, root)

    const onChapterClick = (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement
      const index = buttons.indexOf(button)
      const trigger = chapterTimeline?.scrollTrigger
      if (trigger) {
        const progress = [0.12, 0.47, 0.82][index]
        window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: "smooth" })
      } else {
        panels[index]?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })
      }
    }
    buttons.forEach((button) => button.addEventListener("click", onChapterClick))
    const initialHash = window.location.hash
    let fontsReady = false
    let initialHashAligned = false
    const refresh = () => { if (!disposed) ScrollTrigger.refresh() }
    const onToggle = (event: Event) => { if (event.target instanceof HTMLDetailsElement) refresh() }
    const openHashScope = () => {
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      if (target instanceof HTMLDetailsElement && root.contains(target)) target.open = true
    }
    openHashScope()
    const alignInitialScope = () => {
      if (disposed || initialHashAligned || !fontsReady || document.readyState !== "complete" || window.location.hash !== initialHash) return
      const target = document.getElementById(decodeURIComponent(initialHash.slice(1)))
      if (target instanceof HTMLDetailsElement && root.contains(target)) {
        // Pin spacing and font metrics must settle before restoring the hash landing.
        initialHashAligned = true
        target.scrollIntoView({ behavior: "instant", block: "start" })
      }
    }
    const onLoad = () => { refresh(); alignInitialScope() }
    root.addEventListener("toggle", onToggle, true)
    window.addEventListener("hashchange", openHashScope)
    window.addEventListener("load", onLoad)
    void document.fonts.ready.then(() => { fontsReady = true; refresh(); alignInitialScope() })
    return () => {
      disposed = true
      buttons.forEach((button) => button.removeEventListener("click", onChapterClick))
      root.removeEventListener("toggle", onToggle, true)
      window.removeEventListener("hashchange", openHashScope)
      window.removeEventListener("load", onLoad)
      media.revert()
    }
  }, [])

  return <div ref={rootRef} className={className}>{children}</div>
}
