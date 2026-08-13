import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('local-vs-cloud-dictation-privacy')!

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: { title: post.title, description: post.description, url: `${site.url}/blog/${post.slug}`, type: 'article' },
}

export default function Page() {
  return (
    <BlogPost post={post}>
      <p>
        When you dictate, you are speaking things you often would not type in public: passwords read
        aloud, medical details, legal drafts, private messages, unreleased ideas. Where that audio
        goes is not a small detail. The difference between local and cloud dictation is simply whether
        your voice leaves your computer, and that difference decides everything else about privacy.
      </p>

      <h2>What cloud dictation does</h2>
      <p>
        A cloud dictation tool records your microphone and streams that audio to servers it controls,
        where the transcription happens, before sending the text back. That design has real strengths,
        but it also means your spoken words travel across the internet and are processed on hardware
        you do not own. Even with good intentions and encryption in transit, that audio can be logged,
        retained, used to improve models, or exposed if the service is breached. You are trusting a
        policy, and policies change.
      </p>

      <h2>What local dictation does</h2>
      <p>
        Local, on-device dictation never sends your audio anywhere. The recognition runs on your own
        processor, so the recording, the transcription, and the finished text all stay on your
        machine. There is no server to log your voice, no account tying it to your identity, and
        nothing to breach on someone else&rsquo;s side, because your speech was never there. The
        privacy is structural rather than promised.
      </p>

      <h2>How AuraScribe handles it</h2>
      <p>
        AuraScribe is local first by design. Every word is transcribed on your PC. The only network
        request it ever makes is a one-time download of the speech model you choose, and that request
        downloads files to you without uploading your voice, your text, or any identifier. After that,
        it works with the internet switched off. There is no telemetry, no analytics, and no account,
        not even an optional one.
      </p>

      <h2>Why open source is the proof</h2>
      <p>
        Any app can claim it respects your privacy. The reason that claim is believable for AuraScribe
        is that the source is public, so anyone can read exactly what it does with your microphone. A
        restrictive security policy is built into the app specifically so that a stray network request
        would stand out rather than slip by. You do not have to take the promise on faith, which is the
        entire point.
      </p>
      <p>
        If keeping your voice on your own machine is the deciding factor, that is what local dictation
        is for. You can read the full{' '}
        <a href="/privacy">privacy page</a>, look at the{' '}
        <a href={site.github} target="_blank" rel="noreferrer">
          source on GitHub
        </a>
        , or{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          download AuraScribe for Windows
        </a>{' '}
        and keep dictation entirely offline.
      </p>
    </BlogPost>
  )
}
