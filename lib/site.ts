/*
  Canonical site origin. The production domain (bought from name.com) is aurascribe.dev, so that is
  the default and every page's canonical / sitemap / OG points at it — even on a preview or the raw
  *.vercel.app URL, which is exactly what you want (previews should never be indexed as canonical).
  Override with NEXT_PUBLIC_SITE_URL only if the domain ever changes. site.url is read server-side
  (metadata, sitemap, robots, JSON-LD).
*/
// NOTE: Vercel serves www.aurascribe.dev as the PRIMARY domain (the bare apex 308-redirects to it),
// so the canonical/sitemap/OG must use www — otherwise the canonical and the social-preview image URL
// would point at a redirecting apex, which some social scrapers refuse to follow. If you later make
// the bare apex the primary domain in Vercel (www -> apex), change this back to 'https://aurascribe.dev'.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://www.aurascribe.dev'

export const site = {
  name: 'AuraScribe',
  tagline: 'Free, offline voice dictation for Windows.',
  description:
    'AuraScribe is a free, open-source, 100% offline voice dictation app for Windows. Press a hotkey, speak, and clean text appears in any app. A private, local alternative to Wispr Flow, Superwhisper, and Dragon. No cloud, no account, no subscription.',
  url: siteUrl,
  github: 'https://github.com/JeswinJestin/AuraScribe',
  releases: 'https://github.com/JeswinJestin/AuraScribe/releases/latest',
  sponsor: 'https://github.com/sponsors/JeswinJestin',
  coffee: 'https://buymeacoffee.com/jes.weee',
  // The maker, for the About page + Person structured data (helps searches for the name resolve to
  // a real entity). Only verifiable facts belong here; `linkedin` is filled in by the owner.
  author: {
    name: 'Jeswin Thomas Jestin',
    githubProfile: 'https://github.com/JeswinJestin',
    linkedin: 'https://www.linkedin.com/in/jeswin-thomas-jestin/',
    behance: 'https://www.behance.net/jeswinjestin',
  },
  // Visible contact address (SEO/trust). Dedicated inbox for the site's contact form + support.
  contactEmail: 'contact.aurascribe@gmail.com',
  // Google Form wiring for the contact form. `formAction` is the form's /formResponse URL; `fields`
  // maps each input to the form's entry.<id>. Submissions land in the linked Google Form/Sheet.
  contactForm: {
    formAction: 'https://docs.google.com/forms/d/e/1FAIpQLScEBSsPLHrrbkKJcsAfWGySxlWHRCnLV4KDfm4yYyNWNaLmRQ/formResponse',
    fields: { name: 'entry.2005620554', email: 'entry.1045781291', message: 'entry.1166974658' },
  },
  keywords: [
    'voice dictation',
    'speech to text',
    'offline dictation Windows',
    'offline speech to text',
    'local speech recognition',
    'on-device dictation',
    'private voice typing',
    'voice typing Windows',
    'dictation software for Windows',
    'free Wispr Flow alternative',
    'Wispr Flow alternative',
    'Superwhisper alternative',
    'Dragon alternative',
    'Windows Voice Typing alternative',
    'open source dictation',
    'open source voice to text',
    'free dictation app',
    'no subscription dictation',
    'Malayalam voice typing',
    'Malayalam speech to text',
    'Kannada speech to text',
    'Kannada dictation',
  ],
}

/* Real Q&A used both on the page and as FAQPage structured data. Answers are literal facts about
   the app: keep them accurate (they double as claims Google can surface). */
export const faqs = [
  {
    q: 'Is AuraScribe really free?',
    a: 'Yes. AuraScribe is free forever and open source under the MIT license. There is no paid tier, no subscription, and no account to create.',
  },
  {
    q: 'Does my voice get sent to the cloud?',
    a: 'No. Every word is transcribed on your own PC. The only network request the app ever makes is downloading a speech model once, after which it works fully offline.',
  },
  {
    q: 'How is it different from Wispr Flow, Superwhisper, or Dragon?',
    a: 'AuraScribe is free, open source, and 100% offline, with no account required. Wispr Flow and Superwhisper are paid and cloud-based; Dragon is expensive. It is the private, local alternative.',
  },
  {
    q: 'Which languages does it support?',
    a: 'English plus 25 European languages, roughly 40 Asian languages, and Malayalam and Kannada, using four on-device engines. Each auto-detects the language within its region.',
  },
  {
    q: 'What are the system requirements?',
    a: 'Windows 10 or 11 (64-bit) and a microphone. The installer is about 8.6 MB and runs faster than real time on an ordinary CPU. No internet is needed after the first model download.',
  },
  {
    q: 'Does it work in every application?',
    a: 'Yes. Press the hotkey in any window and the finished text is typed straight into whatever app has your cursor: browsers, editors, terminals, chat boxes, and form fields.',
  },
]

export const engines = [
  { name: 'Moonshine', role: 'English', by: 'Useful Sensors' },
  { name: 'NVIDIA Parakeet', role: '25 European languages', by: 'NVIDIA' },
  { name: 'Dolphin', role: '~40 Asian languages', by: 'DataoceanAI' },
  { name: 'IndicConformer', role: 'Malayalam & Kannada', by: 'AI4Bharat' },
]

export const comparison = {
  rows: [
    { label: 'Price', values: ['Free forever', 'Subscription', 'Paid', 'Free', 'Paid'] },
    { label: 'Open source', values: [true, false, false, false, false] },
    { label: 'Runs offline (no cloud)', values: [true, false, true, 'Sends to Microsoft', true] },
    { label: 'No account required', values: [true, false, true, false, true] },
    { label: 'Types into any app', values: [true, true, true, true, true] },
    { label: 'Malayalam / Kannada', values: [true, 'Cloud only', false, 'Limited', false] },
  ],
  cols: ['AuraScribe', 'Wispr Flow', 'Superwhisper', 'Windows Voice Typing', 'Dragon'],
}
