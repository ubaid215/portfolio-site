"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/scroll-motion"

/**
 * Site-wide smooth scrolling.
 *
 * Lenis drives the window scroll and GSAP's ticker drives Lenis, so every
 * ScrollTrigger entrance reads the smoothed position instead of the raw one.
 * Reduced motion skips it entirely and keeps the browser's own scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let active: { lenis: Lenis; raf: (time: number) => void; onAnchorClick: (event: MouseEvent) => void } | null = null

    const start = () => {
      if (active || reduced.matches) return
      const lenis = new Lenis({
        lerp: 0.1,
        // Route changes drop the momentum instead of carrying it onto a new page.
        stopInertiaOnNavigate: true,
      })
      const raf = (time: number) => lenis.raf(time * 1000)
      lenis.on("scroll", ScrollTrigger.update)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      // Taken in the capture phase: a hash link's own handler would jump before
      // Lenis saw the click. Lenis reads scroll-margin-top, so the target still
      // lands clear of the sticky navbar.
      const onAnchorClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        const link = event.composedPath().find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement && Boolean(node.hash))
        if (!link) return
        const url = new URL(link.href)
        if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
        if (!target) return
        event.preventDefault()
        lenis.scrollTo(target)
        window.history.pushState(null, "", url.hash)
      }
      document.addEventListener("click", onAnchorClick, true)

      active = { lenis, raf, onAnchorClick }
    }

    const stop = () => {
      if (!active) return
      document.removeEventListener("click", active.onAnchorClick, true)
      gsap.ticker.remove(active.raf)
      gsap.ticker.lagSmoothing(500, 33)
      active.lenis.destroy()
      active = null
    }

    const sync = () => (reduced.matches ? stop() : start())
    sync()
    reduced.addEventListener("change", sync)

    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })

    return () => {
      disposed = true
      reduced.removeEventListener("change", sync)
      stop()
    }
  }, [])

  return null
}
