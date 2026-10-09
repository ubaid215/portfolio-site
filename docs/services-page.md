# Services page

## Direction

Build, Automate, and Grow organize the six existing service offerings. The page uses the established Space Grotesk and Geist sans-serif fonts, ink base, and jade accent. Hero and Build chapter images come from actual project interfaces. Automation and discovery diagrams are labeled as examples.

Server-rendered content stays readable without animation. The homepage Services component is unchanged. The six service IDs remain available as scope accordions for existing homepage links.

## Motion and interaction

- Hero title and image entrances follow the shared first-visit intro. Desktop pointer movement gives the two real interface frames restrained depth.
- At widths of at least 1000 px and heights of at least 650 px, one GSAP ScrollTrigger pins the three service chapters. Scrubbed panel transitions, a progress line, and chapter buttons follow the current chapter.
- Narrow or short screens use a vertical layout, with chapter buttons scrolling to their sections.
- Section headings reveal on scroll; the four-step process line follows scroll progress.
- Native details elements provide keyboard-accessible service scope and FAQs. Existing service hash links open their matching scope details on direct navigation, then restore their landing position after fonts and pin spacing settle.
- Links reuse the 850 ms rolling text and arrow interaction with a 950 ms underline.
- Reduced motion skips GSAP effects and uses ordinary document flow.
- The brand scene uses a viewport-fixed image layer clipped to the section on desktop and mobile. Reduced motion uses an ordinary section background.

## Pricing

The guide preserves the existing estimates: dashboards from $900 (3–7 weeks), booking and operations from $1,200 (4–8 weeks), and SaaS MVPs from $2,500 (6–14 weeks). Website, AI, and digital growth services are quoted by scope. No new price, traffic, revenue, client-count, or result claims were added.

## Verification

Checked the desktop hero, pinned chapter navigation, fixed image scene, scope details, keyboard FAQ expansion, pricing guide, and light theme in the local browser. Phone checks at 390 px and 320 px confirmed no horizontal page overflow and a vertical chapter layout. A fresh `#ai-automation` visit opens the matching details and lands below the navbar after pin initialization. TypeScript and targeted ESLint checks passed. No build command was run.

## Original brand image

- Mode: built-in image generation tool.
- Final asset: `public/images/services/connected-signature.webp`.
- Dimensions: 1672 × 941 px; size: 118206 bytes.
- Converted to WebP at quality 88 without resizing; the original PNG is preserved in the generated-images directory.
- A continuous graphite-titanium U-shaped sculpture with a jade-glass core expresses crafted interfaces, connected workflows, and momentum. It is an original decorative brand metaphor.
- Replacement update used file APIs and direct patches; no terminal, build, or verification commands were run.

### Final generation prompt

Use case: stylized-concept. Asset: a unique 16:9 luxury brand background for ubaid.dev, an independent developer of websites, software, and AI workflows. Create a gallery-quality CGI sculpture called 'The Connected Signature': ONE enormous, continuous folded ribbon of brushed graphite titanium that curves into a broad open U-shaped loop, then twists upward into a precise ascending edge. A narrow translucent jade-glass core is embedded inside the ribbon and carries a quiet light along the complete shape, suggesting information moving through a thoughtfully engineered system. Along one fold the ribbon fans into finely spaced carbon-metal lamellae, then reconnects smoothly into a single solid form: crafted interfaces, connected automation, and momentum expressed through one coherent object. The shape should be sculptural and unmistakable, like an original industrial-design art piece, with beautiful asymmetric negative space, bevels, microtexture, and physical thickness. Floating just above a dark matte mineral surface with a grounded soft shadow; no pedestal. Dark ink-navy environment, restrained electric jade #00D9A6, cool silver edge highlights, subtle reflected green, dramatic grazing studio light. Main sculpture on center-right, spanning approximately 48–88% of the frame; calm very dark left 45% for white website copy. The central-right sculpture must remain recognizable when cropped vertically for a phone. Editorial art direction, confident scale, rich material realism, subdued depth, clean atmosphere. No text, letters rendered as typography, logos, code, screens, dashboards, literal staircase, buildings, cubes, circuitry boards, stock AI robots, brains, particles, glowing orbs, cyberpunk, or watermarks. Opaque background.
