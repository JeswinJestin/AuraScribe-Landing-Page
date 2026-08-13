import { faqs } from '@/lib/site'
import { Reveal } from './primitives'

/*
  FAQ — plain, honest answers to what people actually search ("is it free", "does it send my voice
  to the cloud", "Wispr Flow alternative"). The same Q&A is emitted as FAQPage structured data in
  layout.tsx, so these can surface directly in search results. Editorial layout: sticky heading,
  hairline-separated rows, no accordion (all answers visible = better for crawlers and for humans).
*/
export function Faq() {
  return (
    <section id="faq" className="container-x py-24 md:py-36">
      <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-4 max-w-[12ch] text-[36px] leading-[1] md:text-[60px]">
              The things people ask first.
            </h2>
          </Reveal>
        </div>

        {/* dt/dd must sit directly inside a <div> that is a direct child of <dl> (accessibility:
            the definition-list structure rule). Reveal renders that div itself (via className), so
            there is no extra wrapper nesting the dt/dd another level deep. */}
        <dl>
          {faqs.map((f, i) => (
            <Reveal
              key={f.q}
              delay={i * 0.04}
              className={`py-8 ${i > 0 ? 'border-t-2 border-line' : 'pt-0'}`}
            >
              <dt className="display text-[22px] leading-tight sm:text-[26px]">{f.q}</dt>
              <dd className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-muted">{f.a}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
