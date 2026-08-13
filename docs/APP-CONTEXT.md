# AuraScribe — app context (for logo / icon / favicon work)

A factual brief you can paste into an image-generation tool (or hand to a designer) when creating the
logo, app icon, and favicon. It describes what the product is and the identity it should fit.

## What AuraScribe is

AuraScribe is a **free, open-source, 100% offline voice-dictation app for Windows**. You press a
global hotkey, speak, and clean, punctuated text is typed straight into whatever application has your
cursor — a browser, an editor, a terminal, a chat box, any form field.

The defining idea: **your voice never leaves your machine.** Every word is transcribed on your own PC.
The only network request the app ever makes is a one-time download of a speech model; after that it
works fully offline. No account, no subscription, no telemetry, no cloud.

## What it does

- **Hotkey → speak → text.** Push-to-talk dictation into any Windows app.
- **On-device speech recognition** running in real time on an ordinary CPU (no GPU needed).
- **Local cleanup**: automatic punctuation, capitalisation, and filler-word removal, so the output
  reads like writing, not a raw transcript.
- **Personal dictionary + snippets**: teach it your names/terms, and expand short spoken triggers.
- **Many languages, all local**: English, 25 European languages, ~40 Asian languages, and Malayalam
  and Kannada (which most tools skip), via four open speech engines.

## Who it is for

People who dictate things they would not want on someone else's server: private notes, medical or
legal writing, source code, personal messages, or anyone who simply prefers local, free, open tools.
It is positioned as the private, local, free alternative to Wispr Flow, Superwhisper, and Dragon.

## Personality / brand

- **Calm, precise, trustworthy, technical but human.** Not loud or playful.
- **Privacy-first and honest** — it never claims more than it does.
- **Editorial and premium**, not "consumer app cute". Think a quiet, well-made tool.

## Current visual identity (keep a new logo consistent with this)

- **Accent colour: indigo** — roughly `hsl(227, 100%, 72%)` on dark, `hsl(227, 96%, 58%)` on light.
  This "our blue" is deliberate and should stay the primary brand colour. A single warm-red accent
  (`hsl(5, 74%, 62%)`) is used sparingly to signal the live "recording" state.
- **Existing mark:** a tiny **equaliser / signal-meter** motif — a few vertical bars of different
  heights (like a voice waveform or level meter), with one short bar in the record-red. It reads as
  "sound / voice / listening". A logo could refine this bars-as-voice idea.
- **Typography of the wordmark:** the site pairs a classical serif (EB Garamond) for display with a
  clean geometric sans (Figtree). "AuraScribe" is usually set in a crisp, confident weight.
- **Surfaces:** flat, 2px hairline borders, generous rounding (~28px), **no drop shadows, no
  gradients**. Depth comes from borders and space, not effects. Backgrounds are a warm near-black or a
  warm cream, never pure black/white.

## Direction cues for the icon/favicon

- The **app icon** and **favicon** should work as a small square. The signal-bars/voice-wave motif in
  indigo (optionally one bar in the record-red) reads clearly even at 16px.
- Keep it **simple, geometric, and legible at tiny sizes** — a favicon has to survive 16×16.
- Avoid literal microphones if possible (overused); the abstract "voice level" bars are more
  distinctive and already tie to the product. A subtle nod to "on-device / a chip / a keystroke"
  could also work, but simplicity wins.
- Deliverables that map to the codebase: a 512×512 master (`icon.png` / `apple-icon.png`), and it
  should look right shrunk to a browser-tab favicon. The social share image (`opengraph-image`) can
  reuse the wordmark + mark on a warm-dark background.

## One-line summary

AuraScribe: free, open-source, fully offline voice dictation for Windows — press a hotkey, speak, and
clean text appears in any app, with your voice never leaving your machine.
