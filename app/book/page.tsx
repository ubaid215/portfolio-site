import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { createMetadata, PAGE_SEO } from "@/lib/seo"
import { BOOKING_URL } from "@/lib/site"
import styles from "@/components/marketing/Landing.module.css"

export const metadata: Metadata = createMetadata(PAGE_SEO.book)

const AGENDA = [
  "You walk me through the goal or the problem, in your own words",
  "I ask the questions that decide scope, cost and timing",
  "You leave with a recommended first step, even if that is not hiring me",
  "If a build makes sense, a fixed written quote follows within two business days",
]

export default function BookPage() {
  return (
    <div className={styles.page}>
      <section className={`${styles.container} ${styles.hero}`} aria-labelledby="book-title">
        <div className={styles.bookLayout}>
          <div>
            <p className={styles.eyebrow}>Free · 20 minutes · Video call</p>
            <h1 id="book-title" className={styles.title}>Pick a time. Leave with a plan.</h1>
            <p className={styles.lead}>Talk directly with the developer who would build it. No sales pitch, no obligation.</p>
            <ul className={styles.checks}>
              {AGENDA.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}
            </ul>
            <p className={styles.footnote}>
              Times are shown in your own timezone. I am based in Pakistan (UTC+5) and work with clients worldwide.
              Prefer writing? <Link href="/contact">Send the details instead</Link>.
            </p>
            <div className={styles.actions}>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={styles.secondary} data-track="book_call_click" data-track-label="book_page_external">
                Open the calendar in a new tab<ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <iframe src={BOOKING_URL} title="Choose a time for a 20-minute call" className={styles.bookFrame} loading="lazy" />
        </div>
      </section>
    </div>
  )
}
