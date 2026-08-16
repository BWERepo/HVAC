import calebPhoto from '../assets/team/caleb.jpg'
import ninaPhoto from '../assets/team/nina.jpg'
import priyaPhoto from '../assets/team/priya.jpg'
import rayPhoto from '../assets/team/ray.jpg'
import { team } from '../data/site'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

// Real headshots for this demo, keyed by name so `site.js` stays plain data
// (see Hero.jsx's `heroFamilyPhoto` import for the same pattern).
const photosByName = {
  'Ray Alvarez': rayPhoto,
  'Nina Okafor': ninaPhoto,
  'Caleb Voss': calebPhoto,
  'Priya Raman': priyaPhoto,
}

/**
 * No staff photography ships with this demo, so each person gets a small
 * monogram badge built from the palette. Swapping in real headshots means
 * importing each file (see Hero.jsx's `heroFamilyPhoto` for the pattern),
 * setting it on the matching `team` entry's `photo` field in site.js, and
 * this component renders it in place of the monogram automatically.
 */
function Portrait({ photo, initials, name, index }) {
  const tints = ['var(--color-cool)', 'var(--color-fresh)', 'var(--color-sun)', 'var(--color-warm)']
  const tint = tints[index % tints.length]

  if (photo) {
    return (
      <img
        src={photo}
        alt={`Headshot of ${name} — sample demonstration photography, not the actual business.`}
        className="size-16 shrink-0 rounded-full object-cover sm:size-[4.5rem]"
      />
    )
  }

  return (
    <div
      className="flex size-16 shrink-0 items-center justify-center rounded-full sm:size-[4.5rem]"
      aria-hidden="true"
      style={{
        background: `radial-gradient(120% 120% at 30% 20%, color-mix(in oklab, ${tint} 26%, transparent), var(--color-surface) 75%)`,
      }}
    >
      <span className="font-display text-lg font-semibold" style={{ color: tint }}>
        {initials}
      </span>
    </div>
  )
}

export default function TeamSection() {
  return (
    <Section id="team" accent="cool" className="border-t border-line">
      <SectionHeading
        eyebrow="The people"
        title="The Crew Behind the Work."
        sub="Smart equipment is only as good as the people who size, install and service it."
      />

      <ul className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-8">
        {team.map((person, i) => (
          <Reveal key={person.name} delay={i * 80} as="li">
            <div className="flex items-center gap-4">
              <Portrait
                photo={person.photo ?? photosByName[person.name]}
                initials={person.initials}
                name={person.name}
                index={i}
              />
              <div>
                <p className="font-display text-base font-semibold text-ink">{person.name}</p>
                <p className="text-sm font-medium text-cool-deep">{person.role}</p>
                <p className="text-xs text-ink-faint">{person.experience} experience</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <p className="mt-10 text-center text-xs tracking-[0.12em] text-ink-faint/70 uppercase">
        Sample demonstration content
      </p>
    </Section>
  )
}
