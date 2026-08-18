import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('free-wispr-flow-alternative')!

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
        Wispr Flow made a lot of people realise how good modern dictation can feel. It is polished, and
        it is worth its price for many users. But it is a paid subscription and it runs in the cloud,
        which are two things not everyone wants. If you are looking for a free alternative that keeps
        your voice on your own machine, here is an honest comparison.
      </p>

      <h2>What the tools actually differ on</h2>
      <p>
        Most dictation apps type clean text into any application, so that is not where they differ.
        The real differences are price, whether the software is open, and whether your speech leaves
        your computer.
      </p>
      <ul>
        <li>
          <strong>Wispr Flow and Superwhisper</strong> are excellent, but they are paid and
          cloud-based. Your audio is processed on their servers.
        </li>
        <li>
          <strong>Windows Voice Typing</strong> is free and built in, but it sends your speech to
          Microsoft, and its language coverage for scripts like Malayalam is limited.
        </li>
        <li>
          <strong>Dragon</strong> is powerful and runs locally, but it is expensive and heavy.
        </li>
        <li>
          <strong>AuraScribe</strong> is free, open source, and fully offline, with no account. That
          is the specific gap it fills.
        </li>
      </ul>

      <h2>Where AuraScribe is genuinely different</h2>
      <p>
        It is free forever under the MIT license, with no paid tier and nothing to sign up for. It is
        open source, so you can read exactly what it does with your microphone instead of trusting a
        privacy page. And it is one hundred percent offline after the first model download, so your
        voice never travels anywhere. It also covers Malayalam and Kannada on-device, which most tools
        either skip or push to the cloud.
      </p>

      <h2>Where the paid tools may still suit you better</h2>
      <p>
        Being honest matters more than winning a comparison. If you want a polished team product with
        support, cross-device sync, and a company behind it, a paid cloud tool is a reasonable choice.
        AuraScribe is a focused, single-purpose app maintained in the open. It does dictation
        very well and deliberately does not try to be a suite. Windows is the fully supported
        platform; macOS (Apple Silicon) and Linux preview builds are available too, still early and
        looking for feedback.
      </p>

      <h2>The short version</h2>
      <p>
        If you want dictation without a subscription and without your microphone streaming to a
        server, AuraScribe is the free, local, open alternative. You can see the full feature grid on
        the <a href="/#compare">comparison section of the home page</a>, or{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          download it for Windows
        </a>{' '}
        and judge it against whatever you use now.
      </p>
    </BlogPost>
  )
}
