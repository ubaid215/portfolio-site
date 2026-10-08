import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Explore websites and applications built by Muhammad Ubaidullah. See the business challenge, decisions, and delivered product behind each project.",
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
