import Link from 'next/link'
import { GithubLogo } from '@phosphor-icons/react/dist/ssr'
import { site } from '@/lib/site'
import { DownloadButton } from './download'

const links = [
  { href: '#reach', label: 'Languages' },
  { href: '#how', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#compare', label: 'Compare' },
  { href: '/blog', label: 'Blog' },
]

export function Nav() {
  return (
    <header className="sticky top-0 z-40">
      <div className="container-x pt-5">
        <nav className="glass mx-auto flex h-14 max-w-[1000px] items-center justify-between gap-4 px-4 shadow-[0_8px_30px_rgb(0_0_0/0.06)] sm:px-6">
          <Link href="#top" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-end justify-center gap-[2px] rounded-md bg-accent/12 px-1.5 pb-1.5">
              <span className="w-[2.5px] rounded-full bg-accent" style={{ height: 9 }} />
              <span className="w-[2.5px] rounded-full bg-accent" style={{ height: 14 }} />
              <span className="w-[2.5px] rounded-full bg-record" style={{ height: 6 }} />
            </span>
            <span className="font-display text-[19px] font-semibold tracking-tight">AuraScribe</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[14px] text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="AuraScribe on GitHub"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-bg sm:flex"
            >
              <GithubLogo size={18} weight="fill" />
            </a>
            <DownloadButton className="btn btn-primary !px-4 !py-2 !text-[14px]" />
          </div>
        </nav>
      </div>
    </header>
  )
}
