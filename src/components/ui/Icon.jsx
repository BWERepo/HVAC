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

  // Simplified social glyphs — placeholder links on this demonstration.
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
