'use client'

/*
  ParallaxTurn — "the turn". Continuous parallax (no pin): the layers drift the whole way the
  section passes through the viewport, so nothing cuts off halfway. Built with the Osmo/GSAP
  technique but with our own brand layers (no external images).

  prefers-reduced-motion: layers static, copy visible.
*/

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ParallaxTurn() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      // Continuous: the whole section's pass through the viewport drives the drift.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      tl.fromTo('[data-parallax-layer="1"]', { yPercent: -18 }, { yPercent: 18, ease: 'none' }, 0)
        .fromTo('[data-parallax-layer="3"]', { yPercent: -4 }, { yPercent: 4, ease: 'none' }, 0)
        .fromTo('[data-parallax-layer="4"]', { yPercent: 14 }, { yPercent: -14, ease: 'none' }, 0)

      gsap.from('.turn-copy', {
        autoAlpha: 0,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 72%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center px-6"
    >
      <div
        data-parallax-layer="1"
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 60%)' }}
      />
      {/* The ring system lives at chamber level (story.tsx ChamberRings) so it spans this
          section AND the languages section continuously, with nothing clipped. */}
      <div data-parallax-layer="4" aria-hidden className="pointer-events-none absolute inset-0">
        {[
          { l: '18%', t: '28%', s: 7, o: 0.5 },
          { l: '80%', t: '22%', s: 5, o: 0.4 },
          { l: '72%', t: '70%', s: 9, o: 0.5 },
          { l: '24%', t: '74%', s: 6, o: 0.45 },
          { l: '48%', t: '16%', s: 4, o: 0.35 },
        ].map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full blur-[1px]"
            style={{ left: d.l, top: d.t, width: d.s, height: d.s, opacity: d.o, background: 'hsl(var(--accent))' }}
          />
        ))}
      </div>

      <div data-parallax-layer="3" className="turn-copy relative z-10 max-w-[18ch] text-center">
        <p className="eyebrow">Why it exists</p>
        <h2 className="display mt-4 text-[38px] leading-[1] sm:text-[58px] md:text-[76px]">
          What if it never left your machine?
        </h2>
      </div>
    </section>
  )
}
