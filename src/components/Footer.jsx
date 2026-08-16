import {
  bwe,
  company,
  demoDisclaimer,
  footerColumns,
  legalLinks,
  serviceAreas,
} from '../data/site'
import Icon from './ui/Icon'
import Logo from './ui/Logo'

const socials = [
  { icon: 'facebook', label: 'Facebook (placeholder link)' },
  { icon: 'instagram', label: 'Instagram (placeholder link)' },
  { icon: 'youtube', label: 'YouTube (placeholder link)' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-sunk">
      <div className="u-container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Identity + direct contact */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              Heating, cooling and indoor air quality for {company.region}.
            </p>

            <div className="mt-6 space-y-2.5">
              <a
                href={company.phoneHref}
                className="flex items-center gap-2.5 text-ink transition-colors hover:text-cool-deep"
              >
                <Icon name="phone" size={17} className="text-cool-deep" />
                <span className="tnum font-medium">{company.phone}</span>
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-2.5 text-ink-soft transition-colors hover:text-cool-deep"
              >
                <Icon name="message" size={17} className="text-cool-deep" />
                <span className="text-sm break-all">{company.email}</span>
              </a>
            </div>

            <ul className="mt-7 flex gap-2">
              {socials.map((social) => (
                <li key={social.icon}>
                  <a
                    href="#top"
                    aria-label={social.label}
                    className="flex size-11 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-cool/50 hover:text-cool-deep"
                  >
                    <Icon name={social.icon} size={19} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-ink uppercase">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {/* inline-block + padding gives these a comfortable touch
                        target without changing how the list reads. */}
                    <a
                      href={link.href}
                      className="inline-block py-1.5 text-sm text-ink-soft transition-colors hover:text-cool-deep"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-ink uppercase">
              Service Area
            </h2>
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
              {serviceAreas.map((area) => (
                <li key={area} className="text-sm text-ink-soft">
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-ink-faint">{company.hours}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {company.fullName}. {company.license}
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-block py-1.5 text-xs text-ink-faint transition-colors hover:text-cool-deep"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

/**
 * The demonstration disclosure. Deliberately the last thing on the page and
 * deliberately plain-spoken: nobody should be able to mistake the fictional
 * company, reviews, statistics or staff above for a real business.
 */
export function DemoDisclaimer() {
  return (
    <aside className="border-t border-bwe-clay/25 bg-bwe-ink">
      <div className="u-container flex flex-col items-center gap-5 py-10 text-center">
        <p className="max-w-3xl text-sm leading-relaxed text-bwe-cream/65">{demoDisclaimer}</p>
        <a
          href={bwe.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-display text-lg font-semibold text-bwe-cream transition-colors hover:text-bwe-clay"
        >
          BusinessWebExpress.com
          <Icon
            name="arrowRight"
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>
    </aside>
  )
}
