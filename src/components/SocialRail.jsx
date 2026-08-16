import { socials } from '../data/site'
import Icon from './ui/Icon'

// Approximate brand colors, applied to the icon at rest via `currentColor` —
// a recognizable nod to each platform's identity, not an exact brand asset.
const brandColors = {
  facebook: '#1877F2',
  instagram: '#E1306C',
  google: '#4285F4',
  yelp: '#D32323',
  nextdoor: '#8DDE6B',
  youtube: '#FF0000',
  tiktok: '#25F4EE',
  x: '#111111',
  linkedin: '#0A66C2',
  pinterest: '#E60023',
  whatsapp: '#25D366',
  sms: '#0EA5E9',
}

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
                style={{ color: brandColors[social.id] }}
                className="flex size-9 items-center justify-center rounded-xl opacity-80 transition-all duration-200 hover:scale-110 hover:bg-current/10 hover:opacity-100"
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
