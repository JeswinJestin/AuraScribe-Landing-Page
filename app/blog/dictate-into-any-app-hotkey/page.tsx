import type { Metadata } from 'next'
import { BlogPost } from '@/components/blog-post'
import { getPost } from '@/lib/blog'
import { site } from '@/lib/site'

const post = getPost('dictate-into-any-app-hotkey')!

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
        The point of push-to-talk dictation is that it works everywhere, not just in one text box. You
        hold a hotkey, you speak, you let go, and clean text lands wherever your cursor already was.
        Here is how to set that up with AuraScribe.
      </p>

      <h2>1. Install and pick a language</h2>
      <p>
        Download AuraScribe for Windows and run the small installer. On first launch, a short
        walkthrough helps you pick a speech model. Choose the language you dictate in, and it
        downloads once. If you mostly write in English, the recommended English model is fast and
        light. You can add more languages later.
      </p>

      <h2>2. Learn the hotkey</h2>
      <p>
        Dictation is push-to-talk, driven by a hotkey. The default is a modifier combination, and you
        can change it in Settings to whatever feels natural. AuraScribe deliberately requires a
        modifier so a stray letter key can never start recording while you type. Pick something you
        can hold comfortably without looking.
      </p>

      <h2>3. Put your cursor where the text should go</h2>
      <p>
        This is the part people miss. Click into the place you want the words to appear first: a
        browser field, your editor, a chat box, a terminal, a form. The finished text is typed into
        whichever window and field has focus, so put your cursor there before you speak.
      </p>

      <h2>4. Hold, speak, release</h2>
      <p>
        Hold the hotkey and talk normally. A small overlay shows that it is listening. When you finish,
        release the key, or click the overlay to stop. The text is transcribed on your machine,
        tidied up, and typed straight in. Punctuation, capitalisation, and filler words are cleaned up
        automatically, so what appears reads like writing rather than a raw transcript.
      </p>

      <h2>5. Teach it your words</h2>
      <p>
        Two features make it feel like yours. A personal dictionary fixes the spelling of names and
        terms it would not otherwise know. Snippets let a short spoken trigger expand into a longer
        block of text you use often. Both are optional, and both run locally like everything else.
      </p>

      <h2>Tips for clean results</h2>
      <ul>
        <li>Speak in natural phrases rather than one word at a time.</li>
        <li>Say the punctuation you care about, and let cleanup handle the rest.</li>
        <li>Keep the mic a consistent distance away; a steady input is easier to transcribe.</li>
        <li>Add recurring names and jargon to the dictionary once, and stop correcting them.</li>
      </ul>
      <p>
        That is the whole workflow. If you have not set it up yet, you can{' '}
        <a href={site.releases} target="_blank" rel="noreferrer">
          download AuraScribe for Windows
        </a>{' '}
        and be dictating into any app within a couple of minutes.
      </p>
    </BlogPost>
  )
}
