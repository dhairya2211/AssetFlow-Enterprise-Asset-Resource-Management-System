import { forwardRef } from 'react'
import { cn } from '@/utils'

/**
 * Reusable Textarea component with modern enterprise design
 * Supports multiple variants, sizes, and states
 */
const Textarea = forwardRef(({
  variant = 'default',
  size = 'md',
  error = false,
  disabled = false,
  label = null,
  helperText = null,
  errorMessage = null,
  fullWidth = false,
  resize = 'vertical',
  rows = 4,
  maxLength = null,
  showCount = false,
  className = '',
  ...props
}, ref) => {
  const variants = {
    default: 'border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] focus:border-[rgb(var(--color-primary-500))]',
    filled: 'border-transparent bg-[rgb(var(--color-surface-hover))] focus:border-[rgb(var(--color-primary-500))]',
    outlined: 'border-2 border-[rgb(var(--color-border))] bg-transparent focus:border-[rgb(var(--color-primary-500))]',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  }

  const errorClasses = error
    ? 'border-[rgb(var(--color-error-500))] focus:border-[rgb(var(--color-error-500))]'
    : ''

  const currentLength = props.value?.length || 0

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-primary))]">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          ref={ref}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={cn(
            'w-full rounded-lg border transition-all duration-200',
            'placeholder:text-[rgb(var(--color-text-muted))]',
            'focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variants[variant],
            sizes[size],
            resizeClasses[resize],
            errorClasses,
            className
          )}
          {...props}
        />
        {showCount && maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-[rgb(var(--color-text-muted))]">
            {currentLength}/{maxLength}
          </div>
        )}
      </div>
      {(helperText || errorMessage) && (
        <p className={cn(
          'mt-1.5 text-sm',
          errorMessage ? 'text-[rgb(var(--color-error-500))]' : 'text-[rgb(var(--color-text-muted))]'
        )}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
