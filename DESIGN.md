---
name: ubaid.dev
description: The established visual system for Muhammad Ubaidullah's portfolio.
colors:
  ink: "#0A0E1A"
  ink-surface: "#111827"
  ink-card: "#1C2333"
  warm-stone: "#F8F7F4"
  stone-surface: "#EEECEA"
  stone-card: "#E3DFD7"
  jade-fill-dark: "#00D9A6"
  jade-hover-dark: "#00F0B8"
  jade-fill-light: "#009B76"
  jade-hover-light: "#008F6B"
  jade-ink-light: "#005C49"
  text-secondary-dark: "#C9C5BC"
  text-secondary-light: "#1F2937"
  text-muted-dark: "#9CA3AF"
  text-muted-light: "#4B5563"
  brass-light: "#8C5A2B"
  brass-dark: "#E6AE69"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3rem, 5.7vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.7vw, 3.8rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  small: "0.5rem"
  inline: "1rem"
  group: "1.5rem"
  block: "2rem"
  section: "7rem"
components:
  button-primary-dark:
    backgroundColor: "{colors.jade-fill-dark}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0.9rem 1.4rem"
  button-primary-light:
    backgroundColor: "{colors.jade-fill-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0.9rem 1.4rem"
  text-link:
    typography: "{typography.label}"
    height: "44px"
  input-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.warm-stone}"
    rounded: "{rounded.md}"
    padding: "0.9rem 1rem"
  form-panel-dark:
    backgroundColor: "{colors.ink-surface}"
    textColor: "{colors.warm-stone}"
    rounded: "{rounded.xl}"
    padding: "clamp(1.5rem, 3.1vw, 3rem)"
---

# Design System: ubaid.dev

## Overview

**Creative North Star: "Your goals shape what I build."**

Clear language and large sans-serif type lead the portfolio. Jade identifies actions and personal availability; ink and warm stone provide the two theme grounds. Generous section spacing gives the work and the visitor's next action room to stand out.

Motion follows the reading order and makes controls feel responsive. The interface combines thin dividers, defined surfaces, and rolling text links. The owner's explicit font preference is binding: use sans-serif combinations throughout.

**Key Characteristics:**

- Space Grotesk display with Geist body text.
- Jade actions on ink or warm stone surfaces.
- Spacious layouts, clear hierarchy and direct invitations.
- Slow rolling links, restrained arrow motion and scroll reveals.

## Colors

Runtime semantic variables in app/globals.css govern the rendered themes. Jade is brighter on dark surfaces and deeper on light surfaces. Brass remains a secondary annotation color in selected work.

**The Semantic Theme Rule.** Use `--bg`, `--bg-sub`, `--fg`, and their related semantic variables in components. Use `--accent-ink` for jade text and focus, `--accent` for fills, and `--accent-text` for text on those fills.

Main text uses warm stone on ink and ink on stone. Secondary and muted text use the corresponding theme-specific values in the frontmatter. Borders are translucent foreground colors; keep their exact runtime variables rather than substituting palette hexes.

## Typography

Space Grotesk is the display face; Geist is the body and interface face. Geist Mono is available for code and data. The frontmatter records the verified contact display/headline treatment and the reused body/label roles, rather than normalizing older headings.

Display weight is medium, headings have tight line heights, and body copy is more open. Short hero copy uses approximately 39–48 characters per line on the current editorial pages. Form inputs use 16px text; supporting metadata has the existing 13px minimum.

**The Sans-Serif Rule.** Keep the owner's sans-serif preference across headings, body text, controls and email templates.

## Layout

About, Services and Contact share a container capped at 1600px with horizontal padding of `clamp(1.5rem,5vw,5rem)`. Their desktop compositions use unequal columns and generous gaps. On Contact, the two-column enquiry layout collapses at 760px and prioritizes the form above direct contact details.

Separate major sections generously while keeping labels, fields and supporting hints close together. Existing page-specific breakpoints remain local; the sidecar records the global breakpoint scale and the contact adaptations.

## Elevation & Depth

The contact surface uses tonal layering and a thin boundary for depth. It has no panel shadow. Existing navigation and media previews use soft, offset shadows where a surface floats over other content. Preserve those purposeful roles; zero-offset colored glow declarations are not a default elevation rule.

## Shapes

Controls and defined surfaces use gentle corners from the existing radius scale. Primary navigation actions are pill-shaped. Contact inputs and submit controls use the medium radius; the form panel uses the larger surface radius. Thin vector linework can carry brand motion without raster imagery.

## Components

**Buttons:** jade fill with ink text, meaningful labels and a visible focus outline. Primary navigation actions are pills; the contact submit is a full-width gently rounded control. Disabled submission shows a sending state.

**Text links:** rolling two-line text and a thin jade underline animate over approximately 850ms. Arrow movement follows the same interaction on keyboard focus. Reduced motion removes the rolling movement.

**Inputs:** visible labels, semantic page background, thin strong border and medium corners. Focus uses a jade outline with an offset. Errors preserve the visitor's values and provide recovery. Autofill and appropriate native input types remain available.

**Chips and choices:** semantic jade selected state, defined boundary, clear labels, and at least 44px contact choice height. Selection feedback uses transform/opacity without changing dimensions.

**Panels:** a distinct theme surface with one thin boundary. Contact padding scales with viewport size. Avoid stacking containers without a separate content purpose.

**Navigation:** transparent at the top, with a defined floating surface after scrolling. Rolling labels and bottom lines mirror the established link motion. Mobile uses the existing menu overlay.

## Do's and Don'ts

- **Do** use semantic runtime colors so both themes remain readable.
- **Do** keep visible labels, keyboard focus and reduced-motion alternatives.
- **Do** keep fields stable while visitors type.
- **Do** preserve slow text-flip and arrow interactions across related surfaces.
- **Don't** introduce serif fonts.
- **Don't** invent project results, client quotes or service claims.
- **Don't** promote page-specific imagery or scroll stories into mandatory global patterns.

Observed drift, preserved without repair: static @theme colors differ from runtime theme colors; older About/Services headings use larger scale and tighter tracking; older surfaces contain eyebrows and decorative monospace metadata. These are not new system rules. This capture documents the incumbent identity without changing those pages.
