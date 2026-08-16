import { bwe } from '../data/site'
import Icon from './ui/Icon'

/**
 * Deliberately quiet: this bar identifies the prototype without competing with
 * the HVAC brand underneath it. It scrolls away (the site header is what
 * sticks), so it introduces itself once and then gets out of the way.
 */
export default function DemoBanner() {
  return (
    <div className="relative z-30 border-b border-white/10 bg-void/80 backdrop-blur-md">
      <div className="u-container flex min-h-11 flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-center">
        <p className="flex items-center gap-2 text-[0.78rem] text-ink-faint">
          <Icon name="sparkle" size={14} className="text-bwe-clay" />
          <span>{bwe.bannerText}</span>
        </p>
        <a
          href="#business-web-express"
          className="group inline-flex items-center gap-1 rounded-full text-[0.78rem] font-semibold text-cool transition-colors hover:text-ink"
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
  )
}
