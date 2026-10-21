import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('free-meeting-transcription-offline')!

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
        Most meeting transcription tools are paid, cloud-based, or both. You invite a bot into the
        call, it uploads the audio to a server, and the transcript lives in someone else&rsquo;s
        account. AuraScribe&rsquo;s Notetaker takes the opposite approach: it records the call on your
        own machine and writes the transcript there too. It is free, open source, and never sends your
        audio anywhere.
      </p>

      <h2>What &ldquo;offline meeting transcription&rdquo; actually means here</h2>
      <p>
        When you start the Notetaker, AuraScribe captures two things at once: the system audio you
        hear (the other people on the call) and your own microphone. It transcribes both on-device and
        writes a timestamped transcript to a local database on your PC. No bot joins the meeting, no
        recording is uploaded, and no account is involved. The only network request AuraScribe ever
        makes is the one-time download of the speech model, after which transcription runs fully
        offline.
      </p>

      <h2>It separates who is speaking</h2>
      <p>
        A wall of text is hard to use later. The Notetaker tells your voice apart from the guests and
        labels each speaker, starting with Speaker 1, Speaker 2, and so on. As the conversation goes
        on, if someone clearly introduces themselves or is addressed by name, AuraScribe fills that
        real name in. It only does this when it is confident, so you get honest labels rather than
        guessed names. There is also an optional word-by-word live transcript if you want to watch the
        text appear as people talk.
      </p>

      <h2>Where the transcript lives</h2>
      <p>
        Everything stays on your machine. Past meetings are listed in the app, grouped by date, and you
        can reopen any of them as a full page, keep recording a session you paused, or generate a{' '}
        <a href="/blog/free-meeting-summary-on-device">local summary of the key points</a>. Because the
        transcript is just data on your own disk, you decide what happens to it. Nothing is retained on
        a server because nothing was ever sent to one.
      </p>

      <h2>One honest limit</h2>
      <p>
        The Notetaker is a Windows feature today. Dictation (press a hotkey, speak, get text in any
        app) runs on Windows, macOS on Apple Silicon, and Linux, but meeting transcription is Windows
        only for now. We would rather say that plainly than imply coverage that is not there yet.
      </p>

      <h2>The short version</h2>
      <p>
        If you want to transcribe meetings without a subscription and without your call audio leaving
        your computer, AuraScribe is the free, local, open-source option. See how it compares with the
        paid cloud tools on the <a href="/#compare">home page</a>, or{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          download it
        </a>{' '}
        and record your next call locally. It pairs well with a{' '}
        <a href="/blog/free-open-source-meeting-notetaker">free, open-source notetaker</a> workflow.
      </p>
    </BlogPost>
  )
}
