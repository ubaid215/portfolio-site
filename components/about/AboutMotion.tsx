"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"

export function AboutMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const media = gsap.matchMedia()

    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      tallViewport: "(min-height: 601px)",
    }, (context) => {
      if (!context.conditions?.motion) return
      const stage = root.querySelector<HTMLElement>("[data-about-statement-stage]")
      if (!stage) return
      const reading = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: context.conditions.tallViewport ? "top top" : "top 20%",
          end: () => context.conditions?.tallViewport ? `+=${Math.round(window.innerHeight * 1.35)}` : "bottom 35%",
          pin: context.conditions.tallViewport,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      })
      reading.fromTo("[data-about-ink]", { clipPath: "inset(0% 100% 0% 0%)" }, {
        clipPath: "inset(0% 0% 0% 0%)", duration: 0.025, stagger: 0.025, ease: "none",
      }, 0.1)
      // Give the completed sentence a short reading pause before the pin releases.
      reading.to({}, { duration: 0.3 })
    }, root)

    media.add("(prefers-reduced-motion: no-preference)", () => {
      root.querySelectorAll<HTMLElement>("[data-about-line]").forEach((line) => {
        gsap.fromTo(line, { yPercent: 110 }, {
          yPercent: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: line.parentElement, start: "top 90%", once: true },
        })
      })
      root.querySelectorAll<HTMLElement>("[data-about-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 24, clipPath: "inset(0% 0% 100% 0%)" }, {
          y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        })
      })
      gsap.fromTo("[data-about-process-progress]", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: "[data-about-process]", start: "top 65%", end: "bottom 60%", scrub: 0.6 },
      })
    }, root)

    media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-about-portrait]", { yPercent: -3, scale: 1.04 }, {
        yPercent: 7, scale: 1.01, ease: "none",
        scrollTrigger: { trigger: "[data-about-hero]", start: "top top", end: "bottom top", scrub: 1 },
      })
      root.querySelectorAll<HTMLElement>("[data-about-proof-image]").forEach((image) => {
        gsap.fromTo(image, { yPercent: -5, scale: 1.08 }, {
          yPercent: 5, scale: 1.01, ease: "none",
          scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 0.9 },
        })
      })
    }, root)

    let disposed = false
    const refresh = () => { if (!disposed) ScrollTrigger.refresh() }
    void document.fonts.ready.then(refresh)
    window.addEventListener("load", refresh)
    return () => { disposed = true; window.removeEventListener("load", refresh); media.revert() }
  }, [])

  return <div ref={rootRef} className={className}>{children}</div>
}
