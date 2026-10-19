# Route inventory

**Inspected:** 17 October 2026
**Sources:** `app/` tree, `npm run build` output (Next.js 16.4.0, Turbopack), live HTTP responses from `https://ubaiddev-eta.vercel.app`, and rendered HTML in `.next/server/app/`.

Every route below was verified twice: once as a build artifact, once as a live response.

---

## Public routes

| URL | File | Rendering | Primary audience | Job of the page | Metadata source | Live |
|---|---|---|---|---|---|---|
| `/` | `app/page.tsx` | Static (prerendered) | Founders, business owners, hiring teams | Establish identity, show services, route to work/contact | `app/layout.tsx` + page override | 200 |
| `/about` | `app/about/page.tsx` | Static | Hiring teams and buyers checking credibility | Person, approach, process, capabilities | Page `metadata` | 200 |
| `/services` | `app/services/page.tsx` | Static | Business buyers | Explain six offerings, pricing, process, FAQ | `app/services/layout.tsx` | 200 |
| `/work` | `app/work/page.tsx` | Static, client-rendered UI | Buyers evaluating capability | Project gallery with category filters | `app/work/layout.tsx` | 200 |
| `/work/ecommerce-platform` | `app/work/[slug]/page.tsx` | SSG (`generateStaticParams`) | Retail / ecommerce buyers | Case study: storefront, CMS, inventory, orders | `generateMetadata()` | 200 |
| `/work/school-management` | same | SSG | Education buyers | Case study: four-role portal | `generateMetadata()` | 200 |
| `/work/restaurant-pos` | same | SSG | Hospitality buyers | Case study: POS, kitchen display, CMS | `generateMetadata()` | 200 |
| `/work/donation-dashboard` | same | SSG | Nonprofit buyers | Case study: donor CRM + WhatsApp API | `generateMetadata()` | 200 |
| `/work/tax-websites` | same | SSG | Professional-services buyers | Case study: two tax firm sites | `generateMetadata()` | 200 |
| `/contact` | `app/contact/page.tsx` | Static + client form | All buyers | Enquiry form, email, WhatsApp, LinkedIn | `app/contact/layout.tsx` | 200 |

## Non-page routes

| URL | File | Type | Live |
|---|---|---|---|
| `/api/contact` | `app/api/contact/route.ts` | Dynamic POST (Node runtime, nodemailer/Gmail SMTP) | 405 on GET (expected) |
| `/opengraph-image` | `app/opengraph-image.tsx` | Generated PNG, 1200×630 | 200 |
| `/robots.txt` | **does not exist** | — | **404** |
| `/sitemap.xml` | **does not exist** | — | **404** |
| `/this-page-does-not-exist` | Next default `_not-found` | Static 404 | 404 (correct status) |
| `/work/not-a-real-project` | `notFound()` in dynamic route | Rendered 404 | 404 (correct status) |

## Content and linking measurements (rendered HTML)

| Route | Words | Unique internal links | Links to `/services` | Links to `/work` | Links to `/contact` |
|---|---|---|---|---|---|
| `/` | 1541 | 9 | 1 | 5 | 1 |
| `/about` | 960 | 9 | 1 | 4 | 1 |
| `/services` | 1193 | 6 | 1 | 2 | 1 |
| `/work` | 376 | 10 | 1 | 6 | 1 |
| `/work/ecommerce-platform` | 598 | 7 | 1 | 2 | 1 |
| `/work/school-management` | 591 | 8 | 1 | 3 | 1 |
| `/work/restaurant-pos` | 628 | 8 | 1 | 3 | 1 |
| `/work/donation-dashboard` | 560 | 8 | 1 | 3 | 1 |
| `/work/tax-websites` | 586 | 7 | 1 | 2 | 1 |
| `/contact` | 397 | 5 | 1 | 1 | 1 |

**Reading:** every case study links to `/services` exactly once — the global navbar. There is no contextual case-study → service link anywhere. The site's strongest evidence pages do not pass authority or intent to its commercial page.

## Rendering and hydration boundaries

- **22 files declare `"use client"`** (`app/` 3, `components/` 19).
- Every major section of the homepage is a client component wrapped around server-rendered markup (`Hero` is server-rendered; `HeroAtmosphere`, `About`, `Services`, `FeaturedWork`, `Skills`, `Testimonials`, `ContactCTA` are client).
- `/work` is a fully client component, but it still prerenders: all five projects appear in the static HTML, verified by parsing `.next/server/app/work.html`.
- `/work/[slug]` is server-rendered with a client `CaseStudyClient` wrapper. Case-study body copy is present in the HTML.
- `next.config.ts` contains **no redirects, rewrites, headers, or image configuration**. Only `/* config options here */`.

## Metadata implementation map

| Concern | Implemented in | State |
|---|---|---|
| `metadataBase` | `app/layout.tsx:26` | `https://ubaid.dev` — **no A record** (Cloudflare NS; MX → Microsoft 365) |
| Title template | `app/layout.tsx:27-30` | Works for `/about`, `/services`, `/contact`, `/work`; **not applied to `/work/[slug]`** |
| Default description | `app/layout.tsx:32-34` | 161 chars |
| Keywords | `app/layout.tsx:35-45` | Obsolete tag; Google ignores it |
| Open Graph | `app/layout.tsx:46-53` | No `images` key; inherited from file convention |
| Twitter | `app/layout.tsx:54-58` | `summary_large_image` at root; **homepage overrides to `summary`** |
| Canonical | — | **Not implemented on any route** |
| JSON-LD | — | **Not implemented on any route** |
| Sitemap | — | **File absent** |
| Robots | — | **File absent** (only `meta robots` tags) |
| Icons | `app/favicon.ico` | Present, 256×256, **112 KB transfer** |
| Manifest / apple-touch-icon | — | Absent |
| Analytics | — | Absent |

## Navigation structure

- **Navbar:** `Work`, `About`, `Services`, `Contact`, plus a `/contact` CTA and the wordmark linking to `/`.
- **Footer:** the same four page links plus GitHub, LinkedIn, `mailto:hi@ubaid.dev`.
- **No breadcrumbs** on any route, including case studies.
- **No cross-links** between case studies except the previous/next control inside `CaseStudyClient`.

## Routes that do not exist but are implied by content

These are referenced in strategy documents but have no implementation. They are listed so the roadmap does not treat them as existing:

`/insights` (blog), `/services/*` (individual service URLs), `/work/*` industry landing pages, `/privacy` (referenced in the measurement plan), any HVAC page.
