import { useState } from 'react'
import { company, problems } from '../data/site'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

/**
 * The qualifying step: a homeowner who cannot name their problem still knows
 * what they are experiencing. Selecting a symptom turns a vague visit into a
 * described lead — and routes true emergencies to the phone instead of a form.
 */
export default function ProblemSelector({ onSchedule }) {
  const [selectedId, setSelectedId] = useState(null)
  const selected = problems.find((p) => p.id === selectedId) ?? null

  return (
    <Section id="diagnostic" accent="cool">
      <SectionHeading
        eyebrow="Quick help"
        title="What’s happening at your house?"
        sub="Tell us what you’re experiencing and we’ll help point you in the right direction."
      />

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {problems.map((problem, i) => {
          const isActive = selectedId === problem.id
          return (
            <Reveal key={problem.id} delay={i * 45}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedId(isActive ? null : problem.id)}
                className={`group flex h-full w-full cursor-pointer flex-col items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                  isActive
                    ? problem.emergency
                      ? 'border-alert-deep bg-alert/10'
                      : 'border-cool bg-cool/10'
                    : 'border-line bg-sunk/70 hover:-translate-y-1 hover:border-line-strong hover:bg-sunk'
                }`}
              >
                <span
                  className={`flex size-11 items-center justify-center rounded-xl transition-colors ${
                    isActive
                      ? problem.emergency
                        ? 'bg-alert/20 text-alert-deep'
                        : 'bg-cool/20 text-cool-deep'
                      : 'bg-sunk/70 text-ink-soft group-hover:text-cool-deep'
                  }`}
                >
                  <Icon name={problem.icon} size={22} />
                </span>
                <span className="font-display text-[1.05rem] leading-snug font-semibold text-ink">
                  {problem.label}
                </span>
              </button>
            </Reveal>
          )
        })}
      </div>

      {/* Contextual response — replaces in place, never reloads. */}
      <div aria-live="polite" className="mt-8">
        {selected && (
            <div
              // Keying on the answer remounts the panel, which replays the
              // entrance animation — no presence tracking required.
              key={selected.id}
              style={{ animation: 'pc-rise 340ms var(--ease-out-soft) both' }}
              className={`glass overflow-hidden rounded-[var(--radius-card)] border p-8 sm:p-10 ${
                selected.emergency ? 'border-alert-deep/50' : 'border-cool/40'
              }`}
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                <div className="flex-1">
                  {selected.emergency && (
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-alert/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-alert-deep uppercase">
                      <Icon name="alert" size={14} />
                      Emergency service
                    </span>
                  )}
                  <h3
                    className={`font-display text-2xl font-semibold sm:text-3xl ${
                      selected.emergency ? 'text-alert-deep' : 'text-ink'
                    }`}
                  >
                    {selected.verdict}
                  </h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{selected.detail}</p>
                </div>

                <div className="flex shrink-0 flex-col gap-3">
                  {selected.emergency ? (
                    <>
                      <Button
                        as="a"
                        href={company.phoneHref}
                        variant="danger"
                        size="lg"
                        icon="phone"
                      >
                        Get Emergency Help
                      </Button>
                      <p className="text-center text-xs text-ink-faint">{company.phone}</p>
                    </>
                  ) : (
                    <Button size="lg" onClick={onSchedule} iconRight="arrowRight">
                      Schedule a Technician
                    </Button>
                  )}
                </div>
              </div>
            </div>
        )}
      </div>
    </Section>
  )
}
