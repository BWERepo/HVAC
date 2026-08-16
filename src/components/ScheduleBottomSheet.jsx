import { useEffect, useRef, useState } from 'react'
import { company, scheduleSheet } from '../data/site'
import { useMountTransition, useScrollLock } from '../lib/hooks'
import { formatPhone, validateAll, validateField } from '../lib/validation'
import Button from './ui/Button'
import Collapse from './ui/Collapse'
import Field from './ui/Field'
import Icon from './ui/Icon'

const DETAIL_FIELDS = ['name', 'phone', 'email', 'zip']
const EXIT_MS = 260

const EMPTY = { need: '', timing: '', name: '', phone: '', email: '', zip: '' }

/**
 * Bottom sheet on phones, centred dialog from ~640px up.
 *
 * Progress is kept when the sheet is dismissed rather than discarded, so
 * closing it by accident never costs the visitor their answers.
 *
 * Enter/exit is driven by useMountTransition + CSS rather than a presence
 * library: an overlay that fails to unmount covers the whole page, so this
 * needs to be deterministic.
 */
export default function ScheduleBottomSheet({ open, onClose }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const panelRef = useRef(null)

  const { mounted, visible } = useMountTransition(open, EXIT_MS)
  useScrollLock(open)

  // Escape closes; Tab is trapped inside the panel while it is open.
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) requestAnimationFrame(() => panelRef.current?.focus())
  }, [open])

  const set = (field) => (e) => {
    const raw = e?.target ? e.target.value : e
    const value = field === 'phone' ? formatPhone(raw) : raw
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) || undefined }))
    }
  }

  const onBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) || undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validateAll(values, DETAIL_FIELDS)
    setErrors(found)
    setTouched(Object.fromEntries(DETAIL_FIELDS.map((f) => [f, true])))

    if (Object.keys(found).length) {
      // Targeted by data-field, not [aria-invalid] — see LeadForm for why.
      const firstInvalid = DETAIL_FIELDS.find((f) => found[f])
      panelRef.current?.querySelector(`[data-field="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('submitting')
    // PROTOTYPE: no backend — these details are never transmitted or stored.
    setTimeout(() => setStatus('success'), 700)
  }

  const closeAndReset = () => {
    onClose()
    // Only clear once the request is actually finished and the sheet is gone.
    setTimeout(() => {
      setValues(EMPTY)
      setErrors({})
      setTouched({})
      setStatus('idle')
    }, EXIT_MS + 40)
  }

  if (!mounted) return null

  const step = !values.need ? 1 : !values.timing ? 2 : 3

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-void/75 backdrop-blur-sm transition-opacity duration-250 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-title"
        tabIndex={-1}
        className={`relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[1.75rem] border border-white/12 bg-surface shadow-lift outline-none transition-all duration-300 ease-out sm:max-w-lg sm:rounded-[1.75rem] ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 sm:translate-y-4'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Grab handle — the affordance that says "this sheet moves". */}
        <div className="flex justify-center pt-3 sm:hidden">
          <span aria-hidden="true" className="h-1.5 w-11 rounded-full bg-white/20" />
        </div>

        <div className="flex items-start justify-between gap-4 px-6 pt-5 sm:pt-7">
          <div>
            <h2 id="schedule-title" className="font-display text-2xl font-semibold text-ink">
              {status === 'success' ? 'Request received.' : scheduleSheet.title}
            </h2>
            {status !== 'success' && (
              <p className="mt-1.5 text-sm text-ink-faint">Step {step} of 3</p>
            )}
          </div>
          <button
            type="button"
            onClick={status === 'success' ? closeAndReset : onClose}
            aria-label="Close scheduling panel"
            className="-mt-1 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white/10 hover:text-ink"
          >
            <Icon name="close" size={21} />
          </button>
        </div>

        <div className="px-6 pt-6 pb-8">
          {status === 'success' ? (
            <div
              className="py-6 text-center"
              role="status"
              style={{ animation: 'pc-pop 380ms var(--ease-out-soft) both' }}
            >
              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-fresh/15 text-fresh">
                <Icon name="check" size={32} strokeWidth={2} />
              </span>
              <p className="mt-6 text-lg text-ink">
                Thanks, {values.name.split(' ')[0]}. We’d confirm your{' '}
                <span className="font-semibold">{values.timing.toLowerCase()}</span> visit for{' '}
                <span className="font-semibold">{values.need.toLowerCase()}</span> shortly.
              </p>
              <p className="mx-auto mt-5 max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-ink-faint">
                This is a demonstration. Nothing was submitted, sent or stored.
              </p>
              <Button variant="outline" className="mt-6 w-full" onClick={closeAndReset}>
                Done
              </Button>
            </div>
          ) : (
            // Spacing lives inside each Collapse, so a collapsed step
            // contributes no height at all.
            <div>
              {/* Step 1 */}
              <div>
                <p className="mb-3 text-sm font-medium text-ink">{scheduleSheet.needQuestion}</p>
                <div className="grid grid-cols-2 gap-2">
                  {scheduleSheet.needOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={values.need === option}
                      onClick={() => setValues((v) => ({ ...v, need: option }))}
                      className={`min-h-[48px] cursor-pointer rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-200 ${
                        values.need === option
                          ? 'border-cool/60 bg-cool/12 text-ink'
                          : 'border-white/12 bg-white/[0.03] text-ink-soft hover:border-white/30'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 — revealed once there is something to schedule */}
              <Collapse open={Boolean(values.need)}>
                <div className="pt-7">
                  <p className="mb-3 text-sm font-medium text-ink">
                    {scheduleSheet.timingQuestion}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {scheduleSheet.timingOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={values.timing === option}
                        onClick={() => setValues((v) => ({ ...v, timing: option }))}
                        className={`min-h-[48px] cursor-pointer rounded-xl border px-2 py-3 text-[0.8rem] font-medium transition-all duration-200 ${
                          values.timing === option
                            ? 'border-cool/60 bg-cool/12 text-ink'
                            : 'border-white/12 bg-white/[0.03] text-ink-soft hover:border-white/30'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </Collapse>

              {/* Step 3 */}
              <Collapse open={Boolean(values.need && values.timing)}>
                <div className="pt-7">
                  <form onSubmit={submit} noValidate className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Name"
                        data-field="name"
                        type="text"
                        autoComplete="name"
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
                    <Field
                      label="Email"
                      data-field="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
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
                      value={values.zip}
                      onChange={set('zip')}
                      onBlur={onBlur('zip')}
                      error={touched.zip ? errors.zip : undefined}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? 'Sending…' : 'Request This Visit'}
                    </Button>

                    <p className="text-center text-xs text-ink-faint">
                      Demonstration form — nothing is transmitted. Or call{' '}
                      <a href={company.phoneHref} className="text-cool hover:underline">
                        {company.phone}
                      </a>
                      .
                    </p>
                  </form>
                </div>
              </Collapse>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
