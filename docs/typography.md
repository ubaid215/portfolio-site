# Typography contract

The portfolio uses three type voices. Instrument Serif introduces a page or a major closing invitation. Geist carries section headings, project names, controls, and reading copy. Geist Mono is reserved for short metadata such as categories, dates, and section labels.

| Role | CSS class | Use | Scale |
| --- | --- | --- | --- |
| Home display | `type-display` | One homepage statement | `--type-display-size` |
| Page title | `type-page` | Top-level route heading and footer invitation | `--type-page-size` |
| Case title | `type-case-title` | Longer project names | `--type-case-size` |
| Section title | `type-section` | Section headings in Geist Semibold | `--type-section-size` |
| Card title | `type-card-title` | Project and service names | `--type-card-size` |
| Lead | `type-lead` | First explanatory paragraph | `--type-lead-size`, 58ch max |
| Reading text | `type-body` | Descriptions and case narratives | 1rem, 68ch max |
| Metadata | `type-meta` | Short factual labels | 0.8125rem minimum |

The tokens and classes live in `app/globals.css`. Use a role class before adding a one-off size. Let headings wrap naturally; use a manual break only when the editorial composition needs it at both desktop and phone widths. Keep normal copy at 1rem and compact card copy at least 0.875rem. Avoid large italic accent phrases on repeated section headings; the homepage display retains the single accent word. Use `--accent-ink` for readable jade text and icons on theme surfaces; reserve `--accent` for solid fills and decorative details.
