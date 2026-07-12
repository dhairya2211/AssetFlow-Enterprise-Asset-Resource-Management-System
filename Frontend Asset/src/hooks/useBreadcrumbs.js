import { useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getRouteConfig, getBreadcrumbTrail } from '@/constants'

/**
 * Custom hook for breadcrumb generation
 * Returns breadcrumb trail based on current route and route configuration
 * 
 * @returns {Array} Breadcrumb items with path, title, and isActive
 * 
 * Usage:
 * const breadcrumbs = useBreadcrumbs()
 * 
 * breadcrumbs = [
 *   { path: '/dashboard', title: 'Dashboard', isActive: false },
 *   { path: '/assets', title: 'Assets', isActive: false },
 *   { path: '/assets/123', title: 'Asset #123', isActive: true }
 * ]
 */
export function useBreadcrumbs() {
  const location = useLocation()
  const params = useParams()

  const breadcrumbs = useMemo(() => {
    const currentPath = location.pathname
    const trail = getBreadcrumbTrail(currentPath, params)

    return trail.map((item, index) => ({
      ...item,
      isActive: index === trail.length - 1,
    }))
  }, [location.pathname, params])

  return breadcrumbs
}

/**
 * Custom hook for current route metadata
 * Returns configuration for the current route
 * 
 * @returns {Object|null} Route configuration or null if not found
 * 
 * Usage:
 * const routeConfig = useRouteConfig()
 * console.log(routeConfig.title, routeConfig.allowedRoles)
 */
export function useRouteConfig() {
  const location = useLocation()

  const config = useMemo(() => {
    return getRouteConfig(location.pathname)
  }, [location.pathname])

  return config
}

/**
 * Custom hook for checking route access
 * Returns whether current user has access to current route
 * 
 * @param {string} userRole - User's role
 * @returns {boolean} Whether user has access
 * 
 * Usage:
 * const { user } = useAuth()
 * const hasAccess = useRouteAccess(user?.role)
 */
export function useRouteAccess(userRole) {
  const location = useLocation()

  const hasAccess = useMemo(() => {
    const config = getRouteConfig(location.pathname)
    if (!config) return false
    if (config.isPublic) return true
    return config.allowedRoles?.includes(userRole) ?? false
  }, [location.pathname, userRole])

  return hasAccess
}

/**
 * Custom hook for navigation items filtered by user role
 * Returns navigation items that user has access to
 * 
 * @param {string} userRole - User's role
 * @param {Array} items - Navigation items to filter (defaults to NAV_ITEMS from constants)
 * @returns {Array} Filtered navigation items
 * 
 * Usage:
 * const { user } = useAuth()
 * const navItems = useNavItems(user?.role)
 */
export function useNavItems(userRole, items = null) {
  const filteredItems = useMemo(() => {
    const navItems = items || []
    
    return navItems.filter(item => {
      const config = getRouteConfig(item.path)
      if (!config) return false
      if (config.isPublic) return true
      return config.allowedRoles?.includes(userRole) ?? false
    })
  }, [userRole, items])

  return filteredItems
}

export default useBreadcrumbs
