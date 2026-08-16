import Icon from './Icon'

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-display font-semibold ' +
  'rounded-full overflow-hidden cursor-pointer select-none whitespace-nowrap ' +
  'transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out ' +
  'active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100'

const variants = {
  // One primary treatment, used sparingly — the electric cyan is the site's
  // single loudest colour and it always means "this is the action".
  primary:
    'bg-cool text-[#04121a] shadow-[0_10px_40px_-12px_var(--color-cool)] ' +
    'hover:bg-[#4ce0f5] hover:shadow-[0_14px_50px_-10px_var(--color-cool)]',
  warm:
    'bg-warm text-[#231204] shadow-[0_10px_40px_-12px_var(--color-warm)] ' +
    'hover:bg-[#ffbe6d] hover:shadow-[0_14px_50px_-10px_var(--color-warm)]',
  fresh:
    'bg-fresh text-[#04211c] shadow-[0_10px_40px_-12px_var(--color-fresh)] ' +
    'hover:bg-[#8bf3e2] hover:shadow-[0_14px_50px_-10px_var(--color-fresh)]',
  outline:
    'border border-white/20 bg-white/[0.04] text-ink backdrop-blur-md ' +
    'hover:bg-white/[0.10] hover:border-white/35',
  ghost: 'text-ink-soft hover:text-ink hover:bg-white/[0.06]',
  danger:
    'bg-alert text-[#2b0710] shadow-[0_10px_40px_-12px_var(--color-alert)] hover:bg-[#ff8fa0]',
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
        className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[220%]"
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
