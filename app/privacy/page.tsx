import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'AuraScribe collects nothing. Your voice is transcribed on your own machine and never leaves it. No account, no telemetry, no analytics, no cloud.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy · AuraScribe',
    description: 'What AuraScribe collects: nothing. Your voice never leaves your machine.',
    url: `${site.url}/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacy"
      title="We collect nothing."
      intro="This is the short version, and it is also the whole version: AuraScribe transcribes your voice on your own computer and never sends it anywhere. There is no account, no telemetry, and no analytics."
      updated="12 August 2026"
    >
      <h2>The app</h2>
      <p>
        Everything AuraScribe does with your microphone happens on your device. Your audio is
        recorded, transcribed, cleaned up, and typed into whatever application has your cursor,
        entirely locally. None of it is uploaded, streamed, logged to a server, or shared with anyone,
        because there is no server. The transcripts and settings the app keeps (your history, your
        personal dictionary, your snippets) are stored in a local file on your own machine and are
        yours to delete at any time from inside the app.
      </p>

      <h2>The one network request</h2>
      <p>
        AuraScribe makes exactly one kind of network request: a one-time download of the speech model
        you pick, fetched from its public open-source host. That request downloads model files to your
        computer. It does not send your voice, your text, your history, or any identifier about you.
        Once the model is on your machine, the app works fully offline; you can turn off your internet
        connection and keep dictating. This restriction is written into the app&rsquo;s security policy
        so that any attempt to reach the network for another reason would break visibly.
      </p>

      <h2>No account, no tracking</h2>
      <ul>
        <li>No account, sign-up, email, or login is required to use AuraScribe.</li>
        <li>No telemetry, usage analytics, crash reporting, or &ldquo;anonymous statistics&rdquo; are collected, not even opt-in.</li>
        <li>No advertising, no profiling, and nothing is ever sold or shared, because nothing is ever collected.</li>
      </ul>
      <p>
        You do not have to take this on faith. AuraScribe is open source, so you can read the exact
        code that touches your microphone{' '}
        <a href={site.github} target="_blank" rel="noreferrer">
          on GitHub
        </a>
        . Verifiable privacy is the entire reason the project exists.
      </p>

      <h2>This website</h2>
      <p>
        The site you are reading is a plain marketing page. It sets no tracking cookies, runs no
        analytics or advertising scripts, and does not build a profile of you. If that ever changes,
        this page will say so plainly before it does.
      </p>

      <h2>If you contact us</h2>
      <p>
        The contact form and the email address on this site exist so you can reach the developer. If
        you write in, whatever you choose to include (your name, your email, your message) is used
        only to read and reply to you. It is not added to a mailing list or shared with third parties.
        You can reach out directly at{' '}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>

      <h2>Children</h2>
      <p>
        AuraScribe is a general-purpose tool and is not directed at children. Because it collects no
        personal data at all, it collects none from children either.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If this policy is updated, the &ldquo;last updated&rdquo; date at the top of the page will
        change. The commitment behind it will not: your voice stays on your machine.
      </p>
    </PageShell>
  )
}
