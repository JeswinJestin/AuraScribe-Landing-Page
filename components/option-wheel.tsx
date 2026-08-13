'use client'

/*
  OptionWheel — ported to TypeScript from the React Bits component and adapted for AuraScribe:
  - Recoloured to our brand (indigo active / faint resting) with the display serif for labels.
  - Added a `controlled` mode + an imperative `setTarget(value)` handle so a parent ScrollTrigger
    can drive the wheel from scroll progress WITHOUT per-frame React state (see language-wheel.tsx).
    In controlled mode the built-in wheel / drag / keyboard input is disabled so it never traps
    the page scroll.
  The rAF layout loop (eases position, lays options along the curve) is unchanged from the original.
*/

import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

export type OptionWheelHandle = { setTarget: (value: number) => void }

export type OptionWheelProps = {
  items: string[]
  defaultSelected?: number
  onChange?: (index: number, item: string) => void
  textColor?: string
  activeColor?: string
  side?: 'left' | 'right'
  fontSize?: number
  spacing?: number
  curve?: number
  tilt?: number
  blur?: number
  fade?: number
  minOpacity?: number
  smoothing?: number
  inset?: number
  loop?: boolean
  controlled?: boolean
  // In controlled mode the wheel/drag/keyboard are disabled so it never traps page scroll. Set
  // `selectable` to still allow a click on a label to jump to it (safe: a click cannot trap scroll).
  selectable?: boolean
  className?: string
}

const OptionWheel = forwardRef<OptionWheelHandle, OptionWheelProps>(function OptionWheel(
  {
    items,
    defaultSelected = 0,
    onChange,
    textColor = 'hsl(var(--faint))',
    activeColor = 'hsl(var(--accent))',
    side = 'left',
    fontSize = 3,
    spacing = 1.5,
    curve = 1,
    tilt = 6,
    blur = 2,
    fade = 0.28,
    minOpacity = 0.05,
    smoothing = 200,
    inset = 40,
    loop = false,
    controlled = false,
    selectable = false,
    className = '',
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const posRef = useRef(defaultSelected)
  const targetRef = useRef(defaultSelected)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const cfgRef = useRef<Record<string, unknown>>({})
  const onChangeRef = useRef(onChange)
  const selectedRef = useRef(defaultSelected)
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dragRef = useRef<{ y: number; start: number; id: number } | null>(null)
  const dragMovedRef = useRef(false)
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected)
  const [isDragging, setIsDragging] = useState(false)

  const remPx =
    typeof window !== 'undefined'
      ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      : 16

  onChangeRef.current = onChange
  cfgRef.current = {
    count: items.length,
    items,
    rowH: Math.max(fontSize * spacing * remPx, 1),
    curve,
    tilt,
    blur,
    fade,
    minOpacity,
    side,
    loop,
    smoothing,
  }

  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05)
    lastRef.current = now
    const cfg = cfgRef.current as any
    const tau = Math.max(cfg.smoothing, 1) / 1000
    const k = 1 - Math.exp(-dt / tau)

    const target = targetRef.current
    const cur = posRef.current
    let next = cur + (target - cur) * k
    const settled = Math.abs(target - next) < 0.001
    if (settled) next = target
    posRef.current = next

    const els = itemRefs.current
    const n = cfg.count
    const mirror = cfg.side === 'right' ? -1 : 1
    const tiltRad = (cfg.tilt * Math.PI) / 180
    const R = tiltRad > 0.0005 ? cfg.rowH / tiltRad : 0
    for (let i = 0; i < n; i++) {
      const el = els[i]
      if (!el) continue
      let d = i - next
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n
        if (d > n / 2) d -= n
      }
      const dist = Math.abs(d)
      let x = 0
      let y = d * cfg.rowH
      let rot = 0
      if (R > 0) {
        const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad))
        y = R * Math.sin(ang)
        x = -mirror * R * (1 - Math.cos(ang)) * cfg.curve
        rot = (mirror * ang * 180) / Math.PI
      }
      el.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`
      el.style.opacity = String(Math.max(cfg.minOpacity, 1 - dist * cfg.fade))
      el.style.filter = cfg.blur > 0 ? `blur(${(dist * cfg.blur).toFixed(2)}px)` : 'none'
      el.style.setProperty('--ow-p', Math.max(0, 1 - Math.min(dist, 1)).toFixed(4))
    }

    // Selection tracks the VISUAL centre (posRef), so the highlighted label and the detail
    // panel always match the item under the guide line, in sync with the scroll.
    const idx = ((Math.round(next) % n) + n) % n
    if (idx !== selectedRef.current) {
      selectedRef.current = idx
      setSelectedIndex(idx)
      onChangeRef.current?.(idx, cfg.items[idx])
    }

    rafRef.current = settled ? null : requestAnimationFrame(runFrame)
  }, [])

  const startLoop = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    lastRef.current = performance.now()
    rafRef.current = requestAnimationFrame(runFrame)
  }, [runFrame])

  const applyTarget = useCallback(
    (value: number, snap: boolean) => {
      const cfg = cfgRef.current as any
      let v = value
      if (!cfg.loop) v = Math.min(Math.max(v, 0), Math.max(cfg.count - 1, 0))
      if (snap) v = Math.round(v)
      targetRef.current = v
      startLoop()
    },
    [startLoop],
  )

  useImperativeHandle(ref, () => ({ setTarget: (value: number) => applyTarget(value, false) }), [applyTarget])

  // Wheel scroll — only when NOT scroll-controlled, so we never trap the page.
  useEffect(() => {
    const el = rootRef.current
    if (!el || controlled) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const cfg = cfgRef.current as any
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY
      const step = Math.max(-1, Math.min(1, delta / cfg.rowH))
      applyTarget(targetRef.current + step, false)
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current)
      wheelTimerRef.current = setTimeout(() => applyTarget(targetRef.current, true), 140)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current)
    }
  }, [applyTarget, controlled])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (controlled) return
      dragRef.current = { y: e.clientY, start: targetRef.current, id: e.pointerId }
      dragMovedRef.current = false
      setIsDragging(true)
    },
    [controlled],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      const dy = e.clientY - drag.y
      if (!dragMovedRef.current && Math.abs(dy) > 4) {
        dragMovedRef.current = true
        rootRef.current?.setPointerCapture(drag.id)
      }
      if (dragMovedRef.current) applyTarget(drag.start - dy / (cfgRef.current as any).rowH, false)
    },
    [applyTarget],
  )

  const handlePointerEnd = useCallback(() => {
    if (!dragRef.current) return
    dragRef.current = null
    setIsDragging(false)
    if (dragMovedRef.current) applyTarget(targetRef.current, true)
  }, [applyTarget])

  const handleItemClick = useCallback(
    (index: number) => {
      // Clicks are allowed when interactive, OR when explicitly `selectable` in controlled mode.
      if ((controlled && !selectable) || dragMovedRef.current) return
      const cfg = cfgRef.current as any
      const cur = targetRef.current
      let d = index - (((cur % cfg.count) + cfg.count) % cfg.count)
      if (cfg.loop && cfg.count > 1) {
        if (d > cfg.count / 2) d -= cfg.count
        else if (d < -cfg.count / 2) d += cfg.count
      }
      applyTarget(cur + d, true)
    },
    [applyTarget, controlled, selectable],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (controlled) return
      let delta: number | null = null
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') delta = -1
      else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') delta = 1
      if (delta == null) return
      e.preventDefault()
      applyTarget(Math.round(targetRef.current) + delta, true)
    },
    [applyTarget, controlled],
  )

  useEffect(() => {
    applyTarget(targetRef.current, false)
  }, [items, fontSize, spacing, curve, tilt, blur, fade, minOpacity, side, loop, smoothing, applyTarget])

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    },
    [],
  )

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={controlled ? -1 : 0}
      aria-label="Languages"
      className={`option-wheel${side === 'right' ? ' option-wheel--right' : ''}${isDragging ? ' option-wheel--dragging' : ''}${controlled ? ' option-wheel--controlled' : ''}${selectable ? ' option-wheel--selectable' : ''}${className ? ` ${className}` : ''}`}
      style={
        {
          '--ow-text-color': textColor,
          '--ow-active-color': activeColor,
          '--ow-font-size': `clamp(2rem, 6.5vw, ${fontSize}rem)`,
          '--ow-inset': `${inset}px`,
        } as React.CSSProperties
      }
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
    >
      {items.map((label, index) => (
        <div
          key={`${label}-${index}`}
          ref={(el) => {
            itemRefs.current[index] = el
          }}
          role="option"
          aria-selected={selectedIndex === index}
          className={`option-wheel__item${selectedIndex === index ? ' option-wheel__item--selected' : ''}`}
          onClick={() => handleItemClick(index)}
        >
          {label}
        </div>
      ))}
    </div>
  )
})

// Memoised so a parent re-render (e.g. the detail panel updating) never re-renders or
// re-initialises the wheel. Combined with stable `items`, this removes the scroll jank.
export default memo(OptionWheel)
