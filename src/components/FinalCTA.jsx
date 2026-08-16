import { company, finalCta } from '../data/site'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'

/**
 * The last HVAC-branded conversion moment before the page hands off to the
 * Business Web Express section. A second full-bleed colour commitment (the
 * first is `EmergencyCTA`), but in the brand's own amber rather than the
 * alert red, and asymmetric — headline left, trust list breaking out as a
 * separate right-hand column — rather than the centered stack used
 * everywhere else. That contrast is what keeps the dark BWE break after it
 * reading as intentional rather than more of the same.
 */
export default function FinalCTA({ onSchedule }) {
  return (
    <section
      id="final-cta"
      className="relative isolate overflow-clip bg-sun-deep py-20 sm:py-28"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-16 hidden font-display text-[20rem] leading-none font-bold text-[#2a1b04]/10 select-none lg:block"
      >
        24/7
      </span>

      <div className="u-container relative">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <div>
            <Reveal
              as="h2"
              className="text-[clamp(2.25rem,6vw,4rem)] font-bold text-[#2a1b04]"
              style={{ letterSpacing: '-0.03em' }}
            >
              {finalCta.title}
            </Reveal>
            <Reveal delay={80} as="p" className="mt-5 max-w-lg text-lg leading-relaxed text-[#2a1b04]/75">
              {finalCta.sub}
            </Reveal>

            <Reveal delay={160} className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={onSchedule}
                iconRight="arrowRight"
                style={{ background: '#2a1b04', color: '#fff' }}
              >
                {finalCta.primaryCta.label}
              </Button>
              <Button
                as="a"
                href={company.phoneHref}
                variant="outline"
                size="lg"
                icon="phone"
                className="hover:!bg-[#2a1b04]/10"
                style={{ borderColor: 'rgba(42,27,4,0.35)', background: 'transparent', color: '#2a1b04' }}
              >
                {finalCta.secondaryCta.label}
              </Button>
            </Reveal>
          </div>

          {/* Trust list as a distinct right-hand block, not a centered row
              under the headline — the asymmetry is the point. */}
          <Reveal delay={230} className="border-t border-[#2a1b04]/20 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <ul className="grid gap-3">
              {finalCta.trust.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-[#2a1b04]/85">
                  <Icon name="check" size={16} className="shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
