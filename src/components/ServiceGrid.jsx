import { serviceCatalog } from '../data/site'
import { useScrollTo } from '../lib/hooks'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

const accentVar = {
  cool: 'var(--color-cool)',
  warm: 'var(--color-warm)',
  fresh: 'var(--color-fresh)',
  alert: 'var(--color-alert)',
}
const accentDeep = {
  cool: 'var(--color-cool-deep)',
  warm: 'var(--color-warm-deep)',
  fresh: 'var(--color-fresh-deep)',
  alert: 'var(--color-alert-deep)',
}

/**
 * Full catalog as a dense, asymmetric bento grid — deliberately not the
 * equal-size card treatment used elsewhere. `lg` items span two columns on
 * desktop so the grid reads as curated rather than templated.
 */
export default function ServiceGrid() {
  const scrollTo = useScrollTo()

  return (
    <Section id="all-services" accent="cool" glow={false} className="border-t border-line">
      <SectionHeading
        eyebrow="The full picture"
        title="Every System, In One Place."
        sub="Cooling, heating and air quality in more depth than a quick look — here’s the full range we cover, side by side."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[13rem]">
        {serviceCatalog.map((item, i) => {
          const accent = accentVar[item.accent]
          const deep = accentDeep[item.accent]
          const span = item.size === 'lg' ? 'lg:col-span-2' : 'lg:col-span-1'
          const filled = item.id === 'catalog-emergency'

          // Three distinct card languages by role, not one card component
          // reskinned: the emergency slot commits fully to solid colour and
          // sharp corners; the other `lg` slots stay sharp-cornered with a
          // heavier border; the `md` slots are softly rounded and tinted.
          const shell = filled
            ? 'rounded-lg border-0 text-white shadow-[0_20px_48px_-18px_rgba(0,0,0,0.45)]'
            : item.size === 'lg'
              ? 'rounded-lg border-2 border-line-strong bg-surface shadow-soft hover:border-transparent'
              : 'rounded-[1.75rem] border border-line/70 shadow-soft hover:border-transparent'

          return (
            <Reveal key={item.id} delay={i * 55} className={span}>
              <button
                type="button"
                onClick={() => scrollTo(item.href)}
                className={`group relative flex h-full w-full flex-col justify-between overflow-hidden p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift focus-visible:-translate-y-1.5 ${shell}`}
                style={{
                  '--card-accent': accent,
                  background: filled
                    ? `linear-gradient(155deg, ${deep} 0%, color-mix(in oklab, ${deep} 78%, black) 100%)`
                    : item.size === 'md'
                      ? `color-mix(in oklab, ${accent} 6%, var(--color-surface))`
                      : undefined,
                }}
              >
                {!filled && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                    style={{ background: accent }}
                  />
                )}

                <div className="relative flex items-start justify-between">
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                      filled ? 'bg-white/15 text-white' : ''
                    }`}
                    style={
                      filled
                        ? undefined
                        : { background: `color-mix(in oklab, ${accent} 16%, transparent)`, color: deep }
                    }
                  >
                    <Icon name={item.icon} size={22} />
                  </span>
                  <Icon
                    name="arrowRight"
                    size={18}
                    className={`opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 ${
                      filled ? 'text-white' : 'text-ink-faint'
                    }`}
                    style={filled ? undefined : { color: deep }}
                  />
                </div>

                <div className="relative mt-6">
                  <h3
                    className={`font-display text-lg font-semibold ${filled ? 'text-white' : 'text-ink'}`}
                  >
                    {item.title}
                  </h3>
                  <p className={`mt-1.5 text-sm leading-relaxed ${filled ? 'text-white/75' : 'text-ink-soft'}`}>
                    {item.what}
                  </p>
                  <p
                    className={`mt-3 text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                      filled ? 'text-white' : ''
                    }`}
                    style={filled ? undefined : { color: deep }}
                  >
                    {item.benefit}
                  </p>
                </div>

                <span
                  className={`relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${
                    filled ? 'text-white' : ''
                  }`}
                  style={filled ? undefined : { color: deep }}
                >
                  {item.cta}
                  <Icon
                    name="arrowRight"
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </button>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
