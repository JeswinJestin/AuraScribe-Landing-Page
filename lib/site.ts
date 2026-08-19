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
  tagline: 'Free, offline voice dictation for Windows, macOS, and Linux.',
  // Long description — used for OG/Twitter and the JSON-LD, where length is not penalised.
  description:
    'AuraScribe is a free, open-source voice dictation and voice typing app that runs 100% offline on Windows, macOS, and Linux. Press a hotkey, speak, and clean text appears in any app. A private, local, free and open-source alternative to Wispr Flow, Superwhisper, and Dragon. No cloud, no account, no subscription.',
  // Short description for the <meta name="description"> tag — kept within the 160-char limit search
  // engines display, so it is never truncated.
  metaDescription:
    'Free, open-source voice dictation and voice typing, 100% offline on Windows, macOS and Linux. A private, free Wispr Flow alternative. Type by voice in any app.',
  url: siteUrl,
  github: 'https://github.com/JeswinJestin/AuraScribe',
  // owner/repo slug, used to query the GitHub Releases API for per-OS direct downloads.
  ghRepo: 'JeswinJestin/AuraScribe',
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
    'offline dictation Mac',
    'offline dictation Linux',
    'cross-platform dictation',
    'voice dictation macOS',
    'voice dictation Linux',
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
    // Natural-language phrasings real people type into search. These feed the (Google-ignored)
    // meta-keywords tag, so they are near-useless for ranking on their own; the real ranking work
    // is the visible copy, headings, FAQ and blog posts. Kept here for Bing/other engines + record.
    'AuraScribe',
    'talk to type',
    'talk and type app',
    'type with your voice',
    'voice to text Windows',
    'voice to text Mac',
    'voice to text Linux',
    'dictation app for Windows',
    'dictation app for Mac',
    'dictation app for Linux',
    'Mac dictation app',
    'Linux dictation app',
    'best free dictation software',
    'best voice typing tool for Windows',
    'free voice typing app',
    'free dictation tool',
    'speech recognition software Windows',
    'AI dictation app',
    'offline AI dictation',
    // Cross-platform + engine/comparison phrasings people actually search.
    'cross-platform voice dictation',
    'offline Whisper alternative',
    'local Whisper dictation',
    'push to talk dictation',
    'hands free typing',
    'dictate into any app',
    'private speech to text',
    'no cloud dictation',
    'Superwhisper alternative Mac',
    'Dragon NaturallySpeaking alternative',
    'macOS dictation without cloud',
    'Linux speech to text offline',
    // High-intent long-tail: "free / open-source / cross-platform alternative" phrasings people type.
    'voice typing',
    'voice typing Mac',
    'voice typing Linux',
    'voice typing app',
    'free voice typing software',
    'dictation tool',
    'free dictation tool',
    'free dictation tool for Windows Mac and Linux',
    'free dictation software for Mac',
    'free dictation software for Linux',
    'free open source dictation',
    'free open source voice to text',
    'free and open source dictation app',
    'open source speech to text',
    'free speech to text app',
    'free alternative to Wispr Flow',
    'open source Wispr Flow alternative',
    'free and open source alternative to Wispr Flow',
    'open source alternative to Superwhisper',
    'free Dragon alternative',
    'dictation app for Windows Mac and Linux',
    'type with your voice free',
    'voice to text app free',
    'cross-platform voice typing',
    // Brand-name variants (spelling + casing) so a search for any form of the name resolves here.
    // Search engines are case-insensitive, so the casing entries are belt-and-suspenders; the
    // SPELLING variants (one word vs two) are the ones that actually matter, and they are also in
    // the JSON-LD `alternateName` in app/layout.tsx, which Google uses for entity disambiguation.
    'aurascribe',
    'Aurascribe',
    'AURASCRIBE',
    'auraScribe',
    'aura scribe',
    'Aura scribe',
    'Aura Scribe',
    'Aura Scribe app',
    'AuraScribe app',
    'AuraScribe dictation',
    'AuraScribe download',
    'AuraScribe Windows',
    'AuraScribe Mac',
    'AuraScribe macOS',
    'AuraScribe Linux',
    'Jeswin Thomas Jestin',
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
    a: 'A microphone and one of: Windows 10 or 11 (64-bit), macOS on Apple Silicon, or Linux (Debian or Ubuntu). The download is about 9 MB and runs faster than real time on an ordinary CPU, no GPU required. No internet is needed after the first model download.',
  },
  {
    q: 'Is there a macOS or Linux version?',
    a: 'Yes. As of version 2.0, AuraScribe runs on Windows, macOS (Apple Silicon), and Linux (Debian and Ubuntu), all from the releases page. Windows is the most battle-tested; macOS and Linux are newer. On macOS you approve it once in Privacy and Security (it is not notarized) and grant an Accessibility permission; on Linux it works best in an X11 session. The download button picks the right build for your system automatically.',
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
