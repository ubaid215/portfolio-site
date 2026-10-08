"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Link from "next/link"
import { Services } from "@/components/home/Services"
import { ArrowUpRight, TrendingUp, LayoutDashboard, Layers, Clock } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

const SERVICES = [
  {
    icon: Layers,
    index: "01",
    title: "Booking & Operations Systems",
    tagline: "Make booking easier for customers and the day easier for your team.",
    problem: "When bookings, payments, and follow-ups live in separate tools, your team spends time piecing the day together.",
    outcome: "A booking experience for your customers and one workspace for your team to manage schedules, payments, and reminders.",
    proof: "See the school and restaurant projects for examples of connected tools for staff, customers, and administrators.",
    scope: [
      "Guided booking with live availability",
      "Daily and weekly revenue overviews",
      "WhatsApp or email reminder workflows",
      "Secure staff accounts with access by role",
      "Availability checks to prevent double bookings",
      "Mobile access for customers and staff",
    ],
    timeline: "4–8 weeks",
    starts_at: "$1,200",
    best_for: "Tax offices, clinics, salons, tutoring centers, service agencies",
    cta: "Plan your booking system",
    featured: true,
  },
  {
    icon: TrendingUp,
    index: "02",
    title: "SaaS & Product MVPs",
    tagline: "Give your idea a first release people can use and respond to.",
    problem: "You have a product in mind. The challenge is deciding what it needs on day one and getting it into users' hands.",
    outcome: "A focused MVP built around your core idea, with the accounts, billing, and administration it needs to launch.",
    proof: "Explore the school platform to see how I connect multiple user roles and features within one product.",
    scope: [
      "User accounts, team roles, and invitations",
      "Stripe subscription billing integration",
      "Core features for testing your product idea",
      "Admin tools to manage users and data",
      "APIs ready for future integrations",
      "Deployment and a repeatable release process",
    ],
    timeline: "6–14 weeks",
    starts_at: "$2,500",
    best_for: "Founders, startup studios, businesses spinning out a product",
    cta: "Plan your first release",
    featured: false,
  },
  {
    icon: LayoutDashboard,
    index: "03",
    title: "Dashboards & Internal Tools",
    tagline: "Put the information your team needs within reach.",
    problem: "Your team has its own way of working. Standard tools can leave approvals, reports, and important context scattered across tabs.",
    outcome: "A shared workspace with the views, permissions, and reports that help your team manage its day.",
    proof: "See the retail, school, and donation projects for examples of custom management and reporting tools.",
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
    cta: "Discuss your internal tool",
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
      <Services standalone />

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
              Ways to get started
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
              Start with the right build.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.65, maxWidth: "52ch", margin: 0 }}
            >
              These packages cover common development projects. Prices and timelines are estimates; we agree on the scope around your goals before work begins.
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
              Stay close to the work. See it take shape.
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
                label: "A direct working relationship",
                desc: "You work with me on the brief, the build, and the decisions in between.",
              },
              {
                 label: "Progress you can review",
                 desc: "Working features give you something concrete to react to throughout the project.",
              },
              {
                 label: "Clear expectations",
                 desc: "We agree on priorities, deliverables, and the decisions that affect timing and budget.",
              },
              {
                 label: "Your people in mind",
                 desc: "Customer journeys and the way your team works shape the interface, features, and access rules.",
              },
              {
                 label: "A considered launch",
                 desc: "We discuss deployment, testing, and any support you need before launch day arrives.",
              },
              {
                 label: "A handover your team can use",
                 desc: "We agree on the access and documentation your team needs to take the product forward.",
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
            Know the goal. Need a plan?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "44ch", margin: "0 auto 2.5rem" }}>
            Tell me what you want to launch, improve, or automate. We can work out the right starting point, scope, and priorities together.
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
                Discuss your project
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
                See the work
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
