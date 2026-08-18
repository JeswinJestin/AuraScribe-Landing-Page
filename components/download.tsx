'use client'

/*
  Platform-aware download. On mount we fetch the newest PUBLISHED GitHub release once and resolve
  the exact asset for each OS (.exe / .dmg / .deb), so every button is a real anchor that goes
  straight to that platform's installer for the latest release — no version numbers hardcoded here,
  so it never goes stale. Before the fetch resolves (or if the API is rate-limited / a release is
  still a draft), the href falls back to the Releases page, so a click always lands somewhere useful
  and it works with JavaScript disabled.

  Note: the GitHub API only returns PUBLISHED releases. The macOS/Linux direct links therefore
  activate once the cross-platform release is published (a draft is invisible to the public API).
*/

import { Fragment, useEffect, useState } from 'react'
import {
  DownloadSimple,
  GithubLogo,
  WindowsLogo,
  AppleLogo,
  LinuxLogo,
} from '@phosphor-icons/react/dist/ssr'
import { site } from '@/lib/site'

type OS = 'windows' | 'macos' | 'linux'
const ALL: OS[] = ['windows', 'macos', 'linux']
const LABEL: Record<OS, string> = { windows: 'Windows', macos: 'macOS', linux: 'Linux' }
// Match a release asset to an OS by file extension.
const ASSET_RE: Record<OS, RegExp> = {
  windows: /\.exe$/i,
  macos: /\.dmg$/i,
  linux: /\.(deb|appimage)$/i,
}

function OsIcon({ os, size = 15 }: { os: OS; size?: number }) {
  if (os === 'windows') return <WindowsLogo size={size} weight="fill" />
  if (os === 'macos') return <AppleLogo size={size} weight="fill" />
  return <LinuxLogo size={size} weight="fill" />
}

// Best-effort guess of the visitor's OS, for choosing the primary button. Runs after mount.
function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'windows'
  const s = `${navigator.userAgent} ${navigator.platform}`.toLowerCase()
  if (s.includes('mac')) return 'macos'
  if (s.includes('linux') || s.includes('x11') || s.includes('android')) return 'linux'
  return 'windows'
}

// Fetch the newest published release once and map each OS to its asset download URL.
function useReleaseAssets() {
  const [assets, setAssets] = useState<Partial<Record<OS, string>>>({})
  useEffect(() => {
    let alive = true
    fetch(`https://api.github.com/repos/${site.ghRepo}/releases?per_page=10`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((list: unknown) => {
        if (!alive || !Array.isArray(list)) return
        const rel = list.find((r: { draft?: boolean }) => !r?.draft) as
          | { assets?: { name: string; browser_download_url: string }[] }
          | undefined
        if (!rel?.assets) return
        const next: Partial<Record<OS, string>> = {}
        for (const os of ALL) {
          const a = rel.assets.find((x) => ASSET_RE[os].test(x.name))
          if (a) next[os] = a.browser_download_url
        }
        setAssets(next)
      })
      .catch(() => {
        /* keep the Releases-page fallback */
      })
    return () => {
      alive = false
    }
  }, [])
  return assets
}

/* ---------- Hero / invitation: full three-platform set ---------- */
export function DownloadButtons({ caption }: { caption?: string }) {
  const assets = useReleaseAssets()
  const [os, setOs] = useState<OS>('windows')
  useEffect(() => setOs(detectOS()), [])
  const others = ALL.filter((o) => o !== os)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a href={assets[os] ?? site.releases} target="_blank" rel="noreferrer" className="btn btn-primary">
          <DownloadSimple size={18} weight="bold" />
          Download for {LABEL[os]}
        </a>
        <a href={site.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
          <GithubLogo size={18} weight="fill" />
          View on GitHub
        </a>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[13px] text-faint">
        <span>Also for</span>
        {others.map((o, i) => (
          <Fragment key={o}>
            <a
              href={assets[o] ?? site.releases}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 underline decoration-dotted underline-offset-4 transition-colors hover:text-accent"
            >
              <OsIcon os={o} />
              {LABEL[o]}
            </a>
            {i < others.length - 1 ? <span aria-hidden>·</span> : null}
          </Fragment>
        ))}
      </div>
      {caption ? <p className="font-mono text-[13px] text-faint">{caption}</p> : null}
    </div>
  )
}

/* ---------- Compact single button (nav, footer, sub-pages) ---------- */
export function DownloadButton({
  className = 'btn btn-primary',
  label = 'Download',
}: {
  className?: string
  label?: string
}) {
  const assets = useReleaseAssets()
  const [os, setOs] = useState<OS>('windows')
  useEffect(() => setOs(detectOS()), [])
  return (
    <a href={assets[os] ?? site.releases} target="_blank" rel="noreferrer" className={className}>
      <DownloadSimple size={16} weight="bold" />
      {label}
    </a>
  )
}
