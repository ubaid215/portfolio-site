"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import { ArrowUpRight, Clock, MapPin, Wifi, Mail, MessageSquare } from "lucide-react"
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa"

const EASE = [0.16, 1, 0.3, 1] as const

const PROJECT_TYPES = [
  "Full Stack Web App",
  "Next.js / React Frontend",
  "API & Backend Engineering",
  "CMS / Admin Dashboard",
  "Database Design",
  "Other / Not sure yet",
]

const BUDGET_RANGES = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Let's discuss",
]

const QUICK_INFO = [
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    note: "Usually much faster",
  },
  {
    icon: MapPin,
    label: "Timezone",
    value: "PKT — UTC+5",
    note: "Faisalabad, Pakistan",
  },
  {
    icon: Wifi,
    label: "Availability",
    value: "Open to remote",
    note: "Full-time & freelance",
  },
]

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/ubaidullah-mernstack-developer", icon: FaLinkedin, handle: "/in/ubaidullah" },
  { label: "GitHub", href: "https://github.com/ubaid215", icon: FaGithub, handle: "github.com/ubaid215" },
  { label: "Email", href: "mailto:hi@ubaid.dev", icon: Mail, handle: "hi@ubaid.dev" },
  { label: "WhatsApp", href: "https://wa.me/923174506339", icon: FaWhatsapp, handle: "+92 317 450 6339" },
]

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(formRef, { once: true, margin: "-80px" })

  const [formState, setFormState] = useState({
    name: "", email: "", projectType: "", budget: "", message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

 const handleSubmit = async (e: React.MouseEvent) => {
  e.preventDefault()
  setLoading(true)
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    })
    if (!res.ok) throw new Error()
    setSubmitted(true)
  } catch {
    alert("Something went wrong. Email me directly at ubaidtech274@gmail.com")
  } finally {
    setLoading(false)
  }
}

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          padding: "8rem 1.5rem 5rem",
          background: "var(--bg)",
          overflow: "hidden",
        }}
      >
        <div aria-hidden className="bg-dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none" }} />
        <div aria-hidden style={{
          position: "absolute", bottom: "10%", right: "8%",
          width: "clamp(240px, 30vw, 440px)", height: "clamp(240px, 30vw, 440px)",
          borderRadius: "50%", background: "var(--accent-muted)", filter: "blur(100px)",
          pointerEvents: "none", animation: "glowPulse 9s ease-in-out infinite reverse",
        }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)",
              marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: "2rem", height: "1px", background: "var(--accent)" }} />
            Contact
          </motion.p>

          <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem, 8vw, 6rem)",
                fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em",
                color: "var(--fg)", margin: 0,
              }}
            >
              Let&apos;s build something
              <br />
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                great together.
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "var(--fg-muted)", lineHeight: 1.75, maxWidth: "52ch",
            }}
          >
            Open to remote full-time roles and serious freelance contracts.
            Tell me what you&apos;re building — I&apos;ll tell you if I can help.
          </motion.p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section
        style={{
          padding: "clamp(4rem, 10vw, 7rem) 1.5rem",
          background: "var(--bg-sub)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div
          ref={formRef}
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "clamp(3rem, 6vw, 5rem)",
            alignItems: "start",
          }}
        >
          {/* Left: Quick info + social */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Availability badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 1rem",
                borderRadius: 9999,
                background: "var(--accent-muted)",
                border: "1px solid rgba(0,217,166,0.2)",
                width: "fit-content",
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "var(--accent)", display: "inline-block",
                animation: "pulse 2s ease infinite",
              }} />
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 500,
                color: "var(--accent)", letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                Currently Available
              </span>
            </div>

            {/* Quick info cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {QUICK_INFO.map(({ icon: Icon, label, value, note }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08 }}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    padding: "1.125rem 1.25rem",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-card)",
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: "var(--radius-md)",
                    background: "var(--accent-muted)", border: "1px solid rgba(0,217,166,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--accent)", flexShrink: 0,
                  }}>
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--fg-faint)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.2rem" }}>
                      {label}
                    </p>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--fg)", margin: "0 0 0.125rem" }}>
                      {value}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--fg-muted)", margin: 0 }}>{note}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Note */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              style={{
                padding: "1.25rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-sub)",
                background: "var(--bg)",
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <MessageSquare size={15} strokeWidth={1.75} style={{ color: "var(--fg-faint)", flexShrink: 0, marginTop: "2px" }} />
                <p style={{ fontSize: "0.8125rem", color: "var(--fg-muted)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
                  Currently open to remote full-time roles and freelance contracts. If you&apos;ve got a real project, let&apos;s talk.
                </p>
              </div>
            </motion.div>

            {/* Social links */}
            <div>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.625rem", fontWeight: 500,
                letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)",
                marginBottom: "1rem",
              }}>
                Find me on
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {SOCIAL_LINKS.map(({ label, href, icon: Icon, handle }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.45 + i * 0.07 }}
                    className="social-link"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.875rem",
                      padding: "0.875rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-card)",
                      textDecoration: "none",
                      transition: "border-color 0.2s ease, background-color 0.2s ease",
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={16} style={{ color: "var(--fg-muted)", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--fg)", display: "block" }}>{label}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--fg-faint)" }}>{handle}</span>
                    </div>
                    <ArrowUpRight size={13} strokeWidth={2} style={{ color: "var(--fg-faint)" }} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{
                  padding: "3rem 2rem",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid rgba(0,217,166,0.3)",
                  background: "var(--accent-muted)",
                  textAlign: "center",
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "var(--accent)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}>
                  <span style={{ fontSize: "1.5rem" }}>✓</span>
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: "1.75rem",
                  fontWeight: 400, color: "var(--fg)", margin: "0 0 0.75rem",
                }}>
                  Message sent.
                </h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--fg-muted)", lineHeight: 1.7 }}>
                  I&apos;ll be in touch within 24 hours. If it&apos;s urgent,
                  reach me directly at{" "}
                  <a href="mailto:ubaidtech274@gmail.com" style={{ color: "var(--accent)", fontWeight: 500 }}>
                    ubaidtech274@gmail.com
                  </a>
                  .
                </p>
              </motion.div>
            ) : (
              <div
                style={{
                  padding: "2.5rem",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <p style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 500,
                    letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)",
                    marginBottom: "0.5rem",
                  }}>
                    ▸ Send a message
                  </p>
                  <h2 style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.02em",
                    color: "var(--fg)", margin: 0,
                  }}>
                    Tell me about
                    <span style={{ fontStyle: "italic", color: "var(--accent)" }}> your project.</span>
                  </h2>
                </div>

                {/* Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)" }}>
                      Name *
                    </label>
                    <input
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="form-input"
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-sub)",
                        background: "var(--bg-sub)",
                        color: "var(--fg)",
                        fontSize: "0.875rem",
                        outline: "none",
                        width: "100%",
                        fontFamily: "var(--font-body)",
                        transition: "border-color 0.2s ease",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)" }}>
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="form-input"
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-sub)",
                        background: "var(--bg-sub)",
                        color: "var(--fg)",
                        fontSize: "0.875rem",
                        outline: "none",
                        width: "100%",
                        fontFamily: "var(--font-body)",
                        transition: "border-color 0.2s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Project type */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)" }}>
                    Project Type *
                  </label>
                  <select
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleChange}
                    className="form-input"
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-sub)",
                      background: "var(--bg-sub)",
                      color: formState.projectType ? "var(--fg)" : "var(--fg-faint)",
                      fontSize: "0.875rem",
                      outline: "none",
                      width: "100%",
                      fontFamily: "var(--font-body)",
                      cursor: "pointer",
                      appearance: "none",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    <option value="" disabled>Select a project type…</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} style={{ background: "var(--bg-card)", color: "var(--fg)" }}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)" }}>
                    Budget Range
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {BUDGET_RANGES.map((range) => (
                      <button
                        key={range}
                        onClick={() => setFormState((p) => ({ ...p, budget: range }))}
                        style={{
                          padding: "0.4rem 0.875rem",
                          borderRadius: 9999,
                          border: `1px solid ${formState.budget === range ? "var(--accent)" : "var(--border-sub)"}`,
                          background: formState.budget === range ? "var(--accent-muted)" : "transparent",
                          color: formState.budget === range ? "var(--accent)" : "var(--fg-muted)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)" }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Describe your project — what it does, what you need, and when you need it by."
                    rows={5}
                    className="form-input"
                    style={{
                      padding: "0.875rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-sub)",
                      background: "var(--bg-sub)",
                      color: "var(--fg)",
                      fontSize: "0.875rem",
                      outline: "none",
                      width: "100%",
                      fontFamily: "var(--font-body)",
                      lineHeight: 1.65,
                      resize: "vertical",
                      minHeight: "120px",
                      transition: "border-color 0.2s ease",
                    }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={loading || !formState.name || !formState.email || !formState.projectType || !formState.message}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.45rem",
                    padding: "0.9375rem 2rem",
                    borderRadius: 9999,
                    background: "var(--accent)",
                    color: "#0A0E1A",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "none",
                    width: "100%",
                    opacity: loading || !formState.name || !formState.email || !formState.projectType || !formState.message ? 0.6 : 1,
                    transition: "opacity 0.2s ease, background-color 0.2s ease",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: 14, height: 14, border: "2px solid rgba(10,14,26,0.3)",
                          borderTopColor: "#0A0E1A", borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                          display: "inline-block",
                        }}
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight size={15} strokeWidth={2.5} />
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <style>{`
        .form-input::placeholder { color: var(--fg-faint); }
        .form-input:focus { border-color: rgba(0, 217, 166, 0.4); box-shadow: 0 0 0 3px rgba(0, 217, 166, 0.08); }
        .social-link:hover { border-color: var(--border-strong); background-color: var(--bg-card-hover); }
      `}</style>
    </>
  )
}