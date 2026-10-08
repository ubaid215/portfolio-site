# Typography contract

The portfolio uses a sans-serif pairing. Space Grotesk carries the home identity and statement, page and case titles, and wordmark. Geist carries shared section headings, project names, controls, and reading copy. Geist Mono is reserved for short factual metadata such as categories, dates, and section labels.

| Role | CSS class | Use | Scale |
| --- | --- | --- | --- |
| Home identity | `Hero.module.css` | Portrait composition with first name above oversized surname | 5–10.5rem surname on desktop; 2.8–5.15rem on mobile |
| Home statement | `Hero.module.css` | Supporting offer beside the portrait | 1.6–2.2rem on desktop; 1.4–1.8rem on mobile |
| Page title | `type-page` | Top-level route heading and footer invitation | `--type-page-size` |
| Case title | `type-case-title` | Longer project names | `--type-case-size` |
| Section title | `type-section` | Section headings in Geist Semibold | `--type-section-size` |
| Home services and work | Scoped CSS modules | Feature sections in Space Grotesk | 2.7–5.2rem, with responsive wrapping |
| Home stack and stories | `Skills.module.css`, `Testimonials.module.css` | Section headings in Space Grotesk | 2.5–4.6rem, weight 500, line-height 1.07 |
| Stack area title | `Skills.module.css` | Capability categories in Space Grotesk | 1.35–1.7rem, weight 500, line-height 1.25 |
| Story text | `Testimonials.module.css` | Testimonial drafts, samples, and creator's note in Space Grotesk | 1.5–2.35rem, weight 500, line-height 1.35; 2rem mobile cap |
| Card title | `type-card-title` | Project and service names | `--type-card-size` |
| Lead | `type-lead` | First explanatory paragraph | `--type-lead-size`, 58ch max |
| Reading text | `type-body` | Descriptions and case narratives | 1rem, 68ch max |
| Metadata | `type-meta` | Short factual labels | 0.8125rem minimum |

The tokens and classes live in `app/globals.css`. Use a role class before adding a one-off size. Let headings wrap naturally; use a manual break only when the composition needs it at both desktop and phone widths. Keep normal copy at 1rem and compact card copy at least 0.875rem. Display emphasis uses weight, spacing, and color without italic styling. Use `--accent-ink` for readable jade text and icons on theme surfaces; reserve `--accent` for solid fills and decorative details.

The hero uses a scoped display scale to match the portrait references. Its name, offer, supporting paragraph, and primary action have distinct roles. On mobile the name follows the portrait, with the offer and actions underneath. The entrance starts after the site intro; reduced motion shows the composition directly. Pointer movement shifts the portrait and name by a few pixels, and link feedback uses rolling labels, arrow movement, and an extending underline.

Skills and Testimonials continue the scoped display treatment used by the homepage feature sections. Their explanatory copy stays at 1rem in Geist. Tool labels use 0.9375rem; story statuses, selector context, and attribution details use 0.8125rem. Disclosures use 0.875rem and remain distinct from the larger story text.
