import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('free-voice-typing-app')!

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
        Voice typing means exactly what it sounds like: you speak, and clean text appears where your
        cursor is, in whatever app you are using. No switching to a special window, no copying and
        pasting afterward. AuraScribe does this free, open source, and fully offline on Windows, macOS,
        and Linux.
      </p>

      <h2>How it works</h2>
      <p>
        You hold a hotkey, speak a sentence or two, and release. AuraScribe transcribes your speech
        on-device and types the finished text straight into the app that has focus, whether that is a
        browser, an editor, a terminal, a chat box, or a form field. It is push-to-talk, so it only
        listens while you are holding the key, and the recognition runs on your own CPU in real time.
      </p>

      <h2>Free and open, with no account</h2>
      <p>
        AuraScribe is free forever under the MIT license. There is no paid tier, no usage cap, and
        nothing to sign up for. Because it is open source, you can read exactly what it does with your
        microphone rather than trusting a marketing page. Most voice typing tools are either a paid
        subscription, a cloud service, or built into one operating system only; AuraScribe is the free,
        cross-platform, open option.
      </p>

      <h2>Your voice never leaves your machine</h2>
      <p>
        Cloud voice typing streams your microphone to someone else&rsquo;s servers. AuraScribe
        transcribes everything locally. The only network request it ever makes is the one-time download
        of the speech model, after which it works with no internet at all. If privacy is why you are
        looking, see <a href="/blog/local-vs-cloud-dictation-privacy">local vs cloud dictation</a>.
      </p>

      <h2>It runs on all three platforms</h2>
      <p>
        Voice typing works on Windows, macOS on Apple Silicon, and Linux (Debian and Ubuntu). Windows
        is the most battle-tested; the macOS and Linux builds are newer. On macOS you approve the app
        once and grant an Accessibility permission; on Linux it works best in an X11 session. The
        download button on the site picks the right build for your system. For the Windows walkthrough,
        see <a href="/blog/dictate-into-any-app-hotkey">how to dictate into any app with a hotkey</a>.
      </p>

      <h2>The short version</h2>
      <p>
        If you want free voice typing that works in every app and keeps your voice on your own machine,
        AuraScribe is a free, open-source, offline choice on all three platforms. Compare it with the
        paid tools on the <a href="/#compare">home page</a>, or{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          download it
        </a>{' '}
        and start talking.
      </p>
    </BlogPost>
  )
}
