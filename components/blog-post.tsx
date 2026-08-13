import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { PageShell } from '@/components/page-shell'
import { site } from '@/lib/site'
import { formatDate, type BlogPost as PostMeta } from '@/lib/blog'

/*
  BlogPost — the chrome for a single article. Reuses PageShell (same header/footer/prose), and adds:
  a Home / Blog breadcrumb, a date + reading-time meta line, structured data (BlogPosting +
  BreadcrumbList, describing only what is actually on the page), and a footer CTA back to the blog.
  The article BODY is passed as children (real crawlable JSX).
*/
export function BlogPost({ post, children }: { post: PostMeta; children: React.ReactNode }) {
  const url = `${site.url}/blog/${post.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        author: { '@type': 'Person', name: 'Jeswin Thomas Jestin' },
        publisher: { '@type': 'Organization', name: 'AuraScribe', url: site.url },
        mainEntityOfPage: url,
        keywords: post.tags.join(', '),
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  }

  const breadcrumb = (
    <nav aria-label="Breadcrumb" className="font-mono text-[12px] uppercase tracking-[0.14em] text-faint">
      <a href="/" className="hover:text-accent">Home</a>
      <span className="px-2" aria-hidden>/</span>
      <a href="/blog" className="hover:text-accent">Blog</a>
    </nav>
  )

  const meta = (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-faint">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden>·</span>
      <span>{post.readingMinutes} min read</span>
      {post.updated ? (
        <>
          <span aria-hidden>·</span>
          <span>Updated {formatDate(post.updated)}</span>
        </>
      ) : null}
    </div>
  )

  return (
    <>
      {/* All fields are static, author-controlled metadata (no user input). Escaping '<' still hardens
          against a '</script>' breakout, the one real injection vector for inline JSON-LD. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <PageShell eyebrow="Blog" breadcrumb={breadcrumb} title={post.title} intro={post.description} meta={meta}>
        {children}
        <p className="not-prose mt-16 border-t-2 border-line pt-8">
          <a href="/blog" className="inline-flex items-center gap-2 font-semibold text-accent hover:brightness-110">
            <ArrowRight size={18} weight="bold" className="rotate-180" />
            All posts
          </a>
        </p>
      </PageShell>
    </>
  )
}
