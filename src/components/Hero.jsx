import { useEffect, useState } from 'react'
import { company, hero } from '../data/site'
import { useCountUp, usePrefersReducedMotion } from '../lib/hooks'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Scene from './ui/Scene'

/** Small parallax offset driven by scroll. Disabled entirely for reduced motion. */
function useParallax(strength = 0.18) {
  const reduced = usePrefersReducedMotion()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (reduced) return
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        // Only the first viewport matters — stop doing work past it.
        const y = Math.min(window.scrollY, window.innerHeight)
        setOffset(y * strength)
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [strength, reduced])

  return offset
}

/** Drifting air currents. Four paths, transform/opacity only. */
function Airflow() {
  const reduced = usePrefersReducedMotion()
  if (reduced) return null

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g fill="none" stroke="var(--color-cool)" strokeWidth="1.6" strokeLinecap="round">
        {[
          { d: 'M-50 210 q220-70 440 0 t440 0 t420 0', delay: 0, o: 0.6 },
          { d: 'M-50 330 q240-80 480 0 t480 0 t380 0', delay: 2.6, o: 0.45 },
          { d: 'M-50 470 q200-64 400 0 t400 0 t460 0', delay: 5.1, o: 0.38 },
          { d: 'M-50 610 q260-70 520 0 t520 0 t300 0', delay: 7.4, o: 0.3 },
        ].map((line) => (
          <path
            key={line.d}
            d={line.d}
            strokeOpacity={line.o}
            strokeDasharray="120 340"
            style={{
              animation: `pc-airflow 13s linear ${line.delay}s infinite`,
            }}
          />
        ))}
      </g>
    </svg>
  )
}

/** The hero thermostat: settles on 72° shortly after load. */
function ThermostatReadout() {
  const reduced = usePrefersReducedMotion()
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setArmed(true), reduced ? 0 : 450)
    return () => clearTimeout(t)
  }, [reduced])

  // Climbs the last few degrees rather than counting from zero — a thermostat
  // settling, not a scoreboard.
  const span = 6
  const climbed = useCountUp(span, { duration: 2400, active: armed })
  const temp = Math.round(hero.targetTemp - span + climbed)

  return (
    <div className="glass relative w-full max-w-sm rounded-[2rem] p-8 shadow-lift">
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-[2rem] opacity-60"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, var(--color-sun) 26%, transparent), transparent 62%)',
        }}
      />

      <div className="relative flex items-center justify-between">
        <span className="eyebrow">Living Room</span>
        <span className="flex items-center gap-1.5 text-[0.7rem] font-medium text-fresh-deep">
          <span className="relative flex size-1.5">
            <span
              className="absolute inline-flex size-full rounded-full bg-fresh"
              style={{ animation: reduced ? undefined : 'pc-pulse-ring 2.4s ease-out infinite' }}
            />
            <span className="relative inline-flex size-1.5 rounded-full bg-fresh" />
          </span>
          Cooling
        </span>
      </div>

      <div className="relative mt-6 flex items-start justify-center">
        <span className="tnum font-display text-[7rem] leading-[0.85] font-light tracking-tighter text-ink">
          {temp}
        </span>
        <span className="mt-3 font-display text-4xl font-light text-cool-deep">°</span>
      </div>

      <p className="relative mt-4 text-center text-sm text-ink-soft">{hero.tempCaption}</p>

      {/* Dial track — visual only; the real interactive control is further down. */}
      <div className="relative mt-7 h-1.5 overflow-hidden rounded-full bg-sunk-deep">
        <div
          className="h-full rounded-full bg-linear-to-r from-cool to-fresh transition-[width] duration-1000 ease-out"
          style={{ width: armed ? '58%' : '30%' }}
        />
      </div>
      <div className="relative mt-2 flex justify-between text-[0.68rem] text-ink-faint">
        <span>65°</span>
        <span>80°</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const parallax = useParallax(0.18)

  return (
    <section id="top" className="relative isolate flex min-h-dvh flex-col justify-center overflow-clip pt-10 pb-24 sm:pt-16">
      {/* --- Background stack --- */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 scale-110"
          style={{ transform: `translate3d(0, ${parallax}px, 0) scale(1.1)` }}
        >
          <Scene variant="home" ratio="auto" className="h-full" priority />
        </div>

        {/* Legibility scrim — the headline must never fight the artwork. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-canvas/60 via-canvas/45 to-canvas"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-canvas/95 via-canvas/70 to-transparent"
        />

        <Airflow />

        {/* A single confident block of brand colour, not an ambient blur —
            it reads as an intentional editorial accent rather than a glow. */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 h-full w-[38%] opacity-[0.14]"
          style={{
            background: 'linear-gradient(200deg, var(--color-sun) 0%, transparent 62%)',
            clipPath: 'polygon(100% 0, 100% 100%, 30% 100%, 62% 0)',
          }}
        />
      </div>

      {/* Oversized ghost numeral — an editorial type moment bleeding off the
          left edge, deliberately larger than anything else on the page. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -left-10 -z-[5] hidden font-display text-[26rem] leading-none font-bold text-ink/[0.035] select-none sm:block"
      >
        72°
      </span>

      <div className="u-container">
        <div className="grid items-center gap-14 lg:grid-cols-[1.32fr_0.68fr] lg:gap-8">
          <div className="relative border-l-4 border-sun-deep/70 pl-6 sm:pl-8">
            <p
              className="eyebrow mb-6"
              style={{
                animation: reduced ? undefined : 'pc-rise 700ms var(--ease-out-soft) both',
              }}
            >
              {company.region.replace('the ', '')} · Since day one
            </p>

            <h1
              className="text-[clamp(2.6rem,7.6vw,5.75rem)] font-bold"
              style={{ letterSpacing: '-0.045em' }}
            >
              {hero.headline.map((line, i) => (
                <span
                  key={line}
                  className="block"
                  style={{
                    animation: reduced
                      ? undefined
                      : `pc-rise 900ms var(--ease-out-soft) ${120 + i * 130}ms both`,
                    color: i === 1 ? 'var(--color-sun-deep)' : undefined,
                  }}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl"
              style={{
                animation: reduced
                  ? undefined
                  : 'pc-rise 900ms var(--ease-out-soft) 560ms both',
              }}
            >
              {hero.sub}
            </p>

            <p
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-alert-deep uppercase"
              style={{
                animation: reduced
                  ? undefined
                  : 'pc-rise 900ms var(--ease-out-soft) 630ms both',
              }}
            >
              <Icon name="alert" size={16} />
              {hero.emergencyLine}
            </p>

            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{
                animation: reduced
                  ? undefined
                  : 'pc-rise 900ms var(--ease-out-soft) 700ms both',
              }}
            >
              <Button as="a" href={hero.primaryCta.href} size="lg" iconRight="arrowRight">
                {hero.primaryCta.label}
              </Button>
              <Button as="a" href={company.phoneHref} variant="outline" size="lg" icon="phone">
                {hero.secondaryCta.label}
              </Button>
            </div>

            <a
              href={company.phoneHref}
              className="tnum mt-6 inline-block text-2xl font-bold text-ink transition-colors hover:text-sun-deep sm:text-3xl"
              style={{
                animation: reduced
                  ? undefined
                  : 'pc-rise 900ms var(--ease-out-soft) 770ms both',
              }}
            >
              {company.phone}
            </a>

            <ul
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-faint"
              style={{
                animation: reduced
                  ? undefined
                  : 'pc-rise 900ms var(--ease-out-soft) 840ms both',
              }}
            >
              {hero.serviceLine.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="text-sun-deep/50">•</span>}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex justify-center lg:translate-y-8 lg:justify-end lg:-rotate-1"
            style={{
              animation: reduced ? undefined : 'pc-rise 1000ms var(--ease-out-soft) 420ms both',
            }}
          >
            <ThermostatReadout />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#thermostat"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 rounded-full px-4 py-2 text-[0.7rem] tracking-[0.18em] text-ink-faint uppercase transition-colors hover:text-ink sm:flex"
      >
        Explore
        <Icon name="chevronDown" size={18} className="text-cool-deep" />
      </a>
    </section>
  )
}
