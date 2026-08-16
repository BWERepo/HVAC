import { team } from '../data/site'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

/**
 * No staff photography ships with this demo, so each person gets a monogram
 * portrait built from the palette. Swapping in real headshots means adding a
 * `photo` field to the team data and rendering it here — nothing else changes.
 */
function Portrait({ initials, index }) {
  const tints = ['var(--color-cool)', 'var(--color-fresh)', 'var(--color-sun)', 'var(--color-warm)']
  const tint = tints[index % tints.length]

  return (
    <div
      className="relative flex aspect-4/5 w-full items-center justify-center overflow-hidden rounded-2xl"
      aria-hidden="true"
      style={{
        background: `radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, ${tint} 22%, transparent), var(--color-surface) 70%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `repeating-linear-gradient(115deg, transparent 0 22px, color-mix(in oklab, ${tint} 7%, transparent) 22px 23px)`,
        }}
      />
      <span
        className="relative font-display text-6xl font-light tracking-tight"
        style={{ color: tint }}
      >
        {initials}
      </span>
      <span
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: 'linear-gradient(to top, var(--color-surface), transparent)' }}
      />
    </div>
  )
}

export default function TeamSection() {
  return (
    <Section id="team" accent="cool">
      <SectionHeading
        eyebrow="The people"
        title="Technology Makes Us Smarter. People Make Us Better."
        sub="Smart equipment is only as good as the crew that sizes, installs and services it."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((person, i) => (
          <Reveal key={person.name} delay={i * 90}>
            <article className="group h-full rounded-[var(--radius-card)] border border-line bg-sunk/70 p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:bg-sunk">
              <Portrait initials={person.initials} index={i} />

              <div className="px-2 pt-5 pb-3">
                <h3 className="font-display text-lg font-semibold text-ink">{person.name}</h3>
                <p className="mt-1 text-sm font-medium text-cool-deep">{person.role}</p>

                <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
                  <Icon name="clock" size={13} />
                  {person.experience}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{person.bio}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-center text-xs tracking-[0.12em] text-ink-faint/70 uppercase">
        Sample demonstration content
      </p>
    </Section>
  )
}
