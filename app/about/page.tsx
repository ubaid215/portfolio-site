import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Download } from "lucide-react"
import { AboutMotion } from "@/components/about/AboutMotion"
import { PROJECTS } from "@/lib/projects"
import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "About",
  description: "Meet Muhammad Ubaidullah, an independent full stack developer in Faisalabad, Pakistan. Explore his approach, real project work, and capabilities in websites, SaaS, and practical AI solutions.",
}

const STATEMENT = "A good product makes the next step clear for customers, and the everyday work easier for the team behind it."

const EXPERIENCE = [
  { slug: "ecommerce-platform", context: "Commerce", lesson: "Connecting the storefront to the work behind it.", detail: "Products, stock, orders, and reporting brought into a shared back office, with a custom CMS shaped around the retail workflow." },
  { slug: "school-management", context: "Education", lesson: "Different people. A connected experience.", detail: "Student, teacher, parent, and admin portals bring attendance, grades, fees, and communication into one platform, with access shaped around each role." },
  { slug: "restaurant-pos", context: "Hospitality", lesson: "Software shaped around a busy service.", detail: "A restaurant POS, kitchen display, and content management system connect the order journey with the people preparing and serving it." },
]

const CAPABILITIES = [
  { title: "Websites & business software", detail: "Customer-facing websites, online stores, SaaS products, and the dashboards your team uses every day. I connect the interface with the accounts, payments, and data behind it.", tools: "React, Next.js, TypeScript, Node.js, NestJS" },
  { title: "AI & useful automation", detail: "Assistants, document workflows, and integrations that put language models to work inside a useful process. We decide where automation helps and where your team should review or take over.", tools: "OpenAI API, Claude API, LangChain, n8n" },
  { title: "Search & digital growth", detail: "Clear site structure, technical SEO, service-page content, and landing pages. I connect how people discover your business with the experience they find when they arrive.", tools: "Technical SEO, content direction, conversion tracking" },
]

const PROCESS = [
  { title: "Understand the outcome", description: "We start with your business, the people using the product, and the task that needs to become easier. A clear goal gives the build a useful direction.", deliverable: "A shared brief" },
  { title: "Make the trade-offs clear", description: "We decide what belongs in the first version, what can follow, and how the experience should work. Scope and priorities are agreed before the build grows.", deliverable: "Scope, priorities & a plan" },
  { title: "Review working features", description: "You see the product as it takes shape. Working demos make feedback specific and help us refine the details while decisions are still easy to change.", deliverable: "Demos & visible progress" },
  { title: "Prepare for the handover", description: "We work through the launch, documentation, and ownership of the product. Your team should understand how to use it, maintain it, and plan the next release.", deliverable: "Launch & practical documentation" },
]

function RollingText({ text }: { text: string }) {
  return <span className={styles.roll}><span>{text}</span><span aria-hidden="true">{text}</span></span>
}

function HeadingLine({ children }: { children: string }) {
  return <span className={styles.headingLine}><span data-about-line>{children}</span></span>
}

export default function AboutPage() {
  return (
    <AboutMotion className={styles.page}>
      <section className={`${styles.container} ${styles.hero}`} aria-labelledby="about-heading" data-about-hero>
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p className={styles.identity}>Muhammad Ubaidullah<span>Full Stack Developer</span></p>
            <h1 id="about-heading" className={styles.heroHeading} aria-label="Your ambition. My attention to the details.">
              <span className={styles.heroLine}><span>Your ambition.</span></span>
              <span className={styles.heroLine}><span>My attention</span></span>
              <span className={styles.heroLine}><span>to the details.</span></span>
            </h1>
            <p className={styles.heroLead}>I build websites, software, and practical AI tools that connect your business with the people it serves.</p>
            <div className={styles.heroActions}>
              <Link href="/work" className={styles.primaryAction}><RollingText text="See my work" /><ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link href="/Ubaidullah_Resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resume}><Download size={17} aria-hidden="true" /><span>View résumé</span></Link>
            </div>
          </div>
          <figure className={styles.portraitFigure}>
            <div className={styles.portraitFrame}>
              <div className={styles.portraitDepth} data-about-portrait>
                <Image src="/images/professional-img.png" alt="Muhammad Ubaidullah, independent full stack developer" fill loading="eager" sizes="(max-width: 800px) 90vw, 45vw" className={styles.portraitImage} />
              </div>
              <span className={styles.portraitSignature} aria-hidden="true">Ubaidullah.</span>
            </div>
            <figcaption className={styles.portraitCaption}><span>Faisalabad, Pakistan</span><span>Working worldwide</span></figcaption>
          </figure>
        </div>
        <div className={styles.heroRail}>
          <p>A project partner. An extension of your team.</p>
          <Link href="#my-approach" className={styles.textLink}>Get to know my approach<ArrowDown size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <section id="my-approach" className={`${styles.container} ${styles.story}`} aria-labelledby="about-belief">
        <div className={styles.statementStage} data-about-statement-stage>
          <p className={styles.sectionNote}>How I think about the work</p>
          <h2 id="about-belief" className={styles.readingHeading} aria-label={STATEMENT} data-about-statement>
            {STATEMENT.split(" ").map((word, index) => (
              <span key={`${word}-${index}`} className={styles.readingWord} aria-hidden="true">
                {Array.from(word).map((letter, letterIndex) => (
                  <span key={letterIndex} className={styles.readingCharacter}>{letter}<span className={styles.readingInk} data-about-ink>{letter}</span></span>
                ))}{" "}
              </span>
            ))}
          </h2>
        </div>
        <div className={styles.storyBody}>
          <div className={styles.storyAside} data-about-reveal>
            <p className={styles.asideTitle}>One person you can talk to.</p>
            <p>One build we shape together.</p>
          </div>
          <div className={styles.biography}>
            <p data-about-reveal>I&apos;m based in Faisalabad, Pakistan, and work directly with founders, business owners, and product teams. I like understanding the workflow before choosing the technology.</p>
            <p data-about-reveal>My work spans retail, education, hospitality, and donor management. I also develop <strong>Finaccont</strong>, my own accounting software: another place to work through the details of everyday business.</p>
            <p data-about-reveal>I can take responsibility for a focused build or collaborate with your team on an existing product. Either way, I make the decisions, priorities, and progress easy to follow.</p>
            <dl className={styles.expectations}>
              <div><dt>Direct communication</dt><dd>You work with the person making the decisions and writing the code.</dd></div>
              <div><dt>Clear priorities</dt><dd>We put your time and budget into the work that serves the agreed goal.</dd></div>
              <div><dt>A useful handover</dt><dd>Documentation and ownership are part of the conversation from the start.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className={styles.scene} aria-labelledby="about-craft" data-about-scene>
        <div className={`${styles.container} ${styles.sceneInner}`}>
          <p className={styles.sceneNote}>Care shows up in the details.</p>
          <h2 id="about-craft" className={styles.sceneHeading} aria-label="The small decisions become the experience."><HeadingLine>The small decisions</HeadingLine><HeadingLine>become the experience.</HeadingLine></h2>
          <p className={styles.sceneCopy} data-about-reveal>Clear labels. Helpful feedback. Thoughtful handoffs. I make room for the details people notice when they actually use the product.</p>
          <div className={styles.sceneFooter}><span>From the first conversation</span><span>to the final handover.</span></div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.experience}`} aria-labelledby="about-experience">
        <div className={styles.sectionHeader}>
          <h2 id="about-experience" className={styles.sectionHeading} aria-label="Experience you can explore."><HeadingLine>Experience you</HeadingLine><HeadingLine>can explore.</HeadingLine></h2>
          <p>Real interfaces. Real business workflows.<br />These projects show how I think through the build.</p>
        </div>
        <div className={styles.proofList}>
          {EXPERIENCE.map(({ slug, context, lesson, detail }) => {
            const project = PROJECTS.find((item) => item.slug === slug)
            if (!project) return null
            return (
              <Link key={slug} href={`/work/${slug}`} className={styles.proofRow} aria-label={`Explore ${project.title} case study`}>
                <span className={styles.proofContext}>{context}<span>{project.year}</span></span>
                <div className={styles.proofCopy}>
                  <h3>{lesson}</h3><p>{detail}</p>
                  <span className={styles.proofAction}><RollingText text="Explore the case study" /><span className={styles.proofArrow}><ArrowUpRight size={20} aria-hidden="true" /></span></span>
                </div>
                <div className={styles.proofImageFrame}><div className={styles.proofImageDepth} data-about-proof-image><Image src={project.coverImage} alt={`${project.title} interface`} fill sizes="(max-width: 760px) 90vw, 30vw" /></div></div>
              </Link>
            )
          })}
        </div>
        <div className={styles.experienceFooter}><p>{PROJECTS.length.toString().padStart(2, "0")} case studies in the collection</p><Link href="/work" className={styles.textLink}><RollingText text="View all projects" /><ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </section>

      <section className={styles.capabilitiesBand} aria-labelledby="about-capabilities">
        <div className={styles.container}>
          <div className={styles.capabilityHeader}><h2 id="about-capabilities" className={styles.sectionHeading} data-about-reveal>Where I can help.</h2><Link href="/services" className={styles.textLink}>Explore my services<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
          <div className={styles.capabilityList}>
            {CAPABILITIES.map(({ title, detail, tools }) => <article className={styles.capability} key={title}><h3>{title}</h3><p>{detail}</p><p className={styles.tools}>{tools}</p></article>)}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.process}`} aria-labelledby="about-process">
        <div className={styles.processIntro}>
          <p className={styles.sectionNote}>How we work together</p>
          <h2 id="about-process" className={styles.sectionHeading} aria-label="A clear path from idea to launch."><HeadingLine>A clear path</HeadingLine><HeadingLine>from idea</HeadingLine><HeadingLine>to launch.</HeadingLine></h2>
          <p>You should know what we&apos;re building, why it matters, and where things stand.</p>
          <Link href="/contact" className={styles.textLink}><RollingText text="Discuss your project" /><ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className={styles.processSteps} data-about-process>
          <div className={styles.processTrack} aria-hidden="true"><span data-about-process-progress /></div>
          <ol className={styles.processList}>
            {PROCESS.map(({ title, description, deliverable }, index) => <li className={styles.processStep} key={title}>
              <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
              <div><h3>{title}</h3><p>{description}</p><span className={styles.deliverable}>{deliverable}</span></div>
            </li>)}
          </ol>
        </div>
      </section>

      <section className={`${styles.container} ${styles.closing}`} aria-labelledby="about-invitation">
        <div><h2 id="about-invitation">A project in mind? A role to discuss?</h2><p>Tell me where you need support. We can work out the next step together.</p></div>
        <Link href="/contact" className={styles.primaryAction}><RollingText text="Start a conversation" /><ArrowUpRight size={18} aria-hidden="true" /></Link>
      </section>
    </AboutMotion>
  )
}
