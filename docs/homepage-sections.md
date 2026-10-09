# Homepage sections

The homepage order is Hero → Services → Selected work → About → Skills → Testimonials → Contact.
The hero's scroll link points to services. The slower first-load intro remains separate.

## Services

`lib/services.ts` holds the six offers confirmed by the owner: website development,
SaaS and web applications, AI automation, generative AI, SEO, and digital marketing.
The homepage links to matching anchors on `/services`; that page uses the same
component with fuller descriptions. Existing development packages remain below it.
The contact form accepts the new service categories.

On desktop, the introduction stays in view beside the service list. Each title
reveals a flowing text strip on hover or focus. Descriptions and deliverables are
always visible. Small screens use a normal single-column list without the visual
panel or sticky positioning.

## Selected work

The four existing featured projects use their original screenshots and descriptions.
An alternating 7/5-column composition gives the images more space. Project links
still open their existing case studies. No marketing or AI project outcomes were
invented to illustrate the new services.

## Skills

`lib/technology.ts` supplies four capability rows: Web & digital experience,
SaaS & product engineering, AI & workflow automation, and Data & delivery.
The owner-confirmed OpenAI API, Claude API, LangChain, and n8n appear in the AI
row; Docker appears in Data & delivery. Descriptions connect the tools to the
product's purpose, with tool names presented as static text labels.

Desktop rows pair the description with wrapping tool labels, separated by rules.
The AI row uses the existing muted jade surface and readable jade text tokens.
At 650px and below, each row becomes a single column and the closing invitation
stacks beneath its supporting sentence.

## Testimonials

`lib/testimonials.ts` supplies four stories. Hussnain Akbar, Raees Ali, and Usman
are owner-supplied client names with their project contexts; Finaccont is the
owner's accounting software. Each story is written in the owner's voice about
documented project work rather than attributed to a client, so no unapproved
wording appears as a client quotation and no illustrative people are invented.
See `docs/testimonials.md` for the content model.

One full-bleed marquee line carries the four stories, drifting left and looping
without a seam. Both edges fade so cards dissolve rather than clip. Desktop shows
three cards at a time; phones show one card with a glimpse of the next. Hovering
or focusing the line pauses it, and a story link stays clickable while the rest of
the page keeps its motion. The first card uses jade, the restaurant card uses ink,
and Finaccont includes its real screenshot. See `docs/testimonials.md` for the
marquee and reduced-motion details.

## About and contact

About uses a portrait with a scroll-driven opening mask, gentle image parallax,
and numbered working principles. Its image becomes a shorter full-width frame
on phones. The contact section is a solid jade invitation with large split-line
type and a magnetic circular link. The shared footer omits its duplicate CTA on
the homepage and keeps its navigation and contact details.

## Motion

`SmoothScroll` runs one Lenis instance for the whole site, driven by the GSAP
ticker so ScrollTrigger reads the smoothed position, and same-page hashes scroll to
their target on that same curve while keeping each target's `scroll-margin-top`. It
is skipped entirely under reduced motion, and the mobile menu panel opts out with
`data-lenis-prevent` so it scrolls itself.

`HomeMotion` coordinates the reading progress bar, desktop hero depth, magnetic
links, and project pointer tilt. Each animation uses `gsap.matchMedia()` and
cleans up on unmount or preference changes. The slower first-load intro and
subsequent hero entrance keep their existing timing.

- Services: staggered heading translation, rising content, and active accent rules.
- Work: alternating card lift/scale, image parallax, and pointer tilt on fine pointers.
- About: opening portrait mask, image parallax, and staggered numbered rows.
- Skills: individual tool labels settle into their rows with a small rotation.
- Testimonials: the story line drifts at a constant pixel speed, with a separate hover lift.
- Contact: two headline lines rise into place once on their own timing as the section arrives, and the arrow rotates toward the link destination as you scroll.

The contact headline is a one-shot reveal rather than a scrubbed one, so a stopped
scroll can never leave it half-drawn; every other entrance stays scroll-linked.
ScrollTrigger scrub values range from 0.25 to 1 second. Reading text stays at
full opacity. No page scroll is hijacked or pinned. Reduced motion removes the
new scroll choreography and pointer effects. The
canvas pauses offscreen and in hidden tabs. Content remains available without
JavaScript; the story line becomes a horizontally scrollable row without
JavaScript or reduced motion.

The homepage and services metadata describe the expanded offers. Metadata and
service content do not imply guaranteed search rankings or traffic gains.
