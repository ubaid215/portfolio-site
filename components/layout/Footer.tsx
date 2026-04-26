"use client"

/**
 * Footer.tsx
 *
 * Award-winning design characteristics:
 * - Large editorial display headline that reacts on hover
 * - Minimal, intentional — not a wall of links
 * - Accent underline reveals on hover for nav links
 * - Animated availability badge with pulse
 * - Social icons with staggered entrance via intersection observer
 * - Mobile-first: compact on small screens, expansive on large
 * - motion/react v12
 */

import Link from "next/link"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { ArrowUpRight, Mail } from "lucide-react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

/* ── Data ─────────────────────────────────────────────────────────── */
const FOOTER_LINKS = [
  { label: "Work",     href: "/work"     },
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Contact",  href: "/contact"  },
]

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/ubaid215",   icon: FaGithub   },
  { label: "LinkedIn", href: "https://linkedin.com/in/ubaidullah", icon: FaLinkedin },
  { label: "Email",    href: "mailto:hi@ubaid.dev",             icon: Mail     },
  { label: "Twitter",  href: "https://twitter.com/ubaidullah",  icon: FaTwitter  },
]

const EASE_LUXURY = [0.16, 1, 0.3, 1] as const

/* ── Sub-components ────────────────────────────────────────────────── */

// Hover-reveal underline link
function FooterNavLink({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href}>
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
        color: "var(--accent)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, delay, ease: EASE_LUXURY }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: "var(--radius-md)",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        color: "var(--fg-muted)",
        cursor: "pointer",
        textDecoration: "none",
        flexShrink: 0,
      }}
      className="social-btn"
    >
       <Icon size={16} />
    </motion.a>
  )
}

/* ── Main Footer ──────────────────────────────────────────────────── */
export function Footer() {
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

        {/* ── Top: CTA headline ──────────────────────────────────── */}
        <div
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
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "1rem",
            }}
          >
            ▸ Available for remote roles &amp; freelance
          </motion.p>

          {/* Large display headline */}
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              data-framer-motion
              initial={{ y: "105%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: EASE_LUXURY }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "var(--fg)",
                marginBottom: "1.5rem",
              }}
            >
              Let&apos;s build something{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                real.
              </span>
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
              Full-time remote roles, contracts, or serious freelance projects. Response within 24&nbsp;hours.
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
                  color: "#0A0E1A",
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
        </div>

        {/* ── Middle: Nav + Social ────────────────────────────────── */}
        <div
          style={{
            paddingTop: "2.5rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Brand col */}
          <div>
            <Link href="/" style={{ textDecoration: "none" }}>
              <motion.span
                data-framer-motion
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "1.375rem",
                  color: "var(--accent)",
                  letterSpacing: "-0.01em",
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
              Full Stack Developer.<br />
              Building products that ship.
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
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: "var(--accent)",
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
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-faint)",
              marginBottom: "1rem",
              margin: "0 0 1rem",
            }}>
              Navigation
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
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
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-faint)",
              margin: "0 0 1rem",
            }}>
              Connect
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
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
        <div
          style={{
            paddingTop: "1.25rem",
            paddingBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p style={{
            fontSize: "0.8125rem",
            color: "var(--fg-faint)",
            margin: 0,
          }}>
            © {year} Muhammad Ubaidullah. All rights reserved.
          </p>

          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--fg-faint)",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}>
            Designed &amp; built by
            <span style={{ color: "var(--accent)", fontStyle: "normal" }}>
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
        background-color: var(--accent-bright);
      }
    `}</style>
    </>
  )
}