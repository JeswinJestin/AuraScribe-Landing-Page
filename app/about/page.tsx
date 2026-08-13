import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'
import { engines, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Why AuraScribe exists: a free, open-source, 100% offline voice dictation app for Windows, built so your voice never has to leave your machine.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About AuraScribe',
    description: 'The story behind a free, open-source, fully offline dictation app for Windows.',
    url: `${site.url}/about`,
  },
}

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Your voice, your machine."
      intro="AuraScribe is a free, open-source dictation app for Windows. You press a hotkey, speak, and clean text appears wherever your cursor is. Every word is transcribed on your own computer, and it stays there."
    >
      <h2>Why it exists</h2>
      <p>
        Good dictation had quietly become something you rent. The best tools are subscriptions that
        stream your microphone to a server you do not control, the classic desktop option costs
        hundreds, and the one built into Windows sends what you say to Microsoft. For a lot of people
        that is a fine trade. For anyone who dictates private notes, medical or legal work, source
        code, or simply does not want their voice sitting on someone else&rsquo;s computer, it is not.
      </p>
      <p>
        AuraScribe started from a stubborn question: what if none of it ever left your machine, and
        it still cost nothing? Speech recognition is now good enough and light enough to run in real
        time on an ordinary laptop CPU. The only thing missing was someone willing to build the whole
        thing around privacy instead of bolting it on afterwards.
      </p>

      <h2>How it works, honestly</h2>
      <p>
        The app has exactly one job: hotkey, speak, text at your cursor, in any application. The
        recognition runs entirely on-device. The only network request AuraScribe ever makes is a
        one-time download of the speech model you choose; after that it works with your Wi-Fi off.
        There is no account, no telemetry, no analytics, and no cloud fallback that quietly kicks in.
        The permitted-network rule is enforced in the app&rsquo;s own configuration so that a
        regression would be obvious, not silent.
      </p>
      <p>
        Under the hood, four on-device engines cover different parts of the world, each one open and
        credited to the researchers who built it:
      </p>
      <ul>
        {engines.map((e) => (
          <li key={e.name}>
            <strong>{e.name}</strong> handles {e.role.toLowerCase()} ({e.by}).
          </li>
        ))}
      </ul>
      <p>
        Between them that is English, twenty-five European languages, roughly forty Asian languages,
        and Malayalam and Kannada, all running locally. Malayalam and Kannada were the hardest to
        reach and were verified against real dictation, not just assumed to work.
      </p>

      <h2>What actually makes it good</h2>
      <p>
        The speech models are not a secret sauce. They are open, and every serious local-dictation
        tool draws from the same public research; nobody in this space trained their own, and doing
        so would cost millions and break the promise of staying free and lightweight. So AuraScribe
        does not pretend the model is the product. The product is everything around it:
      </p>
      <ul>
        <li>
          <strong>Latency you do not feel.</strong> Speech is transcribed in chunks while you talk,
          so the text is nearly ready by the time you stop.
        </li>
        <li>
          <strong>A local cleanup pass.</strong> Punctuation, capitalisation, and filler words are
          tidied on-device, so what lands reads like writing, not a raw transcript.
        </li>
        <li>
          <strong>Your words.</strong> A personal dictionary and text snippets teach it the names,
          terms, and boilerplate you actually use.
        </li>
        <li>
          <strong>It types into anything.</strong> Browsers, editors, terminals, chat boxes, form
          fields. If your cursor is there, the text goes there.
        </li>
      </ul>

      <h2>Free, open, and giving back</h2>
      <p>
        AuraScribe is released under the{' '}
        <a href={`${site.github}/blob/master/LICENSE`} target="_blank" rel="noreferrer">
          MIT License
        </a>{' '}
        and free forever, with no paid tier and no account to create. The full source lives{' '}
        <a href={site.github} target="_blank" rel="noreferrer">
          on GitHub
        </a>
        , so anyone can read exactly what it does with your microphone, which is the only real way to
        trust a privacy claim. The work of getting Malayalam running well produced a packaged model
        that was contributed back to the open-source speech community, so the next person building an
        offline tool does not have to start from nothing.
      </p>

      <h2>What it is not, yet</h2>
      <p>
        AuraScribe runs on Windows 10 and 11 today. macOS and Linux are planned and honestly not
        built yet, so rather than fake support the app returns clear errors on those platforms until
        the real thing ships. It is a focused dictation tool, not a meeting transcriber, not a chat
        assistant, and it will never grow a cloud option or a subscription. If those limits are the
        price of software that keeps your voice on your own machine, they are the right ones.
      </p>

      <h2>Who builds it</h2>
      <p>
        AuraScribe is built and maintained by Jeswin Thomas Jestin. It is a real, shipping app rather
        than a demo, and it improves through the people who use it and report what breaks. If you
        want to help, the most useful things are simple: use it daily,{' '}
        <a href={`${site.github}/issues`} target="_blank" rel="noreferrer">
          file an issue
        </a>{' '}
        when something is wrong, star the repository so others can find it, or{' '}
        <a href={site.sponsor} target="_blank" rel="noreferrer">
          sponsor the work
        </a>{' '}
        so it can keep being free for everyone else.
      </p>
    </PageShell>
  )
}
