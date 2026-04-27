"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Link from "next/link"
import { ArrowUpRight, Zap, TrendingUp, ShieldCheck, LayoutDashboard, Layers, Clock, Users } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

const SERVICES = [
  {
    icon: Layers,
    index: "01",
    title: "Booking & Operations Systems",
    tagline: "Replace spreadsheets and manual chaos with software that runs itself.",
    problem: "Every service business hits the same wall: bookings through WhatsApp, payments tracked in Excel, reminders sent by hand. You're doing $10,000/month but operating like it's $1,000.",
    outcome: "I build the full system — customer-facing booking flow, admin dashboard, automated reminders, payment tracking — so you stop being the bottleneck in your own business.",
    proof: "Built 2 production systems: a Calendly-alternative (BookWise) and a full operations overhaul for Akbar Tax Store — both shipped in under 6 weeks.",
    scope: [
      "Multi-step booking wizard with real-time availability",
      "Admin dashboard with daily/weekly revenue snapshots",
      "Automated WhatsApp / email reminders (zero manual work)",
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
    tagline: "From idea to paying users — without burning 6 months of runway.",
    problem: "Most dev shops will quote you $30K and 6 months for an MVP. Most freelancers will deliver something that crashes when two users log in at once.",
    outcome: "I build investor-ready, scalable MVPs: full auth system, subscription billing, dashboards, and a codebase you can actually hand to a team later.",
    proof: "Currently building FinCore — a financial SaaS for Pakistan's market — using the same NestJS clean architecture stack I'd bring to your product.",
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
    tagline: "If your team is copy-pasting between tools, that's your bottleneck.",
    problem: "Off-the-shelf tools like Notion, Airtable, and Google Sheets break down the moment you need custom logic — approval flows, user permissions, automated reports.",
    outcome: "I replace the patchwork with one internal tool shaped around how your team actually works. No training required — it does exactly what you need and nothing else.",
    proof: "Built dashboards with 7-page admin panels, multi-role auth, bulk export, and live charts — shipped for real operations teams.",
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
  {
    icon: Zap,
    index: "04",
    title: "AI-Powered Features & Automations",
    tagline: "Your competitors are already shipping AI. Don't be the last one.",
    problem: "Tacking 'AI' onto an existing product sounds simple — until you're dealing with streaming responses, prompt engineering, cost management, and hallucinations at 2 AM.",
    outcome: "I integrate AI that actually works in production: document processing, AI-assisted workflows, intelligent search, or custom chatbots — without the prototype-feeling result.",
    proof: "Already using AI acceleration in my own builds: automated code generation, AI-assisted testing, and workflow tooling. I know where AI helps and where it breaks.",
    scope: [
      "OpenAI / Claude API integration with streaming",
      "AI document analysis (contracts, invoices, PDFs)",
      "Intelligent search with semantic matching",
      "Custom chatbot trained on your business data",
      "Prompt engineering and cost optimization",
      "AI workflow automations (n8n, Zapier, custom)",
    ],
    timeline: "2–6 weeks",
    starts_at: "$800",
    best_for: "Products adding AI features, businesses automating document workflows",
    cta: "Add AI to My Product",
    featured: false,
  },
  {
    icon: ShieldCheck,
    index: "05",
    title: "Backend API Engineering",
    tagline: "The kind of API that doesn't page you at 3 AM.",
    problem: "A poorly built backend is invisible when it works and catastrophic when it doesn't. Scaling issues, auth vulnerabilities, and race conditions all hide until production.",
    outcome: "I build APIs with NestJS clean architecture — modular, tested, documented, and designed so the next developer who touches it doesn't curse your name.",
    proof: "22-module NestJS backend with clean architecture, domain isolation, BullMQ queues, and Prisma ORM — already battle-tested across multiple projects.",
    scope: [
      "NestJS with Clean Architecture / Domain Driven Design",
      "JWT auth, RBAC, refresh token rotation",
      "Background job processing with BullMQ",
      "WebSocket real-time features",
      "Swagger / OpenAPI documentation",
      "Unit + integration tests with Jest",
    ],
    timeline: "3–8 weeks",
    starts_at: "$1,000",
    best_for: "Mobile app backends, SaaS APIs, teams inheriting a messy codebase",
    cta: "Scope My Backend",
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
          fontFamily: "var(--font-mono)", fontSize: "0.5625rem", fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#0A0E1A", background: "var(--accent)",
          padding: "0.25rem 0.625rem", borderRadius: 9999,
        }}>
          Most Popular
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        <div style={{
          width: 44, height: 44, borderRadius: "var(--radius-md)",
          background: "var(--accent-muted)", border: "1px solid rgba(0,217,166,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--accent)", flexShrink: 0,
        }}>
          <service.icon size={20} strokeWidth={1.75} />
        </div>
        <div style={{ flex: 1, paddingRight: service.featured ? "4rem" : 0 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--accent)", letterSpacing: "0.08em", display: "block", marginBottom: "0.2rem" }}>
            {service.index}
          </span>
          <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--fg)", margin: "0 0 0.3rem", lineHeight: 1.3 }}>
            {service.title}
          </h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--accent)", letterSpacing: "0.04em", margin: 0 }}>
            {service.tagline}
          </p>
        </div>
      </div>

      {/* Problem → Outcome */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        <div style={{
          padding: "0.875rem 1rem",
          borderRadius: "var(--radius-md)",
          background: "rgba(255,80,80,0.04)",
          border: "1px solid rgba(255,80,80,0.1)",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,100,100,0.7)", marginBottom: "0.375rem" }}>
            The Problem
          </p>
          <p style={{ fontSize: "0.8125rem", color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
            {service.problem}
          </p>
        </div>

        <div style={{
          padding: "0.875rem 1rem",
          borderRadius: "var(--radius-md)",
          background: "var(--accent-muted)",
          border: "1px solid rgba(0,217,166,0.15)",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.375rem" }}>
            What You Get
          </p>
          <p style={{ fontSize: "0.8125rem", color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
            {service.outcome}
          </p>
        </div>
      </div>

      {/* Proof */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
        <div style={{ width: 3, flexShrink: 0, borderRadius: 9999, background: "var(--accent)", marginTop: "3px", alignSelf: "stretch", opacity: 0.5 }} />
        <p style={{ fontSize: "0.75rem", color: "var(--fg-faint)", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
          {service.proof}
        </p>
      </div>

      {/* Scope */}
      <div>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.5625rem", fontWeight: 500,
          letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)",
          marginBottom: "0.625rem",
        }}>
          Scope
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem 1rem" }}>
          {service.scope.map((item) => (
            <div key={item} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
              <span style={{ color: "var(--accent)", flexShrink: 0, fontSize: "0.75rem", marginTop: "1px", lineHeight: 1.6 }}>→</span>
              <span style={{ fontSize: "0.75rem", color: "var(--fg-sub)", lineHeight: 1.6 }}>{item}</span>
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
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--fg-muted)" }}>
            {service.timeline}
          </span>
        </div>
        <span style={{ color: "var(--border-sub)", fontSize: "0.75rem" }}>·</span>
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--fg-faint)" }}>Starting from</span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700,
            color: "var(--accent)", letterSpacing: "0.02em",
          }}>
            {service.starts_at}
          </span>
        </div>
        <span style={{ color: "var(--border-sub)", fontSize: "0.75rem" }}>·</span>
        <span style={{ fontSize: "0.6875rem", color: "var(--fg-faint)" }}>
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
              fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)",
              marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: "2rem", height: "1px", background: "var(--accent)" }} />
            What I Build
          </motion.p>

          <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
                fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em",
                color: "var(--fg)", margin: 0,
              }}
            >
              Software that runs
              <br />
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                your business for you.
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
            I don&apos;t sell technology. I solve the specific operational problems that are costing you time, money, or clients right now — and I deliver it in weeks, not months.
          </motion.p>

          {/* Repositioned trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", marginBottom: "3rem" }}
          >
            {[
              "2 Production Systems Live",
              "Avg. 5-Week Delivery",
              "Solo Dev · No Handoff Delays",
              "AI-Accelerated Builds",
              "30-Day Post-Launch Support",
            ].map((badge) => (
              <span
                key={badge}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 500,
                  color: "var(--accent)", background: "var(--accent-muted)",
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
            <Users size={16} strokeWidth={1.75} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
            <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>
              <strong style={{ color: "var(--fg)", fontWeight: 500 }}>I work with a limited number of clients at a time.</strong> If you&apos;re looking for the cheapest option, I&apos;m probably not it. If you want something built right and shipped fast — let&apos;s talk.
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
                fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)",
                marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: "2rem", height: "1px", background: "var(--accent)" }} />
              Five Engagements
            </motion.p>

            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ y: "105%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
                  color: "var(--fg)", margin: "0 0 1rem",
                }}
              >
                Pick your problem.{" "}
                <span style={{ fontStyle: "italic", color: "var(--accent)" }}>I&apos;ll solve it.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.65, maxWidth: "52ch", margin: 0 }}
            >
              Each service is scoped around a real business problem — not a list of technologies. Starting prices shown. Most projects are quoted after a 20-minute discovery call.
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
              fontFamily: "var(--font-mono)", fontSize: "0.6875rem", fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)",
              marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <span style={{ display: "inline-block", width: "2rem", height: "1px", background: "var(--accent)" }} />
              Why Me vs. an Agency
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.02em",
              color: "var(--fg)", margin: "0 0 3rem",
            }}>
              One developer who owns the whole thing.{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>No committee.</span>
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
                label: "AI-accelerated delivery",
                desc: "I use AI tooling across the stack — not to replace thinking, but to ship in weeks what used to take months.",
              },
              {
                label: "Scope-locked contracts",
                desc: "We agree exactly what gets built before I write a line of code. No scope creep, no hourly billing surprises.",
              },
              {
                label: "Production-grade from day one",
                desc: "Clean architecture, typed APIs, proper auth, documented codebase. Not a prototype that collapses under real users.",
              },
              {
                label: "30-day post-launch support",
                desc: "Real products have real edge cases. Bugs discovered after launch are fixed — no extra invoice required.",
              },
              {
                label: "You own everything",
                desc: "Full source code, deployment access, documentation. No lock-in, no monthly retainer just to keep the lights on.",
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
                <p style={{ fontSize: "0.8375rem", color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>{desc}</p>
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
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
            color: "var(--fg)", margin: "0 0 1.25rem",
          }}>
            Tell me the problem.
            <br />
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>I&apos;ll tell you if I can solve it.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "44ch", margin: "0 auto 2.5rem" }}>
            20-minute discovery call. You describe what&apos;s broken or what you want to build — I&apos;ll tell you exactly what it takes, what it costs, and how long it will take. No pitch. No obligation.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <motion.span
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.45rem",
                  padding: "0.9375rem 2.25rem", borderRadius: 9999,
                  background: "var(--accent)", color: "#0A0E1A",
                  fontSize: "0.9375rem", fontWeight: 700, cursor: "pointer",
                  letterSpacing: "-0.01em",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                Book a Discovery Call
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
                See Live Projects
              </motion.span>
            </Link>
          </div>

          {/* Micro-assurance */}
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--fg-faint)",
            letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "1.75rem",
          }}>
            Avg. response within 4 hours · PKR pricing available · Remote worldwide
          </p>
        </motion.div>
      </section>

      <style>{`
        .service-card:hover .service-glow { transform: scaleX(1); }
        .service-card:hover .service-cta {
          border-color: var(--accent);
          color: var(--accent);
          background-color: var(--accent-muted);
        }
        .service-card { transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .service-card:hover { border-color: var(--border-strong); box-shadow: var(--shadow-lg); }
      `}</style>
    </>
  )
}