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

`lib/testimonials.ts` supplies seven stories. Hussnain Akbar, Raees Ali, and Usman
have owner-supplied names and project contexts, with proposed wording visibly
marked “Draft quote.” Three illustrative people and scenarios are marked
“Sample quote.” Finaccont is presented as a “Creator's note” about the owner's
accounting software. Each story retains its attribution and status disclosure.

The first story appears initially. Visitors choose a story through buttons that
show its name, context, and status, with the selected state exposed through
`aria-pressed`. The story region announces changes politely. Desktop places the
story beside the selector; at 760px and below, the story sits above a two-column
selector. Reserved story space reduces layout movement between selections.

## Motion

For Services and Selected work, GSAP ScrollTrigger drives heading and row reveals with scrub values of 0.5–0.7.
Desktop screenshot movement uses scrub values of 0.9–1. Both sections use
`gsap.matchMedia()` and revert their triggers and inline styles on unmount or when
reduced motion is enabled. Mobile scrolling remains native. Content is visible
in server-rendered HTML and without JavaScript.

Skills moves tool labels horizontally from 24px to their resting position with
a scrub value of 0.65, keeping text at full opacity. Testimonials reveals its
heading and rule with scrub values of 0.7 and 0.8. Both use `gsap.matchMedia()`
and revert on unmount or when reduced motion is enabled. Story selection uses
Motion's sequential exit and entrance, with a 0.35-second fade and small vertical
movement. Reduced motion makes story changes immediate and removes link and
selector arrow movement.

The homepage and services metadata describe the expanded offers. Metadata and
service content do not imply guaranteed search rankings or traffic gains.
