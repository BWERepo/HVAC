import { bwe, socials } from '../data/site'
import Icon from './ui/Icon'

/**
 * The strip at the very top of the page: the business's social presence on the
 * left, and the quiet Business Web Express demonstration notice on the right.
 *
 * It scrolls away — the site header is what sticks — so it introduces both
 * once and then gets out of the way of the HVAC brand underneath.
 */
export default function TopBar() {
  return (
    <div className="relative z-30 border-b border-line bg-sunk">
      {/* Kept deliberately short: this strip must not eat the top of a phone
          screen before the hero gets a chance to land. */}
      <div className="u-container flex flex-col items-center gap-1 py-1.5 sm:flex-row sm:justify-between sm:gap-4 sm:py-2">
        <ul className="flex items-center justify-center gap-0.5">
          {socials.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                // Placeholder links on this demonstration — labelled as such so
                // nobody (including a screen reader) mistakes them for live
                // profiles.
                aria-label={`${social.label} (placeholder link)`}
                title={social.label}
                className="flex size-7 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-sunk-deep hover:text-sun-deep sm:size-8"
              >
                <Icon name={social.id} size={16} />
              </a>
            </li>
          ))}
        </ul>

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
