import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/site'
import { usePrefersReducedMotion } from '../lib/hooks'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

export default function Testimonials() {
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()

  const syncEdges = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    syncEdges()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', syncEdges, { passive: true })
    window.addEventListener('resize', syncEdges)
    return () => {
      el.removeEventListener('scroll', syncEdges)
      window.removeEventListener('resize', syncEdges)
    }
  }, [syncEdges])

  const scrollBy = useCallback((dir) => {
    const el = trackRef.current
    if (!el) return
    // Advance by one card so the snap points line up predictably.
    const card = el.querySelector('[data-card]')
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }, [])

  // Gentle auto-advance — pauses on hover/focus and never runs under
  // reduced motion. Stops for good once the user reaches the last card.
  useEffect(() => {
    if (reduced || paused || atEnd) return
    const id = setInterval(() => scrollBy(1), 6000)
    return () => clearInterval(id)
  }, [reduced, paused, atEnd, scrollBy])

  return (
    <Section id="testimonials" accent="cool">
      <Reveal className="mx-auto mb-10 flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-full border border-line bg-surface/80 px-5 py-2.5 text-center shadow-soft sm:w-fit sm:flex-nowrap">
        <span className="flex items-center gap-2">
          <span className="tnum font-display text-2xl font-bold text-ink">4.9</span>
          <span className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="star" size={16} className="text-sun" strokeWidth={1.4} style={{ fill: 'var(--color-sun)' }} />
            ))}
          </span>
        </span>
        <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
        <span className="text-sm font-medium text-ink-soft">Trusted by Local Homeowners</span>
      </Reveal>

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          align="left"
          eyebrow="What homeowners say"
          title="Comfort people actually noticed."
          className="md:max-w-2xl"
        />

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Previous testimonials"
            className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-line bg-sunk/70 text-ink transition-colors hover:bg-sunk disabled:opacity-35 disabled:hover:bg-sunk"
          >
            <Icon name="chevronLeft" size={20} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="More testimonials"
            className="flex size-12 rotate-180 cursor-pointer items-center justify-center rounded-full border border-line bg-sunk/70 text-ink transition-colors hover:bg-sunk disabled:opacity-35 disabled:hover:bg-sunk"
          >
            <Icon name="chevronLeft" size={20} />
          </button>
        </div>
      </div>

      <Reveal delay={100} className="mt-12">
        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label="Customer testimonials, scrollable"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 md:-mx-8 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <li
              key={t.name}
              data-card
              className="group w-[85vw] shrink-0 snap-start sm:w-[26rem]"
            >
              <figure className="glass flex h-full flex-col rounded-[var(--radius-card)] p-8 transition-transform duration-300 group-hover:-translate-y-1.5">
                <span className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      size={15}
                      className="text-sun"
                      strokeWidth={1.4}
                      style={{ fill: 'var(--color-sun)' }}
                    />
                  ))}
                </span>

                <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                  <span className="flex size-10 items-center justify-center rounded-full bg-cool/15 font-display text-sm font-semibold text-cool-deep">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-display font-semibold text-ink">{t.name}</span>
                    <span className="block text-sm text-ink-faint">{t.detail}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>

      <p className="mt-6 text-center text-xs tracking-[0.12em] text-ink-faint/70 uppercase">
        Sample demonstration content
      </p>
    </Section>
  )
}
