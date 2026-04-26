"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "Zustand"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "NestJS", "REST API", "WebSocket", "BullMQ", "JWT Auth"],
  },
  {
    label: "Database & Infra",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "AWS S3", "Cloudinary"],
  },
  {
    label: "AI-Powered Dev",
    skills: ["Cursor", "Claude", "Copilot", "Prompt Engineering", "Vibe Coding", "v0"],
  },
]

const STAT_ITEMS = [
  { value: "5", label: "Production Apps" },
  { value: "3+", label: "Years Building" },
  { value: "100%", label: "Delivery Rate" },
  { value: "24h", label: "Avg. Response" },
]

export function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      id="skills"
      style={{
        padding: "clamp(4rem, 10vw, 7rem) 1.5rem",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ marginBottom: "3.5rem" }}>
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
            <span style={{ display: "inline-block", width: "2rem", height: "1px", background: "var(--accent)" }} />
            Skills Arsenal
          </motion.p>

          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
                margin: 0,
              }}
            >
              My{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Technical Arsenal
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1px",
            background: "var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            marginBottom: "3rem",
            border: "1px solid var(--border)",
          }}
        >
          {STAT_ITEMS.map(({ value, label }) => (
            <div
              key={label}
              style={{
                padding: "1.5rem 1.25rem",
                background: "var(--bg-card)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  color: "var(--accent)",
                  margin: "0 0 0.25rem",
                  lineHeight: 1,
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--fg-faint)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: 0,
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Skill categories grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "1rem",
          }}
        >
          {SKILL_CATEGORIES.map(({ label, skills }, catIdx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.3 + catIdx * 0.08 }}
              style={{
                padding: "1.5rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
              }}
            >
              {/* Category label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.125rem",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  {label}
                </span>
              </div>

              {/* Skill pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      ease: EASE,
                      delay: 0.4 + catIdx * 0.08 + skillIdx * 0.04,
                    }}
                    className="skill-pill"
                    style={{
                      display: "inline-flex",
                      padding: "0.3rem 0.75rem",
                      borderRadius: 9999,
                      border: "1px solid var(--border-sub)",
                      background: "var(--bg-sub)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--fg-sub)",
                      cursor: "default",
                      transition: "border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .skill-pill:hover {
          border-color: rgba(0, 217, 166, 0.35);
          color: var(--accent);
          background-color: var(--accent-muted);
        }
      `}</style>
    </section>
  )
}