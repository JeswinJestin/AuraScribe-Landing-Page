'use client'

/*
  Story — the opening arc. Hero (dark chamber, the value in one line) -> the turn (cream, the
  question the product answers) -> the reach (dark, the languages) -> the invitation (cream, the
  download). ThemeScroll blends the chamber colours as you scroll between them.

  Reduced motion: useScene skips GSAP; markup defaults to the final visible state.
*/

import { Fragment, useEffect, useRef } from 'react'
import { DownloadSimple, GithubLogo } from '@phosphor-icons/react/dist/ssr'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '@/lib/site'
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
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
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
      <h1 className="display relative mt-6 max-w-[15ch] text-[46px] leading-[0.98] sm:text-[76px] md:text-[104px]">
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
      <p className="hero-sub relative mx-auto mt-7 max-w-[54ch] text-[18px] leading-relaxed text-muted sm:text-[20px]">
        AuraScribe turns speech into clean, punctuated text in any Windows app. Tap a hotkey, talk, and
        it lands the moment you stop. Every word is transcribed on your own PC, so there is no account,
        no subscription, and nothing sent to a server.
      </p>
      <div className="hero-cta relative mt-9 flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href={site.releases} target="_blank" rel="noreferrer" className="btn btn-primary">
            <DownloadSimple size={18} weight="bold" />
            Download for Windows
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <GithubLogo size={18} weight="fill" />
            View on GitHub
          </a>
        </div>
        <p className="font-mono text-[13px] text-faint">~8.6 MB · Windows 10 and 11 · MIT licensed</p>
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
        Download the installer, set a hotkey, and start dictating in under a minute. No account to create,
        nothing to pay, and no cloud to trust with your voice.
      </p>
      <div className="invite-el relative mt-9 flex flex-wrap items-center justify-center gap-3">
        <a href={site.releases} target="_blank" rel="noreferrer" className="btn btn-primary">
          <DownloadSimple size={18} weight="bold" />
          Download for Windows
        </a>
        <a href={site.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
          <GithubLogo size={18} weight="fill" />
          View on GitHub
        </a>
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
