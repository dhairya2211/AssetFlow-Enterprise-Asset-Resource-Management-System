import { Outlet } from 'react-router-dom'

/**
 * Route guard (DISABLED FOR DEVELOPMENT) — always allows access.
 */
export function PublicRoute() {
  return <Outlet />
}

export default PublicRoute
