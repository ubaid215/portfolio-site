# SEO, AI discovery, and client acquisition strategy

**Prepared:** 9 October 2026  
**Brand:** Muhammad Ubaidullah / ubaid.dev  
**Priority audience:** business owners and founders in the UK, US, Kuwait, and UAE; remote enquiries worldwide remain welcome.  
**Status:** research and plan only. Website implementation, account setup, and publishing are separate execution steps.

## 1. The business goal

Build a repeatable path from a buyer's problem to a relevant service, credible evidence, an enquiry, and a paid project. Track qualified enquiries and won projects rather than treating traffic or animation engagement as the result.

Recommended positioning:

> I build websites, SaaS products, and AI workflows around the way your business works.

Supporting introduction:

> I'm Muhammad Ubaidullah, an independent full stack developer based in Faisalabad, Pakistan. I work remotely with business owners and founders, from customer-facing websites to the systems their teams use every day.

The homepage introduces the person and offer. Dedicated service pages answer specific buying questions. Case studies supply evidence. Guides help buyers make decisions. Contact turns that interest into a conversation.

Three initial commercial priorities:

1. **Websites and ecommerce:** business sites, custom stores, inventory, orders, and CMS work. Existing ecommerce and tax firm projects provide relevant evidence.
2. **SaaS and business systems:** MVPs, dashboards, role-based portals, and integrations. Existing school, restaurant, and donation systems provide relevant evidence.
3. **AI automation:** n8n workflows and OpenAI/Claude integrations with human review. The owner confirmed these tools, but the audited portfolio has no documented LLM client case study. Publish an original, clearly identified demonstration before claiming delivered AI outcomes.

SEO, digital marketing, and generative AI remain visible service offers. Build their standalone search content when there is enough distinct scope and original evidence to support it. Avoid giving six unrelated offers equal prominence in every title and introduction.

## 2. What the audit establishes

| Area | Evidence from this workspace | Planning consequence |
| --- | --- | --- |
| Production domain | `app/layout.tsx` configures `https://ubaid.dev`. Web fetches failed; independent PowerShell requests to the homepage, robots.txt, and sitemap.xml returned a DNS resolution error. | Confirm ownership, actual production URL, DNS, hosting, and HTTPS first. This observation does not establish the status of another deployment URL. |
| Metadata | Root and route titles/descriptions exist; project metadata includes cover images. | Retain this foundation and make metadata reflect each page's purpose. |
| Canonicals | No explicit canonical metadata found. | Add self-referencing canonical URLs after the production domain is confirmed. |
| Crawl files | No sitemap or robots file found in audited `app` or `public` sources. | Add a sitemap and explicit crawler policy. Their absence alone does not prove crawling is blocked. |
| Structured identity | No JSON-LD found in audited app/components/lib/public sources. | Describe the real person, website, profile, services, and relevant breadcrumbs. |
| Service coverage | Six offerings share one `/services` page and anchor sections. | Create separate URLs for the first commercial priorities; an anchor is not a separate service landing page. |
| Original proof | Five project records have screenshots, problem, approach, and delivered outcome. | Improve buyer relevance and cross-link them to service pages. Confirm narrative details before publishing new claims. |
| Client stories | Four records in `lib/testimonials.ts` are owner-written project stories; Finaccont is an owned product. | Obtain actual client wording and permission before presenting quotes or independent reviews. |
| Measurement | No analytics or conversion integration found in app/components/lib. Search Console and Bing account access were not available for inspection. | Establish a baseline; do not claim zero traffic, zero indexed pages, or absent account verification. |
| Enquiries | Gmail configuration was missing during the preceding contact work. Actual SMTP delivery and `hi@ubaid.dev` mailbox/forwarding remain unverified. | Confirm form-to-inbox delivery and the displayed email route before directing traffic to them. |
| Performance | Motion and an intro are present; several original images exceed 1 MB. No production field measurements were available. | Measure rendered image payloads and loading/interaction performance. Source size is a reason to investigate, not proof of a failed page. |

This is a source audit with limited public availability checks, not an authenticated search performance audit. Search rankings, backlinks, revenue, crawl logs, and query volume remain unknown.

## 3. How prospective clients will find you

Use three entry paths in parallel:

- **Purchase intent:** a person searches for a service or developer and lands directly on the relevant service page.
- **Problem research:** a person compares approaches, costs, or tools, reads an original guide, then explores the related project and service.
- **External introduction:** a referral, partner, LinkedIn post, or useful community contribution leads to a specific case study or service.

Example journey: a retailer researches custom inventory software, reads the ecommerce case study, checks the ecommerce service scope, then sends an enquiry. The homepage should support that decision, but every buyer should not have to begin there.

### Page and query map

These queries are research hypotheses, **not measured search volumes or claims of low competition**. Validate them against actual search results, customer language, and available search account data before finalizing copy.

| Page | Buyer need | Initial query hypotheses | Evidence / conversion |
| --- | --- | --- | --- |
| `/` | Understand who you are and what you build | Muhammad Ubaidullah developer; ubaid.dev | Personal introduction, service paths, selected work, contact |
| `/services/website-development` | Commission a business website | freelance website developer; business website development; remote web developer for UK businesses | Tax firm work; enquiry CTA |
| `/services/saas-development` | Build a first product or internal system | SaaS MVP developer; custom web application developer; dashboard development | School/donation/restaurant work; scope conversation |
| `/services/ai-automation` | Connect repetitive business workflows | n8n automation consultant; AI workflow automation services; CRM lead follow-up automation | Original demonstration, tools, review/failure handling; workflow conversation |
| `/services/ecommerce-development` | Connect store and operations | custom ecommerce developer; ecommerce inventory integration; custom ecommerce CMS | Ecommerce case study; discuss the retail workflow |
| `/work/ecommerce-platform` | Evaluate capability through a delivered system | ecommerce platform with inventory and CMS | Screenshots, actual scope, decisions, delivered outcome |
| `/work/restaurant-pos` | Evaluate a hospitality operations build | custom restaurant POS and kitchen display | Documented order-to-kitchen workflow; related service |
| `/insights/` and individual guides | Make a buying decision | custom ecommerce vs Shopify; what affects SaaS MVP cost; when to use n8n for lead follow-up | Original examples; link to one service and one relevant proof page |

Start with website, SaaS, and AI automation pages, then ecommerce. Give each a distinct scope so website and ecommerce pages do not repeat the same content. Do not create separate pages for synonyms that answer the same buying need.

### What belongs on a service page

1. A clear service name and a short description of who it helps.
2. Concrete situations that make the service useful.
3. Scope, deliverables, integrations, and exclusions.
4. Relevant real project evidence or an explicitly described demonstration.
5. How discovery, reviews, delivery, and handover work.
6. Budget/timing guidance consistent with the existing approved offer; otherwise explain what determines the quote.
7. Practical answers on ownership, support, existing systems, and remote collaboration.
8. A visible CTA leading to the contact form, with the service selected if supported.

Use plain text for essential answers. Screenshots and motion illustrate the offer; service details and links must remain accessible without interacting with decorative visuals.

### Regional approach

Use one English site initially. Clearly state the real Pakistan base and remote work availability. Explain communication, UTC+5, agreed overlap, milestones, ownership, and how a project begins. Do not claim an office, existing client base, local registration, specific working hours, or payment capability in a target country without confirmation.

Research UK/US/UAE/Kuwait search intent separately. Country-specific pages become useful only when there is genuinely distinct evidence or information: local project examples, relevant integration needs, or a materially different service process. Add reviewed Arabic content and language annotations only when demand and the ability to maintain an accurate Arabic experience justify them.

Google Business Profile is an option only if the business meets its in-person customer eligibility requirements; a remote online-only business is ineligible. Do not create overseas map listings or borrowed addresses. [Google eligibility guidance](https://support.google.com/business/answer/13763036)

## 4. Search infrastructure

### First: availability and enquiry delivery

Confirm the production hostname, valid HTTPS, and working page responses. If the production domain differs from `ubaid.dev`, update metadata and identity references consistently. Resolve the displayed domain email separately from Gmail SMTP: receiving form notifications in Gmail does not create `hi@ubaid.dev` automatically.

### Then: discovery and page clarity

- Generate one sitemap containing public canonical pages and actual project/service/guide URLs. Exclude API endpoints, previews, unknown slugs, and tracking variants. Include modification dates only when they represent real content changes. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- Publish a robots policy with a sitemap reference and search crawler access. Keep needed CSS/JS/image resources crawlable. Preview access and personal information require appropriate access controls, rather than relying on robots.txt.
- Add canonical URLs, consistent host redirects, and route-specific titles/descriptions. Do not make every route canonical to the homepage. [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- Add useful social preview images and route-specific sharing information. Sharing presentation supports distribution; it is not a ranking guarantee.
- Register/inspect the confirmed domain in Google Search Console and Bing Webmaster Tools; inspect important URLs and submit the sitemap. Reuse existing properties if already configured.
- Check the production response, rendered HTML, internal links, status codes, and image URLs for every launch route.

The existing meta keyword list is not a Google ranking mechanism. Do not spend time expanding it. [Google supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags)

### Performance and motion

Keep the premium brand direction while measuring the intro, large images, font loading, and main-thread animation work. Primary content must appear without requiring a hover or a completed scroll sequence. Verify slow connections, JavaScript failure, keyboard access, mobile rendering, and reduced motion.

Use production field data when available. Aim for LCP at or below 2.5 seconds, INP at or below 200 ms, and CLS at or below 0.1. Lab checks help diagnose issues but do not establish real visitor performance. A small site may not yet have enough field samples. [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals)

## 5. AI discovery: what can actually be influenced

AI products with web search can discover public sources and include them in answers. A model answering without live retrieval is a different situation; publishing a page does not immediately update every model's learned knowledge. There is no universal submission that makes every assistant recommend an individual developer.

The practical goal is to make accurate information about you discoverable, understandable, and worth referring to. Eligibility, a citation, an endorsement, a website visit, and a paying client are different outcomes.

| Surface | Action | Limit |
| --- | --- | --- |
| ChatGPT search | Permit `OAI-SearchBot` and inspect CDN/firewall access using official crawler information. | `GPTBot` concerns potential training use and has a separate policy. Search access is not a promised recommendation. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots) |
| Claude search | Permit `Claude-SearchBot` and user-directed access through `Claude-User` where appropriate. | `ClaudeBot` is a separate training-related crawler. [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) |
| Perplexity | Permit `PerplexityBot`; verify legitimate requests against official information if firewall rules need adjustment. | It is a search crawler; allowing it does not establish citation or placement. [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) |
| Google AI search | Meet search indexing/snippet requirements and keep original useful content accessible. | Google says `llms.txt` does not improve its search visibility. [Google AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) |
| Bing / Copilot | Check indexing and the AI Performance view in Bing Webmaster Tools. | Its citation data covers supported surfaces; citations are not a ranking or sales metric. [Bing AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) |

Keep search access and training preferences separate. Preserve an existing owner preference about training; if none exists, record the decision before introducing training-specific policy changes. A crawler user-agent string alone is not evidence of authenticity, and a spoofed request returning 200 is not proof that the actual crawler reached the site.

### Identity and evidence

- Use **Muhammad Ubaidullah** consistently; treat **ubaid.dev** as the site brand and domain.
- Keep About, GitHub, LinkedIn, and contact details consistent. Check that profile links actually belong to the owner before using `sameAs` references.
- Add a stable `Person` identity, a `WebSite`, and a focused profile description on About. Service and breadcrumb markup should describe visible page content. This is a clarity measure, not a promised ranking boost or Knowledge Panel.
- Publish specific projects: what was built, your role, decisions, screenshots, actual integrations, and outcomes you can substantiate.
- Earn genuine external references through useful work, contributions, collaborations, and approved client/partner credits. This is a distribution and credibility strategy, not a confirmed universal AI recommendation factor.

Treat `llms.txt` as an optional integration experiment if a specific downstream tool needs it. It is outside the first 90-day critical path.

## 6. Content and proof programme

### First proof improvements

**Ecommerce:** explain catalog, variants, inventory, payments, and operations with actual screenshots. Separate implemented features from measured business outcomes.

**Tax websites:** explain service architecture and enquiry flow. Ask for Search Console/analytics baselines and permission before making SEO ranking or lead claims.

**School / restaurant / donation systems:** show workflow and permissions, your role, and the implementation choices that matter to an operator or product founder.

**AI demonstration:** build and document an enquiry-to-CRM workflow using tools the owner confirmed. Show an example input/output, human approval, error recovery, credentials/data boundaries, and limitations. Label it as a demonstration until there is an actual client engagement.

**Client trust:** ask Hussnain Akbar, Raees Ali, and Usman for their own honest account of the work and permission to publish it. Do not write statements in their voice and publish them as reviews. Finaccont remains an owned product, not an independent customer endorsement.

### First six guide briefs

Publish approximately two substantial guides per month, subject to the time needed for original examples and fact-checking. Titles below are briefs to research, not claims that a finished article or dataset exists.

| Guide | Original material to include | Related offer |
| --- | --- | --- |
| Custom ecommerce or Shopify: which fits your workflow? | Actual inventory/CMS decisions; a balanced comparison with current Shopify documentation | Ecommerce |
| What changes the scope and cost of a SaaS MVP? | Role counts, integrations, reporting, and staged scope from existing builds; clearly scoped estimates | SaaS |
| Automating lead follow-up with n8n and AI | The original demonstration, failure cases, review steps, and accurate provider/API costs | AI automation |
| When does a business need a custom dashboard? | School, restaurant, or donation workflow examples | Business applications |
| What a business website needs before an SEO campaign | Tax website structure, a concrete crawl/content checklist, documented limits | Website / SEO |
| Adding a knowledge assistant to existing business tools | An original prototype and evaluation examples; publish only once built | Generative AI |

Each guide should answer a real decision, identify the author, distinguish experience from research, cite current primary technical sources, include a meaningful update date, and link naturally to a service and evidence. No fixed word count, keyword density, or article quota should override usefulness.

AI may assist research and drafting. Mass-producing near-identical pages without added value can violate Google's scaled-content policy. [Google generative content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)

Keep visible FAQs where they help a buyer. Do not promise Google FAQ rich results: Google discontinued that feature in May 2026. [Google documentation updates](https://developers.google.com/search/updates)

## 7. Getting clients while search visibility develops

These are proposed working habits, not forecasts of enquiry or sales volume. Run them alongside the technical and content work.

### Weekly routine

- Research **10 well-matched businesses or founders**, with a concrete reason your work fits. Alternate UK/US and Kuwait/UAE cohorts initially; compare conversation quality before concentrating effort.
- Make **5 individually relevant introductions** through channels where outreach is appropriate. Explain one observed need, show one relevant project, and offer a small next step. The owner sends or separately authorizes any outreach; no automated campaigns are part of this plan.
- Publish **2 useful LinkedIn posts** based on an actual build, decision, or demonstration, with a relevant page when useful.
- Hold **2 partner conversations** with designers, marketers, or agencies whose clients need engineering. Explain scope, ownership, and how collaboration works.
- Ask **1 existing contact** for feedback, an introduction, or an approved client account when appropriate.

A simple introduction pattern: observation about their business → relevant delivered work → a brief invitation to discuss scope. Avoid sending an identical pitch to large lists or presenting unverified claims about their results.

Potential entry offers: a website/SEO assessment, a first-release SaaS scope, or an automation workflow review. Make deliverables and whether the work is paid explicit before offering it. Keep the existing service prices until the owner confirms any commercial changes.

Ask appropriate clients/partners whether they would credit the real work publicly. Prioritize relevant relationships and earned references over purchased backlink packages or bulk directories.

## 8. Conversion and measurement

Start with Google Search Console and Bing Webmaster Tools. A lightweight GA4 installation is a proposed measurement option; review tracking/consent and publish an accurate privacy notice before activating it. No paid SEO subscription is required for the initial plan.

Suggested website events:

| Event | When it should fire | Interpretation |
| --- | --- | --- |
| `service_cta_click` | A relevant service CTA is activated | Interest, not an enquiry |
| `contact_start` | First meaningful form interaction, once per attempt | Form engagement |
| `contact_submit_error` | Validation or delivery fails | Friction; send a safe error category only |
| `generate_lead` | The contact API returns successful owner-notification acceptance | Submitted enquiry; not yet qualified and not proof of inbox placement |
| `contact_method_click` | Email / WhatsApp / LinkedIn action | Contact intent; no assumption that a message was sent |

Google Analytics supports a lead acquisition report populated from lead events. Keep qualification and won-project status in an owner-managed lead log initially. [Google lead acquisition documentation](https://support.google.com/analytics/answer/16376749)

Track safe service, page, channel, and campaign categories. Do not send visitor names, emails, phone numbers, messages, or personal information in URLs/event parameters to analytics. [Google Analytics data guidance](https://support.google.com/analytics/answer/6366371)

Use a private lead log with date, source, region if volunteered, service, fit, next step, stage, and outcome. Qualified means an actual buyer with a relevant need, feasible scope, and a realistic route to a purchase. Keep hiring enquiries separately so they do not inflate service sales metrics. Ask how they found you during the conversation to supplement incomplete attribution.

### Weekly / monthly scorecard

- **Weekly:** availability/delivery issues, outreach activity, new enquiries, qualified conversations, proposal follow-ups.
- **Monthly:** branded vs non-branded search clicks/impressions, landing pages, country/device, enquiry conversion, qualified enquiries, proposals, won projects, and actual value.
- **AI visibility:** Google Search Console's generative AI impressions report when sufficient data exists, Bing AI citations, and attributable AI referral visits. These are different measurements. [Google AI performance report](https://support.google.com/webmasters/answer/16984139)
- **Manual AI checks:** use a fixed small set of buyer prompts monthly; record system, date, region/context, search enabled, actual cited URL, and whether you were named. Include unbranded prompts as well as name lookups. Do not seed your name into a prompt and count its repetition as an unsolicited recommendation.

Before launch, baseline values are **unknown**, not zero. Set outcome targets after initial measurement and real sales feedback. For planning arithmetic only: two won projects at a hypothetical 25% qualified-enquiry close rate would require eight qualified enquiries; neither number is a prediction.

## 9. Prioritized 90-day delivery

| Period | Deliverables | Exit check |
| --- | --- | --- |
| Days 1–7 | Confirm domain/hosting, Gmail and displayed email; establish search properties and measurement; implement crawl files/canonicals/metadata | Important URLs load, lead reaches owner's inbox, crawl rules validated, baseline recorded |
| Days 8–30 | Publish three service pages then ecommerce, strengthen two case studies, connect identity/profile markup, document one AI demonstration | Each commercial page has distinct scope, evidence, links, and a functioning enquiry path |
| Days 31–60 | Publish original buying guides; continue referrals/outreach/partner work; collect approved client feedback | Activity and conversations recorded; content linked to relevant services and projects |
| Days 61–90 | Improve pages using actual queries and enquiry quality; publish remaining useful guides; assess geographic/service focus | A documented performance comparison and next-quarter priorities |

Start relationship-led acquisition in week one while technical work proceeds. Content, search, and proof work are staged to remain manageable for an independent developer.

Expect search changes to take varying amounts of time; Google notes effects can range from hours to months. The first 90 days establish a functioning acquisition system and evidence for iteration, not a guaranteed ranking deadline. [Google SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## 10. Decisions and account work still needed

1. Owner confirms the actual public domain and access to DNS/hosting. Do not change hostname references before that is resolved.
2. Owner completes Gmail setup privately and verifies the test notification, form delivery, and displayed domain email. Follow `docs/contact-email-setup.md`; never put app passwords in this plan or browser code.
3. Owner grants access to existing search/measurement properties or creates them. An account existing elsewhere should be reused.
4. Owner confirms project facts, allowed screenshots, real quotes, proposed entry offers, and accurate remote-collaboration details.
5. Developer validates proposed queries and inspects competing search results before finalizing commercial page briefs; refine priorities using the first actual enquiry data.

**Recommended execution order:** availability and delivery → measurement and search foundations → specific service pages and original proof → consistent distribution → data-led improvement.

See the implementation checklist in `docs/superpowers/plans/2026-10-09-seo-ai-discovery.md` for files, dependencies, and verification.
