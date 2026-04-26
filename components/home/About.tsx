"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { Zap, Globe, Package } from "lucide-react"
import Image from "next/image"

const EASE = [0.16, 1, 0.3, 1] as const

const VALUES = [
  {
    icon: Package,
    title: "Ships, Doesn't Just Start",
    desc: "Every project I take on reaches production. 5 apps live. No abandoned repos.",
  },
  {
    icon: Zap,
    title: "AI-Augmented Speed",
    desc: "I use the best AI tooling — Cursor, Claude, Copilot — to move 2× faster without cutting corners.",
  },
  {
    icon: Globe,
    title: "Remote-Ready",
    desc: "Built for async collaboration. Clear communication, documented code, global-friendly timezones.",
  },
]

const BADGES = [
  { label: "Open to Remote", color: "var(--accent)", bg: "var(--accent-muted)" },
  { label: "3+ yrs exp", color: "var(--fg-sub)", bg: "var(--bg-card)" },
  { label: "Faisalabad, PK 🇵🇰", color: "var(--fg-muted)", bg: "var(--bg-card)" },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      id="about"
      style={{
        padding: "clamp(4rem, 10vw, 7rem) 1.5rem",
        background: "var(--bg-sub)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "clamp(3rem, 6vw, 5rem)",
          alignItems: "start",
        }}
      >
        {/* Left: Visual block */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ position: "relative" }}
        >
          {/* Photo with teal glow frame */}
          <div
            style={{
              position: "relative",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              aspectRatio: "4 / 5",
              background: "var(--bg-card)",
              border: "1px solid var(--border-sub)",
              boxShadow: "0 0 48px rgba(0,217,166,0.10), var(--shadow-xl)",
            }}
          >
            {/* Accent corner accents */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 60,
                height: 60,
                borderTop: "2px solid var(--accent)",
                borderLeft: "2px solid var(--accent)",
                borderRadius: "var(--radius-xl) 0 0 0",
                zIndex: 2,
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 60,
                height: 60,
                borderBottom: "2px solid var(--accent)",
                borderRight: "2px solid var(--accent)",
                borderRadius: "0 0 var(--radius-xl) 0",
                zIndex: 2,
              }}
            />

            {/* Profile Image */}
            <Image
              src="/images/professional-img.png"
              alt="Muhammad Ubaidullah - Full Stack Developer"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            {/* Subtle gradient overlay for better depth */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.2) 100%)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Decorative mesh overlay */}
            <div
              aria-hidden
              className="bg-dot-grid"
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.15,
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          </div>

          {/* Floating badges */}
          <div
            style={{
              position: "absolute",
              bottom: "-1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.5rem",
              width: "calc(100% + 2rem)",
              zIndex: 3,
            }}
          >
            {BADGES.map(({ label, color, bg }) => (
              <span
                key={label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.35rem 0.75rem",
                  borderRadius: 9999,
                  border: "1px solid var(--border-sub)",
                  background: bg,
                  color,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                  backdropFilter: "blur(8px)",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right: Copy */}
        <div style={{ paddingTop: "0.5rem" }}>
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
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "2rem",
                height: "1px",
                background: "var(--accent)",
              }}
            />
            About Me
          </motion.p>

          <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
                margin: 0,
              }}
            >
              The Developer Who Ships,
              <br />
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Not Just Starts.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--fg-muted)",
                lineHeight: 1.75,
                marginBottom: "1rem",
              }}
            >
              Hi, I&apos;m{" "}
              <span style={{ color: "var(--fg)", fontWeight: 500 }}>
                Muhammad Ubaidullah
              </span>{" "}
              — a full stack developer from Faisalabad, Pakistan, building
              production-grade web applications for clients worldwide. I&apos;ve
              shipped 5 real-world products solo, from complex POS systems to
              multi-portal school management platforms.
            </p>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--fg-muted)",
                lineHeight: 1.75,
                marginBottom: "1rem",
              }}
            >
              I work at the intersection of modern web engineering and AI-assisted
              development — using the best tools available to deliver fast, clean,
              maintainable code without the overhead of a full agency.
            </p>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--fg-sub)",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
                fontStyle: "italic",
              }}
            >
              If you need a developer who treats your product like their own
              business — I&apos;m your person.
            </p>
          </motion.div>

          {/* Value props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-md)",
                    background: "var(--accent-muted)",
                    border: "1px solid rgba(0,217,166,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      color: "var(--fg)",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--fg-muted)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}