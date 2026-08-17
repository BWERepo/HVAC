import { useEffect, useState } from 'react'
import heroFamilyPhoto from '../assets/hero-family.jpg'
import { company, hero } from '../data/site'
import { usePrefersReducedMotion } from '../lib/hooks'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Scene from './ui/Scene'

/** Small parallax offset driven by scroll. Disabled entirely for reduced motion. */
function useParallax(strength = 0.12) {
  const reduced = usePrefersReducedMotion()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (reduced) return
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        // Only the first viewport matters — stop doing work past it.
        const y = Math.min(window.scrollY, window.innerHeight)
        setOffset(y * strength)
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [strength, reduced])

  return offset
}

/**
 * Two-column split hero: text on a solid panel to the left, a full-strength
 * photo panel to the right. No scrim is needed on the photo because no text
 * ever sits on top of it — the two halves are separate boxes, not layers.
 */
export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const parallax = useParallax(0.12)

  return (
    <section id="top" className="relative isolate overflow-clip">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_56%]">
        {/* ---------------- Left: text panel ---------------- */}
        <div className="relative isolate flex min-h-[70dvh] flex-col justify-center overflow-clip bg-canvas px-5 py-16 sm:px-8 lg:min-h-[88dvh] lg:px-12 xl:pl-20">
          {/* Oversized ghost numeral — an editorial type moment bleeding off
              the left edge, deliberately larger than anything else on the
              page. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 -left-10 -z-[5] hidden font-display text-[20rem] leading-none font-bold text-ink/[0.035] select-none xl:block"
          >
            72°
          </span>

          <div className="max-w-xl">
            <p
              className="eyebrow mb-5"
              style={{
                animation: reduced ? undefined : 'pc-rise 700ms var(--ease-out-soft) both',
              }}
            >
              {company.region.replace(/^the /i, '')} · {company.tagline}
            </p>

            <div className="relative border-l-4 border-sun-deep/70 pl-6 sm:pl-8">
              <h1
                className="text-[clamp(2.5rem,4.6vw,4.25rem)] font-bold"
                style={{ fontFamily: 'var(--font-hero)', letterSpacing: '-0.01em' }}
              >
                {hero.headline.map((line, i) => (
                  <span
                    key={line}
                    className="block"
                    style={{
                      animation: reduced
                        ? undefined
                        : `pc-rise 900ms var(--ease-out-soft) ${180 + i * 130}ms both`,
                      color: i === 1 ? 'var(--color-sun-deep)' : undefined,
                    }}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              <p
                className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft"
                style={{
                  animation: reduced
                    ? undefined
                    : 'pc-rise 900ms var(--ease-out-soft) 560ms both',
                }}
              >
                {hero.sub}
              </p>

              <p
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-alert-deep uppercase"
                style={{
                  animation: reduced
                    ? undefined
                    : 'pc-rise 900ms var(--ease-out-soft) 630ms both',
                }}
              >
                <Icon name="alert" size={16} />
                {hero.emergencyLine}
              </p>

              <div
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
                style={{
                  animation: reduced
                    ? undefined
                    : 'pc-rise 900ms var(--ease-out-soft) 700ms both',
                }}
              >
                <Button as="a" href={hero.primaryCta.href} size="lg" iconRight="arrowRight">
                  {hero.primaryCta.label}
                </Button>
                <Button as="a" href={company.phoneHref} variant="outline" size="lg" icon="phone">
                  {hero.secondaryCta.label}
                </Button>
              </div>

              <a
                href={company.phoneHref}
                className="tnum mt-6 inline-block text-2xl font-bold text-ink transition-colors hover:text-sun-deep sm:text-3xl"
                style={{
                  animation: reduced
                    ? undefined
                    : 'pc-rise 900ms var(--ease-out-soft) 770ms both',
                }}
              >
                {company.phone}
              </a>

              <ul
                className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5"
                style={{
                  animation: reduced
                    ? undefined
                    : 'pc-rise 900ms var(--ease-out-soft) 840ms both',
                }}
              >
                {hero.proofLine.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1.5 text-sm font-medium text-ink-soft"
                  >
                    <Icon name="check" size={15} className="shrink-0 text-fresh-deep" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scroll cue — lives on the text panel, not floating over the photo. */}
          <a
            href="#thermostat"
            className="mt-14 hidden w-fit items-center gap-2 rounded-full py-2 text-[0.7rem] tracking-[0.18em] text-ink-faint uppercase transition-colors hover:text-ink lg:flex"
          >
            Explore
            <Icon name="chevronDown" size={18} className="text-cool-deep" />
          </a>
        </div>

        {/* ---------------- Right: photo panel ---------------- */}
        <div className="relative isolate min-h-[46dvh] overflow-hidden lg:min-h-[88dvh]">
          <div
            className="absolute inset-0 scale-110"
            style={{ transform: `translate3d(0, ${parallax}px, 0) scale(1.1)` }}
          >
            <Scene
              variant="home"
              ratio="auto"
              className="h-full"
              priority
              src={heroFamilyPhoto}
              alt="A happy family relaxing together at home — sample demonstration photography, not the actual business."
            />
          </div>

          {/* Soft edge so the photo doesn't hard-cut against the text panel
              on wide screens. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-24 bg-linear-to-r from-canvas/70 to-transparent lg:block"
          />
        </div>
      </div>
    </section>
  )
}
