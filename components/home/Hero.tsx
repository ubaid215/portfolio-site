"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowDown, ArrowUpRight } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(5rem, 12svh, 7rem) 1.5rem clamp(3rem, 6svh, 4rem)",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Dot-grid background */}
      <div
        aria-hidden="true"
        className="bg-dot-grid"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Accent glow orbs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: "clamp(280px, 35vw, 520px)",
          height: "clamp(280px, 35vw, 520px)",
          borderRadius: "50%",
          background: "var(--accent-muted)",
          filter: "blur(96px)",
          pointerEvents: "none",
          animation: "glowPulse 7s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "clamp(200px, 25vw, 360px)",
          height: "clamp(200px, 25vw, 360px)",
          borderRadius: "50%",
          background: "var(--accent-muted)",
          filter: "blur(120px)",
          opacity: 0.5,
          pointerEvents: "none",
          animation: "glowPulse 10s ease-in-out infinite reverse",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 860,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-meta-size)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent-ink)",
              padding: "0.375rem 1rem",
              borderRadius: 9999,
              border: "1px solid rgba(0,217,166,0.25)",
              background: "var(--accent-muted)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
                animation: "pulse 2s ease infinite",
                flexShrink: 0,
              }}
            />
            Available for client projects
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
          <motion.h1
            className="type-display"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            style={{
              color: "var(--fg)",
              margin: 0,
            }}
          >
            Software for work that
            <br />
            can&apos;t stay in <span style={{ fontStyle: "italic", color: "var(--accent-ink)" }}>spreadsheets.</span>
          </motion.h1>
        </div>

        {/* Sub-headline */}
        <motion.p
          className="type-lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          style={{
            color: "var(--fg-muted)",
            margin: "0 auto clamp(1.5rem, 3svh, 2.5rem)",
          }}
        >
          I&apos;m Muhammad Ubaidullah. I turn manual workflows into web applications
          for teams managing bookings, inventory, reporting, and more. Work directly
          with me from scoping through launch.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "clamp(1.5rem, 3svh, 3rem)",
          }}
        >
          <Link href="#work" style={{ textDecoration: "none" }}>
            <motion.span
              className="cta-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.8125rem 1.75rem",
                borderRadius: 9999,
                background: "var(--accent)",
                color: "var(--accent-text)",
                fontSize: "0.9375rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              Explore Selected Work
              <ArrowDown size={15} strokeWidth={2.5} />
            </motion.span>
          </Link>

          <Link href="/contact" style={{ textDecoration: "none" }}>
            <motion.span
              className="cta-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.8125rem 1.75rem",
                borderRadius: 9999,
                border: "1px solid var(--border-sub)",
                background: "transparent",
                color: "var(--fg-sub)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              whileHover={{ scale: 1.03, borderColor: "var(--border-strong)", color: "var(--fg)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              Discuss a Project
              <ArrowUpRight size={15} strokeWidth={2} />
            </motion.span>
          </Link>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem 1.5rem",
          }}
        >
          {[
            "Operations software",
            "Direct collaboration",
            "Remote worldwide",
          ].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-meta-size)",
                color: "var(--fg-faint)",
                letterSpacing: "0.04em",
              }}
            >
              {i > 0 && (
                <span style={{ marginRight: "1.5rem", color: "var(--border-sub)" }}>·</span>
              )}
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--fg-faint)",
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <style>{`
        .cta-primary { transition: background-color 0.2s cubic-bezier(0.16,1,0.3,1); }
        .cta-primary:hover { background-color: var(--accent-hover); }
        .cta-secondary { transition: background-color 0.2s cubic-bezier(0.16,1,0.3,1); }
        .cta-secondary:hover { background-color: var(--bg-card); }
      `}</style>
    </section>
  )
}
