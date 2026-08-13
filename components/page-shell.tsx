import { DownloadSimple, ArrowLeft, GithubLogo } from '@phosphor-icons/react/dist/ssr'
import { site } from '@/lib/site'

/*
  PageShell — the chrome for the standalone content pages (About / Terms / Privacy).

  These pages are static and always DARK: they carry data-chamber="dark" so that on a fresh
  load ThemeScroll (mounted in the layout) settles the page on the dark token set, and they use
  plain <a href="/"> for the home links so navigating back does a full load and re-initialises
  the scroll-driven colour engine cleanly (the homepage owns that machinery, not these pages).

  No smooth-scroll, no GSAP, no in-page anchors here: just a readable reading column with the
  same editorial header/footer language as the rest of the site.
*/
export function PageShell({
  eyebrow,
  breadcrumb,
  title,
  intro,
  updated,
  meta,
  children,
}: {
  eyebrow: string
  breadcrumb?: React.ReactNode // when set, replaces the eyebrow (e.g. a Home / Blog crumb)
  title: string
  intro?: string
  updated?: string
  meta?: React.ReactNode // when set, replaces the "Last updated" line (e.g. date + reading time)
  children: React.ReactNode
}) {
  const year = new Date().getFullYear()

  return (
    <div data-chamber="dark" className="min-h-screen">
      {/* Header: logo home, back link, download. Plain anchors = full navigation on purpose. */}
      <header className="border-b-2 border-line">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-end justify-center gap-[2px] rounded-md bg-accent/12 px-1.5 pb-1.5">
              <span className="w-[2.5px] rounded-full bg-accent" style={{ height: 9 }} />
              <span className="w-[2.5px] rounded-full bg-accent" style={{ height: 14 }} />
              <span className="w-[2.5px] rounded-full bg-record" style={{ height: 6 }} />
            </span>
            <span className="font-display text-[19px] font-semibold tracking-tight">AuraScribe</span>
          </a>
          <a href={site.releases} target="_blank" rel="noreferrer" className="btn btn-primary !px-4 !py-2 !text-[14px]">
            <DownloadSimple size={16} weight="bold" />
            Download
          </a>
        </div>
      </header>

      <main className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-[72ch]">
          {/* Back-to-home sits right above the page title (owner's placement). Blog posts already
              carry a Home / Blog breadcrumb, so it is only shown when there is no breadcrumb. */}
          {!breadcrumb ? (
            <a
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-[14px] font-medium text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft size={15} weight="bold" />
              Back to home
            </a>
          ) : null}
          {breadcrumb ? breadcrumb : <p className="eyebrow">{eyebrow}</p>}
          <h1 className="display mt-4 text-[44px] leading-[1.02] sm:text-[60px] md:text-[72px]">{title}</h1>
          {intro ? <p className="mt-6 max-w-[60ch] text-[19px] leading-relaxed text-muted">{intro}</p> : null}
          {meta ? (
            <div className="mt-6">{meta}</div>
          ) : updated ? (
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-faint">Last updated {updated}</p>
          ) : null}

          <div className="prose mt-14">{children}</div>
        </div>
      </main>

      {/* Slim footer: the content pages don't use the homepage's in-page anchors, so this is a
          compact legal row that cross-links the three pages and returns home. */}
      <footer className="border-t-2 border-line">
        <div className="container-x flex flex-col gap-4 py-8 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} AuraScribe. Released under the MIT License.</p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/" className="hover:text-accent">Home</a>
            <a href="/blog" className="hover:text-accent">Blog</a>
            <a href="/about" className="hover:text-accent">About</a>
            <a href="/privacy" className="hover:text-accent">Privacy</a>
            <a href="/terms" className="hover:text-accent">Terms</a>
            <a href="/license" className="hover:text-accent">License</a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent"
            >
              <GithubLogo size={14} weight="fill" />
              GitHub
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
