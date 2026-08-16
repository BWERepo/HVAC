import { googleReviews, stats, trustIndicators } from '../data/site'
import { useCountUp, useInView } from '../lib/hooks'
import Icon, { GoogleGIcon } from './ui/Icon'
import Reveal from './ui/Reveal'

/** Compact Google trust badge — reuses the star-rating treatment from
 *  Testimonials rather than introducing a new visual language, and stays a
 *  small inline strip rather than a full section with its own heading. */
function GoogleBadge() {
  return (
    <Reveal
      as="a"
      href={googleReviews.href}
      aria-label={googleReviews.ariaLabel}
      delay={trustIndicators.length * 60}
      className="mx-auto mt-8 flex w-fit items-center gap-2.5 rounded-full border border-line bg-surface/80 px-4 py-2 shadow-soft transition-colors hover:border-line-strong"
    >
      <GoogleGIcon size={18} />
      <span className="tnum font-display text-sm font-bold text-ink">{googleReviews.rating}</span>
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Icon key={i} name="star" size={13} className="text-sun" strokeWidth={1.4} style={{ fill: 'var(--color-sun)' }} />
        ))}
      </span>
      <span className="text-xs font-medium text-ink-faint">
        {googleReviews.reviewCount} Google reviews
      </span>
    </Reveal>
  )
}

function Stat({ stat, active, index }) {
  const value = useCountUp(stat.value ?? 0, {
    active: active && stat.value != null,
    duration: 1700 + index * 120,
    decimals: stat.decimals ?? 0,
  })

  const display =
    stat.display ?? `${stat.decimals ? value.toFixed(stat.decimals) : Math.round(value)}${stat.suffix ?? ''}`

  return (
    <div
      className="relative flex flex-col items-center px-4 text-center transition-all duration-700"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'none' : 'translate3d(0, 18px, 0)',
        transitionDelay: `${index * 110}ms`,
      }}
    >
      <span className="tnum font-display text-[clamp(2.75rem,7vw,4.5rem)] leading-none font-bold tracking-tight">
        <span
          style={{
            background:
              'linear-gradient(150deg, var(--color-ink) 10%, var(--color-sun-deep) 95%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {display}
        </span>
      </span>

      {stat.stars && (
        <span className="mt-3 flex gap-1" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              name="star"
              size={15}
              className="text-sun"
              strokeWidth={1.4}
              style={{ fill: 'var(--color-sun)' }}
            />
          ))}
        </span>
      )}

      <span className="mt-4 max-w-[12rem] text-sm leading-snug font-medium text-ink-soft">
        {stat.label}
      </span>
    </div>
  )
}

/**
 * Two tiers: a clean horizontal row of icon-driven trust indicators (no
 * fabricated numbers, so no sample-content label needed) sits above the
 * animated invented stats, which keep their existing disclosure.
 */
export default function TrustStats() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <section ref={ref} className="relative isolate overflow-clip border-y border-line py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            'radial-gradient(50% 100% at 50% 50%, color-mix(in oklab, var(--color-cool) 22%, transparent), transparent 70%)',
        }}
      />

      <div className="u-container">
        {/* Horizontal icon-driven trust row */}
        <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-5 sm:gap-x-12">
          {trustIndicators.map((item, i) => (
            <Reveal key={item.label} delay={i * 60} as="li" className="flex items-center gap-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cool/12 text-cool-deep transition-transform duration-300 hover:scale-110">
                <Icon name={item.icon} size={17} />
              </span>
              <span className="text-sm font-semibold text-ink-soft sm:text-[0.95rem]">
                {item.label}
              </span>
            </Reveal>
          ))}
        </ul>

        <GoogleBadge />

        <div className="mx-auto mt-14 max-w-4xl border-t border-line pt-14">
          <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Stat key={stat.label} stat={stat} active={inView} index={i} />
            ))}
          </div>

          {/* Required honesty: these numbers are invented for the demonstration. */}
          <p className="mt-14 text-center text-xs tracking-[0.12em] text-ink-faint/70 uppercase">
            Sample demonstration content
          </p>
        </div>
      </div>
    </section>
  )
}
