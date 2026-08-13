/*
  Blog content model. Post BODIES live in each app/blog/<slug>/page.tsx (as real, crawlable JSX so
  Google gets the text without running JS); this file is the single source of truth for the METADATA
  that the index, the sitemap, the per-post <metadata>, and the Article JSON-LD all read. Keep the
  slugs stable once published (they are the canonical URLs).

  No keyword stuffing: titles/descriptions describe what each post actually says. Dates are the real
  publish dates; bump `updated` only on a material edit.
*/

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string // ISO, publish date
  updated?: string // ISO, if materially revised
  readingMinutes: number
  tags: string[]
}

// Newest first — the index renders them in this order.
export const posts: BlogPost[] = [
  {
    slug: 'offline-dictation-windows',
    title: 'Offline dictation on Windows: how on-device speech to text works',
    description:
      'What "offline dictation" really means on Windows, how on-device speech recognition runs in real time on a normal CPU, and where the one and only network request happens.',
    date: '2026-08-13',
    readingMinutes: 6,
    tags: ['offline dictation', 'Windows', 'on-device'],
  },
  {
    slug: 'free-wispr-flow-alternative',
    title: 'A free Wispr Flow alternative that runs entirely on your machine',
    description:
      'An honest comparison of AuraScribe with Wispr Flow, Superwhisper, Windows Voice Typing, and Dragon, for people who want dictation without a subscription or the cloud.',
    date: '2026-08-13',
    readingMinutes: 7,
    tags: ['Wispr Flow alternative', 'comparison', 'free'],
  },
  {
    slug: 'malayalam-speech-to-text-offline',
    title: 'On-device Malayalam (and Kannada) speech to text, with no cloud',
    description:
      'Most dictation tools skip Malayalam and Kannada or send them to a server. How AuraScribe runs both fully offline using AI4Bharat IndicConformer, and what to expect.',
    date: '2026-08-13',
    readingMinutes: 6,
    tags: ['Malayalam speech to text', 'Kannada', 'IndicConformer'],
  },
  {
    slug: 'dictate-into-any-app-hotkey',
    title: 'How to dictate into any Windows app with a single hotkey',
    description:
      'A step-by-step guide to setting up push-to-talk dictation that types clean text into any Windows application, from your browser to your terminal.',
    date: '2026-08-13',
    readingMinutes: 5,
    tags: ['how-to', 'hotkey', 'voice typing'],
  },
  {
    slug: 'local-vs-cloud-dictation-privacy',
    title: 'Local vs cloud dictation: what actually happens to your voice',
    description:
      'Cloud dictation streams your microphone to someone else’s servers. Here is what that means for privacy, and how local speech recognition removes the risk entirely.',
    date: '2026-08-13',
    readingMinutes: 6,
    tags: ['privacy', 'local speech recognition', 'cloud'],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

// Human-readable date, e.g. "13 August 2026". Deterministic (UTC) so server and client agree.
export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
