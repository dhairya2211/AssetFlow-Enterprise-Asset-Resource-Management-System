import { cn } from '@/utils'

/**
 * Reusable Badge component with modern enterprise design
 * Supports multiple variants, sizes, and dot indicator
 */
export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className = ''
}) {
  const variants = {
    default: 'bg-[rgb(var(--color-primary-100))] text-[rgb(var(--color-primary-700))] border-[rgb(var(--color-primary-200))]',
    primary: 'bg-[rgb(var(--color-primary-500))] text-[rgb(var(--color-primary-foreground))] border-[rgb(var(--color-primary-500))]',
    secondary: 'bg-[rgb(var(--color-secondary-100))] text-[rgb(var(--color-secondary-700))] border-[rgb(var(--color-secondary-200))]',
    success: 'bg-[rgb(var(--color-success-100))] text-[rgb(var(--color-success-700))] border-[rgb(var(--color-success-200))]',
    warning: 'bg-[rgb(var(--color-warning-100))] text-[rgb(var(--color-warning-700))] border-[rgb(var(--color-warning-200))]',
    error: 'bg-[rgb(var(--color-error-100))] text-[rgb(var(--color-error-700))] border-[rgb(var(--color-error-200))]',
    info: 'bg-[rgb(var(--color-info-100))] text-[rgb(var(--color-info-700))] border-[rgb(var(--color-info-200))]',
    outline: 'bg-transparent text-[rgb(var(--color-text-primary))] border-[rgb(var(--color-border))]',
    ghost: 'bg-[rgb(var(--color-surface-hover))] text-[rgb(var(--color-text-primary))] border-transparent'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'primary' && 'bg-[rgb(var(--color-primary-foreground))]',
            variant !== 'primary' && 'bg-current'
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}

/**
 * Status badge with predefined variants
 */
export function StatusBadge({ status, className = '' }) {
  const statusConfig = {
    active: { variant: 'success', label: 'Active' },
    inactive: { variant: 'secondary', label: 'Inactive' },
    pending: { variant: 'warning', label: 'Pending' },
    processing: { variant: 'info', label: 'Processing' },
    completed: { variant: 'success', label: 'Completed' },
    failed: { variant: 'error', label: 'Failed' },
    cancelled: { variant: 'error', label: 'Cancelled' },
    draft: { variant: 'secondary', label: 'Draft' },
    published: { variant: 'success', label: 'Published' },
    archived: { variant: 'ghost', label: 'Archived' }
  }

  const config = statusConfig[status?.toLowerCase()] || { variant: 'default', label: status }

  return <Badge variant={config.variant} className={className}>{config.label}</Badge>
}

/**
 * Count badge for notifications
 */
export function CountBadge({ count, max = 99, className = '' }) {
  const displayCount = count > max ? `${max}+` : count

  if (count === 0) return null

  return (
    <span
      className={cn(
        'absolute -top-1 -right-1',
        'flex h-5 w-5 items-center justify-center',
        'rounded-full bg-[rgb(var(--color-error-500))]',
        'text-[10px] font-medium text-[rgb(var(--color-error-foreground))]',
        'ring-2 ring-[rgb(var(--color-surface))]',
        className
      )}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  )
}

export default Badge
