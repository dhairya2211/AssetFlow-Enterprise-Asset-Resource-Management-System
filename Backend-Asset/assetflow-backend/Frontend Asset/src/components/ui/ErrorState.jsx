import { cn } from '@/utils'
import { LuCircleAlert, LuRefreshCw, LuHouse, LuArrowLeft } from 'react-icons/lu'

/**
 * Reusable Error State component with modern enterprise design
 * Supports multiple variants and custom actions
 */
export function ErrorState({
  icon = null,
  title = 'Something went wrong',
  description = 'An error occurred while loading the content. Please try again.',
  action = null,
  variant = 'default',
  className = ''
}) {
  const icons = {
    default: <LuCircleAlert className="h-16 w-16" />,
    network: <LuCircleAlert className="h-16 w-16" />,
    server: <LuCircleAlert className="h-16 w-16" />
  }

  const Icon = icon || icons[variant]

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className="text-[rgb(var(--color-error-500))] mb-4">
        {Icon}
      </div>
      <h3 className="text-lg font-semibold text-[rgb(var(--color-text-primary))] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[rgb(var(--color-text-secondary))] max-w-sm mb-6">
        {description}
      </p>
      {action}
    </div>
  )
}

/**
 * Error state with retry action
 */
export function ErrorWithRetry({ onRetry, title = null, description = null }) {
  return (
    <ErrorState
      title={title || 'Something went wrong'}
      description={description || 'An error occurred. Please try again.'}
      action={
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[rgb(var(--color-primary-500))] text-[rgb(var(--color-primary-foreground))] hover:bg-[rgb(var(--color-primary-600))] transition-colors"
        >
          <LuRefreshCw className="h-4 w-4" />
          Try Again
        </button>
      }
    />
  )
}

/**
 * Error state with go back action
 */
export function ErrorWithBack({ onBack, title = null, description = null }) {
  return (
    <ErrorState
      title={title || 'Something went wrong'}
      description={description || 'An error occurred. Please go back and try again.'}
      action={
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-surface-hover))] transition-colors"
        >
          <LuArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      }
    />
  )
}

/**
 * Error state with go home action
 */
export function ErrorWithHome({ onHome, title = null, description = null }) {
  return (
    <ErrorState
      title={title || 'Something went wrong'}
      description={description || 'An error occurred. Please return to the home page.'}
      action={
        <button
          onClick={onHome}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[rgb(var(--color-primary-500))] text-[rgb(var(--color-primary-foreground))] hover:bg-[rgb(var(--color-primary-600))] transition-colors"
        >
          <LuHouse className="h-4 w-4" />
          Go to Home
        </button>
      }
    />
  )
}

/**
 * Compact error state for smaller spaces
 */
export function CompactErrorState({
  title = 'Error',
  description = null,
  action = null,
  className = ''
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-8 text-center', className)}>
      <LuCircleAlert className="h-8 w-8 text-[rgb(var(--color-error-500))] mb-2" />
      <h3 className="text-sm font-medium text-[rgb(var(--color-text-primary))] mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-[rgb(var(--color-text-muted))] mb-3">
          {description}
        </p>
      )}
      {action}
    </div>
  )
}

export default ErrorState
