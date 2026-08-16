import { useState } from 'react'
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
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = service.items[activeIndex]

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
            <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-lift">
              <Scene
                // `activeItem.src`/`activeItem.alt` are the per-item photography
                // slot: once real photos are sourced, add `src`/`alt` to each
                // entry in `services[].items` in site.js and this swaps to a
                // real <img> automatically, per hovered/focused item, with no
                // layout change required.
                variant={sceneFor[service.id]}
                src={activeItem.src}
                alt={activeItem.alt || altFor[service.id]}
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
                className="absolute inset-0 bg-linear-to-t from-canvas/60 to-transparent"
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

            {/* An interactive showcase, not a static menu — hovering or
                focusing an item highlights it and reveals its one-line
                detail below the list. */}
            <ul className="mt-10 max-w-lg">
              {service.items.map((item, i) => {
                const isActive = activeIndex === i
                return (
                  <Reveal as="li" key={item.label} delay={180 + i * 55}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onFocus={() => setActiveIndex(i)}
                      className="group flex w-full cursor-pointer items-center gap-4 border-t border-line py-4 text-left last:border-b"
                    >
                      <span
                        className="tnum font-display text-xs font-semibold tabular-nums transition-opacity"
                        style={{ color: accent, opacity: isActive ? 1 : 0.55 }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="flex-1 text-[1.05rem] transition-all duration-300"
                        style={{
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? accent : undefined,
                          transform: isActive ? 'translateX(4px)' : undefined,
                        }}
                      >
                        {item.label}
                      </span>
                      <Icon
                        name="check"
                        size={17}
                        className="transition-opacity"
                        style={{ color: accent, opacity: isActive ? 0.85 : 0.3 }}
                      />
                    </button>
                  </Reveal>
                )
              })}
            </ul>

            {/* Reveal panel for the active item's detail — same element for
                hover and keyboard focus, so this is never mouse-only. */}
            <p
              aria-live="polite"
              className="mt-4 min-h-[1.5em] max-w-lg text-sm leading-relaxed text-ink-soft"
            >
              <span className="font-semibold" style={{ color: accent }}>
                {activeItem.label}:{' '}
              </span>
              {activeItem.detail}
            </p>

            <Reveal delay={460} className="mt-10">
              <Button
                variant={service.accent === 'warm' ? 'warm' : service.accent === 'fresh' ? 'fresh' : 'primary'}
                size="lg"
                onClick={onSchedule}
                iconRight="arrowRight"
                subLabel={service.ctaSub}
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
