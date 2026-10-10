# Case study surface brief

## Job and audience
Help founders, business owners, and hiring teams understand the business problem, the implementation decisions, and the delivered scope of each of the five existing projects. The user selected detailed business storytelling with supporting visuals. SEO work is deferred.

## Mode and information order
Read mode. Project introduction and role/year/focus, actual interface overview, chapter navigation, challenge, approach, interface gallery, delivery, tools, and the next available project. Sticky desktop navigation supports the reading sequence; mobile uses a compact two-column chapter index in normal flow.

## Visual direction
Extend PRODUCT.md and DESIGN.md. Sans-serif only: Space Grotesk display and Geist body. Use the existing jade accent, semantic light/dark colors, 1600px container, spacious typography, open ruled lists, and contained project screenshots. Avoid nested panels, decorative metrics, fake browser chrome, invented client results, or a new visual identity.

## Motion and interaction
Slow rolling text, arrows, and underline interactions around 950ms. Stagger the hero introduction, use modest scroll reveals, lightly scrub the interface overview, and reveal the delivery sentence continuously from its first letter to its last. Chapter navigation tracks the section in view. Screenshots open in an accessible native dialog with keyboard navigation, close, and original-file access. Content is visible before enhancement; reduced-motion users receive the static experience.

## Content and asset provenance
Use the facts in lib/projects.ts without adding performance claims or changing project scope. All 23 unique raster assets come from the existing owner-provided files under public/images/projects. These screenshots are evidence of the actual work, not generated mockups. No new or generated raster assets were added.

The finish review corrected 11 screenshot labels in lib/projects.ts against the original assets. The same labels supply gallery captions, image alternatives, inspect-button labels, and screenshot-viewer headings. This correction describes the interfaces actually shown; it does not change project scope, story facts, outcomes, or performance claims.

## Verification and boundaries
Keep the server route, metadata, navigation presentation, footer, homepage, and deferred SEO documents intact. The later user-requested navigation fix resets the persistent smooth-scroll controller when the pathname changes; app/layout.tsx declares smooth-scroll behavior for Next.js. New pages open at the top while section anchors retain their behavior.

Do not run a build command. Verify TypeScript and changed-file lint, inspect all five routes, and review the layout on desktop, mobile, and the existing 1270px browser width. Verify themes, chapter navigation, screenshot keyboard controls, and absence of horizontal overflow. Reduced-motion guards were inspected in source; the preference was not live-emulated. Use no more than two batched visual review rounds. Record the final reviewer disposition and evidence in docs/case-study-redesign-review.md and .impeccable/review/case-studies/verification.json.
