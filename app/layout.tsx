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
 * - GA4 (only when NEXT_PUBLIC_GA_ID is set)
 */

import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Navbar } from "@/components/layout/Navbar"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { Footer } from "@/components/layout/Footer"
import { SiteIntro } from "@/components/layout/SiteIntro"
import { JsonLd } from "@/components/seo/JsonLd"
import { Analytics } from "@/components/analytics/Analytics"
import { SITE_NAME, SITE_URL, siteSchema } from "@/lib/seo"
import "./globals.css"

// The intro curtain plays once per visit, and only on the homepage. A visitor
// arriving from search on a service page or guide sees the content at once.
const INTRO_GATE = `try{if(location.pathname!=="/"||sessionStorage.getItem("site-intro-seen"))document.documentElement.dataset.siteIntro="done"}catch(e){}`

// Space Grotesk — display font for headings and the wordmark
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muhammad Ubaidullah — Full Stack Developer",
    template: "%s | Muhammad Ubaidullah",
  },
  description:
    "Independent full stack developer building business websites, custom dashboards, AI automation and technical SEO for founders and growing teams worldwide.",
  keywords: [
    "full stack developer",
    "freelance web developer",
    "website development for small business",
    "custom dashboard development",
    "internal tool development",
    "AI automation services",
    "AI workflow automation",
    "generative AI development",
    "SEO services",
    "technical SEO",
    "SaaS development",
    "Next.js developer",
    "React developer",
    "Node.js developer",
    "remote developer",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Web Development",
  applicationName: SITE_NAME,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Muhammad Ubaidullah — Full Stack Developer",
    description:
      "Websites, custom dashboards, AI automation and technical SEO for founders and growing teams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ubaidullah — Full Stack Developer",
    description:
      "Websites, custom dashboards, AI automation and technical SEO for founders and growing teams.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
  referrer: "origin-when-cross-origin",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F7F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0E1A" },
  ],
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={siteSchema} />
        <ThemeProvider>
          <SmoothScroll />
          <SiteIntro />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
