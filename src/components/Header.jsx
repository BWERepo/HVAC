import { useEffect, useState } from 'react'
import { company, nav } from '../data/site'
import { useMountTransition, useScrollLock, useScrolled } from '../lib/hooks'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Logo from './ui/Logo'

/** Highlights whichever section currently owns the viewport. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id.replace('#', '')))
      .filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function Header({ onSchedule }) {
  const scrolled = useScrolled(40)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(nav.map((n) => n.href))
  const menu = useMountTransition(menuOpen, 260)

  useScrollLock(menuOpen)

  // Escape closes the mobile menu — every overlay on this site must have a
  // keyboard escape route, not just a visible X.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ease-out ${
          scrolled
            ? 'border-line bg-canvas/88 backdrop-blur-xl backdrop-saturate-150 shadow-soft'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div
          className={`u-container flex items-center justify-between transition-all duration-300 ease-out ${
            scrolled ? 'h-16' : 'h-20 lg:h-24'
          }`}
        >
          <a
            href="#top"
            className="rounded-lg transition-opacity hover:opacity-80"
            aria-label={`${company.fullName} — back to top`}
          >
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-4 -bottom-0.5 h-px bg-cool transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button as="a" href={company.phoneHref} variant="ghost" size="sm" icon="phone">
              Emergency Service
            </Button>
            <Button size="sm" onClick={onSchedule}>
              Schedule Service
            </Button>
          </div>

          {/* Mobile: call is one tap, everything else lives behind the menu. */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={company.phoneHref}
              className="flex size-11 items-center justify-center rounded-full text-cool-deep transition-colors hover:bg-sunk"
              aria-label={`Call emergency service at ${company.phone}`}
            >
              <Icon name="phone" size={21} />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-sunk"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      {menu.mounted && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className={`fixed inset-0 z-50 bg-canvas/97 backdrop-blur-xl transition-opacity duration-250 ease-out lg:hidden ${
              menu.visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="u-container flex h-20 items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex size-11 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-sunk"
                aria-label="Close menu"
                autoFocus
              >
                <Icon name="close" size={22} />
              </button>
            </div>

            <nav aria-label="Mobile" className="u-container mt-6 flex flex-col">
              {nav.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    animation: `pc-rise 400ms var(--ease-out-soft) ${60 + i * 50}ms both`,
                  }}
                  className="border-b border-line py-5 font-display text-3xl font-semibold text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="u-container mt-8 flex flex-col gap-3">
              <Button
                size="lg"
                onClick={() => {
                  setMenuOpen(false)
                  onSchedule()
                }}
              >
                Schedule Service
              </Button>
              <Button as="a" href={company.phoneHref} variant="outline" size="lg" icon="phone">
                {company.phone}
              </Button>
              <p className="mt-1 text-center text-xs text-ink-faint">{company.hours}</p>
            </div>
          </div>
      )}
    </>
  )
}
