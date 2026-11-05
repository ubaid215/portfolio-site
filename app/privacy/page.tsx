import type { Metadata } from "next"
import Link from "next/link"
import { createMetadata, PAGE_SEO } from "@/lib/seo"
import { CONTACT_EMAIL } from "@/lib/site"
import styles from "@/components/marketing/Landing.module.css"

export const metadata: Metadata = createMetadata(PAGE_SEO.privacy)

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <header className={`${styles.narrow} ${styles.hero}`}>
        <h1 className={`${styles.title} ${styles.articleTitle}`}>Privacy notice</h1>
        <p className={styles.meta}><span>Updated <time dateTime="2026-10-21">21 October 2026</time></span></p>
      </header>
      <div className={`${styles.narrow} ${styles.prose}`}>
        <p>This website is run by Muhammad Ubaidullah, an independent developer based in Faisalabad, Pakistan. This notice explains what the site collects and why.</p>

        <h2>Analytics</h2>
        <p>The site uses Google Analytics 4 to understand which pages are useful and how visitors find them. It records pages viewed, approximate location, device type, the website that referred you and actions such as booking a call or sending the contact form. It does not receive your name, email address or message.</p>
        <p>Google Analytics sets cookies. You can block them in your browser settings or with the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">Google Analytics opt-out add-on</a>.</p>

        <h2>Contact form</h2>
        <p>When you send the form, your name, email address, selected service, budget band and message are emailed to me so I can reply. They are not added to a mailing list or shared with anyone else.</p>

        <h2>Booking a call</h2>
        <p>Calls are booked through Cal.com. The details you enter there are processed by Cal.com under its own privacy policy and shared with me so I can hold the meeting.</p>

        <h2>Your choices</h2>
        <p>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to ask what I hold about you, to correct it or to have it deleted. You can also <Link href="/contact">use the contact page</Link>.</p>
      </div>
    </div>
  )
}
