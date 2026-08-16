import { stats } from '../data/site'
import { useCountUp, useInView } from '../lib/hooks'
import Icon from './ui/Icon'

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

export default function TrustStats() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <section ref={ref} className="relative isolate overflow-clip border-y border-line py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            'radial-gradient(50% 100% at 50% 50%, color-mix(in oklab, var(--color-cool) 22%, transparent), transparent 70%)',
        }}
      />

      <div className="u-container">
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
    </section>
  )
}
