import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms for using AuraScribe, a free and open-source Windows dictation app released under the MIT License and provided as is.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service · AuraScribe',
    description: 'Plain terms for a free, open-source dictation app.',
    url: `${site.url}/terms`,
  },
}

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms of Service"
      title="The terms, in plain words."
      intro="AuraScribe is free and open-source software. These terms explain the basis it is offered on. They are meant to be readable, not to trap you."
      updated="12 August 2026"
    >
      <h2>Using AuraScribe</h2>
      <p>
        AuraScribe is a dictation application for Windows, offered free of charge with no account and
        no subscription. By downloading, installing, or using it, you agree to these terms. If you do
        not agree, please do not install or use the app. You may use it for any lawful purpose,
        personal or commercial.
      </p>

      <h2>Licence</h2>
      <p>
        AuraScribe is released under the{' '}
        <a href={`${site.github}/blob/master/LICENSE`} target="_blank" rel="noreferrer">
          MIT License
        </a>
        . That licence, not this page, governs your rights to use, copy, modify, and redistribute the
        software, and it is deliberately permissive. Nothing here is intended to reduce the rights the
        MIT License grants you. The AuraScribe name and logo are not part of that grant; please do not
        use them in a way that suggests your own build or fork is the official one.
      </p>

      <h2>Speech models and third-party components</h2>
      <p>
        The app can download open-source speech models that you choose. Those models are created and
        licensed by their respective authors and are governed by their own licences, which you agree
        to when you download and use them through the app. AuraScribe credits each engine and its
        authors both in the app and{' '}
        <a href="/about">on the About page</a>. AuraScribe is an independent project and is not
        affiliated with, endorsed by, or sponsored by any of those authors, or by any other product
        it is compared to.
      </p>

      <h2>Your content</h2>
      <p>
        AuraScribe processes your speech entirely on your own device and does not transmit or store it
        anywhere off your machine (see the <a href="/privacy">Privacy page</a>). Anything you dictate,
        and any transcripts, dictionary entries, or snippets you create, are yours. The developer
        neither receives nor claims any rights to them.
      </p>

      <h2>No warranty</h2>
      <p>
        AuraScribe is provided <strong>&ldquo;as is&rdquo;</strong>, without warranty of any kind,
        express or implied, including but not limited to the warranties of merchantability, fitness
        for a particular purpose, and non-infringement. Speech recognition is imperfect and can make
        mistakes; you are responsible for reviewing dictated text before you rely on it, especially in
        any situation where an error could cause harm.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, in no event shall the author or contributors be liable
        for any claim, damages, or other liability, whether in an action of contract, tort, or
        otherwise, arising from, out of, or in connection with the software or its use. Because
        AuraScribe is provided free of charge, this allocation of risk is a basic condition of it
        being offered at all.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may be updated as the project evolves. When they change, the &ldquo;last
        updated&rdquo; date at the top of this page will change with them. Continuing to use the app
        after an update means you accept the revised terms.
      </p>

      {/*
        Owner note: if you want an explicit governing-law clause, set your jurisdiction here.
        Left general on purpose so the site does not assert a place you have not chosen.
      */}
      <h2>Contact</h2>
      <p>
        Questions about these terms can go to{' '}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>, or you can open an issue{' '}
        <a href={`${site.github}/issues`} target="_blank" rel="noreferrer">
          on GitHub
        </a>
        .
      </p>
    </PageShell>
  )
}
