import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../lib/hooks'

/**
 * Animates between zero and the natural height of its content.
 *
 * Height is measured from the inner wrapper and applied as an inline style.
 * That is deliberate: inline styles are immune to stylesheet layering and
 * specificity, so this behaves identically no matter what else lands in the
 * cascade. A ResizeObserver keeps the target height correct when the content
 * changes (validation errors appearing, text reflowing at a new width).
 *
 * Collapsed content is also removed from the tab order and the a11y tree —
 * a hidden panel should not be reachable by keyboard.
 */
export default function Collapse({ open, children, duration = 320, className = '' }) {
  const reduced = usePrefersReducedMotion()
  const innerRef = useRef(null)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const el = innerRef.current
    if (!el) return

    const measure = () => setHeight(el.offsetHeight)
    measure()

    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [children])

  // Once open and settled, drop the fixed height so the panel can grow freely
  // (e.g. an error message appears) without being clipped mid-transition.
  const [settled, setSettled] = useState(open)
  useEffect(() => {
    if (!open) {
      setSettled(false)
      return
    }
    if (reduced) {
      setSettled(true)
      return
    }
    const t = setTimeout(() => setSettled(true), duration)
    return () => clearTimeout(t)
  }, [open, duration, reduced])

  return (
    <div
      className={className}
      aria-hidden={open ? undefined : true}
      // Collapsed content stays mounted (so it can be measured), so it must be
      // made genuinely unreachable — inert removes it from the tab order and
      // from hit-testing, which aria-hidden alone does not do.
      inert={open ? undefined : true}
      style={{
        height: open ? (settled ? 'auto' : height) : 0,
        opacity: open ? 1 : 0,
        overflow: open && settled ? 'visible' : 'hidden',
        transition: reduced
          ? undefined
          : `height ${duration}ms var(--ease-out-soft), opacity ${Math.round(duration * 0.8)}ms var(--ease-out-soft)`,
      }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  )
}
