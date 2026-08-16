import { company } from '../data/site'
import { usePrefersReducedMotion } from '../lib/hooks'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'

export default function EmergencyCTA() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="emergency" className="relative isolate overflow-clip py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 70% at 50% 50%, color-mix(in oklab, var(--color-alert) 18%, transparent), transparent 72%)',
        }}
      />

      <div className="u-container">
        <div className="relative overflow-hidden rounded-[2rem] border border-alert/25 bg-linear-to-br from-[#1a0f18] to-base p-8 text-center sm:p-14">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-alert/30 bg-alert/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-alert uppercase">
              <span className="relative flex size-2">
                <span
                  className="absolute inline-flex size-full rounded-full bg-alert"
                  style={{ animation: reduced ? undefined : 'pc-pulse-ring 2s ease-out infinite' }}
                />
                <span className="relative inline-flex size-2 rounded-full bg-alert" />
              </span>
              24/7 Emergency Service
            </span>
          </Reveal>

          <Reveal delay={80} as="h2" className="mt-7 text-[clamp(2rem,6vw,4rem)] font-bold text-ink">
            No Heat? No AC? We’re Here.
          </Reveal>

          <Reveal delay={150} as="p" className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            HVAC problems rarely happen at convenient times.
          </Reveal>

          <Reveal delay={220} className="mt-10 flex flex-col items-center gap-4">
            {/* Tapping the number opens the dialer on mobile. */}
            <a
              href={company.phoneHref}
              className="group inline-flex min-h-[64px] cursor-pointer items-center gap-4 rounded-full bg-alert px-8 py-4 font-display text-lg font-bold text-[#2b0710] shadow-[0_14px_50px_-12px_var(--color-alert)] transition-all duration-200 hover:bg-[#ff8fa0] active:scale-[0.97] sm:text-xl"
            >
              <Icon name="phone" size={24} className="shrink-0" strokeWidth={1.9} />
              <span className="tnum">Call {company.phone}</span>
            </a>
            <p className="text-sm text-ink-faint">{company.hours}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
