import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('best-free-offline-dictation-cross-platform')!

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
        Almost every good dictation tool asks you to give something up. The polished ones cost a
        monthly fee, stream your microphone to a server, or run on only one operating system.
        AuraScribe was built to avoid all three of those trade-offs at once: it is free, it is open
        source under the MIT license, and it runs entirely on your own machine on Windows, macOS, and
        Linux.
      </p>

      <h2>What &ldquo;offline&rdquo; actually buys you</h2>
      <p>
        When dictation runs locally, the whole path from your microphone to the finished text happens
        on the computer in front of you. Your speech is captured, recognised, cleaned up, and typed
        into your app without leaving the device. That has three practical effects: there is nothing
        to leak, there is no per-minute usage meter, and there is no round trip to wait on, so the
        text lands the moment you stop talking. After the one-time model download, you can switch off
        Wi-Fi and keep dictating.
      </p>

      <h2>The same app on all three platforms</h2>
      <p>
        AuraScribe ships as a small native installer for each system, and the experience is the same
        everywhere: press a hotkey in any window, talk, release, and clean punctuated text is typed
        where your cursor already is.
      </p>
      <ul>
        <li>
          <strong>Windows 10 and 11 (64-bit):</strong> run the installer, pick a voice model, and
          start dictating. This is the most battle-tested build.
        </li>
        <li>
          <strong>macOS on Apple Silicon:</strong> open it once from System Settings, Privacy and
          Security, then grant an Accessibility permission so it can type for you. See{' '}
          <a href="/blog/aurascribe-mac-dictation">the macOS setup guide</a>.
        </li>
        <li>
          <strong>Linux (Debian or Ubuntu):</strong> install the .deb and use an X11 login session for
          the global hotkey. See <a href="/blog/aurascribe-linux-dictation">the Linux setup guide</a>.
        </li>
      </ul>

      <h2>How it compares</h2>
      <p>
        Wispr Flow and Superwhisper are well made, but they are paid and lean on the cloud. Dragon is
        powerful and expensive. Windows Voice Typing is free but sends what you say to Microsoft.
        AuraScribe sits in the gap none of them fill: free, open source, fully offline, no account,
        and cross-platform. It also handles languages the fast tools tend to skip, including
        twenty-five European and around forty Asian languages, plus Malayalam and Kannada, using four
        on-device engines.
      </p>

      <h2>Try it</h2>
      <p>
        The download button on the{' '}
        <a href={site.url}>homepage</a> picks the right build for your system automatically, or you
        can grab any platform from the{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          releases page
        </a>
        . If you are coming from a paid tool, the{' '}
        <a href="/blog/free-wispr-flow-alternative">free Wispr Flow alternative</a> write-up covers the
        differences in more detail.
      </p>
    </BlogPost>
  )
}
