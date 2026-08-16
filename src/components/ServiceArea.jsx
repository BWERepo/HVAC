import { useState } from 'react'
import { company, serviceAreas } from '../data/site'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

/**
 * Stylised map rather than a real one: the areas are fictional, so plotting
 * them on actual geography would be misleading. Pin positions are data, so a
 * real customer's towns drop straight in.
 */
const pins = [
  { x: 300, y: 170 },
  { x: 430, y: 130 },
  { x: 520, y: 240 },
  { x: 380, y: 290 },
  { x: 210, y: 300 },
  { x: 160, y: 190 },
  { x: 470, y: 350 },
  { x: 270, y: 400 },
]

export default function ServiceArea() {
  const [active, setActive] = useState(null)

  return (
    <Section id="service-area" accent="cool">
      <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Service area"
            title="Comfort Close to Home."
            sub={`Local crews, local drive times. We cover ${company.region} and the communities around it.`}
          />

          <ul className="mt-10 grid grid-cols-2 gap-2">
            {serviceAreas.map((area, i) => (
              <Reveal as="li" key={area} delay={i * 45}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                    active === i
                      ? 'border-cool bg-cool/10 text-ink'
                      : 'border-line bg-sunk/70 text-ink-soft hover:border-line-strong'
                  }`}
                >
                  <Icon
                    name="mapPin"
                    size={17}
                    className={active === i ? 'text-cool-deep' : 'text-ink-faint'}
                  />
                  <span className="text-[0.95rem] font-medium">{area}</span>
                </button>
              </Reveal>
            ))}
          </ul>

          <p className="mt-6 text-xs text-ink-faint">
            Service areas shown are placeholders for this demonstration.
          </p>
        </div>

        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-lift">
            <svg viewBox="0 0 680 500" className="w-full" role="img" aria-label="Stylised map of the service area">
              <defs>
                <radialGradient id="area-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--color-sun)" stopOpacity=".3" />
                  <stop offset="100%" stopColor="var(--color-sun)" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="680" height="500" fill="#EAF4FA" />
              <circle cx="340" cy="250" r="230" fill="url(#area-glow)" />

              {/* Abstract road grid */}
              <g stroke="var(--color-cool)" strokeOpacity=".18" strokeWidth="1">
                {Array.from({ length: 9 }, (_, i) => (
                  <path key={`h${i}`} d={`M0 ${40 + i * 55}h680`} />
                ))}
                {Array.from({ length: 11 }, (_, i) => (
                  <path key={`v${i}`} d={`M${40 + i * 60} 0v500`} />
                ))}
              </g>

              {/* Arterials */}
              <g stroke="var(--color-cool)" strokeOpacity=".45" strokeWidth="3" fill="none">
                <path d="M-10 320 q180-70 340-40 t360-80" />
                <path d="M120 -10 q40 200 150 280 t180 240" />
              </g>

              {/* Coverage rings */}
              <g fill="none" stroke="var(--color-cool-deep)" strokeOpacity=".35" strokeDasharray="4 8">
                <circle cx="340" cy="250" r="120" />
                <circle cx="340" cy="250" r="195" />
              </g>

              {/* Pins */}
              {serviceAreas.slice(0, pins.length).map((area, i) => {
                const p = pins[i]
                const isActive = active === i
                return (
                  <g key={area} style={{ transition: 'opacity 250ms' }}>
                    {isActive && (
                      <circle cx={p.x} cy={p.y} r="26" fill="var(--color-sun)" opacity=".28" />
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 7 : 5}
                      fill={isActive ? 'var(--color-sun)' : 'var(--color-cool)'}
                      opacity={isActive ? 1 : 0.65}
                      style={{ transition: 'all 250ms var(--ease-out-soft)' }}
                    />
                    <text
                      x={p.x + 14}
                      y={p.y + 4}
                      fill="currentColor"
                      className={isActive ? 'fill-ink' : 'fill-ink-faint'}
                      fontSize="13"
                      fontFamily="Inter, sans-serif"
                      style={{ transition: 'all 250ms' }}
                    >
                      {area}
                    </text>
                  </g>
                )
              })}

              {/* Base of operations */}
              <g>
                <circle cx="340" cy="250" r="12" fill="var(--color-sun)" opacity=".35" />
                <circle cx="340" cy="250" r="6" fill="var(--color-sun-deep)" />
              </g>
            </svg>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
