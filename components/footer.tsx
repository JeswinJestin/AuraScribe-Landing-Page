import { DownloadSimple, GithubLogo, Heart, Coffee, LinkedinLogo, BehanceLogo } from '@phosphor-icons/react/dist/ssr'
import { site } from '@/lib/site'
import { Reveal } from './primitives'

/*
  Footer — the closing chamber. An oversized serif wordmark anchors it (the reference's
  "wordmark as the signature element"), with the download beside it, then plain link columns and
  a hairline legal row. Flat, border-driven, no shadows.
*/
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full pt-20 md:pt-28">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col gap-10 border-b-2 border-line pb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="display text-[52px] leading-none sm:text-[76px] md:text-[92px]">AuraScribe</p>
              <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-muted">
                Free, open-source voice dictation for Windows. Every word is transcribed on your own
                machine, and it stays there.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <a href={site.releases} target="_blank" rel="noreferrer" className="btn btn-primary">
                <DownloadSimple size={18} weight="bold" />
                Download for Windows
              </a>
            </div>
          </div>
        </Reveal>

        {/* 4 columns only from lg, so the support buttons always have room to sit on one line. */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-faint">The page</p>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li><a href="#reach" className="hover:text-accent">Languages</a></li>
              <li><a href="#how" className="hover:text-accent">How it works</a></li>
              <li><a href="#features" className="hover:text-accent">Features</a></li>
              <li><a href="#compare" className="hover:text-accent">Comparison</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-faint">Project</p>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li><a href="/about" className="hover:text-accent">About</a></li>
              <li><a href="/blog" className="hover:text-accent">Blog</a></li>
              <li>
                <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-accent">
                  Source on GitHub
                </a>
              </li>
              <li>
                <a href={site.releases} target="_blank" rel="noreferrer" className="hover:text-accent">
                  Releases
                </a>
              </li>
              <li>
                <a href={`${site.github}/issues`} target="_blank" rel="noreferrer" className="hover:text-accent">
                  Report an issue
                </a>
              </li>
              <li>
                <a href={`${site.github}/blob/master/LICENSE`} target="_blank" rel="noreferrer" className="hover:text-accent">
                  MIT License
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-faint">Support the work</p>
            <div className="mt-5 flex flex-col items-start gap-3">
              <a href={site.sponsor} target="_blank" rel="noreferrer" className="btn btn-ghost !py-2 !text-[14px]">
                <Heart size={15} weight="fill" style={{ color: 'hsl(var(--record))' }} />
                Sponsor
              </a>
              <a href={site.coffee} target="_blank" rel="noreferrer" className="btn btn-ghost !py-2 !text-[14px]">
                <Coffee size={15} weight="fill" />
                Buy me a coffee
              </a>
              <a href={site.github} target="_blank" rel="noreferrer" className="btn btn-ghost !py-2 !text-[14px]">
                <GithubLogo size={15} weight="fill" />
                Star the repo
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-faint">Requirements</p>
            <ul className="mt-5 space-y-3 text-[15px] text-muted">
              <li>Windows 10 or 11, 64-bit</li>
              <li>~8.6 MB installer</li>
              <li>A microphone</li>
              <li>No account, no internet after setup</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t-2 border-line py-8 text-[13px] text-faint sm:flex-row sm:items-center">
          <p>© {year} AuraScribe. Released under the MIT License.</p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/about" className="hover:text-accent">About</a>
            <a href="/privacy" className="hover:text-accent">Privacy</a>
            <a href="/terms" className="hover:text-accent">Terms</a>
            <span className="flex items-center gap-3">
              <a href="/about" className="font-mono hover:text-accent">Built by {site.author.name}</a>
              <a
                href={site.author.githubProfile}
                target="_blank"
                rel="noreferrer"
                aria-label={`${site.author.name} on GitHub`}
                className="hover:text-accent"
              >
                <GithubLogo size={16} weight="fill" />
              </a>
              {site.author.linkedin ? (
                <a
                  href={site.author.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${site.author.name} on LinkedIn`}
                  className="hover:text-accent"
                >
                  <LinkedinLogo size={16} weight="fill" />
                </a>
              ) : null}
              {site.author.behance ? (
                <a
                  href={site.author.behance}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${site.author.name} on Behance`}
                  className="hover:text-accent"
                >
                  <BehanceLogo size={16} weight="fill" />
                </a>
              ) : null}
            </span>
          </nav>
        </div>
      </div>
    </footer>
  )
}
