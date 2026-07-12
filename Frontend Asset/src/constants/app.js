/**
 * Global application constants — branding, storage keys, and config defaults.
 */
export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'AssetFlow'

export const APP_ENV = import.meta.env.VITE_APP_ENV ?? 'development'

export const IS_DEV = APP_ENV === 'development'

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'assetflow_access_token',
  REFRESH_TOKEN: 'assetflow_refresh_token',
  USER: 'assetflow_user',
  THEME: 'assetflow_theme',
  SIDEBAR_COLLAPSED: 'assetflow_sidebar_collapsed',
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  INTERNAL_ERROR: 500,
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
}

export const DATE_FORMAT = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  API: 'yyyy-MM-dd',
}

export const ASSET_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  DISPOSED: 'disposed',
}
