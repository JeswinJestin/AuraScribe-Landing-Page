import { Check, X } from '@phosphor-icons/react/dist/ssr'
import { comparison } from '@/lib/site'
import { Reveal } from './primitives'

function Cell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  if (value === true)
    return <Check size={20} weight="bold" className={highlight ? 'text-accent' : 'text-muted'} aria-label="Yes" />
  if (value === false) return <X size={17} weight="bold" className="text-faint/60" aria-label="No" />
  return <span className="text-[13px] leading-tight text-muted">{value}</span>
}

/*
  No horizontal scrollbar. A native scrollbar inside the table looked out of place, so instead the
  table fits the width it is given: on small screens the two right-hand columns are dropped (the
  comparison that matters most is AuraScribe vs the paid cloud tools), and everything is revealed
  from md upward. Same markup, no overflow container.
*/
export function Comparison() {
  const { rows, cols } = comparison
  // Columns hidden below the given breakpoint, by index.
  const colVisibility = ['', '', 'hidden sm:table-cell', 'hidden md:table-cell', 'hidden lg:table-cell']

  return (
    <section id="compare" className="container-x py-24 md:py-32">
      <Reveal>
        <p className="eyebrow">The honest comparison</p>
        <h2 className="display mt-4 max-w-[22ch] text-[34px] leading-[1.02] md:text-[52px]">
          A free, open alternative to Wispr Flow, Superwhisper, and Dragon.
        </h2>
        <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-muted">
          Most dictation tools bill monthly, need an account, or stream your voice to a server you do not
          control. This is where AuraScribe differs, and where it does not. Only claims we can stand behind.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-12 w-full">
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[32%] pb-5 sm:w-[28%]" />
                {cols.map((c, i) => (
                  <th
                    key={c}
                    className={`pb-5 text-center text-[13px] font-semibold sm:text-[14px] ${
                      i === 0 ? 'text-accent' : 'text-muted'
                    } ${colVisibility[i] ?? ''}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t-2 border-line">
                  <th scope="row" className="py-5 pr-4 text-[14px] font-medium sm:text-[15px]">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={`py-5 text-center align-middle ${i === 0 ? 'bg-accent/[0.06]' : ''} ${
                        colVisibility[i] ?? ''
                      }`}
                    >
                      <div className="flex justify-center px-1">
                        <Cell value={v} highlight={i === 0} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 font-mono text-[12px] leading-relaxed text-faint">
            Each tool in its default configuration. Windows Voice Typing sends audio to Microsoft unless
            you disable online speech recognition.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
