"use client"

import { useEffect } from "react"
import { GoogleAnalytics } from "@next/third-parties/google"
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics"
import { GA_MEASUREMENT_ID } from "@/lib/site"

/**
 * Loads GA4 when NEXT_PUBLIC_GA_ID is set, and reports clicks on any element
 * marked `data-track="<event>"`, so server components can be tracked without
 * becoming client components. `data-track-label` adds a safe category.
 */
export function Analytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track]") : null
      if (!target) return
      trackEvent(target.dataset.track as AnalyticsEvent, {
        label: target.dataset.trackLabel ?? "",
        page: window.location.pathname,
      })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null
}
