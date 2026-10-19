# Executive summary — portfolio SEO, performance, content and GTM readiness

**Audit date:** 17 October 2026
**Auditor:** Buffy (technical SEO / Next.js / GTM review)
**Repository inspected:** `D:\Personal-Data\portfolio-mine` (git remote `github.com/ubaid215/portfolio-site`, branch `main`)
**Deployment inspected:** https://ubaiddev-eta.vercel.app/ (HTTP 200, Vercel, `x-vercel-cache: HIT`)
**Stated repository path:** `D:\Personal-Data\portfolio` — **does not exist on this machine**. All findings below describe the actual inspected workspace.
**Code changes made during this audit:** none. Two build artifacts (`npm run build`) and Lighthouse JSON reports were written to the gitignored `.next/` directory only.

---

## Verdict

The portfolio is a **well-crafted site that is not yet an acquisition asset**.

| Layer | Score | Basis |
|---|---|---|
| Crawl / index infrastructure | 10/100 | `robots.txt` 404, `sitemap.xml` 404, zero canonicals |
| Structured data | 0/100 | Zero JSON-LD on all 10 routes |
| On-page metadata | 65/100 | Unique titles/descriptions everywhere; broken social origin; title template lost on case studies |
| Performance (lab) | 60/100 | Lighthouse mobile 73, desktop 49; LCP 3.5 s on both |
| Content & proof | 55/100 | Strong, honest case studies; thin `/work`; no niche page; no first-hand HVAC evidence |
| Conversion | 55/100 | Clear form, good validation; no analytics, no spam defence, no qualification |
| GTM readiness | 40/100 | Broad positioning, no target-segment entry page, no offer packaged for outreach |
| **Overall** | **42/100** | Weighted toward the infrastructure layers that currently make the site unreachable |

**Is it ready for a controlled SEO and GTM rollout? No — not yet.**
It becomes ready after six fixes that take roughly one to two working days (actions 1–6 below). It becomes ready for a *single-segment GTM test* once action 7 exists as a real page with real evidence.

---

## The five facts that matter most

1. **The canonical host in code does not serve the site.** `metadataBase` is `https://ubaid.dev`. The domain is live and delegated to Cloudflare with Microsoft 365 MX records (`ubaid-dev.mail.protection.outlook.com`), but it has **no A/AAAA record**: `getent hosts` returns nothing and `curl` fails with "Could not resolve host". The site is deployed at `ubaiddev-eta.vercel.app`.
2. **Every social preview is broken.** The live homepage serves `og:image` and `twitter:image` pointing at `https://ubaid.dev/opengraph-image?...`. Sharing any page on LinkedIn, X, WhatsApp or Slack produces no image.
3. **Search engines are given no map.** `/robots.txt` and `/sitemap.xml` both return 404 from the live deployment.
4. **No page declares its own URL.** 0 of 10 routes emit `<link rel="canonical">`.
5. **Your largest paint is held hostage by an animation.** Lighthouse desktop performance is **49**, with LCP 3.5 s on an unthrottled desktop profile. That is not network cost — the hero is `visibility: hidden` until client JavaScript finishes the intro.

---

## The 10 most important actions

| # | Action | Why it matters commercially | Depends on | Effort |
|---|---|---|---|---|
| 1 | **Fix the public origin.** Either attach `ubaid.dev` to the Vercel project, or set `metadataBase` to the real host and plan a later domain migration. | Every canonical, sitemap entry and share card inherits this. Currently they all point at a host that does not serve the site. | Domain access | 30 min + DNS |
| 2 | **Add `app/robots.ts` and `app/sitemap.ts`.** | Without them Google discovers pages only by luck and has no declared crawl policy. | Action 1 | 45 min |
| 3 | **Emit self-referencing canonicals on all 10 routes.** | Prevents duplicate consolidation, protects against UTM/filter variants, and is a precondition for any migration. | Action 1 | 1 h |
| 4 | **Repair social metadata.** Homepage drops `og:url`; homepage `twitter:card` regressed to `summary`; case-study cards are raw screenshots. | Distribution is how a solo developer gets the first clients. A broken card loses the click at zero cost. | Action 1 | 1–2 h |
| 5 | **Remove the intro gate on the hero.** Reveal content on a CSS timeline, keep the curtain as an overlay, skip it on repeat visits. | LCP 3.5 s → target ≤ 2.5 s. This is the single largest measurable performance win. | None | 2–3 h |
| 6 | **Cut image weight.** 24 MB in `public/`, 9 files over 1 MB, worst 3.9 MB. Convert to AVIF/WebP at 2× display size. | Mobile data cost, build time, and case-study scroll performance. | None | 3–4 h |
| 7 | **Publish one HVAC landing page + one documented lead-follow-up demonstration.** | This is the GTM wedge. Without it, outreach has nowhere specific to send a contractor. | Actions 1–4, plus owner evidence | 2–3 days |
| 8 | **Add truthful JSON-LD: `Person`, `WebSite`, `Service`, `BreadcrumbList`, `ProfilePage` on About.** | Site-name display, entity clarity for AI retrieval, and breadcrumb results. No rich-result promises beyond that. | Action 1 | 2 h |
| 9 | **Instrument the funnel.** GA4 or an equivalent free setup + Search Console + Bing Webmaster, with lead events tied to `response.ok`. | You currently cannot tell a click from an enquiry. Every future decision is guesswork. | Owner accounts | 2–3 h |
| 10 | **Reposition the top of the homepage around one buyer**, keeping the broader portfolio below. | Six offers aimed at three audiences (founders, employers, contractors) gives a visitor no single reason to reply. | Action 7 | 4–6 h |

---

## What is already working (do not rebuild these)

- **One `<h1>` per route, correct heading order, `lang="en"` on all 10 pages**, `noindex` correctly applied to the 404 page.
- **Unique, human-written title and description on every route** — this is better than most portfolios.
- **Every image has an `alt` attribute**; decorative images correctly use `alt=""`.
- **All content is server-prerendered.** The route inventory confirms static output; crawlers see the copy without executing JS.
- **A working generated Open Graph image** (`/opengraph-image`, 1200×630, correct type).
- **The case-study copy is honest.** It separates delivered scope from unverified business outcomes — a real E-E-A-T asset, and rare.
- **Contact form validation is server-side and sane** (length caps, email shape, newline rejection, no credential logging).

---

## The strategic risk that is not technical

The site currently speaks to **three buyers at once**: founders commissioning work, teams hiring a developer, and businesses needing SEO/marketing. Research on the HVAC segment (see `gtm-strategy.md`) found that the plausible wedge for a solo developer is *not* "more leads" — contractors already buy ServiceTitan, Housecall Pro, Jobber, CallRail and agencies. The wedge is **making the existing stack's handoffs work**: website enquiry → their system, missed-call follow-up, unsold-estimate follow-up, and honest reporting from enquiry to booked job.

That wedge requires a page that names the segment and a demonstration that proves the handoff. Neither exists today. Building them is more valuable than any amount of additional generic service copy.

---

## Dependencies and sequencing

```
Domain decision (1)
   ├── robots + sitemap (2)
   ├── canonicals (3)
   ├── social metadata (4)
   └── JSON-LD (8)

Performance (5, 6)  ── independent, start immediately

Owner evidence (HVAC demo, client quotes)
   └── HVAC landing page (7)
          └── homepage repositioning (10)

Accounts (Search Console, Bing, GA4) (9)  ── can start immediately, needed before any traffic push
```

Actions 5, 6 and 9 have no dependency on the domain and can begin today. Actions 1–4 and 8 are a single afternoon once the domain decision is made.

---

## Findings that require external access (not verifiable here)

- Search Console and Bing Webmaster data: indexed pages, queries, impressions, clicks, country, device.
- Whether the contact form actually delivers to the owner's inbox (SMTP credentials status unknown; no test submission was sent).
- Whether `hi@ubaid.dev` is a receiving mailbox.
- Real-user Core Web Vitals (CrUX) — the site's traffic is unknown, so field data may not exist.
- Any existing backlinks or brand mentions.

These are recorded as **unknown**, never as zero.

---

## Limitations of this audit

- **PageSpeed Insights API returned HTTP 429** ("Quota exceeded… limit 0 per day") for anonymous requests. Lighthouse 13.5.0 was therefore run locally against the live deployment instead. Results are **lab** data under simulated throttling, not field data.
- Lighthouse's SEO category scores **100/100** on this site despite the missing `robots.txt`, missing `sitemap.xml` and zero canonicals. That category does not test those three things. Do not read it as an indexability pass.
- Keyword volumes, difficulty and CPC were **not** measured. No keyword tool was used and no numbers are invented. Query hypotheses in `keyword-and-content-map.md` are labelled as hypotheses.
- No external crawl of competitor sites was performed; the competitive picture comes from vendor and forum sources cited in `gtm-strategy.md`.
- The stated repo path `D:\Personal-Data\portfolio` does not exist. If a second copy of this project exists elsewhere, findings must be re-checked against it.

---

## Where to read next

| Question | Document |
|---|---|
| What pages exist and how are they built? | `route-inventory.md` |
| What exactly is broken for crawlers? | `technical-seo-audit.md` |
| Why is the site slow? | `performance-audit.md` |
| What does each page say in search results? | `on-page-seo-audit.md` |
| Can I trust the case studies? | `case-study-trust-audit.md` |
| What should each page target? | `keyword-and-content-map.md` |
| What should I publish? | `blog-and-internal-linking-plan.md` |
| Where do enquiries leak? | `conversion-and-analytics-audit.md` |
| How do I get the first clients? | `gtm-strategy.md` |
| What do I fix first? | `prioritized-implementation-roadmap.md` |
| How do I know it worked? | `measurement-baseline-and-validation.md` |
