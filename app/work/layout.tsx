import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Explore web applications and websites built by Muhammad Ubaidullah, with the problem, approach, and delivered scope behind each project.",
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
