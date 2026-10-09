# About page

## Direction and content

The page introduces Muhammad Ubaidullah as a personal development partner, then supports that introduction with documented project work and a clear working process. It uses the existing Space Grotesk and Geist sans-serif fonts and the site's light and dark theme tokens.

- Portrait and location come from the existing About page.
- Commerce, school, and restaurant examples link to `lib/projects.ts` case studies and use their real interface screenshots.
- Finaccont is described as the owner's accounting software, not independent customer feedback.
- OpenAI API, Claude API, LangChain, and n8n are owner-confirmed capabilities.
- Working commitments explain direct communication, priorities, reviews, and handover. No client-count, revenue, ranking, experience-duration, or testimonial claims were added.

## Motion

`components/about/AboutMotion.tsx` owns scoped GSAP matchMedia contexts and reverts them on unmount or motion-preference changes.

- Hero title and portrait entrance follow the shared first-visit intro.
- The statement is centered in a viewport-height stage and pins while its letters paint from muted to foreground text using scrubbed clip paths. Letter reveals run sequentially from the first character to the last, without overlapping, and word wrappers preserve natural line breaks. The completed sentence has a short reading pause before release. Viewports at most 600 px tall use an unpinned reveal; reduced motion skips the reveal and pin. The underlying sentence stays readable and follows theme changes.
- Section headings and selected paragraphs reveal with ScrollTrigger as they enter the viewport.
- Portrait and case-study image parallax run on desktop.
- The process progress line fills with the scroll position; the process introduction stays sticky on desktop.
- The photographic section uses `background-attachment: fixed` on desktop. Phone widths, coarse pointers, and reduced motion use a scrolling background.
- Buttons and case-study links use the requested 850 ms rolling text and arrow interactions.

Server-rendered content remains visible before motion initializes. Reduced motion skips the GSAP animations and CSS entrances.

## Original image

- Mode: built-in image generation tool.
- Final workspace asset: `public/images/about/quiet-studio.webp`.
- Dimensions: 1672 × 941 pixels.
- Size: 136,080 bytes.
- The generated PNG was converted to WebP at quality 88 without changing its dimensions. The original generated output remains in the Codex generated-images directory.
- The image provides decorative atmosphere and is not represented as the owner's actual office.

### Final generation prompt

Create a premium editorial architectural photograph for a full-width fixed background on an independent developer's About page. Photorealistic natural style, landscape 16:9 composition. A quiet contemporary workspace at dusk: a long dark oak desk and a single restrained monitor seen from the side occupy the far right, broad floor-to-ceiling windows, textured charcoal concrete walls, subtle warm natural light grazing the surfaces, thoughtful architectural shadow and tactile real materials. No people. Keep the central and left two-thirds dark and uncluttered with rich detail and negative space, so large white website text will be readable there. Palette is deep ink navy, warm stone, muted wood, very subtle cool teal light from outside; no saturated neon. Understated luxury, plausible architecture, cinematic photography, elegant wide lens composition, crisp realistic texture. Do not include text, watermarks, logos, interface screenshots, fake code, badges, robots, glowing abstract orbs, or branded products. This is decorative atmosphere, not a depiction of the portfolio owner's actual office.
