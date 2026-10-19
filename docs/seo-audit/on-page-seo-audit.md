# On-page SEO audit

**Audited:** 17 October 2026
**Method:** parsed metadata, headings, links and alt text from the **prerendered HTML** of all 11 documents in `.next/server/app/`, then cross-checked against the live responses from `https://ubaiddev-eta.vercel.app`.

Character counts below are measured, not estimated.

---

## Metadata: current state

| Route | Title (chars) | Description (chars) | Verdict |
|---|---|---|---|
| `/` | `Muhammad Ubaidullah \| Web, SaaS & AI Development` (48) | 152 | Good; missing `og:url`, card downgraded |
| `/about` | `About \| Muhammad Ubaidullah` (27) | **191** | Description truncated in results |
| `/services` | `Web, AI & Digital Marketing Services \| Muhammad Ubaidullah` (62) | 144 | Title slightly long; no SaaS in title despite a SaaS offer |
| `/work` | `Selected Work \| Muhammad Ubaidullah` (35) | 145 | Good; page is thin (376 words) |
| `/work/ecommerce-platform` | `E-Commerce Platform + CMS` (**25**) | 100 | No brand; description under-filled |
| `/work/school-management` | `School Management System` (**24**) | 105 | No brand |
| `/work/restaurant-pos` | `Restaurant POS + CMS` (**20**) | 129 | No brand; very short |
| `/work/donation-dashboard` | `Donation Manager + WhatsApp Bot` (**31**) | 157 | No brand |
| `/work/tax-websites` | `Tax Firm Websites (×2)` (**22**) | 97 | No brand; description under-filled |
| `/contact` | `Contact \| Muhammad Ubaidullah` (29) | 128 | Good |

**Observation:** every description is unique and written by a human. That is a genuine strength — most portfolios ship one description reused across routes.

**Observation:** the case-study title template failure is systematic, not an oversight on one page. Root cause is documented as **T08** in `technical-seo-audit.md`.

---

## Recommended metadata

Titles are written to survive truncation around 55–60 characters; descriptions target 140–155 characters. None introduces a claim that is not already visible on the page.

### `/`
- **Title:** `Muhammad Ubaidullah — Web, SaaS & AI Developer` (45)
- **Description:** `Independent full stack developer building websites, SaaS products and practical AI workflows. See the work, the process, and how to start a project.` (149)
- **Keep** `og:url` and `twitter:card: summary_large_image` in the override (currently dropped).

### `/about`
- **Title:** `About Muhammad Ubaidullah — Full Stack Developer` (48)
- **Description:** `Independent full stack developer in Faisalabad, working remotely with founders and teams on websites, business systems and AI workflows.` (138)
- **Why:** the current 191-character version spends its first 155 characters on phrasing that will not survive the snippet.

### `/services`
- **Title:** `Web, SaaS & AI Automation Services | Ubaidullah` (48)
- **Description:** `Website and SaaS development, AI automation and digital growth. Scope, process, budget guidance and answers before you start a project.` (135)
- **Why:** "Digital Marketing" in the title currently competes with the service lines you can actually evidence. SaaS is missing from the title despite being a headline offer.

### `/work`
- **Title:** `Selected Work — Websites, SaaS & Business Systems` (48)
- **Description:** `Five delivered projects: an ecommerce platform, a school management system, a restaurant POS, a donation dashboard and two tax firm websites.` (146)
- **Why:** naming the actual projects gives the listing page something to rank for and tells a buyer in one line whether the evidence is relevant.

### Case studies
| Route | Recommended title | Recommended description |
|---|---|---|
| `/work/ecommerce-platform` | `E-Commerce Platform & Custom CMS \| Ubaidullah` (47) | `A retail storefront, inventory workflow, order management and custom CMS built as one connected system.` (105) |
| `/work/school-management` | `School Management System — Four Portals \| Ubaidullah` (52) | `Student, teacher, parent and admin portals sharing attendance, grades and fee workflows, built with role-based access.` (116) |
| `/work/restaurant-pos` | `Restaurant POS & Kitchen Display System \| Ubaidullah` (50) | `Table ordering, a real-time kitchen display, menu CMS and end-of-day revenue reporting in one connected system.` (109) |
| `/work/donation-dashboard` | `Donor CRM & WhatsApp Campaign Dashboard \| Ubaidullah` (50) | `Donor records, campaign tracking, approved Meta templates and queued WhatsApp messaging in a single dashboard.` (112) |
| `/work/tax-websites` | `Tax Firm Websites — Two Client Builds \| Ubaidullah` (49) | `Two responsive tax advisory sites with clearer service pages, contact routes and structured page metadata.` (108) |

Use `title.absolute` in `generateMetadata` to bypass the segment's template rather than fighting it.

### `/contact`
- **Title:** `Contact — Start a Project or Conversation` (41)
- **Description:** keep the current 128-character version; it is specific and readable.

---

## Heading structure

| Route | H1 | H2 count | H3 count | Assessment |
|---|---|---|---|---|
| `/` | `Muhammad Ubaidullah.` | 6 | **33** | Correct order, but the H1 is a name only and 33 H3s dilute topical focus |
| `/about` | `Your ambition. My attention to the details.` | 7 | 10 | Correct, descriptive, well distributed |
| `/services` | `Build what your business needs next.` | 9 | 11 | Correct; section headings are short but meaningful |
| `/work` | `Selected Work.` | 6 | 0 | Correct; every project name is an H2 inside `<article>` |
| `/contact` | `Your next chapter. Let's build it.` | 4 | 3 | Correct |
| each case study | project title | 7 | 6 | Correct; challenge/approach/gallery/delivery are H2s |

**Pass:** exactly one H1 per route and no skipped levels anywhere. This is better than the majority of portfolios and should be preserved.

**Issue (strategic, not technical):** the homepage H1 is the owner's name plus a period. The strongest on-page signal on the most authoritative page contains no service, no audience and no value proposition. The name belongs in the title and the `Person` schema; the H1 could carry the offer. This is a positioning decision, not a checklist fix, and it interacts with the HVAC test — do not change it until the target segment is chosen.

**Note on `aria-label`:** several H1/H2 elements carry an `aria-label` that matches their visible text assembled from spans. That is valid here because the accessible name equals the rendered sentence; it helps screen readers cope with per-letter animation markup. It does **not** hide the text from crawlers.

---

## Images and alt text

- **11 pages, 0 images missing `alt`.**
- Decorative images (hero portrait backdrop, marquee duplicates, decorative arrows) correctly use `alt=""`.
- Case-study screenshots use specific interface descriptions (e.g. "Teacher portal — student overview"), and `docs/case-study-redesign-review.md` records that **11 mislabelled screenshots were corrected** against the original assets. That is a real quality signal: the alt text describes the actual screen.
- **Missing:** no `width`/`height` concerns because `next/image` with `fill` is used behind sized containers; CLS is 0.006, which confirms it.
- **Missing:** no AVIF/WebP re-encode of the source files (see `performance-audit.md` P03).

## Link text

- Nav links are plain and stable: `Work`, `About`, `Services`, `Contact`.
- Case-study cards use `aria-label="View <Project> case study"` while the visible text is the project title — acceptable, because the label adds context rather than replacing it.
- **Weak:** rolling-text links duplicate their label in a second `<span>` (`RollingText`), so the same phrase appears twice inside the anchor. It reads correctly to assistive tech only where the duplicate is `aria-hidden`; where it is not, link text is doubled. Worth auditing per component.
- **Weak:** the animated CTA inside case-study cards ("Explore the case study" / "See how it came together") is inside `aria-hidden="true"`, so the only accessible name is the `aria-label` on the parent link. That is valid, but it means the descriptive CTA text contributes nothing to the link profile.

## Duplicate text in the rendered DOM

- **Testimonials:** `"Hussnain Akbar"` appears **4 times** in the homepage HTML. The marquee renders its pass twice for a seamless loop; the repeat is `aria-hidden` but still present as text. Not cloaking, not a penalty, but it is duplicated body copy on the page that matters most.
- **Rolling links:** each label is rendered twice for the hover animation across the site. Same category, larger scale.
- **No duplicated pages:** apart from `/index` (see T06), no two routes share content.

## Content depth by page

| Route | Words | Assessment |
|---|---|---|
| `/` | 1541 | Strong for a homepage |
| `/services` | 1193 | Strong; covers scope, process, pricing, FAQ |
| `/about` | 960 | Strong |
| case studies | 560–628 | Adequate for a portfolio; short for competitive commercial queries |
| `/contact` | 397 | Appropriate |
| `/work` | **376** | Thin — it is a gallery with no introductory prose |

`/work` is the weakest commercial page relative to its importance: it is the destination of the primary hero CTA and the main proof hub, yet it contains less text than any case study.

## What to change first on-page

1. Fix the case-study titles (T08) — five one-line changes, immediate brand consistency.
2. Trim the About description (191 → ~138).
3. Restate `og:url` and `twitter:card` on the homepage (T07).
4. Add breadcrumbs to case studies (T11) so the trail is visible to readers and machines.
5. Add a short introductory paragraph above the `/work` gallery that names the project types and the problems they solved.
6. Leave the homepage H1 alone until the segment decision is made.
