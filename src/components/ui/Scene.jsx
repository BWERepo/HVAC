import { useId } from 'react'

/**
 * ============================================================================
 * PROCEDURAL SCENE ART — the imagery layer of this prototype
 * ============================================================================
 *
 * No photography ships with this demo, so imagery is drawn as abstract
 * architectural/mechanical compositions in SVG. That is a deliberate choice,
 * not a stopgap: it keeps the page weight near zero, scales perfectly on every
 * display, themes itself from the palette, and — importantly for an honest
 * demonstration — never implies "this is a photograph of our actual work".
 *
 * TO USE REAL PHOTOGRAPHY: pass `src` (and `alt`). The component then renders
 * a properly sized, lazy-loaded <img> instead and the drawing is skipped.
 * Every call site already passes a meaningful `alt`, so swapping in a real
 * photo set is a data change, not a code change.
 * ============================================================================
 */
export default function Scene({
  variant = 'home',
  src,
  alt = '',
  className = '',
  ratio = '4 / 3',
  priority = false,
}) {
  const uid = useId().replace(/:/g, '')

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
        style={{ aspectRatio: ratio }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    )
  }

  const Art = scenes[variant] ?? scenes.home

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <Art uid={uid} />
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Sky({ uid, from, to }) {
  return (
    <defs>
      <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
      <radialGradient id={`glow-${uid}`} cx="50%" cy="100%" r="70%">
        <stop offset="0%" stopColor="var(--color-cool)" stopOpacity=".35" />
        <stop offset="100%" stopColor="var(--color-cool)" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`warm-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD9A0" stopOpacity=".95" />
        <stop offset="100%" stopColor="var(--color-warm)" stopOpacity=".55" />
      </linearGradient>
    </defs>
  )
}

/** A modern home at dusk — flat planes, deep glazing, warm interior light. */
function HomeScene({ uid }) {
  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Sky uid={uid} from="#0C1730" to="#0A1020" />
      <rect width="800" height="600" fill={`url(#sky-${uid})`} />
      <ellipse cx="400" cy="600" rx="460" ry="240" fill={`url(#glow-${uid})`} />

      {/* Distant tree line */}
      <path
        d="M0 430 q60-28 110-6 q50-30 108-8 q54-26 104 2 q60-24 118 4 q56-22 110 6 q64-24 130 2 L800 470 L0 470Z"
        fill="#070C18"
        opacity=".85"
      />

      {/* Main volume */}
      <rect x="150" y="270" width="330" height="180" fill="#0B1224" />
      <rect x="150" y="262" width="346" height="12" rx="3" fill="#152039" />

      {/* Glazing grid — the warm light that says "someone is comfortable inside" */}
      <g fill={`url(#warm-${uid})`}>
        <rect x="176" y="300" width="78" height="66" rx="2" />
        <rect x="266" y="300" width="52" height="66" rx="2" opacity=".78" />
        <rect x="330" y="300" width="120" height="66" rx="2" opacity=".9" />
        <rect x="176" y="382" width="120" height="52" rx="2" opacity=".6" />
        <rect x="308" y="382" width="142" height="52" rx="2" opacity=".72" />
      </g>

      {/* Secondary wing */}
      <rect x="480" y="320" width="190" height="130" fill="#0A1020" />
      <rect x="480" y="312" width="200" height="10" rx="3" fill="#141E36" />
      <rect x="506" y="348" width="140" height="60" rx="2" fill={`url(#warm-${uid})`} opacity=".5" />

      {/* Ground + reflected light */}
      <rect x="0" y="450" width="800" height="150" fill="#060A14" />
      <rect x="150" y="450" width="520" height="150" fill="var(--color-warm)" opacity=".05" />
      <path d="M0 450h800" stroke="var(--color-cool)" strokeOpacity=".18" strokeWidth="1" />
    </svg>
  )
}

/** Interior light study — a room reading as calm, even, conditioned air. */
function InteriorScene({ uid }) {
  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Sky uid={uid} from="#101B33" to="#080D1B" />
      <rect width="800" height="600" fill={`url(#sky-${uid})`} />

      {/* Window and the light it throws across the floor */}
      <rect x="470" y="90" width="250" height="300" rx="4" fill={`url(#warm-${uid})`} opacity=".28" />
      <rect x="470" y="90" width="250" height="300" rx="4" fill="none" stroke="var(--color-cool)" strokeOpacity=".25" />
      <path d="M470 390 L720 390 L800 600 L300 600 Z" fill="var(--color-warm)" opacity=".07" />
      <path d="M595 90v300M470 240h250" stroke="var(--color-cool)" strokeOpacity=".16" />

      {/* Furniture silhouettes, deliberately abstract */}
      <rect x="90" y="330" width="250" height="90" rx="14" fill="#0D1425" />
      <rect x="110" y="306" width="60" height="34" rx="10" fill="#111a2e" />
      <rect x="186" y="306" width="60" height="34" rx="10" fill="#111a2e" />
      <rect x="380" y="360" width="110" height="60" rx="8" fill="#0C1322" />

      {/* Floor line */}
      <path d="M0 420h800" stroke="#1a2540" strokeWidth="1.5" />
      <rect x="0" y="420" width="800" height="180" fill="#070B16" />

      {/* Airflow drifting through the room */}
      <g stroke="var(--color-cool)" strokeOpacity=".4" fill="none" strokeLinecap="round" strokeWidth="1.5">
        <path d="M60 180 q120-40 240 0 t240 0" />
        <path d="M60 220 q120-40 240 0 t240 0" opacity=".6" />
        <path d="M60 260 q120-40 240 0 t240 0" opacity=".35" />
      </g>
    </svg>
  )
}

/** Outdoor condenser, read as a precision instrument rather than a box. */
function EquipmentScene({ uid, aged = false }) {
  const metal = aged ? '#2A2B27' : '#131C31'
  const ring = aged ? '#6B6A5E' : 'var(--color-cool)'
  const opacity = aged ? '.5' : '.85'

  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Sky uid={uid} from={aged ? '#191A16' : '#0D1730'} to={aged ? '#0E0F0C' : '#080E1C'} />
      <rect width="800" height="600" fill={`url(#sky-${uid})`} />

      {/* Housing */}
      <rect x="230" y="140" width="340" height="330" rx="18" fill={metal} />
      <rect x="230" y="140" width="340" height="330" rx="18" fill="none" stroke={ring} strokeOpacity=".28" />

      {/* Fan grille */}
      <g fill="none" stroke={ring} strokeOpacity={opacity}>
        <circle cx="400" cy="270" r="105" strokeWidth="2" />
        <circle cx="400" cy="270" r="78" strokeWidth="1.2" strokeOpacity=".5" />
        <circle cx="400" cy="270" r="50" strokeWidth="1.2" strokeOpacity=".35" />
        <circle cx="400" cy="270" r="16" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path
            key={deg}
            d="M400 270 q40-46 96-24"
            strokeWidth="2"
            strokeOpacity=".45"
            transform={`rotate(${deg} 400 270)`}
          />
        ))}
      </g>

      {/* Fin louvres */}
      <g stroke={ring} strokeOpacity={aged ? '.22' : '.35'} strokeWidth="2">
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M262 ${400 + i * 9}h276`} />
        ))}
      </g>

      {aged && (
        // Rust/wear marks — reads as "old equipment" without being cartoonish
        <g fill="#7A5A32" opacity=".3">
          <path d="M245 400 q10 40 -4 62 q22-8 26-40Z" />
          <path d="M552 190 q12 26 2 44 q18-10 16-34Z" />
        </g>
      )}

      <rect x="0" y="470" width="800" height="130" fill="#05080F" />
    </svg>
  )
}

/** Filtration study — particles thinning as they cross the media. */
function AirScene({ uid }) {
  const dots = Array.from({ length: 46 }, (_, i) => {
    // Deterministic pseudo-random so the art is stable across renders.
    const x = ((i * 97) % 360) + 20
    const y = ((i * 53) % 520) + 40
    const r = 1.6 + ((i * 7) % 5) * 0.6
    return { x, y, r, key: i }
  })

  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Sky uid={uid} from="#0A1A22" to="#070F1A" />
      <rect width="800" height="600" fill={`url(#sky-${uid})`} />

      {/* Dirty side */}
      <g fill="var(--color-warm)" opacity=".45">
        {dots.map((d) => (
          <circle key={d.key} cx={d.x} cy={d.y} r={d.r} />
        ))}
      </g>

      {/* Filter media */}
      <g>
        <rect x="400" y="40" width="72" height="520" rx="8" fill="var(--color-fresh)" opacity=".1" />
        <rect x="400" y="40" width="72" height="520" rx="8" fill="none" stroke="var(--color-fresh)" strokeOpacity=".55" />
        {Array.from({ length: 13 }, (_, i) => (
          <path
            key={i}
            d={`M400 ${60 + i * 40} l72 20`}
            stroke="var(--color-fresh)"
            strokeOpacity=".3"
            strokeWidth="1.5"
          />
        ))}
      </g>

      {/* Clean side — a few faint survivors, then clarity */}
      <g fill="var(--color-fresh)" opacity=".28">
        <circle cx="530" cy="180" r="1.6" />
        <circle cx="612" cy="330" r="1.4" />
        <circle cx="700" cy="240" r="1.2" />
      </g>

      <g stroke="var(--color-fresh)" strokeOpacity=".4" fill="none" strokeLinecap="round" strokeWidth="1.5">
        <path d="M500 150 h240" />
        <path d="M500 300 h270" opacity=".7" />
        <path d="M500 450 h210" opacity=".5" />
      </g>
    </svg>
  )
}

const scenes = {
  home: HomeScene,
  interior: InteriorScene,
  equipment: (p) => <EquipmentScene {...p} />,
  equipmentOld: (p) => <EquipmentScene {...p} aged />,
  air: AirScene,
}
