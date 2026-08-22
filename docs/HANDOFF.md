# AuraScribe Landing — Handoff & Continuity

> **Single source of truth for the landing page. New chat: read this top to bottom before touching
> anything.** It is current as of the date below. The older "awwwards / frame-sequence storytelling"
> plan is ABANDONED (see "Direction history"); do not resurrect it.

**Last updated:** 2026-08-19 (round 3) (language wheel alignment/timing fixed; footer requirements now cross-platform; brand-name spelling/case variants added for search; 3 new cross-platform blog posts; downloads resolve via `/releases/latest`; hero fits ONE viewport with full-size type; three-platform download chips; new `docs/BACKLINKS.md`) · **Owner:** Jeswin Thomas Jestin

**2026-08-19 (round 3) — language wheel alignment/timing, footer requirements, brand keywords, 3 blog posts, mobile/responsive hero, detectOS, README.**
- **Mobile default download = Windows (`components/download.tsx` `detectOS`).** AuraScribe is a
  DESKTOP app; on a phone the device OS is meaningless for the download (Android read as "linux",
  iPhone as "mac"), so `detectOS` now returns `windows` for any mobile UA
  (`android|iphone|ipad|ipod|mobile|windows phone`) and only auto-detects on real desktops
  (Mac→macos, Linux→linux). The per-OS chips still let a mobile visitor grab the Mac/Linux build.
  Verified live with an Android UA: primary reads "Download for Windows".
- **Responsive hero (`components/story.tsx` + `download.tsx`).** On tight screens the hero is
  top-aligned with a real gap under the nav pill (was crowding the eyebrow); `justify-start pt-12
  pb-16` on mobile, `md:justify-center md:pt-0 md:pb-[5vh]` keeps the tuned desktop fit. The two CTA
  buttons ("Download for <OS>" + "View on GitHub") now stack FULL-WIDTH and equal-sized on phones
  (`w-full` in a `max-w-sm` column) and sit side-by-side at natural width from `sm` up. Verified:
  375px = 48px nav gap + equal 327px buttons, no horizontal overflow; 1200px = side-by-side, fits.
- **README refreshed** — was "for Windows" (stale) → cross-platform, blog count 5→8, target-keyword
  phrases + a Topics line. `docs/BACKLINKS.md` is intentionally NOT committed (owner's call).
- **Favicon / web manifest (`app/manifest.ts` + `public/icon-192.png` + `public/icon-512.png`).**
  The favicon was ALREADY served correctly (verified live: `/favicon.ico` 200, image/x-icon, 54KB
  multi-size; homepage head links a 512 PNG too). Google not showing it in results is Google's own
  favicon-refresh latency (days–weeks after crawl), NOT a bug. To maximise the chance and be
  spec-compliant, added a web app manifest (Next serves `/manifest.webmanifest`, auto-linked in the
  head) exposing 192 (a multiple of 48, which Google recommends) and 512 icons — Google reads the
  manifest as a favicon source. NON-CODE action for the owner: GSC → URL Inspection on the homepage →
  Request Indexing, then Google refetches the favicon on its schedule.
- **GSC "Discovered — currently not indexed" is NOT a site error.** sitemap.ts already lists all 8
  posts + pages and robots allows all; the pages return 200 and are internally linked. That status
  means Google found the URLs but has not prioritised crawling them yet (normal for a new, low-backlink
  domain). Levers: Request Indexing per URL in GSC, earn backlinks (see the uncommitted
  `docs/BACKLINKS.md`), and time. No code fix needed.

- **Language wheel looked misaligned (owner). Root cause found + fixed (`components/option-wheel.tsx`).**
  `rowH` (row spacing) was `fontSize * spacing * remPx` using the raw `fontSize` PROP (always 3rem),
  but glyphs render at `clamp(2rem, 6.5vw, 3rem)`. Below ~740px wide the rows kept a 3rem rhythm while
  the letters shrank, so the wheel spaced out and looked wrong (verified: at 500px the old ratio was
  **2.07× the glyph height**; now **1.32×**, matching desktop). Fix: `rowH` is derived from the
  effective clamped glyph size (`effFontPx = min(max(2rem, 6.5vw), fontSize)`), and a `vw` state +
  resize listener keep it correct on resize. Also added a subtle centre `scale` (1 → 0.84) for depth,
  and in `language-wheel.tsx` calmed the arc (tilt 7→4, curve 0.6, spacing 1.4→1.32) and the timing
  (smoothing 260→200, STEP_MS 2600→3000). NOTE: the wheel's rAF layout can't be screenshot-verified in
  the headless preview pane (it pauses when the pane isn't compositing); geometry was verified by
  replicating the layout math live at 1440px and 500px. `tsc` + `build` + design-detector all clean.
- **Footer "Requirements" was Windows-only** ("Windows 10 or 11, 64-bit / ~9 MB installer") →
  now cross-platform: Windows 10/11 (64-bit), macOS on Apple Silicon, Linux Debian/Ubuntu (X11), a
  microphone + any CPU, no account / offline after setup (`components/footer.tsx`).
- **Brand-name variants for search (`lib/site.ts` keywords + `app/layout.tsx` JSON-LD alternateName).**
  Added casing + spelling variants (aurascribe, Aurascribe, AURASCRIBE, "aura scribe", "Aura Scribe",
  AuraScribe app, AuraScribe Windows/Mac/Linux, etc.). NOTE for future self: meta-keyword casing is
  irrelevant to Google (case-insensitive) — the variant that actually matters is the SPELLING split
  ("Aura Scribe" two words vs "AuraScribe"), which is why those also went into the SoftwareApplication
  and WebSite `alternateName` (Google DOES use alternateName for entity disambiguation).
- **3 new blog posts** (`lib/blog.ts` + `app/blog/<slug>/page.tsx`), all cross-platform, em-dash-free,
  real crawlable JSX, auto-added to index + sitemap: `best-free-offline-dictation-cross-platform`,
  `aurascribe-mac-dictation` (Apple Silicon setup: Privacy&Security + Accessibility + Cmd hotkey),
  `aurascribe-linux-dictation` (.deb + X11 session). Blog is now 8 posts; build shows all 8 routes.

**2026-08-19 (round 2) — hero fit + non-congestive cross-platform downloads + SEO.**
- **Hero fits the first frame now, AND the composition was rebuilt for craft (owner: "you shrank the
  heading, it doesn't feel cohesive").** Root cause of the clipping was the `sticky` nav pill
  (`nav.tsx`) reserving 76px at the top while the hero still claimed a full `min-h-[100dvh]` below it,
  so nav + hero always exceeded one screen. Fix: hero is `min-h-[calc(100dvh-76px)]` (76px = pt-5 20px
  + pill h-14 56px) in `components/story.tsx`. The FIT is solved by layout, not by shrinking type: the
  H1 is a big editorial `clamp(44px, min(10vw, 10.8vh), 96px)` (full 96px / 6rem on desktop, only
  short viewports scale it down so it never clips), the sub-headline was cut to two tight sentences so
  it supports rather than competes, and `pb-[5vh]` biases the centred stack a little higher (owner
  asked to "bring it more top"). Verified live it fits at 1440×900, 1366×680, 1280×620 (floor ~620px),
  10px gap under the nav, console clean. Impeccable craft-floor honoured (display ≤6rem; committed
  editorial world preserved).
- **Three-platform download, refined (`components/download.tsx`) — owner picked "auto-detect primary +
  3 chips".** Big "Download for <detected OS>" primary (deep-links to the latest release's installer)
  + "View on GitHub", then a row of three legible pill chips (Windows/macOS/Linux), each a real per-OS
  installer link. Chips use the site's flat **2px** border system; the chip matching the visitor's OS
  is tinted `bg-accent/[0.08]` + accent border/text so it reads as one decision with the primary
  button, the other two are `text-muted` (NOT the old faint `text-faint` dotted line the owner flagged
  as too low-opacity). `DownloadButton` (compact nav/footer) is unchanged.
- **Downloads now resolve to GitHub's canonical `/releases/latest` (`components/download.tsx`).** Was
  `/releases?per_page=10` + `find(!draft)`, which would have grabbed a *prerelease* if one were
  published later and could disagree with the `releases/latest` fallback page. Now it fetches
  `/releases/latest` (excludes drafts AND prereleases) and maps `.exe`/`.dmg`/`.deb` to each OS, so the
  direct links and the fallback can never diverge and future releases are tracked automatically.
  **v2.0.0 is now PUBLISHED** (no longer a draft): verified live that all three buttons resolve to the
  real assets — `AuraScribe_2.0.0_x64-setup.exe` (9.1 MB), `_aarch64.dmg` (25.7 MB), `_amd64.deb`
  (7.2 MB) — and each URL serves the file (HTTP 206 on a range probe), so a click downloads the right
  installer per OS. The earlier "macOS/Linux light up once v2.0.0 is published" caveat is now RESOLVED.
- **Copy/SEO:** `lib/site.ts` keywords gained Mac/Linux + cross-platform + comparison phrasings; the
  "system requirements" FAQ is now OS-neutral and says ~9 MB; `app/terms/page.tsx` no longer calls the
  app "for Windows" (now Windows/macOS/Linux). Fixed the 8→9 MB drift in the FAQ and `layout.tsx`
  JSON-LD `fileSize` (HANDOFF had already standardized on 9 MB). `tsc` + `next build` clean.
- **NEW `docs/BACKLINKS.md`** — concrete free/high-quality backlink playbook (the audit said "no
  backlinks"): tiered list (GitHub README, Product Hunt, AlternativeTo, Show HN, awesome-lists,
  directories, dev.to/Medium, outreach), the "keep it safe" rules, and a tracker table. Owner action;
  cannot be coded.

**2026-08-19 — cross-platform launch (app shipped v2.0.0, Win/Mac/Linux).** The app is no longer
Windows-only, so the site was updated to match, accurately (macOS/Linux presented as real but new):
- **New `components/download.tsx`** — client component. On mount it hits the GitHub Releases API once
  (`site.ghRepo`) and maps each OS to its asset (`.exe`/`.dmg`/`.deb`), so buttons deep-link to the
  latest release's per-OS installer and never go stale. Falls back to the Releases page (JS-off, API
  rate-limit, or before a release is published). `DownloadButtons` (hero/invitation: primary
  "Download for <detected OS>" + explicit links for the other two) and `DownloadButton` (compact:
  nav, footer, page-shell).
- **`next.config.mjs` CSP** — added `https://api.github.com` to `connect-src` (the fetch above was
  blocked otherwise; caught on the live site). Verified live: fetch 200, Windows deep-links to its
  installer, macOS/Linux fall back until v2.0.0 is published.
- **`components/sections.tsx` How it works** — per-OS hotkey (Cmd+Shift+Space on Mac) + a "Setting up
  on each platform" note (Windows / macOS Privacy+Accessibility / Linux X11).
- **Copy/SEO** — `lib/site.ts` (tagline, descriptions, keywords, FAQ), `app/layout.tsx` (titles, OG,
  JSON-LD `operatingSystem`/`featureList`, version 2.0.0), about page, and blog CTAs all now say
  Windows + macOS + Linux (the Windows-specific blog article kept its focus). `tsc` + `next build` clean.
- **NOTE for next session:** the macOS/Linux direct downloads only light up once the **v2.0.0 GitHub
  release is published** (the API hides drafts). Until then those buttons fall back to the releases
  page and Windows resolves to the latest published tag.

**2026-08-18 — copy pass (owner audit).** Audited flow + copy for em-dashes and accuracy. Findings:
the visible copy was already essentially em-dash-free (the search hits were code comments); the one
real spot was the contact form's mailto subject, now a colon. Updated the installer size **8.6 MB →
9 MB** everywhere (hero, footer, FAQ, OG image, JSON-LD `fileSize`, Tauri credit, blog, SEO doc).
Added an honest **"Is there a macOS or Linux version?"** FAQ (Windows fully supported; macOS/Linux in
beta on GitHub releases, Accessibility grant on macOS, X11 on Linux). Hero headline **"Dictate
anywhere. Nothing leaves your machine."** kept (owner's choice — it's strong). `tsc` clean.

**2026-08-18 — favicon is NOT broken; it's Google latency.** Verified the live
`https://www.aurascribe.dev/favicon.ico` returns **200, image/x-icon, 16/32/48** — correct and
deployed since the 2026-08-14 push. So the blank globe in Google results is **Google's own
favicon-refresh schedule** (days–weeks after crawl), which no file change can speed up. Action, not
code: in **Google Search Console → URL Inspection → Request Indexing** for the homepage to trigger a
re-crawl (then Google refetches the favicon on its schedule). See `docs/SEO-LAUNCH-CHECKLIST.md`.
Belt-and-suspenders: regenerated `app/favicon.ico` from the 512px `app/icon.png` to **7 sizes
(16/32/48/64/96/128/256)** via Pillow, so it covers every browser/Google size heuristic and can't
regress to a too-small icon. **Uncommitted — needs a normal commit + Vercel deploy to go live; it is
an enhancement, the existing 3-size icon already satisfied Google's ≥48px rule.**

**DEPLOYED (2026-08-14):** the site is live at **https://www.aurascribe.dev** (owner bought the `.dev`
domain; apex 308-redirects to `www`, which is canonical — verified on the live site). So `site.url`
resolves to the www host (`NEXT_PUBLIC_SITE_URL` is set in Vercel). Earlier notes saying "not yet
deployed" are stale.

**CRITICAL (2026-08-14, later):** the favicon + brand-schema fixes below were made last session but
**never committed or pushed**, so they were NOT live — `https://www.aurascribe.dev/favicon.ico` still
returned **404** and the blank globe persisted. This session committed them (favicon.ico, layout
schema, HANDOFF, SEO checklist) and expanded `site.keywords` in `lib/site.ts` with natural-language
search phrasings (talk to type, voice to text Windows, best free dictation software, the brand + maker
name, etc.). NOTE: those keywords feed the `<meta keywords>` tag, which **Google ignores** — real
ranking work is the visible copy/headings/FAQ/blog + backlinks + time, not hidden keywords. tsc + build
verified clean; favicon.ico confirmed a valid 16/32/48 ICO emitting the `/favicon.ico` route. **Still
needs `git push` to deploy** (owner confirms the push).

**This session (2026-08-14) — favicon + SEO launch fixes:**
- **Root favicon added — `app/favicon.ico`** (multi-size 16/32/48, generated from `app/icon.png`).
  Before this, `https://www.aurascribe.dev/favicon.ico` returned **404** (app-router only had
  `icon.png`), which is why Google showed a blank globe. Build now emits the route and every page
  `<head>` includes `<link rel="icon" href="/favicon.ico">`. Verified in the build output; **needs a
  deploy to go live**, then Google refetches the favicon on its own schedule (days–weeks).
- **Brand disambiguation schema** — added `alternateName` (`Aura Scribe`, `aurascribe`, `Aura Scribe
  app`) to the `SoftwareApplication` and `WebSite` JSON-LD, plus `publisher` → the maker `Person`, so
  Google resolves spelling variants to this entity and stops conflating it with the unrelated
  "Aura AI Scribe" (medical) / "auraScribe.co" (meeting notes).
- **New: `docs/SEO-LAUNCH-CHECKLIST.md`** — the complete, current post-deploy sequence (GSC domain
  verify + sitemap + request-indexing, Bing import, favicon timing, brand-term/backlink strategy,
  validation). This supersedes the scattered SEO to-dos for launch actions.
- Verified: `npx tsc --noEmit` clean, `npm run build` clean (favicon route + head link confirmed in
  `.next`).

**This session's smaller changes:** (1) Content pages: the "Home" link moved OUT of the top nav into a
"Back to home" link right above each page title (`page-shell.tsx`); the top bar is now just the logo
(links home) + Download. Blog posts keep their Home/Blog breadcrumb instead, so the back-link only
renders when there is no breadcrumb. (2) Socials: owner's LinkedIn
(`https://www.linkedin.com/in/jeswin-thomas-jestin/`) and Behance
(`https://www.behance.net/jeswinjestin`) added to `site.author`, so they render on the About maker
buttons + footer icons, and are in the `Person` `sameAs` and `public/llms.txt`. Owner does NOT want a
larger front-end bio — keep the existing About maker section as-is, don't expand it.

---

## 0. Latest session (2026-08-12, round 2) — read this before the wheel or config

**Contact email is now `contact.aurascribe@gmail.com`** (dedicated inbox), set in `lib/site.ts`
`site.contactEmail`. It feeds the contact form mailto fallback, the Contact section, and both legal
pages.

**Language wheel is NO LONGER scroll-driven (`language-wheel.tsx`) — this replaced the pin entirely.**
After many iterations, the GSAP pin + scrub + Lenis approach never felt smooth for the owner and the
pin (which locked page scroll for ~5 screens) was the "obstruction" they reported. It was REMOVED and
replaced with a self-contained showcase:
- **Auto-cycle on a timer.** `setInterval` advances the language every `STEP_MS` (2600ms) while the
  section is on screen (an `IntersectionObserver` gates it). The detail card updates from the wheel's
  `onChange`. No pin, no scrub, no ScrollTrigger, no Lenis coupling — so the page scrolls normally and
  this section can never hijack or obstruct scroll. GSAP import is gone from this file.
- **Interactive.** Hovering/focusing the wheel pauses the cycle; clicking a language jumps to it
  (new `selectable` prop on `OptionWheel` allows a click to select even in `controlled` mode, which
  still disables wheel/drag so page scroll is never trapped).
- **Card is still FIXED height** (`min-h-[360px] sm:min-h-[400px]`) so autoplay never reflows the
  layout. Reduced motion → static on one language, no autoplay.
- **Verified (dev, with an rAF shim to beat the sandbox's frame throttling):** no `.pin-spacer`
  exists (pin gone; page height dropped 14201 → 11934px), and clicking a language switched the card
  (English → हिन्दी, sentence and all). Autoplay uses the same `setTarget` path on a timer, so it
  cycles in a real browser. If the owner ever wants it slower/faster, change `STEP_MS`.
- **Knock-on:** removing the pin means the wheel no longer adds scroll distance, so the old
  ThemeScroll/pin `refreshPriority` dance (§4) is moot — the cream chamber just measures its natural
  height now. Nothing else depends on the pin.

**Security headers added (`next.config.mjs`).** A CSP + HSTS + `X-Content-Type-Options: nosniff` +
`X-Frame-Options: DENY` + `Referrer-Policy` + `Permissions-Policy` (locks camera/mic/geo/topics) +
`poweredByHeader: false`. **CSP is environment-aware:** dev adds `'unsafe-eval'` (Next dev/HMR needs
it), prod is strict (no eval). **Verified in a real `next start` prod server:** headers present, app
runs, console clean, GSAP/Lenis work under the strict policy. `connect-src`/`form-action` allow
`docs.google.com` for the contact form; drop it if that integration is removed. These headers apply
on Vercel (this is a normal SSR/Static Next build, NOT `output: export`).

**SEO plumbing re-verified in prod:** robots.txt, sitemap.xml (4 routes), `/about` canonical+title,
404 on a bogus route, 200 on home — all correct. `.claude/launch.json` added (dev preview config).

**Accessibility / contrast fixes (WCAG AA), all verified live in a prod build:**
- Primary button text (white on the light dark-chamber indigo) was **2.97:1 (fail)**. Added a
  dedicated `--accent-btn: 227 88% 56%` (constant across chambers) for the FILLED button only, so the
  locked `--accent` token is untouched for text/borders. Button text is now **5.6:1**.
- Cream-chamber `--faint` was **3.24:1** on the small mono labels (fail) → darkened to `45 8% 42%`
  (**4.62:1**). Cream `--record` (error text / hero pill) was stuck at the dark red **3.11:1** (fail)
  → cream now sets its own `5 72% 45%` (**5.12:1**). NOTE: `--record` is now in BOTH theme objects in
  `theme-scroll.tsx` — it has to be, or a cream→dark move leaves it stale (see the comment there).
- Contact form inputs use `border-faint` (not the hairline `border-line`) so the field boundary is
  perceivable (WCAG 1.4.11). Focus still promotes to the accent ring.
- Mobile (375) and tablet (768): no horizontal scroll, verified.

**Blog shipped** (`/blog` + 5 SEO posts) — see §8 task 7 for the structure and how to add a post.

**Git:** the folder is now a LOCAL git repo (`master`), remote `origin` set to the owner's
`AuraScribe-Landing-Page` repo, `.gitattributes` added (LF normalise), dead `hero.tsx` /
`sequence-canvas.tsx` removed. **Committed locally, NOT pushed** (owner's choice). To publish: confirm
with owner, then `git push -u origin master`.

**Still a static marketing site — most of the big security/perf/SEO checklists the owner pasted are
N/A** (no auth, no DB, no user-generated HTML, no file upload, no payments, no cookies, no
localStorage, no third-party scripts). See §10 for the applicability triage and what genuinely
remains.

**Pre-existing note (not fixed, owner's call):** `layout.tsx` `twitter:title` / `openGraph.title` use
an em-dash ("AuraScribe — offline voice dictation..."). It's the established brand title in metadata
(not body copy); left as-is to avoid changing the global title tag. Swap to a colon if the em-dash
rule should extend to metadata.

---

## 1. What this is

The marketing landing page for **AuraScribe** — a free, open-source, 100% offline voice-dictation app
for Windows (the app lives at `../AuraScribe`, shipped v1.0.0). This folder is ONLY the website.
Next.js 14 (app router) + Tailwind v3 + GSAP + Lenis + Motion. Deploys to Vercel. **Not yet deployed.**

## 2. Design direction (LOCKED — this is the current vibe)

An **editorial "cream broadsheet / dark velvet chamber" system**, modelled on **Wispr Flow's quality**
(the owner's reference) but kept **distinct from it**:

- **Two typefaces:** `EB Garamond` (display serif, weight 400, at big sizes — the voice) and
  `Figtree` (all UI/body). Loaded via `next/font` in `app/layout.tsx`.
- **Alternating chambers:** the whole page is a warm near-black dark tone OR a warm cream tone, and it
  **transitions between them on scroll** (the "attention through colour" device). Flat, 2px borders,
  28px card radius, **no shadows, no gradients** (border-driven depth).
- **One accent: indigo `227 100% 72%` (dark) / `227 96% 58%` (cream).** Deliberately NOT Wispr's
  lavender/teal — the owner wants "our blue" and to not be a Wispr look-alike (visitors must not be
  confused about which product this is).
- **Motion:** Lenis smooth scroll; GSAP for parallax + the pinned language wheel; Motion for in-view
  reveals. `prefers-reduced-motion` honored everywhere. Calm and premium, not flashy.

**Owner rules learned the hard way (do NOT violate):**
- Colour changes **twice on the whole page**, in LONG constant chambers — never section-by-section,
  and only once a chamber actually fills the screen (not "before we get there").
- Credits/logos are **not** put in bordered boxes (looks awkward) — use a plain colophon list.
- The language wheel: **one scroll = one language**, tightly synced, must feel smooth on all devices.
- No fake product screenshots, no AI-slop copy. Copy must be specific and about what the app does.
- Zero em-dashes in visible copy. Phosphor icons only.

## 3. The page, top to bottom (file map)

Order rendered in `app/page.tsx` → `components/story.tsx`:

| # | Section | Component | Chamber |
|---|---|---|---|
| 1 | Hero: "Dictate anywhere. Nothing leaves your machine." (types in) over the interactive dot-field | `story.tsx` `SceneHero` + `dot-field.tsx` | dark |
| 2 | The turn: "What if it never left your machine?" over drifting aura rings | `parallax-turn.tsx` + `story.tsx` `ChamberRings` | cream |
| 3 | Languages: the scroll-linked wheel + "65+ languages" coverage band | `language-wheel.tsx` + `option-wheel.tsx` | cream |
| 4 | Invitation: "It runs on your machine. Full stop." + Download | `story.tsx` `SceneInvitation` | dark (arrives here) |
| 5 | Built on open work: borderless credits colophon | `sections.tsx` `PoweredBy` | dark |
| 6 | How it works: sticky heading + 3 hairline steps | `sections.tsx` `HowItWorks` | dark |
| 7 | Features: 6-cell bento (privacy chamber, 0.1x, any app, cleanup, dictionary, history heatmap) | `sections.tsx` `Features` | dark |
| 8 | Comparison table (no scrollbar; drops columns on narrow screens) | `comparison.tsx` | dark |
| 9 | FAQ (6 Q&As, mirrored to FAQPage schema) | `faq.tsx` | dark |
| 10 | Contact form (validated; Google Form or mailto) | `contact.tsx` | dark |
| 11 | Footer: oversized wordmark + 4 link columns | `footer.tsx` | dark |

Also: `nav.tsx` (floating pill), `smooth-scroll.tsx` (Lenis + GSAP ticker), `theme-scroll.tsx` (the
chamber colour engine), `primitives.tsx` (`Reveal`, `SignalMeter`). **Orphaned/unused** (safe to
delete): `hero.tsx`, `sequence-canvas.tsx` (leftovers from the abandoned frame-sequence plan).

**Standalone content pages** (separate routes, NOT part of the scrolling homepage):
`app/about/page.tsx`, `app/terms/page.tsx`, `app/privacy/page.tsx`, all wrapped in the shared
`components/page-shell.tsx`. These are static, always DARK, and deliberately do NOT use Lenis/GSAP
or in-page anchors. See §4 for how they stay dark and why their home links are plain `<a href>`.
Long-form typography is the `.prose` block in `globals.css`. About/Privacy/Terms are cross-linked
from the homepage `footer.tsx` and from each shell, and are in `sitemap.ts`.

`lib/site.ts` holds `site` (urls, keywords, contactEmail, contactForm), `faqs`, `engines`,
`comparison`. `app/` also has `globals.css`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`,
`icon.png` + `apple-icon.png` (the real 512×512 app icon). `public/` has `llms.txt` + `icon.png`.

## 4. How the tricky bits work (so you don't re-break them)

- **Chamber colour (`theme-scroll.tsx`):** top-level wrappers carry `data-chamber="dark|cream"`;
  ThemeScroll writes the theme's HSL tokens onto `:root` when a chamber owns the viewport centre
  (`start: 'top 40%'`, or a per-chamber `data-start`). `globals.css` transitions the tokens over
  `var(--theme-transition, 1.1s)` (set to 0s under reduced motion). Every component reads these tokens,
  so they all re-tint together. **Grouping matters:** hero=dark; one cream wrapper holds turn+wheel;
  invitation is its own `data-chamber="dark" data-start="top 15%"`; the rest is one dark wrapper.
- **Refresh order:** there are NO pins in the story any more (the wheel pin was removed — see §0), so
  the old ThemeScroll/pin `refreshPriority` coordination no longer matters. ThemeScroll still uses
  `refreshPriority: -1`; if you ever ADD a pin inside a chamber, give it `refreshPriority: 1` (+ a
  post-mount `ScrollTrigger.refresh()`) so chamber heights measure after the pin, or the colour flips
  early.
- **Language wheel (`language-wheel.tsx` + `option-wheel.tsx`):** NOT scroll-driven (see §0). It
  auto-cycles on a `setInterval` (2600ms) gated by an `IntersectionObserver`, pauses on hover/focus,
  and supports click-to-jump via `OptionWheel`'s `selectable` prop. `items` is a module const,
  `onChange` is a `useCallback`, and OptionWheel is `memo`'d, so card updates never re-init the wheel.
  OptionWheel is still the same rAF ease loop; only the DRIVER changed (timer/click, not scroll).
- **Rings (`ChamberRings` in `story.tsx`):** a sticky, zero-height layer that is a DIRECT child of the
  cream chamber, so one ring system spans turn→wheel with nothing clipped by a section edge (that
  clip was the "divider" bug). Sized `min(74vh,86vw)` so the whole circle shows before it drifts aside.
- **Dot-field (`dot-field.tsx`):** ported React Bits canvas, recoloured indigo, `ResizeObserver`-driven,
  static under reduced-motion/small screens.
- **Content pages stay dark (`page-shell.tsx`):** `ThemeScroll` lives in the layout and writes HSL
  tokens onto `:root` as homepage chambers scroll by; those inline overrides are NOT reverted on
  client navigation. So the About/Terms/Privacy pages each wrap their content in
  `data-chamber="dark"` (on a fresh load ThemeScroll finds that one chamber and settles on DARK),
  and every home/logo link in the shell is a plain `<a href="/">` (a FULL navigation), which
  re-mounts the layout and re-initialises the colour engine cleanly. **Do not switch those to
  `next/link`** or a stale cream tint can bleed onto a content page. These pages intentionally have
  no Lenis/GSAP and no in-page `#anchor` links (those belong to the homepage only).
- **Dev-cache gotcha:** if the dev server ever serves a stale/broken page (phantom syntax error,
  unstyled) while `tsc`/`build` are clean, it is HMR cache corruption — `rm -rf .next` and restart.

## 5. SEO state (done)

`app/layout.tsx` metadata (canonical, OpenGraph, Twitter, robots, keyword template) + JSON-LD `@graph`
(SoftwareApplication + WebSite + FAQPage). `sitemap.ts` (root only), `robots.ts`, `opengraph-image.tsx`
(real 1200×630 PNG via `next/og`), real favicon/apple-icon, `public/llms.txt`, FAQ section. Keyword
set + FAQ copy in `lib/site.ts`. Single `<h1>`, alt-text clean (no `<img>` yet).

## 6. Run / build / verify

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static, must be clean before deploy
npx tsc --noEmit # must be clean
```
Verify in-browser (console clean, chamber colour holds, wheel one-per-scroll) before calling anything
done. Current build: clean, ~192 KB first load, zero console errors.

## 7. Known issues / skipped review findings (from `/code-review`, low severity)

- `dot-field.tsx`: reduced-motion / <768px is decided ONCE at mount; resizing across that boundary
  doesn't switch modes until reload.
- `option-wheel.tsx`: `rowH` uses the `fontSize` prop while glyphs render at `clamp(2rem,6.5vw,…)`, so
  on narrow phones the wheel rows are spaced a bit loose relative to the (smaller) glyphs.
Both are cosmetic/edge and were intentionally deferred.

## 8. PENDING TASKS — start here in the new chat (priority order)

**A. Owner-provided content / accounts (blocking real launch):**
1. **Domain — now auto-handled for the Vercel default link.** `site.url` (`lib/site.ts`) resolves
   dynamically: `NEXT_PUBLIC_SITE_URL` override → else Vercel's `VERCEL_PROJECT_PRODUCTION_URL`
   (the stable `*.vercel.app` domain, set automatically) → else a dev fallback. Verified: with the
   Vercel env var set, canonical + sitemap + OG all use the `.vercel.app` URL. **No domain purchase
   needed** to launch correctly. If a real domain is bought later, set `NEXT_PUBLIC_SITE_URL` to it in
   Vercel env and redeploy. **`sitemap.xml` submission to Search Console uses whatever that resolves
   to.** (Owner decided: no `.com` purchase for now, ship on the Vercel link.)
   - **AUTHOR/BRANDING (done this session):** `site.author` holds the maker identity. A schema.org
     `Person` (in `layout.tsx`, `@id #jeswin`, `sameAs` the profiles) is linked as the app's author, so
     searches for "Jeswin Thomas Jestin" can resolve to a real entity. The About page has a
     name-forward maker bio (verifiable facts only) + GitHub/Email buttons; the footer byline links to
     About with GitHub/LinkedIn icons. **LinkedIn is intentionally empty (`site.author.linkedin = ''`)
     until the owner provides the URL** — every LinkedIn link is conditionally rendered, so nothing
     false ships. Owner to also verify/expand the bio with any career details they want included.
2. **Google Form** for the contact form → create it, paste the `/formResponse` URL + the three
   `entry.xxxx` field IDs into `site.contactForm` in `lib/site.ts` (else it falls back to mailto).
3. **Real product screenshot** of the running Windows app → drop in `public/`, place in the hero or a
   Features cell (no fake screenshots allowed).
4. **Google Search Console** verification + submit `/sitemap.xml`.

**B. Pages still to build:**
5. ✅ **DONE — About page** (`app/about/page.tsx`): drafted from the app's project history (the
   why, the four credited engines, "the model is a commodity, the product layer is the moat",
   free/MIT/gives-back, honest Windows-only). **Owner should read + tweak the wording.**
6. ✅ **DONE — Terms of Service + Privacy** (`app/terms/page.tsx`, `app/privacy/page.tsx`). Terms:
   MIT-based, as-is/no-warranty, third-party model licences, no accounts. Privacy: "we collect
   nothing", the one model-download request, no telemetry, the site itself is tracker-free, the
   contact-form note. **Two owner follow-ups:** (a) the Terms has NO governing-law clause on purpose
   (a code comment marks where to add your jurisdiction if you want one); (b) both dates read
   "12 August 2026" — bump if you materially change them.
7. ✅ **DONE — Blog** (`/blog` index + 5 posts). Content model in `lib/blog.ts` (single source of
   truth for meta: slug/title/description/date/readingMinutes/tags). Post bodies are real crawlable
   JSX in `app/blog/<slug>/page.tsx`, wrapped by `components/blog-post.tsx` (breadcrumb + date/reading
   meta + BlogPosting & BreadcrumbList JSON-LD, `<`-escaped). Index at `app/blog/page.tsx`. No MDX/new
   deps. Posts: offline-dictation-windows, free-wispr-flow-alternative, malayalam-speech-to-text-
   offline, dictate-into-any-app-hotkey, local-vs-cloud-dictation-privacy. All in the sitemap; linked
   from nav, footer, and the shell footer; cross-linked to each other. Bodies are em-dash-free.
   **To add a post:** append to `posts` in `lib/blog.ts`, create `app/blog/<slug>/page.tsx` (copy an
   existing one), done (sitemap + index pick it up automatically).

**C. Off-page SEO (owner actions, cannot be coded):**
8. Backlinks: **see `docs/BACKLINKS.md`** for the full tiered playbook + tracker (Product Hunt,
   alternativeto.net as a Wispr Flow/Dragon alternative, awesome-lists, Show HN, directories, dev.to,
   outreach, and the app README linking here). Build a dozen good links over weeks, not all at once.

**D. Deploy:**
9. **GitHub repo exists:** `https://github.com/JeswinJestin/AuraScribe-Landing-Page.git` (owner
   created it). This folder is **still NOT a git repo locally** — `git init`, verify `.gitignore`
   (already good: ignores node_modules/.next/out/.env*.local/.vercel), confirm no secrets, then
   `git remote add origin <url>`, commit, push. Pushing is a PUBLISH action — confirm with the owner
   before the first push. Then import at vercel.com/new and add the domain.

**E. Optional polish (only if owner asks):** fix the two skipped review findings (§7); add real imagery
to Features cells; a cookie-consent banner IF any tracker is ever added (none today, so not needed).

**Explicitly SKIPPED per owner (do not add):** phone number, phone error messages, opening hours,
payment methods (product is free), before/after gallery, separate page per service.

## 9. Direction history (context, not a to-do)

The site went through: a v1 sectioned page → an abandoned "awwwards frame-sequence storytelling" plan
(Lenis/GSAP pins, a scroll-scrubbed `<canvas>` centrepiece, React Bits) → the owner supplied the
**Wispr Flow** reference and the current **editorial cream/dark chamber** system was built and is what
ships. React Bits' DotField and OptionWheel were kept (ported to TS, recoloured); the frame-sequence,
the 6-beat trap/act scenes, and the auto-animating "Listening" meter were all removed at the owner's
request. If you find `sequence-canvas.tsx`/`hero.tsx`, they are dead leftovers.

## 10. Launch-checklist triage (owner pasted a large generic security/perf/SEO checklist)

This is a **static Next.js marketing site on Vercel**: no auth, no database, no server API routes, no
user accounts, no file upload, no payments, no cookies, no localStorage, no third-party scripts, and
the only user input is the contact form (client-side validated; posts to a Google Form or mailto).
So most of the pasted checklist is **Not Applicable**. Triage:

**Done this session:** security headers (CSP/HSTS/nosniff/frame-DENY/referrer/permissions),
`poweredByHeader:false`, no secrets in the tree, `.gitignore` covers `.env*`, HTTPS+HSTS (Vercel),
robots/sitemap/canonicals/OG/Twitter/JSON-LD, 404 handling, mobile no-horizontal-scroll, the wheel
fix, `dangerouslySetInnerHTML` reviewed (only the static JSON-LD object — safe, no user data).

**Genuinely applicable + still TODO (in priority order):**
1. **`npm audit` (run 2026-08-12): 2 high, both in Next 14.2.35's bundled deps, both LOW real risk
   here.** (a) Next "unauthenticated disclosure of internal Server Function endpoints" — this site
   has NO server actions/functions, so not exploitable. (b) `postcss <=8.5.22` XSS/path-traversal —
   postcss is a **build-time** dep (Tailwind), never shipped to the browser; a static export can't be
   attacked through it at runtime. The only listed fix is `next@16.3.0` (a MAJOR jump from 14 — not
   backported to 14.x). **Decision: do NOT force the Next 16 upgrade blindly** (it risks the
   GSAP/Lenis/Motion/pin setup and the whole build). Treat "upgrade to Next 15/16" as its own
   scoped task with a full re-verify. Keep the lockfile committed; enable Dependabot on the repo.
2. **Real product screenshot** in `public/` (hero or a Features cell) — still the biggest visual gap,
   and images then need width/height + `next/image` or compression + `loading="lazy"` (perf checklist).
3. **Lighthouse / Core Web Vitals** pass once deployed (the OG image + fonts are already optimised via
   `next/font` self-hosting; first load ~196 KB is fine).
4. **Accessibility sweep — MOSTLY DONE (2026-08-13).** All text/background pairs now pass WCAG AA in
   both chambers (button, cream faint, cream record fixed; see §0). focus-visible themed, decorative
   layers `aria-hidden`, single h1 per page, breadcrumbs on blog. **Remaining, minor:** the homepage
   nav's section links are `hidden md:flex`, so on mobile there is no in-page section menu (only logo
   + GitHub + Download show). For a one-page site that's defensible, but a small mobile menu (or
   moving Blog into the always-visible row) would be a nice-to-have. The controlled language wheel is
   `tabIndex -1` (scroll-driven, not keyboard-operable) but its content is fully stated in text and
   the coverage band, so no information is keyboard-inaccessible.
5. **Domain + Search Console + Bing Webmaster** (owner accounts) once `site.url` is the real domain.
6. **Contact form:** wire the real Google Form (`site.contactForm`) or it stays mailto. If a Google
   Form is used, keep the `connect-src https://docs.google.com` in the CSP.

**Explicitly N/A for this site (do not spend time on):** SQL/NoSQL injection, CSRF, file-upload
security, auth/session/token handling, rate limiting, payment/webhook security, cookie consent (no
cookies/trackers), server logging/monitoring, production-vs-dev DB separation. Those categories are
about server/app backends this static site does not have. (There is NO separate main-app security
review in scope — the owner confirmed they are not commissioning one here.)
