import { Outlet } from 'react-router-dom'

/**
 * Loading route wrapper — displays loading state while child routes load.
 * Useful for lazy-loaded components or data-fetching routes.
 * 
 * @param {boolean} isLoading - Whether to show loading state
 * @param {React.ReactNode} fallback - Custom loading component
 * @param {string} size - Loading size: 'sm', 'md', 'lg'
 * 
 * Usage:
 * <Route element={<LoadingRoute isLoading={loading} />}>
 *   <Route path="/data" element={<DataPage />} />
 * </Route>
 */
export function LoadingRoute({ isLoading = false, fallback = null, size = 'md' }) {
  if (isLoading) {
    return fallback || <DefaultLoadingFallback size={size} />
  }

  return <Outlet />
}

/**
 * Default loading fallback component with skeleton animation
 */
function DefaultLoadingFallback({ size = 'md' }) {
  const sizeClasses = {
    sm: 'h-32',
    md: 'h-64',
    lg: 'h-96',
  }

  return (
    <div className={`flex min-h-[200px] items-center justify-center ${sizeClasses[size]}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[rgb(var(--color-primary-500))] border-t-transparent" />
        <span className="text-sm text-[rgb(var(--color-text-secondary))]">Loading…</span>
      </div>
    </div>
  )
}

/**
 * Page-level loading wrapper with full-screen loading state
 * Use for page transitions or initial data loads
 */
export function PageLoadingRoute({ isLoading = false, fallback = null }) {
  if (isLoading) {
    return fallback || (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-3 border-[rgb(var(--color-primary-500))] border-t-transparent" />
          <span className="text-base text-[rgb(var(--color-text-secondary))]">Loading page…</span>
        </div>
      </div>
    )
  }

  return <Outlet />
}

/**
 * Skeleton loading route wrapper
 * Displays skeleton UI while content loads
 */
export function SkeletonLoadingRoute({ isLoading = false, children }) {
  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <div className="h-8 w-1/3 animate-pulse rounded bg-[rgb(var(--color-skeleton-bg))]" />
        <div className="h-4 w-full animate-pulse rounded bg-[rgb(var(--color-skeleton-bg))]" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-[rgb(var(--color-skeleton-bg))]" />
        <div className="h-4 w-4/6 animate-pulse rounded bg-[rgb(var(--color-skeleton-bg))]" />
      </div>
    )
  }

  return <Outlet />
}

export default LoadingRoute
