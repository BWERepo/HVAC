import { useId } from 'react'

/**
 * One text/select field with a visible label, helper slot and an error that
 * sits directly below the input and is announced to screen readers.
 */
export default function Field({
  label,
  error,
  hint,
  required = true,
  as = 'input',
  children,
  className = '',
  ...rest
}) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const Tag = as

  const shell =
    'w-full min-h-[52px] rounded-xl border bg-surface px-4 py-3 text-ink placeholder:text-ink-faint/70 ' +
    'transition-colors duration-200 outline-none focus:border-sun-deep focus:ring-2 focus:ring-sun/25 ' +
    (error ? 'border-alert-deep' : 'border-line-strong hover:border-ink-faint')

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && (
          <span className="ml-1 text-alert-deep" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <Tag
        id={id}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={`${shell} ${as === 'select' ? 'cursor-pointer appearance-none pr-10' : ''}`}
        {...rest}
      >
        {children}
      </Tag>

      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-ink-faint">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-alert-deep">
          {error}
        </p>
      )}
    </div>
  )
}

/** Segmented single-choice control — used for contact method and timing. */
export function ChoiceGroup({ legend, options, value, onChange, error, name, columns = 3 }) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-2 text-sm font-medium text-ink">
        {legend}
        <span className="ml-1 text-alert-deep" aria-hidden="true">
          *
        </span>
      </legend>

      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((option) => {
          const selected = value === option
          return (
            <label
              key={option}
              className={`flex min-h-[48px] cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition-all duration-200 ${
                selected
                  ? 'border-cool bg-cool/10 text-ink'
                  : 'border-line bg-sunk/70 text-ink-soft hover:border-line-strong'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={selected}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {option}
            </label>
          )
        })}
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-alert-deep">
          {error}
        </p>
      )}
    </fieldset>
  )
}
