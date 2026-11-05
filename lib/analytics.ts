// lib/analytics.ts
// GA4 events. Parameters carry categories only (service, budget band, page),
// never a visitor's name, email or message.

import { sendGAEvent } from "@next/third-parties/google"
import { GA_MEASUREMENT_ID } from "./site"

export type AnalyticsEvent =
  | "generate_lead"
  | "contact_submit_error"
  | "book_call_click"
  | "contact_method_click"
  | "service_cta_click"

export function trackEvent(name: AnalyticsEvent, params: Record<string, string> = {}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return
  sendGAEvent("event", name, params)
}
