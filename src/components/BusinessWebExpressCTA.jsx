import { bwe } from '../data/site'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'

/**
 * The one section on this page that is NOT the HVAC brand.
 *
 * It deliberately switches everything at once — light cream ground, warm ink
 * text, clay accent, Fraunces serif — because it stops addressing the
 * homeowner and starts addressing the business owner who was sent this
 * prototype. The visual break is the message.
 */
export default function BusinessWebExpressCTA() {
  return (
    <section
      id="business-web-express"
      className="relative isolate overflow-clip bg-bwe-cream py-20 text-bwe-ink sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            'radial-gradient(60% 50% at 80% 0%, var(--color-bwe-cream-deep), transparent 70%)',
        }}
      />

      <div className="u-container">
        <div className="mx-auto max-w-4xl">
          <Reveal className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-bwe-clay text-bwe-cream">
              <Icon name="sparkle" size={19} />
            </span>
            <span className="font-display text-sm font-semibold tracking-[0.18em] text-bwe-ink-soft uppercase">
              {bwe.name}
            </span>
          </Reveal>

          <Reveal delay={80} as="h2" className="mt-8 font-serif text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.05] font-semibold text-bwe-ink">
            {bwe.headline}
          </Reveal>

          <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
            <Reveal delay={140}>
              <ul className="space-y-3">
                {bwe.yours.map((line, i) => (
                  <li
                    key={line}
                    className="flex items-center gap-3 font-display text-xl font-medium text-bwe-ink sm:text-2xl"
                    style={{ opacity: 1 - i * 0.06 }}
                  >
                    <Icon name="check" size={18} className="shrink-0 text-bwe-clay" strokeWidth={2.2} />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg leading-relaxed text-bwe-ink-soft">{bwe.pitch}</p>

              <p className="mt-6 border-l-2 border-bwe-clay pl-5 text-lg leading-relaxed text-bwe-ink">
                Everything you just scrolled through — the thermostat, the diagnostic, the
                estimate wizard, the mobile booking sheet — is the kind of thing we build around
                a real business, with your services, your service area and your customers.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={bwe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[56px] cursor-pointer items-center justify-center gap-2.5 rounded-full bg-bwe-ink px-7 py-4 font-display font-semibold text-bwe-cream transition-all duration-200 hover:bg-bwe-clay active:scale-[0.97]"
                >
                  {bwe.primaryCta}
                  <Icon
                    name="arrowRight"
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href={bwe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[56px] cursor-pointer items-center justify-center rounded-full border border-bwe-ink/20 px-7 py-4 font-display font-semibold text-bwe-ink transition-colors duration-200 hover:border-bwe-ink/50 hover:bg-bwe-ink/5"
                >
                  {bwe.secondaryCta}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
