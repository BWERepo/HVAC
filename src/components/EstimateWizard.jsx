import { useState } from 'react'
import { wizard, wizardRecommendations } from '../data/site'
import { usePrefersReducedMotion, useScrollTo } from '../lib/hooks'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

export default function EstimateWizard() {
  const reduced = usePrefersReducedMotion()
  const scrollTo = useScrollTo()

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [direction, setDirection] = useState(1)

  const total = wizard.steps.length
  const done = step >= total
  const current = wizard.steps[step]

  const choose = (value) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }))
    setDirection(1)
    setStep((s) => s + 1)
  }

  const back = () => {
    setDirection(-1)
    setStep((s) => Math.max(0, s - 1))
  }

  const restart = () => {
    setDirection(-1)
    setAnswers({})
    setStep(0)
  }

  const recommendation =
    wizardRecommendations[answers.priority] ??
    'a properly sized, high-efficiency system may be worth considering.'

  // Forward steps enter from the right, Back enters from the left, so the
  // motion always matches the direction of travel.
  const stepAnimation = reduced
    ? undefined
    : `${direction > 0 ? 'pc-from-right' : 'pc-from-left'} 320ms var(--ease-out-soft) both`

  return (
    <Section id="estimate" accent="cool">
      <SectionHeading eyebrow="60-second check" title={wizard.title} sub={wizard.sub} />

      <Reveal delay={140} className="mx-auto mt-14 w-full max-w-3xl">
        <div className="glass rounded-[var(--radius-card)] p-6 shadow-lift sm:p-10">
          {/* Progress */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-display font-semibold text-ink">
                {done ? 'Your recommendation' : `Step ${step + 1} of ${total}`}
              </span>
              {!done && step > 0 && (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-ink-soft transition-colors hover:text-ink"
                >
                  <Icon name="chevronLeft" size={15} />
                  Back
                </button>
              )}
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-sunk-deep"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={Math.min(step, total)}
              aria-label="Estimate progress"
            >
              <div
                className="h-full rounded-full bg-linear-to-r from-cool-deep to-cool transition-[width] duration-500 ease-out"
                style={{ width: `${(Math.min(step, total) / total) * 100}%` }}
              />
            </div>
          </div>

          <div>
            {!done ? (
              <div key={current.id} style={{ animation: stepAnimation }}>
                <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {current.question}
                </h3>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {current.options.map((option) => {
                    const isSelected = answers[current.id] === option
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => choose(option)}
                        className={`group flex min-h-[56px] cursor-pointer items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-cool bg-cool/10'
                            : 'border-line bg-sunk/70 hover:border-cool hover:bg-sunk'
                        }`}
                      >
                        <span className="font-medium text-ink">{option}</span>
                        <Icon
                          name="arrowRight"
                          size={17}
                          className="text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:text-cool-deep"
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div key="result" style={{ animation: stepAnimation }}>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-fresh/15 text-fresh-deep">
                    <Icon name="check" size={22} />
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    Here’s a starting point
                  </h3>
                </div>

                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  Based on your answers,{' '}
                  <span className="font-semibold text-ink">{recommendation}</span>
                </p>

                {/* Answer recap — shows the owner how the lead arrives qualified. */}
                <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-sunk-deep sm:grid-cols-2">
                  {wizard.steps.map((s) => (
                    <div key={s.id} className="bg-surface px-5 py-4">
                      <dt className="text-xs tracking-wide text-ink-faint uppercase">
                        {s.question.replace(/\?$/, '')}
                      </dt>
                      <dd className="mt-1 font-medium text-ink">{answers[s.id] ?? '—'}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 rounded-xl border border-line bg-sunk/70 p-4 text-sm leading-relaxed text-ink-faint">
                  This is a general direction, not a quote. Accurate pricing needs a load
                  calculation and a look at your existing equipment and ductwork — which is
                  exactly what the estimate visit is for.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" onClick={() => scrollTo('#lead-form')} iconRight="arrowRight">
                    Request My Personalized Estimate
                  </Button>
                  <Button variant="ghost" size="lg" onClick={restart}>
                    Start over
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
