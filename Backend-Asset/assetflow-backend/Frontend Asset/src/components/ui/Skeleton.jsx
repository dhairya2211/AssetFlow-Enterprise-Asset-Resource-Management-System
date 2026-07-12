import { cn } from '@/utils'

/**
 * Reusable Skeleton component with modern enterprise design
 * Supports multiple variants and sizes for loading states
 */
export function Skeleton({
  variant = 'rect',
  width = null,
  height = null,
  className = ''
}) {
  const variants = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded-sm h-4',
    avatar: 'rounded-full',
    button: 'rounded-lg h-10'
  }

  const baseStyles = 'animate-pulse bg-[rgb(var(--color-surface-hover))]'

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

/**
 * Skeleton for text lines
 */
export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn(
            i === lines - 1 && 'w-2/3'
          )}
        />
      ))}
    </div>
  )
}

/**
 * Skeleton for card content
 */
export function CardSkeleton({ showAvatar = true, className = '' }) {
  return (
    <div className={cn('space-y-4 p-4', className)}>
      {showAvatar && (
        <div className="flex items-center gap-3">
          <Skeleton variant="avatar" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  )
}

/**
 * Skeleton for table rows
 */
export function TableSkeleton({ rows = 5, columns = 4, className = '' }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant="text"
              className="flex-1"
              style={{ width: colIndex === columns - 1 ? '30%' : undefined }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/**
 * Skeleton for list items
 */
export function ListSkeleton({ items = 5, showAvatar = true, className = '' }) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          {showAvatar && <Skeleton variant="avatar" width={32} height={32} />}
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton
