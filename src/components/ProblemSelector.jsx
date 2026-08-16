import { useRef, useState } from 'react'
import { company, quickHelp } from '../data/site'
import { formatPhone, validateAll, validateField } from '../lib/validation'
import Button from './ui/Button'
import Field from './ui/Field'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

const CONTACT_FIELDS = ['name', 'phone']

const EMPTY = { problemId: null, urgency: '', zip: '', name: '', phone: '' }

/**
 * The site's signature feature: a short, unmissable multi-step flow —
 * problem → urgency → ZIP → contact — that turns "I have a problem" into a
 * described, reachable lead in four taps, right under the hero.
 */
export default function ProblemSelector() {
  const [step, setStep] = useState(0) // 0 problem, 1 urgency, 2 zip, 3 contact
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const formRef = useRef(null)

  const problem = quickHelp.options.find((o) => o.id === values.problemId) ?? null
  const isUrgent = values.urgency === 'Today'
  const started = step > 0 || status === 'success'

  const chooseProblem = (id) => {
    setValues((v) => ({ ...v, problemId: id }))
    setStep(1)
  }

  const chooseUrgency = (urgency) => {
    setValues((v) => ({ ...v, urgency }))
    setStep(2)
  }

  const set = (field) => (e) => {
    const raw = e.target.value
    const value = field === 'phone' ? formatPhone(raw) : raw
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) || undefined }))
    }
  }

  const submitZip = (e) => {
    e.preventDefault()
    const message = validateField('zip', values.zip)
    if (message) {
      setErrors((prev) => ({ ...prev, zip: message }))
      return
    }
    setStep(3)
  }

  const submitContact = (e) => {
    e.preventDefault()
    const found = validateAll(values, CONTACT_FIELDS)
    setErrors(found)

    if (Object.keys(found).length) {
      const firstInvalid = CONTACT_FIELDS.find((f) => found[f])
      formRef.current?.querySelector(`[data-field="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('submitting')
    // PROTOTYPE: nothing is transmitted — no backend is configured for this
    // demonstration. Wiring this to a real CRM/dispatch endpoint is a
    // deliberate, separate step for a live build.
    setTimeout(() => setStatus('success'), 600)
  }

  const startOver = () => {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
    setStep(0)
  }

  const back = () => setStep((s) => Math.max(0, s - 1))

  return (
    <Section id="diagnostic" accent="cool">
      <SectionHeading eyebrow={quickHelp.eyebrow} title={quickHelp.title} sub={quickHelp.sub} />

      {/* Step 0 — problem selector, four big unmissable choices. */}
      {step === 0 && (
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickHelp.options.map((option, i) => (
            <Reveal key={option.id} delay={i * 70}>
              <button
                type="button"
                onClick={() => chooseProblem(option.id)}
                className="group flex h-full w-full cursor-pointer flex-col items-center gap-4 rounded-2xl border border-line bg-sunk/70 p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:bg-sunk"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-sunk/70 text-ink-soft transition-colors group-hover:bg-cool/20 group-hover:text-cool-deep">
                  <Icon name={option.icon} size={28} />
                </span>
                <span className="font-display text-lg font-semibold text-ink">{option.label}</span>
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {/* Steps 1-3 and the success state share one panel that replaces in
          place — never a page reload, never a jump. */}
      {started && (
        <div aria-live="polite" className="mt-8">
          <div
            key={status === 'success' ? 'success' : step}
            style={{ animation: 'pc-rise 340ms var(--ease-out-soft) both' }}
            className={`glass mx-auto max-w-2xl overflow-hidden rounded-[var(--radius-card)] border p-8 sm:p-10 ${
              isUrgent && status !== 'success' ? 'border-alert-deep/50' : 'border-cool/40'
            }`}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-fresh/15 text-fresh-deep">
                  <Icon name="check" size={22} />
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink">Got it — thank you.</h3>
                <p className="max-w-sm text-ink-soft">
                  A team member will reach out shortly to confirm details. Need it faster? Call{' '}
                  {company.phone} any time.
                </p>
                <Button variant="outline" size="md" className="mt-4" onClick={startOver}>
                  Start over
                </Button>
              </div>
            ) : (
              <>
                {/* Step indicator, doubles as a back button past step 1. */}
                <div className="mb-6 flex items-center justify-between">
                  <ul className="flex items-center gap-1.5" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => (
                      <li
                        key={i}
                        className={`h-1.5 w-6 rounded-full transition-colors ${
                          i <= step ? 'bg-cool-deep' : 'bg-line'
                        }`}
                      />
                    ))}
                  </ul>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      className="text-sm font-medium text-ink-faint transition-colors hover:text-ink"
                    >
                      Back
                    </button>
                  )}
                </div>

                {isUrgent && (
                  <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-alert/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-alert-deep uppercase">
                    <Icon name="alert" size={14} />
                    Urgent
                  </span>
                )}

                {step === 1 && (
                  <>
                    <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                      {quickHelp.urgencyTitle}
                    </h3>
                    {problem && (
                      <p className="mt-2 text-sm text-ink-faint">Regarding: {problem.label}</p>
                    )}
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {quickHelp.urgencyOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => chooseUrgency(option)}
                          className="flex min-h-[52px] cursor-pointer items-center justify-center rounded-xl border border-line bg-sunk/70 px-4 py-3 text-center font-medium text-ink transition-all duration-200 hover:border-cool hover:bg-cool/10"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <form onSubmit={submitZip}>
                    <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                      {quickHelp.zipTitle}
                    </h3>
                    <p className="mt-2 text-sm text-ink-faint">{quickHelp.zipSub}</p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-start">
                      <Field
                        label="ZIP Code"
                        className="sm:max-w-[12rem]"
                        inputMode="numeric"
                        maxLength={5}
                        placeholder="00000"
                        value={values.zip}
                        onChange={set('zip')}
                        error={errors.zip}
                      />
                      <Button
                        type="submit"
                        size="lg"
                        variant={isUrgent ? 'danger' : 'primary'}
                        iconRight="arrowRight"
                        className="sm:mt-[1.7rem]"
                      >
                        Continue
                      </Button>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <form ref={formRef} noValidate onSubmit={submitContact}>
                    <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                      {quickHelp.contactTitle}
                    </h3>
                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Name"
                        data-field="name"
                        value={values.name}
                        onChange={set('name')}
                        error={errors.name}
                      />
                      <Field
                        label="Phone"
                        type="tel"
                        inputMode="tel"
                        data-field="phone"
                        value={values.phone}
                        onChange={set('phone')}
                        error={errors.phone}
                      />

                      <div className="sm:col-span-2">
                        <Button
                          type="submit"
                          variant={isUrgent ? 'danger' : 'primary'}
                          size="lg"
                          className="w-full sm:w-auto"
                          disabled={status === 'submitting'}
                          iconRight={status === 'submitting' ? undefined : 'arrowRight'}
                        >
                          {status === 'submitting' ? 'Sending…' : quickHelp.cta}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}

                {isUrgent && (
                  <p className="mt-5 text-sm text-ink-faint">
                    Need someone now?{' '}
                    <a href={company.phoneHref} className="font-semibold text-alert-deep">
                      Call {company.phone}
                    </a>{' '}
                    instead of waiting on a callback.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </Section>
  )
}
