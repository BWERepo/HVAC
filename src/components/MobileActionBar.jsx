import { company } from '../data/site'
import { useScrolled } from '../lib/hooks'
import Icon from './ui/Icon'

/**
 * Persistent mobile conversion bar. Hidden until the hero has scrolled past so
 * it never covers the opening impression, and it sits above the iOS home
 * indicator via safe-area padding.
 */
export default function MobileActionBar({ onSchedule }) {
  const past = useScrolled(520)

  const itemClass =
    'flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl py-2 ' +
    'text-[0.7rem] font-semibold transition-colors duration-200 min-h-[52px]'

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out lg:hidden ${
        past ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav
        aria-label="Quick contact"
        className="mx-3 mb-3 flex items-center gap-1 rounded-2xl border border-line bg-surface/95 p-1.5 shadow-lift backdrop-blur-xl"
      >
        <a href={company.phoneHref} className={`${itemClass} text-cool-deep hover:bg-sunk`}>
          <Icon name="phone" size={20} />
          Call
        </a>

        <button
          type="button"
          onClick={onSchedule}
          className={`${itemClass} bg-cool text-[#04121a] hover:bg-[#4ce0f5]`}
        >
          <Icon name="calendar" size={20} />
          Schedule
        </button>

        <a href={company.smsHref} className={`${itemClass} text-ink-soft hover:bg-sunk`}>
          <Icon name="message" size={20} />
          Text
        </a>
      </nav>
    </div>
  )
}
