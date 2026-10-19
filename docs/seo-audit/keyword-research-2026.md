# Keyword research and on-page targeting — October 2026

**Prepared:** 19 October 2026
**Scope:** website development, SEO, dashboard/internal-tool development, and AI automation for a solo full-stack developer selling to SMBs and founders.
**Implementation constraint:** no visible copy, layout, or CSS was changed. Everything below was applied through metadata, canonical URLs, structured data, crawl files, and share cards.

> **Evidence standard.** No paid keyword database and no Search Console access were used. Public “2026 keyword” lists often omit geography and dataset date. Any number below is labelled with its source and date, and is treated as a hypothesis to validate — not as measured demand. Where no reliable number exists, this document says so instead of inventing one.

---

## 1. What the current market looks like

| Category | What buyers search | Who owns the results | Where a solo developer can win |
|---|---|---|---|
| Website development | `website development for small business`, `custom website development`, `business website developer`, `ecommerce website development` | Wix/Squarespace/Shopify, agencies, directories, template publishers | Service + outcome + industry phrases, especially where the site must connect to a CRM, booking system, inventory, or back office |
| SEO | `SEO services`, `technical SEO services`, `local SEO services`, `SEO consultant`, `small business SEO` | Large agencies, SaaS tools, comparison publishers | Technical SEO with implementation, audits for existing sites, SEO tied to a rebuild or migration |
| Dashboards / internal tools | `custom dashboard development`, `dashboard development services`, `internal tool development`, `KPI dashboard`, `operations dashboard` | Power BI/Tableau/Looker, Retool, template sites, consultancies | Multi-source dashboards, role-based admin panels, client reporting portals, workflow inside the dashboard |
| AI automation | `AI automation services`, `AI workflow automation`, `AI integration services`, `AI lead follow-up`, `n8n automation` | AI agencies, Zapier/Make/n8n, SaaS vendors | A named workflow with human approval, failure handling, and integration into the tools the client already pays for |

**The practical conclusion:** broad head terms are expensive and vendor-dominated. The winnable demand is *specific work*: “a dashboard that pulls from QuickBooks and Shopify”, “AI follow-up for unsold estimates”, “technical SEO for a Next.js site”. Those are also the queries where a portfolio can prove fit.

---

## 2. Priority keyword clusters mapped to existing URLs

These are the keyword targets now carried by each page’s title, description, keywords, and schema.

| URL | Primary intent | Supporting keyword targets | Proof already visible on the page |
|---|---|---|---|
| `/` | Full-stack developer who can handle the whole build | `full stack developer`, `freelance web developer`, `website development for small business`, `custom dashboard development`, `AI automation services`, `technical SEO` | Five case studies, service overview, process, capabilities |
| `/services` | Compare and scope a service | `web development services`, `website development services`, `custom dashboard development`, `internal tool development`, `AI automation services`, `AI workflow automation`, `SEO services`, `technical SEO`, `SaaS development` | Scope accordions, deliverables, process, budgets, FAQ |
| `/work` | Evaluate capability | `full stack developer portfolio`, `web development case studies`, `dashboard development case study` | Five project cards with categories and stack |
| `/work/ecommerce-platform` | Ecommerce build | `ecommerce platform development`, `custom ecommerce CMS`, `inventory management system`, `order management system` | Storefront, CMS, inventory, orders, analytics, Stripe |
| `/work/school-management` | Education platform | `school management system`, `student information system`, `role-based dashboard`, `education software development` | Four role-based portals, attendance, grades, fees |
| `/work/restaurant-pos` | Hospitality system | `restaurant POS system`, `kitchen display system`, `restaurant management software`, `restaurant revenue dashboard` | POS, kitchen display, menu CMS, revenue reporting |
| `/work/donation-dashboard` | Nonprofit dashboard / messaging | `donor management system`, `donor CRM`, `WhatsApp Business API integration`, `nonprofit dashboard` | Donor CRM, campaign tracking, approved templates, queue |
| `/work/tax-websites` | Professional-services website | `tax firm website design`, `accounting firm website`, `professional services website`, `SEO website development` | Two delivered sites, service pages, contact flow |
| `/about` | Trust and hiring evaluation | `hire full stack developer`, `remote full stack developer`, `Next.js developer`, `AI automation developer` | Location, working style, capabilities, process, project links |
| `/contact` | Start a conversation | `hire full stack developer`, `contact web developer`, `dashboard development enquiry`, `AI automation project` | Direct email/WhatsApp/LinkedIn, project-type and budget fields |

### Keyword cannibalisation rules applied

1. The homepage targets the combined offer and the person. It does not try to out-rank `/services` for every service phrase.
2. `/services` carries the commercial service hub terms. Case studies carry the vertical/project terms.
3. Case studies are not duplicated into service copy; they are linked as evidence.
4. Dashboard terms are attached to the services hub and to dashboard-heavy case studies, not spread across unrelated pages.

---

## 3. The niche wedge this portfolio can actually prove

The strongest evidence on the site is **business systems**, not generic marketing:

| Niche | Evidence on this site | Buyer problem that maps to it |
|---|---|---|
| Ecommerce / retail | Ecommerce platform + CMS | Stock, orders, products, and reporting in separate tools |
| Education | School management system | Attendance, grades, fees, and parent communication across roles |
| Hospitality | Restaurant POS + kitchen display | Orders lost between front of house and kitchen; no item-level reporting |
| Nonprofits | Donation dashboard + WhatsApp queue | Donor records in spreadsheets; bulk messaging through personal accounts |
| Tax / professional services | Two tax firm websites | Unclear service pages and weak enquiry paths |

Adjacent verticals with documented AI adoption or paid AI-service activity — useful for outreach hypotheses, **not** proof of search demand:

- Finance and insurance, and information/professional services, report above-average AI use (US Census Bureau, 26 May 2026).
- Construction, transportation/warehousing, food services, healthcare/social assistance, and real estate show generative AI as the largest share of paid AI-service spending (JPMorgan Chase Institute, 14 April 2026).
- The Federal Reserve’s 3 March 2026 survey reports 46% of surveyed employer firms using AI, with another 15% planning to start within a year. Its sample is a convenience sample and is **not** directly comparable to Census figures.

**Implication:** the next content investment should be one vertical + one deliverable with a working demonstration, not a set of generic “AI agency” pages.

---

## 4. Numbers found, with their caveats

| Claim | Figure | Source and date | How to use it |
|---|---:|---|---|
| `affordable web design` (US) | 880/mo, $9.76 CPC, KD 39 | Semrush US dataset, **27 Apr 2021** | Historical directional evidence only; not 2026 demand |
| `affordable SEO company` (US) | 720/mo, $16.45 CPC, KD 47 | Semrush US dataset, **27 Apr 2021** | Same caveat |
| `business intelligence consultant` | 5,400/mo, $14.25 CPC, KD 55 | Content Redefined, 2026 page; **geography and dataset date undisclosed** | Treat as an unverified estimate |
| `Power BI consultant` | 2,900/mo, $15.85 CPC, KD 48 | Same source and caveat | Unverified estimate; do not build a page around it without validation |
| `Tableau consultant` | 1,600/mo, $14.75 CPC, KD 45 | Same source and caveat | Unverified estimate |
| `AI automation agency` | ~390/mo, +88% YoY | Startup Harbour, 2026; underlying export not available | Growth signal only; unverified volume |
| `AI automation consultant` | ~50/mo, +200% YoY | Same source and caveat | Growth signal only |

**What could not be verified:** current 2026 US/UK volume, CPC, or difficulty for `web design services`, `SEO services`, `custom dashboard development`, `internal tool development`, or most industry-specific dashboard and automation phrases. No figures are presented for those.

**Pricing context (not keyword data):** Power BI Pro is listed at $14/user/month; Databox at $71/month (Analyst); Retool at $10/builder/month plus $5/internal user/month; Make at $9–$29/month; one consultancy estimates a simple Power BI dashboard at $1,000–$2,000 onshore. These show the substitute products a custom build must justify itself against.

---

## 5. What was implemented on the site

| Layer | Implementation |
|---|---|
| Canonical host | Single `SITE_URL` source, driven by `NEXT_PUBLIC_SITE_URL` with a live-host fallback. `ubaid.dev` currently has no A record, so it cannot be canonical yet. |
| Canonicals | Self-referencing `<link rel="canonical">` on all 10 indexable routes, including dynamic case studies |
| Titles | Keyword-led, 48–58 characters, brand suffix on case studies via `title.absolute` |
| Descriptions | 130–152 characters, each naming the service and next step |
| Structured data | `Person`, `WebSite`, `WebPage`, 7 `Service` nodes with deliverables and visible minimum prices, `FAQPage` (5 visible questions), `CollectionPage` + 5-item `ItemList`, 5 `CreativeWork` case studies, `ProfilePage`, `ContactPage` |
| Crawl files | `app/robots.ts` allowing search + AI crawlers and excluding `/api/`; `app/sitemap.ts` with all 10 URLs |
| AI discovery | `/llms.txt` with a factual site summary, services, work, and honest boundaries |
| Social | `summary_large_image` everywhere, explicit 1200×630 fallback image, per-case-study cover images, share copy now names dashboards, SEO, and AI automation |
| Identity | `sameAs` to GitHub and LinkedIn, `brand`, `knowsAbout`, location, contact email |
| Performance | AVIF/WebP image formats enabled in `next.config.ts` |

**Deliberately not changed:** visible headlines, body copy, navigation labels, layout, CSS, animations, and the homepage H1. The “no style and content” constraint was treated as binding.

---

## 6. The honest gap: one commercial URL cannot own four intents

`/services` is now a strong hub, but it is still **one URL for seven offers**. It can rank for the combined “web development / dashboard / SEO / AI automation services” cluster. It will struggle to rank for four separate commercial intents, because each needs its own title, proof, and buying questions.

The highest-leverage next step is four dedicated landing pages, each with the existing design language:

1. `/services/website-development` — small-business website builds, CMS, performance, handover.
2. `/services/dashboard-development` — custom dashboards, internal tools, multi-source reporting, role-based access.
3. `/services/ai-automation` — one named workflow (intake → routing → follow-up → reporting), human approval, failure handling, data boundaries.
4. `/services/seo` — technical SEO, site structure, service-page content, measurement, with the tax-site work as evidence.

Each page should have a distinct H1, a real demonstration or case study, a scope section, a starting price or “quoted by scope”, and one primary CTA. Keep `/services` as the hub and link to the children; do not duplicate the same scope copy across pages.

**Do not** build city pages, “web design in [city]” pages, or programmatic pages for every keyword variant. The site has no local office, local registration, or local case studies, and thin location pages are a credibility and quality risk.

---

## 7. Measurement plan

1. Verify the deployment in Google Search Console and Bing Webmaster Tools.
2. Submit `https://<canonical-host>/sitemap.xml`.
3. Confirm the canonical host selected by Google matches `SITE_URL`.
4. After impressions arrive, filter Search Console by page and query. Look for page-2/page-3 queries — those are the cheapest wins.
5. Check Bing’s AI Performance report (public preview since 10 February 2026) for cited URLs and grounding queries. It reports citation activity, not ranking.
6. Add conversion events for form start, form submit, email click, and WhatsApp click. Without these, rankings cannot be connected to enquiries.

---

## Sources

- Semrush, buyer-keyword dataset — https://www.semrush.com/blog/google-keyword-searches-lowest-highest-competition/ (US data dated 27 April 2021)
- Content Redefined, consulting keyword list — https://contentredefined.ai/seo-keywords-for-consulting/ (2026; dataset date and geography undisclosed)
- Startup Harbour, AI marketing in 2026 — https://www.startupharbour.pl/blog/chatgpt-ai-marketing-small-business-2026 (third-party estimates; underlying export unavailable)
- US Census Bureau, AI use at businesses — https://www.census.gov/library/stories/2026/05/ai-use-businesses.html (26 May 2026)
- Federal Reserve Banks, 2026 Report on Employer Firms — https://www.fedsmallbusiness.org/reports/survey/2026/2026-report-on-employer-firms (3 March 2026)
- JPMorgan Chase Institute, small-business AI use — https://www.jpmorganchase.com/institute/all-topics/business-growth-and-entrepreneurship/understanding-ai-use-by-small-businesses (14 April 2026)
- Google Search Central, AI features — https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central, generative AI guidance — https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, structured data gallery — https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- Google Search Central, canonical URLs — https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Next.js sitemap convention — https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js robots convention — https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Ahrefs, AI Overview citation study — https://ahrefs.com/blog/how-to-rank-in-ai-overviews/ (20 January 2026)
- Bing Webmaster Tools, AI Performance preview — https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/ (10 February 2026)
- SE Ranking, llms.txt study — https://seranking.com/blog/llms-txt/ (15 October 2026)
- Power BI pricing — https://www.microsoft.com/en-us/power-platform/products/power-bi/pricing
- Databox pricing — https://databox.com/pricing
- Retool pricing — https://retool.com/pricing
- Make pricing — https://www.make.com/pricing
