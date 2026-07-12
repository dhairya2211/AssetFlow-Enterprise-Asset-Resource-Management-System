import { forwardRef } from 'react'
import { cn } from '@/utils'

/**
 * Reusable Button component with modern enterprise design
 * Supports multiple variants, sizes, and states
 */
const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  fullWidth = false,
  className = '',
  children,
  ...props
}, ref) => {
  const variants = {
    primary: 'bg-[rgb(var(--color-primary-500))] text-[rgb(var(--color-primary-foreground))] hover:bg-[rgb(var(--color-primary-600))] focus:ring-[rgb(var(--color-primary-500))]',
    secondary: 'bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] border border-[rgb(var(--color-border))] hover:bg-[rgb(var(--color-surface-hover))] focus:ring-[rgb(var(--color-border))]',
    ghost: 'bg-transparent text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-surface-hover))] focus:ring-[rgb(var(--color-surface-hover))]',
    danger: 'bg-[rgb(var(--color-error-500))] text-[rgb(var(--color-error-foreground))] hover:bg-[rgb(var(--color-error-600))] focus:ring-[rgb(var(--color-error-500))]',
    success: 'bg-[rgb(var(--color-success-500))] text-[rgb(var(--color-success-foreground))] hover:bg-[rgb(var(--color-success-600))] focus:ring-[rgb(var(--color-success-500))]',
    outline: 'bg-transparent text-[rgb(var(--color-primary-600))] border border-[rgb(var(--color-primary-500))] hover:bg-[rgb(var(--color-primary-50))] focus:ring-[rgb(var(--color-primary-500))]',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  }

  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-95',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
