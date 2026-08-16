import { useEffect, useState } from 'react'
import heroFamilyPhoto from '../assets/hero-family.jpg'
import { company, hero } from '../data/site'
import { usePrefersReducedMotion } from '../lib/hooks'
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

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const parallax = useParallax(0.18)

  return (
    <section id="top" className="relative isolate flex min-h-[88dvh] flex-col justify-center overflow-clip pt-2 pb-16 sm:pt-4">
      {/* --- Background stack --- */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 scale-110"
          style={{ transform: `translate3d(0, ${parallax}px, 0) scale(1.1)` }}
        >
          <Scene
            variant="home"
            ratio="auto"
            className="h-full opacity-55"
            priority
            src={heroFamilyPhoto}
            alt="A happy family relaxing together at home — sample demonstration photography, not the actual business."
          />
        </div>

        {/* Legibility scrim — solid only behind the text column on the left,
            clearing quickly so the photo reads clearly on the right two
            thirds of the hero rather than washing out everywhere. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, var(--color-canvas) 0%, var(--color-canvas) 18%, color-mix(in oklab, var(--color-canvas) 30%, transparent) 34%, transparent 52%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-canvas/10 via-transparent to-canvas/55"
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
        <div className="max-w-3xl">
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
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5"
              style={{
                animation: reduced
                  ? undefined
                  : 'pc-rise 900ms var(--ease-out-soft) 840ms both',
              }}
            >
              {hero.proofLine.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                  <Icon name="check" size={15} className="shrink-0 text-fresh-deep" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
