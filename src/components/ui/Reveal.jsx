import { useInView, usePrefersReducedMotion } from '../../lib/hooks'

/**
 * Scroll-reveal wrapper. Deliberately CSS-transition based rather than a
 * motion component: this is used dozens of times per page, and transform +
 * opacity on an IntersectionObserver trigger costs essentially nothing.
 *
 * When motion is reduced the content renders in its final state immediately —
 * it never mounts invisible and waits for an animation that will not run.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 22,
  as: Tag = 'div',
  className = '',
  style,
  ...rest
}) {
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView()

  const shown = reduced || inView

  return (
    <Tag
      ref={ref}
      className={className}
      // Caller styles are merged in, never allowed to replace the transition.
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translate3d(0, ${y}px, 0)`,
        transition: reduced
          ? undefined
          : `opacity 700ms var(--ease-out-soft) ${delay}ms, transform 700ms var(--ease-out-soft) ${delay}ms`,
        willChange: shown ? undefined : 'opacity, transform',
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
