"use client"

const STACK_ROW_1 = [
  "Next.js", "React", "Node.js", "NestJS", "PostgreSQL", "MongoDB",
  "Prisma", "Tailwind CSS", "Redis", "Docker", "TypeScript", "REST API",
]

const STACK_ROW_2 = [
  "AWS S3", "Framer Motion", "WebSocket", "BullMQ", "Zod", "Zustand",
  "Shadcn UI", "Cloudinary", "JWT", "Stripe", "Mongoose", "Drizzle",
]

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
          animation: `${reverse ? "marqueeReverse" : "marquee"} ${duration} linear infinite`,
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
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
                opacity: 0.7,
              }}
            />
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

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
      `}</style>
    </section>
  )
}