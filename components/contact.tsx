'use client'

/*
  Contact — a real, validated form. It submits to a Google Form (`site.contactForm.formAction`)
  when one is configured; until then it falls back to a mailto so it works with zero setup. Full
  interactive states: inline field error messages, a submitting state, and success / error results.
  No data is sent anywhere except the configured destination; there is no third-party tracker.
*/

import { useState } from 'react'
import { PaperPlaneTilt, CheckCircle, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { site } from '@/lib/site'

type Errors = { name?: string; email?: string; message?: string }
type Status = 'idle' | 'submitting' | 'sent' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  function set<K extends keyof typeof values>(key: K, v: string) {
    setValues((s) => ({ ...s, [key]: v }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): Errors {
    const e: Errors = {}
    if (values.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!EMAIL_RE.test(values.email.trim())) e.email = 'Enter a valid email so we can reply.'
    if (values.message.trim().length < 10) e.message = 'A little more detail helps (10+ characters).'
    return e
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return

    setStatus('submitting')
    const { formAction, fields } = site.contactForm
    try {
      if (formAction) {
        const body = new FormData()
        body.append(fields.name, values.name)
        body.append(fields.email, values.email)
        body.append(fields.message, values.message)
        // Google Forms does not send CORS headers; no-cors means we can't read the response, so
        // we treat a completed request as sent (standard for this integration).
        await fetch(formAction, { method: 'POST', mode: 'no-cors', body })
        setStatus('sent')
      } else {
        // No form endpoint configured: hand off to the user's mail client. We do NOT claim the
        // message was sent, because we cannot know the client opened or that they hit send.
        const subject = encodeURIComponent(`AuraScribe — message from ${values.name}`)
        const bodyText = encodeURIComponent(`${values.message}\n\nFrom: ${values.name} <${values.email}>`)
        window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${bodyText}`
        setStatus('idle')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'mt-2 w-full rounded-[12px] border-2 border-line bg-transparent px-4 py-3 text-[16px] ' +
    'text-ink placeholder:text-faint focus:border-accent focus:outline-none'

  return (
    <section id="contact" className="container-x py-24 md:py-32">
      <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h2 className="display mt-4 max-w-[14ch] text-[36px] leading-[1] md:text-[56px]">
            Questions, bugs, or ideas.
          </h2>
          <p className="mt-6 max-w-[40ch] text-[17px] leading-relaxed text-muted">
            Found a bug or want a language added? Open an issue on GitHub, or send a note here and it
            reaches the maintainer directly.
          </p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="mt-8 inline-flex items-center gap-2 text-[16px] font-medium hover:text-accent"
          >
            <EnvelopeSimple size={18} weight="fill" className="text-accent" />
            {site.contactEmail}
          </a>
        </div>

        <div className="card p-7 sm:p-9">
          {status === 'sent' ? (
            <div className="flex min-h-[280px] flex-col items-start justify-center">
              <CheckCircle size={40} weight="fill" className="text-accent" />
              <p className="display mt-5 text-[28px] leading-tight">Thanks, that&rsquo;s on its way.</p>
              <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-muted">
                You&rsquo;ll get a reply at the address you gave. For anything code-related, GitHub issues
                are usually the fastest route.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="text-[14px] font-semibold">Name</label>
                  <input
                    id="c-name"
                    className={inputCls}
                    value={values.name}
                    onChange={(e) => set('name', e.target.value)}
                    aria-invalid={!!errors.name}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-2 text-[13px]" style={{ color: 'hsl(var(--record))' }}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="text-[14px] font-semibold">Email</label>
                  <input
                    id="c-email"
                    type="email"
                    className={inputCls}
                    value={values.email}
                    onChange={(e) => set('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-2 text-[13px]" style={{ color: 'hsl(var(--record))' }}>{errors.email}</p>}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="c-message" className="text-[14px] font-semibold">Message</label>
                <textarea
                  id="c-message"
                  rows={5}
                  className={`${inputCls} resize-y`}
                  value={values.message}
                  onChange={(e) => set('message', e.target.value)}
                  aria-invalid={!!errors.message}
                  placeholder="What&rsquo;s on your mind?"
                />
                {errors.message && <p className="mt-2 text-[13px]" style={{ color: 'hsl(var(--record))' }}>{errors.message}</p>}
              </div>

              {status === 'error' && (
                <p className="mt-5 text-[14px]" style={{ color: 'hsl(var(--record))' }}>
                  Something went wrong sending that. Please email {site.contactEmail} directly.
                </p>
              )}

              <button type="submit" disabled={status === 'submitting'} className="btn btn-primary mt-7 disabled:opacity-60">
                <PaperPlaneTilt size={18} weight="fill" />
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
