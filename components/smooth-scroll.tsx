'use client'

/*
  SmoothScroll — Lenis inertia scroll wired into GSAP's ticker so every ScrollTrigger
  in the story reads the same, buttery scroll position. This is the backbone of the
  scroll-driven narrative: without a single driving clock the pinned scenes and the
  frame-sequence canvas would tear against native scroll.

  Reduced motion / touch: Lenis is skipped entirely (native scroll), and ScrollTrigger
  still works off the browser scroll — the story components collapse themselves to a
  static stack (see story.tsx), so the page stays fully usable and calm.
*/

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      // Native scroll only; ScrollTrigger reads window scroll directly.
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    // Drive Lenis from GSAP's ticker so animation frames and scroll share one clock.
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
