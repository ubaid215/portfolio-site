# Measurement baseline and validation

**Established:** 17 October 2026
**Purpose:** a repeatable record of what was true before any change, so that later claims are comparisons rather than impressions.

**Rule:** an unmeasured value is **unknown**. It is never written as zero, and never estimated into a table that looks authoritative.

---

## Environment (record this with every future run)

| Item | Value |
|---|---|
| Deployment measured | `https://ubaiddev-eta.vercel.app/` |
| Host header | `Server: Vercel`, `x-vercel-cache: HIT` |
| Lighthouse | 13.5.0, local Chrome, `--throttling-method=simulate` |
| Mobile profile | `--form-factor=mobile --screenEmulation.mobile` |
| Desktop profile | `--form-factor=desktop` |
| Next.js | 16.4.0 (Turbopack) |
| Node | v24 |
| Build | `npm run build` → exit 0, 15 routes |
| PageSpeed Insights API | **Unavailable** — HTTP 429, anonymous daily quota = 0 |
| Search Console / Bing / GA4 | **No access** |

---

## Baseline: crawl and indexation

| Metric | Baseline (17 Oct 2026) | Source |
|---|---|---|
| Public routes returning 200 | 10 | Direct requests |
| `robots.txt` | **404** | Direct request |
| `sitemap.xml` | **404** | Direct request |
| Routes with a canonical | **0 / 10** | Rendered HTML parse |
| Routes with JSON-LD | **0 / 10** | Rendered HTML parse |
| Duplicate homepage URL | `/index` = identical HTML, 200 | `cmp` of responses |
| Unknown-route status | 404 (correct) | Direct requests |
| Trailing slash behavior | 308 → non-slash | Direct requests |
| HTTP → HTTPS | 308 | Direct request |
| Indexed pages | **Unknown** | No Search Console |
| Impressions / clicks / queries | **Unknown** | No Search Console |
| Backlinks | **Unknown** | No tool |
| Domain status | `ubaid.dev` — **no A/AAAA record**; Cloudflare NS; MX → Microsoft 365 | `getent`, `curl`, `nslookup` |

## Baseline: on-page

| Route | Title chars | Desc chars | Words |
|---|---|---|---|
| `/` | 48 | 152 | 1541 |
| `/about` | 27 | **191** | 960 |
| `/services` | 62 | 144 | 1193 |
| `/work` | 35 | 145 | 376 |
| `/work/ecommerce-platform` | 25 | 100 | 598 |
| `/work/school-management` | 24 | 105 | 591 |
| `/work/restaurant-pos` | 20 | 129 | 628 |
| `/work/donation-dashboard` | 31 | 157 | 560 |
| `/work/tax-websites` | 22 | 97 | 586 |
| `/contact` | 29 | 128 | 397 |

Headings: one H1 per route on all 10. Images: 0 missing `alt`. Duplicate testimonial text: `"Hussnain Akbar"` × 4 on the homepage.

## Baseline: performance (lab)

| Metric | Mobile | Desktop | Threshold |
|---|---|---|---|
| Performance score | 73 | **49** | — |
| FCP | 1.0 s | 1.1 s | ≤ 1.8 s |
| **LCP** | **3.5 s** | **3.5 s** | ≤ 2.5 s |
| **TBT** | **630 ms** | **480 ms** | — |
| CLS | 0.006 | 0.006 | ≤ 0.1 |
| Speed Index | 4.2 s | 4.1 s | ≤ 3.4 s |
| TTI | 4.8 s | — | ≤ 3.8 s |
| Main-thread work | 3.8 s | 4.3 s | — |
| Transfer | 672 KiB | — | — |
| Accessibility / Best practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 | — |

**Field data (CrUX): unknown.** If the site has too little traffic, field data may never appear — that is not a failure.

## Baseline: assets

| Metric | Value |
|---|---|
| `public/` total | 24 MB |
| Image files | 44 |
| Files > 1 MB | 9 (largest 3.9 MB) |
| JS in `.next/static` | 1.0 MB across chunks (largest 229 KB) |
| Client components | 22 |
| Favicon transfer | 112 KB |

## Baseline: conversion

| Metric | Value |
|---|---|
| Form submissions received | **Unknown** |
| Form delivery verified | **No** |
| Analytics installed | **No** |
| Booking link | **No** |
| Lead log | Does not exist |
| Email address on site | `hi@ubaid.dev` — MX exists (Microsoft 365); mailbox and delivery unverified |

---

## Setup checklist (free)

### 1. Google Search Console
1. Add a **Domain** property (DNS TXT) or a **URL-prefix** property for the deployed host.
2. Verify.
3. Submit `https://<host>/sitemap.xml` once T03 ships.
4. Use URL Inspection on `/`, one case study, and one service page.
5. Record the first impressions date — this is the start of real data.

### 2. Bing Webmaster Tools
1. Import from Search Console (fastest) or verify directly.
2. Submit the sitemap.
3. Note the keyword research view — it is free and does not require an Ads account.

### 3. Analytics
1. If GA4: create a property, install with the route-change handler that avoids double pageviews.
2. Add the seven events from `conversion-and-analytics-audit.md`.
3. Publish a privacy notice describing what is collected before enabling cookies.
4. Verify with a **test** enquiry, then delete the test lead from the lead log.

### 4. Server-side lead counter
Record a row on successful submission (`timestamp`, `service_category`). This survives ad blockers and is the most reliable conversion count. Never store the visitor's message in analytics.

---

## Validation procedures for each fix

| Fix | How to prove it | Pass condition |
|---|---|---|
| T01 origin | `curl -sI https://<host>/` and grep the rendered head | 200; absolute URLs use that host |
| T02 robots | `curl -s https://<host>/robots.txt` | 200, `text/plain`, contains `Sitemap:` |
| T03 sitemap | `curl -s .../sitemap.xml` then parse | Valid XML; 10 `<loc>`; each returns 200 |
| T04 canonicals | Parse HTML for each route | Exactly one, self-referencing |
| T05/T07 social | Platform validators + inspect head | Image fetches 200; `og:url` present; `summary_large_image` |
| T08 titles | Parse `<title>` | Brand suffix present, ≤ 60 chars |
| T09 JSON-LD | Rich Results Test + schema.org validator | No errors; fields match visible text |
| T06 duplicate | `curl /index` | 301/308 to `/`, or canonical present |
| P01 LCP | Lighthouse mobile + disable JS | LCP ≤ 2.5 s; hero text visible without JS |
| P02 TBT | Lighthouse mobile | TBT < 200 ms |
| P03 images | `du -sh public` | < 4 MB; no file > 400 KB |
| C02 abuse | Burst of 10 POSTs; honeypot POST | Throttled / rejected |
| C03 events | Submit a test enquiry | Exactly one `generate_lead`; 503 yields none |
| C08 delivery | Send a real enquiry | Message received in the owner inbox |

**Every check above must be run again after the change that is supposed to fix it.** A passing check from before an edit does not cover that edit.

---

## Weekly scorecard (5 minutes)

| Metric | Source | Week 1 | Week 2 | Week 3 | Week 4 |
|---|---|---|---|---|---|
| Impressions | Search Console | | | | |
| Clicks | Search Console | | | | |
| Queries with impressions | Search Console | | | | |
| Indexed pages | Search Console | | | | |
| Form submissions | Lead counter | | | | |
| Enquiries qualified | Lead log | | | | |
| Outreach sent | Lead log | | | | |
| Replies | Lead log | | | | |
| Calls held | Lead log | | | | |
| Proposals sent | Lead log | | | | |
| Won | Lead log | | | | |

## Monthly review (30 minutes)

1. Which pages earned impressions but not clicks? Rewrite those titles/descriptions first.
2. Which queries are you on page 2–3 for? Those are the cheapest next wins.
3. Which outreach message produced replies? Keep it; delete the rest.
4. Which service did enquiries actually name? If it is always one, the others are site decoration.
5. Re-run Lighthouse on the homepage and the HVAC page.
6. Update the baseline table in this document with the new measurements and the date.

---

## How to record a change so it can be evaluated

Keep a simple log. One row per change:

| Date | Change | Hypothesis | Metric | Before | After | Verdict |
|---|---|---|---|---|---|---|
| 2026-10-18 | Removed hero intro gate | LCP is gated by JS, not network | LCP mobile | 3.5 s | — | — |

Without a before/after and a date, an improvement is an opinion.

---

## Known unknowns (must stay unknown until measured)

1. Indexed page count and any search visibility.
2. Whether the site receives any organic traffic at all.
3. Real-user LCP, INP and CLS.
4. Whether the contact form currently delivers mail.
5. Whether `hi@ubaid.dev` is a live mailbox and whether form mail reaches the owner (MX records exist; delivery was never tested).
6. Any backlinks, brand mentions or AI-assistant citations.
7. Keyword volume, difficulty and CPC for every proposed query.
8. Whether residential HVAC companies will pay for this offer.

Item 8 is the only one that determines the business. It is measured by conversations, not by a dashboard.
