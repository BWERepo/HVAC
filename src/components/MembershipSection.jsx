import { membership } from '../data/site'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

const icons = ['wrench', 'clock', 'shield', 'gauge', 'wind', 'sparkle']

/**
 * Deliberately not a pricing table: no tiers, no per-month figures, no
 * "most popular" badge. It reads as a membership benefit set, and it invents
 * no prices — a real customer's plan pricing would be added here.
 */
export default function MembershipSection({ onSchedule }) {
  return (
    <Section id="membership" accent="fresh">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-linear-to-br from-surface to-sunk p-8 sm:p-12 lg:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklab, var(--color-fresh) 35%, transparent), transparent 70%)',
          }}
        />

        <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Comfort membership"
              title={membership.title}
              sub={membership.sub}
            />

            <Reveal delay={200} className="mt-9">
              <Button variant="fresh" size="lg" onClick={onSchedule} iconRight="arrowRight">
                {membership.cta}
              </Button>
            </Reveal>
          </div>

          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {membership.benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 70}>
                <div className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-fresh/15 text-fresh-deep">
                    <Icon name={icons[i % icons.length]} size={20} />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-ink">{benefit.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {benefit.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
