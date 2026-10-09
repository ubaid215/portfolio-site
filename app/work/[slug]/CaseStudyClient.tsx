"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Maximize2, X } from "lucide-react"
import type { Project } from "@/lib/projects"
import { CaseStudyMotion } from "@/components/work/CaseStudyMotion"
import styles from "./page.module.css"

interface Props {
  project: Project
  adjacent: { prev: Project | null; next: Project | null }
}

const chapters = [
  { id: "challenge", label: "The challenge" },
  { id: "approach", label: "The approach" },
  { id: "product", label: "The product" },
  { id: "delivery", label: "The delivery" },
]

function RollingLabel({ children }: { children: string }) {
  return (
    <span className={styles.roll}>
      <span className={styles.rollInner}>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  )
}

function ProjectImage({ src, alt, sizes, eager = false }: { src: string; alt: string; sizes: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <span className={styles.imageFallback}><span>Preview unavailable</span><span>{alt}</span></span>
  ) : (
    <Image src={src} alt={alt} fill sizes={sizes} loading={eager ? "eager" : "lazy"} onError={() => setFailed(true)} />
  )
}

export function CaseStudyClient({ project, adjacent }: Props) {
  const [activeChapter, setActiveChapter] = useState("challenge")
  const [selectedShot, setSelectedShot] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const shots = [{ src: project.coverImage, alt: `${project.title} — interface overview` }, ...project.screenshots]
  const viewerOpen = selectedShot !== null
  const currentShot = shots[selectedShot ?? 0]
  const continuation = adjacent.next ?? adjacent.prev

  useEffect(() => {
    if (!viewerOpen) return
    const dialog = dialogRef.current
    if (!dialog) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialog.showModal()
    return () => {
      document.body.style.overflow = originalOverflow
      if (dialog.open) dialog.close()
    }
  }, [viewerOpen])

  function moveShot(direction: number) {
    setSelectedShot((current) => current === null ? null : (current + direction + shots.length) % shots.length)
  }

  return (
    <CaseStudyMotion className={styles.page} onChapterChange={setActiveChapter}>
      <header className={`${styles.container} ${styles.hero}`}>
        <div className={styles.topline}>
          <Link href="/work" className={styles.textLink}><ArrowLeft size={18} aria-hidden="true" /><RollingLabel>All projects</RollingLabel></Link>
          <span className={styles.caseNumber}>Case study {project.index}</span>
        </div>
        <div className={styles.heroGrid}>
          <div className={styles.titleMask}><h1 data-case-title>{project.title}</h1></div>
          <div className={styles.introduction} data-case-introduction>
            <p>{project.shortDesc}</p>
            <a href="#challenge" className={styles.textLink}><RollingLabel>Explore the story</RollingLabel><ArrowDown size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <dl className={styles.facts} data-case-facts>
          <div><dt>My role</dt><dd>{project.role}</dd></div>
          <div><dt>Year</dt><dd>{project.year}</dd></div>
          <div><dt>Project focus</dt><dd>{project.categories.join(" / ")}</dd></div>
        </dl>
        <figure className={styles.cover}>
          <button type="button" className={styles.coverButton} onClick={() => setSelectedShot(0)} aria-label={`Inspect ${project.title} overview`}>
            <span className={styles.coverImage} data-case-cover><ProjectImage src={project.coverImage} alt={`${project.title} interface`} sizes="(max-width: 700px) 90vw, 85vw" eager /></span>
            <span className={styles.inspect}><Maximize2 size={16} aria-hidden="true" /> Inspect interface</span>
          </button>
          <figcaption><span>{project.tagline}</span><span>Built in {project.year}</span></figcaption>
        </figure>
      </header>

      <div className={`${styles.container} ${styles.story}`}>
        <aside className={styles.chapterAside}>
          <nav className={styles.chapterNav} aria-label="Case study chapters">
            <ol>{chapters.map((chapter, index) => (
              <li key={chapter.id}>
                <a href={`#${chapter.id}`} aria-current={activeChapter === chapter.id ? "location" : undefined}>
                  <span className={styles.chapterNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{chapter.label}</span><ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}</ol>
          </nav>
          <Link href="/contact" className={`${styles.textLink} ${styles.asideContact}`}><RollingLabel>Have a project in mind?</RollingLabel><ArrowUpRight size={16} aria-hidden="true" /></Link>
        </aside>

        <div className={styles.narrative}>
          <section id="challenge" className={styles.chapter} data-case-chapter>
            <h2 data-case-heading>The challenge.</h2>
            <p className={styles.lead} data-case-copy>{project.problem}</p>
            <ul className={styles.problemList}>{project.problemPoints.map((point) => <li key={point} data-case-detail>{point}</li>)}</ul>
          </section>

          <section id="approach" className={styles.chapter} data-case-chapter>
            <h2 data-case-heading>Decisions behind the build.</h2>
            <p className={styles.lead} data-case-copy>{project.approach}</p>
            <div className={styles.decisions}>{project.approachPoints.map((point) => (
              <div className={styles.decision} key={point.title} data-case-detail><h3>{point.title}</h3><p>{point.desc}</p></div>
            ))}</div>
          </section>

          <section id="product" className={styles.chapter} data-case-chapter>
            <div className={styles.galleryHeading}><h2 data-case-heading>A closer look.</h2><p>Select a screen to explore the interface.</p></div>
            <div className={styles.gallery}>{project.screenshots.map((shot, index) => (
              <figure className={`${styles.screen} ${shot.span ? styles.wideScreen : ""}`} key={shot.src} data-case-screen>
                <button type="button" onClick={() => setSelectedShot(index + 1)} aria-label={`Inspect ${shot.alt}`}>
                  <span className={styles.screenImage}><ProjectImage src={shot.src} alt={shot.alt} sizes={shot.span ? "(max-width: 900px) 90vw, 65vw" : "(max-width: 700px) 90vw, 35vw"} /></span>
                  <span className={styles.screenAction}><Maximize2 size={18} aria-hidden="true" /></span>
                </button>
                <figcaption><span>{shot.alt}</span><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></figcaption>
              </figure>
            ))}</div>
          </section>

          <section id="delivery" className={`${styles.chapter} ${styles.delivery}`} data-case-chapter>
            <h2 data-case-heading>What was delivered.</h2>
            <div data-case-delivery>
              <p className={styles.outcome}>
                <span className={styles.srOnly}>{project.outcome}</span>
                <span aria-hidden="true">{project.outcome.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex}><span className={styles.outcomeWord}>{Array.from(word).map((letter, letterIndex) => <span data-case-letter key={letterIndex}>{letter}</span>)}</span>{" "}</span>
                ))}</span>
              </p>
              <div className={styles.deliveryRule}><span data-case-rule /></div>
            </div>
            <div className={styles.tools}><h3>Tools behind the experience</h3><ul>{project.stack.map((tool) => <li key={tool}><Check size={14} aria-hidden="true" />{tool}</li>)}</ul></div>
            <div className={styles.invitation}><p>Working through a similar challenge?</p><Link href="/contact" className={styles.textLink}><RollingLabel>Let’s discuss your project</RollingLabel><ArrowUpRight size={18} aria-hidden="true" /></Link></div>
          </section>
        </div>
      </div>

      {continuation && <section className={`${styles.container} ${styles.continuation}`} aria-labelledby="continuation-title">
        <h2 id="continuation-title">{adjacent.next ? "Next project" : "Previous project"}</h2>
        <Link href={`/work/${continuation.slug}`} className={styles.nextProject}>
          <div className={styles.nextCopy}><h3>{continuation.title}</h3><p>{continuation.shortDesc}</p><span className={styles.textLink}><RollingLabel>Explore case study</RollingLabel><ArrowUpRight size={18} aria-hidden="true" /></span></div>
          <div className={styles.nextImage}><ProjectImage src={continuation.coverImage} alt={`${continuation.title} preview`} sizes="(max-width: 700px) 90vw, 40vw" /><span className={styles.nextArrow}><ArrowUpRight size={28} aria-hidden="true" /></span></div>
        </Link>
        {adjacent.prev && adjacent.next && <Link href={`/work/${adjacent.prev.slug}`} className={`${styles.textLink} ${styles.previous}`}><ArrowLeft size={18} aria-hidden="true" /><RollingLabel>{`Previous: ${adjacent.prev.title}`}</RollingLabel></Link>}
      </section>}

      <dialog ref={dialogRef} className={styles.viewer} aria-labelledby="case-viewer-title" data-lenis-prevent
        onClose={() => setSelectedShot(null)}
        onClick={(event) => { if (event.target === event.currentTarget) setSelectedShot(null) }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); moveShot(-1) }
          if (event.key === "ArrowRight") { event.preventDefault(); moveShot(1) }
        }}>
        <div className={styles.viewerHeader}><div><p>{project.title}</p><h2 id="case-viewer-title" aria-live="polite">{currentShot.alt}</h2></div><button type="button" autoFocus onClick={() => setSelectedShot(null)} aria-label="Close screenshot viewer"><X size={22} aria-hidden="true" /></button></div>
        {viewerOpen && <div className={styles.viewerMedia}><ProjectImage key={currentShot.src} src={currentShot.src} alt={currentShot.alt} sizes="95vw" eager /></div>}
        <div className={styles.viewerFooter}><a href={currentShot.src} target="_blank" rel="noopener noreferrer" className={styles.textLink}>Open original<ArrowUpRight size={16} aria-hidden="true" /></a><div><button type="button" onClick={() => moveShot(-1)} aria-label="Previous screenshot"><ArrowLeft size={20} aria-hidden="true" /></button><span aria-live="polite">{(selectedShot ?? 0) + 1} / {shots.length}</span><button type="button" onClick={() => moveShot(1)} aria-label="Next screenshot"><ArrowRight size={20} aria-hidden="true" /></button></div></div>
      </dialog>
    </CaseStudyMotion>
  )
}