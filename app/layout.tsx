/**
 * app/layout.tsx
 * 
 * Root layout — wires together:
 * - Geist fonts (built into Next.js)
 * - Instrument Serif via next/font/google
 * - ThemeProvider (next-themes)
 * - globals.css design system
 * - Navbar & Footer (persistent across all pages)
 * - suppressHydrationWarning (required for next-themes)
 */

import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Instrument_Serif } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"

// Instrument Serif — display font for headings
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ubaid.dev"),
  title: {
    default: "Muhammad Ubaidullah — Full Stack Developer",
    template: "%s | Muhammad Ubaidullah",
  },
  description:
    "Muhammad Ubaidullah builds web applications for teams managing operations, customers, and reporting. Explore selected work and discuss a project.",
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
    title: "Muhammad Ubaidullah — Full Stack Developer",
    description: "Web applications for teams managing operations, customers, and reporting. Explore selected work and discuss a project.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ubaidullah — Full Stack Developer",
    description: "Web applications for operations, customers, and reporting. Explore selected work.",
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
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
