import { company } from '../data/site'
import { usePrefersReducedMotion } from '../lib/hooks'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'

/**
 * The one moment on the HVAC-branded page that commits fully to the alert
 * colour rather than using it as a thin accent — full-bleed, sharp-edged,
 * dark enough that white text clears body-text contrast. Deliberately not
 * a rounded card floating on the warm-white ground like every other section.
 */
export default function EmergencyCTA() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="emergency"
      className="relative isolate overflow-clip py-20 sm:py-28"
      style={{ background: 'linear-gradient(155deg, #7f1233 0%, #9f1b3f 62%, #7f1233 100%)' }}
    >
      {/* Oversized ghost numeral — the same editorial-type move as the hero,
          reinforced here so it reads as a system, not a one-off. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-16 hidden font-display text-[22rem] leading-none font-bold text-white/[0.06] select-none sm:block"
      >
        24/7
      </span>

      <div className="u-container relative">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-white uppercase">
              <span className="relative flex size-2">
                <span
                  className="absolute inline-flex size-full rounded-full bg-white"
                  style={{ animation: reduced ? undefined : 'pc-pulse-ring 2s ease-out infinite' }}
                />
                <span className="relative inline-flex size-2 rounded-full bg-white" />
              </span>
              24/7 Emergency Service
            </span>
          </Reveal>

          <Reveal
            delay={80}
            as="h2"
            className="mt-7 text-[clamp(2.25rem,6.5vw,4.25rem)] font-bold text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            AC Out? Heat Out?
            <br />
            We’re Here When You Need Us.
          </Reveal>

          <Reveal delay={150} as="p" className="mt-5 max-w-lg text-lg text-white/80">
            24/7 Emergency HVAC Service — HVAC problems rarely happen at convenient times.
          </Reveal>

          <Reveal delay={220} className="mt-10 flex flex-wrap items-center gap-5">
            {/* Tapping the number opens the dialer on mobile. */}
            <a
              href={company.phoneHref}
              className="group inline-flex min-h-[64px] cursor-pointer items-center gap-4 rounded-full bg-white px-8 py-4 font-display text-lg font-bold text-[#7f1233] shadow-[0_18px_44px_-16px_rgba(0,0,0,0.5)] transition-all duration-200 hover:bg-white/90 active:scale-[0.97] sm:text-xl"
            >
              <Icon name="phone" size={24} className="shrink-0" strokeWidth={1.9} />
              <span className="tnum">Call Now: {company.phone}</span>
            </a>
            <p className="text-sm text-white/70">{company.hours}</p>
          </Reveal>

          <Reveal delay={280} className="mt-6">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
              <span className="size-1.5 rounded-full bg-white" />
              3 Technicians Available Now
              <span className="text-white/55">— sample demo content</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
