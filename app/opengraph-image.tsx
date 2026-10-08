import { ImageResponse } from "next/og"

export const alt = "Muhammad Ubaidullah — web applications for real workflows"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0A0E1A", color: "#F8F7F4" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 25, letterSpacing: 2 }}>
        <div style={{ width: 15, height: 15, borderRadius: 99, background: "#00D9A6" }} />
        MUHAMMAD UBAIDULLAH
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 82, lineHeight: 1.05, letterSpacing: -3, maxWidth: 1000 }}>Software for work that can’t stay in spreadsheets.</div>
        <div style={{ width: 130, height: 5, background: "#00D9A6" }} />
        <div style={{ fontSize: 27, color: "#B9C2D1" }}>Operations systems · Product MVPs · Internal dashboards</div>
      </div>
      <div style={{ fontSize: 22, color: "#00D9A6" }}>ubaid.dev</div>
    </div>,
    size,
  )
}
