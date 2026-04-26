"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Link from "next/link"
import { ArrowUpRight, Terminal, Zap, Shield, Code2 } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

const TIMELINE = [
  {
    year: "2021",
    title: "First Line, First Fire",
    desc: "Wrote my first React component at 2 AM with a broken laptop fan and zero mentors. The code was terrible. I shipped it anyway. That stubbornness never left.",
  },
  {
    year: "2022",
    title: "First Real Client",
    desc: "A local retail business needed a custom inventory system. No template could do what they needed. I built it from scratch — database schema, backend, dashboard, all of it. They're still running it today.",
  },
  {
    year: "2023",
    title: "Going Full Stack",
    desc: "Moved from 'frontend developer who knows a bit of Node' to a developer who could architect entire platforms. NestJS, PostgreSQL, Prisma — the backend became as natural as JSX.",
  },
  {
    year: "2024",
    title: "AI-Augmented, Not Replaced",
    desc: "When Cursor and Claude arrived, I didn't fear them — I weaponized them. Started shipping at 2× speed without cutting corners. Clients got more. I worked smarter.",
  },
  {
    year: "2025",
    title: "5 Products. All in Production.",
    desc: "School systems, POS platforms, donation managers, e-commerce engines — all live, all running real transactions for real users. No side projects. No abandoned repos.",
  },
]

const PRINCIPLES = [
  {
    icon: Shield,
    number: "01",
    title: "Ship Fast. Ship Right.",
    desc: "Speed without quality is just debt with better packaging. I move fast because I've built the same mistakes before — I don't repeat them. Every codebase I touch is one a future developer can actually read.",
  },
  {
    icon: Code2,
    number: "02",
    title: "Solve the Business Problem, Not the Code Problem.",
    desc: "Most developers optimize for technical elegance. I optimize for business outcomes. Sometimes the right architecture is the boring one. The goal is a product that works, not a codebase that wins awards.",
  },
  {
    icon: Zap,
    number: "03",
    title: "AI Tools Aren't Cheating — They're Leverage.",
    desc: "I use Cursor, Claude, and Copilot the way a carpenter uses power tools. It doesn't make the craft less real. It means I can take on more complex problems and deliver them faster than a team twice my size.",
  },
]

const WORKFLOW_STEPS = [
  { step: "01", label: "Discover", detail: "Deep-dive into your business logic before touching code" },
  { step: "02", label: "Architect", detail: "Schema, API contracts, and component tree — planned first" },
  { step: "03", label: "Build", detail: "Feature by feature, with AI tooling accelerating every layer" },
  { step: "04", label: "Review", detail: "Self-review like a senior engineer would review my own PR" },
  { step: "05", label: "Ship", detail: "Deployed, documented, and handed off cleanly" },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
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
      {children}
    </p>
  )
}

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const storyInView = useInView(storyRef, { once: true, margin: "-80px" })
  const workInView = useInView(workRef, { once: true, margin: "-80px" })
  const principlesInView = useInView(principlesRef, { once: true, margin: "-80px" })
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" })

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
        <div
          aria-hidden
          style={{
            position: "absolute", top: "20%", right: "10%",
            width: "clamp(240px, 30vw, 420px)", height: "clamp(240px, 30vw, 420px)",
            borderRadius: "50%", background: "var(--accent-muted)", filter: "blur(100px)",
            pointerEvents: "none", animation: "glowPulse 8s ease-in-out infinite",
          }}
        />

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
            About
          </motion.p>

          <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em",
                color: "var(--fg)", margin: 0,
              }}
            >
              The Human
              <br />
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Behind the Code.
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "var(--fg-muted)", lineHeight: 1.75, maxWidth: "54ch",
            }}
          >
            Not just what I build — but how I think, why I build the way I do,
            and what it&apos;s actually like to work with me.
          </motion.p>
        </div>
      </section>

      {/* ── My Story ── */}
      <section
        style={{
          padding: "clamp(4rem, 10vw, 7rem) 1.5rem",
          background: "var(--bg-sub)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div ref={storyRef} style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <SectionLabel>My Story</SectionLabel>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
              gap: "clamp(3rem, 6vw, 5rem)",
              alignItems: "start",
            }}
          >
            {/* Left col */}
            <div>
              <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={storyInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                    fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.02em",
                    color: "var(--fg)", margin: 0,
                  }}
                >
                  From Faisalabad
                  <br />
                  <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                    to Global Clients.
                  </span>
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
                style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}
              >
                <p style={{ fontSize: "0.9375rem", color: "var(--fg-muted)", lineHeight: 1.75 }}>
                  I grew up in Faisalabad, Pakistan — a city of textile mills and tradespeople who
                  understand that real work gets done in the factory, not the boardroom. That ethic
                  got into my blood before I ever wrote a line of code.
                </p>
                <p style={{ fontSize: "0.9375rem", color: "var(--fg-muted)", lineHeight: 1.75 }}>
                  I didn&apos;t have a bootcamp. I didn&apos;t have a mentor. I had YouTube, Stack
                  Overflow, and a stubborn refusal to leave a problem unsolved. Three years later,
                  I&apos;ve shipped 5 production applications for real clients — solo.
                </p>
                <p style={{ fontSize: "0.9375rem", color: "var(--fg-sub)", lineHeight: 1.75, fontStyle: "italic" }}>
                  Not prototypes. Not MVPs that never saw users. Real systems with real data,
                  real transactions, and clients who still call me when something needs to change.
                </p>
                <p style={{ fontSize: "0.9375rem", color: "var(--fg-muted)", lineHeight: 1.75 }}>
                  Today I work with clients across time zones — UK, US, Gulf markets — building
                  the kind of software that used to require a full agency. I&apos;m one person,
                  but I move like a team because I&apos;ve learned to work with the best tools
                  in the world.
                </p>
              </motion.div>
            </div>

            {/* Right col — stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                { label: "Based in", value: "Faisalabad, Pakistan 🇵🇰" },
                { label: "Experience", value: "3+ Years of Production Code" },
                { label: "Projects Shipped", value: "5 Apps, All Live" },
                { label: "Availability", value: "Open to Remote · GMT+5" },
                { label: "Stack of choice", value: "Next.js · NestJS · PostgreSQL" },
              ].map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={storyInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.07 }}
                  style={{
                    padding: "1.125rem 1.25rem",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-card)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--fg-faint)", textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0 }}>
                    {label}
                  </span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--fg)", textAlign: "right" }}>
                    {value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How I Work ── */}
      <section
        style={{
          padding: "clamp(4rem, 10vw, 7rem) 1.5rem",
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div ref={workRef} style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={workInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <SectionLabel>How I Work</SectionLabel>
          </motion.div>

          <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
            <motion.h2
              initial={{ y: "105%" }}
              animate={workInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
                color: "var(--fg)", margin: "0 0 1rem",
              }}
            >
              Solo Developer + AI Tools ={" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Agency Output.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={workInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.75, maxWidth: "58ch", marginBottom: "3.5rem" }}
          >
            Working alone doesn&apos;t mean working slowly. I&apos;ve built a system — tools, processes,
            and habits — that lets me move at a pace most agencies envy.
          </motion.p>

          {/* Workflow steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {WORKFLOW_STEPS.map(({ step, label, detail }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -24 }}
                animate={workInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.08 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "5rem 1fr",
                  gap: "1.5rem",
                  alignItems: "start",
                  padding: "1.75rem 0",
                  borderBottom: "1px solid var(--border)",
                  position: "relative",
                }}
              >
                {/* Vertical connector */}
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: "2.25rem",
                      top: "3.5rem",
                      bottom: 0,
                      width: "1px",
                      background: "linear-gradient(to bottom, var(--accent), transparent)",
                      opacity: 0.3,
                    }}
                  />
                )}

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    border: "1px solid rgba(0,217,166,0.3)",
                    background: "var(--accent-muted)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--accent)", fontWeight: 500 }}>
                      {step}
                    </span>
                  </div>
                </div>

                <div style={{ paddingTop: "0.625rem" }}>
                  <h3 style={{ fontSize: "1.0625rem", fontWeight: 500, color: "var(--fg)", margin: "0 0 0.375rem" }}>
                    {label}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>
                    {detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI tools note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={workInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            style={{
              marginTop: "2.5rem",
              padding: "1.5rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(0,217,166,0.2)",
              background: "var(--accent-muted)",
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <Terminal size={18} strokeWidth={1.5} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--fg)", margin: "0 0 0.375rem" }}>
                AI-Integrated Workflow
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>
                I use <span style={{ color: "var(--accent)", fontWeight: 500 }}>Cursor</span>,{" "}
                <span style={{ color: "var(--accent)", fontWeight: 500 }}>Claude</span>, and{" "}
                <span style={{ color: "var(--accent)", fontWeight: 500 }}>GitHub Copilot</span> as
                active collaborators — not autocomplete. I prompt-engineer like a senior engineer
                reviews code. The output is still mine. The speed is 2×.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What I Believe ── */}
      <section
        style={{
          padding: "clamp(4rem, 10vw, 7rem) 1.5rem",
          background: "var(--bg-sub)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div ref={principlesRef} style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <SectionLabel>What I Believe</SectionLabel>
          </motion.div>

          <div style={{ overflow: "hidden", marginBottom: "3.5rem" }}>
            <motion.h2
              initial={{ y: "105%" }}
              animate={principlesInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
                color: "var(--fg)", margin: 0,
              }}
            >
              Three Principles I{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Never Compromise.</span>
            </motion.h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {PRINCIPLES.map(({ icon: Icon, number, title, desc }, i) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 32 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: EASE, delay: 0.2 + i * 0.12 }}
                style={{
                  padding: "2rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Big number watermark */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute", top: "1rem", right: "1.25rem",
                    fontFamily: "var(--font-display)", fontStyle: "italic",
                    fontSize: "5rem", lineHeight: 1, color: "var(--border)",
                    userSelect: "none", pointerEvents: "none",
                  }}
                >
                  {number}
                </span>

                <div
                  style={{
                    width: 40, height: 40, borderRadius: "var(--radius-md)",
                    background: "var(--accent-muted)", border: "1px solid rgba(0,217,166,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--accent)", marginBottom: "1.25rem",
                  }}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </div>

                <h3 style={{ fontSize: "1.0625rem", fontWeight: 500, color: "var(--fg)", margin: "0 0 0.75rem", lineHeight: 1.3 }}>
                  {title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section
        style={{
          padding: "clamp(4rem, 10vw, 7rem) 1.5rem",
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div ref={timelineRef} style={{ maxWidth: 780, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <SectionLabel>Career Timeline</SectionLabel>
          </motion.div>

          <div style={{ overflow: "hidden", marginBottom: "3.5rem" }}>
            <motion.h2
              initial={{ y: "105%" }}
              animate={timelineInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
                color: "var(--fg)", margin: 0,
              }}
            >
              From First Commit to{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Five Products.</span>
            </motion.h2>
          </div>

          <div style={{ position: "relative" }}>
            {/* Central line */}
            <div
              aria-hidden
              style={{
                position: "absolute", left: "5.25rem", top: 0, bottom: 0,
                width: "1px", background: "var(--border)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TIMELINE.map(({ year, title, desc }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -24 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.65, ease: EASE, delay: 0.2 + i * 0.1 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "5rem 1.5rem 1fr",
                    gap: "0 1.5rem",
                    paddingBottom: "2.5rem",
                    alignItems: "start",
                  }}
                >
                  {/* Year */}
                  <div style={{ textAlign: "right", paddingTop: "2px" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 500,
                      color: "var(--accent)", letterSpacing: "0.06em",
                    }}>
                      {year}
                    </span>
                  </div>

                  {/* Dot */}
                  <div style={{ display: "flex", justifyContent: "center", paddingTop: "6px" }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: "50%",
                      background: "var(--accent)", border: "2px solid var(--bg)",
                      boxShadow: "0 0 0 3px var(--border)",
                      flexShrink: 0,
                    }} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 500, color: "var(--fg)", margin: "0 0 0.5rem" }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: "clamp(4rem, 10vw, 6rem) 1.5rem",
          background: "var(--bg-sub)",
          borderTop: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div aria-hidden style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600,
          borderRadius: "50%", background: "var(--accent-muted)", filter: "blur(100px)",
          opacity: 0.6, pointerEvents: "none",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
              color: "var(--fg)", margin: "0 0 1.25rem",
            }}
          >
            Let&apos;s work{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>together →</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Open to remote full-time roles and serious freelance projects. Response within 24 hours.
          </p>

          <Link href="/contact" style={{ textDecoration: "none" }}>
            <motion.span
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                padding: "0.875rem 2rem", borderRadius: 9999,
                background: "var(--accent)", color: "#0A0E1A",
                fontSize: "0.9375rem", fontWeight: 600, cursor: "pointer",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              Get in Touch
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </>
  )
}