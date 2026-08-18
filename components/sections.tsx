import {
  ShieldCheck,
  Lightning,
  AppWindow,
  Broom,
  ClockCounterClockwise,
  Textbox,
} from '@phosphor-icons/react/dist/ssr'
import { Reveal } from './primitives'

/* ---------- Credits marquee: the open work AuraScribe stands on ----------
   Framed as credit, not as a logo wall. These are the models and runtimes doing the actual
   transcription; naming them is both honest and good licence hygiene. */
const CREDITS = [
  { name: 'Moonshine', by: 'Useful Sensors', role: 'English speech recognition' },
  { name: 'Parakeet TDT', by: 'NVIDIA', role: '25 European languages' },
  { name: 'Dolphin', by: 'DataoceanAI and Tsinghua', role: 'About 40 Asian languages' },
  { name: 'IndicConformer', by: 'AI4Bharat', role: 'Malayalam and Kannada' },
  { name: 'sherpa-onnx', by: 'k2-fsa', role: 'On-device inference runtime' },
  { name: 'ONNX Runtime', by: 'Microsoft', role: 'Model execution' },
  { name: 'Tauri', by: 'Tauri contributors', role: 'The 9 MB application shell' },
]

export function PoweredBy() {
  return (
    <section className="container-x py-20 md:py-28">
      <p className="eyebrow">Built on open work</p>
      <h2 className="display mt-4 max-w-[24ch] text-[30px] leading-[1.04] md:text-[44px]">
        AuraScribe does not train its own models. It credits the people who did.
      </h2>

      {/* A fixed colophon, not cards. Rows are separated by a single hairline each, so the list
          reads cleanly without every item being trapped in its own bordered box. */}
      <dl className="mt-12 max-w-[880px]">
        {CREDITS.map((c) => (
          <div
            key={c.name}
            className="grid grid-cols-1 gap-1 border-t border-line/70 py-5 sm:grid-cols-[220px_1fr] sm:items-baseline sm:gap-8"
          >
            <dt className="display text-[22px] leading-none">{c.name}</dt>
            <dd className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <span className="text-[15px] leading-snug text-muted">{c.role}</span>
              <span className="font-mono text-[12px] text-faint">by {c.by}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ---------- How it works ----------
   Editorial, not three equal cards: a sticky heading on the left and the three moments stacked
   on the right, separated by hairlines, each led by a large serif numeral. */
const flow = [
  {
    n: '01',
    verb: 'Press',
    body: 'Hit Ctrl + Shift + Space (Cmd + Shift + Space on a Mac) in whatever window you are already in. AuraScribe is listening straight away, even with its own window closed, so nothing interrupts what you were doing.',
    aside: 'Rebindable to any combination',
  },
  {
    n: '02',
    verb: 'Speak',
    body: 'Talk the way you would to a person. Transcription runs on your own CPU while you speak, and the cleanup pass fixes punctuation and casing and drops the ums and uhs as it goes.',
    aside: 'Runs faster than real time',
  },
  {
    n: '03',
    verb: 'Release',
    body: 'The finished text is typed into the app that had your cursor. No copy, no paste, no switching windows, and no dialog asking you to confirm anything.',
    aside: 'Works in any app on Windows, macOS and Linux',
  },
]

/* First-run setup differs slightly per OS, so say it plainly rather than pretend it is identical. */
const setup: { os: string; note: string }[] = [
  { os: 'Windows', note: 'Run the installer, pick a voice model, and start dictating. Nothing else to set up.' },
  {
    os: 'macOS',
    note: 'Open it once from System Settings, Privacy and Security (the app is not notarized yet), then grant the Accessibility permission so it can type for you. Apple Silicon.',
  },
  {
    os: 'Linux',
    note: 'Install the .deb on Debian or Ubuntu. Use an X11 login session for the global hotkey and typing, since Wayland restricts synthetic input.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="container-x py-24 md:py-36">
      <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="display mt-4 max-w-[14ch] text-[36px] leading-[1] md:text-[60px]">
              Three keys, then just talk.
            </h2>
            <p className="mt-6 max-w-[38ch] text-[17px] leading-relaxed text-muted">
              There is no window to open, no record button to find, and no upload waiting to finish.
              The whole loop happens where your hands already are.
            </p>
          </Reveal>
        </div>

        <div>
          {flow.map((s, i) => (
            <Reveal key={s.verb} delay={i * 0.06}>
              <div className={`grid grid-cols-[auto_1fr] gap-6 py-10 sm:gap-8 ${i > 0 ? 'border-t-2 border-line' : 'pt-0'}`}>
                <span className="display text-[38px] leading-none text-accent sm:text-[48px]">{s.n}</span>
                <div>
                  <h3 className="display text-[28px] leading-none sm:text-[34px]">{s.verb}</h3>
                  <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-muted">{s.body}</p>
                  <p className="mt-4 font-mono text-[12px] text-faint">{s.aside}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Per-OS first run: the same three keys everywhere, with the small setup each platform needs. */}
          <Reveal delay={0.1}>
            <div className="mt-4 border-t-2 border-line pt-10">
              <p className="eyebrow">Setting up on each platform</p>
              <dl className="mt-6 flex flex-col gap-5">
                {setup.map((s) => (
                  <div key={s.os} className="grid grid-cols-[86px_1fr] gap-4 sm:gap-6">
                    <dt className="pt-[3px] font-mono text-[12px] uppercase tracking-wide text-accent">{s.os}</dt>
                    <dd className="max-w-[46ch] text-[15px] leading-relaxed text-muted">{s.note}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- Features ----------
   A bento with real rhythm: one wide accent chamber, one tall figure, then three supporting
   cells. Exactly six cells for six things, no filler tiles. Flat, 2px borders, no shadows. */
export function Features() {
  return (
    <section id="features" className="container-x py-24 md:py-36">
      <Reveal>
        <p className="eyebrow">What you get</p>
        <h2 className="display mt-4 max-w-[20ch] text-[36px] leading-[1] md:text-[60px]">
          Small, quiet, and completely yours.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {/* Privacy: the reason the product exists. Wide accent chamber. */}
        <Reveal className="md:col-span-2">
          <div
            className="card h-full p-8 sm:p-10"
            style={{ background: 'hsl(var(--accent) / 0.07)', borderColor: 'hsl(var(--accent) / 0.28)' }}
          >
            <ShieldCheck size={30} weight="fill" className="text-accent" />
            <h3 className="display mt-6 max-w-[18ch] text-[30px] leading-[1.05] sm:text-[38px]">
              Your voice never leaves the machine.
            </h3>
            <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-muted">
              Audio is transcribed on your own CPU, and the cleanup is ordinary local text processing
              rather than a model in someone else&rsquo;s data centre. The single network request the app
              ever makes is downloading a speech model, once. No account, no telemetry, no analytics.
            </p>
          </div>
        </Reveal>

        {/* Speed: one large figure. */}
        <Reveal delay={0.05}>
          <div className="card flex h-full flex-col justify-between p-8 sm:p-10">
            <Lightning size={26} weight="fill" className="text-accent" />
            <div className="mt-8">
              <p className="display text-[64px] leading-none">0.1×</p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                Real time on a plain CPU. A ten second sentence is transcribed in about one, so the text
                is already there when you stop.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="card h-full p-8">
            <AppWindow size={24} weight="fill" className="text-accent" />
            <h3 className="display mt-5 text-[24px] leading-none">Anywhere you can type</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Browsers, editors, terminals, chat boxes, form fields. It types where your cursor already is.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card h-full p-8">
            <Broom size={24} weight="fill" className="text-accent" />
            <h3 className="display mt-5 text-[24px] leading-none">Tidied as you speak</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Punctuation, capitals and filler words are handled locally, on every engine. Toggle it off
              if you would rather have the raw transcript.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card h-full p-8">
            <Textbox size={24} weight="fill" className="text-accent" />
            <h3 className="display mt-5 text-[24px] leading-none">Your words, your spellings</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              A personal dictionary fixes names and jargon, and snippets expand a spoken phrase into
              whatever boilerplate you keep retyping.
            </p>
          </div>
        </Reveal>

        {/* History: a visual cell so the grid is not all type. */}
        <Reveal delay={0.15} className="md:col-span-3">
          <div className="card h-full p-8 sm:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-14">
              <div>
                <ClockCounterClockwise size={24} weight="fill" className="text-accent" />
                <h3 className="display mt-5 max-w-[16ch] text-[26px] leading-tight sm:text-[32px]">
                  Every transcript stays on your disk.
                </h3>
                <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-muted">
                  Searchable history in a local SQLite file you can delete by date range whenever you
                  like. Nothing is synced, because there is nowhere for it to sync to.
                </p>
              </div>
              <div className="grid shrink-0 grid-flow-col grid-rows-5 gap-[4px]" aria-hidden>
                {Array.from({ length: 95 }).map((_, i) => {
                  const lvl = [0, 0.2, 0.45, 0.75, 1][Math.floor(Math.abs(Math.sin(i * 2.3)) * 5)]
                  return (
                    <span
                      key={i}
                      className="h-[11px] w-[11px] rounded-[3px]"
                      style={{ background: lvl === 0 ? 'hsl(var(--line))' : `hsl(var(--accent) / ${lvl})` }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
