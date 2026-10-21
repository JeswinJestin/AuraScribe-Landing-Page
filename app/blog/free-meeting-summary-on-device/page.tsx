import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('free-meeting-summary-on-device')!

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
        After a long call, nobody wants to reread the whole transcript. AuraScribe&rsquo;s Notetaker
        can condense a meeting into its key points and main topics, and it does it entirely on your own
        machine. It is free, offline, and needs no extra download to run.
      </p>

      <h2>How the summary works</h2>
      <p>
        The paid tools summarise by sending your transcript to a cloud language model. AuraScribe does
        not do that, so instead of inventing prose it uses an extractive summary. It scores the
        meeting&rsquo;s own sentences by how much real content each one carries and returns the few
        most information-dense ones, in the order they were actually said, along with the salient topic
        keywords. The result is a short, faithful digest of the conversation.
      </p>

      <h2>Why extractive is a feature, not a compromise</h2>
      <p>
        Because the summary is built only from sentences that were genuinely spoken, it cannot
        hallucinate. It will never put words in someone&rsquo;s mouth or invent a decision that was not
        made, which is exactly what you want from a record of a real meeting. It is also instant and
        deterministic: the same transcript always yields the same key points, with no model to load and
        no server to wait on.
      </p>

      <h2>Everything stays local</h2>
      <p>
        The summary is generated from the transcript already sitting on your disk, so no audio and no
        text ever leaves your computer. It runs with no additional model download on top of the speech
        model, and like the rest of AuraScribe it works with no account and no subscription.
      </p>

      <h2>Where it fits</h2>
      <p>
        Open any past meeting as a full page and generate its summary there. The transcript it draws
        from comes from the Notetaker, which records the call audio you hear plus your microphone,
        locally. See <a href="/blog/free-meeting-transcription-offline">free offline meeting
        transcription</a> for how the recording works, and{' '}
        <a href="/blog/free-open-source-meeting-notetaker">the free, open-source notetaker</a> for the
        bigger picture.
      </p>

      <h2>One honest note</h2>
      <p>
        This is a key-points summary, not a fluent written-up narrative with action items. A richer
        narrative summary is a possible future opt-in that would stay fully local and never cloud. The
        extractive summary is the always-available default, and the Notetaker itself is a Windows
        feature for now.
      </p>

      <h2>The short version</h2>
      <p>
        If you want free meeting summaries that stay on your own machine and never make something up,
        AuraScribe gives you exactly that.{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          Download it
        </a>{' '}
        and summarise your next call locally.
      </p>
    </BlogPost>
  )
}
