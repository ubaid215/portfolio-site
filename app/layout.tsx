/**
 * app/layout.tsx
 * 
 * Root layout — wires together:
 * - Geist fonts (built into Next.js)
 * - Space Grotesk via next/font/google
 * - ThemeProvider (next-themes)
 * - globals.css design system
 * - SmoothScroll (Lenis, driven by the GSAP ticker)
 * - Navbar & Footer (persistent across all pages)
 * - suppressHydrationWarning (required for next-themes)
 */

import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Navbar } from "@/components/layout/Navbar"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { Footer } from "@/components/layout/Footer"
import { SiteIntro } from "@/components/layout/SiteIntro"
import "./globals.css"

// Space Grotesk — display font for headings and the wordmark
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ubaid.dev"),
  title: {
    default: "Muhammad Ubaidullah | Web, SaaS & AI Development",
    template: "%s | Muhammad Ubaidullah",
  },
  description:
    "Independent full stack developer helping founders and teams build websites, SaaS products, and practical AI solutions. Explore the work and start a conversation.",
  keywords: [
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "NestJS",
    "MERN Stack",
    "PERN Stack",
    "Freelance Developer",
    "Remote Developer",
    "Pakistan Developer",
  ],
  authors: [{ name: "Muhammad Ubaidullah" }],
  creator: "Muhammad Ubaidullah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ubaid.dev",
    siteName: "Muhammad Ubaidullah",
    title: "Muhammad Ubaidullah | Web, SaaS & AI Development",
    description: "Your goals shape what I build. Websites, SaaS products, and practical AI solutions for founders and teams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ubaidullah | Web, SaaS & AI Development",
    description: "Your goals shape what I build. Websites, SaaS products, and practical AI solutions for founders and teams.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // suppressHydrationWarning is REQUIRED for next-themes
    // It prevents the hydration mismatch warning from the
    // data-theme attribute being set by the browser before React hydrates.
    <html
      lang="en"
      data-site-intro="playing"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <SmoothScroll />
          <SiteIntro />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
