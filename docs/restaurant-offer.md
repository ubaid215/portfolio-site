# Restaurant offer — confirm before outreach

The `/restaurants` page (app/restaurants/page.tsx) presents a proposed offer. Change anything you do not want to commit to before sending traffic to it.

## Why it is shaped this way

- **Three tiers, middle one recommended.** Buyers compare rather than evaluate one price in isolation; the top tier anchors the middle one as the sensible choice.
- **Fixed one-time prices ($1,490 / $2,990 / from $5,900).** Restaurant owners are used to subscriptions with growing per-terminal fees; "one price, you own it" is the contrast.
- **Risk reversal.** 30% / 40% / 30% milestones with the last payment only once it runs in the restaurant, weekly demos, a fix period (30/60/90 days).
- **Free, low-commitment first step.** A 20-minute "workflow check" call instead of "contact me".
- **Recurring revenue for you.** Optional $149/month care plan.

## Promises you are making on the page

- Fixed written quote within two business days of the call
- 30% / 40% / 30% payment schedule
- Client owns code, data and hosting account; no per-terminal licence
- Weekly working demo
- Fix periods of 30 / 60 / 90 days by tier
- $149/month care plan: monitoring, backups, updates, small changes

Change them in `PACKAGES`, `PROMISES`, `STEPS` and `FAQS` in app/restaurants/page.tsx. Matching starting prices also appear in the budget table on app/services/page.tsx.
