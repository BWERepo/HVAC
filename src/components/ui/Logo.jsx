import { company } from '../../data/site'

/**
 * PLACEHOLDER LOGO — a precision-dial mark built in SVG so it scales cleanly
 * and can be swapped for a real customer's logo file by replacing this one
 * component. Nothing else references the mark directly.
 */
export default function Logo({ className = '', compact = false }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        width="40"
        height="40"
        className="shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="pc-logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-cool)" />
            <stop offset="100%" stopColor="var(--color-sky)" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeOpacity=".16" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="12.5" fill="none" stroke="currentColor" strokeOpacity=".1" strokeWidth="1" />
        {/* Dial sweep to ~72° of comfort */}
        <path
          d="M20 5.5a14.5 14.5 0 0 1 10.25 24.75"
          fill="none"
          stroke="url(#pc-logo-grad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="3.4" fill="url(#pc-logo-grad)" />
      </svg>

      {!compact && (
        <span className="font-display leading-none">
          <span className="block text-[1.05rem] font-bold tracking-tight text-ink">
            Precision Comfort
          </span>
          <span className="mt-0.5 block text-[0.62rem] font-medium uppercase tracking-[0.22em] text-ink-faint">
            Heating &amp; Air
          </span>
        </span>
      )}
      <span className="sr-only">{company.fullName}</span>
    </span>
  )
}
