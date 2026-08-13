# AuraScribe — landing page

Marketing/landing site for [AuraScribe](https://github.com/JeswinJestin/AuraScribe), the free,
open-source, offline voice dictation app for Windows. Built with **Next.js 14 + Tailwind + Motion**,
designed to match the app's warm-glass brand (cream + indigo) and to rank for searches like
*"free open-source Wispr Flow alternative"* and *"offline dictation for Windows"*.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

The simplest path:

1. Push this folder to its own GitHub repo (e.g. `aurascribe-landing`).
2. Go to https://vercel.com/new, import that repo. Vercel auto-detects Next.js — no config needed.
3. Deploy. You get a `*.vercel.app` URL immediately.
4. Add your custom domain in **Project → Settings → Domains** once you've bought one.

Or with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## SEO notes

- Title, meta description, Open Graph, Twitter card, and a `SoftwareApplication` JSON-LD block
  are in `app/layout.tsx`.
- Target keywords live in `lib/site.ts` (`site.keywords`) and are woven through the copy and the
  comparison section.
- After deploying: set the real domain in `lib/site.ts` (`site.url`), submit the site to Google
  Search Console, and add a social-preview image (`app/opengraph-image.png`, 1200×630) so shared
  links render a card.

## Editing content

- Links, engines, and the comparison table: `lib/site.ts`
- Sections: `components/` (hero, sections, comparison, footer)
- Brand tokens (colors, both light/dark): `app/globals.css`

Free to change. Not affiliated with Wispr Flow, Superwhisper, Dragon, or Microsoft; comparison
reflects each tool's default configuration at time of writing.
