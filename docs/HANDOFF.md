# AuraScribe Landing — Handoff & Continuity

> **Single source of truth for the landing page. New chat: read this top to bottom before touching
> anything.** It is current as of the date below. The older "awwwards / frame-sequence storytelling"
> plan is ABANDONED (see "Direction history"); do not resurrect it.

**Last updated:** 2026-08-12 (wheel scroll fix + security headers + contact email) · **Owner:** Jeswin Thomas Jestin

---

## 0. Latest session (2026-08-12, round 2) — read this before the wheel or config

**Contact email is now `contact.aurascribe@gmail.com`** (dedicated inbox), set in `lib/site.ts`
`site.contactEmail`. It feeds the contact form mailto fallback, the Contact section, and both legal
pages.

**Language-wheel scroll bug FIXED (`language-wheel.tsx`).** The owner's screen recording showed the
pinned scene drifting up/down and the coverage band bleeding in mid-wheel, plus the panel trailing
the scroll. Root causes and fixes:
- **Vertical drift = the card changed height per language** (pill vs paragraph note, longer sample),
  so the `min-h-[100dvh] justify-center` section re-centred its block every time the language
  changed. Fix: the detail card is now a FIXED height (`min-h-[360px] sm:min-h-[400px] flex-col`),
  so the scene is rock-steady during the pin. **Do not remove that fixed height.**
- **Panel lag = double smoothing.** Was `scrub: 0.6` on top of Lenis's own smoothing. Now
  `scrub: true` maps the (already Lenis-smoothed) scroll directly to the wheel; the wheel's own 45ms
  ease is the only extra smoothing. Removed `anticipatePin` (it jumps the scroll and fights Lenis).
  Added `invalidateOnRefresh: true` so the pin distance can't go stale.
- **Mobile:** on `(pointer: coarse)` or width < 768 the wheel does NOT pin (pinning a 100dvh section
  fights native touch scroll and jumps when the mobile toolbar shows/hides); it just steps as the
  section scrolls past. Verified at 375px: no pin-spacer, no horizontal scroll.
- **Verified:** desktop prod build creates the pin (`.pin-spacer` 4423px, `#reach` inside it), card
  locked at 400px, console clean under the strict prod CSP. **NOT verifiable here:** the live motion
  *feel* (stepping cadence during a real drag/scroll) — this sandbox browser can't drive Lenis
  (no compositing, synthetic wheel events ignored). Owner should confirm the feel in a real browser.

**Security headers added (`next.config.mjs`).** A CSP + HSTS + `X-Content-Type-Options: nosniff` +
`X-Frame-Options: DENY` + `Referrer-Policy` + `Permissions-Policy` (locks camera/mic/geo/topics) +
`poweredByHeader: false`. **CSP is environment-aware:** dev adds `'unsafe-eval'` (Next dev/HMR needs
it), prod is strict (no eval). **Verified in a real `next start` prod server:** headers present, app
runs, console clean, GSAP/Lenis work under the strict policy. `connect-src`/`form-action` allow
`docs.google.com` for the contact form; drop it if that integration is removed. These headers apply
on Vercel (this is a normal SSR/Static Next build, NOT `output: export`).

**SEO plumbing re-verified in prod:** robots.txt, sitemap.xml (4 routes), `/about` canonical+title,
404 on a bogus route, 200 on home — all correct. `.claude/launch.json` added (dev preview config).

**Still a static marketing site — most of the big security/perf/SEO checklists the owner pasted are
N/A** (no auth, no DB, no user-generated HTML, no file upload, no payments, no cookies, no
localStorage, no third-party scripts). See §10 for the applicability triage and what genuinely
remains.

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
- **Refresh order:** the wheel pins and adds scroll distance. ThemeScroll uses `refreshPriority: -1`
  and the pin uses `refreshPriority: 1` (+ a post-mount `ScrollTrigger.refresh()`) so chamber heights
  are measured AFTER pins exist. **Any new pin inside a chamber needs this or the colour flips early.**
- **Language wheel (`language-wheel.tsx` + `option-wheel.tsx`):** pinned, `end: +=(n-1)*100%` (~1
  viewport per language), `scrub: 0.6`, `onUpdate` quantises to a whole index. **No ScrollTrigger
  `snap`** (it called `window.scrollTo` and fought Lenis → the multi-jumps). `items` is a module
  const and `onChange` is `useCallback`, and OptionWheel is `memo`'d, so panel updates never
  re-init the wheel. Selection is driven from the VISUAL centre inside the rAF loop.
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
1. **Real domain** → set `site.url` in `lib/site.ts` (sitemap, robots, canonical, OG all derive from it).
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
7. **5 blog posts** (SEO long-tail: "offline dictation on Windows", "Wispr Flow free alternative",
   "on-device Malayalam speech to text", etc.). Needs a simple `/blog` route + MDX or content files.
   (The `.prose` typography + `page-shell.tsx` from this round are ready to reuse for posts.)

**C. Off-page SEO (owner actions, cannot be coded):**
8. Backlinks: Product Hunt launch, alternativeto.net (as a Wispr Flow/Dragon alternative), awesome-lists
   (awesome-privacy, awesome-windows), a "Show HN", relevant subreddits, the app README linking here.

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
4. **Accessibility sweep:** focus-visible is themed (globals.css), but re-check colour contrast in the
   CREAM chamber (muted text on cream), the wheel's `aria` on mobile, and keyboard reachability of the
   contact form + nav. Decorative aura rings/dot-field are `aria-hidden` (good).
5. **Domain + Search Console + Bing Webmaster** (owner accounts) once `site.url` is the real domain.
6. **Contact form:** wire the real Google Form (`site.contactForm`) or it stays mailto. If a Google
   Form is used, keep the `connect-src https://docs.google.com` in the CSP.

**Explicitly N/A for this site (do not spend time on):** SQL/NoSQL injection, CSRF, file-upload
security, auth/session/token handling, rate limiting, payment/webhook security, cookie consent (no
cookies/trackers), server logging/monitoring, production-vs-dev DB separation. These belong to the
**main AuraScribe app**, which the owner will hand over as a separate document for its own review.
