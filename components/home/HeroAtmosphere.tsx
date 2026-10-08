"use client"

import { useEffect, useRef } from "react"
import styles from "./Hero.module.css"

const HOME_POINTER = { x: 0.74, y: 0.5 }

export function HeroAtmosphere() {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    const hero = host?.parentElement
    const context = canvas?.getContext("2d", { alpha: true })
    if (!host || !canvas || !hero || !context) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(pointer: fine)")
    const target = { ...HOME_POINTER }
    const pointer = { ...HOME_POINTER }
    let width = 0
    let height = 0
    let visible = true
    let frame: number | null = null
    let lastPaint = 0
    let elapsed = 0
    let bounds = hero.getBoundingClientRect()

    const draw = (seconds: number) => {
      if (!width || !height) return
      const light = document.documentElement.getAttribute("data-theme") === "light"
      context.clearRect(0, 0, width, height)
      hero.style.setProperty("--portrait-shift-x", `${(pointer.x - HOME_POINTER.x) * 16}px`)
      hero.style.setProperty("--portrait-shift-y", `${(pointer.y - HOME_POINTER.y) * 10}px`)
      hero.style.setProperty("--type-shift-x", `${(pointer.x - HOME_POINTER.x) * -5}px`)

      const glowX = width * (0.78 + (pointer.x - HOME_POINTER.x) * 0.08)
      const glowY = height * (0.5 + (pointer.y - HOME_POINTER.y) * 0.08)
      const glowRadius = Math.max(width * 0.53, height * 0.7)
      const glow = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius)
      glow.addColorStop(0, light ? "rgba(0, 155, 118, 0.11)" : "rgba(0, 217, 166, 0.17)")
      glow.addColorStop(0.45, light ? "rgba(32, 113, 130, 0.05)" : "rgba(34, 114, 145, 0.07)")
      glow.addColorStop(1, "rgba(0, 0, 0, 0)")
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)

      const lineCount = width < 700 ? 14 : 28
      const fieldCenter = width * (width < 700 ? 0.72 : 0.51)
      const fieldSpread = width * (width < 700 ? 0.6 : 0.8)
      const pointerX = pointer.x * width
      const pointerY = pointer.y * height
      const influenceRadius = Math.max(150, width * 0.18)
      const influenceRadiusSquared = influenceRadius * influenceRadius

      context.globalCompositeOperation = light ? "source-over" : "screen"

      for (let index = 0; index < lineCount; index++) {
        const place = index / (lineCount - 1)
        const baseX = fieldCenter + (place - 0.5) * fieldSpread
        const strong = Math.sin(Math.PI * place)
        const alpha = (0.045 + strong * 0.14) * (light ? 0.75 : 1)
        const blueLine = index % 7 === 0
        const color = blueLine
          ? light ? "30, 100, 133" : "98, 175, 220"
          : light ? "0, 105, 89" : "35, 220, 174"
        const stroke = context.createLinearGradient(0, 0, 0, height)
        stroke.addColorStop(0, `rgba(${color}, 0)`)
        stroke.addColorStop(0.23, `rgba(${color}, ${alpha * 0.55})`)
        stroke.addColorStop(0.54, `rgba(${color}, ${alpha})`)
        stroke.addColorStop(0.82, `rgba(${color}, ${alpha * 0.48})`)
        stroke.addColorStop(1, `rgba(${color}, 0)`)

        context.beginPath()
        context.strokeStyle = stroke
        context.lineWidth = blueLine ? 1.6 : 1

        for (let step = 0; step <= 48; step++) {
          const progress = step / 48
          const y = (progress * 1.22 - 0.11) * height
          const wave = Math.sin(progress * 3.5 + seconds * 0.22 + place * 3.4) * width * 0.04
            + Math.sin(progress * 8.1 - seconds * 0.15 + place * 5.2) * width * 0.008
          let x = baseX + wave + (pointer.x - HOME_POINTER.x) * width * 0.018

          const dx = x - pointerX
          const dy = y - pointerY
          const influence = Math.exp(-(dx * dx + dy * dy) / influenceRadiusSquared)
          x += Math.sign(dx || 1) * influence * width * 0.045

          if (step === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }

        context.stroke()
      }

      context.globalCompositeOperation = "source-over"
    }

    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
    }

    const animate = (now: number) => {
      frame = null
      if (!visible || document.hidden || reducedMotion.matches || !finePointer.matches
        || document.documentElement.dataset.siteIntro !== "done") return
      const delta = lastPaint ? Math.min(now - lastPaint, 50) : 16.67
      lastPaint = now
      elapsed += delta * 0.001
      const follow = 1 - Math.exp(-delta / 180)
      pointer.x += (target.x - pointer.x) * follow
      pointer.y += (target.y - pointer.y) * follow
      draw(elapsed)
      frame = requestAnimationFrame(animate)
    }

    const start = () => {
      if (visible && !document.hidden && !reducedMotion.matches && finePointer.matches
        && document.documentElement.dataset.siteIntro === "done" && frame === null) {
        lastPaint = 0
        frame = requestAnimationFrame(animate)
      }
    }

    const resize = () => {
      bounds = hero.getBoundingClientRect()
      width = host.clientWidth
      height = host.clientHeight
      if (!width || !height) return
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      draw(elapsed)
    }

    const pointerMove = (event: PointerEvent) => {
      target.x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
      target.y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))
    }

    const pointerLeave = () => Object.assign(target, HOME_POINTER)
    const measureBounds = () => { bounds = hero.getBoundingClientRect() }
    const motionChange = () => {
      stop()
      pointer.x = HOME_POINTER.x
      pointer.y = HOME_POINTER.y
      draw(0)
      start()
    }
    const visibilityChange = () => document.hidden ? stop() : start()

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
      if (visible) start()
      else stop()
    })
    const themeObserver = new MutationObserver(() => {
      if (frame === null) draw(elapsed)
      if (document.documentElement.dataset.siteIntro === "done") start()
      else stop()
    })

    resizeObserver.observe(host)
    intersectionObserver.observe(host)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-site-intro"],
    })
    hero.addEventListener("pointermove", pointerMove, { passive: true })
    hero.addEventListener("pointerenter", measureBounds, { passive: true })
    hero.addEventListener("pointerleave", pointerLeave)
    window.addEventListener("scroll", measureBounds, { passive: true })
    reducedMotion.addEventListener("change", motionChange)
    finePointer.addEventListener("change", motionChange)
    document.addEventListener("visibilitychange", visibilityChange)
    resize()
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      hero.removeEventListener("pointermove", pointerMove)
      hero.removeEventListener("pointerenter", measureBounds)
      hero.removeEventListener("pointerleave", pointerLeave)
      window.removeEventListener("scroll", measureBounds)
      reducedMotion.removeEventListener("change", motionChange)
      finePointer.removeEventListener("change", motionChange)
      document.removeEventListener("visibilitychange", visibilityChange)
      hero.style.removeProperty("--portrait-shift-x")
      hero.style.removeProperty("--portrait-shift-y")
      hero.style.removeProperty("--type-shift-x")
    }
  }, [])

  return (
    <div ref={hostRef} className={styles.atmosphere} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
