# Color token contract

The interface uses ink and warm stone as its base, jade for actions, and brass for selected work annotations and delivered scope. Components should use the semantic runtime tokens in `app/globals.css`, rather than raw palette values or translucent text colors.

| Role | Token | Usage |
| --- | --- | --- |
| Page and card surfaces | `--bg`, `--bg-sub`, `--bg-card` | Main sections and nested panels |
| Text hierarchy | `--fg`, `--fg-sub`, `--fg-muted`, `--fg-faint` | Headings through compact supporting text |
| Jade fill | `--accent`, `--accent-hover` | Buttons, badges, and decorative strokes |
| Text on jade fill | `--accent-text` | Foreground of a filled jade control |
| Jade text on a surface | `--accent-ink` | Links, selected controls, icons, and labels |
| Small jade tags | `--tag-bg`, `--tag-text` | Compact metadata chips |
| Brass annotation | `--brass-ink`, `--brass-image` | Project indices on cards and image scrims |
| Brass outcome | `--brass`, `--brass-soft` | The delivered-scope callout in a case study |

The light theme deepens jade for filled controls. A lighter hover fill looked appealing but lost its boundary against the page. The dark theme keeps the brighter jade. Both themes use dark ink on a solid jade fill. Image overlays use a dark scrim with fixed light text so their readability does not depend on the active theme or the image underneath.

Brass is deliberately secondary: `#8C5A2B` in light mode and `#E6AE69` in dark mode. Light-mode brass text uses a slightly deeper `#805024` so it remains readable on a hovered stone card. The image annotation uses the light brass in both themes because it always sits on a dark scrim. Jade continues to identify links, primary calls to action, and availability.

Representative contrast ratios, calculated against the actual token values:

| Pair | Light | Dark |
| --- | ---: | ---: |
| Main text on page | 17.97:1 | 17.97:1 |
| Muted text on card | 5.69:1 | 6.18:1 |
| Faint text on hovered card | 4.74:1 | 5.06:1 |
| Jade text on card | 6.02:1 | 8.58:1 |
| Text on jade button | 5.46:1 | 10.52:1 |
| Text on hovered jade button | 4.71:1 | 12.98:1 |
| Brass annotation on hovered card | 4.56:1 | 7.94:1 |
| Brass label on outcome callout | 5.80:1 | 8.21:1 |

Use `--accent-ink` for focus outlines and selected states. Never use `--accent` as text on the light theme. Metadata has a 13px minimum through `--type-meta-size`.
