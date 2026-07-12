import { forwardRef } from 'react'
import { cn } from '@/utils'

/**
 * Reusable Input component with modern enterprise design
 * Supports multiple variants, sizes, and states
 */
const Input = forwardRef(({
  type = 'text',
  variant = 'default',
  size = 'md',
  error = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  label = null,
  helperText = null,
  errorMessage = null,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const variants = {
    default: 'border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] focus:border-[rgb(var(--color-primary-500))] focus:ring-[rgb(var(--color-primary-500))]',
    filled: 'border-transparent bg-[rgb(var(--color-surface-hover))] focus:border-[rgb(var(--color-primary-500))] focus:ring-[rgb(var(--color-primary-500))]',
    outlined: 'border-2 border-[rgb(var(--color-border))] bg-transparent focus:border-[rgb(var(--color-primary-500))] focus:ring-[rgb(var(--color-primary-500))]',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }

  const errorClasses = error
    ? 'border-[rgb(var(--color-error-500))] focus:border-[rgb(var(--color-error-500))] focus:ring-[rgb(var(--color-error-500))]'
    : ''

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-primary))]">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-muted))]">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={cn(
            'w-full rounded-lg border transition-all duration-200',
            'placeholder:text-[rgb(var(--color-text-muted))]',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variants[variant],
            sizes[size],
            errorClasses,
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-muted))]">
            {rightIcon}
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

Input.displayName = 'Input'

export default Input
