import { useCallback, useRef, useState } from 'react'
import Button from './ui/Button'
import Collapse from './ui/Collapse'
import Icon from './ui/Icon'

const MIN = 65
const MAX = 80
const START_ANGLE = 135 // bottom-left
const SWEEP = 270 // leaves a gap at the bottom, like a real thermostat dial

/** Climate bands. 71–73 is the "perfect" window that unlocks the CTA. */
function climateFor(temp) {
  if (temp >= 77) return { label: 'Too Warm', accent: 'var(--color-warm)', tone: 'warm' }
  if (temp >= 74) return { label: 'A Little Warm', accent: 'var(--color-warm)', tone: 'warm' }
  if (temp >= 71) return { label: 'Perfect', accent: 'var(--color-fresh)', tone: 'perfect' }
  if (temp >= 69) return { label: 'Comfortably Cool', accent: 'var(--color-cool)', tone: 'cool' }
  return { label: 'Getting Chilly', accent: 'var(--color-cool-deep)', tone: 'cold' }
}

function polar(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx, cy, r, startDeg, endDeg) {
  if (endDeg <= startDeg) return ''
  const start = polar(cx, cy, r, startDeg)
  const end = polar(cx, cy, r, endDeg)
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

export default function InteractiveThermostat({ onSchedule }) {
  const [temp, setTemp] = useState(78)
  const [dragging, setDragging] = useState(false)
  const dialRef = useRef(null)

  const climate = climateFor(temp)
  const fraction = (temp - MIN) / (MAX - MIN)
  const angle = START_ANGLE + fraction * SWEEP
  const handle = polar(160, 160, 128, angle)

  const clamp = (v) => Math.min(MAX, Math.max(MIN, v))

  /** Maps a pointer position on the dial to a temperature. */
  const tempFromPointer = useCallback((clientX, clientY) => {
    const el = dialRef.current
    if (!el) return null

    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    let deg = (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI
    if (deg < 0) deg += 360

    // Rotate so 0 = the dial's minimum end.
    let rel = deg - START_ANGLE
    if (rel < 0) rel += 360

    // Pointer landed in the gap at the bottom — snap to the nearer end.
    if (rel > SWEEP) rel = rel > 315 ? 0 : SWEEP

    return clamp(Math.round(MIN + (rel / SWEEP) * (MAX - MIN)))
  }, [])

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    const next = tempFromPointer(e.clientX, e.clientY)
    if (next != null) setTemp(next)
  }

  const handlePointerMove = (e) => {
    if (!dragging) return
    const next = tempFromPointer(e.clientX, e.clientY)
    if (next != null) setTemp(next)
  }

  const endDrag = (e) => {
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    setDragging(false)
  }

  const onKeyDown = (e) => {
    const keys = {
      ArrowUp: 1,
      ArrowRight: 1,
      ArrowDown: -1,
      ArrowLeft: -1,
      PageUp: 5,
      PageDown: -5,
    }
    if (e.key in keys) {
      e.preventDefault()
      setTemp((t) => clamp(t + keys[e.key]))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setTemp(MIN)
    } else if (e.key === 'End') {
      e.preventDefault()
      setTemp(MAX)
    }
  }

  return (
    <section
      id="thermostat"
      className="relative isolate overflow-clip py-20 sm:py-28 lg:py-32"
      style={{ '--dial': climate.accent }}
    >
      {/* The room responds to the dial. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(70% 55% at 50% 40%, color-mix(in oklab, var(--dial) 26%, transparent) 0%, transparent 72%)',
          opacity: climate.tone === 'perfect' ? 0.9 : 0.65,
        }}
      />

      <div className="u-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4" style={{ color: 'var(--dial)' }}>
            Try it yourself
          </p>
          <h2 className="text-[clamp(2rem,5.2vw,3.5rem)] font-bold text-ink">
            How Comfortable Is Your Home?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Drag the dial. Watch the room change. Most homes have a setting where everything
            finally feels right — we help yours find it.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-center gap-10 lg:flex-row lg:justify-center lg:gap-20">
          {/* ---------------- Dial ---------------- */}
          <div className="relative">
            <div
              ref={dialRef}
              role="slider"
              tabIndex={0}
              aria-label="Target temperature"
              aria-valuemin={MIN}
              aria-valuemax={MAX}
              aria-valuenow={temp}
              aria-valuetext={`${temp} degrees Fahrenheit — ${climate.label}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onKeyDown={onKeyDown}
              className={`relative size-64 touch-none select-none sm:size-[19rem] lg:size-[23rem] ${
                dragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              <svg viewBox="0 0 320 320" className="size-full overflow-visible">
                <defs>
                  <linearGradient id="dial-fill" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--dial)" stopOpacity=".35" />
                    <stop offset="100%" stopColor="var(--dial)" />
                  </linearGradient>
                </defs>

                {/* Ticks */}
                <g>
                  {Array.from({ length: MAX - MIN + 1 }, (_, i) => {
                    const a = START_ANGLE + (i / (MAX - MIN)) * SWEEP
                    const outer = polar(160, 160, 146, a)
                    const inner = polar(160, 160, i % 5 === 0 ? 134 : 139, a)
                    const passed = MIN + i <= temp
                    return (
                      <line
                        key={i}
                        x1={inner.x}
                        y1={inner.y}
                        x2={outer.x}
                        y2={outer.y}
                        stroke={passed ? 'var(--dial)' : 'currentColor'}
                        className={passed ? '' : 'text-line-strong'}
                        strokeOpacity={passed ? 0.8 : 1}
                        strokeWidth={i % 5 === 0 ? 2 : 1.25}
                        strokeLinecap="round"
                      />
                    )
                  })}
                </g>

                {/* Track + progress */}
                <path
                  d={arcPath(160, 160, 128, START_ANGLE, START_ANGLE + SWEEP)}
                  fill="none"
                  stroke="currentColor"
                  className="text-line"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d={arcPath(160, 160, 128, START_ANGLE, angle)}
                  fill="none"
                  stroke="url(#dial-fill)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  style={{ transition: dragging ? 'none' : 'all 300ms var(--ease-out-soft)' }}
                />

                {/* Handle */}
                <g style={{ transition: dragging ? 'none' : 'all 300ms var(--ease-out-soft)' }}>
                  <circle cx={handle.x} cy={handle.y} r="18" fill="var(--dial)" opacity=".18" />
                  <circle
                    cx={handle.x}
                    cy={handle.y}
                    r="11"
                    fill="var(--color-canvas)"
                    stroke="var(--dial)"
                    strokeWidth="3.5"
                  />
                </g>
              </svg>

              {/* Readout */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex items-start">
                  <span className="tnum font-display text-[5.5rem] leading-none font-light tracking-tighter text-ink sm:text-[6.5rem]">
                    {temp}
                  </span>
                  <span
                    className="mt-2 font-display text-3xl font-light"
                    style={{ color: 'var(--dial)' }}
                  >
                    °
                  </span>
                </div>
                <span
                  className="mt-1 font-display text-sm font-semibold tracking-[0.16em] uppercase transition-colors duration-500"
                  style={{ color: 'var(--dial)' }}
                >
                  {climate.label}
                </span>
              </div>
            </div>

            {/* Coarse controls — nobody should be forced to drag precisely. */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setTemp((t) => clamp(t - 1))}
                disabled={temp <= MIN}
                className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-line bg-sunk/70 text-ink transition-colors hover:bg-sunk disabled:opacity-40 disabled:hover:bg-sunk"
                aria-label="Decrease temperature by one degree"
              >
                <Icon name="minus" size={20} />
              </button>
              <p className="w-40 text-center text-xs text-ink-faint">
                Drag the dial or use the arrow keys
              </p>
              <button
                type="button"
                onClick={() => setTemp((t) => clamp(t + 1))}
                disabled={temp >= MAX}
                className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-line bg-sunk/70 text-ink transition-colors hover:bg-sunk disabled:opacity-40 disabled:hover:bg-sunk"
                aria-label="Increase temperature by one degree"
              >
                <Icon name="plus" size={20} />
              </button>
            </div>
          </div>

          {/* ---------------- Response panel ---------------- */}
          <div className="w-full max-w-md">
            <div className="glass rounded-[var(--radius-card)] p-8">
              <div className="flex items-center gap-3">
                <span
                  className="flex size-11 items-center justify-center rounded-full"
                  style={{ background: 'color-mix(in oklab, var(--dial) 18%, transparent)' }}
                >
                  <Icon
                    name={
                      climate.tone === 'warm'
                        ? 'sun'
                        : climate.tone === 'cold'
                          ? 'snow'
                          : 'check'
                    }
                    size={22}
                    style={{ color: 'var(--dial)' }}
                  />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold text-ink">{climate.label}</p>
                  <p className="text-sm text-ink-faint">at {temp}°F</p>
                </div>
              </div>

              <p className="mt-5 leading-relaxed text-ink-soft">
                {climate.tone === 'warm' &&
                  'Rooms this warm usually mean the system is undersized, short-cycling, or losing capacity — not that you need to just live with it.'}
                {climate.tone === 'cold' &&
                  'Overcooling is its own kind of uncomfortable, and it is usually costing you money at the same time.'}
                {climate.tone === 'cool' &&
                  'Close. A properly balanced system holds this steadily in every room, not just near the thermostat.'}
                {climate.tone === 'perfect' &&
                  'This is the setting most people describe as "just right" — and the one a well-matched system can hold all day without straining.'}
              </p>

              {/* The payoff, revealed only in the perfect band. */}
              <Collapse open={climate.tone === 'perfect'}>
                <div className="mt-6 border-t border-line pt-6">
                  <p className="font-display text-2xl font-semibold text-ink">
                    Let’s make your home feel like this.
                  </p>
                  <Button
                    variant="fresh"
                    size="lg"
                    className="mt-5 w-full"
                    onClick={onSchedule}
                    iconRight="arrowRight"
                  >
                    Schedule Service
                  </Button>
                </div>
              </Collapse>
            </div>

            {/* Live region so the dial is usable without sight. */}
            <p className="sr-only" aria-live="polite">
              {temp} degrees — {climate.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
