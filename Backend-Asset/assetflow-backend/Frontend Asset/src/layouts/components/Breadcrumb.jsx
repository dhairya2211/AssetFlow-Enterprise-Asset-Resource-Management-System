import { Link } from 'react-router-dom'
import { useBreadcrumbs } from '@/hooks'

/**
 * Breadcrumb navigation component
 * Displays hierarchical navigation trail
 * 
 * @param {string} className - Additional classes
 * @param {string} separator - Custom separator (default: '/')
 * @param {boolean} showHome - Whether to show home link
 * @param {Function} renderItem - Custom item renderer
 */
export function Breadcrumb({ 
  className = '', 
  separator = '/',
  showHome = true,
  renderItem = null 
}) {
  const breadcrumbs = useBreadcrumbs()

  if (breadcrumbs.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm ${className}`}>
      {showHome && (
        <Link
          to="/"
          className="text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-primary-500))]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      )}

      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1
        const showSeparator = !isLast || (showHome && index === 0)

        if (renderItem) {
          return (
            <div key={item.path} className="flex items-center gap-2">
              {renderItem(item, isLast)}
              {showSeparator && (
                <span className="text-[rgb(var(--color-text-muted))]">{separator}</span>
              )}
            </div>
          )
        }

        return (
          <div key={item.path} className="flex items-center gap-2">
            {isLast ? (
              <span className="font-medium text-[rgb(var(--color-text-primary))]">
                {item.title}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-primary-500))]"
              >
                {item.title}
              </Link>
            )}
            {showSeparator && (
              <span className="text-[rgb(var(--color-text-muted))]">{separator}</span>
            )}
          </div>
        )
      })}
    </nav>
  )
}

/**
 * Compact breadcrumb with ellipsis for long trails
 */
export function CompactBreadcrumb({ maxItems = 3, className = '' }) {
  const breadcrumbs = useBreadcrumbs()

  if (breadcrumbs.length <= maxItems) {
    return <Breadcrumb className={className} />
  }

  const firstItem = breadcrumbs[0]
  const lastItems = breadcrumbs.slice(-maxItems + 1)

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm ${className}`}>
      <Link
        to={firstItem.path}
        className="text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-primary-500))]"
      >
        {firstItem.title}
      </Link>
      <span className="text-[rgb(var(--color-text-muted))]">/</span>
      <span className="text-[rgb(var(--color-text-muted))]">...</span>
      {lastItems.map((item, index) => {
        const isLast = index === lastItems.length - 1
        return (
          <div key={item.path} className="flex items-center gap-2">
            <span className="text-[rgb(var(--color-text-muted))]">/</span>
            {isLast ? (
              <span className="font-medium text-[rgb(var(--color-text-primary))]">
                {item.title}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-primary-500))]"
              >
                {item.title}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default Breadcrumb
