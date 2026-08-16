import Reveal from './Reveal'

/**
 * Shared section shell. `accent` sets the section's colour temperature via a
 * CSS variable, which the ambient glow and any child accents read from — this
 * is how the page shifts cool → warm → fresh without leaving the palette.
 */
const accents = {
  cool: 'var(--color-cool)',
  warm: 'var(--color-warm)',
  fresh: 'var(--color-fresh)',
  none: 'transparent',
}

export default function Section({
  id,
  accent = 'cool',
  glow = true,
  className = '',
  containerClassName = '',
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      style={{ '--sect-accent': accents[accent] ?? accents.cool }}
      className={`relative isolate overflow-clip py-16 sm:py-22 lg:py-26 ${className}`}
      {...rest}
    >
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22]"
          style={{
            background:
              'radial-gradient(60% 45% at 50% 0%, var(--sect-accent) 0%, transparent 70%)',
          }}
        />
      )}
      <div className={`u-container ${containerClassName}`}>{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  className = '',
  titleClassName = '',
}) {
  const alignment =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal as="p" className="eyebrow mb-4" style={{ color: 'var(--sect-accent)' }}>
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={60}
        className={`text-[clamp(2rem,5.2vw,3.5rem)] font-bold text-ink ${titleClassName}`}
      >
        {title}
      </Reveal>
      {sub && (
        <Reveal as="p" delay={120} className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {sub}
        </Reveal>
      )}
    </div>
  )
}
