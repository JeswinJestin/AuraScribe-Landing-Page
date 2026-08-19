'use client'

/*
  LanguageWheel — "the reach". A self-contained showcase of the languages AuraScribe handles.

  HISTORY / WHY THIS IS NOT SCROLL-DRIVEN ANY MORE:
  Earlier versions pinned this section and drove the wheel from scroll progress (GSAP ScrollTrigger
  pin + scrub + Lenis). That pin locked the page scroll for several screens and, in practice, never
  felt smooth: it fought the smooth-scroll library, drifted, and the panel lagged. After many
  attempts it was replaced with this: the wheel simply AUTO-CYCLES on a timer while the section is on
  screen, and the detail card updates from the wheel's onChange, so label and sentence always agree.
  No pin, no scrub, no scroll hijacking, so the page scrolls normally and this can never obstruct it.
  You can also click a language to jump to it, and the cycle pauses while you hover or focus it.
*/

import { useCallback, useEffect, useRef, useState } from 'react'
import { MicrophoneStage } from '@phosphor-icons/react/dist/ssr'
import OptionWheel, { type OptionWheelHandle } from './option-wheel'

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
const STEP_MS = 3000 // dwell time per language (long enough to actually read each one)

export function LanguageWheel() {
  const sectionRef = useRef<HTMLElement>(null)
  const wheelRef = useRef<OptionWheelHandle>(null)
  const [selected, setSelected] = useState(0)
  const idxRef = useRef(0)
  const pausedRef = useRef(false)
  const inViewRef = useRef(false)

  // onChange fires from the wheel's visual centre; keep idxRef in step so autoplay (and clicks)
  // always continue from wherever the wheel actually is.
  const onChange = useCallback((i: number) => {
    idxRef.current = i
    setSelected(i)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    // Reduced motion: no autoplay, just rest on a representative language.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wheelRef.current?.setTarget(MIDDLE)
      setSelected(MIDDLE)
      return
    }
    // Only cycle while the section is actually on screen (saves work, and it looks intentional
    // when you arrive rather than being mid-spin).
    const io = new IntersectionObserver(([entry]) => (inViewRef.current = entry.isIntersecting), {
      threshold: 0.35,
    })
    io.observe(el)

    const timer = window.setInterval(() => {
      if (pausedRef.current || !inViewRef.current) return
      const next = (idxRef.current + 1) % LANGS.length
      idxRef.current = next
      wheelRef.current?.setTarget(next)
    }, STEP_MS)

    return () => {
      io.disconnect()
      window.clearInterval(timer)
    }
  }, [])

  const pause = useCallback(() => (pausedRef.current = true), [])
  const resume = useCallback(() => (pausedRef.current = false), [])

  const cur = LANGS[selected]

  return (
    <>
      <section
        ref={sectionRef}
        id="reach"
        className="relative z-10 flex min-h-[70vh] w-full flex-col justify-center px-6 py-24 md:py-28"
      >
        <div className="container-x">
          <p className="eyebrow">Languages</p>
          <h2 className="display mt-4 max-w-[20ch] text-[34px] leading-[1] sm:text-[52px] md:text-[64px]">
            And the scripts the fast tools skip.
          </h2>

          <div className="mt-12 grid items-center gap-8 md:mt-16 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
            {/* Pause the cycle while the visitor is interacting with the wheel. */}
            <div
              className="relative h-[40vh] min-h-[300px] md:h-[48vh]"
              onMouseEnter={pause}
              onMouseLeave={resume}
              onFocusCapture={pause}
              onBlurCapture={resume}
            >
              <OptionWheel
                ref={wheelRef}
                items={LABELS}
                defaultSelected={0}
                controlled
                selectable
                side="left"
                fontSize={3}
                spacing={1.32}
                tilt={4}
                curve={0.6}
                blur={0}
                fade={0.34}
                minOpacity={0.12}
                smoothing={200}
                inset={4}
                onChange={onChange}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-1/2 h-[2px] w-8 -translate-y-1/2 sm:w-12"
                style={{ background: 'hsl(var(--accent) / 0.6)' }}
              />
            </div>

            {/* Fixed height on purpose: a constant card size means the layout never jumps as the
                language changes (pill vs paragraph, longer sample). */}
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
                  className="mt-5 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-[13px] font-semibold"
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
