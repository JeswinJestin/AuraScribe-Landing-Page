'use client'

/*
  Platform-aware download. On mount we hit GitHub's canonical `/releases/latest` once and resolve the
  exact asset for each OS (.exe / .dmg / .deb) from THAT release, so every button is a real anchor
  that goes straight to the latest release's installer for that platform — no version hardcoded here,
  so it tracks whatever you publish next automatically and never goes stale. `/releases/latest` is
  the same release the "releases/latest" fallback page points to (it excludes drafts AND prereleases),
  so the direct links and the fallback can never disagree. Before the fetch resolves (JS disabled,
  API rate-limited, or no full release yet) the href falls back to that Releases page, so a click
  always lands somewhere useful.
*/

import { useEffect, useState } from 'react'
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

// Best-effort guess of the visitor's DESKTOP OS, for choosing the primary button. Runs after mount.
function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'windows'
  const s = `${navigator.userAgent} ${navigator.platform}`.toLowerCase()
  // AuraScribe is a desktop app. On a phone or tablet the device OS is meaningless for a desktop
  // download (you cannot install a .deb/.dmg on Android or iOS), and Android would otherwise read
  // as "linux". So on any mobile device default to Windows, the most common desktop, and let the
  // per-OS chips below cover whoever is actually on a Mac or Linux desktop.
  if (/android|iphone|ipad|ipod|mobile|windows phone/.test(s)) return 'windows'
  if (s.includes('mac')) return 'macos'
  if (s.includes('linux') || s.includes('x11')) return 'linux'
  return 'windows'
}

// Fetch the latest release once and map each OS to its asset download URL.
function useReleaseAssets() {
  const [assets, setAssets] = useState<Partial<Record<OS, string>>>({})
  useEffect(() => {
    let alive = true
    fetch(`https://api.github.com/repos/${site.ghRepo}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((rel: { assets?: { name: string; browser_download_url: string }[] }) => {
        if (!alive || !rel?.assets) return
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

/* ---------- Hero / invitation: full three-platform set ----------
   One obvious primary button for the visitor's own OS, then all three platforms as equal,
   legible chips so macOS and Linux read as first-class downloads (not a faint afterthought)
   and the whole block stays compact enough to sit inside the first viewport. */
export function DownloadButtons({ caption }: { caption?: string }) {
  const assets = useReleaseAssets()
  const [os, setOs] = useState<OS>('windows')
  useEffect(() => setOs(detectOS()), [])

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-5 sm:w-auto sm:max-w-none">
      {/* On phones the two buttons stack full-width so they are the SAME size and never look
          lopsided; from sm up they sit side by side at their natural width. */}
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
        <a
          href={assets[os] ?? site.releases}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary w-full sm:w-auto"
        >
          <DownloadSimple size={18} weight="bold" />
          Download for {LABEL[os]}
        </a>
        <a href={site.github} target="_blank" rel="noreferrer" className="btn btn-ghost w-full sm:w-auto">
          <GithubLogo size={18} weight="fill" />
          View on GitHub
        </a>
      </div>
      {/* Every platform is one tap away. The chip matching the visitor's OS is tinted to match
          the primary button above, so the pair reads as one decision; the other two sit beside
          it as equal, legible options rather than a faint afterthought. 2px borders keep them in
          the same flat, hairline system as the rest of the page. */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {ALL.map((o) => {
          const active = o === os
          return (
            <a
              key={o}
              href={assets[o] ?? site.releases}
              target="_blank"
              rel="noreferrer"
              aria-label={`Download AuraScribe for ${LABEL[o]}`}
              className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-[14px] font-medium transition-colors ${
                active
                  ? 'border-accent/55 bg-accent/[0.08] text-accent'
                  : 'border-line text-muted hover:border-accent/45 hover:text-ink'
              }`}
            >
              <OsIcon os={o} size={16} />
              {LABEL[o]}
            </a>
          )
        })}
      </div>
      <p className="font-mono text-[12px] tracking-wide text-faint">
        {caption ?? 'Free forever · MIT licensed · no account, no cloud'}
      </p>
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
