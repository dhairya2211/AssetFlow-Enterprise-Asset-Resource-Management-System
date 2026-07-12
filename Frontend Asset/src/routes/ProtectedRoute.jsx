import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { ROUTES } from '@/constants'

/**
 * Route guard — redirects unauthenticated users to login.
 * Wrap protected route groups with this component.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-sm text-[rgb(var(--color-text-secondary))]">Loading…</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
