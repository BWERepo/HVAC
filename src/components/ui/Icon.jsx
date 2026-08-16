/**
 * Inline stroke-icon set — one consistent visual language (1.6 stroke, round
 * caps, 24px grid) with no icon dependency and no emoji. Icons are decorative
 * by default; pass `title` to expose one to assistive tech.
 */

const paths = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  snow: (
    <>
      <path d="M12 2v20M4.2 6.5l15.6 9M19.8 6.5l-15.6 9" />
      <path d="M12 6.2l2.2-2.2M12 6.2L9.8 4M12 17.8l2.2 2.2M12 17.8L9.8 20" />
    </>
  ),
  wind: (
    <>
      <path d="M3 8h10a3 3 0 1 0-3-3" />
      <path d="M3 16h13a3 3 0 1 1-3 3" />
      <path d="M3 12h17" />
    </>
  ),
  drop: <path d="M12 3.5s6 6.2 6 10.1a6 6 0 0 1-12 0C6 9.7 12 3.5 12 3.5Z" />,
  wave: <path d="M2 12c1.7-3.5 3.3-3.5 5 0s3.3 3.5 5 0 3.3-3.5 5 0 3.3 3.5 5 0" />,
  bolt: <path d="M13.5 2 4 13.5h6L10.5 22 20 10.5h-6L13.5 2Z" />,
  leaf: (
    <>
      <path d="M4 20c0-8 5-14 16-15 0 10-5 15-11 15a5 5 0 0 1-5-5Z" />
      <path d="M9.5 19.5C11 15 14 11.5 18 9" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 2.5 20h19L12 3.5Z" />
      <path d="M12 10v4.5M12 17.6v.1" />
    </>
  ),
  phone: (
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
  ),
  message: (
    <path d="M21 12a7.5 7.5 0 0 1-8 7.5c-1 0-2-.2-2.9-.5L4 21l1.4-4.2A7.5 7.5 0 1 1 21 12Z" />
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />,
  arrowRight: <path d="M4 12h15M13 6l6 6-6 6" />,
  chevronDown: <path d="M6 9.5l6 6 6-6" />,
  chevronLeft: <path d="M14.5 5.5 8 12l6.5 6.5" />,
  star: (
    <path d="m12 3.2 2.6 5.6 6 .8-4.4 4.2 1.1 6.1-5.3-2.9-5.3 2.9 1.1-6.1L3.4 9.6l6-.8L12 3.2Z" />
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 5 3.2 8.6 7.5 10 4.3-1.4 7.5-5 7.5-10v-6L12 2.5Z" />
      <path d="M8.8 12.2 11 14.4l4.2-4.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.3 2" />
    </>
  ),
  wrench: (
    <path d="M15.5 3a5.5 5.5 0 0 0-5 7.7L3 18.2 5.8 21l7.5-7.5A5.5 5.5 0 1 0 15.5 3Z" />
  ),
  home: (
    <>
      <path d="M3.5 10.5 12 3.5l8.5 7" />
      <path d="M5.5 9.8V20h13V9.8" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 17a9 9 0 1 1 16 0" />
      <path d="M12 17 16 10.5" />
      <circle cx="12" cy="17" r="1.4" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
      <circle cx="16" cy="8" r="2.2" />
      <circle cx="10" cy="16" r="2.2" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,

  // Simplified social glyphs drawn in this icon set's own visual language —
  // geometric approximations for a demonstration with placeholder links, not
  // official brand assets. Swap in real brand marks for a live customer site.
  x: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M7.8 7.8l8.4 8.4M16.2 7.8l-8.4 8.4" />
    </>
  ),
  tiktok: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M14.3 7v6.6a2.9 2.9 0 1 1-2.5-2.87" />
      <path d="M14.3 7c.35 1.35 1.4 2.3 2.8 2.5" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M7.7 10.6V17M7.7 7.5v.1M11.6 17v-6.4M11.6 13.6a2.1 2.1 0 0 1 4.2 0V17" />
    </>
  ),
  pinterest: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M10.4 18.6 12.3 10" />
      <path d="M9.9 12.6a3.1 3.1 0 1 1 3.6 3.1" />
    </>
  ),
  google: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 10.7h4.4a4.5 4.5 0 1 1-1.35-3.1" />
    </>
  ),
  yelp: (
    <>
      <path d="M13 4.6v7.3l5.3-2.5" />
      <path d="M13 14.3l3.7 4.3" />
      <path d="M11.1 13.7 6.3 15.5" />
      <path d="M11.1 11.5 6.5 8.9" />
    </>
  ),
  nextdoor: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M8.6 16.6v-9.2l6.8 9.2v-9.2" />
    </>
  ),
  facebook: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M15.4 8.2h-1.7A1.7 1.7 0 0 0 12 9.9V21M9.6 13.4h4.8" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.1" cy="6.9" r=".9" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="3.6" />
      <path d="M10.6 9.6v4.8l4.1-2.4z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.5-1.2A8.4 8.4 0 1 0 12 3.5Z" />
      <path d="M8.7 8.9c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.1.3-.3.4-.1.2-.3.3-.4.5-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.3.1.2.1.9-.2 1.4-.3.6-1.5 1.1-2.1 1.2-.6.1-1.1.1-3.3-.7-2.6-1-4.3-3.6-4.4-3.8-.1-.2-1-1.3-1-2.5 0-1.2.6-1.8.8-2Z" />
    </>
  ),
  sms: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="M7 9.5h10M7 13h6" />
    </>
  ),

  // Simplified payment-method glyphs, drawn in this icon set's own visual
  // language (same as the social icons above) — geometric approximations for
  // a demonstration, not official card-network marks.
  visa: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M9.3 9.5 8 14.5M11 9.5l1 3.4 1.7-3.4M16.6 9.5c-1.6-.5-2.6.1-2.6.9 0 1.1 2.4 1 2.4 2.1 0 .8-1.1 1.2-2.6.7" />
    </>
  ),
  mastercard: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <circle cx="9.5" cy="12" r="4" />
      <circle cx="14.5" cy="12" r="4" />
    </>
  ),
  amex: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M6 9.5h3.4l1 2.5 1-2.5H15v5h-1.4v-3.3L12.4 14.5h-1L10.2 11.2V14.5H6ZM16 9.5h4M16 12h3.5M16 14.5h4" />
    </>
  ),
  discover: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M6 9.5v5h1.8a2.5 2.5 0 0 0 0-5H6Z" />
      <circle cx="16.5" cy="12" r="2.6" />
    </>
  ),
  paypal: (
    <>
      <path d="M8 18.5 9.6 6h4.2c2.2 0 3.6 1.2 3.3 3.2-.3 2.3-2.2 3.6-4.6 3.6h-1.7l-.7 5.7Z" />
      <path d="M10.6 6c.3-1.3 1.3-2 2.9-2h2.1c2.2 0 3.5 1.1 3.3 3-.3 2.1-2 3.4-4.3 3.4h-1.4" />
    </>
  ),
  applePay: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M10.4 9.2c.4-.5.7-1.2.6-1.9-.6.1-1.4.4-1.8 1-.4.5-.7 1.2-.6 1.9.7 0 1.4-.4 1.8-1Z" />
      <path d="M12.4 10.2c-1-.1-1.9.6-2.3.6-.5 0-1.2-.5-2-.5-1 0-2 .6-2.5 1.5-1.1 1.9-.3 4.6.7 6.1.5.7 1.1 1.5 1.9 1.5.8 0 1-.5 1.9-.5s1.2.5 2 .5c.8 0 1.4-.7 1.9-1.5.3-.5.5-.8.7-1.4-1.9-.7-2.2-3.3-.3-4.4-.5-.7-1.3-1.2-2-1.3Z" />
      <path d="M16.5 9.5h2.2c1.3 0 2.2.9 2.2 2.1 0 1.3-.9 2.1-2.3 2.1h-1.1V16h-1V9.5Zm1 3.3h1c.8 0 1.3-.5 1.3-1.2 0-.7-.5-1.2-1.3-1.2h-1v2.4Z" />
    </>
  ),
}

/**
 * Real multi-color Google "G" mark, for the one place on this page that
 * needs to read unambiguously as Google (the reviews trust badge) rather
 * than as a member of this file's monochrome stroke-icon family.
 */
export function GoogleGIcon({ size = 20, className = '', title = 'Google' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} role="img" aria-label={title}>
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.15-3.1-.4-4.6H24v9h11.8c-.5 2.7-2.1 5-4.4 6.6v5.4h7.1c4.2-3.9 6.6-9.6 6.6-16.4z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.4c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.6C8.1 41 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.8 28.4c-.4-1.3-.7-2.7-.7-4.4s.3-3 .7-4.4v-5.6H4.5C3 16.9 2.2 20.3 2.2 24s.8 7.1 2.3 10l7.3-5.6z"
      />
      <path
        fill="#EA4335"
        d="M24 10.7c3.2 0 6 1.1 8.3 3.2l6.2-6.2C34.9 4.3 29.9 2 24 2 15.4 2 8.1 7 4.5 14l7.3 5.6c1.7-5.2 6.5-9 12.2-9z"
      />
    </svg>
  )
}

export default function Icon({
  name,
  size = 24,
  className = '',
  title,
  strokeWidth = 1.6,
  ...rest
}) {
  const d = paths[name]
  if (!d) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...rest}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {d}
    </svg>
  )
}
