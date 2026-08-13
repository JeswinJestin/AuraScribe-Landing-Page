import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'License',
  description:
    'AuraScribe is released under the MIT License. Read the full license text: free to use, copy, modify, and distribute.',
  alternates: { canonical: '/license' },
  openGraph: {
    title: 'License · AuraScribe',
    description: 'AuraScribe is released under the MIT License.',
    url: `${site.url}/license`,
  },
}

const MIT_LICENSE = `MIT License

Copyright (c) 2026 Jeswin Thomas Jestin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

export default function LicensePage() {
  return (
    <PageShell
      eyebrow="License"
      title="The MIT License."
      intro="AuraScribe, and this website, are free and open source under the MIT License. In plain terms: you can use, copy, change, and redistribute it, for anything, as long as the copyright notice stays. It comes with no warranty."
    >
      <p>
        This is the permissive, industry-standard MIT License, the same one the{' '}
        <a href={site.github} target="_blank" rel="noreferrer">
          AuraScribe source code
        </a>{' '}
        is released under. The full, canonical text is below.
      </p>

      <pre
        aria-label="MIT License full text"
        className="not-prose mt-8 overflow-x-auto rounded-[16px] border-2 border-line p-6 font-mono text-[13px] leading-relaxed text-muted"
        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
      >
        {MIT_LICENSE}
      </pre>

      <p className="mt-8">
        You can also read it on the{' '}
        <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noreferrer">
          Open Source Initiative
        </a>{' '}
        website, or in the{' '}
        <a href={`${site.github}/blob/master/LICENSE`} target="_blank" rel="noreferrer">
          LICENSE file
        </a>{' '}
        in the source repository. For how these terms apply to using the app and site, see the{' '}
        <a href="/terms">Terms of Service</a>.
      </p>
    </PageShell>
  )
}
