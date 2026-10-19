# Keyword intent and content map

**Prepared:** 17 October 2026
**Status:** hypotheses and mapping. **No keyword volume, difficulty, CPC or competitor traffic figures were measured or are claimed anywhere in this document.** No keyword tool was used.

Everything under "Query hypotheses" is a statement about *what a buyer might type and what they would want*, not about how many people type it. Validate before investing in a page.

---

## The structural problem this map solves

The site currently has **10 URLs for 6 services and 3 audiences**:

- One homepage trying to serve founders, hiring teams, and businesses.
- One `/services` page covering websites, SaaS, AI automation, generative AI, SEO and digital marketing as accordions under a single URL.
- No URL that mentions a specific industry, a specific problem, or a specific workflow.

A search engine cannot rank one URL for six unrelated commercial intents, and a buyer cannot tell whether you do *their* thing. The map below assigns one primary intent per URL and marks where new URLs are justified.

---

## Page → intent map

### Existing pages

| URL | Primary intent | Audience | What the page should own | Status |
|---|---|---|---|---|
| `/` | Branded / navigational | Anyone referred by name or by outreach | "Muhammad Ubaidullah", "ubaid.dev", the person behind the work | Keep; do not force it to rank for service queries |
| `/about` | Branded / evaluative | Hiring teams, cautious buyers | Who you are, how you work, where you are, how remote collaboration works | Keep; strengthen with `ProfilePage` schema |
| `/services` | Commercial overview | Buyers who do not yet know which service they need | "full stack developer services", "web and app development services" — the overview, not the specialist queries | Keep as a hub; move detail to child URLs |
| `/work` | Portfolio / proof | Buyers checking capability | "developer portfolio", "full stack developer projects" | Keep; add introductory prose |
| `/work/*` (5) | Portfolio / proof, long-tail specific | Buyers evaluating one capability | "[type] system case study" queries | Keep; add breadcrumbs and service links |
| `/contact` | Navigational | All | — | Keep |

### New URLs that are justified

| Proposed URL | Primary intent | Why a separate URL is justified |
|---|---|---|
| `/services/website-development` | Commercial | "business website developer" is a distinct buying need from "SaaS MVP" and from "AI automation". An accordion cannot rank for it. |
| `/services/saas-development` | Commercial | Distinct scope, distinct evidence (school, donation), distinct budget range ($2,500+). |
| `/services/ai-automation` | Commercial | Distinct buyer question ("can this be automated safely?"), distinct proof requirement (a demonstration). |
| `/services/ecommerce-development` | Commercial | Distinct evidence (the retail platform) and distinct integrations (Stripe, inventory). |
| `/services/hvac-lead-follow-up` | **Commercial — GTM wedge** | The only URL that names the target segment. Justified by the business direction, not by search volume. |

### Deliberately deferred

| Idea | Decision | Trigger to revisit |
|---|---|---|
| Roofing landing page | **Do not build yet** | After 2–3 HVAC conversations produce real language and one delivered or demonstrated workflow. Roofing adds estimating/claims complexity that would weaken a first offer. |
| City pages ("web designer in London") | **Do not build** | You have no office, local registration or local case studies. Thin location pages are a quality risk and a credibility risk. |
| Separate generative-AI page | Defer | Only when there is an original demonstration distinct from the automation page. |
| Arabic / regional pages | Defer | Only with reviewed translation and a maintenance owner. |

---

## Intent language per URL

These are the *questions* each page must answer in its first two screens. They are not keyword lists to sprinkle.

### `/services/website-development`
- "I need a professional website for my business — what does that include, how long, how much?"
- Must answer: scope, pages, CMS, copy responsibility, performance, SEO basics, handover, ongoing cost.
- Evidence: tax firm websites (with the caveat that results are unverified).
- Do **not** let this page drift into ecommerce; that is a separate URL.

### `/services/saas-development`
- "I have an idea for a product / an internal tool — can you build the first version?"
- Must answer: discovery, what an MVP includes, roles and permissions, integrations, timeline, budget basis, ownership.
- Evidence: school management system (four isolated roles), donation dashboard (queued external API).

### `/services/ai-automation`
- "Can AI handle part of my workflow without embarrassing me?"
- Must answer: where automation belongs, where a human must approve, what happens on failure, what data leaves the business, what it costs to run.
- Evidence: **a demonstration only.** There is no delivered LLM client project in `lib/projects.ts`. Say so. The current honesty standard in `PRODUCT.md` must hold.

### `/services/ecommerce-development`
- "Can you connect a storefront to inventory, orders, and a CMS?"
- Must answer: catalog model, variants/SKUs, stock behaviour, payments, reporting, migration from an existing store.
- Evidence: the retail platform.

### `/services/hvac-lead-follow-up` (the wedge)
- "My phone rings, my office misses calls, and I don't know which website leads turned into jobs. Can you fix that?"
- Must answer:
  1. What is measured today (calls, forms, booked jobs) — and what is not.
  2. What "fixed" means: enquiry captured, routed into the system they already use, followed up, reported.
  3. What you actually implement: website enquiry path, missed-call response, estimate follow-up, reporting.
  4. What you will **not** do: replace ServiceTitan/Housecall Pro/Jobber; promise lead volume; manage their ads on day one.
  5. Proof: the demonstration, plus the closest analogues (restaurant order flow, donation queued messaging).
  6. Fit criteria: who this is for (has demand, loses track of it) and who it is not for (fully booked, or no demand at all).
  7. Next step: a short call with a specific agenda.

---

## Where the HVAC hypothesis is strong and weak

**Strong (verified from research):**
- Contractors already buy overlapping tools — ServiceTitan, Housecall Pro, Jobber, CallRail, Podium — so the *category* of spend exists ([Housecall Pro CRM guide](https://www.housecallpro.com/resources/hvac-crm-software/), [Jobber HVAC](https://www.getjobber.com/industries/hvac/), [ServiceTitan Marketing Pro](https://marketplace.servicetitan.com/partner/servicetitan-marketing-pro)).
- Forum evidence shows missed calls, lead quality and follow-up are live concerns — e.g. a contractor describing a caller ringing back within 15 minutes to check the business is still operating ([HVAC-Talk](https://www.hvac-talk.com/threads/missed-a-customer-call.2290105/)), and another saying they *ignored* 12 calls because they were already booked eight days out ([HVAC-Talk](https://www.hvac-talk.com/threads/we-miss-a-call-all-the-times-problem.2291482/)).
- That second thread is important: **not every contractor wants more leads.** Some need qualification and capacity management. A page promising "more leads" disqualifies itself with half the market.

**Weak / unverified:**
- No reliable market-share data showing agencies or SaaS dominate — competition is visible, concentration is not established.
- No representative data on typical marketing spend. An agency guide suggests 7–10% of revenue for small-to-mid HVAC companies ([Hook Agency](https://hookagency.com/blog/hvac-marketing-budget/)); that is guidance, not measurement.
- No verified data on whether owners or marketing managers usually decide. Both company shapes exist.
- **No keyword volume or difficulty data at all.**

**Consequence for the page:** write it to be *true and specific*, not to chase volume. Its job is to make outreach land and to convert a referred contractor, not to win a national query on day one.

---

## Cannibalisation rules

1. **One intent, one URL.** Do not create `/services/ai-automation` and `/services/automation`; redirect the loser.
2. `/services` keeps the overview and links out. It must not repeat the child pages' scope sections verbatim.
3. The HVAC page must not target "website development" generically — it targets *HVAC contractors with a lead-handling problem*. If it starts ranking for generic web design, rewrite rather than celebrate.
4. Case studies stay on `/work/*`; do not duplicate their content onto service pages. Link instead.
5. Every future guide lives on `/insights/*` and links to exactly one service and one proof page.

---

## Validation procedure (zero cost)

Run this before writing the four service pages and the HVAC page.

**1. Manual SERP inspection (30 min per query set)**
- Search the hypothesis in a private window, US/UK locale where possible.
- Record: what kind of page ranks (agency, SaaS, directory, freelancer, forum), whether the results are local, and whether any solo developer ranks.
- Record the date and the exact query. This is *observed results*, not volume.

**2. Google autocomplete and "People also ask"**
- Type the seed phrase and record completions. These reflect real query language, not volume.
- Expand two or three PAA questions per topic. Note which ones you can answer with first-hand experience.

**3. Search Console (after verification)**
- Once the site has impressions, filter by query and page. This replaces every estimate with fact.
- Look for queries where you appear on page 2–3 — those are the cheapest wins.

**4. Customer language (highest value)**
- In the first five contractor conversations, ask: "How would you describe this problem to another contractor?"
- Record their words verbatim (with permission) and use them as headings. This beats any keyword tool for a niche this specific.

**5. Free tooling, if desired**
- Google Keyword Planner requires an Ads account and shows ranges, not exact figures; Bing Webmaster Tools offers a keyword research view once the site is verified. Neither is required to start.

---

## Page priority

| Priority | Page | Rationale |
|---|---|---|
| 1 | `/services/hvac-lead-follow-up` | Directly supports outreach and the stated business direction |
| 2 | `/services/website-development` | Broadest existing demand, strongest adjacent evidence (tax sites) |
| 3 | `/services/saas-development` | Distinct budget tier, good technical evidence |
| 4 | `/services/ai-automation` | High interest, but requires a demonstration first |
| 5 | `/services/ecommerce-development` | Clear evidence, narrower buyer set |

Content volume is deliberately small. Five pages, each answering a real buying question, beats thirty generated pages that answer none.
