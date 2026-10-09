"use client"

/**
 * Navbar.tsx
 *
 * Features:
 * - Scroll-aware: floats as full-width → shrinks to centered pill with rounded corners
 * - Mobile: full-screen overlay with staggered link entrance + exit timeline
 * - Theme toggle: seamless AnimatePresence icon swap
 * - Lucide React icons
 * - motion/react v12
 * - Fully typed, zero lint errors
 */

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

/* ── Types ───────────────────────────────────────────────────────────── */
interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: "Work",     href: "/work"     },
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Contact",  href: "/contact"  },
]

function AnimatedNavLabel({ label }: { label: string }) {
  return (
    <span className="navbar-link-label">
      <span>{label}</span>
      <span aria-hidden="true">{label}</span>
    </span>
  )
}

/* ── Animation variants ──────────────────────────────────────────────── */
const EASE_LUXURY = [0.16, 1, 0.3, 1] as const

// Mobile overlay backdrop
const overlayVariants = {
  closed: { opacity: 0 },
  open:   { opacity: 1 },
}

// Mobile overlay container
const menuVariants = {
  closed: {
    clipPath: "inset(0% 0% 100% 0% round 0px)",
    transition: { duration: 0.5, ease: EASE_LUXURY },
  },
  open: {
    clipPath: "inset(0% 0% 0% 0% round 0px)",
    transition: { duration: 0.6, ease: EASE_LUXURY },
  },
}

// Stagger parent for nav links
const linkListVariants = {
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  open:   { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
}

// Individual link reveal
const linkItemVariants = {
  closed: {
    opacity: 0,
    y: 32,
    transition: { duration: 0.3, ease: EASE_LUXURY },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_LUXURY },
  },
}

// Bottom items (toggle + CTA) — slide up slightly after links
const bottomVariants = {
  closed: { opacity: 0, y: 16, transition: { duration: 0.25 } },
  open:   { opacity: 1, y: 0,  transition: { duration: 0.5, delay: 0.45, ease: EASE_LUXURY } },
}

/* ── Component ───────────────────────────────────────────────────────── */
export function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false)
  const [scrolled,  setScrolled]  = useState(false)

  const { scrollY } = useScroll()

  // Detect scroll past 60px → switch to pill mode
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60)
  })

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const toggleMenu = useCallback(() => setIsOpen((v) => !v), [])
  const closeMenu  = useCallback(() => setIsOpen(false),      [])

  return (
    <>
      {/* ── Desktop / Mobile Top Bar ──────────────────────────────── */}
      <motion.header
        data-framer-motion
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",   // let clicks pass through padding
          paddingTop: scrolled ? "0.75rem" : "0",
        }}
        animate={{ paddingTop: scrolled ? "0.75rem" : "0" }}
        transition={{ duration: 0.5, ease: EASE_LUXURY }}
      >
        <motion.nav
          className="site-navbar"
          data-scrolled={scrolled}
          data-framer-motion
          aria-label="Main navigation"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pointerEvents: "auto",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            background: "var(--navbar-bg)",
            borderBottom: scrolled ? "none" : "1px solid var(--border)",
            border: scrolled ? "1px solid var(--border-sub)" : "none",
            borderBottomColor: scrolled ? undefined : "var(--border)",
          }}
          animate={{
            width:        scrolled ? "min(720px, calc(100vw - 3rem))" : "100%",
            borderRadius: scrolled ? 9999 : 0,
            paddingLeft:  scrolled ? "1.25rem" : "var(--navbar-edge-padding, 1.5rem)",
            paddingRight: scrolled ? "1.25rem" : "var(--navbar-edge-padding, 1.5rem)",
            paddingTop:   "0.875rem",
            paddingBottom:"0.875rem",
            boxShadow:    scrolled
              ? "0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px var(--border-sub)"
              : "none",
          }}
          transition={{ duration: 0.55, ease: EASE_LUXURY }}
        >
          {/* Logo */}
          <Link href="/" onClick={closeMenu} aria-label="Home">
            <motion.span
              data-framer-motion
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "1.25rem",
                color: "var(--accent-ink)",
                letterSpacing: "-0.03em",
                userSelect: "none",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2, ease: EASE_LUXURY }}
            >
              ubaid.dev
            </motion.span>
          </Link>

          {/* Desktop links */}
          <ul
            style={{
              display: "none",
              alignItems: "center",
              gap: "0.25rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="desktop-nav-links"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="navbar-link">
                  <AnimatedNavLabel label={label} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: Theme toggle + Hire CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <ThemeToggle />

            {/* Desktop CTA */}
            <Link href="/contact" className="desktop-cta">
              <motion.span
                data-framer-motion
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.5rem 1.1rem",
                  borderRadius: 9999,
                  background: "var(--accent)",
                  color: "var(--accent-text)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                whileHover={{ scale: 1.04, backgroundColor: "var(--accent-hover)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE_LUXURY }}
              >
                Start a Project
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </motion.span>
            </Link>

            {/* Mobile hamburger */}
            <motion.button
              data-framer-motion
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "var(--radius-md)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-sub)",
                cursor: "pointer",
                color: "var(--fg-sub)",
              }}
              whileHover={{ scale: 1.05, borderColor: "var(--accent)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: EASE_LUXURY }}
              className="mobile-hamburger"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0,   opacity: 1, scale: 1 }}
                    exit={{    rotate:  90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: EASE_LUXURY }}
                    style={{ display: "flex" }}
                  >
                    <X size={18} strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0,  opacity: 1, scale: 1 }}
                    exit={{    rotate:-90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: EASE_LUXURY }}
                    style={{ display: "flex" }}
                  >
                    <Menu size={18} strokeWidth={2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.nav>
      </motion.header>

      {/* ── Mobile Full-Screen Overlay ────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              data-framer-motion
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              onClick={closeMenu}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 198,
                background: "rgba(10,14,26,0.4)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />

            {/* Menu panel */}
            <motion.div
              key="menu"
              data-framer-motion
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              // Let the panel scroll itself while smooth scrolling owns the page.
              data-lenis-prevent
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 199,
                background: "var(--bg)",
                display: "flex",
                flexDirection: "column",
                padding: "7rem 2rem 3rem",
                overflowY: "auto",
              }}
            >
              {/* Accent glow orb — decorative */}
              <div
                style={{
                  position: "absolute",
                  top: "-10%",
                  right: "-10%",
                  width: "40vw",
                  height: "40vw",
                  borderRadius: "50%",
                  background: "var(--accent-muted)",
                  filter: "blur(60px)",
                  pointerEvents: "none",
                }}
              />

              {/* Nav links */}
              <motion.ul
                variants={linkListVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "0.25rem",
                }}
              >
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li key={href} variants={linkItemVariants}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className="navbar-menu-link"
                      style={{ display: "block", textDecoration: "none" }}
                    >
                      <motion.div
                        data-framer-motion
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1rem 0",
                          borderBottom: "1px solid var(--border)",
                          color: "var(--fg)",
                        }}
                        whileHover={{ x: 8, color: "var(--accent-ink)" }}
                        transition={{ duration: 0.2, ease: EASE_LUXURY }}
                      >
                        <span style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(2rem, 8vw, 3.5rem)",
                          fontWeight: 400,
                          lineHeight: 1.1,
                          letterSpacing: "-0.02em",
                        }}>
                          <AnimatedNavLabel label={label} />
                        </span>
                        <span style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--type-meta-size)",
                          color: "var(--fg-faint)",
                          letterSpacing: "0.08em",
                        }}>
                          0{i + 1}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Bottom row: theme toggle + CTA */}
              <motion.div
                variants={bottomVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "2rem",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <ThemeToggle />
                  <span style={{ fontSize: "0.8125rem", color: "var(--fg-muted)" }}>
                    Toggle theme
                  </span>
                </div>

                <Link href="/contact" onClick={closeMenu}>
                  <motion.span
                    data-framer-motion
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.75rem 1.5rem",
                      borderRadius: 9999,
                      background: "var(--accent)",
                      color: "var(--accent-text)",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    whileHover={{ scale: 1.04, backgroundColor: "var(--accent-hover)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: EASE_LUXURY }}
                  >
                    Start a Project
                    <ArrowUpRight size={15} strokeWidth={2.5} />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Scoped styles ─────────────────────────────────────────── */}
      <style>{`
        .navbar-link,
        .navbar-menu-link {
          --nav-roll-ease: cubic-bezier(0.22, 0.68, 0.2, 1);
          position: relative;
        }

        .navbar-link {
          display: block;
          padding: 0.375rem 0.875rem;
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--fg-muted);
          text-decoration: none;
          transition: color 500ms ease;
        }

        .navbar-link-label {
          position: relative;
          display: inline-block;
          vertical-align: top;
          height: 1.5em;
          line-height: 1.5;
          overflow: hidden;
        }

        .navbar-link-label > span {
          display: block;
          transition: transform 850ms var(--nav-roll-ease);
        }

        .navbar-link-label > span:last-child {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
        }

        .navbar-link::after,
        .navbar-menu-link::after {
          content: "";
          position: absolute;
          left: 0.875rem;
          right: 0.875rem;
          bottom: 0.25rem;
          height: 1px;
          background: var(--accent-ink);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 950ms var(--nav-roll-ease);
          pointer-events: none;
        }

        .navbar-link:is(:hover, :focus-visible),
        .navbar-menu-link:is(:hover, :focus-visible) {
          color: var(--fg);
        }

        .navbar-link:is(:hover, :focus-visible) .navbar-link-label > span,
        .navbar-menu-link:is(:hover, :focus-visible) .navbar-link-label > span {
          transform: translateY(-100%);
        }

        .navbar-link:is(:hover, :focus-visible)::after,
        .navbar-menu-link:is(:hover, :focus-visible)::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .navbar-menu-link .navbar-link-label {
          height: 1.1em;
          line-height: 1.1;
        }

        .navbar-menu-link::after {
          left: 0;
          right: 0;
          bottom: 0;
        }

        .navbar-link:focus-visible,
        .navbar-menu-link:focus-visible {
          outline: 2px solid var(--accent-ink);
          outline-offset: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar-link-label > span,
          .navbar-link::after,
          .navbar-menu-link::after {
            transition: none;
          }
          .navbar-link:is(:hover, :focus-visible) .navbar-link-label > span,
          .navbar-menu-link:is(:hover, :focus-visible) .navbar-link-label > span {
            transform: none;
          }
        }

        /* Show desktop links on md+ */
        @media (min-width: 768px) {
          .site-navbar {
            --navbar-edge-padding: clamp(1.5rem, 5vw, 5rem);
            max-width: 1600px;
          }
          .site-navbar[data-scrolled="false"] {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          .desktop-nav-links {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }

        /* Hide desktop CTA on mobile (only in navbar — it's in menu too) */
        .desktop-cta {
          display: none;
        }
        @media (min-width: 768px) {
          .desktop-cta {
            display: inline-flex;
          }
        }
      `}</style>
    </>
  )
}
