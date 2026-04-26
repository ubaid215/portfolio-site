"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

const PROJECTS = [
  {
    index: "01",
    title: "E-Commerce Platform + Custom CMS",
    description:
      "Full inventory management, analytics dashboard, and custom CMS for a live retail client. Solo-built end-to-end — from DB schema to deployment.",
    stack: ["MERN Stack", "MongoDB", "Node.js", "React", "Redux"],
    role: "Solo Developer",
    status: "Production",
    href: "/work/ecommerce",
  },
  {
    index: "02",
    title: "School Management System",
    description:
      "Multi-portal platform with student, teacher, parent, and admin dashboards. Real-time attendance, grading, fee collection, and notifications.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "WebSocket"],
    role: "Solo Developer",
    status: "Production",
    href: "/work/school",
  },
  {
    index: "03",
    title: "Restaurant POS + CMS",
    description:
      "Full POS system, menu management CMS, and revenue analytics — one cohesive platform. Handles table orders, kitchen flow, and end-of-day reports.",
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    role: "Solo Developer",
    status: "Production",
    href: "/work/restaurant",
  },
  {
    index: "04",
    title: "Donation Manager + WhatsApp Bot",
    description:
      "Dashboard with official WhatsApp Business API integration for automated donor messaging and campaign tracking. Handles bulk messaging with template support.",
    stack: ["MERN Stack", "Meta API", "BullMQ", "Redis"],
    role: "Solo Developer",
    status: "Production",
    href: "/work/donation",
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
    >
      <Link href={project.href} style={{ textDecoration: "none", display: "block" }}>
        <motion.div
          className="project-card"
          style={{
            position: "relative",
            padding: "2rem",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            cursor: "pointer",
            overflow: "hidden",
            transition:
              "border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
          }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {/* Left accent bar — reveals on hover */}
          <div
            className="project-accent-bar"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "3px",
              background: "var(--accent)",
              borderRadius: "var(--radius-lg) 0 0 var(--radius-lg)",
              transform: "scaleY(0)",
              transformOrigin: "bottom",
              transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "0.875rem",
            }}
          >
            {/* Index */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--accent)",
                letterSpacing: "0.08em",
                fontWeight: 500,
                flexShrink: 0,
                paddingTop: "2px",
              }}
            >
              {project.index}
            </span>

            {/* Title + arrow */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.0625rem",
                  fontWeight: 500,
                  color: "var(--fg)",
                  margin: "0 0 0.5rem",
                  lineHeight: 1.3,
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--fg-muted)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Arrow icon */}
            <motion.div
              className="project-arrow"
              style={{
                color: "var(--fg-faint)",
                flexShrink: 0,
                transition: "color 0.2s ease, transform 0.2s ease",
              }}
            >
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "1.25rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            {/* Stack tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--accent)",
                    background: "var(--accent-muted)",
                    border: "1px solid rgba(0,217,166,0.18)",
                    padding: "0.2rem 0.55rem",
                    borderRadius: 9999,
                    letterSpacing: "0.03em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Status badge */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--accent)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                }}
              />
              {project.status}
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function FeaturedWork() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: "-80px" })

  return (
    <section
      id="work"
      style={{
        padding: "clamp(4rem, 10vw, 7rem) 1.5rem",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: "3.5rem" }}>
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
            Featured Work
          </motion.p>

          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "105%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
                margin: "0 0 1rem",
              }}
            >
              Things I&apos;ve{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Actually Built
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            style={{
              fontSize: "1rem",
              color: "var(--fg-muted)",
              lineHeight: 1.65,
              maxWidth: "48ch",
              margin: 0,
            }}
          >
            Not mockups. Not tutorials. Real products, real users, real data.
          </motion.p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.index} project={project} index={i} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            marginTop: "2.5rem",
            textAlign: "center",
          }}
        >
          <Link href="/work" style={{ textDecoration: "none" }}>
            <motion.span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: "var(--fg-muted)",
                borderBottom: "1px solid var(--border-sub)",
                paddingBottom: "2px",
                cursor: "pointer",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              whileHover={{ color: "var(--accent)" }}
            >
              View all projects
              <ArrowUpRight size={15} strokeWidth={2} />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <style>{`
        .project-card:hover {
          border-color: var(--border-strong);
          background: var(--bg-card-hover);
          box-shadow: var(--shadow-lg);
        }
        .project-card:hover .project-accent-bar {
          transform: scaleY(1);
        }
        .project-card:hover .project-arrow {
          color: var(--accent);
          transform: translate(2px, -2px);
        }
      `}</style>
    </section>
  )
}