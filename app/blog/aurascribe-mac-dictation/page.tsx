import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('aurascribe-mac-dictation')!

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
        AuraScribe runs natively on Apple Silicon Macs, and like every other build it does all of its
        work on your own machine. Your voice is never uploaded. This guide walks through installing it,
        granting the one permission macOS requires, and setting up push-to-talk dictation that types
        into any app.
      </p>

      <h2>Install</h2>
      <p>
        Download the macOS build (a .dmg for Apple Silicon) from the{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          releases page
        </a>
        , open it, and drag AuraScribe to Applications. The app is not notarized yet, so the first
        time you launch it, macOS will hold it back. Open System Settings, go to Privacy and Security,
        scroll to the note about AuraScribe, and choose Open Anyway. You only do this once.
      </p>

      <h2>Grant the Accessibility permission</h2>
      <p>
        To type the finished text into whatever app has your cursor, AuraScribe needs the Accessibility
        permission, the same one that TextExpander, Raycast, and similar tools use. Open System
        Settings, Privacy and Security, Accessibility, and turn AuraScribe on. Without it the app can
        still transcribe, but it will not be able to insert the text for you. This permission stays on
        your Mac and grants no network access.
      </p>

      <h2>Set the hotkey and dictate</h2>
      <p>
        The default shortcut on macOS is Cmd + Shift + Space, and you can rebind it to any combination
        you like. From then on the loop is simple: press the shortcut in any window, from Safari to
        your terminal to a chat box, talk the way you would to a person, and release. Transcription
        runs on your CPU while you speak, and a local cleanup pass fixes punctuation and casing and
        drops the filler words, so clean text lands the moment you stop.
      </p>

      <h2>What you need</h2>
      <p>
        AuraScribe on macOS needs an Apple Silicon Mac (the M-series chips) and a microphone. The
        download is small, and after you pick a language the first time, the speech model downloads
        once and the app works fully offline after that. There is no account and no subscription.
      </p>
      <p>
        If you have been looking for a private, local option instead of a cloud tool, that is exactly
        what this is. You can{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          download AuraScribe for macOS
        </a>{' '}
        now, or read how it stacks up as a{' '}
        <a href="/blog/free-wispr-flow-alternative">free Wispr Flow and Superwhisper alternative</a>.
      </p>
    </BlogPost>
  )
}
