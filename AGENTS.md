# AGENTS.md — aurascribe-landing

**Read `docs/HANDOFF.md` first, top to bottom.** It is the current source of truth: the design
direction, the full file map, how the tricky scroll/colour/wheel bits work, and the prioritised
pending-task list. Continue from there — do not restart, and do not resurrect the abandoned
"awwwards frame-sequence" plan (it is dead; see HANDOFF §9).

## What this is

The marketing website for **AuraScribe**, the free/open-source/offline Windows dictation app that
lives at `../AuraScribe` (Rust + Tauri, shipped v1.0.0). This folder is ONLY the site.

## The design direction (LOCKED)

An **editorial "cream broadsheet / dark velvet chamber"** system, at the quality of **Wispr Flow**
(the owner's reference) but kept visually **distinct** from it:

- **Fonts:** `EB Garamond` display serif (weight 400, big) + `Figtree` for all UI/body.
- **Chambers:** the whole page is warm-dark OR warm-cream and **transitions on scroll**, in a few
  LONG constant chambers (colour changes ~twice total, never section-by-section, and only once a
  chamber fills the screen). Flat, 2px borders, 28px radii, **no shadows, no gradients**.
- **One accent: indigo** (our blue) — deliberately NOT Wispr's lavender/teal. Visitors must not
  mistake this for Wispr Flow.
- **Motion:** Lenis smooth scroll + GSAP (parallax, pinned language wheel) + Motion (in-view reveals).
  `prefers-reduced-motion` respected everywhere. Calm and premium, not flashy.

## Hard rules (violated in past sessions — do not repeat)

- Zero em-dashes in visible copy. Phosphor icons only (never lucide).
- Copy is specific and about what the app actually does — no AI-slop, no filler adjectives.
- Never build fake product screenshots out of divs.
- Credits/logos are a plain colophon list, never bordered boxes.
- The language wheel must be **one-scroll-one-language**, smooth on all devices; no ScrollTrigger
  `snap` (it fights Lenis).

## Verify by running, not by reading

Before calling anything done: `npx tsc --noEmit` clean, `npm run build` clean, and check it live
(console clean, chamber colour holds across the cream sections, wheel steps one language per scroll).
If the dev server serves a stale/broken page while build+tsc are clean, it is HMR cache corruption —
`rm -rf .next` and restart the dev server.

## Update the docs after every task

At the end of any task that changes the project, update `docs/HANDOFF.md` (bump its date, adjust the
pending-task list). Chat context is discarded; that file is the memory the next session starts from.

## Stack / deploy

Next.js 14 (app router) · Tailwind v3 · GSAP · Lenis · Motion · `@phosphor-icons/react`. Deploys to
Vercel. This folder is **not a git repo yet** — `git init` before the first deploy.
