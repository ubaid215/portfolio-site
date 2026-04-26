"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Link from "next/link"
import { ArrowUpRight, Globe, Server, Database, LayoutDashboard, Code2, Clock, CheckCircle2 } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

const SERVICES = [
  {
    icon: Globe,
    index: "01",
    title: "Full Stack Web App Development",
    tagline: "End-to-end. From zero to deployed.",
    description:
      "You have a product idea or a business problem. I turn it into a working application — database design, backend API, frontend UI, deployment. No handoffs between backend and frontend teams. No miscommunication. One developer who owns the whole thing and treats your product like it's their own.",
    scope: [
      "Custom web application architecture",
      "Database schema design & optimization",
      "RESTful API development",
      "Frontend UI with React / Next.js",
      "Cloud deployment (Vercel, Railway, AWS)",
      "Post-launch support & iteration",
    ],
    timeline: "4–12 weeks",
    best_for: "Startups, SaaS founders, businesses replacing manual processes",
    cta: "Build Something Real",
  },
  {
    icon: Code2,
    index: "02",
    title: "Next.js / React Frontend",
    tagline: "Fast. SEO-ready. Pixel-perfect.",
    description:
      "A frontend built on Next.js isn't just a pretty UI — it's a performance engine. I build server-rendered, SEO-optimized, accessible interfaces that look sharp, load fast, and work on every device. The kind of UI that makes users trust your product before they've read a word.",
    scope: [
      "Next.js App Router with RSC support",
      "TypeScript-first component architecture",
      "Responsive, accessible UI",
      "SEO & Core Web Vitals optimization",
      "Animation with Framer Motion",
      "Integration with any headless CMS or API",
    ],
    timeline: "2–6 weeks",
    best_for: "Businesses with an existing backend, landing pages, product UIs",
    cta: "Get a Frontend Quote",
  },
  {
    icon: Server,
    index: "03",
    title: "API & Backend Engineering",
    tagline: "The engine under your product.",
    description:
      "APIs should be boring — fast, predictable, and impossible to break. I build them with NestJS (when structure matters) or Express (when speed matters), backed by proper auth, input validation, rate limiting, and the kind of error handling that doesn't crash at 2 AM.",
    scope: [
      "NestJS or Node.js / Express API",
      "JWT authentication & role-based access",
      "WebSocket real-time functionality",
      "BullMQ background job processing",
      "Third-party API integrations (Stripe, Meta, etc.)",
      "API documentation & testing",
    ],
    timeline: "2–6 weeks",
    best_for: "Teams needing a standalone backend, mobile apps, SaaS platforms",
    cta: "Scope Your Backend",
  },
  {
    icon: LayoutDashboard,
    index: "04",
    title: "CMS & Admin Dashboards",
    tagline: "Control panels your team will actually use.",
    description:
      "Generic CMS platforms force your business into their mold. I build custom dashboards shaped around how your team actually works — whether that's managing restaurant menus, school attendance records, or a donation campaign with WhatsApp automation. Built for operators, not developers.",
    scope: [
      "Custom admin dashboard UI",
      "Role-based user management",
      "Data tables, charts & reporting",
      "Content editing & media management",
      "Notification systems & alerts",
      "Export / import functionality",
    ],
    timeline: "3–8 weeks",
    best_for: "Businesses with operational teams, content managers, data-heavy workflows",
    cta: "Build My Dashboard",
  },
  {
    icon: Database,
    index: "05",
    title: "Database Design & Architecture",
    tagline: "Structure that scales without pain.",
    description:
      "Bad database design is a debt you pay for years. I design schemas that are normalized where they need to be, denormalized where performance demands it, and documented so the next developer (or future you) doesn't spend three days figuring out what a column means.",
    scope: [
      "PostgreSQL or MongoDB schema design",
      "Prisma ORM setup & migration management",
      "Performance indexing & query optimization",
      "Relationship mapping & data modeling",
      "Seeding scripts & test data",
      "Migration strategies for existing databases",
    ],
    timeline: "1–3 weeks",
    best_for: "Projects with complex data relationships, existing databases that need cleanup",
    cta: "Review My Database",
  },
]

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      style={{
        padding: "2.25rem",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
      }}
      className="service-card"
    >
      {/* Accent gradient on hover */}
      <div
        className="service-glow"
        aria-hidden
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "3px", background: "var(--accent)",
          transform: "scaleX(0)", transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        <div
          style={{
            width: 44, height: 44, borderRadius: "var(--radius-md)",
            background: "var(--accent-muted)", border: "1px solid rgba(0,217,166,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--accent)", flexShrink: 0,
          }}
        >
          <Icon size={20} strokeWidth={1.75} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--accent)", letterSpacing: "0.08em" }}>
              {service.index}
            </span>
          </div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 500, color: "var(--fg)", margin: "0 0 0.25rem", lineHeight: 1.3 }}>
            {service.title}
          </h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--accent)", letterSpacing: "0.04em", margin: 0 }}>
            {service.tagline}
          </p>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.75, margin: 0 }}>
        {service.description}
      </p>

      {/* Scope list */}
      <div>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.625rem", fontWeight: 500,
          letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)",
          marginBottom: "0.75rem",
        }}>
          What&apos;s included
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {service.scope.map((item) => (
            <div key={item} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
              <CheckCircle2 size={14} strokeWidth={2} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
              <span style={{ fontSize: "0.8125rem", color: "var(--fg-sub)", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "0.75rem",
        padding: "1.125rem", borderRadius: "var(--radius-md)",
        background: "var(--bg-sub)", border: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Clock size={13} strokeWidth={1.75} style={{ color: "var(--fg-faint)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--fg-muted)" }}>
            {service.timeline}
          </span>
        </div>
        <span style={{ color: "var(--border-sub)" }}>·</span>
        <span style={{ fontSize: "0.75rem", color: "var(--fg-faint)" }}>
          Best for: <span style={{ color: "var(--fg-muted)" }}>{service.best_for}</span>
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
            Services
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
              What I Build
              <br />
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                & How I Do It.
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
            Every service is scoped clearly, delivered cleanly, and built
            to last. No vague retainers. No inflated timelines. No surprises.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}
          >
            {["5 Apps Shipped", "100% Delivery Rate", "Solo Dev · Agency Output", "24h Response"].map((badge) => (
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
              What I Offer
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
                Five Services.{" "}
                <span style={{ fontStyle: "italic", color: "var(--accent)" }}>One Developer.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.65, maxWidth: "52ch", margin: 0 }}
            >
              Pick the scope that fits your project. Not sure which one? Start with contact and we&apos;ll figure it out together.
            </motion.p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.index} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process / Guarantee ── */}
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
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "1px",
              background: "var(--border)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
          >
            {[
              { label: "Clear Scope Upfront", desc: "No surprises. We agree on exactly what gets built before I write a line of code." },
              { label: "Regular Updates", desc: "Weekly check-ins or async Loom updates. You always know where the project stands." },
              { label: "Clean Handoff", desc: "Documented codebase, deployment instructions, and a walkthrough call when we ship." },
              { label: "Post-Launch Support", desc: "30 days of bug fixes after delivery. Because real products have real edge cases." },
            ].map(({ label, desc }) => (
              <div
                key={label}
                style={{
                  padding: "2rem",
                  background: "var(--bg-card)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--fg)", margin: 0 }}>{label}</h3>
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>{desc}</p>
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
          style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}
        >
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
            color: "var(--fg)", margin: "0 0 1.25rem",
          }}>
            Not sure what you need?
            <br />
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Let&apos;s figure it out.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "44ch", margin: "0 auto 2.5rem" }}>
            Tell me about your project and I&apos;ll tell you exactly what it needs — no obligation, no sales pitch.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
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
                Get a Quote
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </motion.span>
            </Link>

            <Link href="/work" style={{ textDecoration: "none" }}>
              <motion.span
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.45rem",
                  padding: "0.875rem 1.75rem", borderRadius: 9999,
                  border: "1px solid var(--border-sub)", background: "transparent",
                  color: "var(--fg-sub)", fontSize: "0.9375rem", fontWeight: 500, cursor: "pointer",
                }}
                whileHover={{ scale: 1.03, borderColor: "var(--border-strong)", color: "var(--fg)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                See My Work First
              </motion.span>
            </Link>
          </div>
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