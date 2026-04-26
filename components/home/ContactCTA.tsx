"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"

const EASE = [0.16, 1, 0.3, 1] as const

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ubaidullah",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/ubaidullah",
    icon: FaGithub,
  },
]

export function ContactCTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        padding: "clamp(4rem, 10vw, 7rem) 1.5rem",
        background: "var(--bg-sub)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          background: "var(--accent-muted)",
          filter: "blur(100px)",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "1.5rem",
          }}
        >
          ▸ Let&apos;s Work Together
        </motion.p>

        {/* Headline */}
        <div style={{ overflow: "hidden", marginBottom: "1.25rem" }}>
          <motion.h2
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
              margin: 0,
            }}
          >
            Have a project? Let&apos;s
            <br />
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
              build something real.
            </span>
          </motion.h2>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          style={{
            fontSize: "1rem",
            color: "var(--fg-muted)",
            lineHeight: 1.7,
            maxWidth: "44ch",
            margin: "0 auto 2.5rem",
          }}
        >
          I&apos;m open to full-time remote roles, contract work, and serious
          freelance projects. Response within 24 hours.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
        >
          {/* Primary: Email */}
          <Link href="mailto:hi@ubaid.dev" style={{ textDecoration: "none" }}>
            <motion.span
              className="contact-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.875rem 2rem",
                borderRadius: 9999,
                background: "var(--accent)",
                color: "#0A0E1A",
                fontSize: "0.9375rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <Mail size={16} strokeWidth={2} />
              Email Me
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </motion.span>
          </Link>

          {/* Social links */}
          {SOCIAL.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <motion.span
                className="contact-social"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.875rem 1.5rem",
                  borderRadius: 9999,
                  border: "1px solid var(--border-sub)",
                  background: "transparent",
                  color: "var(--fg-sub)",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "border-color 0.2s ease, color 0.2s ease",
                }}
                whileHover={{ scale: 1.04, borderColor: "var(--border-strong)", color: "var(--fg)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <Icon size={16} />
                {label}
              </motion.span>
            </Link>
          ))}
        </motion.div>

        {/* Availability strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1rem",
            borderRadius: 9999,
            background: "var(--accent-muted)",
            border: "1px solid rgba(0,217,166,0.2)",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
              animation: "pulse 2s ease infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "var(--accent)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Currently available · PKT / GMT+5
          </span>
        </motion.div>
      </div>

      <style>{`
        .contact-primary { transition: background-color 0.2s cubic-bezier(0.16,1,0.3,1); }
        .contact-primary:hover { background-color: var(--accent-bright); }
        .contact-social { transition: background-color 0.2s cubic-bezier(0.16,1,0.3,1); }
        .contact-social:hover { background-color: var(--bg-card); }
      `}</style>
    </section>
  )
}