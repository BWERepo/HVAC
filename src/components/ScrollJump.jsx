import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../lib/hooks'
import Icon from './ui/Icon'

/**
 * A small fixed pair of jump buttons — back to top, and down to the bottom
 * of the page. The "top" button only appears once there's somewhere to
 * scroll back to; "bottom" is always available.
 */
export default function ScrollJump() {
  const reduced = usePrefersReducedMotion()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (y) => {
    window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div className="fixed right-5 bottom-[calc(76px+1.25rem)] z-40 flex flex-col gap-2 lg:right-24 lg:bottom-6">
      {showTop && (
        <button
          type="button"
          onClick={() => scrollTo(0)}
          aria-label="Scroll back to top"
          title="Back to top"
          className="flex size-11 items-center justify-center rounded-full border border-line bg-surface/90 text-ink-soft shadow-lift backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-sun-deep"
        >
          <Icon name="chevronDown" size={18} className="rotate-180" />
        </button>
      )}
      <button
        type="button"
        onClick={() => scrollTo(document.body.scrollHeight)}
        aria-label="Scroll to bottom of page"
        title="Jump to bottom"
        className="flex size-11 items-center justify-center rounded-full border border-line bg-surface/90 text-ink-soft shadow-lift backdrop-blur-sm transition-all duration-200 hover:translate-y-0.5 hover:text-sun-deep"
      >
        <Icon name="chevronDown" size={18} />
      </button>
    </div>
  )
}
