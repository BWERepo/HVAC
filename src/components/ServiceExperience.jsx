import { usePrefersReducedMotion } from '../lib/hooks'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Scene from './ui/Scene'

const accentVar = {
  cool: 'var(--color-cool)',
  warm: 'var(--color-warm)',
  fresh: 'var(--color-fresh)',
}

const sceneFor = {
  cooling: 'interior',
  heating: 'home',
  'air-quality': 'air',
}

const altFor = {
  cooling: 'Illustration of conditioned air moving evenly through a living space',
  heating: 'Illustration of a home at dusk with warm interior lighting',
  'air-quality': 'Illustration of airborne particles being captured by filtration media',
}

/**
 * Airborne particles drifting into the filter and disappearing. Deliberately
 * few and slow — it should read as "air being cleaned", not as a screensaver.
 */
function ParticleFilter() {
  const reduced = usePrefersReducedMotion()
  if (reduced) return null

  const particles = Array.from({ length: 16 }, (_, i) => ({
    key: i,
    top: `${(i * 37) % 92 + 4}%`,
    size: 3 + ((i * 5) % 4),
    delay: (i * 0.73) % 11,
    duration: 9 + ((i * 3) % 5),
  }))

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.key}
          className="absolute left-0 rounded-full bg-warm"
          style={{
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `pc-filter ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      {/* The filter media itself */}
      <div
        className="absolute inset-y-0 left-[58%] w-px bg-fresh/40"
        style={{ boxShadow: '0 0 24px 2px color-mix(in oklab, var(--color-fresh) 35%, transparent)' }}
      />
    </div>
  )
}

export default function ServiceExperience({ service, index, onSchedule }) {
  const accent = accentVar[service.accent]
  const flipped = index % 2 === 1

  return (
    <section
      id={service.id}
      className="relative isolate overflow-clip py-20 sm:py-28 lg:py-36"
      style={{ '--sect-accent': accent }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          background: `radial-gradient(55% 50% at ${
            flipped ? '80%' : '20%'
          } 45%, var(--sect-accent) 0%, transparent 68%)`,
        }}
      />

      <div className="u-container">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
            flipped ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* ---- Artwork ---- */}
          <Reveal y={30}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-lift">
              <Scene
                variant={sceneFor[service.id]}
                alt={altFor[service.id]}
                ratio="4 / 3"
              />
              {service.id === 'air-quality' && <ParticleFilter />}

              {/* Cooling gets drifting air currents over the art. */}
              {service.id === 'cooling' && (
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 600 450"
                  preserveAspectRatio="none"
                >
                  <g fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round">
                    {[110, 200, 290].map((y, i) => (
                      <path
                        key={y}
                        d={`M-20 ${y} q150-40 300 0 t320 0`}
                        strokeOpacity={0.45 - i * 0.1}
                        strokeDasharray="90 260"
                        style={{ animation: `pc-airflow 11s linear ${i * 2.2}s infinite` }}
                      />
                    ))}
                  </g>
                </svg>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-base/60 to-transparent"
              />
            </div>
          </Reveal>

          {/* ---- Content ---- */}
          <div>
            <Reveal as="p" className="eyebrow mb-5" style={{ color: accent }}>
              {service.focus}
            </Reveal>

            <Reveal
              as="h2"
              delay={70}
              className="text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] font-bold tracking-[-0.04em]"
            >
              <span
                style={{
                  background: `linear-gradient(140deg, var(--color-ink) 20%, ${accent} 95%)`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {service.headline}
              </span>
            </Reveal>

            <Reveal as="p" delay={130} className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
              {service.blurb}
            </Reveal>

            {/* A list, not a grid of cards — this reads as a capability set. */}
            <ul className="mt-10 max-w-lg">
              {service.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={180 + i * 55}
                  className="group flex items-center gap-4 border-t border-white/10 py-4 last:border-b"
                >
                  <span
                    className="tnum font-display text-xs font-semibold tabular-nums"
                    style={{ color: accent }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-[1.05rem] font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
                    {item}
                  </span>
                  <Icon
                    name="check"
                    size={17}
                    className="opacity-30 transition-opacity group-hover:opacity-70"
                    style={{ color: accent }}
                  />
                </Reveal>
              ))}
            </ul>

            <Reveal delay={460} className="mt-10">
              <Button
                variant={service.accent === 'warm' ? 'warm' : service.accent === 'fresh' ? 'fresh' : 'primary'}
                size="lg"
                onClick={onSchedule}
                iconRight="arrowRight"
              >
                {service.cta}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
