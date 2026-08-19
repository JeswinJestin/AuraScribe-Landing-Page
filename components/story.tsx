'use client'

/*
  Story — the opening arc. Hero (dark chamber, the value in one line) -> the turn (cream, the
  question the product answers) -> the reach (dark, the languages) -> the invitation (cream, the
  download). ThemeScroll blends the chamber colours as you scroll between them.

  Reduced motion: useScene skips GSAP; markup defaults to the final visible state.
*/

import { Fragment, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DownloadButtons } from './download'
import DotField from './dot-field'
import { ParallaxTurn } from './parallax-turn'
import { LanguageWheel } from './language-wheel'

gsap.registerPlugin(ScrollTrigger)

function useScene(build: (el: HTMLElement) => void) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => build(el), el)
    return () => ctx.revert()
  }, [build])
  return ref
}

/* ---------- Hero ---------- */
function SceneHero() {
  const ref = useScene((el) => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero-eyebrow', { autoAlpha: 0, y: 12, duration: 0.5 })
      .from('.type-char', { autoAlpha: 0, y: 16, stagger: 0.018, duration: 0.4 }, '-=0.1')
      .from('.hero-sub', { autoAlpha: 0, y: 14, duration: 0.5 }, '-=0.1')
      .from('.hero-cta', { autoAlpha: 0, y: 16, duration: 0.6 }, '-=0.25')
  })
  const line = 'Dictate anywhere. Nothing leaves your machine.'
  return (
    <section
      ref={ref}
      id="top"
      data-chamber="dark"
      /* The sticky nav pill reserves 76px at the very top (pt-5 20px + h-14 56px). Fill the
         viewport MINUS that band so the nav + the whole hero stack sit inside one screen and
         nothing is clipped, on laptops included. The bottom padding biases the centred stack
         a little higher than dead-centre, which reads more editorial and leaves the dot-field
         breathing below the words. */
      className="relative flex min-h-[calc(100dvh-76px)] w-full flex-col items-center justify-start overflow-hidden px-6 pb-16 pt-12 text-center md:justify-center md:pb-[5vh] md:pt-0"
    >
      <div className="absolute inset-0 z-0">
        <DotField />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.16), transparent 62%)' }}
      />
      <p className="hero-eyebrow eyebrow relative">Free · Open source · 100% on-device</p>
      <h1
        className="display relative mt-6 max-w-[16ch] leading-[0.96]"
        style={{ fontSize: 'clamp(44px, min(10vw, 10.8vh), 96px)' }}
      >
        {line.split(' ').map((word, wi, arr) => (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap">
              {[...word].map((c, ci) => (
                <span key={ci} className="type-char inline-block">
                  {c}
                </span>
              ))}
            </span>
            {wi < arr.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </h1>
      <p className="hero-sub relative mx-auto mt-6 max-w-[50ch] text-[17px] leading-relaxed text-muted sm:text-[18.5px]">
        Press a hotkey, talk, and clean, punctuated text lands in any app on Windows, macOS, and Linux.
        It is transcribed on your own machine and never sent to a server.
      </p>
      <div className="hero-cta relative mt-9">
        <DownloadButtons caption="Free forever · MIT licensed · no account, no cloud" />
      </div>
    </section>
  )
}

/* ---------- The rings that span the whole cream chamber ----------
   These deliberately do NOT live inside a section. A sticky, zero-height layer keeps one single
   ring system visible continuously from the turn, through the languages, to the invitation, so
   nothing is ever clipped by a section edge and there is no divider between the sections. As you
   scroll into the languages it drifts off to the right and settles there. */
function ChamberRings() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const chamber = el.parentElement
    if (!chamber) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.rings-inner',
        { xPercent: 0, yPercent: 0, scale: 1 },
        {
          xPercent: 46,
          yPercent: 10,
          scale: 1.25,
          ease: 'none',
          scrollTrigger: { trigger: chamber, start: 'top top', end: '55% top', scrub: true },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={ref} aria-hidden className="pointer-events-none sticky top-0 z-0 h-0 w-full">
      <div className="rings-inner absolute left-1/2 top-[50vh] -translate-x-1/2 -translate-y-1/2">
        {/* Sized to the viewport so the WHOLE circle is visible when it is centred, before
            it drifts to the side. */}
        <svg
          viewBox="0 0 760 760"
          fill="none"
          className="h-[min(74vh,86vw)] w-[min(74vh,86vw)]"
        >
          {[360, 286, 212, 140, 76].map((r, i) => (
            <circle
              key={r}
              cx="380"
              cy="380"
              r={r}
              stroke="hsl(var(--accent))"
              strokeOpacity={0.17 - i * 0.022}
              strokeWidth="1.5"
            />
          ))}
          <circle cx="380" cy="380" r="7" fill="hsl(var(--accent))" fillOpacity="0.75" />
        </svg>
      </div>
    </div>
  )
}

/* ---------- Invitation ---------- */
function SceneInvitation() {
  const ref = useScene((el) => {
    gsap.from(el.querySelectorAll('.invite-el'), {
      opacity: 0,
      y: 28,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 72%' },
    })
  })
  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-[88dvh] w-full flex-col items-center justify-center px-6 text-center"
    >
      <p className="invite-el eyebrow relative">Free forever</p>
      <h2 className="invite-el display relative mt-5 max-w-[16ch] text-[42px] leading-[0.98] sm:text-[64px] md:text-[80px]">
        It runs on your machine. Full stop.
      </h2>
      <p className="invite-el relative mx-auto mt-7 max-w-[50ch] text-[18px] leading-relaxed text-muted sm:text-[20px]">
        Download the installer for your system, set a hotkey, and start dictating in under a minute.
        No account to create, nothing to pay, and no cloud to trust with your voice.
      </p>
      <div className="invite-el relative mt-9">
        <DownloadButtons />
      </div>
    </section>
  )
}

export function Story() {
  return (
    <>
      <SceneHero />
      {/* One long CREAM chamber: the colour arrives once and holds across the turn, the
          languages scroller and the invitation. No flipping between them. */}
      {/* CREAM holds from the turn all the way through the languages. */}
      <div data-chamber="cream" className="relative overflow-x-clip">
        <ChamberRings />
        <ParallaxTurn />
        <LanguageWheel />
      </div>
      {/* Dark arrives only once "Free forever" is actually at the top of the screen. */}
      <div data-chamber="dark" data-start="top 15%">
        <SceneInvitation />
      </div>
    </>
  )
}
