# Case study and trust audit

**Audited:** 17 October 2026
**Sources:** `lib/projects.ts` (all five records), `lib/testimonials.ts`, rendered case-study HTML, `public/images/projects/` (23 unique raster assets), `PRODUCT.md`, `docs/testimonials.md`, `docs/case-study-redesign-review.md`.

This audit judges **evidence quality**, not design quality. The pages are visually strong and the writing is careful; the question here is what a skeptical buyer — or Google's quality systems — can actually verify.

---

## Portfolio-wide assessment

| Trust signal | State | Notes |
|---|---|---|
| Screenshots of real interfaces | **Strong** | 23 owner-supplied assets; no generated mockups; 11 mislabels already corrected against the source files |
| Problem → approach → outcome narrative | **Strong** | Every case study follows the same structure |
| Role stated | **Strong** | "Solo Full Stack Developer" / "Frontend Developer" on every record |
| Technology listed | **Strong** | Real stacks, not buzzwords (Stripe, Prisma, BullMQ, Meta API) |
| Client names | **Weak** | No project names its client; three names appear only in homepage stories |
| Client quotes | **Absent** | All four testimonial cards are owner-written, in the owner's voice |
| Measurable outcomes | **Absent** | No metric on any case study; the tax case study explicitly says gains are unverified |
| Dates / duration | **Partial** | Year only; no engagement length or delivery window |
| Live URLs | **Absent** | No case study links to a live site |
| Independent third-party proof | **Absent** | No reviews, no directory listings, no press, no GitHub references |

**Verdict:** the case studies are honest but **self-attested**. For a buyer comparing three freelancers, "I built this and here is the interface" is credible; "it improved X" is not present, and correctly so, because it was never measured. The gap is not dishonesty — it is the absence of *anything a buyer can check independently*.

That matters for the HVAC test specifically: a contractor will ask "have you done this for a contractor?" The current answer is "I built a restaurant POS and a donation dashboard", which is adjacent, not equivalent.

---

## Per-project audit

### 1. `/work/ecommerce-platform` — E-Commerce Platform + CMS

| Field | Finding |
|---|---|
| Target customer | Retail business running operations on spreadsheets and WhatsApp |
| Problem stated | Lost orders, messy inventory, no sales visibility, no branded storefront |
| Role | "Solo Full Stack Developer" (2025) |
| Delivered features | Custom CMS (nested categories, variant SKUs, bulk upload), inventory updates, analytics dashboard with CSV export, Stripe checkout |
| Technical decisions | React/Node/MongoDB/Redux/Express, Cloudinary media, JWT auth |
| Evidence available | Cover + 4 screenshots (dashboard, product CMS, storefront, product browsing) |
| Verifiable metrics | **None** |
| Confidentiality | Client unnamed; screenshots show interface only |
| Trust gap | The "before" state (spreadsheets, WhatsApp) is an owner description with no artefact |
| Internal links | Navbar → services only; no contextual link to an ecommerce service page (none exists) |
| CTA | Previous/next project; global contact CTA |

**Risk:** the problem paragraph makes strong claims about the client's prior operations ("Orders were getting lost, inventory was a mess"). Those are plausible and owner-supplied, but if challenged you have no artefact. Recommend confirming with the client that this description is accurate, or soften to "the team was managing orders and stock outside a single system."

### 2. `/work/school-management` — School Management System

| Field | Finding |
|---|---|
| Target customer | Private school network |
| Problem stated | Paper attendance, handwritten fee receipts, no parent visibility, no grade history |
| Role | Solo Full Stack Developer (2026) |
| Delivered features | Four role-isolated portals, attendance with absence notification, fee schedules/overdue alerts, gradebook, PDF report cards |
| Technical decisions | Next.js/NestJS/PostgreSQL/Prisma, WebSocket, Redis, BullMQ, JWT |
| Evidence available | Cover + 4 screenshots |
| Verifiable metrics | **None** — no student count, no adoption figure, no time saved |
| Confidentiality | School unnamed; children's data must never be shown — and is not |
| Trust gap | The most impressive engineering story (role isolation, queue-based notifications) is described in one sentence each |
| Internal links | Navbar only |

**Opportunity:** this is the strongest technical evidence in the portfolio for "business system" work — the closest analogue to a contractor's dispatch/CRM stack. It deserves an explicit bridge: "the same role-and-permission pattern a service business needs when office staff, dispatchers and technicians share one system."

### 3. `/work/restaurant-pos` — Restaurant POS + CMS

| Field | Finding |
|---|---|
| Target customer | Restaurant operator |
| Problem stated | Ordering, kitchen status, menu changes and reporting split across tools |
| Role | Solo Full Stack Developer (2026) |
| Delivered features | Unified data model, WebSocket kitchen display, table floor plan, revenue dashboard |
| Technical decisions | Next.js/Node/MongoDB/Tailwind, WebSocket, Mongoose |
| Evidence available | Cover + 4 screenshots |
| Verifiable metrics | **None** — no service-time reduction, no ticket accuracy, no revenue outcome |
| Trust gap | "Orders lost in transit" and "menu updates required reprinting every week" are unverified prior-state claims |
| Internal links | Navbar only |

**Relevance to HVAC:** real-time status flow (order → kitchen → ready) is structurally the same problem as enquiry → office → technician → job complete. Worth saying out loud on the HVAC page rather than leaving the reader to infer it.

### 4. `/work/donation-dashboard` — Donation Manager + WhatsApp Bot

| Field | Finding |
|---|---|
| Target customer | Donation-collecting organization |
| Problem stated | Personal WhatsApp accounts at ban risk, contacts in spreadsheets, no campaign visibility, manual receipts |
| Role | Solo Full Stack Developer (2026) |
| Delivered features | BullMQ/Redis queue, Meta template management, donor CRM with segmentation, receipt triggers |
| Technical decisions | Official Meta Business API, rate-aware queueing, Mongoose, JWT |
| Evidence available | Cover + 3 screenshots |
| Verifiable metrics | **None** — no delivery rate, no volume, no ban avoided |
| Trust gap | This is the only case study that demonstrates an **external API integration with approval/rate constraints** — highly relevant to HVAC tools (ServiceTitan, Jobber, CallRail APIs) — and it is buried as project 04 |
| Internal links | Navbar only |

### 5. `/work/tax-websites` — Tax Firm Websites (×2)

| Field | Finding |
|---|---|
| Target customer | Two tax advisory firms |
| Problem stated | Unclear service pages, hard-to-find enquiry paths, weak mobile presentation |
| Role | "Frontend Developer" (2025) |
| Delivered features | Service pages, contact routes, responsive layouts, page metadata |
| Technical decisions | Next.js App Router, Tailwind, Framer Motion, Vercel, Resend |
| Evidence available | Cover + 3 screenshots |
| Verifiable metrics | **None**, and the outcome paragraph says so explicitly: "Search and conversion gains need client analytics to verify." |
| Trust gap | **One approach point overclaims:** "SEO-First Architecture — Next.js App Router with server-side rendering. **Structured data markup**, semantic HTML, and optimized metadata for every service page." This audit found **zero structured data** in the portfolio itself; the claim concerns the client sites, which were not inspected. Either confirm the client sites actually ship JSON-LD, or remove "structured data markup". |
| Internal links | Navbar only |

**This is the most commercially important case study for the HVAC offer** — it is the only one about lead-generating websites for local professional services — and it is currently the weakest evidencially, with no live URL and no client-confirmed result.

---

## Testimonials and attribution

`docs/testimonials.md` is unusually careful, and the implementation matches it:

- Four story cards, all **written in the owner's voice**, not presented as client quotations.
- Three named people (Hussnain Akbar, Raees Ali, Usman) with owner-supplied contexts.
- Finaccont is clearly the owner's own product, not an independent review.
- No ratings, no review counts, no `AggregateRating` markup — correct.

**This is the right ethical position and the wrong conversion position.** A buyer scanning the homepage cannot tell whether these are endorsements. The cards sit under a heading that reads like social proof, and the distinction lives only in the documentation.

**Actions, in order of value:**

1. **Ask each of the three clients for two sentences in their own words** and explicit permission to publish with their name. This is a five-minute ask with a disproportionate effect: it converts self-description into third-party evidence.
2. If a client declines, keep the current owner-voice cards but label the section honestly ("How I work, told through projects" rather than anything implying a testimonial).
3. Never add `Review` or `AggregateRating` schema for these. Google's policies require genuine reviews, and fabricated ones are a manual-action risk.
4. Finaccont stays labelled as your product. Do not present it as client work.

---

## Missing proof that would change buying behaviour

| Missing artefact | Why it matters | Effort |
|---|---|---|
| One live URL per client site (where permitted) | Lets a buyer click through; the single strongest trust signal available | 10 min per client, permission required |
| A 60–90 second screen recording of one system in use | Proves the interface is real and functional, not a mockup | 1 h |
| A documented before/after for one workflow (even non-financial: "8 manual steps → 3") | Turns a feature list into an outcome without inventing revenue | 2 h |
| Client-confirmed quote (2 sentences) | Third-party voice | Owner outreach |
| Engagement duration and team shape ("6 weeks, solo, weekly demos") | Answers "can you actually deliver?" | 15 min |

None of these requires a redesign. All of them increase the value of pages that already exist.

---

## Recommended per-case-study edits (no new pages)

1. Add a **"What I'd do differently"** or **"Constraint that shaped this"** line to each study. First-hand reflection is the cheapest E-E-A-T signal available and cannot be copied from a competitor.
2. Add a **contextual link** from each case study to the relevant service section (`/services#build`, `#automate`, or a future `/services/<slug>`). Currently the only link is the navbar.
3. Add the **engagement shape**: duration, solo/team, review cadence. This is verifiable by the owner and answers a real buyer question.
4. Fix the tax-website structured-data claim, or confirm it.
5. For the HVAC test, write **one new case study**, not five: a documented enquiry-to-CRM demonstration with a real input, a real output, a human-approval step, an error path, and its limitations. Label it a demonstration, never a client result.
