import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('aurascribe-linux-dictation')!

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
        Good offline dictation has been hard to find on Linux. AuraScribe runs there natively, does all
        of its transcription on your own machine, and types clean text into any application. This guide
        covers installing it on Debian or Ubuntu and the one session detail that matters for the global
        hotkey.
      </p>

      <h2>Install the .deb</h2>
      <p>
        Download the Linux package (a .deb) from the{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          releases page
        </a>{' '}
        and install it with your package manager, for example{' '}
        <code>sudo apt install ./AuraScribe_2.0.0_amd64.deb</code>, or by double-clicking it in your
        file manager. It targets Debian and Ubuntu and their derivatives.
      </p>

      <h2>Use an X11 session</h2>
      <p>
        This is the one thing to know on Linux. A global hotkey that works in every window, and the
        ability to type text into whatever app has focus, both rely on synthetic input, which Wayland
        deliberately restricts for security. So AuraScribe works best in an X11 login session. On the
        login screen, click the gear or session icon and choose the Xorg or X11 option before you sign
        in. Everything else, including the transcription itself, behaves the same as on Windows and
        macOS.
      </p>

      <h2>Set the hotkey and dictate</h2>
      <p>
        The default shortcut is Ctrl + Shift + Space, rebindable to anything you prefer. Press it in
        any window, speak, and release. Recognition runs on your CPU as you talk, and a local cleanup
        pass handles punctuation, casing, and filler words, so the finished text is typed straight into
        your editor, browser, terminal, or chat box the moment you stop.
      </p>

      <h2>What you need</h2>
      <p>
        AuraScribe on Linux needs a 64-bit Debian or Ubuntu system, a microphone, and, for the hotkey
        and typing, an X11 session. No GPU is required. After the first language model downloads once,
        it runs fully offline, with no account and no subscription.
      </p>
      <p>
        If you want dictation that never leaves your machine, that is the whole idea here. You can{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          download AuraScribe for Linux
        </a>{' '}
        now, or read more about{' '}
        <a href="/blog/local-vs-cloud-dictation-privacy">local versus cloud dictation</a>.
      </p>
    </BlogPost>
  )
}
