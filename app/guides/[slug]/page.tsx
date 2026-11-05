import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { JsonLd } from "@/components/seo/JsonLd"
import { GUIDES, getGuide } from "@/lib/guides"
import { createMetadata, guideSchema } from "@/lib/seo"
import styles from "@/components/marketing/Landing.module.css"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  return createMetadata({ title: guide.seoTitle, description: guide.description, path: `/guides/${guide.slug}`, keywords: guide.keywords, type: "article" })
}

const DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  return (
    <article className={styles.page}>
      <JsonLd data={guideSchema(guide)} />

      <header className={`${styles.narrow} ${styles.hero}`}>
        <ol className={styles.breadcrumbs}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/guides">Guides</Link></li>
        </ol>
        <h1 className={`${styles.title} ${styles.articleTitle}`}>{guide.title}</h1>
        <p className={styles.lead}>{guide.summary}</p>
        <p className={styles.meta}>
          <span>By <Link href="/about">Muhammad Ubaidullah</Link></span>
          <span>Updated <time dateTime={guide.updated}>{DATE.format(new Date(guide.updated))}</time></span>
          <span>{guide.readingMinutes} min read</span>
        </p>
      </header>

      <div className={`${styles.narrow} ${styles.prose}`}>
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}

        <p className={styles.callout}>
          Written by a developer who builds these systems. Where a guide describes a project, the details come from delivered work in the{" "}
          <Link href="/work">portfolio</Link>; results that would need client data to verify are not claimed.
        </p>
      </div>

      <div className={styles.narrow}>
        <ul className={`${styles.linkList} ${styles.related}`}>
          {guide.related.map((link) => (
            <li key={link.href}><Link href={link.href}><h3>{link.label}</h3><ArrowUpRight size={22} aria-hidden="true" /></Link></li>
          ))}
        </ul>

        <div className={styles.closing}>
          <div>
            <h2>Want this applied to your business?</h2>
            <p>A free 20-minute call. You leave with a clear next step and a fixed quote if a build makes sense.</p>
          </div>
          <Link href="/book" className={styles.primary} data-track="book_call_click" data-track-label={`guide_${guide.slug}`}>
            Book a call<ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
