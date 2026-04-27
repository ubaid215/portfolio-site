"use client"

import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiTailwindcss,
  SiRedis,
  SiDocker,
  SiTypescript,
  SiFramer,
  SiCloudinary,
  SiStripe,
} from "react-icons/si"

import { TbApi } from "react-icons/tb"
import { BsDatabase } from "react-icons/bs"
import { FaAws } from "react-icons/fa"

// -----------------------------
// Tech Stack Data
// -----------------------------
const STACK_ROW_1 = [
  "Next.js",
  "React",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Tailwind CSS",
  "Redis",
  "Docker",
  "TypeScript",
  "REST API",
]

const STACK_ROW_2 = [
  "AWS S3",
  "Framer Motion",
  "WebSocket",
  "BullMQ",
  "Zod",
  "Zustand",
  "Shadcn UI",
  "Cloudinary",
  "JWT",
  "Stripe",
  "Mongoose",
  "Drizzle",
]

// -----------------------------
// Icon Mapping
// -----------------------------
const ic = (icon: React.ReactNode, color: string) => (
  <span style={{ color, display: "inline-flex", alignItems: "center" }}>{icon}</span>
)

const TECH_ICONS: Record<string, React.ReactNode> = {
  "Next.js":       ic(<SiNextdotjs />,    "#000000"),
  React:           ic(<SiReact />,         "#61DAFB"),
  "Node.js":       ic(<SiNodedotjs />,     "#339933"),
  NestJS:          ic(<SiNestjs />,        "#E0234E"),
  PostgreSQL:      ic(<SiPostgresql />,    "#4169E1"),
  MongoDB:         ic(<SiMongodb />,       "#47A248"),
  Prisma:          ic(<SiPrisma />,        "#2D3748"),
  "Tailwind CSS":  ic(<SiTailwindcss />,   "#06B6D4"),
  Redis:           ic(<SiRedis />,         "#DC382D"),
  Docker:          ic(<SiDocker />,        "#2496ED"),
  TypeScript:      ic(<SiTypescript />,    "#3178C6"),
  "REST API":      ic(<TbApi />,           "#6366F1"),
  "AWS S3":        ic(<FaAws />,           "#FF9900"),
  "Framer Motion": ic(<SiFramer />,        "#0055FF"),
  Cloudinary:      ic(<SiCloudinary />,    "#3448C5"),
  Stripe:          ic(<SiStripe />,        "#635BFF"),

  // Generic / fallback mappings
  WebSocket: ic(<TbApi />,      "#6366F1"),
  BullMQ:    ic(<BsDatabase />, "#FF4444"),
  Zod:       ic(<BsDatabase />, "#3E67B1"),
  Zustand:   ic(<BsDatabase />, "#443E3E"),
  JWT:       ic(<TbApi />,      "#D63AFF"),
  Mongoose:  ic(<BsDatabase />, "#880000"),
  Drizzle:   ic(<BsDatabase />, "#C5F74F"),
}

// -----------------------------
// Marquee Row Component
// -----------------------------
function MarqueeRow({
  items,
  reverse = false,
  duration = "35s",
}: {
  items: string[]
  reverse?: boolean
  duration?: string
}) {
  const doubled = [...items, ...items]

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      {/* Left fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "8rem",
          background: "linear-gradient(to right, var(--bg-sub), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Right fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "8rem",
          background: "linear-gradient(to left, var(--bg-sub), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          width: "max-content",
          gap: "0.75rem",
          padding: "0.375rem 0",
          animation: `${
            reverse ? "marqueeReverse" : "marquee"
          } ${duration} linear infinite`,
        }}
        className="marquee-pause-hover"
      >
        {doubled.map((tech, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 0.875rem",
              borderRadius: 9999,
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--fg-sub)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {/* Icon / Fallback */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                flexShrink: 0,
              }}
            >
              {TECH_ICONS[tech] ?? (
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    opacity: 0.7,
                  }}
                />
              )}
            </span>

            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

// -----------------------------
// Main Component
// -----------------------------
export function TechMarquee() {
  return (
    <section
      style={{
        padding: "5rem 0",
        background: "var(--bg-sub)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: "2rem",
            height: "1px",
            background: "var(--accent)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--fg-faint)",
          }}
        >
          Tech Stack
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <MarqueeRow items={STACK_ROW_1} duration="40s" />
        <MarqueeRow items={STACK_ROW_2} reverse duration="32s" />
      </div>

      <style>{`
        .marquee-pause-hover:hover {
          animation-play-state: paused;
        }

        .marquee-pause-hover svg {
          width: 14px;
          height: 14px;
          transition: transform 0.2s ease;
        }

        .marquee-pause-hover span:hover svg {
          transform: scale(1.15);
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeReverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}