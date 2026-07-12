import { cn } from '@/utils'

/**
 * Reusable Card component with modern enterprise design
 * Supports multiple variants and sizes
 */
export function Card({
  variant = 'default',
  size = 'md',
  hover = false,
  className = '',
  children,
  ...props
}) {
  const variants = {
    default: 'border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))]',
    elevated: 'border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-lg',
    outlined: 'border-2 border-[rgb(var(--color-border))] bg-transparent',
    filled: 'border-transparent bg-[rgb(var(--color-surface-hover))]',
    glass: 'border border-[rgb(var(--color-border))]/20 bg-[rgb(var(--color-surface))]/80 backdrop-blur-md',
  }

  const sizes = {
    sm: 'rounded-lg p-4',
    md: 'rounded-xl p-6',
    lg: 'rounded-2xl p-8',
  }

  const hoverClasses = hover
    ? 'hover:shadow-lg hover:border-[rgb(var(--color-primary-500))]/50 transition-all duration-300'
    : ''

  return (
    <div
      className={cn(
        'transition-all duration-200',
        variants[variant],
        sizes[size],
        hoverClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card header component
 */
export function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={cn('mb-4 flex items-start justify-between', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * Card title component
 */
export function CardTitle({ className = '', children, ...props }) {
  return (
    <h3 className={cn('text-lg font-semibold text-[rgb(var(--color-text-primary))]', className)} {...props}>
      {children}
    </h3>
  )
}

/**
 * Card description component
 */
export function CardDescription({ className = '', children, ...props }) {
  return (
    <p className={cn('mt-1 text-sm text-[rgb(var(--color-text-secondary))]', className)} {...props}>
      {children}
    </p>
  )
}

/**
 * Card content component
 */
export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * Card footer component
 */
export function CardFooter({ className = '', children, ...props }) {
  return (
    <div className={cn('mt-4 flex items-center justify-between border-t border-[rgb(var(--color-border))] pt-4', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * KPI Card component for dashboard metrics
 */
export function KPICard({
  title,
  value,
  change = null,
  changeType = 'positive',
  icon = null,
  className = '',
  ...props
}) {
  return (
    <Card variant="elevated" hover className={className} {...props}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">{title}</p>
          <p className="mt-2 text-3xl font-bold text-[rgb(var(--color-text-primary))]">{value}</p>
          {change && (
            <p className={cn(
              'mt-2 text-sm font-medium',
              changeType === 'positive' ? 'text-[rgb(var(--color-success-600))]' : 'text-[rgb(var(--color-error-600))]'
            )}>
              {changeType === 'positive' ? '+' : ''}{change}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(var(--color-primary-50))] text-[rgb(var(--color-primary-600))]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

export default Card
