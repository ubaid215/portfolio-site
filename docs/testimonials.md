# Testimonial content

The homepage section is a single marquee line with four stories. Content lives in `lib/testimonials.ts`.

- Hussnain Akbar: owner-supplied name and website/SEO context.
- Raees Ali: owner-supplied name and e-commerce context.
- Usman: owner-supplied name and restaurant context.
- Finaccont: the owner's accounting software, presented as a creator's note.

## Content model

No client has supplied verbatim or approved wording, so the cards are written in
Muhammad's voice about documented work rather than presented as client quotations.
Every project detail is grounded in `lib/projects.ts` (the retail system behind the
e-commerce platform, the POS and kitchen flow behind the restaurant system) or in an
owner-confirmed context. The section makes no revenue, ranking, or traffic claims, and
no client approval, review count, or rating is implied.

Replace a story with a client's own approved wording only when that client has approved
the exact text; keep the attribution to the named person at that point. Do not add
illustrative people, invented companies, or unverified outcomes to fill out the line.

## Marquee behaviour

The section autoplays. One line of four stories drifts left and loops without a seam,
and both edges fade so cards dissolve into the background instead of clipping.

The line repeats its stories so that one pass is always wider than the window, then
renders that pass twice to close the loop. The second pass is `aria-hidden` and its
links are removed from the tab order, so every story is announced once and Tab visits
each link once. A link stays clickable: hovering or focusing the line pauses it, and
motion resumes when the pointer or focus leaves.

Motion is a transform-only CSS animation on a `max-content` track. Speed is measured
from the line width at 45 pixels per second, so the drift keeps its pace when stories
are added or when the card width changes at a breakpoint.

## Reduced motion

`prefers-reduced-motion: reduce` stops the drift entirely: the repeat pass is removed,
the edge fade is dropped, and the line becomes an ordinary horizontally scrollable row.
Reduced motion also removes the hover lift and the link-arrow movement.
