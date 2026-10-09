"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials"
import styles from "./Testimonials.module.css"

// One line of stories drifts left. The line repeats its stories so a copy
// always outruns the viewport, then renders that copy twice so the -50% loop
// closes without a seam.
const REPEATS = 2
const PIXELS_PER_SECOND = 45

function StoryCard({ story, variant, duplicate }: { story: Testimonial; variant: number; duplicate: boolean }) {
  return (
    <article className={styles.card} aria-hidden={duplicate || undefined} aria-labelledby={duplicate ? undefined : `story-${story.id}`}>
      <div className={`${styles.surface} ${variant === 0 ? styles.jade : variant === 2 ? styles.ink : ""}`}>
        {story.product && (
          <div className={styles.productImage}>
            <Image src="/images/projects/finaccont/cover.png" alt="Finaccont accounting software interface" fill sizes="(max-width: 600px) 80vw, 400px" draggable={false} />
          </div>
        )}
        <p className={story.product ? styles.productNote : styles.story}>{story.story}</p>
        <div className={styles.person}>
          <span className={styles.avatar} aria-hidden="true">{story.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span>
          <div><h3 id={duplicate ? undefined : `story-${story.id}`}>{story.name}</h3><p>{story.context}</p></div>
        </div>
        {story.link
          ? <div className={styles.cardFooter}><Link href={story.link.href} tabIndex={duplicate ? -1 : undefined}>{story.link.label}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          : story.product && <div className={styles.cardFooter}><span>Created by Muhammad Ubaidullah</span></div>}
      </div>
    </article>
  )
}

function MarqueeLine() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const copy = track?.firstElementChild
    if (!track || !(copy instanceof HTMLElement)) return
    // Pace from the measured width so the drift stays constant across widths.
    const pace = () => {
      const width = copy.offsetWidth
      if (width > 0) track.style.setProperty("--line-duration", `${(width / PIXELS_PER_SECOND).toFixed(1)}s`)
    }
    pace()
    const observer = new ResizeObserver(pace)
    observer.observe(copy)
    return () => observer.disconnect()
  }, [])

  const cards = (duplicate: boolean) =>
    Array.from({ length: REPEATS }, () => TESTIMONIALS)
      .flat()
      .map((story, index) => (
        <StoryCard
          key={`${story.id}-${index}`}
          story={story}
          variant={index % TESTIMONIALS.length}
          duplicate={duplicate || index >= TESTIMONIALS.length}
        />
      ))

  return (
    <div className={styles.viewport}>
      <div ref={trackRef} className={styles.track}>
        <div className={styles.copy}>{cards(false)}</div>
        <div className={styles.copy} aria-hidden="true">{cards(true)}</div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.header}>
        <h2 id="testimonials-title" className={styles.heading}>The stories<br />behind the work.</h2>
        <p className={styles.introduction}>Different businesses. Shared ambition. A closer look at the experience around the build.</p>
      </div>

      <div className={styles.line}>
        <MarqueeLine />
      </div>
    </section>
  )
}
