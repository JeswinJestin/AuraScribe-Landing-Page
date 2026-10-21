'use client'

import { useEffect, useState } from 'react'
import { Sparkle, ArrowRight, X } from '@phosphor-icons/react'

/*
  Thin announcement pill above the nav. Matches the nav's glass pill (same width, same tokens) so it
  reads as part of the header, scrolls away as you move down, and the nav then sticks on its own.
  Dismissible, remembered per version in localStorage. Theme-token colours, so it adapts to whatever
  chamber it sits in. No em-dashes (house rule).
*/
const KEY = 'aura-announce-v2.2.0'

export function Announce() {
  // Start hidden so SSR and the first client paint agree; reveal after reading localStorage.
  const [show, setShow] = useState(false)
  useEffect(() => {
    try {
      setShow(localStorage.getItem(KEY) !== 'dismissed')
    } catch {
      setShow(true)
    }
  }, [])

  if (!show) return null

  const dismiss = () => {
    setShow(false)
    try {
      localStorage.setItem(KEY, 'dismissed')
    } catch {
      /* private mode: just hide for this session */
    }
  }

  return (
    <div className="container-x pt-5">
      <div className="glass mx-auto flex max-w-[1000px] items-center gap-3 rounded-full px-3 py-2 sm:px-4">
        <span
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent"
          style={{ background: 'hsl(var(--accent) / 0.12)' }}
        >
          <Sparkle size={13} weight="fill" />
          New
        </span>

        <a href="#features" className="group flex min-w-0 flex-1 items-center gap-2">
          <p className="min-w-0 truncate text-[13.5px] text-ink">
            <span className="font-semibold">Notetaker is here.</span>{' '}
            <span className="text-muted">
              Record meetings with on-device speaker labels and auto-detected names.
            </span>
          </p>
          <span className="hidden shrink-0 items-center gap-1 text-[13px] font-medium text-accent transition-transform group-hover:translate-x-0.5 sm:inline-flex">
            What&rsquo;s new
            <ArrowRight size={14} weight="bold" />
          </span>
        </a>

        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="shrink-0 rounded-full p-1 text-muted transition-colors hover:text-ink"
        >
          <X size={15} weight="bold" />
        </button>
      </div>
    </div>
  )
}
