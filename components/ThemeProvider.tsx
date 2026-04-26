"use client"

/**
 * ThemeProvider.tsx
 * 
 * Wraps next-themes with a luxury transition effect.
 * When the theme switches, it briefly adds .no-transition
 * to prevent the initial flash, then allows the smooth
 * CSS transition defined in globals.css to take over.
 * 
 * Usage in layout.tsx:
 * 
 *   import { ThemeProvider } from "@/components/ThemeProvider"
 *   
 *   <ThemeProvider>
 *     {children}
 *   </ThemeProvider>
 */

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ReactNode } from "react"

interface Props {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="data-theme"       // matches [data-theme="dark"] in globals.css
      defaultTheme="dark"          // dark is your primary vibe
      enableSystem={true}          // respects OS preference on first visit
      disableTransitionOnChange={false} // we handle transitions ourselves in CSS
    >
      {children}
    </NextThemesProvider>
  )
}