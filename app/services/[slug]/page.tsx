import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check, ChevronDown } from "lucide-react"
import { JsonLd } from "@/components/seo/JsonLd"
import { getGuide } from "@/lib/guides"
import { getProject } from "@/lib/projects"
import { createMetadata, servicePageSchema } from "@/lib/seo"
import { SERVICE_PAGES, getServicePage } from "@/lib/service-pages"
import styles from "@/components/marketing/Landing.module.css"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getServicePage(slug)
  if (!page) return {}
  return createMetadata({ title: page.seoTitle, description: page.seoDescription, path: `/services/${page.slug}`, keywords: page.keywords })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const page = getServicePage(slug)
  if (!page) notFound()

  const proof = page.proof.flatMap((item) => {
    const project = getProject(item.slug)
    return project ? [{ ...item, project }] : []
  })
  const guide = page.relatedGuide ? getGuide(page.relatedGuide) : undefined

  return (
    <div className={styles.page}>
      <JsonLd data={servicePageSchema(page)} />

      <section className={`${styles.container} ${styles.hero}`} aria-labelledby="service-title">
        <ol className={styles.breadcrumbs}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li aria-current="page">{page.name}</li>
        </ol>
        <p className={styles.eyebrow}>{page.eyebrow}</p>
        <h1 id="service-title" className={styles.title}>{page.headline}</h1>
        <p className={styles.lead}>{page.lead}</p>
        <div className={styles.actions}>
          <Link href="/book" className={styles.primary} data-track="book_call_click" data-track-label={`service_${page.slug}`}>
            Book a free 20-minute call<ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/contact" className={styles.secondary} data-track="service_cta_click" data-track-label={page.slug}>Send the details instead</Link>
        </div>
        <ul className={styles.rail}>
          <li><strong>{page.price}</strong></li>
          <li>{page.timing}</li>
          <li>Fixed quote before work starts</li>
        </ul>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="service-situations">
        <div className={styles.sectionHeader}>
          <h2 id="service-situations" className={styles.sectionTitle}>When this is the right call.</h2>
          <p>If one of these sounds like your week, this is the service to start with.</p>
        </div>
        <ul className={styles.grid}>
          {page.situations.map((item) => <li key={item.title} className={styles.card}><h3>{item.title}</h3><p>{item.detail}</p></li>)}
        </ul>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="service-included">
        <div className={styles.sectionHeader}>
          <h2 id="service-included" className={styles.sectionTitle}>What you get.</h2>
          <p>{page.priceNote}</p>
        </div>
        <ul className={`${styles.grid} ${styles.grid2}`}>
          {page.included.map((item) => <li key={item} className={`${styles.card} ${styles.included}`}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}
        </ul>
      </section>

      {proof.length > 0 && (
        <section className={`${styles.container} ${styles.section}`} aria-labelledby="service-proof">
          <div className={styles.sectionHeader}>
            <h2 id="service-proof" className={styles.sectionTitle}>Work behind the offer.</h2>
            <p>Delivered projects that use the same skills. Each case study separates what was built from results that still need client data to confirm.</p>
          </div>
          <div className={styles.proofList}>
            {proof.map(({ project, note }) => (
              <div key={project.slug} className={styles.proof}>
                <div className={styles.proofImage}><Image src={project.coverImage} alt={`${project.title} interface`} fill sizes="(max-width: 999px) 90vw, 50vw" /></div>
                <div className={styles.proofCopy}>
                  <h3 className={styles.proofTitle}>{project.title}</h3>
                  <p>{note}</p>
                  <div className={styles.actions}><Link href={`/work/${project.slug}`} className={styles.secondary}>Read the case study<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="service-faq">
        <div className={styles.sectionHeader}><h2 id="service-faq" className={styles.sectionTitle}>Before you decide.</h2></div>
        <div className={styles.faq}>
          {page.faqs.map((faq) => <details key={faq.question}><summary><span>{faq.question}</span><ChevronDown size={20} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
        </div>
        {guide && (
          <ul className={`${styles.linkList} ${styles.related}`}>
            <li><Link href={`/guides/${guide.slug}`}><h3>{guide.title}</h3><p>{guide.description}</p><ArrowUpRight size={22} aria-hidden="true" /></Link></li>
          </ul>
        )}

        <div className={styles.closing}>
          <div>
            <h2>Get a clear plan and a fixed quote.</h2>
            <p>A free 20-minute call. You leave with the first step and a price, whether or not we work together.</p>
          </div>
          <Link href="/book" className={styles.primary} data-track="book_call_click" data-track-label={`service_${page.slug}_closing`}>
            Book a call<ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
