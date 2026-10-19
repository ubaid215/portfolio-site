# Technical SEO audit

**Audited:** 17 October 2026
**Target:** `https://ubaiddev-eta.vercel.app` (live) and the source in `D:\Personal-Data\portfolio-mine`
**Method:** `npm run build` (Next.js 16.4.0 / Turbopack), direct HTTP requests against the deployment, and parsing of the rendered HTML in `.next/server/app/`.

No crawler tool, Search Console account or schema validator was available. Every claim below was reproduced with a direct request or read from source. Items I could not verify are marked **Unverified** rather than assumed.

---

## Scoreboard

| Check | Result | Evidence |
|---|---|---|
| All public routes return 200 | **Pass** | 10/10 routes |
| Unknown routes return 404 status | **Pass** | `/this-page-does-not-exist` → 404, `/work/not-a-real-project` → 404 |
| `robots.txt` | **Fail** | 404 from production |
| `sitemap.xml` | **Fail** | 404 from production |
| Canonical URLs | **Fail** | 0 of 10 routes |
| JSON-LD structured data | **Fail** | 0 of 10 routes |
| Unique titles | **Pass** | 10/10 |
| Unique descriptions | **Pass** | 10/10 |
| Title template applied consistently | **Fail** | Case studies lose brand suffix |
| Open Graph image reachable | **Fail** | Points to `ubaid.dev`, which has no A record |
| Twitter card type | **Partial** | `summary` on homepage, `summary_large_image` elsewhere |
| `lang` attribute | **Pass** | `lang="en"` |
| Single `<h1>` per route | **Pass** | 1 per route |
| Trailing-slash handling | **Pass** | 308 → non-slash |
| HTTP → HTTPS | **Pass** | 308 → HTTPS |
| Duplicate homepage URL | **Fail** | `/index` returns identical HTML with 200 |
| Analytics installed | **Fail** | None in source or HTML |

Lighthouse reports **SEO 100/100**. That number does not test robots, sitemaps or canonicals, so it is not a counter-argument to anything above.

---

## Findings

### T01 — `metadataBase` points at a hostname that does not serve the site

- **Severity:** Critical
- **Confidence:** Verified
- **Evidence:** `app/layout.tsx:26` sets `metadataBase: new URL("https://ubaid.dev")`. The domain is registered and delegated to Cloudflare (`james.ns.cloudflare.com`, `adelaide.ns.cloudflare.com`) and has Microsoft 365 MX records (`ubaid-dev.mail.protection.outlook.com`, preference 0), so **mail can be routed**. It has **no A/AAAA record**: `getent hosts ubaid.dev` returns nothing and `curl https://ubaid.dev` fails with `Could not resolve host`. The live deployment is `https://ubaiddev-eta.vercel.app` (HTTP 200, `Server: Vercel`).
- **Impact:** Every absolute URL derived from metadata — Open Graph images, Twitter images, any future canonical or sitemap entry — points at a host that does not serve the site. This is the root cause of T05.
- **Fix:** Attach `ubaid.dev` to the Vercel project and verify DNS/HTTPS, **or** change `metadataBase` to the production host. Decide the canonical origin once, in one constant, and use it everywhere.
- **Validation:** `curl -sI https://<chosen-host>/` returns 200; the rendered `<meta property="og:image">` uses that host and itself returns 200.

### T02 — `robots.txt` returns 404

- **Severity:** High
- **Confidence:** Verified
- **Evidence:** `GET /robots.txt` → `404`, `content-type: text/html` (the 404 page is served), 37,481 bytes.
- **Impact:** No declared crawl policy, no sitemap reference, no explicit position on AI search crawlers. Google will still crawl, but you lose control and discovery hints.
- **Fix:** Add `app/robots.ts` returning rules for `*` plus explicit `Googlebot`, `Bingbot`, `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, and a `sitemap` absolute URL. Keep `/_next/` and assets crawlable.
- **Validation:** `curl -s https://host/robots.txt` returns `text/plain` 200 containing the sitemap line.

### T03 — `sitemap.xml` returns 404

- **Severity:** High
- **Confidence:** Verified
- **Evidence:** `GET /sitemap.xml` → 404, HTML body.
- **Impact:** Ten canonical URLs exist but none are advertised. New case studies and future service pages depend on internal links alone.
- **Fix:** Add `app/sitemap.ts` emitting the 10 current URLs with absolute origins. Add a real `lastModified` only where a date is meaningful; do not stamp `new Date()` on every request.
- **Validation:** XML parses, every `<loc>` returns 200, and no non-canonical URL appears.

### T04 — No canonical URLs on any route

- **Severity:** High
- **Confidence:** Verified
- **Evidence:** Parsed built HTML for all 11 documents and the live HTML for all 10 routes: zero occurrences of `rel="canonical"`. `metadataBase` alone is not a canonical declaration.
- **Impact:** Duplicate entry points (see T06) have no consolidation signal. Any future UTM campaign, filter parameter or alternate host will compete with the canonical page.
- **Fix:** Add `alternates: { canonical: ... }` through one shared helper so every route composes it the same way.
- **Validation:** Each route's HTML contains exactly one self-referencing canonical matching the requested URL.

### T05 — Open Graph and Twitter images point at a host that does not serve the site

- **Severity:** High
- **Confidence:** Verified
- **Evidence:** Live homepage head contains `og:image = https://ubaid.dev/opengraph-image?ddb0cf26fb88a67c` and `twitter:image` with the same non-serving host, despite correct `og:image:width/height` (1200×630).
- **Impact:** Every share on LinkedIn, X, WhatsApp, Slack or iMessage renders without an image. For a solo developer whose distribution is outreach and social, this removes the visual hook on every link sent.
- **Fix:** Resolved by T01. After changing the origin, re-scrape the URL in each platform's debugger.
- **Validation:** LinkedIn Post Inspector and the X card validator fetch the image successfully.

### T06 — `/index` serves a byte-identical copy of `/` with HTTP 200

- **Severity:** High
- **Confidence:** Verified
- **Evidence:** `curl /index` → 200, 102,208 bytes; `cmp` against `/` → **identical HTML**. `/index.html`, `/about.html`, `/work.html` correctly return 404, so only the root is affected.
- **Impact:** A second indexable URL for the homepage. Without canonicals (T04) Google must guess which to keep.
- **Fix:** Canonicals resolve the ambiguity. Optionally add a permanent redirect from `/index` to `/`.
- **Validation:** `/index` either 308s to `/` or carries `canonical: /`.

### T07 — Homepage drops `og:url` and downgrades `twitter:card`

- **Severity:** Medium
- **Confidence:** Verified
- **Evidence:** `app/page.tsx:15-19` defines `openGraph: { title, description }` and `twitter: { title, description }`. Nested metadata objects replace the parent's, so the root `og:url` and `twitter.card: summary_large_image` are lost **on the homepage only**. Live HTML confirms `twitter:card = summary` and no `og:url`.
- **Impact:** The most-shared page gets the smallest card variant and no canonical URL hint for social aggregators.
- **Fix:** Restate `url` and `card` in the page override, or move the shared fields into the helper so overrides compose instead of replace.
- **Validation:** Homepage HTML contains `twitter:card=summary_large_image` and `og:url`.

### T08 — Case-study titles lose the brand suffix

- **Severity:** Medium
- **Confidence:** Verified
- **Evidence:** Rendered titles are `"E-Commerce Platform + CMS"` (25 chars), `"School Management System"` (24), `"Restaurant POS + CMS"` (20), `"Donation Manager + WhatsApp Bot"` (31), `"Tax Firm Websites (×2)"` (22). Sibling routes correctly render `"About | Muhammad Ubaidullah"`, so the template works elsewhere. The loss occurs under `app/work/layout.tsx`, which declares a plain `title` for its children.
- **Impact:** Weak brand reinforcement in results and tabs; titles are short enough to look like an internal page rather than a portfolio case study.
- **Fix:** Use `title.absolute` with the brand appended in `generateMetadata`, or give the work segment an explicit template.
- **Validation:** Each case-study `<title>` ends with `| Muhammad Ubaidullah` and stays under ~60 characters.

### T09 — No structured data anywhere

- **Severity:** High
- **Confidence:** Verified
- **Evidence:** `application/ld+json` count is 0 in all 11 built documents and all 10 live routes. No `Person`, `WebSite`, `Service`, `BreadcrumbList` or `ProfilePage`.
- **Impact:** No site-name entity, no breadcrumb eligibility, no machine-readable statement of who you are or what you sell for AI retrieval systems. For a personal brand this is the cheapest remaining win.
- **Fix:** Emit `Person` + `WebSite` once in the root, `Service` on `/services`, `BreadcrumbList` on nested routes, `ProfilePage` on `/about` (only because that page is primarily about one person), and `CreativeWork` on case studies. Do **not** add `AggregateRating`, `Review`, or client quotes you cannot attribute.
- **Validation:** Google Rich Results Test parses each type; schema.org validator reports no errors; every field matches visible text.

### T10 — 404 pages inherit unrelated titles

- **Severity:** Low
- **Confidence:** Verified
- **Evidence:** `/this-page-does-not-exist` returns the homepage title; `/work/not-a-real-project` returns `"Selected Work | Muhammad Ubaidullah"`. Both correctly return status 404 and `noindex`.
- **Impact:** Cosmetic in search, confusing in analytics and to anyone who lands there from an old link.
- **Fix:** Add `app/not-found.tsx` with a real heading and a title such as `Page not found`.
- **Validation:** Status stays 404; title and H1 describe the miss; navigation back is obvious.

### T11 — No breadcrumbs

- **Severity:** Medium
- **Confidence:** Verified
- **Evidence:** No breadcrumb UI or `BreadcrumbList` markup on case-study routes; only previous/next project controls.
- **Impact:** Case studies sit two levels deep with no visible path back to context, and no breadcrumb trail in results.
- **Fix:** Add a compact text breadcrumb (`Home / Work / Project`) plus matching JSON-LD. Keep it visually restrained to match the design system.
- **Validation:** Visible trail matches the markup; each link resolves.

### T12 — Case-study social images are raw screenshots

- **Severity:** Medium
- **Confidence:** Verified
- **Evidence:** `generateMetadata` sets `images: [{ url: project.coverImage }]` — e.g. `/images/projects/tax-websites/cover.png` at 358 KB and an unknown aspect ratio. The generated 1200×630 card is not used for these routes.
- **Impact:** Cropped or letterboxed previews on every case-study share, and a slow fetch for social scrapers.
- **Fix:** Either reuse the generated OG route or add per-project 1200×630 cards with title + year.
- **Validation:** Each card returns 200 with declared 1200×630 dimensions.

### T13 — `meta keywords` present

- **Severity:** Low (informational)
- **Confidence:** Verified (source) / documented by Google
- **Evidence:** `app/layout.tsx:35-45` ships nine keywords.
- **Impact:** None — Google has not used this tag for years, and Google's supported-meta-tags documentation lists it as unsupported. It is only noise in the head.
- **Fix:** Remove. Spend the effort on titles and descriptions instead.

### T14 — Favicon is a 112 KB transfer

- **Severity:** Low
- **Confidence:** Verified
- **Evidence:** Lighthouse network list ranks `/favicon.ico?favicon.3q1um73driyf-.ico` as the **largest single request at 112 KB**, ahead of any JS chunk.
- **Impact:** Wasteful on every first visit; disproportionate for a 256×256 icon.
- **Fix:** Ship a 32×32 and 48×48 ICO (or PNG) and an `apple-touch-icon`. Add a `manifest`.
- **Validation:** Icon transfer under ~15 KB; no 404 for `/apple-touch-icon.png`.

### T15 — Testimonial copy is duplicated in the DOM

- **Severity:** Low
- **Confidence:** Verified
- **Evidence:** `"Hussnain Akbar"` occurs **4 times** in the live homepage HTML. The marquee duplicates its pass for seamlessness and marks the repeat `aria-hidden`, which hides it from assistive tech but not from HTML text extraction.
- **Impact:** Repeated sentences on the homepage can dilute snippet selection; it is not cloaking and not a penalty risk.
- **Fix:** Keep the duplicate for visuals, but render the repeated pass from `aria-hidden` decorative markup only after mount, or accept the duplication and rely on canonical/snippet signals.
- **Validation:** Count occurrences in rendered HTML after the change.

### T16 — No `manifest`, no `apple-touch-icon`, no PWA metadata

- **Severity:** Low
- **Confidence:** Verified
- **Evidence:** No `app/manifest.ts`, no icon files beyond `app/favicon.ico`; `public/portrait-favicon.png` (282 KB) and `public/portrait-favicon.ico` (115 KB) exist but are **not referenced**.
- **Impact:** Neutral for ranking, small negative for installability and iOS home-screen presentation.
- **Fix:** Wire the existing square icon as `apple-touch-icon` through `metadata.icons`, and add a minimal manifest.

### T17 — Unused static assets in `public/`

- **Severity:** Low
- **Confidence:** Verified
- **Evidence:** `next.svg`, `vercel.svg`, `window.svg`, `file.svg`, `globe.svg`, `portrait-favicon.*`, `img.png`, `portfolio-img.png` — the last two are referenced only as imported modules, not by URL.
- **Impact:** Deploy weight and confusion, not SEO.
- **Fix:** Remove unreferenced files after checking usage; keep `Ubaidullah_Resume.pdf`.

---

## Crawl-path checks that passed

Recording passes is as important as recording failures, because these should not be "fixed" later.

- **Status codes:** all 10 public routes return 200 with `text/html; charset=utf-8`.
- **404 status:** both missing-page cases return a genuine 404, not a soft 200.
- **Trailing slash:** `/about/`, `/work/`, `/contact/` return 308 to the non-slash form. Consistent.
- **Case sensitivity:** `/About` returns 404. Consistent with a case-sensitive host.
- **HTTP → HTTPS:** returns 308 to HTTPS.
- **Caching:** `x-vercel-cache: HIT`, `x-nextjs-prerender: 1` on the homepage.
- **Security header:** `strict-transport-security: max-age=63072000; includeSubDomains; preload` present.
- **Rendering:** all body copy is present in the static HTML; the site does not require JS to be read.

## AI-crawler posture

No `robots.txt` exists, so there is currently **no explicit policy** for `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `GPTBot` or `ClaudeBot`. Any bot that ignores the missing file can crawl everything public.

Recommendation: when writing `app/robots.ts`, allow **search** crawlers explicitly and make a separate, deliberate decision about **training** crawlers (`GPTBot`, `ClaudeBot`, `Google-Extended`). Record that decision in the file's comment so future-you knows why.

## Validation checklist for this document's fixes

1. `curl -s https://<host>/robots.txt` → 200, `text/plain`, contains `Sitemap:`.
2. `curl -s https://<host>/sitemap.xml` → 200, valid XML, 10 `<loc>` entries, all 200.
3. For each of the 10 routes: exactly one `<link rel="canonical">`, matching the URL.
4. `og:image` host resolves; the image URL returns 200 `image/png`.
5. Homepage: `twitter:card=summary_large_image`, `og:url` present.
6. Case-study titles end with the brand; length ≤ 60.
7. Rich Results Test: `Person`, `WebSite`, `BreadcrumbList` parsed without errors.
8. `/index` no longer produces a duplicate 200 (or is canonicalised).
9. 404 page has its own title and H1.
10. Re-run Lighthouse; confirm the SEO category is still 100 **and** re-check the list above, because that category will not catch regressions here.
