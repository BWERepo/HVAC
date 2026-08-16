import { useRef, useState } from 'react'
import { company, quickHelp } from '../data/site'
import { formatPhone, validateAll, validateField } from '../lib/validation'
import Button from './ui/Button'
import Field from './ui/Field'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

const FIELDS = ['name', 'phone', 'zip']
const EMPTY = { name: '', phone: '', zip: '' }

/**
 * The site's signature feature: three big, unmissable symptom choices right
 * under the hero. Selecting one reveals a 3-field lead-capture form in
 * place — proof that this page can turn "I have a problem" straight into a
 * service call, not just decoration.
 */
export default function ProblemSelector() {
  const [selectedId, setSelectedId] = useState(null)
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const formRef = useRef(null)

  const selected = quickHelp.options.find((o) => o.id === selectedId) ?? null

  const choose = (id) => {
    setSelectedId((current) => (current === id ? null : id))
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  const set = (field) => (e) => {
    const raw = e.target.value
    const value = field === 'phone' ? formatPhone(raw) : raw
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) || undefined }))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validateAll(values, FIELDS)
    setErrors(found)

    if (Object.keys(found).length) {
      const firstInvalid = FIELDS.find((f) => found[f])
      formRef.current?.querySelector(`[data-field="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('submitting')
    // PROTOTYPE: nothing is transmitted — no backend is configured for this
    // demonstration. Wiring this to a real CRM/dispatch endpoint is a
    // deliberate, separate step for a live build.
    setTimeout(() => setStatus('success'), 600)
  }

  return (
    <Section id="diagnostic" accent="cool">
      <SectionHeading eyebrow={quickHelp.eyebrow} title={quickHelp.title} sub={quickHelp.sub} />

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {quickHelp.options.map((option, i) => {
          const isActive = selectedId === option.id
          return (
            <Reveal key={option.id} delay={i * 70}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => choose(option.id)}
                className={`group flex h-full w-full cursor-pointer flex-col items-center gap-4 rounded-2xl border p-8 text-center transition-all duration-300 ${
                  isActive
                    ? option.emergency
                      ? 'border-alert-deep bg-alert/10'
                      : 'border-cool bg-cool/10'
                    : 'border-line bg-sunk/70 hover:-translate-y-1.5 hover:border-line-strong hover:bg-sunk'
                }`}
              >
                <span
                  className={`flex size-14 items-center justify-center rounded-2xl transition-colors ${
                    isActive
                      ? option.emergency
                        ? 'bg-alert/20 text-alert-deep'
                        : 'bg-cool/20 text-cool-deep'
                      : 'bg-sunk/70 text-ink-soft group-hover:text-cool-deep'
                  }`}
                >
                  <Icon name={option.icon} size={28} />
                </span>
                <span className="font-display text-xl font-semibold text-ink">{option.label}</span>
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
            className={`glass mx-auto max-w-2xl overflow-hidden rounded-[var(--radius-card)] border p-8 sm:p-10 ${
              selected.emergency ? 'border-alert-deep/50' : 'border-cool/40'
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
              </div>
            ) : (
              <>
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
                  {quickHelp.revealTitle}
                </h3>

                <form ref={formRef} noValidate onSubmit={onSubmit} className="mt-7 grid gap-4 sm:grid-cols-3">
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
                  <Field
                    label="ZIP"
                    inputMode="numeric"
                    data-field="zip"
                    value={values.zip}
                    onChange={set('zip')}
                    error={errors.zip}
                  />

                  <div className="sm:col-span-3">
                    <Button
                      type="submit"
                      variant={selected.emergency ? 'danger' : 'primary'}
                      size="lg"
                      className="w-full sm:w-auto"
                      disabled={status === 'submitting'}
                      iconRight={status === 'submitting' ? undefined : 'arrowRight'}
                    >
                      {status === 'submitting' ? 'Sending…' : quickHelp.cta}
                    </Button>
                  </div>
                </form>

                {selected.emergency && (
                  <p className="mt-4 text-sm text-ink-faint">
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
        )}
      </div>
    </Section>
  )
}
