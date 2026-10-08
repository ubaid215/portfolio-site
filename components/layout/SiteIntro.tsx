"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import portrait from "../../public/images/portfolio-img.png"
import styles from "./SiteIntro.module.css"

export function SiteIntro() {
  const introRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  const finish = useCallback(() => {
    document.documentElement.dataset.siteIntro = "done"
    setVisible(false)
  }, [])

  useEffect(() => {
    if (!visible) return

    document.documentElement.dataset.siteIntro = "playing"
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const frame = window.requestAnimationFrame(() => {
      const intro = introRef.current
      // CSS may have finished before hydration on a slow connection.
      if (motionPreference.matches || (intro && getComputedStyle(intro).visibility === "hidden")) {
        finish()
      }
    })
    const motionChanged = () => {
      if (motionPreference.matches) finish()
    }

    // The CSS exit normally completes the sequence; this also covers a paused animation.
    const fallback = window.setTimeout(finish, 3200)
    const skipOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish()
    }
    window.addEventListener("keydown", skipOnEscape)
    motionPreference.addEventListener("change", motionChanged)

    return () => {
      window.clearTimeout(fallback)
      window.cancelAnimationFrame(frame)
      window.removeEventListener("keydown", skipOnEscape)
      motionPreference.removeEventListener("change", motionChanged)
    }
  }, [finish, visible])

  if (!visible) return null

  return (
    <div
      ref={introRef}
      className={styles.intro}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) finish()
      }}
    >
      <div className={styles.topline} aria-hidden="true">
        <span>MUHAMMAD UBAIDULLAH</span>
        <span>INDEPENDENT DEVELOPER</span>
      </div>

      <div className={styles.center} aria-hidden="true">
        <span className={styles.backdropName}>UBAID</span>
        <div className={styles.portraitFrame}>
          <Image
            src={portrait}
            alt=""
            fill
            sizes="(max-width: 600px) 60vw, (max-width: 1000px) 38vw, 360px"
            preload
            placeholder="blur"
            className={styles.portrait}
          />
          <span className={styles.revealRule} />
        </div>
        <div className={styles.caption}>
          <span>01 / 01</span>
          <span>Websites &amp; custom applications</span>
        </div>
      </div>

      <div className={styles.bottomline}>
        <span aria-hidden="true">CRAFTED FOR WHAT COMES NEXT</span>
        <button type="button" onClick={finish} className={styles.skip}>
          Skip intro <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  )
}
