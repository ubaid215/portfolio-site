"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowDown, ArrowUpRight, Check, CheckCircle2, ChevronDown, Copy, LoaderCircle, Mail, MapPin } from "lucide-react"
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { ContactMotion } from "@/components/contact/ContactMotion"
import { validateContactPayload } from "@/lib/contact-validation"
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from "@/lib/site"
import styles from "./page.module.css"

const PROJECT_TYPES = [
  "Website / Frontend", "SaaS / Product MVP", "Operations System", "Internal Dashboard",
  "AI Automation", "Generative AI", "SEO", "Digital Marketing",
  "Team / Hiring opportunity", "Other / Not sure yet",
]
const BUDGET_RANGES = ["Under $2,500", "$2,500 – $5,000", "$5,000 – $15,000", "$15,000+", "Not sure yet"]
const EMPTY_FORM = { name: "", email: "", projectType: "", budget: "", message: "" }

function RollingText({ children }: { children: string }) {
  return <span className={styles.roll}><span>{children}</span><span aria-hidden="true">{children}</span></span>
}

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle")
  const submitLock = useRef(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHiring = form.projectType === "Team / Hiring opportunity"

  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current) }, [])
  useEffect(() => { if (submitted || formError) resultRef.current?.focus() }, [submitted, formError])

  const update = (name: keyof typeof EMPTY_FORM, value: string) => setForm((previous) => ({ ...previous, [name]: value }))
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(CONTACT_EMAIL); setCopyStatus("copied") }
    catch { setCopyStatus("failed") }
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyStatus("idle"), 3500)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitLock.current) return
    const validation = validateContactPayload({ ...form, budget: isHiring ? "" : form.budget })
    if (!validation.ok) { setFormError(validation.error); return }
    submitLock.current = true
    setFormError("")
    setLoading(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || result?.success !== true) {
        throw new Error(result?.error || `Your message could not be sent. Please email ${CONTACT_EMAIL} directly.`)
      }
      setSubmitted(true)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : `Please email ${CONTACT_EMAIL} directly.`)
    } finally { setLoading(false); submitLock.current = false }
  }

  return (
    <ContactMotion className={styles.page}>
      <section className={`${styles.hero} ${styles.container}`}>
        <div className={styles.heroCopy}>
          <h1 className={styles.title}>
            <span className={styles.titleLine}><span data-contact-line>Your next chapter.</span></span>
            <span className={`${styles.titleLine} ${styles.accentLine}`}><span data-contact-line>Let’s build it.</span></span>
          </h1>
          <p className={styles.lead}>A website that earns trust. A product ready to launch. AI that makes work easier. Tell me where you want to go — we’ll work out the next step together.</p>
          <a href="#enquiry" className={styles.textLink}><RollingText>Tell me about it</RollingText><ArrowDown size={18} aria-hidden="true" /></a>
        </div>
        <div className={styles.connection} aria-hidden="true" data-contact-connection>
          <svg viewBox="0 0 420 340" fill="none" className={styles.connectionLines}>
            <path className={styles.connectionBase} d="M30 75H195C285 75 330 120 330 190C330 260 285 305 215 305C145 305 100 260 100 190V145" />
            <path className={styles.connectionInner} d="M30 103H195C269 103 302 140 302 190C302 240 269 277 215 277C161 277 128 240 128 190V145" />
            <path className={styles.connectionFlow} d="M30 75H195C285 75 330 120 330 190C330 260 285 305 215 305C145 305 100 260 100 190V145" pathLength="100" />
            <circle cx="30" cy="75" r="5" className={styles.connectionPoint} />
            <path d="M88 157L100 145L112 157" className={styles.connectionArrow} />
          </svg>
          <span className={styles.connectionYou}>Your idea</span>
          <span className={styles.connectionMe}>My attention</span>
          <span className={styles.connectionSignature}>u.</span>
        </div>
        <div className={styles.heroRail}>
          <span className={styles.availability}><span className={styles.statusDot} />Open to projects & hiring conversations</span>
          <span><MapPin size={15} aria-hidden="true" />Pakistan · Working worldwide</span>
        </div>
      </section>

      <section id="enquiry" className={`${styles.enquiry} ${styles.container}`}>
        <aside className={styles.contactAside}>
          <h2 data-contact-reveal>A real conversation.<br />{" "}With the person<br />{" "}doing the work.</h2>
          <p>I’m Muhammad Ubaidullah. You’ll talk directly with me about your goals, your questions, and what it will take to build something useful.</p>
          <div className={styles.emailBlock}>
            <a className={`${styles.textLink} ${styles.emailLink}`} href={`mailto:${CONTACT_EMAIL}`}><RollingText>{CONTACT_EMAIL}</RollingText><ArrowUpRight size={20} aria-hidden="true" /></a>
            <button type="button" className={styles.copyButton} onClick={copyEmail} aria-label={copyStatus === "copied" ? "Email copied" : "Copy email address"}>{copyStatus === "copied" ? <Check size={17} /> : <Copy size={17} />}</button>
            <span role="status" className={styles.copyStatus}>{copyStatus === "copied" ? "Email copied" : copyStatus === "failed" ? "Select the email address to copy it." : ""}</span>
          </div>
          <div className={styles.directLinks}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.channel}><FaWhatsapp size={20} aria-hidden="true" /><RollingText>Chat on WhatsApp</RollingText><ArrowUpRight size={18} aria-hidden="true" /></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={styles.channel}><FaLinkedin size={19} aria-hidden="true" /><RollingText>Connect on LinkedIn</RollingText><ArrowUpRight size={18} aria-hidden="true" /></a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.channel}><FaGithub size={20} aria-hidden="true" /><RollingText>Explore my GitHub</RollingText><ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <dl className={styles.details}>
            <div><dt>Response time</dt><dd>I aim to reply within two business days.</dd></div>
            <div><dt>My timezone</dt><dd>Faisalabad, Pakistan · UTC+5</dd></div>
          </dl>
        </aside>

        <div className={styles.formPanel}>
          {submitted ? (
            <div ref={resultRef} tabIndex={-1} className={styles.success} role="status">
              <CheckCircle2 size={46} strokeWidth={1.25} aria-hidden="true" />
              <h2>Thanks for the introduction.</h2>
              <p>Your message has been sent. I’ll review what you shared and aim to reply to <strong>{form.email}</strong> within two business days.</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.textLink}><RollingText>Continue by email</RollingText><ArrowUpRight size={18} aria-hidden="true" /></a>
              <button type="button" className={styles.resetButton} onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-label="Project and hiring enquiry" aria-busy={loading}>
              <div className={styles.formHeading}><h2>What’s on your mind?</h2><p>A few details are enough to get started. Fields marked * are required.</p></div>
              <fieldset disabled={loading} className={styles.formFields}>
                <legend className="sr-only">Your enquiry</legend>
                <div className={styles.fieldRow}>
                  <div className={styles.field}><label htmlFor="contact-name">Your name <span>*</span></label><input id="contact-name" name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="How should I address you?" /></div>
                  <div className={styles.field}><label htmlFor="contact-email">Email address <span>*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" /></div>
                </div>
                <div className={styles.field}><label htmlFor="contact-interest">What can I help with? <span>*</span></label><div className={styles.selectWrap}><select id="contact-interest" name="projectType" required value={form.projectType} onChange={(event) => update("projectType", event.target.value)}><option value="" disabled>Select a service or hiring opportunity</option>{PROJECT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}</select><ChevronDown size={18} aria-hidden="true" /></div></div>
                {!isHiring && <fieldset className={styles.budget}><legend>Budget in USD <span>Optional</span></legend><div className={styles.budgetOptions}>{BUDGET_RANGES.map((range) => <label key={range} className={styles.budgetOption}><input type="radio" name="budget" value={range} checked={form.budget === range} onChange={() => update("budget", range)} /><span>{range}<Check size={13} aria-hidden="true" /></span></label>)}</div></fieldset>}
                <div className={styles.field}><label htmlFor="contact-message">{isHiring ? "Tell me about the role" : "Tell me a little about it"} <span>*</span></label><textarea id="contact-message" name="message" required maxLength={5000} rows={5} value={form.message} onChange={(event) => update("message", event.target.value)} aria-describedby="contact-message-hint" placeholder={isHiring ? "The team, the role, and what you’re looking for…" : "Your goal, what you need, and any timing or links you’d like to share…"} /><p id="contact-message-hint" className={styles.fieldHint}>A rough idea is welcome. You don’t need a finished brief.</p></div>
              </fieldset>
              {formError && <div ref={resultRef} tabIndex={-1} className={styles.formError} role="alert"><p>{formError}</p><a href={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20enquiry`}>Email me instead <ArrowUpRight size={15} aria-hidden="true" /></a></div>}
              <button className={styles.submit} type="submit" disabled={loading}>{loading ? <><LoaderCircle size={20} className={styles.spinner} aria-hidden="true" /><span>Sending your message…</span></> : <><RollingText>Send your enquiry</RollingText><span className={styles.submitArrow}><ArrowUpRight size={20} aria-hidden="true" /></span></>}</button>
              <p className={styles.formNote}><Mail size={14} aria-hidden="true" />Straight to my inbox. No commitment to get started.</p>
            </form>
          )}
        </div>
      </section>

      <section className={`${styles.next} ${styles.container}`} aria-labelledby="contact-next-heading" data-contact-next>
        <div className={styles.nextHeading}><h2 id="contact-next-heading" data-contact-reveal>What happens next.</h2><p>Clarity before commitment.</p></div>
        <ol className={styles.nextSteps}>
          <li><span className={styles.stepMarker}>1</span><h3>I read your message</h3><p>I look at your goals, context, and the questions that need answering.</p></li>
          <li><span className={styles.stepMarker}>2</span><h3>We talk it through</h3><p>We discuss the direction, what’s practical, and whether I’m the right fit.</p></li>
          <li><span className={styles.stepMarker}>3</span><h3>You get a clear next step</h3><p>For a project, we agree on scope and an estimate. For a role, we discuss your team’s needs.</p></li>
        </ol>
        <div className={styles.nextTrack} aria-hidden="true"><span data-contact-progress /></div>
      </section>
    </ContactMotion>
  )
}
