import { financing, paymentMethods } from '../data/site'
import { useScrollTo } from '../lib/hooks'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

/**
 * Financing teaser. Deliberately makes no firm offer: no APR, no term
 * length, no "as low as $X/mo" figure. `financing.disclaimer` in site.js
 * spells out why, and stays visible rather than tucked in fine print.
 */
export default function FinancingSection() {
  const scrollTo = useScrollTo()

  return (
    <Section id="financing" accent="warm">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-linear-to-br from-surface to-sunk p-8 sm:p-12 lg:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklab, var(--color-warm) 35%, transparent), transparent 70%)',
          }}
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Payment options"
              title={financing.title}
              sub={financing.sub}
            />

            <Reveal delay={200}>
              <Button
                variant="warm"
                size="lg"
                onClick={() => scrollTo('#lead-form')}
                iconRight="arrowRight"
                className="mt-9"
              >
                {financing.cta}
              </Button>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-4 max-w-md text-xs leading-relaxed text-ink-faint">
                {financing.disclaimer}
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-7">
                <p className="text-xs font-medium tracking-[0.08em] text-ink-faint uppercase">
                  Also accepted for standard service
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {paymentMethods.map((method) => (
                    <li key={method.id}>
                      <span
                        title={method.label}
                        aria-label={method.label}
                        className="flex h-9 w-14 items-center justify-center rounded-lg border border-line bg-surface text-ink-soft"
                      >
                        <Icon name={method.id} size={22} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4">
            {financing.points.map((point, i) => (
              <Reveal key={point} delay={i * 80}>
                <div className="flex items-center gap-4 rounded-xl border border-line bg-surface/70 p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-warm/15 text-warm-deep">
                    <Icon name="check" size={18} />
                  </span>
                  <p className="font-medium text-ink">{point}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
