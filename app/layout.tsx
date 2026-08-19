import type { Metadata } from 'next'
import { EB_Garamond, Figtree } from 'next/font/google'
import { site, faqs } from '@/lib/site'
import { ThemeScroll } from '@/components/theme-scroll'
import './globals.css'

// Editorial system (Wispr-Flow-quality): a classical serif at display scale for the voice,
// a clean geometric sans for everything interactive. Weight-400 serif commands through size.
const display = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-display',
  display: 'swap',
})
const sans = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'AuraScribe — offline voice dictation for Windows, macOS & Linux, free and open source',
    template: '%s · AuraScribe',
  },
  description: site.metaDescription,
  keywords: site.keywords,
  authors: [{ name: 'Jeswin Thomas Jestin' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    title: 'AuraScribe — offline voice dictation for Windows, macOS & Linux',
    description: site.description,
    siteName: 'AuraScribe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuraScribe — offline voice dictation for Windows, macOS & Linux',
    description: site.description,
  },
  robots: { index: true, follow: true },
  // Bing Webmaster ownership. Also verifiable via /BingSiteAuth.xml (public/). Google Search Console
  // is verified separately via a DNS TXT record (no meta tag needed) — see docs/SEO.md.
  verification: { other: { 'msvalidate.01': '3BB68E671EFDBCEC0E777C1BF54853D7' } },
}

// sameAs lists the maker's canonical profiles so search engines can resolve "Jeswin Thomas Jestin"
// to one entity. Only real, owned profiles belong here; the empty ones are dropped.
const authorSameAs = [site.author.githubProfile, site.author.linkedin, site.author.behance].filter(Boolean)

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${site.url}/#jeswin`,
      name: site.author.name,
      url: site.author.linkedin || site.author.githubProfile,
      description:
        'Creator and maintainer of AuraScribe, a free, open-source, offline voice dictation app for Windows, macOS, and Linux.',
      sameAs: authorSameAs,
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${site.url}/#app`,
      name: 'AuraScribe',
      // Spelling variants people search for, so Google resolves them all to THIS entity and stops
      // conflating it with the unrelated "Aura AI Scribe" (medical) / "auraScribe.co" (meeting notes).
      alternateName: ['Aura Scribe', 'aurascribe', 'Aurascribe', 'aura scribe', 'Aura Scribe app', 'AuraScribe app'],
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'Voice dictation',
      operatingSystem: 'Windows 10, Windows 11, macOS, Linux',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: site.description,
      url: site.url,
      downloadUrl: site.releases,
      softwareVersion: '2.0.0',
      fileSize: '9 MB',
      license: 'https://opensource.org/licenses/MIT',
      isAccessibleForFree: true,
      featureList: [
        '100% offline, on-device speech recognition',
        'Cross-platform: Windows, macOS and Linux',
        'Types into any application',
        'English, 25 European and ~40 Asian languages, Malayalam and Kannada',
        'Automatic punctuation, casing and filler-word cleanup',
        'No account, no subscription, no cloud',
      ],
      author: { '@id': `${site.url}/#jeswin` },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: 'AuraScribe',
      alternateName: ['Aura Scribe', 'aurascribe', 'Aurascribe', 'aura scribe'],
      description: site.description,
      publisher: { '@id': `${site.url}/#jeswin` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* The page canvas. Its colour is transitioned by ThemeScroll as you move between
            chambers, so the whole page blends dark -> cream -> dark rather than cutting. */}
        <ThemeScroll />
        {children}
      </body>
    </html>
  )
}
