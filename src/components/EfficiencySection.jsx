import { efficiency } from '../data/site'
import { useCountUp, useInView } from '../lib/hooks'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

function Meter({ label, value, active, accent, delay }) {
  const shown = useCountUp(value, { active, duration: 1500 })

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="font-display font-semibold text-ink">{label}</span>
        <span className="tnum font-display text-2xl font-bold" style={{ color: accent }}>
          {Math.round(shown)}
          <span className="ml-0.5 text-sm font-medium opacity-70">units</span>
        </span>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full transition-[width] duration-1000 ease-out"
          style={{
            width: active ? `${value}%` : '0%',
            transitionDelay: `${delay}ms`,
            background: `linear-gradient(90deg, color-mix(in oklab, ${accent} 45%, transparent), ${accent})`,
            boxShadow: `0 0 26px -6px ${accent}`,
          }}
        />
      </div>
    </div>
  )
}

export default function EfficiencySection({ onSchedule }) {
  const [ref, inView] = useInView({ threshold: 0.35 })
  const delta = efficiency.older.value - efficiency.modern.value

  return (
    <Section id="efficiency" accent="cool">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Efficiency"
            title={efficiency.title}
            sub={efficiency.sub}
          />

          <Reveal delay={200} className="mt-10">
            <Button size="lg" onClick={onSchedule} iconRight="arrowRight">
              {efficiency.cta}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div ref={ref} className="glass rounded-[var(--radius-card)] p-8 shadow-lift sm:p-10">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Energy used for the same comfort</span>
              <Icon name="gauge" size={22} className="text-cool" />
            </div>

            <div className="mt-8 space-y-8">
              <Meter
                label={efficiency.older.label}
                value={efficiency.older.value}
                accent="var(--color-warm)"
                active={inView}
                delay={0}
              />
              <Meter
                label={efficiency.modern.label}
                value={efficiency.modern.value}
                accent="var(--color-cool)"
                active={inView}
                delay={220}
              />
            </div>

            <div className="mt-9 flex items-center gap-4 rounded-2xl border border-cool/25 bg-cool/[0.07] p-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cool/15 text-cool">
                <Icon name="bolt" size={24} />
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">
                In this illustration the modern system does the same job on roughly{' '}
                <span className="font-semibold text-ink">{delta}% less</span> energy — because it
                modulates instead of running flat out every cycle.
              </p>
            </div>

            {/* Required: no unsupported savings claims. */}
            <p className="mt-5 text-xs leading-relaxed text-ink-faint">{efficiency.disclaimer}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
