import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { ROUTES, hasRouteAccess } from '@/constants'

/**
 * Role-based route guard — redirects users without required permissions.
 * 
 * @param {string[]} allowedRoles - Array of roles allowed to access this route
 * @param {string} redirectTo - Path to redirect if unauthorized (defaults to UNAUTHORIZED)
 * 
 * Usage:
 * <Route element={<RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} />}>
 *   <Route path="/admin" element={<AdminPage />} />
 * </Route>
 */
export function RoleProtectedRoute({ allowedRoles = [], redirectTo = ROUTES.UNAUTHORIZED }) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-sm text-[rgb(var(--color-text-secondary))]">Loading…</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  const userRole = user?.role
  const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(userRole)

  if (!hasAccess) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return <Outlet />
}

/**
 * Permission-based route guard — checks specific route access from ROUTE_CONFIG.
 * Uses the centralized route configuration for access control.
 * 
 * Usage:
 * <Route element={<PermissionProtectedRoute />}>
 *   <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
 * </Route>
 */
export function PermissionProtectedRoute() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-sm text-[rgb(var(--color-text-secondary))]">Loading…</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  const userRole = user?.role
  const currentPath = location.pathname
  const hasAccess = hasRouteAccess(currentPath, userRole)

  if (!hasAccess) {
    return <Navigate to={ROUTES.UNAUTHORIZED} state={{ from: location }} replace />
  }

  return <Outlet />
}

export default RoleProtectedRoute
