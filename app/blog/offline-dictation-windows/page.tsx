import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('offline-dictation-windows')!

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
        &ldquo;Offline dictation&rdquo; gets used loosely, so it is worth being precise. In AuraScribe
        it means the entire path from your microphone to the finished text runs on your own computer.
        Your speech is captured locally, recognised locally, cleaned up locally, and typed into
        whatever app you are using. Nothing about what you said travels over the internet, because it
        does not need to.
      </p>

      <h2>Speech recognition small enough to run on your CPU</h2>
      <p>
        For a long time, accurate speech to text meant a large model on a powerful server, which is
        why so many tools stream your audio to the cloud. That has changed. A new generation of
        compact, open speech models is accurate and light enough to run in real time on an ordinary
        laptop processor, with no graphics card required. AuraScribe is built on these models, so the
        heavy lifting happens on the machine already in front of you.
      </p>
      <p>
        To keep it responsive, the app transcribes your speech in short chunks while you are still
        talking, rather than waiting for you to finish. By the time you release the hotkey, most of
        the work is already done, so the text appears almost immediately.
      </p>

      <h2>The one and only network request</h2>
      <p>
        There is exactly one moment AuraScribe touches the network: the first time you choose a
        language, it downloads that speech model to your computer. That request pulls down model
        files. It does not upload your voice, your text, or anything about you. After the download,
        you can switch your Wi-Fi off and dictate all day. The app is designed so that this is the
        only outbound request it can make, which is a promise you can verify because the code is open.
      </p>

      <h2>Four engines, one simple experience</h2>
      <p>
        Different languages are best served by different open models, so AuraScribe uses four, each
        credited to the researchers who built it:
      </p>
      <ul>
        <li>Moonshine for fast, real-time English.</li>
        <li>NVIDIA Parakeet for twenty-five European languages, with automatic language detection.</li>
        <li>Dolphin for roughly forty Asian languages.</li>
        <li>AI4Bharat IndicConformer for Malayalam and Kannada.</li>
      </ul>
      <p>
        You never have to think about which engine is running. You pick a language, the right model
        loads, and each one detects the specific language inside its own region automatically. You
        only download the ones you actually speak, which keeps the footprint small.
      </p>

      <h2>What you need</h2>
      <p>
        AuraScribe runs on Windows 10 and 11, sixty-four bit, and needs a microphone. The installer is
        about 8.6 MB, and the app sits at roughly 40 MB of memory when idle. There is no account to
        create and no subscription. After the first model download, no internet connection is needed
        at all.
      </p>
      <p>
        If keeping your voice on your own machine matters to you, that is the whole point of running
        dictation offline. You can{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          download AuraScribe for Windows
        </a>{' '}
        and try it, or read more about{' '}
        <a href="/blog/local-vs-cloud-dictation-privacy">what actually happens to your voice</a> in
        cloud dictation.
      </p>
    </BlogPost>
  )
}
