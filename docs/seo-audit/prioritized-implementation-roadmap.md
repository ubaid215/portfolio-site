# Prioritized implementation roadmap

**Prepared:** 17 October 2026
**Ordering principle:** a fix is critical only if it blocks indexing, breaks the primary conversion, or makes a measured claim impossible. Everything else waits.

**Nothing in this roadmap is implemented.** It is a plan for review.

Finding IDs refer to `technical-seo-audit.md` (T##), `performance-audit.md` (P##), `conversion-and-analytics-audit.md` (C##), and the content documents.

---

## Findings register

Every finding, with the required fields. **Evidence, recommended fix, implementation effort, validation procedure, dependencies and confidence** for each ID are in the phase tables below; this register supplies category, affected surface, severity, and the two impact columns.

| ID | Category | Affected URL / component | Severity | Business impact | SEO impact |
|---|---|---|---|---|---|
| T01 | Technical / identity | `app/layout.tsx:26` (`metadataBase`) | Critical | Every share link and any future canonical points at a host that does not serve the site | Absolute metadata URLs are invalid |
| T02 | Crawlability | `/robots.txt` (missing route) | High | No declared crawl policy or sitemap hint | Discovery and AI-crawler control lost |
| T03 | Crawlability | `/sitemap.xml` (missing route) | High | Ten pages are never advertised | Slower discovery of new pages |
| T04 | Indexation | All 10 routes | High | Duplicate entry points are unmanaged | No consolidation signal |
| T05 | Distribution | Root + all routes (`og:image`, `twitter:image`) | High | Every social share renders without an image | Lower CTR from shared links |
| T06 | Duplicate content | `/index` | High | Two URLs for the homepage | Google must guess the canonical |
| T07 | Metadata | `app/page.tsx:15-19` | Medium | Smaller preview card on the most-shared page | Weak social presentation |
| T08 | Metadata | `app/work/[slug]/page.tsx:16` | Medium | Case studies look unbranded in tabs and results | Lower brand reinforcement and CTR |
| T09 | Structured data | Root + all routes | High | No machine-readable identity or offer | No site-name or breadcrumb eligibility; weaker AI retrieval |
| T10 | Error handling | Default `_not-found` | Low | Confusing dead end | None (status is already 404) |
| T11 | Internal linking | All case studies | Medium | No visible path back to context | Authority does not flow to service pages |
| T12 | Distribution | `generateMetadata` OG images | Medium | Cropped or letterboxed previews | Share CTR |
| T13 | Metadata | `app/layout.tsx:35-45` | Low | None | None — Google ignores the tag |
| T14 | Asset weight | `/favicon.ico` | Low | Slower first load | None directly |
| T15 | Content | Testimonial marquee | Low | Repeated copy on the homepage | Possible snippet dilution |
| T16 | Site identity | Manifest / apple-touch-icon (absent) | Low | No home-screen icon | None |
| T17 | Asset hygiene | `public/` unused files | Low | Deploy weight and confusion | None |
| P01 | Performance | `Hero.module.css:337`, `app/layout.tsx:64` | Critical | ~2.5 s before the hero is visible | LCP fails on mobile and desktop |
| P02 | Performance | 22 client components | High | Sluggish interactions on mid-range phones | INP risk (TBT 630 ms) |
| P03 | Performance | `public/images` (24 MB) | High | Slow case-study scroll, data cost | Image LCP and crawl budget |
| P04 | Performance | `/favicon.ico` (112 KB) | Low | Wasted bandwidth | None |
| P05 | Performance | Root font loading | Low | 70 KB unused glyph range | Minor |
| C01 | Measurement | Whole site | Critical | Cannot distinguish a click from an enquiry | Cannot evaluate any SEO work |
| C02 | Security / conversion | `app/api/contact/route.ts` | High | Inbox flooding and Gmail quota exhaustion | None |
| C03 | Measurement | `app/contact/page.tsx` | High | Silent form failures | None |
| C04 | Conversion | `components/home/Hero.tsx:37` | Medium | Warm visitors get an extra step before contact | None |
| C05 | Conversion | Contact form options | Medium | One page serves buyers and recruiters | None |
| C06 | Conversion | Contact methods | Medium | Two round trips to schedule a call | None |
| C07 | Conversion | Contact form fields | Low | Time spent on unqualified enquiries | None |
| C08 | Reliability | `lib/contact-mailer.ts`, displayed address | Critical if broken | Enquiries can vanish with no alert | None |
| G01 | GTM / content | No HVAC URL | High | Outreach has nowhere specific to send a contractor | No relevance for the target segment |
| G02 | GTM / proof | No HVAC demonstration | High | Cannot answer "have you done this before?" | No original evidence for the offer |

---

## P0 — Critical (fix before any traffic push)

| ID | Issue | Evidence | Fix | Effort | Validation | Depends on | Confidence |
|---|---|---|---|---|---|---|---|
| T01 | `metadataBase` is `https://ubaid.dev`, which has no A record; live site is `ubaiddev-eta.vercel.app` | `curl` fails to resolve; live host returns 200 | Attach the domain or change the origin in one constant | 30 min + DNS | Chosen host returns 200; absolute URLs match it | Domain access | Verified |
| T05 | `og:image`/`twitter:image` point at a host that does not serve the site | Live HTML | Resolved by T01, then re-scrape previews | — | LinkedIn/X validators fetch the image | T01 | Verified |
| C08 | Form delivery and the displayed mailbox are unverified (MX exists, delivery untested) | No test sent | Send a real submission; confirm inbox; confirm `hi@ubaid.dev` exists | 30 min | One real message received | Gmail app password | Unverified |
| P01 | Hero is `visibility:hidden` until JS runs; LCP 3.5 s on desktop | LH desktop 49, mobile 73; CSS gate at 3.3 s | Remove the CSS gate; reveal on a ≤400 ms CSS timeline; skip intro on repeat visits | 2–3 h | LCP ≤ 2.5 s mobile; hero visible with JS disabled | None | Verified |

**P0 total: roughly one working day (excluding DNS propagation).**

---

## P1 — High impact (first week)

| ID | Issue | Fix | Effort | Validation | Depends |
|---|---|---|---|---|---|
| T02 | `/robots.txt` 404 | `app/robots.ts` with search-bot allowlist + sitemap | 45 min | 200, `text/plain`, contains `Sitemap:` | T01 |
| T03 | `/sitemap.xml` 404 | `app/sitemap.ts` with 10 canonical URLs | 45 min | Valid XML, all `<loc>` resolve 200 | T01 |
| T04 | No canonicals on 10 routes | Shared metadata helper emitting `alternates.canonical` | 1 h | Exactly one canonical per route, self-referencing | T01 |
| T07 | Homepage drops `og:url`, card downgraded to `summary` | Restate both in the page override or compose via helper | 1 h | `og:url` present, `twitter:card=summary_large_image` | — |
| T08 | Case-study titles lose brand, 20–31 chars | `title.absolute` in `generateMetadata` | 45 min | Five titles include the brand | — |
| T09 | Zero structured data | `Person` + `WebSite` in root, `Service`, `BreadcrumbList`, `ProfilePage`, `CreativeWork` | 2 h | Rich Results Test parses without errors | T01 |
| T06 | `/index` returns identical HTML with 200 | Canonical (T04) and/or 308 to `/` | 15 min | No duplicate 200 | T04 |
| P02 | 22 client components, TBT 630 ms mobile | Return decorative sections to server components; defer GSAP/Lenis | 4–6 h | TBT < 200 ms mobile | — |
| P03 | 24 MB images, 9 files > 1 MB | Re-encode to AVIF/WebP at 2× display size | 3–4 h | `du -sh public` < 4 MB; no file > 400 KB | — |
| C01 | No analytics | Search Console + Bing + GA4 (with privacy notice) or a server-side counter | 2–3 h | Pageview and lead events visible | Owner accounts |
| C03 | Submissions unobservable | Emit `contact_start`, `contact_submit_error`, `generate_lead` | 2 h | Test enquiry produces exactly one lead event; 503 produces none | C01 |
| C02 | Contact API has no abuse protection | Honeypot, origin check, per-IP throttle | 1.5 h | Burst throttled; honeypot submission rejected | — |

**P1 total: roughly 2–3 working days.**

---

## P2 — Content architecture, proof and conversion (days 8–30)

| ID | Issue | Fix | Effort | Validation |
|---|---|---|---|---|
| T11 | No breadcrumbs | Visible trail + `BreadcrumbList` on nested routes | 1.5 h | Trail matches markup; links resolve |
| T12 | Case-study OG images are raw screenshots | Per-project 1200×630 cards | 2 h | Cards return 200 at 1200×630 |
| P04/T14 | 112 KB favicon | 32/48 px icon + `apple-touch-icon` + manifest | 1 h | Icon < 15 KB, no 404s |
| — | `/work` is 376 words | Add 150–250 words of introductory prose naming project types and problems | 1 h | Page > 500 words |
| — | Case studies link to `/services` only via navbar | Add one contextual service link per study | 1 h | Each study has ≥1 in-body service link |
| — | Four service URLs missing | Publish `/services/{website,saas,ai,ecommerce}-development` | 2–3 days | Each has unique scope, evidence, FAQ, CTA, canonical |
| **G01** | **No HVAC entry page** | Publish `/services/hvac-lead-follow-up` | 1 day | Page answers the seven questions in `keyword-and-content-map.md` |
| **G02** | **No HVAC evidence** | Build and document an enquiry → CRM demonstration with human approval and a failure path | 2 days | Demo runs; screenshots captured; limitations stated |
| C04 | Hero primary CTA avoids conversion | Invert CTA order on the HVAC page only; leave the homepage alone | 30 min | Primary CTA reaches the form or booking link |
| C06 | No booking path | One scheduling link | 30 min | Works on mobile |
| C07 | Thin qualification | Add optional website URL + "what happens today when someone enquires?" | 1 h | Fields validate; no PII in analytics |
| C05 | Mixed audiences on one CTA | Preselect service from the HVAC page; reorder options | 1 h | Query param validated against the allowlist |
| — | Testimonials look like quotes but are not | Obtain client-approved wording, or relabel the section honestly | Owner outreach | Published text is approved and attributed |
| — | Tax case study claims "structured data markup" | Confirm the client sites ship JSON-LD, or remove the claim | 30 min | Claim matches evidence |

**P2 total: roughly 8–10 working days, dominated by the HVAC page and demonstration.**

---

## P3 — Optional polish (days 31–90)

| ID | Issue | Fix | Effort |
|---|---|---|---|
| T13 | Obsolete `meta keywords` | Remove | 5 min |
| T15 | Testimonial text duplicated 4× in DOM | Render the repeated marquee pass after mount | 1 h |
| T10 | 404 inherits unrelated titles | `app/not-found.tsx` with its own title and H1 | 45 min |
| T16 | No manifest / apple icon | Add both | 45 min |
| T17 | Unused assets in `public/` | Remove after a usage check | 20 min |
| P05 | Geist Mono loads 70 KB on every page | Subset or scope it | 1 h |
| — | Insights hub | `/insights` + 8 planned articles over 5 months | 6–8 h build, then 3–8 h each |
| — | Roofing page | Defer until HVAC is validated | — |

---

## Phase plan

### Immediate (today)
1. T01 domain decision — **blocks five other fixes**.
2. C08 confirm the form actually delivers mail.
3. P01 remove the hero gate; re-run Lighthouse to confirm the diagnosis.

### First week (days 1–7)
4. T02, T03, T04, T07, T08, T09, T06 — the metadata and crawl layer, in one pass.
5. P03 image re-encode.
6. P02 reduce client JS where it is decorative.
7. C01, C03 analytics and events; C02 abuse protection.

**Week-1 exit:** every route has a canonical, a sitemap exists, robots is served, social previews render, LCP is under 2.5 s, and a test enquiry appears in analytics.

### Days 8–30
8. Four service pages, starting with HVAC.
9. The lead-follow-up demonstration + a 60–90 s recording.
10. Contextual links from all five case studies; breadcrumbs; `/work` prose.
11. Start outreach on day 8 regardless of remaining polish.
12. First client-approved quote, or an honest relabel of the story section.

**Day-30 exit:** a page you can send to a contractor, one demonstration, one measurable enquiry, and the 14-day niche verdict.

### Days 31–90
13. Publish 3–4 insight articles from the schedule.
14. Review Search Console queries; rewrite the pages that earn impressions but not clicks.
15. Decide on roofing with real conversation data.
16. Only then consider a paid analytics tier, a CRM, or any tooling.

---

## Dependency graph

```
T01 (origin)
 ├── T02 robots
 ├── T03 sitemap
 ├── T04 canonicals ── T06 /index
 ├── T05 social images ── T07 homepage OG
 └── T09 JSON-LD

P01, P02, P03  (performance)      independent
C01 → C03      (analytics → events)
C08            (email delivery)    independent, blocking for real enquiries

G02 (demo) → G01 (HVAC page) → C04/C05/C07 → outreach
client quotes → testimonial relabel
```

---

## Definition of done for the technical phase

- [ ] `robots.txt` and `sitemap.xml` return 200 with the production origin.
- [ ] All 10 routes emit exactly one self-referencing canonical.
- [ ] Homepage and all case studies render a working social card from the live host.
- [ ] Case-study titles include the brand and stay under 60 characters.
- [ ] JSON-LD validates with no errors and matches visible content.
- [ ] Lighthouse mobile LCP ≤ 2.5 s; TBT < 200 ms.
- [ ] One real form submission received and one `generate_lead` event recorded.
- [ ] No analytics event contains a name, email, phone or message.
- [ ] `/work/not-a-real-project` still returns 404.

## Effort summary

| Phase | Effort | What it unlocks |
|---|---|---|
| P0 | ~1 day | The site can be found and shared correctly; the LCP stops failing |
| P1 | 2–3 days | Crawlable, indexable, measurable |
| P2 | 8–10 days | Sendable to a contractor; proof-backed offer |
| P3 | optional | Polish and long-tail content |

**Roughly two working weeks of engineering** takes the site from 42/100 to a credible acquisition asset. The GTM test runs in parallel and is the part that produces revenue.
