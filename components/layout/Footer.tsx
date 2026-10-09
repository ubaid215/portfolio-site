"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { ArrowUpRight, Mail } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site"
import styles from "./Footer.module.css"

/* ── Data ─────────────────────────────────────────────────────────── */
const FOOTER_LINKS = [
  { label: "Work",     href: "/work"     },
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Contact",  href: "/contact"  },
]

const SOCIAL_LINKS = [
  { label: "GitHub",   href: GITHUB_URL, icon: FaGithub },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: FaLinkedin },
  { label: "Email",    href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
]

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const

/* ── Sub-components ────────────────────────────────────────────────── */

// Hover-reveal underline link
function FooterNavLink({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} className={styles.navLink}>
      <motion.span
        data-framer-motion
        style={{
          position: "relative",
          display: "inline-block",
          fontSize: "0.9rem",
          color: "var(--fg-muted)",
          cursor: "pointer",
          paddingBottom: "2px",
        }}
        whileHover={{ color: "var(--fg)" }}
        transition={{ duration: 0.2 }}
      >
        {label}
        <motion.span
          data-framer-motion
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "var(--accent)",
            originX: 0,
            scaleX: 0,
          }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: EASE_LUXURY }}
        />
      </motion.span>
    </Link>
  )
}

// Social icon button
function SocialButton({
  href, label, Icon, delay,
}: {
  href: string
  label: string
  Icon: React.ComponentType<{ size?: number }> 
  delay: number
}) {
  return (
    <motion.a
      data-framer-motion
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.08,
        borderColor: "var(--accent)",
        color: "var(--accent-ink)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, delay, ease: EASE_LUXURY }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-md)",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        color: "var(--fg-muted)",
        cursor: "pointer",
        textDecoration: "none",
        flexShrink: 0,
      }}
      className={`${styles.socialButton} social-btn`}
    >
      <span className={styles.socialIcon} aria-hidden="true"><Icon size={16} /></span>
      <span className={styles.socialLabel}>{label}</span>
    </motion.a>
  )
}

/* ── Main Footer ──────────────────────────────────────────────────── */
export function Footer() {
  const pathname = usePathname()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const year = new Date().getFullYear()

  return (
    <>
      <footer
        ref={ref}
        style={{
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid var(--border)",
          background: "var(--bg-sub)",
        }}
      >
      {/* Decorative accent glow — top-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "-5%",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background: "var(--accent-muted)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >

        {/* The homepage already ends with its own contact invitation. */}
        {pathname !== "/" && <div
          style={{
            paddingTop: "clamp(3rem, 8vw, 5rem)",
            paddingBottom: "clamp(2rem, 5vw, 3.5rem)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {/* Eyebrow */}
          <motion.p
            data-framer-motion
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_LUXURY }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-meta-size)",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent-ink)",
              marginBottom: "1rem",
            }}
          >
            Have something in mind?
          </motion.p>

          {/* Large display headline */}
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              className="type-page"
              data-framer-motion
              initial={{ y: "105%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: EASE_LUXURY }}
              style={{
                color: "var(--fg)",
                marginBottom: "1.5rem",
              }}
            >
              Good work starts with a conversation.
            </motion.h2>
          </div>

          {/* Sub-copy + CTA row */}
          <motion.div
            data-framer-motion
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE_LUXURY }}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <p style={{
              fontSize: "clamp(0.9rem, 2vw, 1.0625rem)",
              color: "var(--fg-muted)",
              lineHeight: 1.6,
              maxWidth: "36ch",
              margin: 0,
            }}>
              Share your idea, your biggest challenge, or the role you&apos;re hiring for. Let&apos;s see where I can help.
            </p>

            <Link href="/contact" style={{ textDecoration: "none", flexShrink: 0 }}>
              <motion.span
                data-framer-motion
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: 9999,
                  background: "var(--accent)",
                  color: "var(--accent-text)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE_LUXURY }}
                className="footer-cta-btn"
              >
                Start a conversation
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </motion.span>
            </Link>
          </motion.div>
        </div>}

        {/* ── Middle: Nav + Social ────────────────────────────────── */}
        <div className={styles.footerGrid}>
          {/* Brand col */}
          <div className={styles.brand}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <motion.span
                data-framer-motion
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.375rem",
                  color: "var(--accent-ink)",
                  letterSpacing: "-0.03em",
                  marginBottom: "0.625rem",
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                ubaid.dev
              </motion.span>
            </Link>
            <p style={{
              fontSize: "0.8125rem",
              color: "var(--fg-muted)",
              lineHeight: 1.6,
              maxWidth: "22ch",
              margin: 0,
            }}>
              Independent developer.<br />
              Websites, products &amp; AI.
            </p>

            {/* Availability badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1rem",
                padding: "0.3rem 0.75rem",
                borderRadius: 9999,
                background: "var(--accent-muted)",
                border: "1px solid rgba(0,217,166,0.20)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                  animation: "pulse 2s ease infinite",
                }}
              />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-meta-size)",
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: "var(--accent-ink)",
                textTransform: "uppercase",
              }}>
                Open to work
              </span>
            </div>
          </div>

          {/* Nav links col */}
          <div>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-meta-size)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-faint)",
              marginBottom: "1rem",
              margin: "0 0 1rem",
            }}>
              Navigation
            </p>
            <ul className={styles.navigationList}>
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <FooterNavLink label={label} href={href} />
                </li>
              ))}
            </ul>
          </div>

          {/* Social col */}
          <div>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-meta-size)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-faint)",
              margin: "0 0 1rem",
            }}>
              Connect
            </p>
            <div className={styles.socialList}>
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }, i) => (
                <SocialButton
                  key={label}
                  href={href}
                  label={label}
                  Icon={Icon}
                  delay={0.3 + i * 0.07}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom: copyright row ───────────────────────────────── */}
        <div className={styles.bottomRow}>
          <p style={{
            fontSize: "0.8125rem",
            color: "var(--fg-faint)",
            margin: 0,
            lineHeight: 1.6,
          }}>
            © {year} Muhammad Ubaidullah. All rights reserved.
          </p>

          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-meta-size)",
            color: "var(--fg-faint)",
            margin: 0,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.35rem",
          }}>
            Designed &amp; built by
            <span style={{ color: "var(--accent-ink)", fontStyle: "normal" }}>
              ubaid.dev
            </span>
          </p>
        </div>

      </div>
    </footer>

    <style>{`
      /* Social icon buttons — bg on hover via CSS (Motion can't animate CSS vars for bg) */
      .social-btn {
        transition: background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .social-btn:hover {
        background-color: var(--accent-muted);
      }

      /* Footer CTA button — brightens on hover */
      .footer-cta-btn {
        transition: background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .footer-cta-btn:hover {
        background-color: var(--accent-hover);
      }
    `}</style>
    </>
  )
}
