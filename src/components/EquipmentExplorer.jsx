import { useState } from 'react'
import { equipment } from '../data/site'
import { usePrefersReducedMotion, useScrollTo } from '../lib/hooks'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

const accentVar = {
  cool: 'var(--color-cool)',
  warm: 'var(--color-warm)',
  fresh: 'var(--color-fresh)',
}
const accentDeep = {
  cool: 'var(--color-cool-deep)',
  warm: 'var(--color-warm-deep)',
  fresh: 'var(--color-fresh-deep)',
}

/**
 * A premium equipment explorer: one large "stage" that reveals the selected
 * system's homeowner benefits, driven by a row of pill selectors rather than
 * a grid of identical cards. Reads as a product configurator, not a spec
 * sheet — no pricing, no model numbers, just outcomes.
 */
export default function EquipmentExplorer({ onSchedule }) {
  const [activeId, setActiveId] = useState(equipment.options[0].id)
  const active = equipment.options.find((o) => o.id === activeId)
  const accent = accentVar[active.accent]
  const deep = accentDeep[active.accent]
  const scrollTo = useScrollTo()
  const reduced = usePrefersReducedMotion()

  return (
    <Section id="equipment" accent="fresh">
      <SectionHeading eyebrow="Systems" title={equipment.title} sub={equipment.sub} />

      <div className="mt-12 flex flex-wrap justify-center gap-2.5">
        {equipment.options.map((opt) => {
          const isActive = opt.id === activeId
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setActiveId(opt.id)}
              aria-pressed={isActive}
              className={`inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'border-transparent text-white shadow-lift'
                  : 'border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink'
              }`}
              style={isActive ? { background: accentVar[opt.accent] } : undefined}
            >
              <Icon name={opt.icon} size={17} />
              {opt.label}
            </button>
          )
        })}
      </div>

      <Reveal key={active.id} delay={60} className="mt-10">
        <div
          className="relative overflow-hidden rounded-[2rem] border border-line bg-linear-to-br from-surface to-sunk p-8 sm:p-12 lg:p-16"
          style={{ '--sect-accent': accent }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full opacity-30 blur-3xl"
            style={{ background: accent }}
          />

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <span
                className="flex size-16 items-center justify-center rounded-2xl"
                style={{ background: `color-mix(in oklab, ${accent} 18%, transparent)`, color: deep }}
              >
                <Icon name={active.icon} size={30} />
              </span>
              <h3 className="mt-6 font-display text-3xl font-bold text-ink sm:text-4xl">
                {active.label}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
                {active.summary}
              </p>

              <Button
                variant={active.accent}
                size="lg"
                onClick={onSchedule}
                iconRight="arrowRight"
                className="mt-8"
              >
                {equipment.cta}
              </Button>
            </div>

            <ul className="grid gap-3">
              {active.benefits.map((benefit, i) => (
                <li
                  key={benefit}
                  style={
                    reduced
                      ? undefined
                      : { animation: `pc-rise 500ms var(--ease-out-soft) ${i * 80}ms both` }
                  }
                  className="flex items-center gap-4 rounded-xl border border-line bg-surface/80 p-4"
                >
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: `color-mix(in oklab, ${accent} 18%, transparent)`, color: deep }}
                  >
                    <Icon name="check" size={16} />
                  </span>
                  <span className="font-medium text-ink">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => scrollTo('#estimate')}
            className="relative mt-10 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-ink-faint transition-colors hover:text-ink"
          >
            Not sure which fits? Get a free estimate
            <Icon name="arrowRight" size={14} />
          </button>
        </div>
      </Reveal>
    </Section>
  )
}
