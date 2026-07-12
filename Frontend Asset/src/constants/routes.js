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
  VERIFY_EMAIL: '/verify-email',

  // Protected — Core ERP modules
  DASHBOARD: '/dashboard',
  
  // Assets Module (Nested)
  ASSETS: '/assets',
  ASSET_DETAIL: '/assets/:id',
  ASSET_CREATE: '/assets/new',
  ASSET_EDIT: '/assets/:id/edit',
  ASSET_CATEGORIES: '/assets/categories',
  
  // Inventory Module (Nested)
  INVENTORY: '/inventory',
  INVENTORY_STOCK: '/inventory/stock',
  INVENTORY_MOVEMENTS: '/inventory/movements',
  INVENTORY_LOCATIONS: '/inventory/locations',
  
  // Procurement Module (Nested)
  PROCUREMENT: '/procurement',
  PROCUREMENT_ORDERS: '/procurement/orders',
  PROCUREMENT_ORDER_DETAIL: '/procurement/orders/:id',
  PROCUREMENT_VENDORS: '/procurement/vendors',
  PROCUREMENT_VENDOR_DETAIL: '/procurement/vendors/:id',
  PROCUREMENT_REQUESTS: '/procurement/requests',
  
  // Maintenance Module (Nested)
  MAINTENANCE: '/maintenance',
  MAINTENANCE_WORK_ORDERS: '/maintenance/work-orders',
  MAINTENANCE_WORK_ORDER_DETAIL: '/maintenance/work-orders/:id',
  MAINTENANCE_SCHEDULES: '/maintenance/schedules',
  MAINTENANCE_PREVENTIVE: '/maintenance/preventive',
  
  // Reports Module (Nested)
  REPORTS: '/reports',
  REPORTS_ASSETS: '/reports/assets',
  REPORTS_INVENTORY: '/reports/inventory',
  REPORTS_PROCUREMENT: '/reports/procurement',
  REPORTS_MAINTENANCE: '/reports/maintenance',
  REPORTS_CUSTOM: '/reports/custom',
  
  // Users Module (Nested)
  USERS: '/users',
  USER_DETAIL: '/users/:id',
  USER_CREATE: '/users/new',
  USER_EDIT: '/users/:id/edit',
  USERS_ROLES: '/users/roles',
  USERS_PERMISSIONS: '/users/permissions',
  
  // Settings Module (Nested)
  SETTINGS: '/settings',
  SETTINGS_ORGANIZATION: '/settings/organization',
  SETTINGS_PREFERENCES: '/settings/preferences',
  SETTINGS_NOTIFICATIONS: '/settings/notifications',
  SETTINGS_SECURITY: '/settings/security',
  SETTINGS_INTEGRATIONS: '/settings/integrations',
  SETTINGS_AUDIT_LOG: '/settings/audit-log',

  // Error Pages
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  SERVER_ERROR: '/500',
}

/**
 * User roles for route protection
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  SUPERVISOR: 'supervisor',
  USER: 'user',
  VIEWER: 'viewer',
}

/**
 * Route metadata configuration
 * Includes: access control, breadcrumbs, navigation visibility
 */
export const ROUTE_CONFIG = {
  [ROUTES.LOGIN]: {
    title: 'Login',
    isPublic: true,
    showInNav: false,
    breadcrumb: false,
  },
  [ROUTES.REGISTER]: {
    title: 'Register',
    isPublic: true,
    showInNav: false,
    breadcrumb: false,
  },
  [ROUTES.FORGOT_PASSWORD]: {
    title: 'Forgot Password',
    isPublic: true,
    showInNav: false,
    breadcrumb: false,
  },
  [ROUTES.RESET_PASSWORD]: {
    title: 'Reset Password',
    isPublic: true,
    showInNav: false,
    breadcrumb: false,
  },
  [ROUTES.VERIFY_EMAIL]: {
    title: 'Verify Email',
    isPublic: true,
    showInNav: false,
    breadcrumb: false,
  },
  [ROUTES.DASHBOARD]: {
    title: 'Dashboard',
    isPublic: false,
    showInNav: true,
    breadcrumb: true,
    icon: 'dashboard',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER, USER_ROLES.VIEWER],
    parent: null,
  },
  [ROUTES.ASSETS]: {
    title: 'Assets',
    isPublic: false,
    showInNav: true,
    breadcrumb: true,
    icon: 'assets',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER, USER_ROLES.VIEWER],
    parent: null,
  },
  [ROUTES.ASSET_DETAIL]: {
    title: 'Asset Details',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER, USER_ROLES.VIEWER],
    parent: ROUTES.ASSETS,
    dynamicTitle: (params) => `Asset #${params.id}`,
  },
  [ROUTES.ASSET_CREATE]: {
    title: 'Create Asset',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR],
    parent: ROUTES.ASSETS,
  },
  [ROUTES.ASSET_EDIT]: {
    title: 'Edit Asset',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR],
    parent: ROUTES.ASSETS,
    dynamicTitle: (params) => `Edit Asset #${params.id}`,
  },
  [ROUTES.ASSET_CATEGORIES]: {
    title: 'Asset Categories',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    parent: ROUTES.ASSETS,
  },
  [ROUTES.INVENTORY]: {
    title: 'Inventory',
    isPublic: false,
    showInNav: true,
    breadcrumb: true,
    icon: 'inventory',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER, USER_ROLES.VIEWER],
    parent: null,
  },
  [ROUTES.INVENTORY_STOCK]: {
    title: 'Stock Levels',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER],
    parent: ROUTES.INVENTORY,
  },
  [ROUTES.INVENTORY_MOVEMENTS]: {
    title: 'Stock Movements',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER],
    parent: ROUTES.INVENTORY,
  },
  [ROUTES.INVENTORY_LOCATIONS]: {
    title: 'Storage Locations',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR],
    parent: ROUTES.INVENTORY,
  },
  [ROUTES.PROCUREMENT]: {
    title: 'Procurement',
    isPublic: false,
    showInNav: true,
    breadcrumb: true,
    icon: 'procurement',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER],
    parent: null,
  },
  [ROUTES.PROCUREMENT_ORDERS]: {
    title: 'Purchase Orders',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER],
    parent: ROUTES.PROCUREMENT,
  },
  [ROUTES.PROCUREMENT_ORDER_DETAIL]: {
    title: 'Order Details',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER],
    parent: ROUTES.PROCUREMENT_ORDERS,
    dynamicTitle: (params) => `Order #${params.id}`,
  },
  [ROUTES.PROCUREMENT_VENDORS]: {
    title: 'Vendors',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR],
    parent: ROUTES.PROCUREMENT,
  },
  [ROUTES.PROCUREMENT_VENDOR_DETAIL]: {
    title: 'Vendor Details',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR],
    parent: ROUTES.PROCUREMENT_VENDORS,
    dynamicTitle: (params) => `Vendor #${params.id}`,
  },
  [ROUTES.PROCUREMENT_REQUESTS]: {
    title: 'Purchase Requests',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER],
    parent: ROUTES.PROCUREMENT,
  },
  [ROUTES.MAINTENANCE]: {
    title: 'Maintenance',
    isPublic: false,
    showInNav: true,
    breadcrumb: true,
    icon: 'maintenance',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER],
    parent: null,
  },
  [ROUTES.MAINTENANCE_WORK_ORDERS]: {
    title: 'Work Orders',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER],
    parent: ROUTES.MAINTENANCE,
  },
  [ROUTES.MAINTENANCE_WORK_ORDER_DETAIL]: {
    title: 'Work Order Details',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER],
    parent: ROUTES.MAINTENANCE_WORK_ORDERS,
    dynamicTitle: (params) => `Work Order #${params.id}`,
  },
  [ROUTES.MAINTENANCE_SCHEDULES]: {
    title: 'Maintenance Schedules',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR],
    parent: ROUTES.MAINTENANCE,
  },
  [ROUTES.MAINTENANCE_PREVENTIVE]: {
    title: 'Preventive Maintenance',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR],
    parent: ROUTES.MAINTENANCE,
  },
  [ROUTES.REPORTS]: {
    title: 'Reports',
    isPublic: false,
    showInNav: true,
    breadcrumb: true,
    icon: 'reports',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.VIEWER],
    parent: null,
  },
  [ROUTES.REPORTS_ASSETS]: {
    title: 'Asset Reports',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.VIEWER],
    parent: ROUTES.REPORTS,
  },
  [ROUTES.REPORTS_INVENTORY]: {
    title: 'Inventory Reports',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.VIEWER],
    parent: ROUTES.REPORTS,
  },
  [ROUTES.REPORTS_PROCUREMENT]: {
    title: 'Procurement Reports',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.VIEWER],
    parent: ROUTES.REPORTS,
  },
  [ROUTES.REPORTS_MAINTENANCE]: {
    title: 'Maintenance Reports',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.VIEWER],
    parent: ROUTES.REPORTS,
  },
  [ROUTES.REPORTS_CUSTOM]: {
    title: 'Custom Reports',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    parent: ROUTES.REPORTS,
  },
  [ROUTES.USERS]: {
    title: 'Users',
    isPublic: false,
    showInNav: true,
    breadcrumb: true,
    icon: 'users',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    parent: null,
  },
  [ROUTES.USER_DETAIL]: {
    title: 'User Details',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    parent: ROUTES.USERS,
    dynamicTitle: (params) => `User #${params.id}`,
  },
  [ROUTES.USER_CREATE]: {
    title: 'Create User',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    parent: ROUTES.USERS,
  },
  [ROUTES.USER_EDIT]: {
    title: 'Edit User',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    parent: ROUTES.USERS,
    dynamicTitle: (params) => `Edit User #${params.id}`,
  },
  [ROUTES.USERS_ROLES]: {
    title: 'User Roles',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN],
    parent: ROUTES.USERS,
  },
  [ROUTES.USERS_PERMISSIONS]: {
    title: 'Permissions',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN],
    parent: ROUTES.USERS,
  },
  [ROUTES.SETTINGS]: {
    title: 'Settings',
    isPublic: false,
    showInNav: true,
    breadcrumb: true,
    icon: 'settings',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    parent: null,
  },
  [ROUTES.SETTINGS_ORGANIZATION]: {
    title: 'Organization',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN],
    parent: ROUTES.SETTINGS,
  },
  [ROUTES.SETTINGS_PREFERENCES]: {
    title: 'Preferences',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER, USER_ROLES.VIEWER],
    parent: ROUTES.SETTINGS,
  },
  [ROUTES.SETTINGS_NOTIFICATIONS]: {
    title: 'Notifications',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER, USER_ROLES.VIEWER],
    parent: ROUTES.SETTINGS,
  },
  [ROUTES.SETTINGS_SECURITY]: {
    title: 'Security',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN],
    parent: ROUTES.SETTINGS,
  },
  [ROUTES.SETTINGS_INTEGRATIONS]: {
    title: 'Integrations',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN],
    parent: ROUTES.SETTINGS,
  },
  [ROUTES.SETTINGS_AUDIT_LOG]: {
    title: 'Audit Log',
    isPublic: false,
    showInNav: false,
    breadcrumb: true,
    allowedRoles: [USER_ROLES.ADMIN],
    parent: ROUTES.SETTINGS,
  },
  [ROUTES.NOT_FOUND]: {
    title: 'Page Not Found',
    isPublic: true,
    showInNav: false,
    breadcrumb: false,
  },
  [ROUTES.UNAUTHORIZED]: {
    title: 'Unauthorized',
    isPublic: true,
    showInNav: false,
    breadcrumb: false,
  },
  [ROUTES.SERVER_ERROR]: {
    title: 'Server Error',
    isPublic: true,
    showInNav: false,
    breadcrumb: false,
  },
}

/**
 * Navigation items for sidebar/menu
 * Filtered by user role at runtime
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

/**
 * Get route configuration by path
 */
export function getRouteConfig(path) {
  return ROUTE_CONFIG[path] || null
}

/**
 * Check if user has access to route
 */
export function hasRouteAccess(path, userRole) {
  const config = getRouteConfig(path)
  if (!config) return false
  if (config.isPublic) return true
  return config.allowedRoles?.includes(userRole) ?? false
}

/**
 * Get breadcrumb trail for a route
 */
export function getBreadcrumbTrail(path, params = {}) {
  const trail = []
  let currentPath = path
  let currentParams = params

  while (currentPath) {
    const config = getRouteConfig(currentPath)
    if (!config) break

    const title = config.dynamicTitle ? config.dynamicTitle(currentParams) : config.title

    trail.unshift({
      path: currentPath,
      title,
      show: config.breadcrumb ?? true,
    })

    currentPath = config.parent
  }

  return trail.filter(item => item.show)
}
