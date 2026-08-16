import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/site'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

export default function Testimonials() {
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

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

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    // Advance by one card so the snap points line up predictably.
    const card = el.querySelector('[data-card]')
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <Section id="testimonials" accent="cool">
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
            className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-ink transition-colors hover:bg-white/10 disabled:opacity-35 disabled:hover:bg-white/5"
          >
            <Icon name="chevronLeft" size={20} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="More testimonials"
            className="flex size-12 rotate-180 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-ink transition-colors hover:bg-white/10 disabled:opacity-35 disabled:hover:bg-white/5"
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
                      className="text-warm"
                      strokeWidth={1.4}
                      style={{ fill: 'var(--color-warm)' }}
                    />
                  ))}
                </span>

                <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="flex size-10 items-center justify-center rounded-full bg-cool/15 font-display text-sm font-semibold text-cool">
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
