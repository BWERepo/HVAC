import { socials } from '../data/site'
import Icon from './ui/Icon'

/**
 * A prominent vertical strip of social/contact icons pinned to the right
 * edge of the viewport. Desktop-only (`lg:flex`) — on mobile, TopBar already
 * carries the same icons up top and the fixed MobileActionBar owns the
 * bottom edge, so a second rail there would just compete for space.
 */
export default function SocialRail() {
  return (
    <div
      className="pointer-events-none fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 lg:flex"
      aria-label="Social and contact links"
    >
      <ul className="pointer-events-auto flex flex-col gap-1.5 rounded-l-2xl border border-r-0 border-line bg-surface/90 p-2 shadow-lift backdrop-blur-sm">
        {socials.map((social) => {
          const isContactLink = social.id === 'sms' || social.id === 'whatsapp'
          return (
            <li key={social.id}>
              <a
                href={social.href}
                aria-label={isContactLink ? social.label : `${social.label} (placeholder link)`}
                title={social.label}
                className="flex size-9 items-center justify-center rounded-xl text-ink-soft transition-all duration-200 hover:scale-110 hover:bg-sun/15 hover:text-sun-deep"
              >
                <Icon name={social.id} size={17} />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
