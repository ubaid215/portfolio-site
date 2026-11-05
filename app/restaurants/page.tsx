import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, BarChart3, Check, ChefHat, ChevronDown, Clock, LayoutGrid, MenuSquare, ShieldCheck, Wallet } from "lucide-react"
import { JsonLd } from "@/components/seo/JsonLd"
import { createMetadata, PAGE_SEO, restaurantPageSchema } from "@/lib/seo"
import styles from "@/components/marketing/Landing.module.css"

export const metadata: Metadata = createMetadata({ ...PAGE_SEO.restaurants, image: "/images/projects/restaurant-pos/cover.png" })

// Three tiers so the middle option reads as the sensible default, each priced
// as a fixed amount rather than a range. Prices and terms need the owner's
// confirmation before outreach; see docs/restaurant-offer.md.
const PACKAGES = [
  {
    name: "Kitchen Flow",
    price: 1490,
    timing: "Live in 3–4 weeks",
    description: "For cafés and takeaways that need orders to reach the kitchen without mistakes.",
    features: [
      "Menu manager: change an item or price once, everywhere",
      "Order-taking screen for tablet or laptop",
      "Live kitchen display: chefs mark items ready",
      "Daily sales summary",
      "Staff logins for front of house and kitchen",
      "Setup and a training call for your team",
      "30 days of fixes after launch",
    ],
  },
  {
    name: "Full Service",
    price: 2990,
    timing: "Live in 5–6 weeks",
    featured: true,
    description: "For sit-down restaurants that want the whole service in one system.",
    features: [
      "Everything in Kitchen Flow",
      "Floor plan with live table status: free, seated, billed",
      "Billing from the table order",
      "Revenue dashboard: best sellers, peak hours, average ticket",
      "Exports ready for your accountant",
      "Owner, manager, server and kitchen roles",
      "60 days of fixes after launch",
    ],
  },
  {
    name: "Multi-Branch",
    price: 5900,
    from: true,
    timing: "8–12 weeks",
    description: "For groups running more than one location or brand from one kitchen.",
    features: [
      "Everything in Full Service",
      "One central menu with branch-level prices",
      "Reporting per branch and for the whole group",
      "Integrations scoped with you: online ordering, delivery, accounting",
      "Priority support during rollout",
      "90 days of fixes after launch",
    ],
  },
] as const

const PROBLEMS = [
  { icon: ChefHat, title: "Orders get lost between the counter and the kitchen", detail: "Shouted tickets and paper slips mean wrong dishes, remakes and waiting tables." },
  { icon: MenuSquare, title: "Menu changes take three edits and a reprint", detail: "The POS, the board and the website each hold their own copy of the menu." },
  { icon: BarChart3, title: "You find out what sold at the end of the month", detail: "No clear view of best sellers, slow hours or average spend until someone builds a spreadsheet." },
]

const PROMISES = [
  { title: "Fixed price", detail: "Agreed in writing before work starts. No hourly meter." },
  { title: "Pay as it works", detail: "30% to start, 40% at a working demo, 30% only once it runs in your restaurant." },
  { title: "You own it", detail: "Your code, your data, your hosting account. No per-terminal licence." },
  { title: "See it weekly", detail: "A working demo every week you can click through with your team." },
]

const STEPS = [
  { title: "Free 20-minute call", detail: "Walk me through a busy service. I point out where orders, menus and numbers leak, whether or not you hire me." },
  { title: "Fixed quote in two business days", detail: "A written scope, the package that fits, the price and a launch date." },
  { title: "Build with weekly demos", detail: "You test each piece on your own devices and tell me what your staff need changed." },
  { title: "Launch and train", detail: "We go live on a quiet day, train your team on a call, and I stay on hand for the fix period." },
]

const FAQS = [
  { question: "Will it work on the tablets and screens we already have?", answer: "It runs in a modern web browser, so the tablets, laptops and screens you already own can usually be used. We check your devices on the first call before you commit." },
  { question: "How are card payments handled?", answer: "You can keep your existing card terminal and record payments in the system, or I connect a payment provider you choose. We decide this during scoping, because it affects fees and hardware." },
  { question: "What happens if the internet goes down?", answer: "The system needs a network connection. If your connection is unreliable, we plan for it during scoping, for example with a backup mobile connection, before anything goes live." },
  { question: "Can you work with us remotely?", answer: "Yes. I work remotely from Pakistan (UTC+5) with clients worldwide. Demos, setup and staff training happen over video calls, with overlap hours agreed at the start." },
  { question: "What does it cost after launch?", answer: "You pay your hosting provider directly. An optional care plan at $149 a month covers monitoring, backups, updates and small changes. There are no per-terminal fees." },
  { question: "Why not just use a subscription POS?", answer: "For many small restaurants, a subscription POS is the right choice, and I will tell you so on the call. A custom system pays off when your workflow does not fit the box or when terminal fees keep growing." },
]

const USD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function RestaurantsPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={restaurantPageSchema(PACKAGES, FAQS)} />

      <section className={`${styles.container} ${styles.hero}`} aria-labelledby="restaurants-title">
        <p className={styles.eyebrow}>For restaurants, cafés & takeaways</p>
        <h1 id="restaurants-title" className={styles.title}>Every order reaches the kitchen. Every number reaches you.</h1>
        <p className={styles.lead}>
          A POS, kitchen display, menu manager and sales dashboard built around how your restaurant actually runs.
          One fixed price. No per-terminal fees. You own it.
        </p>
        <div className={styles.actions}>
          <Link href="/book" className={styles.primary} data-track="book_call_click" data-track-label="restaurants_hero">
            Book a free 20-minute workflow check<ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link href="#packages" className={styles.secondary}>See packages and prices</Link>
        </div>
        <ul className={styles.rail}>
          <li><Wallet size={16} aria-hidden="true" />Fixed price from {USD.format(PACKAGES[0].price)}</li>
          <li><Clock size={16} aria-hidden="true" />Live in as little as 3 weeks</li>
          <li><ShieldCheck size={16} aria-hidden="true" />Final 30% paid once it runs in your restaurant</li>
        </ul>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="restaurants-problems">
        <div className={styles.sectionHeader}>
          <h2 id="restaurants-problems" className={styles.sectionTitle}>Sound familiar?</h2>
          <p>Each of these costs you remakes, slow tables or decisions made on guesswork. They all come from the same cause: your tools do not share one source of truth.</p>
        </div>
        <ul className={styles.grid}>
          {PROBLEMS.map(({ icon: Icon, title, detail }) => (
            <li key={title} className={styles.card}><span className={styles.cardIcon}><Icon size={18} aria-hidden="true" /></span><h3>{title}</h3><p>{detail}</p></li>
          ))}
        </ul>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="restaurants-proof">
        <div className={styles.proof}>
          <div className={styles.proofImage}>
            <Image src="/images/projects/restaurant-pos/cover.png" alt="The restaurant POS order screen from a delivered project" fill sizes="(max-width: 999px) 90vw, 50vw" />
          </div>
          <div className={styles.proofCopy}>
            <p className={styles.eyebrow}>Built for a real restaurant</p>
            <h2 id="restaurants-proof" className={styles.sectionTitle}>One menu. Three screens. Zero copying.</h2>
            <p>
              For a restaurant whose orders kept slipping between the front desk and the kitchen, I built a POS, a real-time kitchen display,
              a menu manager and a revenue dashboard that all read from one data model. Change a dish once and it updates everywhere.
              The kitchen marks items ready and the floor sees it instantly.
            </p>
            <div className={styles.actions}>
              <Link href="/work/restaurant-pos" className={styles.secondary}>Read the case study<ArrowUpRight size={16} aria-hidden="true" /></Link>
              <Link href="/guides/custom-restaurant-pos-vs-subscription" className={styles.secondary}>Custom vs subscription POS<ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className={`${styles.container} ${styles.section}`} aria-labelledby="restaurants-packages">
        <div className={styles.sectionHeader}>
          <h2 id="restaurants-packages" className={styles.sectionTitle}>Pick the package. Know the price before we start.</h2>
          <p>Every package is a one-time fixed price, not a monthly subscription. Not sure which fits? The free call ends with a recommendation.</p>
        </div>
        <div className={styles.tiers}>
          {PACKAGES.map((item) => (
            <article key={item.name} className={`${styles.tier} ${"featured" in item ? styles.featured : ""}`} aria-labelledby={`package-${item.price}`}>
              {"featured" in item && <span className={styles.badge}>Recommended</span>}
              <h3 id={`package-${item.price}`}>{item.name}</h3>
              <p className={styles.tierFor}>{item.description}</p>
              <p className={styles.price}>{"from" in item && <small>from</small>}{USD.format(item.price)}<small>one-time</small></p>
              <p className={styles.timing}>{item.timing}</p>
              <ul className={styles.checks}>
                {item.features.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>)}
              </ul>
              <Link href="/book" className={"featured" in item ? styles.primary : styles.secondary} data-track="book_call_click" data-track-label={`package_${item.name.toLowerCase().replace(/\s+/g, "_")}`}>
                Talk about {item.name}<ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        <p className={styles.footnote}>
          Optional care plan after the fix period: $149/month for monitoring, backups, updates and small changes. Hosting is billed to you directly by the provider.
          Hardware and card processing fees are separate and stay with the providers you choose.
        </p>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-label="How the risk is shared">
        <ul className={styles.promise}>
          {PROMISES.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.detail}</span></li>)}
        </ul>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="restaurants-steps">
        <div className={styles.sectionHeader}>
          <h2 id="restaurants-steps" className={styles.sectionTitle}>From first call to first service.</h2>
          <p>You talk directly to the person building it, from the first call to the day you go live.</p>
        </div>
        <ol className={styles.steps}>
          {STEPS.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.detail}</p></li>)}
        </ol>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="restaurants-faq">
        <div className={styles.sectionHeader}><h2 id="restaurants-faq" className={styles.sectionTitle}>Questions owners ask first.</h2></div>
        <div className={styles.faq}>
          {FAQS.map((faq) => <details key={faq.question}><summary><span>{faq.question}</span><ChevronDown size={20} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
        </div>

        <div className={styles.closing}>
          <div>
            <h2>Find out where your service is leaking, in 20 minutes.</h2>
            <p>Free, no obligation. If a subscription POS suits you better, I will tell you which questions to ask its sales team.</p>
          </div>
          <Link href="/book" className={styles.primary} data-track="book_call_click" data-track-label="restaurants_closing">
            <LayoutGrid size={18} aria-hidden="true" />Book your workflow check
          </Link>
        </div>
      </section>
    </div>
  )
}
