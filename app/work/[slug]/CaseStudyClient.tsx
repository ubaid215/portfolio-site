"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { ArrowUpRight, ArrowLeft, ArrowRight, Check } from "lucide-react"
import type { Project } from "@/lib/projects"

const EASE = [0.16, 1, 0.3, 1] as const

interface Props {
  project: Project
  adjacent: { prev: Project | null; next: Project | null }
}

/* ── Section wrapper with in-view animation ── */
function Section({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ── Eyebrow label ── */
function Eyebrow({ children }: { children: React.ReactNode }) {
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
      <span
        style={{
          display: "inline-block",
          width: "2rem",
          height: "1px",
          background: "var(--accent)",
        }}
      />
      {children}
    </p>
  )
}

export function CaseStudyClient({ project, adjacent }: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          background: project.heroBg,
        }}
      >
        {/* Parallax bg layer */}
        <motion.div
          style={{ position: "absolute", inset: 0, y: heroY }}
        >
          {/* Dot grid */}
          <div
            aria-hidden
            className="bg-dot-grid"
            style={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }}
          />
          {/* Glow orb */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: "50vw",
              height: "50vw",
              maxWidth: 600,
              maxHeight: 600,
              borderRadius: "50%",
              background: "var(--accent-muted)",
              filter: "blur(100px)",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          />
          {/* Large decorative index */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              right: "2rem",
              bottom: "2rem",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(8rem, 22vw, 18rem)",
              fontWeight: 400,
              lineHeight: 1,
              color: "rgba(0,217,166,0.04)",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {project.index}
          </div>
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            padding: "10rem 1.5rem 4rem",
            opacity: heroOpacity,
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ marginBottom: "2rem" }}
            >
              <Link href="/work" style={{ textDecoration: "none" }}>
                <motion.span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                  }}
                  whileHover={{ color: "rgba(255,255,255,0.8)" }}
                >
                  <ArrowLeft size={13} strokeWidth={2} />
                  All Work
                </motion.span>
              </Link>
            </motion.div>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              {[
                project.index,
                project.year,
                project.role,
                project.status,
              ].map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    padding: "0.25rem 0.625rem",
                    borderRadius: 9999,
                    border: "1px solid rgba(0,217,166,0.25)",
                    background: "rgba(0,217,166,0.08)",
                  }}
                >
                  {item}
                </span>
              ))}
            </motion.div>

            {/* Title */}
            <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.25rem, 6vw, 5rem)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--fg)",
                  margin: 0,
                }}
              >
                {project.title}
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                color: "var(--fg-muted)",
                lineHeight: 1.65,
                maxWidth: "52ch",
                margin: "0 0 2rem",
              }}
            >
              {project.tagline}
            </motion.p>

            {/* Stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}
            >
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--accent)",
                    background: "rgba(0,217,166,0.08)",
                    border: "1px solid rgba(0,217,166,0.18)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: 9999,
                    letterSpacing: "0.03em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── BODY CONTENT ───────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(3rem, 8vw, 5rem) 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 680px), 1fr))",
            gap: "clamp(3rem, 6vw, 5rem)",
          }}
        >

          {/* ── Left column: main content ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>

            {/* The Problem */}
            <Section>
              <div
                style={{
                  padding: "2rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                }}
              >
                <Eyebrow>The Problem</Eyebrow>
                <p
                  style={{
                    fontSize: "1.0625rem",
                    color: "var(--fg-muted)",
                    lineHeight: 1.75,
                    margin: "0 0 1.5rem",
                  }}
                >
                  {project.problem}
                </p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {project.problemPoints.map((point) => (
                    <li
                      key={point}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        fontSize: "0.9rem",
                        color: "var(--fg-muted)",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          border: "1px solid rgba(255,80,80,0.35)",
                          background: "rgba(255,80,80,0.06)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                          fontSize: "10px",
                          color: "rgba(255,100,100,0.7)",
                        }}
                      >
                        ✕
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            {/* My Approach */}
            <Section delay={0.05}>
              <Eyebrow>My Approach</Eyebrow>
              <p
                style={{
                  fontSize: "1.0625rem",
                  color: "var(--fg-muted)",
                  lineHeight: 1.75,
                  margin: "0 0 2rem",
                }}
              >
                {project.approach}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {project.approachPoints.map(({ title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      padding: "1.25rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-card)",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "var(--radius-md)",
                        background: "var(--accent-muted)",
                        border: "1px solid rgba(0,217,166,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Check size={14} strokeWidth={2.5} color="var(--accent)" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                          color: "var(--fg)",
                          margin: "0 0 0.3rem",
                        }}
                      >
                        {title}
                      </p>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--fg-muted)",
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* Screenshots placeholder section */}
            <Section delay={0.05}>
              <Eyebrow>Screenshots</Eyebrow>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                  gap: "0.75rem",
                }}
              >
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    style={{
                      aspectRatio: n === 1 ? "16/9" : "4/3",
                      gridColumn: n === 1 ? "1 / -1" : undefined,
                      borderRadius: "var(--radius-lg)",
                      background: project.heroBg,
                      border: "1px solid var(--border)",
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      aria-hidden
                      className="bg-dot-grid"
                      style={{ position: "absolute", inset: 0, opacity: 0.15 }}
                    />
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "60%",
                        height: "60%",
                        borderRadius: "50%",
                        background: "var(--accent-muted)",
                        filter: "blur(40px)",
                        opacity: 0.4,
                      }}
                    />
                    <span
                      style={{
                        position: "relative",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        color: "rgba(0,217,166,0.4)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Screenshot {n}
                    </span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--fg-faint)",
                  marginTop: "0.75rem",
                  letterSpacing: "0.04em",
                }}
              >
                // Replace with real screenshots — /public/images/{project.slug}/
              </p>
            </Section>
          </div>

          {/* ── Right column: sidebar ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Outcome stats */}
            <Section>
              <div
                style={{
                  padding: "1.75rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid rgba(0,217,166,0.2)",
                  background: "var(--accent-muted)",
                }}
              >
                <Eyebrow>Outcome</Eyebrow>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--fg-muted)",
                    lineHeight: 1.7,
                    margin: "0 0 1.5rem",
                  }}
                >
                  {project.outcome}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1px",
                    background: "rgba(0,217,166,0.1)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    border: "1px solid rgba(0,217,166,0.15)",
                  }}
                >
                  {project.outcomeStats.map(({ value, label }) => (
                    <div
                      key={label}
                      style={{
                        padding: "1.25rem 1rem",
                        background: "var(--bg-card)",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontStyle: "italic",
                          fontSize: "1.625rem",
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
                          fontSize: "0.625rem",
                          color: "var(--fg-faint)",
                          textTransform: "uppercase",
                          letterSpacing: "0.07em",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Tech Stack visual */}
            <Section delay={0.1}>
              <div
                style={{
                  padding: "1.75rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                }}
              >
                <Eyebrow>Tech Stack</Eyebrow>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {project.stack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, ease: EASE, delay: i * 0.04 }}
                      style={{
                        display: "inline-flex",
                        padding: "0.35rem 0.75rem",
                        borderRadius: 9999,
                        border: "1px solid var(--border-sub)",
                        background: "var(--bg-sub)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--fg-sub)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Section>

            {/* Project meta */}
            <Section delay={0.15}>
              <div
                style={{
                  padding: "1.75rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                }}
              >
                <Eyebrow>Project Details</Eyebrow>
                <dl style={{ margin: 0 }}>
                  {[
                    { t: "Year", v: project.year },
                    { t: "Role", v: project.role },
                    { t: "Status", v: project.status },
                    { t: "Categories", v: project.categories.join(", ") },
                  ].map(({ t, v }) => (
                    <div
                      key={t}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "1rem",
                        padding: "0.75rem 0",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <dt
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          color: "var(--fg-faint)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          flexShrink: 0,
                        }}
                      >
                        {t}
                      </dt>
                      <dd
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--fg-sub)",
                          margin: 0,
                          textAlign: "right",
                        }}
                      >
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Section>

            {/* CTA */}
            <Section delay={0.2}>
              <Link href="/contact" style={{ textDecoration: "none", display: "block" }}>
                <motion.div
                  style={{
                    padding: "1.5rem",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--accent)",
                    color: "#0A0E1A",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="hero-cta-btn"
                >
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.9375rem", margin: "0 0 0.2rem" }}>
                      Want something like this?
                    </p>
                    <p style={{ fontSize: "0.8125rem", opacity: 0.7, margin: 0 }}>
                      Let&apos;s talk about your project
                    </p>
                  </div>
                  <ArrowUpRight size={20} strokeWidth={2} />
                </motion.div>
              </Link>
            </Section>
          </div>
        </div>
      </div>

      {/* ── NEXT PROJECT NAV ───────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--bg-sub)",
          padding: "clamp(2.5rem, 5vw, 4rem) 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: adjacent.prev && adjacent.next ? "1fr 1fr" : "1fr",
            gap: "1.25rem",
          }}
        >
          {adjacent.prev && (
            <Link href={`/work/${adjacent.prev.slug}`} style={{ textDecoration: "none" }}>
              <motion.div
                className="adj-card"
                style={{
                  padding: "1.5rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <ArrowLeft size={14} strokeWidth={2} color="var(--fg-faint)" />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--fg-faint)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Previous
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "var(--fg)",
                    margin: "0 0 0.25rem",
                    lineHeight: 1.3,
                  }}
                >
                  {adjacent.prev.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--accent)",
                    margin: 0,
                  }}
                >
                  {adjacent.prev.index}
                </p>
              </motion.div>
            </Link>
          )}

          {adjacent.next && (
            <Link href={`/work/${adjacent.next.slug}`} style={{ textDecoration: "none" }}>
              <motion.div
                className="adj-card"
                style={{
                  padding: "1.5rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  cursor: "pointer",
                  textAlign: "right",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  gridColumn: !adjacent.prev ? "1 / -1" : undefined,
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--fg-faint)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Next Project
                  </span>
                  <ArrowRight size={14} strokeWidth={2} color="var(--fg-faint)" />
                </div>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "var(--fg)",
                    margin: "0 0 0.25rem",
                    lineHeight: 1.3,
                  }}
                >
                  {adjacent.next.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--accent)",
                    margin: 0,
                  }}
                >
                  {adjacent.next.index}
                </p>
              </motion.div>
            </Link>
          )}
        </div>
      </section>

      <style>{`
        .adj-card:hover {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-lg);
        }
        .hero-cta-btn {
          transition: background-color 0.2s ease;
        }
        .hero-cta-btn:hover {
          background-color: var(--accent-bright);
        }
      `}</style>
    </main>
  )
}