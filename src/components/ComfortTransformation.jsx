import { useCallback, useRef, useState } from 'react'
import { transformation } from '../data/site'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Scene from './ui/Scene'
import Section, { SectionHeading } from './ui/Section'

export default function ComfortTransformation() {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const frameRef = useRef(null)

  const setFromClientX = useCallback((clientX) => {
    const el = frameRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, pct)))
  }, [])

  const startDrag = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    setFromClientX(e.clientX)
  }

  const onDrag = (e) => {
    if (!dragging) return
    setFromClientX(e.clientX)
  }

  const endDrag = (e) => {
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    setDragging(false)
  }

  const onKeyDown = (e) => {
    const steps = { ArrowLeft: -4, ArrowRight: 4, PageDown: -12, PageUp: 12 }
    if (e.key in steps) {
      e.preventDefault()
      setPos((p) => Math.min(100, Math.max(0, p + steps[e.key])))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setPos(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setPos(100)
    }
  }

  return (
    <Section id="transformation" accent="cool">
      <SectionHeading
        eyebrow="Before & after"
        title={transformation.title}
        sub="Drag the divider to see what changes when tired equipment gets replaced with a properly matched modern system."
      />

      <Reveal delay={120} className="mx-auto mt-14 max-w-5xl">
        {/* Tapping the frame moves the divider; the handle itself is draggable. */}
        <div
          ref={frameRef}
          onPointerDown={startDrag}
          onPointerMove={onDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="relative overflow-hidden rounded-[2rem] border border-line shadow-lift select-none"
        >
          {/* Before */}
          <Scene
            variant="equipmentOld"
            alt="Illustration of an aging outdoor HVAC unit showing wear"
            ratio="16 / 10"
          />

          {/* After, clipped to the divider */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            aria-hidden="true"
          >
            <Scene variant="equipment" ratio="16 / 10" />
          </div>

          {/* Side labels */}
          <span className="absolute top-4 left-4 rounded-full bg-surface/85 px-3 py-1.5 text-xs font-semibold tracking-wide text-ink-soft uppercase backdrop-blur-sm">
            {transformation.before.label}
          </span>
          <span className="absolute top-4 right-4 rounded-full bg-cool/20 px-3 py-1.5 text-xs font-semibold tracking-wide text-cool-deep uppercase backdrop-blur-sm">
            {transformation.after.label}
          </span>

          {/* Divider + handle */}
          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-cool"
            style={{ left: `${pos}%`, boxShadow: '0 0 22px 2px var(--color-cool)' }}
          />
          <button
            type="button"
            role="slider"
            aria-label="Compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% showing the upgraded system`}
            onKeyDown={onKeyDown}
            className={`absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 touch-none items-center justify-center rounded-full border-2 border-cool bg-canvas text-cool-deep shadow-lg ${
              dragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ left: `${pos}%` }}
          >
            <Icon name="sliders" size={20} />
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-ink-faint">
          Drag the handle, or focus it and use the arrow keys.
        </p>

        {/* The substance behind the visual */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[transformation.before, transformation.after].map((side, i) => {
            const isAfter = i === 1
            return (
              <div
                key={side.label}
                className={`rounded-2xl border p-6 transition-colors ${
                  isAfter ? 'border-cool/40 bg-cool/8' : 'border-line bg-sunk/60'
                }`}
              >
                <h3
                  className={`font-display text-sm font-semibold tracking-[0.16em] uppercase ${
                    isAfter ? 'text-cool-deep' : 'text-ink-faint'
                  }`}
                >
                  {side.label}
                </h3>
                <ul className="mt-4 space-y-3">
                  {side.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <Icon
                        name={isAfter ? 'check' : 'minus'}
                        size={17}
                        className={`mt-0.5 shrink-0 ${isAfter ? 'text-cool-deep' : 'text-ink-faint/60'}`}
                      />
                      <span className={isAfter ? 'text-ink' : 'text-ink-soft'}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Reveal>
    </Section>
  )
}
