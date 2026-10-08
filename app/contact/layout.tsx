import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a project or a role in mind? Talk to Muhammad Ubaidullah about websites, SaaS products, AI solutions, or joining your team.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
