/**
 * API endpoint paths relative to VITE_API_BASE_URL.
 * Grouped by domain module for scalability.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  ASSETS: {
    BASE: '/assets',
    BY_ID: (id) => `/assets/${id}`,
    CATEGORIES: '/assets/categories',
    DEPRECIATION: (id) => `/assets/${id}/depreciation`,
  },
  INVENTORY: {
    BASE: '/inventory',
    STOCK: '/inventory/stock',
    MOVEMENTS: '/inventory/movements',
  },
  PROCUREMENT: {
    BASE: '/procurement',
    ORDERS: '/procurement/orders',
    VENDORS: '/procurement/vendors',
  },
  MAINTENANCE: {
    BASE: '/maintenance',
    WORK_ORDERS: '/maintenance/work-orders',
    SCHEDULES: '/maintenance/schedules',
  },
  REPORTS: {
    BASE: '/reports',
    EXPORT: '/reports/export',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
    ROLES: '/users/roles',
  },
  SETTINGS: {
    BASE: '/settings',
    ORGANIZATION: '/settings/organization',
    PREFERENCES: '/settings/preferences',
  },
}
