'use client'

/*
  ThemeScroll — drives the whole-page colour.

  Design rule (owner): the page must NOT flip colour section by section. It uses a few LONG
  chambers, and the colour stays CONSTANT for the whole chamber. Today that is:
    1. hero                                    -> dark
    2. the turn + languages + the invitation   -> cream  (held across all three)
    3. everything from "Three keys" onward     -> dark   (held to the footer)

  A chamber takes over only once it has genuinely ARRIVED (its top has passed 40% down the
  viewport), not when it first peeks in, which is what made the old version change too early.
  globals.css transitions the tokens, so the change reads as a slow blend, not a cut.
*/

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Theme = Record<string, string>

const DARK: Theme = {
  '--bg': '48 22% 6%',
  '--surface': '45 14% 10%',
  '--ink': '45 30% 93%',
  '--muted': '45 10% 66%',
  '--faint': '45 8% 50%',
  '--line': '45 12% 20%',
  '--accent': '227 100% 72%',
}
const CREAM: Theme = {
  '--bg': '52 44% 95%',
  '--surface': '52 50% 99%',
  '--ink': '45 12% 11%',
  '--muted': '45 7% 36%',
  '--faint': '45 7% 52%',
  '--line': '45 20% 84%',
  '--accent': '227 96% 58%',
}

function apply(theme: Theme) {
  const root = document.documentElement
  for (const key in theme) root.style.setProperty(key, theme[key])
}

export function ThemeScroll() {
  useEffect(() => {
    const chambers = gsap.utils.toArray<HTMLElement>('[data-chamber]')
    if (!chambers.length) return
    // Under reduced motion, kill the 1.1s cross-fade so chamber colours swap instantly.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--theme-transition', '0s')
    }
    apply(chambers[0].dataset.chamber === 'cream' ? CREAM : DARK)

    const ctx = gsap.context(() => {
      chambers.forEach((sec) => {
        const theme = sec.dataset.chamber === 'cream' ? CREAM : DARK
        ScrollTrigger.create({
          trigger: sec,
          // Arrive late, leave late: the chamber owns the colour only while it really fills
          // the screen. Prevents changing "before we get there". A chamber can tighten this
          // with data-start (e.g. the dark chamber flips only once its first section is at
          // the top of the screen).
          start: sec.dataset.start || 'top 40%',
          end: 'bottom 40%',
          // Refresh LAST (lower priority = later), so chamber heights are measured only after
          // pinned sections inside them have added their scroll distance. Without this the cream
          // chamber measured short and the page went dark long before "Free forever".
          refreshPriority: -1,
          onToggle: (self) => {
            if (self.isActive) apply(theme)
          },
        })
      })
    })
    // Pins are created by child components after this effect; recalculate once they exist.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(id)
      ctx.revert()
    }
  }, [])

  return null
}
