"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Link from "next/link"
import { ArrowUpRight, TrendingUp, LayoutDashboard, Layers, Clock, Users } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

const SERVICES = [
  {
    icon: Layers,
    index: "01",
    title: "Booking & Operations Systems",
    tagline: "Bring booking, staff workflows, and reporting into one place.",
    problem: "Bookings, payments, and follow-ups become difficult to manage when they live in separate tools and message threads.",
    outcome: "I scope the workflow and build the customer-facing flow, admin workspace, and integrations the team needs.",
    proof: "Related work: the school and restaurant systems show how multi-role operational workflows can be brought into one application.",
    scope: [
      "Multi-step booking wizard with real-time availability",
      "Admin dashboard with daily/weekly revenue snapshots",
      "WhatsApp or email reminder workflows",
      "JWT-secured staff login with role-based access",
      "Double-booking prevention at database level",
      "Mobile-optimized for walk-in and phone clients",
    ],
    timeline: "4–8 weeks",
    starts_at: "$1,200",
    best_for: "Tax offices, clinics, salons, tutoring centers, service agencies",
    cta: "Get a Booking System Quote",
    featured: true,
  },
  {
    icon: TrendingUp,
    index: "02",
    title: "SaaS & Product MVPs",
    tagline: "Test a product idea with a focused first release.",
    problem: "A new product needs enough substance to test its core idea without turning the first build into an open-ended feature list.",
    outcome: "We define the smallest useful release, then build the core user flow, administration, and technical foundation it requires.",
    proof: "Related work: the school management case study shows a product with distinct roles, data flows, and administrative needs.",
    scope: [
      "Auth system with roles, teams, invites",
      "Stripe subscription billing integration",
      "Core feature set scoped to validate your hypothesis",
      "Admin panel for you to manage users & data",
      "API-first architecture for future mobile app",
      "Deployment on Railway / Vercel with CI pipeline",
    ],
    timeline: "6–14 weeks",
    starts_at: "$2,500",
    best_for: "Founders, startup studios, businesses spinning out a product",
    cta: "Scope My MVP",
    featured: false,
  },
  {
    icon: LayoutDashboard,
    index: "03",
    title: "Custom Admin Dashboards & Internal Tools",
    tagline: "Give your team one workspace for the decisions it makes every day.",
    problem: "Generic tools can become awkward when a team needs custom approval flows, permissions, or reports.",
    outcome: "I build a focused internal tool shaped around the team's roles, data, and decisions.",
    proof: "Related work: the retail, school, and donation case studies include administration and reporting interfaces.",
    scope: [
      "Custom UI built around your team's actual workflow",
      "Multi-role access: admin, manager, viewer",
      "Data tables with search, filter, bulk actions",
      "Charts and KPI snapshots for decision-making",
      "Notification system (email / in-app alerts)",
      "CSV/PDF export for reporting",
    ],
    timeline: "3–7 weeks",
    starts_at: "$900",
    best_for: "Operations teams, HR workflows, content pipelines, data-heavy processes",
    cta: "Build My Dashboard",
    featured: false,
  },
]

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      style={{
        padding: "2.25rem",
        borderRadius: "var(--radius-xl)",
        border: service.featured ? "1px solid rgba(0,217,166,0.35)" : "1px solid var(--border)",
        background: service.featured ? "linear-gradient(135deg, rgba(0,217,166,0.06) 0%, var(--bg-card) 60%)" : "var(--bg-card)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
      className="service-card"
    >
      {/* Top accent bar */}
      <div
        className="service-glow"
        aria-hidden
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "2px", background: "var(--accent)",
          transform: service.featured ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Featured badge */}
      {service.featured && (
        <div style={{
          position: "absolute", top: "1.25rem", right: "1.25rem",
          fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--accent-text)", background: "var(--accent)",
          padding: "0.25rem 0.625rem", borderRadius: 9999,
        }}>
          Featured
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        <div style={{
          width: 44, height: 44, borderRadius: "var(--radius-md)",
          background: "var(--accent-muted)", border: "1px solid rgba(0,217,166,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--accent-ink)", flexShrink: 0,
        }}>
          <service.icon size={20} strokeWidth={1.75} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", color: "var(--accent-ink)", letterSpacing: "0.08em", display: "block", marginBottom: "0.2rem" }}>
            {service.index}
          </span>
          <h3 className="type-card-title" style={{ color: "var(--fg)", margin: "0 0 0.3rem" }}>
            {service.title}
          </h3>
          <p style={{ fontSize: "0.9375rem", color: "var(--fg-muted)", lineHeight: 1.5, margin: 0 }}>
            {service.tagline}
          </p>
        </div>
      </div>

      {/* Problem → Outcome */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        <div style={{
          padding: "0.875rem 1rem",
          borderRadius: "var(--radius-md)",
          background: "var(--bg-sub)",
          border: "1px solid var(--border-sub)",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-sub)", marginBottom: "0.375rem" }}>
            The Problem
          </p>
          <p style={{ fontSize: "0.9375rem", color: "var(--fg-muted)", lineHeight: 1.6, margin: 0 }}>
            {service.problem}
          </p>
        </div>

        <div style={{
          padding: "0.875rem 1rem",
          borderRadius: "var(--radius-md)",
          background: "var(--accent-muted)",
          border: "1px solid rgba(0,217,166,0.15)",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-ink)", marginBottom: "0.375rem" }}>
            What You Get
          </p>
          <p style={{ fontSize: "0.9375rem", color: "var(--fg-muted)", lineHeight: 1.6, margin: 0 }}>
            {service.outcome}
          </p>
        </div>
      </div>

      {/* Proof */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
        <div style={{ width: 3, flexShrink: 0, borderRadius: 9999, background: "var(--accent)", marginTop: "3px", alignSelf: "stretch", opacity: 0.5 }} />
        <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.55, margin: 0 }}>
          {service.proof}
        </p>
      </div>

      {/* Scope */}
      <div>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", fontWeight: 500,
          letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)",
          marginBottom: "0.625rem",
        }}>
          Scope
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem 1rem" }}>
          {service.scope.map((item) => (
            <div key={item} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
              <span style={{ color: "var(--accent-ink)", flexShrink: 0, fontSize: "var(--type-meta-size)", marginTop: "1px", lineHeight: 1.6 }}>→</span>
              <span style={{ fontSize: "0.875rem", color: "var(--fg-sub)", lineHeight: 1.55 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meta row */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center",
        padding: "0.875rem 1rem", borderRadius: "var(--radius-md)",
        background: "var(--bg-sub)", border: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          <Clock size={12} strokeWidth={1.75} style={{ color: "var(--fg-faint)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", color: "var(--fg-muted)" }}>
            {service.timeline}
          </span>
        </div>
        <span style={{ color: "var(--border-sub)", fontSize: "var(--type-meta-size)" }}>·</span>
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", color: "var(--fg-faint)" }}>Starting from</span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", fontWeight: 700,
            color: "var(--accent-ink)", letterSpacing: "0.02em",
          }}>
            {service.starts_at}
          </span>
        </div>
        <span style={{ color: "var(--border-sub)", fontSize: "var(--type-meta-size)" }}>·</span>
        <span style={{ fontSize: "var(--type-meta-size)", color: "var(--fg-faint)" }}>
          <span style={{ color: "var(--fg-muted)" }}>{service.best_for}</span>
        </span>
      </div>

      {/* CTA */}
      <Link href="/contact" style={{ textDecoration: "none" }}>
        <motion.span
          className="service-cta"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            padding: "0.75rem 1.5rem", borderRadius: 9999,
            border: "1px solid var(--border-sub)", background: "transparent",
            color: "var(--fg-sub)", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer",
            transition: "border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease",
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          {service.cta}
          <ArrowUpRight size={14} strokeWidth={2} />
        </motion.span>
      </Link>
    </motion.div>
  )
}

export default function ServicesPage() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: "-80px" })

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
          position: "absolute", top: "20%", left: "5%",
          width: "clamp(240px, 35vw, 500px)", height: "clamp(240px, 35vw, 500px)",
          borderRadius: "50%", background: "var(--accent-muted)", filter: "blur(100px)",
          pointerEvents: "none", animation: "glowPulse 8s ease-in-out infinite",
        }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-ink)",
              marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: "2rem", height: "1px", background: "var(--accent)" }} />
            What I Build
          </motion.p>

          <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
            <motion.h1
              className="type-page"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              style={{
                color: "var(--fg)", margin: 0,
              }}
            >
              Software built
              <br />
              <span>
                around the way you work.
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
              marginBottom: "2.5rem",
            }}
          >
            I scope and build web applications around the work your team needs to do — from customer-facing flows to the internal tools behind them.
          </motion.p>

          {/* Repositioned trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", marginBottom: "3rem" }}
          >
            {[
              "Direct Collaboration",
              "Workflow-Led Scope",
              "From Build to Handoff",
            ].map((badge) => (
              <span
                key={badge}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", fontWeight: 500,
                  color: "var(--accent-ink)", background: "var(--accent-muted)",
                  border: "1px solid rgba(0,217,166,0.2)",
                  padding: "0.35rem 0.875rem", borderRadius: 9999, letterSpacing: "0.04em",
                }}
              >
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Qualifier statement */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
            style={{
              padding: "1.25rem 1.5rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              display: "flex", gap: "1rem", alignItems: "flex-start",
              maxWidth: "52ch",
            }}
          >
            <Users size={16} strokeWidth={1.75} style={{ color: "var(--accent-ink)", flexShrink: 0, marginTop: "2px" }} />
            <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>
              <strong style={{ color: "var(--fg)", fontWeight: 500 }}>The scope starts with your workflow.</strong> Share the problem and constraints, and I&apos;ll recommend a practical first release.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section
        style={{
          padding: "clamp(4rem, 10vw, 7rem) 1.5rem",
          background: "var(--bg-sub)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div ref={headingRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-ink)",
                marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: "2rem", height: "1px", background: "var(--accent)" }} />
              Three Ways to Work
            </motion.p>

            <div style={{ overflow: "hidden" }}>
              <motion.h2
                className="type-section"
                initial={{ y: "105%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                style={{
                  color: "var(--fg)", margin: "0 0 1rem",
                }}
              >
                The right shape for your work.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.65, maxWidth: "52ch", margin: 0 }}
            >
              These are common starting points. Prices and timelines are estimates; final scope follows a conversation about your workflow.
            </motion.p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.index} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Me / Differentiators ── */}
      <section
        style={{
          padding: "clamp(4rem, 10vw, 6rem) 1.5rem",
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-ink)",
              marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <span style={{ display: "inline-block", width: "2rem", height: "1px", background: "var(--accent)" }} />
              Working Together
            </p>
            <h2 className="type-section" style={{
              color: "var(--fg)", margin: "0 0 3rem",
            }}>
              Direct collaboration, from the first conversation to the handoff.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "1px",
              background: "var(--border)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
          >
            {[
              {
                label: "You talk to the builder",
                desc: "No account managers, no project hand-off. The person who scopes your project is the person who builds it.",
              },
              {
                 label: "A visible build process",
                 desc: "The work is broken into reviewable steps so assumptions can be corrected before launch.",
              },
              {
                 label: "Clear scope",
                 desc: "We identify the first release, its dependencies, and the decisions that affect cost and timing.",
              },
              {
                 label: "Engineering for the workflow",
                 desc: "The data model, access rules, and interface are shaped by how the product will be used.",
              },
              {
                 label: "Launch planning",
                 desc: "Deployment, documentation, and any follow-up support are discussed as part of the scope.",
              },
              {
                 label: "A usable handoff",
                 desc: "Access and documentation needs are agreed before the project is delivered.",
              },
            ].map(({ label, desc }) => (
              <div
                key={label}
                style={{ padding: "1.75rem 2rem", background: "var(--bg-card)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--fg)", margin: 0 }}>{label}</h3>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "var(--fg-muted)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </motion.div>
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
          style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}
        >
          <h2 className="type-section" style={{
            color: "var(--fg)", margin: "0 0 1.25rem",
          }}>
            Tell me the problem. I&apos;ll suggest a practical next step.
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "44ch", margin: "0 auto 2.5rem" }}>
            Tell me what happens today, what needs to change, and any timing or budget constraints. I&apos;ll reply with a practical next step.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <motion.span
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.45rem",
                  padding: "0.9375rem 2.25rem", borderRadius: 9999,
                  background: "var(--accent)", color: "var(--accent-text)",
                  fontSize: "0.9375rem", fontWeight: 700, cursor: "pointer",
                  letterSpacing: "-0.01em",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                Tell Me About Your Project
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </motion.span>
            </Link>

            <Link href="/work" style={{ textDecoration: "none" }}>
              <motion.span
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.45rem",
                  padding: "0.9375rem 1.75rem", borderRadius: 9999,
                  border: "1px solid var(--border-sub)", background: "transparent",
                  color: "var(--fg-sub)", fontSize: "0.9375rem", fontWeight: 500, cursor: "pointer",
                }}
                whileHover={{ scale: 1.03, borderColor: "var(--border-strong)", color: "var(--fg)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                Explore Case Studies
              </motion.span>
            </Link>
          </div>

          {/* Micro-assurance */}
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "var(--type-meta-size)", color: "var(--fg-faint)",
            letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "1.75rem",
          }}>
            Remote worldwide · Based in Faisalabad, Pakistan
          </p>
        </motion.div>
      </section>

      <style>{`
        .service-card:hover .service-glow { transform: scaleX(1); }
        .service-card:hover .service-cta {
          border-color: var(--accent-ink);
          color: var(--accent-ink);
          background-color: var(--accent-muted);
        }
        .service-card { transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .service-card:hover { border-color: var(--border-strong); box-shadow: var(--shadow-lg); }
      `}</style>
    </>
  )
}
