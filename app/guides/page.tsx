import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { GUIDES } from "@/lib/guides"
import { createMetadata, PAGE_SEO } from "@/lib/seo"
import styles from "@/components/marketing/Landing.module.css"

export const metadata: Metadata = createMetadata(PAGE_SEO.guides)

export default function GuidesPage() {
  return (
    <div className={styles.page}>
      <section className={`${styles.container} ${styles.hero}`} aria-labelledby="guides-title">
        <p className={styles.eyebrow}>Guides</p>
        <h1 id="guides-title" className={styles.title}>Decide with the facts, before you hire anyone.</h1>
        <p className={styles.lead}>
          Straight answers to the questions business owners ask before a software project: what to choose, what changes the price,
          and what to ask any developer. Drawn from systems I have built.
        </p>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-label="All guides">
        <ul className={styles.linkList}>
          {GUIDES.map((guide) => (
            <li key={guide.slug}>
              <Link href={`/guides/${guide.slug}`}>
                <h2>{guide.title}</h2>
                <p>{guide.description} · {guide.readingMinutes} min read</p>
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
