"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { ClipboardList, Globe, Package } from "lucide-react"
import Image from "next/image"

const EASE = [0.16, 1, 0.3, 1] as const

const VALUES = [
  {
    icon: Package,
    title: "One Point of Contact",
    desc: "The person who scopes the work also designs and builds the application.",
  },
  {
    icon: ClipboardList,
    title: "Clear Decisions",
    desc: "Workflows, data needs, and trade-offs are mapped before implementation begins.",
  },
  {
    icon: Globe,
    title: "Remote Collaboration",
    desc: "Based in Pakistan and set up for written updates and work across time zones.",
  },
]

const BADGES = [
  { label: "Open to Projects", color: "var(--accent-ink)", bg: "var(--accent-muted)" },
  { label: "Direct Collaboration", color: "var(--fg-sub)", bg: "var(--bg-card)" },
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
                  fontSize: "var(--type-meta-size)",
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
              fontSize: "var(--type-meta-size)",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent-ink)",
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
              className="type-section"
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{
                color: "var(--fg)",
                margin: 0,
              }}
            >
              A developer who learns the workflow first.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            <p
              style={{
                fontSize: "var(--type-body-size)",
                color: "var(--fg-muted)",
                lineHeight: 1.75,
                marginBottom: "1rem",
              }}
            >
              Hi, I&apos;m{" "}
              <span style={{ color: "var(--fg)", fontWeight: 500 }}>
                Muhammad Ubaidullah
              </span>{" "}
              — a full stack developer from Faisalabad, Pakistan. I build web
              applications for teams whose operations have outgrown disconnected
              tools and manual follow-ups.
            </p>
            <p
              style={{
                fontSize: "var(--type-body-size)",
                color: "var(--fg-muted)",
                lineHeight: 1.75,
                marginBottom: "1rem",
              }}
            >
              My work spans retail operations, school administration, restaurant
              service, and donor management. I start by understanding the people
              and process, then shape the software around both.
            </p>
            <p
              style={{
                fontSize: "var(--type-body-size)",
                color: "var(--fg-sub)",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
                fontWeight: 500,
              }}
            >
              You work directly with me from discovery through delivery.
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
                    color: "var(--accent-ink)",
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
