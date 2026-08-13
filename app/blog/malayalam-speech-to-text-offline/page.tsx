import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('malayalam-speech-to-text-offline')!

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
        Malayalam and Kannada are where most dictation tools quietly give up. They either do not
        support the scripts at all, or they only handle them by sending your audio to a cloud service.
        AuraScribe runs both on your own machine, with no internet connection needed after setup. Here
        is how, and what to actually expect.
      </p>

      <h2>Why these languages are usually missing</h2>
      <p>
        The fast English and European speech models simply were not trained on Malayalam or Kannada,
        so they cannot transcribe them at all. The tools that do support these languages tend to lean
        on large cloud models, which means your voice leaves your device. For anyone dictating
        personal messages, notes, or work in these languages, that is exactly the wrong trade.
      </p>

      <h2>Running IndicConformer locally</h2>
      <p>
        AuraScribe uses IndicConformer, an open speech model from AI4Bharat built specifically for
        Indian languages, and runs it entirely on-device. Getting a model like this to run fast and
        offline on a normal Windows CPU took real work, and Malayalam was verified against actual
        spoken dictation rather than assumed to work. In testing it transcribed full Malayalam
        paragraphs into clean, coherent text, and handled code-switched &ldquo;Manglish&rdquo;
        sensibly. Kannada uses the same engine and the same on-device path.
      </p>

      <h2>What to expect</h2>
      <ul>
        <li>
          It is fast, but not instant. On-device recognition for these languages runs at real-world
          speed on a normal CPU, quick enough for comfortable dictation.
        </li>
        <li>
          It is fully offline. After the one-time model download, your speech never leaves your
          computer.
        </li>
        <li>
          It is free. There is no subscription and no account, the same as every other language.
        </li>
      </ul>

      <h2>Giving the work back</h2>
      <p>
        Reaching this point produced a packaged Malayalam model that was contributed back to the
        open-source speech community, so the next person trying to build offline Malayalam dictation
        does not have to start from scratch. That is the kind of thing being open source is for.
      </p>
      <p>
        If you have wanted to dictate in Malayalam or Kannada without handing your voice to a server,
        you can{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          download AuraScribe for Windows
        </a>
        , choose the Malayalam or Kannada model, and try it. It is honest work in progress, and real
        feedback from native speakers is the most useful thing you can send back.
      </p>
    </BlogPost>
  )
}
