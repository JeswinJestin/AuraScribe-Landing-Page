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
    default: 'AuraScribe — offline voice dictation for Windows, free and open source',
    template: '%s · AuraScribe',
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: 'Jeswin Thomas Jestin' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    title: 'AuraScribe — offline voice dictation for Windows',
    description: site.description,
    siteName: 'AuraScribe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuraScribe — offline voice dictation for Windows',
    description: site.description,
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${site.url}/#app`,
      name: 'AuraScribe',
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'Voice dictation',
      operatingSystem: 'Windows 10, Windows 11',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: site.description,
      url: site.url,
      downloadUrl: site.releases,
      softwareVersion: '1.0.0',
      fileSize: '8.6 MB',
      license: 'https://opensource.org/licenses/MIT',
      isAccessibleForFree: true,
      featureList: [
        '100% offline, on-device speech recognition',
        'Types into any Windows application',
        'English, 25 European and ~40 Asian languages, Malayalam and Kannada',
        'Automatic punctuation, casing and filler-word cleanup',
        'No account, no subscription, no cloud',
      ],
      author: { '@type': 'Person', name: 'Jeswin Thomas Jestin' },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: 'AuraScribe',
      description: site.description,
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
