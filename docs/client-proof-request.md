# Getting real client quotes and results

## Message to send (WhatsApp or email)

> Hi [name], I'm updating my portfolio and would love to include a few words from you about the [project]. Two or three sentences is perfect: what wasn't working before, and what's better now. If you have any number at all (orders no longer missed, hours saved per week, stock checks that went from X to Y), that helps most. I'll send you the exact text before anything is published, and I'll only use your name and business if you're happy with that. Also, do you know anyone else with a similar problem I could help?

## Adding it to the site

1. **Quote:** in `lib/testimonials.ts`, add `quote: "their exact words"` to their entry. The card switches to a quotation automatically. Keep their written approval (a screenshot is fine).
2. **Results:** in `lib/projects.ts`, add `results: [{ value: "0", label: "missed kitchen orders in the first month" }]` to the project. They appear under "What was delivered" on the case study.

Only publish numbers the client gave you. Never estimate them.
