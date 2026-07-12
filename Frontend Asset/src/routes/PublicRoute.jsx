import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { ROUTES } from '@/constants'

/**
 * Route guard — redirects authenticated users away from auth pages.
 * Prevents logged-in users from seeing login/register screens.
 */
export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-sm text-[rgb(var(--color-text-secondary))]">Loading…</span>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}

export default PublicRoute
