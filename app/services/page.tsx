import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, FileText, Mail, Search, Sparkles, UserRound } from "lucide-react"
import { ServicesMotion } from "@/components/services/ServicesMotion"
import { SERVICE_OFFERINGS } from "@/lib/services"
import { PROJECTS } from "@/lib/projects"
import styles from "./page.module.css"

const CHAPTERS = [
  { id: "build", name: "Build", title: "A first impression. A working product.", description: "Give your customers a clear experience and your team the software behind it. From a business website to the product you want to launch.", services: [SERVICE_OFFERINGS[0], SERVICE_OFFERINGS[1]], link: "/work", cta: "Explore the work" },
  { id: "automate", name: "Automate", title: "Connect your tools. Give your team time.", description: "Use AI inside a useful workflow. Connect the repetitive steps, keep the context moving, and make room for your team to review the decisions.", services: [SERVICE_OFFERINGS[2], SERVICE_OFFERINGS[3]], link: "#service-scope", cta: "Explore AI capabilities" },
  { id: "grow", name: "Grow", title: "Be found. Give people a reason to stay.", description: "Bring search, content, and the experience on your website into the same conversation. Help the right people understand your offer and take the next step.", services: [SERVICE_OFFERINGS[4], SERVICE_OFFERINGS[5]], link: "#service-scope", cta: "Explore growth capabilities" },
]

const PROCESS = [
  { title: "Understand", detail: "Your goals, audience, and the way your business works.", deliverable: "A shared brief" },
  { title: "Shape", detail: "Priorities, scope, and an experience we can agree on.", deliverable: "A practical plan" },
  { title: "Build & review", detail: "Working features, useful feedback, and visible progress.", deliverable: "Demos you can review" },
  { title: "Launch & hand over", detail: "Deployment, ownership, documentation, and the next step.", deliverable: "A considered release" },
]

const BUDGETS = [
  { name: "Dashboards & internal tools", price: "From $900", timing: "3–7 weeks" },
  { name: "Booking & operations systems", price: "From $1,200", timing: "4–8 weeks" },
  { name: "SaaS & product MVPs", price: "From $2,500", timing: "6–14 weeks" },
  { name: "Websites, AI & digital growth", price: "Quoted by scope", timing: "Agreed around the brief" },
]

const FAQS = [
  { question: "What do I need before we start?", answer: "A goal, a challenge, or a rough idea is enough to start the conversation. I’ll help you work through the people using the product, the priorities, and what belongs in the first version." },
  { question: "Can we start small and build from there?", answer: "Yes. We can agree on a focused first release, review what people need, and plan the next steps around what we learn. Scope and priorities stay part of the conversation as the product grows." },
  { question: "How do you decide where AI belongs?", answer: "We look at the task, the information it needs, and what a useful result looks like. Before connecting a model, we discuss the data, providers, access, and the points where your team should review or take over." },
  { question: "Can you work with our existing team or product?", answer: "I can collaborate on an existing product or take responsibility for a focused build. We’ll discuss the role, the codebase, and the way we’ll communicate before deciding how the work fits together." },
  { question: "What happens after launch?", answer: "We agree on ownership, documentation, and any ongoing support before launch. For SEO, marketing, or an evolving product, we can also discuss a continued working arrangement around a clear set of priorities." },
]

function RollingText({ text }: { text: string }) {
  return <span className={styles.roll}><span>{text}</span><span aria-hidden="true">{text}</span></span>
}

function TextLink({ href, text }: { href: string; text: string }) {
  return <Link href={href} className={styles.textLink}><RollingText text={text} /><ArrowUpRight size={18} aria-hidden="true" /></Link>
}

function HeadingLine({ children }: { children: string }) {
  return <span className={styles.headingLine}><span data-services-line>{children}</span></span>
}

function BuildVisual() {
  const project = PROJECTS.find((item) => item.slug === "ecommerce-platform")!
  return (
    <figure className={styles.productVisual}>
      <div className={styles.visualBar}><span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span><span>Commerce, connected</span></div>
      <div className={styles.productImage}><Image src={project.coverImage} alt="The retail platform’s inventory and product management interface" fill sizes="(max-width: 999px) 90vw, 35vw" /></div>
      <figcaption className={styles.visualCaption}><span>Storefront, products, orders & reporting</span><Link href="/work/ecommerce-platform">View case study<ArrowUpRight size={16} aria-hidden="true" /></Link></figcaption>
    </figure>
  )
}

function AutomationVisual() {
  const steps = [
    { icon: Mail, title: "An enquiry arrives", detail: "A form, inbox, or connected tool" },
    { icon: FileText, title: "Bring the context together", detail: "Relevant information from your tools" },
    { icon: Sparkles, title: "AI prepares a useful draft", detail: "A summary, answer, or next action" },
    { icon: UserRound, title: "Your team reviews", detail: "A clear point to approve or take over" },
    { icon: Check, title: "The workflow continues", detail: "An update, follow-up, or handoff" },
  ]
  return (
    <figure className={styles.automationVisual}>
      <figcaption className={styles.diagramCaption}>Example: an enquiry follow-up</figcaption>
      <ol className={styles.flowSteps}>
        {steps.map(({ icon: Icon, title, detail }) => <li key={title}><span className={styles.flowIcon}><Icon size={17} aria-hidden="true" /></span><div><p>{title}</p><span>{detail}</span></div></li>)}
      </ol>
      <div className={styles.diagramTools}>OpenAI API / Claude API / n8n / LangChain</div>
    </figure>
  )
}

function GrowthVisual() {
  return (
    <figure className={styles.growthVisual}>
      <figcaption className={styles.diagramCaption}>An example discovery journey</figcaption>
      <div className={styles.searchQuery}><Search size={17} aria-hidden="true" /><span>A customer looks for your service</span></div>
      <div className={styles.searchResult}>
        <span className={styles.resultBrand}>Your business</span><span className={styles.resultUrl}>A page built around the right question</span>
        <h3>The service your customer needs.</h3><p>Clear answers. Useful context. An easy way to get in touch.</p>
        <span className={styles.resultAction}>Make an enquiry<ArrowUpRight size={15} aria-hidden="true" /></span>
      </div>
      <ol className={styles.growthJourney}><li>Discovery</li><li>A useful page</li><li>A conversation</li></ol>
      <p className={styles.growthNote}>Search, content, and the customer journey working together.</p>
    </figure>
  )
}

export default function ServicesPage() {
  return (
    <ServicesMotion className={styles.page}>
      <section className={`${styles.container} ${styles.hero}`} aria-labelledby="services-heading">
        <div className={styles.heroCopy}>
          <p className={styles.heroNote}>A development partner for your next move.</p>
          <h1 id="services-heading" className={styles.heroHeading} aria-label="Build what your business needs next.">
            <span className={styles.heroLine}><span>Build what</span></span><span className={styles.heroLine}><span>your business</span></span><span className={styles.heroLine}><span>needs next.</span></span>
          </h1>
          <p className={styles.heroLead}>From your first impression to the systems behind it. I build websites, software, and practical AI workflows—and help people find what you offer.</p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryAction}><RollingText text="Discuss your project" /><ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link href="#services" className={styles.exploreLink}>Explore the services<ArrowDown size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className={styles.heroVisual} data-services-hero-visual>
          <svg className={styles.heroConnection} viewBox="0 0 600 600" fill="none" aria-hidden="true"><path d="M80 120 H370 Q450 120 450 200 V385 Q450 460 365 460 H130" /></svg>
          <figure className={styles.heroProduct} data-services-hero-card>
            <div className={styles.heroProductLabel}><span>Commerce</span><span>Products, stock & orders</span></div>
            <div className={styles.heroMainImage}><Image src="/images/projects/ecommerce-platform/cover.png" alt="A real product management interface from the e-commerce platform" fill loading="eager" sizes="(max-width: 999px) 85vw, 42vw" /></div>
          </figure>
          <figure className={styles.heroAccounting} data-services-hero-card>
            <div className={styles.heroProductLabel}><span>Finaccont</span><span>Accounting software</span></div>
            <div className={styles.heroSmallImage}><Image src="/images/projects/finaccont/cover.png" alt="Finaccont accounting software interface" fill loading="eager" sizes="(max-width: 999px) 60vw, 25vw" /></div>
          </figure>
          <p className={styles.heroVisualNote}>Real interfaces. Connected business workflows.</p>
        </div>
        <div className={styles.heroRail}><p>For founders, business owners, and product teams.</p><span>Build. Automate. Grow.</span></div>
      </section>

      <section id="services" className={`${styles.container} ${styles.chapters}`} aria-label="Build, Automate, and Grow services" data-services-stage>
        <div className={styles.chapterNav}>
          <div className={styles.chapterButtons} role="group" aria-label="Service chapters">
            {CHAPTERS.map((chapter) => <button key={chapter.id} type="button" data-services-chapter-button aria-controls={`services-${chapter.id}`}><span>{chapter.name}</span><ArrowRight size={19} aria-hidden="true" /></button>)}
          </div>
          <p className={styles.chapterHint}>The right pieces for what comes next.</p>
          <div className={styles.chapterTrack} aria-hidden="true"><span data-services-progress /></div>
        </div>
        <div className={styles.chapterPanels}>
          {CHAPTERS.map((chapter) => (
            <article key={chapter.id} id={`services-${chapter.id}`} className={styles.chapterPanel} data-services-panel aria-labelledby={`${chapter.id}-heading`}>
              <div className={styles.chapterCopy}>
                <h2 id={`${chapter.id}-heading`}>{chapter.title}</h2><p className={styles.chapterLead}>{chapter.description}</p>
                <div className={styles.chapterOffers}>{chapter.services.map((service) => <div key={service.id}><h3>{service.title}</h3><p>{service.deliverables.join(" / ")}</p></div>)}</div>
                <TextLink href={chapter.link} text={chapter.cta} />
              </div>
              {chapter.id === "build" ? <BuildVisual /> : chapter.id === "automate" ? <AutomationVisual /> : <GrowthVisual />}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.scene} aria-labelledby="services-connection" data-services-scene>
        <div className={`${styles.container} ${styles.sceneInner}`}>
          <p className={styles.sceneNote}>Your website. Your workflow. Your next move.</p>
          <h2 id="services-connection" className={styles.sceneHeading} aria-label="One business. A connected digital experience."><HeadingLine>One business.</HeadingLine><HeadingLine>A connected</HeadingLine><HeadingLine>digital experience.</HeadingLine></h2>
          <p className={styles.sceneCopy} data-services-reveal>The value is in how the pieces work together: what customers see, how your team works, and what your business can do next.</p>
          <div className={styles.sceneSignature}><span>ubaid.dev</span><span>Thoughtfully built. Purposefully connected.</span></div>
        </div>
      </section>

      <section id="service-scope" className={`${styles.container} ${styles.scopeSection}`} aria-labelledby="services-scope-heading">
        <div className={styles.sectionHeader}>
          <h2 id="services-scope-heading" className={styles.sectionHeading} aria-label="The details, when you need them."><HeadingLine>The details,</HeadingLine><HeadingLine>when you need them.</HeadingLine></h2>
          <p>Explore what each service can include. We shape the final scope around your audience, your workflow, and the outcome you need.</p>
        </div>
        <div className={styles.scopeList}>
          {SERVICE_OFFERINGS.map((service) => (
            <details key={service.id} id={service.id} className={styles.scopeDetail}>
              <summary><span>{service.title}</span><ChevronDown size={22} aria-hidden="true" /></summary>
              <div className={styles.scopeContent}><p className={styles.scopeDescription}>{service.description}</p><p>{service.detail}</p><ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul><TextLink href="/contact" text={`Discuss ${service.title.toLowerCase().replace(/\bai\b/g, "AI").replace(/\bsaas\b/g, "SaaS")}`} /></div>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.processBand} aria-labelledby="services-process-heading" data-services-process>
        <div className={styles.container}>
          <div className={styles.sectionHeader}><h2 id="services-process-heading" className={styles.sectionHeading} aria-label="A clear way forward."><HeadingLine>A clear way</HeadingLine><HeadingLine>forward.</HeadingLine></h2><p>One direct working relationship. Clear priorities, working demos, and decisions you can follow.</p></div>
          <div className={styles.processTrack} aria-hidden="true"><span data-services-process-progress /></div>
          <ol className={styles.processSteps}>{PROCESS.map((step, index) => <li key={step.title}><span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.detail}</p><span className={styles.deliverable}>{step.deliverable}</span></li>)}</ol>
        </div>
      </section>

      <section className={`${styles.container} ${styles.budgetSection}`} aria-labelledby="services-budget-heading">
        <div className={styles.budgetIntro}>
          <p className={styles.sectionNote}>Budget guidance</p><h2 id="services-budget-heading" className={styles.sectionHeading} aria-label="A starting point for the conversation."><HeadingLine>A starting point</HeadingLine><HeadingLine>for the conversation.</HeadingLine></h2>
          <p>The build should fit the goal and the budget. These starting estimates give us a place to begin; the final quote and timeline follow the agreed scope.</p><TextLink href="/contact" text="Discuss your budget" />
        </div>
        <dl className={styles.budgetList}>{BUDGETS.map((budget) => <div key={budget.name}><dt>{budget.name}</dt><dd><strong>{budget.price}</strong><span>{budget.timing}</span></dd></div>)}</dl>
      </section>

      <section className={`${styles.container} ${styles.faqSection}`} aria-labelledby="services-faq-heading">
        <div><p className={styles.sectionNote}>Before we begin</p><h2 id="services-faq-heading" className={styles.sectionHeading} aria-label="A little more clarity."><HeadingLine>A little more</HeadingLine><HeadingLine>clarity.</HeadingLine></h2></div>
        <div className={styles.faqList}>{FAQS.map((faq) => <details key={faq.question} className={styles.faqDetail}><summary><span>{faq.question}</span><ChevronDown size={21} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
      </section>
    </ServicesMotion>
  )
}
