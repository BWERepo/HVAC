import { useCallback, useEffect, useRef, useState } from 'react'

/** Tracks the OS reduced-motion preference and reacts to live changes. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Fires once when an element scrolls into view. Used for every scroll reveal
 * on the page — an observer per element is far cheaper than a scroll handler.
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // No IntersectionObserver (or SSR): show content rather than hide it.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, inView]
}

/**
 * Counts from 0 to `target` once `active` is true.
 * Skips straight to the final value when motion is reduced.
 */
export function useCountUp(target, { duration = 1600, active = true, decimals = 0 } = {}) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setValue(target)
      return
    }

    let frame
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      // ease-out cubic — fast start, settled finish
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Number((target * eased).toFixed(decimals)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, active, reduced, decimals])

  return value
}

/**
 * True once the page has scrolled past `offset`.
 *
 * Deliberately not rAF-throttled. An rAF-gated version latches its "pending"
 * flag before scheduling, so a scroll that happens while the page is hidden
 * (a background tab restoring its scroll position, for instance) sets the flag
 * and never clears it — rAF does not run in hidden documents — leaving the
 * sticky header and mobile bar permanently stuck. Comparing one boolean per
 * scroll event is cheap, and React bails out when the value is unchanged.
 */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}

/**
 * Deterministic enter/exit lifecycle for overlays and reveals.
 *
 * Returns `mounted` (render it at all) and `visible` (the flag CSS transitions
 * off). Mount happens first, then `visible` flips on the next frame so the
 * browser has a start state to animate from; on close `visible` flips off and
 * unmount follows `duration` later.
 *
 * This replaces AnimatePresence throughout the project: its exit callbacks
 * were not firing reliably here, which left dismissed overlays mounted on top
 * of the page. Timers are predictable and cost nothing.
 */
export function useMountTransition(open, duration = 240) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf1
    let raf2
    let timer

    if (open) {
      setMounted(true)
      // Two frames: one for the mount to commit, one for the start state to
      // be painted before the transition begins.
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true))
      })
    } else {
      setVisible(false)
      timer = setTimeout(() => setMounted(false), duration)
    }

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      clearTimeout(timer)
    }
  }, [open, duration])

  return { mounted, visible }
}

/** Locks body scroll while a modal or sheet is open, without layout shift. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}

/** Smooth-scrolls to an in-page anchor, respecting reduced motion. */
export function useScrollTo() {
  const reduced = usePrefersReducedMotion()

  return useCallback(
    (hash) => {
      const el = document.querySelector(hash)
      if (!el) return
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    },
    [reduced],
  )
}
