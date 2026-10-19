# Conversion and analytics audit

**Audited:** 17 October 2026
**Sources:** `app/contact/page.tsx`, `app/api/contact/route.ts`, `lib/contact-validation.ts`, `lib/contact-mailer.ts`, `components/home/*`, `components/layout/*`, live HTML, and `docs/contact-email-setup.md`.

No analytics platform, CRM or Search Console account was available. Nothing in this document is a measured conversion rate. **Zero traffic and zero enquiries are recorded as unknown, not as zero.**

---

## The funnel, stage by stage

| Stage | Current implementation | Evidence | Leak |
|---|---|---|---|
| 1. Landing | 10 routes; homepage primary CTA is "Explore my work" → `/work` | `components/home/Hero.tsx:37` | The strongest above-the-fold action sends a ready buyer to a gallery instead of a service or the form |
| 2. Understanding the offer | Six services on one page, three audiences | `app/services/page.tsx` | No single offer a contractor can recognise as theirs |
| 3. Proof | Five case studies with real screenshots | `lib/projects.ts` | No live URLs, no client quotes, no measured outcomes |
| 4. Trust | Owner-voice stories labelled as projects; response time stated (2 business days); timezone shown | `components/home/Testimonials.tsx`, `app/contact/page.tsx` | Stories look like testimonials but are not; no client logos or third-party evidence |
| 5. Contact | Form + email + WhatsApp + LinkedIn + GitHub; copy-email button | `app/contact/page.tsx` | No booking link; no phone; no qualification beyond budget |
| 6. Submission | Client validation → `/api/contact` → server validation → Gmail SMTP → JSON `{success:true}` | `app/api/contact/route.ts` | **No analytics event.** Success is invisible to you unless the email arrives |
| 7. Owner receipt | Gmail SMTP via nodemailer; `hi@ubaid.dev` displayed | `lib/contact-mailer.ts` | **Unverified** — no test submission was sent during this audit and credentials status is unknown |
| 8. Response | "Aim to reply within two business days" | `app/contact/page.tsx:112` | No follow-up system, no reminder, no lead log |

---

## What the contact flow does well

This is better built than most portfolios:

- **Two-layer validation.** Client-side for instant feedback; `lib/contact-validation.ts` re-validates on the server with length caps (name 120, email 254, message 5000), email shape check, and newline rejection on single-line fields.
- **Duplicate-submit prevention.** `submitLock` ref plus disabled `fieldset` during send.
- **Failure recovery.** A 503 returns a message naming the email address, and the error panel contains a `mailto:` fallback with a prefilled subject.
- **Focus management.** `resultRef.current?.focus()` moves focus to the success or error panel, which is announced via `role="status"` / `role="alert"`.
- **Conditional fields.** The budget selector disappears when the enquiry is a hiring conversation, which stops a candidate being asked their project budget.
- **No credentials in logs.** The API logs only an error code, never the visitor's message.
- **Honest success copy.** "Your message has been sent" only renders after `result.success === true`.

That foundation is sound. The problems are around it.

---

## Findings

### C01 — No analytics of any kind

- **Severity:** Critical (for decision-making)
- **Confidence:** Verified
- **Evidence:** No `gtag`, GTM, Vercel Analytics, Plausible, or equivalent in `package.json`, `app/`, `components/` or `lib/`. Nothing loads a tracking script in the live HTML.
- **Impact:** You cannot distinguish a click from an enquiry, cannot see which page or country produced it, and cannot evaluate any SEO or GTM work. Every claim about what is "working" is currently a guess.
- **Fix:** See the measurement setup below.

### C02 — The contact API has no spam or abuse protection

- **Severity:** High
- **Confidence:** Verified from source
- **Evidence:** `app/api/contact/route.ts` accepts any POST, performs no rate limiting, no honeypot check, no origin/Origin-header check, and no captcha. Validation caps field lengths but an attacker can submit valid payloads repeatedly.
- **Impact:** A single script can flood the owner's Gmail, and a compromised inbox is a far worse outcome than a missed lead. It can also burn Gmail's daily send quota, silently breaking the form for real enquiries.
- **Fix (cheapest first):**
  1. Add a hidden honeypot field that must remain empty.
  2. Reject requests whose `Origin`/`Referer` is not the production host.
  3. Add per-IP rate limiting (in-memory is acceptable for a single-instance Vercel function, imperfect but better than none).
  4. Only then consider a captcha.
- **Validation:** A 10-request burst should be throttled; a honeypot-filled submission must return success-shaped but undelivered, or a 400.

### C03 — Form submission is not observable

- **Severity:** High
- **Confidence:** Verified
- **Evidence:** `handleSubmit` sets local React state only. Nothing is emitted on start, failure, or success.
- **Impact:** You cannot know how many people began the form, how many failed validation, or how many submissions the API rejected. If Gmail credentials expire, the form breaks silently and you would not know.
- **Fix:** Emit events (see table) after `response.ok && result.success === true` only.

### C04 — The primary hero CTA does not lead toward conversion

- **Severity:** Medium
- **Confidence:** Verified
- **Evidence:** Homepage hero primary button is "Explore my work" → `/work`; the secondary is "Let's talk" → `/contact`. On `/work`, the closing CTA is far below five project cards.
- **Impact:** For a warm visitor (referral or outreach reply) the site adds a step before the conversation. This is a defensible choice for a portfolio, but it costs conversion for the GTM motion you are about to run.
- **Fix:** For the HVAC landing page, invert it: primary CTA is the call/enquiry, secondary is the demonstration. Keep the portfolio homepage as it is.

### C05 — Mixed audience on the same call to action

- **Severity:** Medium
- **Confidence:** Verified
- **Evidence:** The contact form's first question is "What can I help with?" with ten options mixing services (`Website / Frontend`, `AI Automation`, `SEO`) and `Team / Hiring opportunity`. The hero availability line reads "Open to projects & hiring conversations".
- **Impact:** A contractor evaluating a lead-handling fix sees the same page as a recruiter. That is acceptable for a personal site but weakens the specific offer.
- **Fix:** Keep the hiring option, but let a dedicated HVAC page preselect the service, and surface `Operations System`/`AI Automation` higher in the option order.

### C06 — No booking path

- **Severity:** Medium
- **Confidence:** Verified
- **Evidence:** Contact methods are email, WhatsApp, LinkedIn, GitHub. There is no calendar link.
- **Impact:** Every call requires two round trips (you reply, they reply with a time). For a contractor deciding between three developers, the one with a booking link wins by default.
- **Fix:** Add one scheduling link for a 20-minute call. Confirm it works on mobile before shipping.

### C07 — No qualification before the call

- **Severity:** Low
- **Confidence:** Verified
- **Evidence:** The form collects name, email, service, optional budget band, message.
- **Impact:** You will spend time on enquiries that cannot afford the work or are not ready. Budget is optional and often skipped.
- **Fix:** Two extra fields at most: current website URL (optional) and "what happens today when someone enquires?" — the second is the discovery question that qualifies an HVAC lead by itself.

### C08 — Success depends on an unverified email path

- **Severity:** Critical if misconfigured, unknown if not
- **Confidence:** **Unverified**
- **Evidence:** `lib/contact-mailer.ts` requires Gmail configuration; the API returns 503 when `getGmailConfiguration()` throws. `docs/contact-email-setup.md` exists. No submission was sent during this audit. `ubaid.dev` has Microsoft 365 MX records (`ubaid-dev.mail.protection.outlook.com`), so the domain **can** route mail, but whether `hi@ubaid.dev` is a live mailbox was not verified. The web host itself has no A record.
- **Impact:** If Gmail app-password configuration is missing or expires, every enquiry fails with a 503 — and nothing alerts you. Separately, the displayed address points at a mailbox whose existence has not been confirmed, so a visitor copying it may get a bounce.
- **Fix:** Send one real test submission and confirm receipt. Display an address on a domain that actually receives mail (or the Gmail address) until `ubaid.dev` is live.

---

## Events to instrument

Google Analytics 4 event naming, no personal data anywhere. All parameters must be from a fixed allowlist.

| Event | When | Parameters | Why |
|---|---|---|---|
| `page_view` | Route change (once per navigation) | `page_path`, `page_title` | Baseline |
| `service_cta_click` | Any service or project CTA activated | `page_path`, `cta_location` | Interest, not an enquiry |
| `case_study_view` | A `/work/*` page is viewed | `project_slug` | Which evidence buyers read |
| `contact_start` | First focus/keystroke in the form, once per attempt | `page_path` | Form engagement |
| `contact_submit_error` | Validation or delivery failure | `error_category` (`validation` \| `delivery` \| `network`) | Friction |
| `generate_lead` | `response.ok && result.success === true` | `service_category` | The only true conversion |
| `contact_method_click` | Email, WhatsApp, LinkedIn, scheduling link | `method` | Intent that bypasses the form |

**Never send:** name, email address, phone number, message text, or the mailto address as a parameter. Send categories, not values.

Track `generate_lead` **once** per confirmed submission. A 503 must never produce a lead event — that was a failure, not an enquiry.

---

## Near-zero-cost measurement setup

A Gravity Index search for privacy-friendly, cookie-less analytics did not return a suitable catalog recommendation, so this section sticks to options that are documented and free rather than recommending a vendor on memory.

**Tier 1 — required, free, no consent banner (aggregate search data only):**
1. **Google Search Console** — verify the deployed host by DNS or HTML file. Submit the sitemap once it exists (see `technical-seo-audit.md` T02/T03). Gives queries, impressions, clicks, country, device, indexing status.
2. **Bing Webmaster Tools** — import from Search Console. Also feeds Copilot surfaces and provides a free keyword view.

**Tier 2 — required for funnel events, free, sets cookies:**
3. **GA4** — the option already named in `docs/seo-client-acquisition-strategy.md`. Free, supports the lead-acquisition report, and supports the events above. Because it sets cookies, publish a privacy notice and review consent requirements for UK/EU visitors **before** enabling it.

**Tier 3 — optional, evaluate later:**
4. Vercel's own analytics offering is available on the platform you deploy to, but its current free-tier limits and cookie-less/custom-event capabilities were **not verified** in this audit. If you try it, verify those specifics first and do not assume consent-free operation.
5. A server-side counter (a simple row written on successful submission) is the most reliable lead source of truth and costs nothing. It also survives ad blockers, which client-side analytics does not.

**Implementation order:** Search Console → Bing → confirm form delivery → GA4 (with privacy notice) → server-side lead count.

## Lead log (outside the website)

Keep a private spreadsheet, not a public file:

| Field | Example |
|---|---|
| Date | 2026-10-20 |
| Source | outreach / referral / search / LinkedIn |
| Service | HVAC lead follow-up |
| Region | US — Ohio |
| Fit | Has demand, loses track of it |
| Stage | replied / call booked / proposal / won / lost |
| Next action + date | Send demo link, 22 Oct |
| Outcome | — |

**Qualified** means: a real buyer, a relevant need, feasible scope, and a realistic route to purchase. Count hiring conversations separately so they do not inflate service metrics.

---

## What "working" looks like in 30 days

| Measure | Target | Note |
|---|---|---|
| Test submission received in inbox | 1 confirmed | Blocks everything else |
| Analytics events visible | page_view + generate_lead | Verify with a test enquiry |
| Form starts vs submissions | recorded, no target | First baseline, not a goal |
| Outreach replies that reach the site | recorded | The real early signal |
| Calls booked | ≥ 3 | GTM metric, not a website metric |

Do not set a conversion-rate target before there is traffic. A percentage of zero is not a measurement.
