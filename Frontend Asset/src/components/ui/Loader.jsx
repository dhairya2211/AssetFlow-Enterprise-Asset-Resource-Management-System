import { cn } from '@/utils'

/**
 * Reusable Loader component with modern enterprise design
 * Supports multiple variants, sizes, and types
 */
export function Loader({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  className = ''
}) {
  const sizes = {
    xs: 'h-4 w-4',
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  const colors = {
    primary: 'text-[rgb(var(--color-primary-500))]',
    secondary: 'text-[rgb(var(--color-secondary-500))]',
    success: 'text-[rgb(var(--color-success-500))]',
    error: 'text-[rgb(var(--color-error-500))]',
    white: 'text-white',
    current: 'text-current'
  }

  if (variant === 'spinner') {
    return (
      <svg
        className={cn('animate-spin', sizes[size], colors[color], className)}
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-label="Loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex gap-1', className)} role="status" aria-label="Loading">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full animate-bounce',
              colors[color],
              {
                'h-2 w-2': size === 'xs',
                'h-2.5 w-2.5': size === 'sm',
                'h-3 w-3': size === 'md',
                'h-4 w-4': size === 'lg',
                'h-5 w-5': size === 'xl'
              }
            )}
            style={{
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div
        className={cn(
          'animate-pulse rounded-full',
          sizes[size],
          colors[color],
          className
        )}
        role="status"
        aria-label="Loading"
      />
    )
  }

  if (variant === 'bar') {
    return (
      <div className={cn('w-full h-2 bg-[rgb(var(--color-surface-hover))] rounded-full overflow-hidden', className)} role="status" aria-label="Loading">
        <div
          className={cn('h-full rounded-full animate-pulse', colors[color])}
          style={{ width: '60%' }}
        />
      </div>
    )
  }

  return null
}

/**
 * Full page loader with overlay
 */
export function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[rgb(var(--color-background))]">
      <Loader variant="spinner" size="xl" />
      {message && (
        <p className="mt-4 text-sm text-[rgb(var(--color-text-secondary))]">{message}</p>
      )}
    </div>
  )
}

/**
 * Inline loader with text
 */
export function InlineLoader({ text = 'Loading...', size = 'sm' }) {
  return (
    <div className="flex items-center gap-2">
      <Loader variant="spinner" size={size} />
      <span className="text-sm text-[rgb(var(--color-text-secondary))">{text}</span>
    </div>
  )
}

export default Loader
