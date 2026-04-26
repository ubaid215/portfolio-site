"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { PROJECTS, type ProjectCategory } from "@/lib/projects"

const EASE = [0.16, 1, 0.3, 1] as const

const FILTERS: ("All" | ProjectCategory)[] = [
  "All",
  "Full Stack",
  "Frontend",
  "SaaS",
  "Client Work",
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
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.07 }}
      layout
    >
      <Link
        href={`/work/${project.slug}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <motion.article
          className="work-card"
          style={{
            position: "relative",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            overflow: "hidden",
            cursor: "pointer",
            transition:
              "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
          }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {/* Hero mockup area */}
          <div
            style={{
              height: 220,
              background: project.heroBg,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Dot grid overlay */}
            <div
              aria-hidden
              className="bg-dot-grid"
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.18,
                pointerEvents: "none",
              }}
            />

            {/* Accent glow */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "30%",
                left: "20%",
                width: "60%",
                height: "60%",
                borderRadius: "50%",
                background: "var(--accent-muted)",
                filter: "blur(50px)",
                opacity: 0.6,
                pointerEvents: "none",
              }}
            />

            {/* Project index number — large decorative */}
            <span
              aria-hidden
              style={{
                position: "absolute",
                right: "1.5rem",
                bottom: "-0.5rem",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "7rem",
                fontWeight: 400,
                lineHeight: 1,
                color: "rgba(0,217,166,0.06)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {project.index}
            </span>

            {/* Status badge */}
            <div
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.25rem 0.625rem",
                borderRadius: 9999,
                background: "rgba(0,217,166,0.12)",
                border: "1px solid rgba(0,217,166,0.25)",
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
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  fontWeight: 500,
                  color: "var(--accent)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {project.status}
              </span>
            </div>

            {/* Arrow icon top-right */}
            <div
              className="work-card-arrow"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: 36,
                height: 36,
                borderRadius: "var(--radius-md)",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--fg-faint)",
                transition: "color 0.2s ease, background 0.2s ease, border-color 0.2s ease",
              }}
            >
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </div>

            {/* Center: project index pill */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                  fontWeight: 500,
                  padding: "0.25rem 0.75rem",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,217,166,0.2)",
                  background: "rgba(0,217,166,0.06)",
                }}
              >
                Project {project.index}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "1.125rem",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "-0.01em",
                }}
              >
                {project.year}
              </span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "1.5rem" }}>
            {/* Categories */}
            <div
              style={{
                display: "flex",
                gap: "0.375rem",
                flexWrap: "wrap",
                marginBottom: "0.875rem",
              }}
            >
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--fg-faint)",
                    padding: "0.2rem 0.5rem",
                    borderRadius: 9999,
                    border: "1px solid var(--border)",
                    background: "var(--bg-sub)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2
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
            </h2>

            {/* Tagline */}
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--fg-muted)",
                lineHeight: 1.6,
                margin: "0 0 1.25rem",
              }}
            >
              {project.tagline}
            </p>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: "var(--border)",
                margin: "0 0 1.125rem",
              }}
            />

            {/* Stack tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {project.stack.slice(0, 5).map((tag) => (
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
              {project.stack.length > 5 && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--fg-faint)",
                    padding: "0.2rem 0.55rem",
                    letterSpacing: "0.03em",
                  }}
                >
                  +{project.stack.length - 5} more
                </span>
              )}
            </div>
          </div>

          {/* Left accent bar */}
          <div
            className="work-card-bar"
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
        </motion.article>
      </Link>
    </motion.div>
  )
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | ProjectCategory>("All")
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: "-80px" })

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(activeFilter))

  return (
    <main
      style={{
        paddingTop: "7rem",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      {/* Header */}
      <section
        style={{
          padding: "clamp(3rem, 8vw, 5rem) 1.5rem clamp(2rem, 5vw, 3rem)",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-sub)",
        }}
      >
        {/* Decorative glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-20%",
            right: "-5%",
            width: "40vw",
            height: "40vw",
            borderRadius: "50%",
            background: "var(--accent-muted)",
            filter: "blur(90px)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        <div
          ref={headingRef}
          style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}
        >
          {/* Eyebrow */}
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
            Portfolio
          </motion.p>

          <div style={{ overflow: "hidden", marginBottom: "1.25rem" }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--fg)",
                margin: 0,
              }}
            >
              Things I&apos;ve{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Actually Built
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "var(--fg-muted)",
                lineHeight: 1.7,
                maxWidth: "48ch",
                margin: 0,
              }}
            >
              Not mockups. Not tutorials. Real products, real users, real data.
              Every project shipped to production — built solo, end-to-end.
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "2rem", flexShrink: 0 }}>
              {[
                { v: "5", l: "Projects" },
                { v: "100%", l: "Shipped" },
                { v: "3+", l: "Years" },
              ].map(({ v, l }) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: "1.75rem",
                      color: "var(--accent)",
                      margin: "0 0 0.125rem",
                      lineHeight: 1,
                    }}
                  >
                    {v}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      color: "var(--fg-faint)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      margin: 0,
                    }}
                  >
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section style={{ padding: "clamp(3rem, 6vw, 4.5rem) 1.5rem", maxWidth: 1200, margin: "0 auto" }}>
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {FILTERS.map((filter) => {
            const active = filter === activeFilter
            return (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: "0.5rem 1.125rem",
                  borderRadius: 9999,
                  border: active
                    ? "1px solid rgba(0,217,166,0.5)"
                    : "1px solid var(--border)",
                  background: active ? "var(--accent-muted)" : "transparent",
                  color: active ? "var(--accent)" : "var(--fg-muted)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                {filter}
                {filter !== "All" && (
                  <span
                    style={{
                      marginLeft: "0.375rem",
                      color: active ? "var(--accent)" : "var(--fg-faint)",
                    }}
                  >
                    ({PROJECTS.filter((p) => p.categories.includes(filter as ProjectCategory)).length})
                  </span>
                )}
                {filter === "All" && (
                  <span style={{ marginLeft: "0.375rem", color: active ? "var(--accent)" : "var(--fg-faint)" }}>
                    ({PROJECTS.length})
                  </span>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 0",
              color: "var(--fg-faint)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
            }}
          >
            No projects in this category yet.
          </div>
        )}
      </section>

      <style>{`
        .work-card:hover {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-lg);
        }
        .work-card:hover .work-card-bar {
          transform: scaleY(1);
        }
        .work-card:hover .work-card-arrow {
          color: var(--accent) !important;
          background: rgba(0,217,166,0.12) !important;
          border-color: rgba(0,217,166,0.3) !important;
        }
      `}</style>
    </main>
  )
}