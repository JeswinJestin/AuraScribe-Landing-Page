import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('free-open-source-meeting-notetaker')!

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
        A meeting notetaker is supposed to save you from typing while someone talks. The popular ones
        do that by sending a bot into your call and keeping the recording in the cloud, behind a
        subscription. AuraScribe&rsquo;s Notetaker does the same job without either part: it is free,
        open source under the MIT license, and it runs entirely on your own machine.
      </p>

      <h2>No bot joins your call</h2>
      <p>
        Tools that join a meeting as a participant announce themselves to everyone, upload the audio to
        a server, and process it there. AuraScribe does not join your call at all. It records the
        system audio you are already hearing plus your microphone, locally, and transcribes both
        on-device. The other people on the call see nothing new, and nothing leaves your computer.
      </p>

      <h2>It understands who said what</h2>
      <p>
        The Notetaker tells your voice apart from the guests and labels each speaker. When someone
        introduces themselves or is clearly addressed by name, it writes that real name in, but only
        when it is confident, so the labels stay honest. You can also turn on a word-by-word live
        transcript and watch the text form in real time. All of that speaker intelligence runs on your
        own CPU, with no model calls to anyone.
      </p>

      <h2>Open source, so you can check the claims</h2>
      <p>
        &ldquo;Runs locally&rdquo; is easy to say and hard to trust from a closed product. AuraScribe
        is open source, so you can read exactly what the Notetaker does with your audio instead of
        taking a privacy page at its word. The app&rsquo;s content security policy is deliberately
        restrictive, so any attempt to add a network call would be obvious. The only request it makes
        is the one-time speech-model download.
      </p>

      <h2>What you get after the meeting</h2>
      <p>
        Past meetings are grouped by date in the app. Open one as a full page to read the timestamped
        transcript, resume a session you paused, or generate a{' '}
        <a href="/blog/free-meeting-summary-on-device">local summary</a> of the key points. For the
        mechanics of capturing both sides of the call, see{' '}
        <a href="/blog/free-meeting-transcription-offline">free offline meeting transcription</a>.
      </p>

      <h2>One honest limit</h2>
      <p>
        The Notetaker is a Windows feature right now. AuraScribe&rsquo;s dictation runs on Windows,
        macOS (Apple Silicon), and Linux, but meeting transcription is Windows only for the moment.
      </p>

      <h2>The short version</h2>
      <p>
        If you want a meeting notetaker that is free, open, and keeps every recording on your own
        machine, that is exactly what AuraScribe&rsquo;s Notetaker is.{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          Download it
        </a>{' '}
        and try it on your next call, or read how it stacks up against the paid tools on the{' '}
        <a href="/#compare">home page</a>.
      </p>
    </BlogPost>
  )
}
