'use client'

/*
  DotField — an interactive canvas grid of indigo dots that bulge away from the cursor,
  used as a living hero background. Ported to TypeScript from the React Bits component and
  recoloured to the AuraScribe brand (indigo, not purple).

  Guards added for this project:
  - prefers-reduced-motion → renders one static dot grid, no rAF loop, no listeners.
  - Small screens → static grid (pointer bulge is a desktop delight, not worth the battery).
  The canvas is purely decorative (aria-hidden) and sits behind hero content.
*/

import { useEffect, useId, useRef, memo } from 'react'

const TWO_PI = Math.PI * 2

type Dot = { ax: number; ay: number; sx: number; sy: number; vx: number; vy: number; x: number; y: number }

export type DotFieldProps = {
  dotRadius?: number
  dotSpacing?: number
  cursorRadius?: number
  bulgeStrength?: number
  glowRadius?: number
  gradientFrom?: string
  gradientTo?: string
  glowColor?: string
  className?: string
}

const DotField = memo(function DotField({
  dotRadius = 1.6,
  dotSpacing = 16,
  cursorRadius = 460,
  bulgeStrength = 60,
  glowRadius = 200,
  gradientFrom = 'rgba(76, 111, 255, 0.42)',
  gradientTo = 'rgba(76, 111, 255, 0.14)',
  glowColor = 'rgba(76, 111, 255, 0.10)',
  className = '',
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 })
  const rafRef = useRef<number | null>(null)
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 })
  const glowOpacity = useRef(0)
  const engagement = useRef(0)
  // Stable across server/client render (Math.random would cause a hydration mismatch).
  const glowId = `dot-field-glow-${useId().replace(/:/g, '')}`

  useEffect(() => {
    const canvas = canvasRef.current
    const glowEl = glowRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const smallScreen = window.matchMedia('(max-width: 768px)').matches

    function buildDots(w: number, h: number) {
      const step = dotRadius + dotSpacing
      const cols = Math.floor(w / step)
      const rows = Math.floor(h / step)
      const padX = (w % step) / 2
      const padY = (h % step) / 2
      const dots: Dot[] = new Array(rows * cols)
      let idx = 0
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2
          const ay = padY + row * step + step / 2
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay }
        }
      }
      dotsRef.current = dots
    }

    function fillDots(w: number, h: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      const grad = ctx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, gradientFrom)
      grad.addColorStop(1, gradientTo)
      ctx.fillStyle = grad
      const rad = dotRadius / 2
      const dots = dotsRef.current
      ctx.beginPath()
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        ctx.moveTo(d.sx + rad, d.sy)
        ctx.arc(d.sx, d.sy, rad, 0, TWO_PI)
      }
      ctx.fill()
    }

    function doResize() {
      const rect = parent!.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { w, h, offsetX: rect.left + window.scrollX, offsetY: rect.top + window.scrollY }
      buildDots(w, h)
    }

    // A ResizeObserver drives sizing so we never depend on a single mount-time
    // measurement (which can race layout and leave the canvas at its 300x150 default).
    const ro = new ResizeObserver(() => {
      doResize()
      if (reduce || smallScreen) fillDots(sizeRef.current.w, sizeRef.current.h)
    })
    ro.observe(parent)
    doResize()

    // Reduced motion / small screens: one static grid, no listeners, no animation.
    if (reduce || smallScreen) {
      fillDots(sizeRef.current.w, sizeRef.current.h)
      return () => ro.disconnect()
    }

    const onMouseMove = (e: MouseEvent) => {
      const s = sizeRef.current
      mouseRef.current.x = e.pageX - s.offsetX
      mouseRef.current.y = e.pageY - s.offsetY
    }

    const updateMouseSpeed = () => {
      const m = mouseRef.current
      const dx = m.prevX - m.x
      const dy = m.prevY - m.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      m.speed += (dist - m.speed) * 0.5
      if (m.speed < 0.001) m.speed = 0
      m.prevX = m.x
      m.prevY = m.y
    }
    const speedInterval = setInterval(updateMouseSpeed, 20)

    let frameCount = 0
    const tick = () => {
      frameCount++
      const dots = dotsRef.current
      const m = mouseRef.current
      const { w, h } = sizeRef.current

      const targetEngagement = Math.min(m.speed / 5, 1)
      engagement.current += (targetEngagement - engagement.current) * 0.06
      if (engagement.current < 0.001) engagement.current = 0
      const eng = engagement.current
      glowOpacity.current += (eng - glowOpacity.current) * 0.08
      if (glowEl) {
        glowEl.setAttribute('cx', String(m.x))
        glowEl.setAttribute('cy', String(m.y))
        glowEl.style.opacity = String(glowOpacity.current)
      }

      ctx!.clearRect(0, 0, w, h)
      const grad = ctx!.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, gradientFrom)
      grad.addColorStop(1, gradientTo)
      ctx!.fillStyle = grad

      const cr = cursorRadius
      const crSq = cr * cr
      const rad = dotRadius / 2
      ctx!.beginPath()
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        const dx = m.x - d.ax
        const dy = m.y - d.ay
        const distSq = dx * dx + dy * dy
        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq)
          const t = 1 - dist / cr
          const push = t * t * bulgeStrength * eng
          const angle = Math.atan2(dy, dx)
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15
        } else {
          d.sx += (d.ax - d.sx) * 0.1
          d.sy += (d.ay - d.sy) * 0.1
        }
        ctx!.moveTo(d.sx + rad, d.sy)
        ctx!.arc(d.sx, d.sy, rad, 0, TWO_PI)
      }
      ctx!.fill()
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      clearInterval(speedInterval)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div aria-hidden className={`pointer-events-none relative h-full w-full ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowId})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  )
})

export default DotField
