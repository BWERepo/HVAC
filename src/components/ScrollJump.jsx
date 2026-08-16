import { usePrefersReducedMotion, useScrolled } from '../lib/hooks'
import Icon from './ui/Icon'

/**
 * A small fixed pair of jump buttons — back to top, and down to the bottom
 * of the page. Both are always visible so either jump is available
 * immediately, from anywhere on the page. The bottom offset only reserves
 * room for MobileActionBar once it's actually visible (same 520px threshold
 * it uses) — otherwise there's dead space under the buttons early in the page.
 */
export default function ScrollJump() {
  const reduced = usePrefersReducedMotion()
  const barVisible = useScrolled(520)

  const scrollTo = (y) => {
    window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div
      className={`fixed right-5 z-40 flex flex-col gap-2 transition-[bottom] duration-300 ease-out lg:right-24 lg:bottom-6 ${
        barVisible ? 'bottom-[calc(76px+env(safe-area-inset-bottom)+1.25rem)]' : 'bottom-5'
      }`}
    >
      <button
        type="button"
        onClick={() => scrollTo(0)}
        aria-label="Scroll back to top"
        title="Back to top"
        className="flex size-11 items-center justify-center rounded-full border border-line bg-surface/90 text-ink-soft shadow-lift backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-sun-deep"
      >
        <Icon name="chevronDown" size={18} className="rotate-180" />
      </button>
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
