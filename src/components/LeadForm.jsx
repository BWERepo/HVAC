import { useRef, useState } from 'react'
import { company, leadForm } from '../data/site'
import { formatPhone, validateAll, validateField } from '../lib/validation'
import Button from './ui/Button'
import Field, { ChoiceGroup } from './ui/Field'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

const FIELDS = ['name', 'phone', 'email', 'zip', 'help', 'date', 'timing', 'contact']

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  zip: '',
  help: '',
  date: '',
  timing: '',
  contact: 'Call',
  notes: '',
}

// Native date inputs need an ISO min bound — today, in the visitor's local time.
function todayIso() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function formatAppointment(isoDate) {
  if (!isoDate) return 'Your appointment'
  const date = new Date(`${isoDate}T00:00:00`)
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export default function LeadForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const formRef = useRef(null)

  const set = (field) => (e) => {
    const raw = e?.target ? e.target.value : e
    const value = field === 'phone' ? formatPhone(raw) : raw
    setValues((v) => ({ ...v, [field]: value }))
    // Re-validate as they fix a field that was already flagged.
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) || undefined }))
    }
  }

  const onBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    const message = validateField(field, values[field])
    setErrors((prev) => ({ ...prev, [field]: message || undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validateAll(values, FIELDS)
    setErrors(found)
    setTouched(Object.fromEntries(FIELDS.map((f) => [f, true])))

    if (Object.keys(found).length) {
      // Send focus to the first thing that needs fixing. Targeted by
      // data-field rather than [aria-invalid], because that attribute is only
      // set on the re-render that this very call schedules — querying for it
      // here races the commit and finds nothing.
      const firstInvalid = FIELDS.find((f) => found[f])
      formRef.current?.querySelector(`[data-field="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('submitting')

    // ------------------------------------------------------------------
    // PROTOTYPE: nothing is transmitted. There is no backend configured for
    // this demonstration, so the entered details never leave the browser —
    // they are not sent, stored or logged anywhere. Wiring this to a real
    // CRM/email endpoint is a deliberate, separate step for a live build.
    // ------------------------------------------------------------------
    setTimeout(() => setStatus('success'), 700)
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  return (
    <Section id="lead-form" accent="cool">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Book online"
            title={leadForm.title}
            sub={leadForm.sub}
          />

          <ul className="mt-10 space-y-5">
            {[
              { icon: 'calendar', text: 'Pick a date and time slot right here — no callback needed.' },
              { icon: 'shield', text: 'Upfront pricing — you approve the work before it starts.' },
              { icon: 'phone', text: `Prefer to talk? Call ${company.phone} any time.` },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cool/12 text-cool-deep">
                  <Icon name={item.icon} size={19} />
                </span>
                <span className="pt-2 text-ink-soft">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={100}>
          <div className="glass rounded-[var(--radius-card)] p-6 shadow-lift sm:p-9">
              {status === 'success' ? (
                <div
                  className="py-10 text-center"
                  role="status"
                  style={{ animation: 'pc-pop 380ms var(--ease-out-soft) both' }}
                >
                  <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-fresh/15 text-fresh-deep">
                    <Icon name="check" size={32} strokeWidth={2} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                    Thanks, {values.name.split(' ')[0]} — you’re booked.
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-ink-soft">
                    {formatAppointment(values.date)}, {values.timing.toLowerCase()}. A coordinator
                    would normally confirm by {values.contact.toLowerCase()} shortly before the visit.
                  </p>

                  <p className="mx-auto mt-6 max-w-sm rounded-xl border border-line bg-sunk/70 p-4 text-xs leading-relaxed text-ink-faint">
                    This is a demonstration form. Nothing was submitted, sent or stored — your
                    details never left this page.
                  </p>

                  <Button variant="outline" size="md" className="mt-7" onClick={reset}>
                    Send another
                  </Button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Name"
                      data-field="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jordan Ellis"
                      value={values.name}
                      onChange={set('name')}
                      onBlur={onBlur('name')}
                      error={touched.name ? errors.name : undefined}
                    />
                    <Field
                      label="Phone"
                      data-field="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(555) 555-0142"
                      value={values.phone}
                      onChange={set('phone')}
                      onBlur={onBlur('phone')}
                      error={touched.phone ? errors.phone : undefined}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-[1.6fr_1fr]">
                    <Field
                      label="Email"
                      data-field="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={set('email')}
                      onBlur={onBlur('email')}
                      error={touched.email ? errors.email : undefined}
                    />
                    <Field
                      label="ZIP Code"
                      data-field="zip"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      placeholder="00000"
                      value={values.zip}
                      onChange={set('zip')}
                      onBlur={onBlur('zip')}
                      error={touched.zip ? errors.zip : undefined}
                    />
                  </div>

                  <div className="relative">
                    <Field
                      as="select"
                      label="What can we help with?"
                      data-field="help"
                      value={values.help}
                      onChange={set('help')}
                      onBlur={onBlur('help')}
                      error={touched.help ? errors.help : undefined}
                    >
                      <option value="" disabled>
                        Choose one…
                      </option>
                      {leadForm.helpOptions.map((option) => (
                        <option key={option} value={option} className="bg-surface">
                          {option}
                        </option>
                      ))}
                    </Field>
                    <Icon
                      name="chevronDown"
                      size={18}
                      className="pointer-events-none absolute top-[2.85rem] right-4 text-ink-faint"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Preferred date"
                      data-field="date"
                      type="date"
                      min={todayIso()}
                      value={values.date}
                      onChange={set('date')}
                      onBlur={onBlur('date')}
                      error={touched.date ? errors.date : undefined}
                    />
                    <div className="relative">
                      <Field
                        as="select"
                        label="Preferred time"
                        data-field="timing"
                        value={values.timing}
                        onChange={set('timing')}
                        onBlur={onBlur('timing')}
                        error={touched.timing ? errors.timing : undefined}
                      >
                        <option value="" disabled>
                          Choose a window…
                        </option>
                        {leadForm.timeWindowOptions.map((option) => (
                          <option key={option} value={option} className="bg-surface">
                            {option}
                          </option>
                        ))}
                      </Field>
                      <Icon
                        name="chevronDown"
                        size={18}
                        className="pointer-events-none absolute top-[2.85rem] right-4 text-ink-faint"
                      />
                    </div>
                  </div>

                  <ChoiceGroup
                    legend="Preferred contact method"
                    name="contact-method"
                    options={leadForm.contactMethods}
                    value={values.contact}
                    onChange={(v) => setValues((prev) => ({ ...prev, contact: v }))}
                    error={touched.contact ? errors.contact : undefined}
                  />

                  <Field
                    as="textarea"
                    label="Anything else we should know?"
                    required={false}
                    rows={3}
                    placeholder="Optional — the more detail, the better prepared the technician arrives."
                    value={values.notes}
                    onChange={set('notes')}
                    className="[&_textarea]:min-h-[96px]"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === 'submitting'}
                    iconRight={status === 'submitting' ? undefined : 'arrowRight'}
                  >
                    {status === 'submitting' ? 'Sending…' : leadForm.cta}
                  </Button>

                  <p className="text-center text-xs leading-relaxed text-ink-faint">
                    Demonstration form — submissions are not transmitted or stored.
                  </p>
                </form>
              )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
