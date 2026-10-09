# Portfolio SEO and AI Discovery Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` for inline execution. Use `superpowers:subagent-driven-development` only if the owner explicitly chooses delegated execution. Steps use checkbox syntax for tracking.

**Goal:** Make the portfolio discoverable for relevant website, ecommerce, SaaS, and AI automation enquiries from UK/US/Kuwait/UAE business owners and founders, and measure which work leads to qualified conversations and projects.

**Architecture:** Keep the current Next.js App Router site. Add centralized metadata and truthful identity data, generated crawl files, server-rendered service/guide routes, and minimal conversion instrumentation. Reuse existing project/service data and design patterns; preserve current public URLs. External search accounts and client outreach remain owner-controlled activities.

**Tech stack:** Installed Next.js 16.4, React 19, TypeScript, current CSS modules, GSAP/Motion; existing Gmail SMTP contact route. Proposed measurement: GA4 plus Google Search Console and Bing Webmaster Tools. No SEO SaaS or CMS dependency is required initially.

**Spec:** `docs/seo-client-acquisition-strategy.md` (9 October 2026). Product facts and voice: `PRODUCT.md`, `docs/brand-voice.md`.

## Global constraints

- This document is a plan. Do not treat its creation as authorization to deploy, change account settings, send outreach, or publish client quotations.
- No website build command. Verify with focused TypeScript/lint checks, dev-server response/render checks, and production inspections when a deploy is separately authorized. Do not claim production verification from dev results.
- Preserve premium visual direction, sans-serif type, light/dark support, keyboard access, and reduced motion. Optimize animation only to resolve a measured or reproduced problem.
- Read the relevant installed Next.js guides before implementation. Relevant installed guides: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`, `01-app/03-api-reference/03-file-conventions/01-metadata/{sitemap,robots,opengraph-image}.md`, and `01-app/02-guides/json-ld.md`.
- Never fabricate clients, quotes, offices, rankings, traffic, revenue, or AI outcomes. The names and skills in PRODUCT.md define the available evidence.
- Do not expose form content, contact credentials, or client/customer data through analytics, public examples, screenshots, or schema.
- No broad URL migration, thin location pages, mass-generated articles, backlink purchases, or mandatory `llms.txt` work.
- No commit, push, or deployment is included unless subsequently requested.

## Dependency map and scope

Task 1 establishes the correct production identity and delivery. Tasks 2–4 implement and verify the search foundation. Task 5 prepares commercial briefs; Task 6 publishes them. Task 7 establishes original proof; Task 8 publishes guides. Tasks 9–10 support regional discovery and active acquisition. Task 11 audits the release and records results. Some owner research/proof gathering can proceed while technical work is underway.

The first release includes three service pages (website, SaaS, AI automation), followed by ecommerce once its distinct brief is complete. Generative AI, SEO, and digital marketing continue on `/services`; additional standalone pages require their own scope/evidence briefs. Six researched guides are planned over the quarter, not six automatically generated articles at launch.

## Task 1 — Confirm production domain and enquiry delivery (P0, owner + developer)

**Files/interfaces:** inspect `lib/site.ts`, `app/layout.tsx`, `docs/contact-email-setup.md`, hosting/DNS settings, Gmail setup, `/api/contact`; create `docs/seo-baseline.md` for non-secret evidence.

- [ ] Owner confirms the actual production hostname and domain ownership. Record it once in the baseline.
- [ ] Diagnose the failed `ubaid.dev` resolution through DNS/hosting access. If another domain is the intended public site, use that confirmed domain throughout subsequent work.
- [ ] Verify HTTPS, public homepage and deep-page responses, expected redirects, and absence of a login/challenge for public content.
- [ ] Owner completes private Gmail setup using the existing script/guide, configures production server environment variables, and confirms actual owner inbox receipt of a test form submission.
- [ ] Verify `hi@ubaid.dev` is a real receiving mailbox/forwarding route, or use an owner-confirmed functional contact address. SMTP notification routing and public contact email are separate checks.
- [ ] Record available account access, successful delivery evidence, domain, and time of check. Mark uninspected properties as unknown.

**Acceptance:** confirmed production identity; one real form message received in the intended inbox; functional displayed contact address. Domain-dependent publication is deferred if ownership/hostname is unresolved.

## Task 2 — Centralize metadata and canonical policy (P1, developer)

**Create:** `lib/seo.ts`, `public/images/og/portfolio.png`.  
**Modify:** `lib/site.ts`, `app/layout.tsx`, `app/page.tsx`, `app/about/page.tsx`, `app/services/layout.tsx`, `app/work/layout.tsx`, `app/contact/layout.tsx`, `app/work/[slug]/page.tsx`. Modify `next.config.ts` only if a needed redirect is not already implemented by hosting.

- [ ] Add a single confirmed production origin in site configuration; do not derive canonicals from untrusted request host headers.
- [ ] Define a metadata helper that produces a page-specific title, description, canonical, OG URL/title/description/image, and Twitter presentation.
- [ ] Apply it to existing routes and projects without duplicating the title template suffix. Preserve descriptive project metadata.
- [ ] Make each page canonical to its own clean URL. UTM/filter variants resolve consistently without placing them in the sitemap.
- [ ] Account for installed Next.js nested metadata replacement: compose complete relevant Open Graph values rather than relying on deep inheritance.
- [ ] Produce a useful default social card from existing approved brand assets; reuse real project covers for project sharing where suitable.
- [ ] Inspect the confirmed host's HTTP/www behavior; add only needed redirects, preserving path and appropriate query parameters and avoiding loops.
- [ ] Check unknown project/service routes return a genuine 404. Do not add a canonical tag claiming a missing page is the homepage.

**Acceptance:** every existing page has the intended unique title/description, correct canonical, and functioning image URL; social crawlers receive required metadata. `metadataBase` alone is not treated as a canonical declaration.

## Task 3 — Publish sitemap and crawler policy (P1, developer)

**Create:** `app/sitemap.ts`, `app/robots.ts`.  
**Read:** `lib/projects.ts`, `lib/site.ts`; extend sitemap to Task 6/8 data as those pages are published.  
**External interface:** host/CDN/firewall bot rules when present.

- [ ] Generate absolute canonical entries for existing public pages and PROJECTS. Add service/guide entries only when those routes actually exist.
- [ ] Include true modification dates when tracked, otherwise omit them; avoid resetting every content date on every request/deployment.
- [ ] Exclude APIs, previews, unknown slugs, duplicate tracking/filter URLs, and non-public artifacts.
- [ ] Define public search access, sitemap location, and appropriate non-public exclusions. Keep rendering assets accessible.
- [ ] Support search discovery by Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, and PerplexityBot. Preserve any established separate training preference; record an owner decision before adding training-specific blocks or allowances.
- [ ] Ensure specific user-agent groups retain intended exclusions; do not assume they inherit a wildcard group's rules.
- [ ] Inspect real verified bot traffic/CDN policy where available. Use official provider verification information for any exception; retain protections on non-public routes.
- [ ] Check response bodies/content types for `/robots.txt` and `/sitemap.xml`; verify every listed URL resolves to public content. A synthetic user-agent check is only a response test.

**Acceptance:** valid accessible crawl files with the confirmed domain, no sitemap 404s/redirected duplicates, and documented search bot policy. No claim of actual indexing until account inspection supports it.

## Task 4 — Identity, search accounts, and meaningful analytics (P1, owner + developer)

**Create:** `lib/structured-data.ts`, `components/seo/JsonLd.tsx`, `lib/analytics.ts`, `components/analytics/AnalyticsProvider.tsx`, `app/privacy/page.tsx`.  
**Modify:** root layout, About, existing project pages, contact page; add relevant service markup in Task 6.  
**External interfaces:** owner Google Search Console, Bing Webmaster Tools, and proposed GA4 properties.

- [ ] Confirm consistent name, brand, photo, geographic base, and ownership of GitHub/LinkedIn profile URLs.
- [ ] Emit truthful WebSite/Person identity with stable absolute `@id` values. Use ProfilePage on About only if its visible content meets that type's requirements; use Service and BreadcrumbList where appropriate.
- [ ] Serialize safely according to the installed Next.js JSON-LD guide. Do not add AggregateRating or client Review markup to owner-written project stories.
- [ ] Validate supported rich-result types with Google's test and generic schema with the schema validator. A valid Service or Person need not produce a Google rich result.
- [ ] Owner verifies/reuses Search Console and Bing properties; submits the sitemap and inspects homepage plus one service and one project. Check the Search Console generative AI inclusion setting; record the owner's preference.
- [ ] Record baseline search/query/country/page data if any exists. Check AI visibility reports where available; lack of sufficient samples is not recorded as zero performance.
- [ ] Owner sets up the proposed analytics property or selects an existing alternative. Review privacy/consent settings before loading nonessential tracking. Publish a notice describing the actual form and tracking configuration.
- [ ] Add route-change page measurement without duplicate pageviews and safely track service CTA, first form engagement, categorized errors, and contact-method actions.
- [ ] Emit `generate_lead` once only after the existing contact handler confirms `response.ok` and `result.success === true`. Do not count a click or rejected SMTP request as a submitted lead.
- [ ] Send only allowlisted non-personal categories. Verify event URLs/parameters contain no visitor name, email, phone, message, or other private form content. Email-link events must not transmit the mailto address as visitor data.

**Acceptance:** valid identity references; search accounts inspected by owner; test pageviews/actions visible without duplicates; failed submissions produce no lead event. Successful submission means owner SMTP acceptance, with inbox receipt verified separately in Task 1.

## Task 5 — Validate buyer intent and prepare commercial briefs (P1, owner + developer)

**Create:** `docs/seo-service-briefs.md`.  
**Read:** strategy page/query map, `lib/services.ts`, `lib/projects.ts`, existing pricing/process content in `app/services/page.tsx`.

- [ ] Inspect relevant live search results for the proposed service queries and target markets. Record search date/context and buyer intent rather than assuming a keyword tool score means attainable demand.
- [ ] Compare actual search query data when available and ask current contacts how they describe the need. Mark unmeasured volume/competition explicitly as unmeasured.
- [ ] Choose one main intent per service page and a small set of natural related questions. Do not target different synonyms with duplicate pages.
- [ ] Write the website, SaaS, AI automation, and ecommerce briefs: audience/problem, scope, evidence, process, budget basis, FAQ, CTA, title/description, and related URLs.
- [ ] Confirm proposed offers, prices, availability, and project details with the owner where existing records do not establish them. Do not infer an overseas client history.
- [ ] Keep SEO/digital marketing/generative AI in the services overview and specify what new evidence would justify separate pages later.

**Acceptance:** four distinct, evidence-backed briefs and a query-to-page map with no invented demand numbers.

## Task 6 — Publish substantive service pages (P1, developer)

**Create:** `lib/service-pages.ts`, `app/services/[slug]/page.tsx`, `app/services/[slug]/page.module.css`, `components/services/ServicePageMotion.tsx` if the existing motion wrapper cannot safely be reused.  
**Modify:** services overview, `app/sitemap.ts`, relevant homepage/service links, project related-service links, `app/contact/page.tsx` if service preselection is added.

- [ ] Model confirmed briefs in one data source with explicit slugs. Keep `lib/services.ts` as overview data and link entries to the new data without creating two conflicting descriptions.
- [ ] Render readable content on the server and isolate decorative motion in a client wrapper. Reuse the established sans-serif typography, spacing, and existing service interaction patterns.
- [ ] Use awaited route params/static route conventions from the installed version, route metadata, truthful schema, and real 404 handling for missing slugs.
- [ ] Publish website, SaaS, and AI automation pages first; publish ecommerce after its distinct brief is ready. Every page includes scope, proof, remote collaboration, practical answers, and an enquiry CTA.
- [ ] Clearly identify the AI example as a demonstration; link to its documented evidence when Task 7 is complete. Do not imply a delivered client result.
- [ ] Link overview → service → relevant case study → contact, plus case study → related service. Keep navigation understandable; no hidden keyword link blocks.
- [ ] If adding `/contact?service=...`, validate against the existing project-type allowlist, preserve current validation/error behavior, and use `/contact` as the canonical. Verify current Next.js search-param handling before coding it.
- [ ] Add published routes to the sitemap and check mobile/reduced-motion/keyboard/no-JS readability.

**Acceptance:** four distinct commercial pages, correct route metadata/canonicals, original evidence, working enquiry links, no duplicated animated text in the accessible name.

## Task 7 — Strengthen proof and obtain real feedback (P1, owner + developer)

**Modify:** `lib/projects.ts`, `lib/testimonials.ts`, `components/home/Testimonials.tsx` only when approved feedback exists, and `app/work/[slug]/CaseStudyClient.tsx` as needed for clear evidence/links.  
**Create:** `docs/seo-proof-register.md`, `docs/ai-automation-demo.md`; approved screenshots under `public/images/projects/` as needed.

- [ ] Owner validates the actual project role, scope, integrations, and permission to publish screenshots. Record evidence references and allowed public claims in the proof register, without private credentials/customer records.
- [ ] Prioritize ecommerce and tax website case studies, adding useful explanation of specific decisions and deliverables. Add quantified results only with an attributable measurement method, timeframe, and client permission.
- [ ] Document an original n8n/OpenAI-or-Claude enquiry workflow: example data, human approval, failure recovery, and limitations. Treat it as a demo until client delivery is established.
- [ ] Owner asks Hussnain Akbar, Raees Ali, and Usman for honest feedback and publication permission. Preserve the distinction between owner-written stories and actual client quotes.
- [ ] Keep Finaccont clearly identified as the owner's product. Add a detailed public case study only when its scope/evidence is verified; do not count it as an independent client review.
- [ ] Add relevant service/guide links without introducing undocumented performance claims.

**Acceptance:** two strengthened case studies and a reproducible documented AI demonstration; any published testimonial is approved and accurately attributed. Missing client permission defers quotation publication, not the rest of the plan.

## Task 8 — Create a small original insights library (P2, developer + owner)

**Create:** `lib/insights.ts`, `app/insights/page.tsx`, `app/insights/[slug]/page.tsx`, `app/insights/page.module.css`, `app/insights/[slug]/page.module.css`, approved guide assets.  
**Modify:** sitemap, relevant service/project links, footer navigation only if the library merits a permanent link.

- [ ] Use local typed content for the first six briefs in the strategy; add a CMS only if the owner's editing workflow later requires it.
- [ ] Include stable slug, title, description, author reference, meaningful publication/update dates, body, primary references, and related service/project URLs.
- [ ] Write and fact-check each guide using original examples and current primary documentation. Publish two useful initial guides, then the remainder over the quarter as evidence is ready.
- [ ] Give article routes server-readable content, correct metadata/canonicals, truthful Article/breadcrumb markup, and missing-slug 404s.
- [ ] Support comparisons with a balanced recommendation for the actual use case; verify cost/API/platform details at publication time.
- [ ] Link each guide to one relevant service and proof page. Keep core answers readable without opening a motion effect or image.
- [ ] Preserve visible useful FAQs but omit promises of Google FAQ rich results. Do not add bulk AI-generated posts or artificial update dates.

**Acceptance:** initial articles are original, accurate, attributable, and naturally connected to the commercial pages; later briefs remain unpublished until complete.

## Task 9 — Regional trust and external identity (P2, owner with developer support)

**Modify:** About/services/contact copy only for confirmed regional-collaboration details; `lib/structured-data.ts` only for verified identity links.  
**Record:** `docs/seo-baseline.md` and `docs/seo-service-briefs.md`.

- [ ] Owner aligns GitHub/LinkedIn name, offer, website, and real location, and links to relevant public evidence where appropriate.
- [ ] Document remote collaboration for UK/US/Kuwait/UAE buyers: agreed communication/overlap, review cadence, ownership, and handover. Do not promise unsupported hours, currencies, or payment options.
- [ ] Assess any business directory/profile against actual eligibility and relevance. Google Business Profile is conditional on genuine in-person service; do not create foreign addresses.
- [ ] Review region-specific demand after initial enquiry/search data. Create distinct country or Arabic pages only with a separate evidence/content brief and a maintenance owner.

**Acceptance:** public identity is consistent; target-market copy accurately describes remote service; no fictional office/location claims.

## Task 10 — Owner-led acquisition and lead handling (P1 ongoing, owner)

**Artifacts:** create a private lead log outside public source content; maintain non-personal aggregate reports in `docs/seo-progress.md`. No external messages are sent merely by executing this plan.

- [ ] Choose a focused entry offer with defined deliverables and commercial terms; connect it to the relevant service page.
- [ ] Follow the proposed weekly routine: 10 researched prospects, 5 relevant introductions, 2 evidence-based posts, 2 partner conversations, and 1 appropriate existing-contact request. Adjust the load to available time.
- [ ] For each conversation, record source, service, fit, next action, stage, and outcome privately. Distinguish hiring from service buyers and contact clicks from actual enquiries.
- [ ] Follow up within the response time stated on the site; prepare a concrete scope/proposal and next action for qualified buyers.
- [ ] Evaluate where good conversations originate before increasing volume, buying ads, or paying for SEO software.

**Acceptance:** an active and recorded acquisition routine with relevant conversations and follow-ups. Activity counts are commitments to test, not promised clients.

## Task 11 — Release audit and 30/60/90-day review (P1, developer + owner)

**Create/update:** `docs/seo-baseline.md`, `docs/seo-progress.md`; make targeted source corrections only when the checks reproduce a problem.

- [ ] Run `npx tsc --noEmit` and focused ESLint on files actually changed. Do not run a website build command.
- [ ] Inspect all published URLs, sitemap entries, canonical/title/OG values, schema, status codes, and crawlable navigation on the dev server. Test representative project/service/guide pages with normal and relevant crawler user agents; account for metadata streaming rather than disabling it globally without evidence.
- [ ] Check slow loading, JavaScript disabled, reduced motion, keyboard access, and small mobile screens. Primary service/project content must not remain hidden by animation initialization.
- [ ] Inspect actual browser image payloads and production PageSpeed/field data when available; address oversized assets/layout shifts/long interactions with focused changes. Do not claim field performance from a dev audit.
- [ ] Verify analytics once for success and failure flows without sending personal form values, and confirm production owner inbox delivery after a separately authorized deployment.
- [ ] Owner inspects real indexing/crawl/canonical outcomes in search accounts, plus legitimate bot access when logs exist. An allowed bot or submitted sitemap is not recorded as a citation/ranking.
- [ ] At days 30/60/90, compare available baseline and current branded/non-branded queries, pages, countries, enquiries, qualifications, proposals, and wins. Keep missing data explicit.
- [ ] Review Google AI impressions, supported Bing citations, attributable AI referrals, and a small fixed monthly prompt sample separately. Record cited URLs and search-enabled context.
- [ ] Decide the next quarter's service, region, and content priorities using buyer fit and outcome evidence, including whether dedicated SEO/generative AI/digital marketing pages are justified.

**Acceptance:** verified release evidence and an actionable performance review; no guaranteed rankings, AI endorsements, or forecast revenue claims.

## Plan completion criteria

The quarter has a confirmed public identity and delivery path, measurable enquiries, validated crawl/metadata foundations, substantive commercial pages, original proof/content, and a recorded acquisition/review routine. Search growth and paying-client outcomes remain measured results, not presumed consequences of finishing technical tasks.

Primary policy/tool sources and their practical limits are linked beside the relevant claims in `docs/seo-client-acquisition-strategy.md`. Re-check current documentation when executing later, especially crawler policies, search reports, Next.js conventions, and analytics.
