/**
 * Application-wide route path constants.
 * Single source of truth for navigation, redirects, and route guards.
 */
export const ROUTES = {
  // Public / Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Protected — Core ERP modules
  DASHBOARD: '/dashboard',
  ASSETS: '/assets',
  ASSET_DETAIL: '/assets/:id',
  INVENTORY: '/inventory',
  PROCUREMENT: '/procurement',
  MAINTENANCE: '/maintenance',
  REPORTS: '/reports',
  USERS: '/users',
  SETTINGS: '/settings',

  // Fallback
  NOT_FOUND: '/404',
}

/**
 * Route metadata for sidebar navigation and breadcrumbs.
 * Extend when pages are implemented.
 */
export const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'dashboard' },
  { label: 'Assets', path: ROUTES.ASSETS, icon: 'assets' },
  { label: 'Inventory', path: ROUTES.INVENTORY, icon: 'inventory' },
  { label: 'Procurement', path: ROUTES.PROCUREMENT, icon: 'procurement' },
  { label: 'Maintenance', path: ROUTES.MAINTENANCE, icon: 'maintenance' },
  { label: 'Reports', path: ROUTES.REPORTS, icon: 'reports' },
  { label: 'Users', path: ROUTES.USERS, icon: 'users' },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: 'settings' },
]
