"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"

export function ContactMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const entrance = gsap.timeline({ paused: true }).from("[data-contact-line]", {
        yPercent: 105, duration: 1.4, stagger: 0.16, ease: "expo.out",
      })
      // Let the existing first-load intro finish before revealing the contact heading.
      const startEntrance = () => { entrance.play(); introObserver.disconnect() }
      const introObserver = new MutationObserver(() => {
        if (document.documentElement.dataset.siteIntro === "done") startEntrance()
      })
      introObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-site-intro"] })
      if (document.documentElement.dataset.siteIntro === "done") startEntrance()
      const entranceFallback = window.setTimeout(startEntrance, 3500)
      root.querySelectorAll<HTMLElement>("[data-contact-reveal]").forEach((element) => {
        gsap.from(element, {
          clipPath: "inset(0 0 100% 0)", y: 16, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        })
      })
      gsap.fromTo("[data-contact-progress]", { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: "[data-contact-next]", start: "top 85%", end: "bottom 65%", scrub: 0.8 },
      })
      gsap.to("[data-contact-connection]", {
        y: -28, rotate: -4, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "+=650", scrub: 1.2 },
      })
      return () => { introObserver.disconnect(); window.clearTimeout(entranceFallback) }
    }, root)
    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [])
  return <div className={className} ref={rootRef}>{children}</div>
}
