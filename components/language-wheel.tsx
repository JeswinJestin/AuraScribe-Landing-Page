'use client'

/*
  LanguageWheel — "the reach". A scroll-linked OptionWheel turns through the languages AuraScribe
  handles, landing on Malayalam and Kannada. Scroll drives the wheel via setTarget inside a
  scrub:true ScrollTrigger; the detail panel updates from the wheel's onChange (fired from the
  visual centre), so label and sentence always agree.

  Smoothness: `items` and `onChange` are stable (module const + useCallback) and the wheel is
  memoised, so a panel update never re-initialises the wheel. That was the source of the lag.
*/

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MicrophoneStage } from '@phosphor-icons/react/dist/ssr'
import OptionWheel, { type OptionWheelHandle } from './option-wheel'

gsap.registerPlugin(ScrollTrigger)

type Lang = { label: string; sample: string; by: string; note: string; hero?: boolean }
const LANGS: Lang[] = [
  { label: 'English', sample: 'Ship the release notes this afternoon.', by: 'Moonshine', note: 'Real-time on a plain CPU.' },
  { label: 'Español', sample: 'Envía las notas de la versión esta tarde.', by: 'NVIDIA Parakeet', note: '25 European languages, auto-detected.' },
  { label: 'हिन्दी', sample: 'रिलीज़ नोट्स आज दोपहर भेज दो।', by: 'Dolphin', note: 'Around 40 Asian languages.' },
  { label: '日本語', sample: 'リリースノートを送信して。', by: 'Dolphin', note: 'No language picker, no round trip.' },
  { label: 'മലയാളം', sample: 'റിലീസ് കുറിപ്പുകൾ അയയ്ക്കൂ.', by: 'IndicConformer', note: 'The tools everyone else skips.', hero: true },
  { label: 'ಕನ್ನಡ', sample: 'ಬಿಡುಗಡೆ ಟಿಪ್ಪಣಿಗಳನ್ನು ಕಳುಹಿಸಿ.', by: 'IndicConformer', note: 'Accurate, and fully on-device.', hero: true },
]
const LABELS = LANGS.map((l) => l.label) // stable reference — do not inline into JSX
const MIDDLE = 2

export function LanguageWheel() {
  const sectionRef = useRef<HTMLElement>(null)
  const wheelRef = useRef<OptionWheelHandle>(null)
  const [selected, setSelected] = useState(0)
  const onChange = useCallback((i: number) => setSelected(i), [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wheelRef.current?.setTarget(MIDDLE)
      setSelected(MIDDLE)
      return
    }
    // Touch / small screens: pinning a 100dvh section fights native touch scroll and jumps every
    // time the mobile toolbar shows or hides, so DON'T pin there — the wheel just steps as the
    // section scrolls past. Pinning is a desktop-only affordance.
    const coarse = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768

    const ctx = gsap.context(() => {
      // QUANTISED: map scroll progress to a WHOLE language index, so the wheel always rests on one
      // language and one notch/swipe advances exactly one. The wheel's own easing smooths the step.
      const toIdx = (p: number) => Math.round(p * (LANGS.length - 1))

      if (coarse) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => wheelRef.current?.setTarget(toIdx(self.progress)),
        })
        return
      }

      // Desktop: pin and run the FULL set (English -> ... -> Kannada), ~1 viewport of scroll per
      // language. scrub:true maps the (already Lenis-smoothed) scroll DIRECTLY to the wheel, so the
      // label and sentence track the scroll with no extra lag. A previous scrub:0.6 added a second
      // smoothing stage on top of Lenis, which is what made the panel trail the scroll.
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: `+=${(LANGS.length - 1) * 100}%`,
        pin: true,
        pinSpacing: true,
        // Recompute the pin distance on every refresh (viewport resize, font swap, chamber remeasure)
        // so the pin can never release early and let the next section bleed in mid-wheel.
        invalidateOnRefresh: true,
        refreshPriority: 1,
        scrub: true,
        onUpdate: (self) => wheelRef.current?.setTarget(toIdx(self.progress)),
        // NO ScrollTrigger `snap` and NO anticipatePin: both call window.scrollTo / jump the
        // scroll position, which fights Lenis and caused the stutter and multi-language jumps.
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const cur = LANGS[selected]

  return (
    <>
    <section
      ref={sectionRef}
      id="reach"
      className="relative z-10 flex min-h-[100dvh] w-full flex-col justify-center px-6 py-24"
    >
      <div className="container-x">
        <p className="eyebrow">Languages</p>
        <h2 className="display mt-4 max-w-[20ch] text-[34px] leading-[1] sm:text-[52px] md:text-[64px]">
          And the scripts the fast tools skip.
        </h2>

        <div className="mt-12 grid items-center gap-8 md:mt-16 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
          <div className="relative h-[40vh] min-h-[300px] md:h-[48vh]">
            <OptionWheel
              ref={wheelRef}
              items={LABELS}
              defaultSelected={0}
              controlled
              side="left"
              fontSize={3}
              spacing={1.4}
              tilt={7}
              blur={0}
              fade={0.3}
              minOpacity={0.14}
              smoothing={45}
              inset={4}
              onChange={onChange}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-1/2 h-[2px] w-8 -translate-y-1/2 sm:w-12"
              style={{ background: 'hsl(var(--accent) / 0.6)' }}
            />
          </div>

          {/* Fixed height on purpose: the card must be the SAME size for every language. If it
              grows or shrinks as the label changes (pill vs paragraph, longer sample), the pinned
              section's centred block re-centres and the whole thing visibly drifts up and down as
              the wheel turns. A constant card height keeps the scene rock-steady during the pin. */}
          <div className="card flex min-h-[360px] flex-col p-6 sm:min-h-[400px] sm:p-8">
            <div className="flex flex-col gap-1 border-b-2 border-line pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <span className="display text-[26px] leading-none sm:text-[32px]">{cur.label}</span>
              <span className="font-mono text-[12px] text-faint">powered by {cur.by}</span>
            </div>
            <p className="mt-6 min-h-[80px] text-[24px] leading-snug sm:min-h-[104px] sm:text-[30px]">
              {cur.sample}
            </p>
            {cur.hero ? (
              <div
                className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold"
                style={{ background: 'hsl(var(--record) / 0.12)', color: 'hsl(var(--record))' }}
              >
                <MicrophoneStage size={16} weight="fill" />
                {cur.note}
              </div>
            ) : (
              <p className="mt-5 text-[15px] leading-relaxed text-muted">{cur.note}</p>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* The six above are a sample, not the limit. This band states the real coverage, which is
        the sum of the four engines: English + 25 European + ~40 Asian + Malayalam and Kannada. */}
    <section className="relative z-10 w-full px-6 pb-28 pt-4">
      <div className="container-x">
        <div className="card p-8 sm:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">
            <div>
              <p className="display text-[64px] leading-[0.9] sm:text-[88px]">65+</p>
              <p className="display mt-2 text-[26px] leading-tight sm:text-[32px]">
                languages, every one of them on your device.
              </p>
            </div>
            <div>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { n: '25', k: 'European languages', by: 'NVIDIA Parakeet' },
                  { n: '~40', k: 'Asian languages', by: 'Dolphin' },
                  { n: '2', k: 'Indic: Malayalam, Kannada', by: 'AI4Bharat IndicConformer' },
                  { n: '1', k: 'English, tuned for speed', by: 'Moonshine' },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="display text-[34px] leading-none sm:text-[40px]">{s.n}</dt>
                    <dd className="mt-2 text-[15px] leading-snug">{s.k}</dd>
                    <dd className="mt-1 font-mono text-[12px] text-faint">{s.by}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-muted">
                Each engine detects the language itself inside its own region, so there is no picker to
                set and no round trip to a server. Download only the ones you actually speak.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
