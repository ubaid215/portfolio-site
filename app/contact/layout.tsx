import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Muhammad Ubaidullah about your web application, dashboard, or product idea and discuss the next step.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
