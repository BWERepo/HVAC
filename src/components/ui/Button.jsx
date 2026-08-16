import Icon from './Icon'

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-display font-semibold ' +
  'rounded-full overflow-hidden cursor-pointer select-none whitespace-nowrap ' +
  'transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out ' +
  'active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100'

/**
 * On a light ground the bright hues do not carry white text, so every filled
 * variant except `primary` uses its text-safe `-deep` shade. Sunny amber is
 * the exception and the point: it is light enough to take near-black text at
 * ~7.7:1, which is what makes it read as cheerful rather than heavy.
 */
const variants = {
  primary:
    'bg-sun text-[#2a1b04] shadow-[0_10px_30px_-12px_var(--color-sun)] ' +
    'hover:bg-[#fbb534] hover:shadow-[0_14px_38px_-10px_var(--color-sun)]',
  cool:
    'bg-cool-deep text-white shadow-[0_10px_30px_-12px_var(--color-cool)] hover:bg-[#0284c7]',
  warm:
    'bg-warm-deep text-white shadow-[0_10px_30px_-12px_var(--color-warm)] hover:bg-[#dc4a10]',
  fresh:
    'bg-fresh-deep text-white shadow-[0_10px_30px_-12px_var(--color-fresh)] hover:bg-[#0d8b80]',
  outline: 'border border-line-strong bg-surface text-ink hover:bg-sunk',
  ghost: 'text-ink-soft hover:text-ink hover:bg-sunk',
  danger: 'bg-alert-deep text-white shadow-[0_10px_30px_-12px_var(--color-alert)] hover:bg-[#be123c]',
}

const sizes = {
  sm: 'text-sm px-4 py-2.5 min-h-[44px]',
  md: 'text-[0.95rem] px-6 py-3 min-h-[48px]',
  lg: 'text-base sm:text-lg px-7 py-4 min-h-[56px]',
}

export default function Button({
  as,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  className = '',
  children,
  ...rest
}) {
  const Tag = as || (rest.href ? 'a' : 'button')
  if (Tag === 'button' && !rest.type) rest.type = 'button'

  return (
    <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {/* Hover sheen — pure transform, and hidden from the a11y tree. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-linear-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[220%]"
      />
      {icon ? <Icon name={icon} size={18} className="relative shrink-0" /> : null}
      <span className="relative">{children}</span>
      {iconRight ? (
        <Icon
          name={iconRight}
          size={18}
          className="relative shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        />
      ) : null}
    </Tag>
  )
}
