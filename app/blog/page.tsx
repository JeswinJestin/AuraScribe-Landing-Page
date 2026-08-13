import type { Metadata } from 'next'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { PageShell } from '@/components/page-shell'
import { posts, formatDate } from '@/lib/blog'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Guides and honest notes on offline dictation, on-device speech to text, privacy, and getting the most out of AuraScribe on Windows.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'AuraScribe Blog',
    description: 'Guides on offline dictation, on-device speech to text, and privacy.',
    url: `${site.url}/blog`,
  },
}

export default function BlogIndex() {
  return (
    <PageShell
      eyebrow="Blog"
      title="Notes on dictation, done locally."
      intro="Practical guides and honest write-ups about offline speech to text on Windows: how it works, how it compares, and how to make it yours."
    >
      <ul className="not-prose mt-2 flex flex-col">
        {posts.map((p, i) => (
          <li key={p.slug} className={i > 0 ? 'border-t-2 border-line' : ''}>
            <a href={`/blog/${p.slug}`} className="group block py-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-faint">
                <time dateTime={p.date}>{formatDate(p.date)}</time>
                <span aria-hidden>·</span>
                <span>{p.readingMinutes} min read</span>
              </div>
              <h2 className="display mt-3 text-[26px] leading-tight transition-colors group-hover:text-accent sm:text-[32px]">
                {p.title}
              </h2>
              <p className="mt-3 max-w-[64ch] text-[16px] leading-relaxed text-muted">{p.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-accent">
                Read
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
