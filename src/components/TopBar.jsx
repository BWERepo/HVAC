import { bwe } from '../data/site'
import Icon from './ui/Icon'

/**
 * The strip at the very top of the page: the quiet Business Web Express
 * demonstration notice. Social/contact links live in `SocialRail.jsx` on the
 * right edge of the viewport instead — keeping them out of this strip avoids
 * duplicating the same 12 icons in two places.
 *
 * It scrolls away — the site header is what sticks — so it introduces the
 * notice once and then gets out of the way of the HVAC brand underneath.
 */
export default function TopBar() {
  return (
    <div className="relative z-30 border-b border-line bg-sunk">
      {/* Kept deliberately short: this strip must not eat the top of a phone
          screen before the hero gets a chance to land. */}
      <div className="u-container flex items-center justify-center py-1.5 sm:py-2">
        <div className="flex flex-wrap items-center justify-center gap-x-3 text-center">
          <p className="flex items-center gap-1.5 text-[0.7rem] text-ink-faint sm:text-[0.78rem]">
            <Icon name="sparkle" size={13} className="shrink-0 text-bwe-clay" />
            <span>{bwe.bannerText}</span>
          </p>
          <a
            href="#business-web-express"
            className="group inline-flex items-center gap-1 rounded-full text-[0.7rem] font-semibold text-sun-deep transition-colors hover:text-ink sm:text-[0.78rem]"
          >
            {bwe.bannerCta}
            <Icon
              name="arrowRight"
              size={13}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
