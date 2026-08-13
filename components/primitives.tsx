'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/** Fade-and-rise on scroll into view. The only reveal used across the page, for a calm, consistent feel. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * The signal meter — AuraScribe's signature element, the real visualization from the app.
 * A row of ticks that rise and fall like a live voice waveform. One tick is warm-red (the
 * recording state). Motion communicates "the app is hearing you"; it collapses to static
 * under reduced-motion via the CSS in globals.css.
 */
export function SignalMeter({ bars = 22 }: { bars?: number }) {
  const heights = Array.from({ length: bars }, (_, i) => 24 + Math.round(52 * Math.abs(Math.sin(i * 1.3))))
  const accentIndex = Math.floor(bars / 2)
  return (
    <div className="flex h-24 items-end justify-center gap-[5px]" aria-hidden>
      {heights.map((h, i) => (
        <span
          key={i}
          className="meter-tick w-[6px] rounded-full"
          style={{
            height: h,
            background: i === accentIndex ? 'hsl(var(--record))' : 'hsl(var(--accent))',
            animationDelay: `${(i % 7) * 0.09}s`,
            opacity: i === accentIndex ? 1 : 0.55 + 0.45 * Math.abs(Math.sin(i)),
          }}
        />
      ))}
    </div>
  )
}
