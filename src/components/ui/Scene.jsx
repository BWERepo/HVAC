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
 * All scenes are daylit to match the bright, warm palette.
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

function Defs({ uid }) {
  return (
    <defs>
      <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#BFE3F7" />
        <stop offset="55%" stopColor="#E4F1FA" />
        <stop offset="100%" stopColor="#FDFBF7" />
      </linearGradient>
      <radialGradient id={`sun-${uid}`} cx="76%" cy="16%" r="46%">
        <stop offset="0%" stopColor="#FFE9A8" stopOpacity=".95" />
        <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`wall-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F0E7D8" />
      </linearGradient>
      <linearGradient id={`glassy-${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#9FD4EE" />
        <stop offset="100%" stopColor="#DDF0FA" />
      </linearGradient>
    </defs>
  )
}

/** A modern home on a bright day — clean planes, big glazing, warm light. */
function HomeScene({ uid }) {
  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Defs uid={uid} />
      <rect width="800" height="600" fill={`url(#sky-${uid})`} />
      <rect width="800" height="600" fill={`url(#sun-${uid})`} />

      {/* Soft cloud banding */}
      <g fill="#FFFFFF" opacity=".7">
        <ellipse cx="180" cy="120" rx="96" ry="26" />
        <ellipse cx="250" cy="132" rx="70" ry="20" />
        <ellipse cx="612" cy="86" rx="78" ry="21" />
      </g>

      {/* Tree line */}
      <path
        d="M0 428 q58-30 108-8 q48-32 106-10 q54-28 102 0 q58-26 116 2 q56-24 108 4 q62-26 128 0 L800 470 L0 470Z"
        fill="#9CC7A6"
        opacity=".55"
      />

      {/* Main volume */}
      <rect x="150" y="268" width="330" height="182" fill={`url(#wall-${uid})`} />
      <rect x="142" y="258" width="348" height="14" rx="4" fill="#E3D7C2" />

      {/* Glazing */}
      <g fill={`url(#glassy-${uid})`}>
        <rect x="176" y="300" width="78" height="66" rx="3" />
        <rect x="266" y="300" width="52" height="66" rx="3" opacity=".85" />
        <rect x="330" y="300" width="120" height="66" rx="3" opacity=".92" />
        <rect x="176" y="382" width="120" height="52" rx="3" opacity=".7" />
        <rect x="308" y="382" width="142" height="52" rx="3" opacity=".8" />
      </g>
      <g stroke="#FFFFFF" strokeWidth="2" opacity=".8">
        <path d="M215 300v66M390 300v66M368 382v52" />
      </g>

      {/* Secondary wing */}
      <rect x="480" y="318" width="190" height="132" fill="#F7F1E6" />
      <rect x="472" y="308" width="206" height="12" rx="4" fill="#E3D7C2" />
      <rect x="506" y="348" width="140" height="60" rx="3" fill={`url(#glassy-${uid})`} opacity=".75" />

      {/* Warm interior spill at the doorway */}
      <rect x="396" y="392" width="42" height="58" fill="#FFD79A" opacity=".9" />

      {/* Ground */}
      <rect x="0" y="450" width="800" height="150" fill="#EFE7D6" />
      <path d="M0 450h800" stroke="#DFD3BC" strokeWidth="2" />
      <ellipse cx="400" cy="470" rx="300" ry="16" fill="#D8C9AF" opacity=".5" />

      {/* Shrubs */}
      <g fill="#8FBE9C" opacity=".85">
        <ellipse cx="132" cy="452" rx="34" ry="20" />
        <ellipse cx="700" cy="452" rx="40" ry="22" />
      </g>
    </svg>
  )
}

/** Bright interior — sunlight crossing an evenly conditioned room. */
function InteriorScene({ uid }) {
  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Defs uid={uid} />
      <rect width="800" height="600" fill="#FAF6EE" />

      {/* Window + the light it throws across the floor */}
      <rect x="470" y="90" width="250" height="300" rx="5" fill={`url(#glassy-${uid})`} />
      <rect x="470" y="90" width="250" height="300" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M470 390 L720 390 L800 600 L300 600 Z" fill="#FFE9BC" opacity=".55" />
      <path d="M595 90v300M470 240h250" stroke="#FFFFFF" strokeWidth="5" />

      {/* Furniture silhouettes, deliberately abstract */}
      <rect x="90" y="330" width="250" height="92" rx="16" fill="#E7DCC8" />
      <rect x="110" y="304" width="60" height="34" rx="11" fill="#DFD2BA" />
      <rect x="186" y="304" width="60" height="34" rx="11" fill="#DFD2BA" />
      <rect x="380" y="360" width="110" height="62" rx="9" fill="#EDE3D2" />

      {/* Floor */}
      <path d="M0 422h800" stroke="#E2D6C0" strokeWidth="2" />
      <rect x="0" y="422" width="800" height="178" fill="#F3EBDC" />

      {/* Conditioned air moving through the room */}
      <g stroke="var(--color-cool)" strokeOpacity=".55" fill="none" strokeLinecap="round" strokeWidth="2">
        <path d="M60 180 q120-40 240 0 t240 0" />
        <path d="M60 220 q120-40 240 0 t240 0" opacity=".7" />
        <path d="M60 260 q120-40 240 0 t240 0" opacity=".45" />
      </g>
    </svg>
  )
}

/** Outdoor condenser, read as a precision instrument rather than a box. */
function EquipmentScene({ uid, aged = false }) {
  const body = aged ? '#CFC7B4' : '#F4F0E7'
  const edge = aged ? '#A79C86' : '#DCD3C2'
  const ring = aged ? '#8A8271' : 'var(--color-cool)'
  const ringOpacity = aged ? 0.55 : 0.9

  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Defs uid={uid} />
      <rect width="800" height="600" fill={aged ? '#EFEAE0' : `url(#sky-${uid})`} />
      {!aged && <rect width="800" height="600" fill={`url(#sun-${uid})`} opacity=".7" />}

      {/* Housing */}
      <rect x="230" y="140" width="340" height="330" rx="20" fill={body} />
      <rect x="230" y="140" width="340" height="330" rx="20" fill="none" stroke={edge} strokeWidth="3" />

      {/* Fan grille */}
      <g fill="none" stroke={ring} strokeOpacity={ringOpacity}>
        <circle cx="400" cy="270" r="105" strokeWidth="3" />
        <circle cx="400" cy="270" r="78" strokeWidth="1.6" strokeOpacity={ringOpacity * 0.6} />
        <circle cx="400" cy="270" r="50" strokeWidth="1.6" strokeOpacity={ringOpacity * 0.45} />
        <circle cx="400" cy="270" r="16" strokeWidth="3" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path
            key={deg}
            d="M400 270 q40-46 96-24"
            strokeWidth="2.5"
            strokeOpacity={ringOpacity * 0.55}
            transform={`rotate(${deg} 400 270)`}
          />
        ))}
      </g>

      {/* Fin louvres */}
      <g stroke={edge} strokeWidth="3">
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M262 ${400 + i * 9}h276`} />
        ))}
      </g>

      {aged && (
        // Wear marks — reads as "old equipment" without being cartoonish
        <g fill="#9A7B4F" opacity=".38">
          <path d="M245 400 q10 40 -4 62 q22-8 26-40Z" />
          <path d="M552 190 q12 26 2 44 q18-10 16-34Z" />
          <path d="M300 452 q16 20 4 34 q20-6 18-26Z" />
        </g>
      )}

      <rect x="0" y="470" width="800" height="130" fill={aged ? '#E2DBCC' : '#EFE7D6'} />
      <path d="M0 470h800" stroke={edge} strokeWidth="2" />
    </svg>
  )
}

/** Filtration study — particles thinning as they cross the media. */
function AirScene({ uid }) {
  const dots = Array.from({ length: 46 }, (_, i) => {
    // Deterministic pseudo-random so the art is stable across renders.
    const x = ((i * 97) % 360) + 20
    const y = ((i * 53) % 520) + 40
    const r = 1.8 + ((i * 7) % 5) * 0.7
    return { x, y, r, key: i }
  })

  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Defs uid={uid} />
      <rect width="800" height="600" fill="#F2FAF8" />

      {/* Dusty side */}
      <g fill="#C08A4E" opacity=".55">
        {dots.map((d) => (
          <circle key={d.key} cx={d.x} cy={d.y} r={d.r} />
        ))}
      </g>

      {/* Filter media */}
      <g>
        <rect x="400" y="40" width="72" height="520" rx="9" fill="var(--color-fresh)" opacity=".16" />
        <rect x="400" y="40" width="72" height="520" rx="9" fill="none" stroke="var(--color-fresh-deep)" strokeOpacity=".7" strokeWidth="2" />
        {Array.from({ length: 13 }, (_, i) => (
          <path
            key={i}
            d={`M400 ${60 + i * 40} l72 20`}
            stroke="var(--color-fresh-deep)"
            strokeOpacity=".35"
            strokeWidth="2"
          />
        ))}
      </g>

      {/* Clean side — a few faint survivors, then clarity */}
      <g fill="var(--color-fresh-deep)" opacity=".3">
        <circle cx="530" cy="180" r="1.8" />
        <circle cx="612" cy="330" r="1.6" />
        <circle cx="700" cy="240" r="1.4" />
      </g>

      <g stroke="var(--color-fresh-deep)" strokeOpacity=".5" fill="none" strokeLinecap="round" strokeWidth="2">
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
