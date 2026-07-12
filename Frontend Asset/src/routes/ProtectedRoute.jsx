import { Outlet } from 'react-router-dom'

/**
 * Route guard (DISABLED FOR DEVELOPMENT) — always allows access.
 */
export function ProtectedRoute() {
  return <Outlet />
}

export default ProtectedRoute
