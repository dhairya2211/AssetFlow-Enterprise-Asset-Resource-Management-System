import { cn } from '@/utils'
import { LuInbox, LuSearch, LuFileText, LuUsers, LuShoppingCart } from 'react-icons/lu'

/**
 * Reusable Empty State component with modern enterprise design
 * Supports multiple variants and custom content
 */
export function EmptyState({
  icon = null,
  title = 'No data found',
  description = 'There are no items to display at this time.',
  action = null,
  variant = 'default',
  className = ''
}) {
  const icons = {
    default: <LuInbox className="h-16 w-16" />,
    search: <LuSearch className="h-16 w-16" />,
    documents: <LuFileText className="h-16 w-16" />,
    users: <LuUsers className="h-16 w-16" />,
    cart: <LuShoppingCart className="h-16 w-16" />
  }

  const Icon = icon || icons[variant]

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className="text-[rgb(var(--color-text-muted))] mb-4">
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
 * Empty state for search results
 */
export function SearchEmptyState({ query = '', action = null }) {
  return (
    <EmptyState
      icon={<LuSearch className="h-16 w-16" />}
      title={`No results for "${query}"`}
      description="We couldn't find any matching results. Try adjusting your search terms."
      variant="search"
      action={action}
    />
  )
}

/**
 * Empty state for filtered lists
 */
export function FilterEmptyState({ action = null }) {
  return (
    <EmptyState
      icon={<LuInbox className="h-16 w-16" />}
      title="No results match your filters"
      description="Try adjusting your filter criteria to see more results."
      action={action}
    />
  )
}

/**
 * Compact empty state for smaller spaces
 */
export function CompactEmptyState({
  title = 'No data',
  description = null,
  className = ''
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-8 text-center', className)}>
      <LuInbox className="h-8 w-8 text-[rgb(var(--color-text-muted))] mb-2" />
      <h3 className="text-sm font-medium text-[rgb(var(--color-text-primary))] mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-[rgb(var(--color-text-muted))]">
          {description}
        </p>
      )}
    </div>
  )
}

export default EmptyState
