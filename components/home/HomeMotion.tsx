"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"
import styles from "./HomeMotion.module.css"

export function HomeMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-reading-progress]", { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.25 },
      })
    }, root)

    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to("[data-hero-portrait]", {
        yPercent: 14, scale: 1.08, ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 0.9 },
      })
      gsap.to("[data-hero-identity]", {
        y: -75, ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 0.8 },
      })
    }, root)

    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups: Array<() => void> = []
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
        const xTo = gsap.quickTo(element, "x", { duration: 0.45, ease: "power3.out" })
        const yTo = gsap.quickTo(element, "y", { duration: 0.45, ease: "power3.out" })
        let bounds: DOMRect | null = null
        const enter = () => { bounds = element.getBoundingClientRect() }
        const move = (event: PointerEvent) => {
          if (!bounds) enter()
          if (!bounds) return
          xTo(gsap.utils.clamp(-10, 10, (event.clientX - bounds.left - bounds.width / 2) * 0.13))
          yTo(gsap.utils.clamp(-8, 8, (event.clientY - bounds.top - bounds.height / 2) * 0.18))
        }
        const reset = () => { bounds = null; xTo(0); yTo(0) }
        element.addEventListener("pointerenter", enter)
        element.addEventListener("pointermove", move)
        element.addEventListener("pointerleave", reset)
        element.addEventListener("focus", reset)
        cleanups.push(() => {
          element.removeEventListener("pointerenter", enter)
          element.removeEventListener("pointermove", move)
          element.removeEventListener("pointerleave", reset)
          element.removeEventListener("focus", reset)
        })
      })

      root.querySelectorAll<HTMLElement>("[data-project-card]").forEach((card) => {
        const surface = card.querySelector<HTMLElement>("[data-project-link]")
        if (!surface) return
        const rotateX = gsap.quickTo(surface, "rotationX", { duration: 0.6, ease: "power3.out" })
        const rotateY = gsap.quickTo(surface, "rotationY", { duration: 0.6, ease: "power3.out" })
        gsap.set(surface, { transformPerspective: 1200 })
        const move = (event: PointerEvent) => {
          const bounds = card.getBoundingClientRect()
          rotateX(((event.clientY - bounds.top) / bounds.height - 0.5) * -5)
          rotateY(((event.clientX - bounds.left) / bounds.width - 0.5) * 6)
        }
        const reset = () => { rotateX(0); rotateY(0) }
        card.addEventListener("pointermove", move)
        card.addEventListener("pointerleave", reset)
        cleanups.push(() => {
          card.removeEventListener("pointermove", move)
          card.removeEventListener("pointerleave", reset)
        })
      })

      return () => cleanups.forEach((cleanup) => cleanup())
    }, root)

    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [])

  return (
    <div ref={rootRef}>
      <div className={styles.readingProgress} data-reading-progress aria-hidden="true" />
      {children}
    </div>
  )
}
