# Performance audit

**Measured:** 17 October 2026
**Target:** `https://ubaiddev-eta.vercel.app/` (homepage — the heaviest and most important route)
**Tool:** Lighthouse **13.5.0**, run locally against the live deployment via headless Chrome, `--throttling-method=simulate`.
**Not measured:** real-user field data. The site's traffic volume is unknown and no CrUX or Search Console access exists, so **no field INP, LCP or CLS is reported here**. Anything below is lab data.

## Tool-status disclosure

PageSpeed Insights API was attempted first and **failed with HTTP 429**:

> `Quota exceeded for quota metric 'Queries' and limit 'Queries per day' … quota_limit_value: "0"`

Anonymous PSI access is no longer available from this environment. Lighthouse was run locally instead. No crawl, schema validation or Search Console inspection was performed, because no tool or account was available.

---

## Lab results

| Metric | Mobile | Desktop | Threshold | Verdict |
|---|---|---|---|---|
| **Performance score** | **73** | **49** | — | Fails on both |
| First Contentful Paint | 1.0 s | 1.1 s | ≤ 1.8 s | Good |
| **Largest Contentful Paint** | **3.5 s** | **3.5 s** | ≤ 2.5 s | **Fails** |
| **Total Blocking Time** | **630 ms** | **480 ms** | (lab proxy for INP) | **Poor** |
| Cumulative Layout Shift | 0.006 | 0.006 | ≤ 0.1 | Good |
| Speed Index | 4.2 s | 4.1 s | ≤ 3.4 s | Needs work |
| Time to Interactive | 4.8 s | — | ≤ 3.8 s | Needs work |
| Main-thread work | 3.8 s | 4.3 s | — | Poor |
| JS bootup | 1.3 s | 1.2 s | — | Poor |
| Total transfer | 672 KiB | — | — | Acceptable |
| Accessibility | **100** | **100** | — | Pass |
| Best practices | **100** | **100** | — | Pass |
| SEO category | 100 | 100 | — | Pass (see caveat) |

**The desktop score is lower than mobile (49 vs 73).** That inversion is the diagnostic clue: desktop Lighthouse applies no CPU throttling, so a 3.5 s LCP on an unthrottled profile means the delay is **not** network or CPU. The page is deliberately withholding its own largest element.

The **SEO 100** in this report does not contradict `technical-seo-audit.md`. Lighthouse's SEO category does not check `robots.txt`, `sitemap.xml` or canonical tags — all three of which are missing.

---

## P01 — The hero is hidden behind JavaScript, and it is the LCP element

- **Severity:** Critical (for Core Web Vitals)
- **Confidence:** Verified from source + reproduced in lab data
- **Evidence:**
  - `app/layout.tsx:64` hardcodes `data-site-intro="playing"` into the **server** HTML.
  - `components/home/Hero.module.css:337-341` applies `visibility: hidden` to `.inner` (which contains the `<h1>`, the lede, and both CTAs), `.portraitStage`, and `.atmosphere` while that attribute is `playing`, with a CSS-only fallback that only fires at **3300 ms**.
  - The attribute flips to `done` **only** when client JavaScript runs: `SiteIntro.tsx` finishes on the curtain's `animationend` (`1650 ms` delay + `880 ms` duration ≈ 2.53 s) or a 3.2 s timer.
  - After `done`, the hero text still animates in with delays up to 720 ms and a 750 ms duration.
- **Result:** desktop Lighthouse reports **LCP 3.5 s** on a fast profile with a 60 ms server response. The page's largest paint is scheduled by animation choreography, not by the browser.
- **Impact:** LCP fails the Core Web Vitals "good" threshold on both mobile and desktop. This is also the first thing a visitor sees — a curtain for 2.5 s before any content.
- **Fix (preserves the design):**
  1. Keep the curtain as a fixed overlay; never use `visibility: hidden` on real content.
  2. Reveal hero content on a CSS-only timeline with a hard ceiling of ~400 ms.
  3. Skip the intro entirely when `sessionStorage` shows a prior visit, and always skip under `prefers-reduced-motion`.
  4. Remove the 3.3 s fallback dependency — content should never wait on JS at all.
- **Validation:** Re-run Lighthouse; target LCP ≤ 2.5 s mobile. Confirm the hero text is visible in a browser with JS disabled.

## P02 — JavaScript volume and main-thread cost

- **Severity:** High
- **Confidence:** Verified
- **Evidence:**
  - **22 files declare `"use client"`.**
  - Total JS in `.next/static`: **1.0 MB** across chunks; largest single chunk **229 KB**, then 168 KB, 131 KB, 115 KB, 113 KB.
  - Lighthouse: main-thread work **3.8 s mobile / 4.3 s desktop**, JS bootup 1.2–1.3 s, TBT 630/480 ms, estimated **49 KiB unused JS**.
  - Top requests include five chunks between 45 KB and 72 KB.
- **Impact:** TBT is the lab proxy for INP. At 630 ms mobile, interaction responsiveness is at risk on mid-range phones — exactly the device a contractor's office manager or a founder on the move will use.
- **Fix:** Convert purely decorative sections back to server components and isolate GSAP/Motion in small client wrappers. `HeroAtmosphere`, `TechMarquee`, and the testimonial marquee are candidates. Defer Lenis/GSAP until after first paint.
- **Validation:** TBT < 200 ms mobile; main-thread work < 2 s.

## P03 — 24 MB of source images, nine over 1 MB

- **Severity:** High
- **Confidence:** Verified from disk
- **Evidence (largest):**

| File | Size |
|---|---|
| `public/images/projects/tax-websites/screen-2.png` | **3.9 MB** |
| `public/images/projects/restaurant-pos/screen-2.png` | 2.3 MB |
| `public/images/projects/tax-websites/screen-3.png` | 2.3 MB |
| `public/images/img.png` | 1.9 MB |
| `public/images/professional-img.png` | 1.8 MB |
| `public/images/projects/ecommerce-platform/screen-3.png` | 1.7 MB |
| `public/images/portfolio-img.png` | 1.5 MB |
| `public/images/projects/restaurant-pos/screen-3.png` | 1.2 MB |
| `public/images/projects/ecommerce-platform/screen-4.png` | 1.2 MB |

- **Total:** 24 MB in `public/`, 44 image files, all PNG/WebP — no AVIF.
- **Mitigation already present:** every `<img>` goes through `next/image` (10 files import it, 0 raw `<img>` tags). The optimizer serves resized derivatives — Lighthouse shows the hero portrait at ~28 KB, not 1.5 MB.
- **Residual impact:** build time, cold-cache optimization latency, social scrapers fetching raw covers, repository weight, and any future static export or non-Next consumer.
- **Fix:** Re-encode to AVIF/WebP at 2× display width, target < 200 KB per screenshot. The 3.9 MB file is likely a full-page capture that should be split or downscaled.
- **Validation:** `du -sh public` under ~4 MB; no file over 400 KB; Lighthouse total weight improves.

## P04 — The favicon is the single largest request

- **Severity:** Low
- **Confidence:** Verified
- **Evidence:** Lighthouse network list: `/favicon.ico?favicon.3q1um73driyf-.ico` = **112 KB**, larger than any JS chunk.
- **Impact:** Small but pure waste on every first visit.
- **Fix:** 32×32/48×48 icon; add `apple-touch-icon`.

## P05 — Two large variable font files load on every page

- **Severity:** Low
- **Confidence:** Verified (transfer sizes) / Likely (usage)
- **Evidence:** `GeistMono_Variable` 70 KB and `Geist_Variable` 68 KB are among the top requests. Geist Mono is used for small labels and metadata (`--font-mono` in the `SiteIntro` topline, project indices, etc.), not for body copy.
- **Impact:** ~138 KB of font payload; Mono's full variable range is likely unnecessary.
- **Fix:** Load Geist Mono as a subset or drop it from the root and load it only where used. `next/font` with `display: "swap"` is already correct, so text is not blocked.
- **Validation:** Font bytes on the homepage under ~100 KB total.

## What is genuinely healthy

- **CLS 0.006** on both profiles. Layout stability is excellent; `next/image` with `fill` and declared `sizes` is doing its job.
- **FCP ~1.0 s** — the first paint happens fast; the problem is what is allowed to paint.
- **Server response 60 ms** at the edge with `x-vercel-cache: HIT`.
- **Accessibility and Best Practices both 100**, which is consistent with the source review: labels, focus states, reduced-motion guards, and semantic structure are in place.
- **Total transfer 672 KiB** is not the bottleneck. Image optimization at request time is working.

## Recommended measurement plan (free)

1. Re-run Lighthouse locally for mobile + desktop after each performance change. Keep the JSON.
2. After traffic exists, read **field** LCP/INP/CLS from the Chrome UX Report in Search Console or PageSpeed Insights; lab numbers are only a proxy.
3. Track TBT as the INP proxy until enough real interactions exist to measure INP.
4. Do not claim a performance improvement without a before/after Lighthouse run on the same route and profile.

## Reproduction commands

```bash
# build and inspect prerendered HTML
npm run build

# local Lighthouse against the deployment (Chrome path on this machine)
export CHROME_PATH="/c/Program Files/Google/Chrome/Application/chrome.exe"
npx -y lighthouse https://ubaiddev-eta.vercel.app/ \
  --only-categories=performance,seo,accessibility,best-practices \
  --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  --output=json --output-path=.next/lh-mobile.json --quiet
```

Both reports used in this audit are at `.next/lh-mobile.json` and `.next/lh-desktop.json` (gitignored).
