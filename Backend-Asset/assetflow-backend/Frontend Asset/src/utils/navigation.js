import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants'

/**
 * Navigation utility functions for programmatic routing
 */

/**
 * Navigate to a specific route with optional state
 * @param {string} path - Route path
 * @param {Object} state - Optional state to pass
 * @param {boolean} replace - Replace history entry
 */
export function navigateTo(path, state = null, replace = false) {
  const navigate = useNavigate()
  navigate(path, { state, replace })
}

/**
 * Navigate back in history
 */
export function navigateBack() {
  const navigate = useNavigate()
  navigate(-1)
}

/**
 * Navigate forward in history
 */
export function navigateForward() {
  const navigate = useNavigate()
  navigate(1)
}

/**
 * Navigate to dashboard (default authenticated route)
 */
export function navigateToDashboard() {
  const navigate = useNavigate()
  navigate(ROUTES.DASHBOARD, { replace: true })
}

/**
 * Navigate to login with return path
 * @param {string} returnPath - Path to return to after login
 */
export function navigateToLogin(returnPath = null) {
  const navigate = useNavigate()
  const location = useLocation()
  const from = returnPath || location.pathname
  
  navigate(ROUTES.LOGIN, { 
    state: { from },
    replace: true 
  })
}

/**
 * Navigate to unauthorized page with return path
 * @param {string} returnPath - Path to return to
 */
export function navigateToUnauthorized(returnPath = null) {
  const navigate = useNavigate()
  const location = useLocation()
  const from = returnPath || location.pathname
  
  navigate(ROUTES.UNAUTHORIZED, { 
    state: { from },
    replace: true 
  })
}

/**
 * Navigate to 404 page
 */
export function navigateToNotFound() {
  const navigate = useNavigate()
  navigate(ROUTES.NOT_FOUND, { replace: true })
}

/**
 * Navigate to a route with parameters
 * @param {string} pathTemplate - Path template with :param
 * @param {Object} params - Parameter values
 * @param {Object} state - Optional state
 */
export function navigateWithParams(pathTemplate, params = {}, state = null) {
  const navigate = useNavigate()
  let path = pathTemplate
  
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value)
  })
  
  navigate(path, { state })
}

/**
 * Navigate to asset detail page
 * @param {string} assetId - Asset ID
 * @param {Object} state - Optional state
 */
export function navigateToAsset(assetId, state = null) {
  navigateWithParams(ROUTES.ASSET_DETAIL, { id: assetId }, state)
}

/**
 * Navigate to create asset page
 * @param {Object} state - Optional state
 */
export function navigateToCreateAsset(state = null) {
  const navigate = useNavigate()
  navigate(ROUTES.ASSET_CREATE, { state })
}

/**
 * Navigate to edit asset page
 * @param {string} assetId - Asset ID
 * @param {Object} state - Optional state
 */
export function navigateToEditAsset(assetId, state = null) {
  navigateWithParams(ROUTES.ASSET_EDIT, { id: assetId }, state)
}

/**
 * Navigate to user detail page
 * @param {string} userId - User ID
 * @param {Object} state - Optional state
 */
export function navigateToUser(userId, state = null) {
  navigateWithParams(ROUTES.USER_DETAIL, { id: userId }, state)
}

/**
 * Navigate to create user page
 * @param {Object} state - Optional state
 */
export function navigateToCreateUser(state = null) {
  const navigate = useNavigate()
  navigate(ROUTES.USER_CREATE, { state })
}

/**
 * Navigate to edit user page
 * @param {string} userId - User ID
 * @param {Object} state - Optional state
 */
export function navigateToEditUser(userId, state = null) {
  navigateWithParams(ROUTES.USER_EDIT, { id: userId }, state)
}

/**
 * Navigate to procurement order detail
 * @param {string} orderId - Order ID
 * @param {Object} state - Optional state
 */
export function navigateToOrder(orderId, state = null) {
  navigateWithParams(ROUTES.PROCUREMENT_ORDER_DETAIL, { id: orderId }, state)
}

/**
 * Navigate to vendor detail
 * @param {string} vendorId - Vendor ID
 * @param {Object} state - Optional state
 */
export function navigateToVendor(vendorId, state = null) {
  navigateWithParams(ROUTES.PROCUREMENT_VENDOR_DETAIL, { id: vendorId }, state)
}

/**
 * Navigate to work order detail
 * @param {string} workOrderId - Work Order ID
 * @param {Object} state - Optional state
 */
export function navigateToWorkOrder(workOrderId, state = null) {
  navigateWithParams(ROUTES.MAINTENANCE_WORK_ORDER_DETAIL, { id: workOrderId }, state)
}

/**
 * Custom hook for navigation utilities
 * Provides all navigation functions as a single hook
 * 
 * Usage:
 * const nav = useNavigation()
 * nav.toDashboard()
 * nav.toAsset('123')
 * nav.back()
 */
export function useNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  return {
    to: (path, options = {}) => navigate(path, options),
    back: () => navigate(-1),
    forward: () => navigate(1),
    replace: (path) => navigate(path, { replace: true }),
    
    toDashboard: () => navigate(ROUTES.DASHBOARD, { replace: true }),
    toLogin: (returnPath) => navigate(ROUTES.LOGIN, { 
      state: { from: returnPath || location.pathname },
      replace: true 
    }),
    toUnauthorized: (returnPath) => navigate(ROUTES.UNAUTHORIZED, { 
      state: { from: returnPath || location.pathname },
      replace: true 
    }),
    toNotFound: () => navigate(ROUTES.NOT_FOUND, { replace: true }),
    
    toAsset: (assetId, state) => {
      const path = ROUTES.ASSET_DETAIL.replace(':id', assetId)
      navigate(path, { state })
    },
    toCreateAsset: (state) => navigate(ROUTES.ASSET_CREATE, { state }),
    toEditAsset: (assetId, state) => {
      const path = ROUTES.ASSET_EDIT.replace(':id', assetId)
      navigate(path, { state })
    },
    
    toUser: (userId, state) => {
      const path = ROUTES.USER_DETAIL.replace(':id', userId)
      navigate(path, { state })
    },
    toCreateUser: (state) => navigate(ROUTES.USER_CREATE, { state }),
    toEditUser: (userId, state) => {
      const path = ROUTES.USER_EDIT.replace(':id', userId)
      navigate(path, { state })
    },
    
    toOrder: (orderId, state) => {
      const path = ROUTES.PROCUREMENT_ORDER_DETAIL.replace(':id', orderId)
      navigate(path, { state })
    },
    toVendor: (vendorId, state) => {
      const path = ROUTES.PROCUREMENT_VENDOR_DETAIL.replace(':id', vendorId)
      navigate(path, { state })
    },
    
    toWorkOrder: (workOrderId, state) => {
      const path = ROUTES.MAINTENANCE_WORK_ORDER_DETAIL.replace(':id', workOrderId)
      navigate(path, { state })
    },
    
    withParams: (pathTemplate, params, state) => {
      let path = pathTemplate
      Object.entries(params).forEach(([key, value]) => {
        path = path.replace(`:${key}`, value)
      })
      navigate(path, { state })
    },
  }
}

/**
 * Custom hook for getting return path from location state
 * Used after login/unauthorized redirects
 * 
 * @returns {string} Return path or default path
 */
export function useReturnPath(defaultPath = ROUTES.DASHBOARD) {
  const location = useLocation()
  return location.state?.from || defaultPath
}

/**
 * Build route path with parameters
 * @param {string} template - Route template
 * @param {Object} params - Parameters
 * @returns {string} Built path
 */
export function buildPath(template, params = {}) {
  let path = template
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, String(value))
  })
  return path
}

/**
 * Check if current path matches a route pattern
 * @param {string} pattern - Route pattern
 * @param {string} path - Current path
 * @returns {boolean}
 */
export function isPathMatch(pattern, path) {
  const patternRegex = pattern
    .replace(/:\w+/g, '[^/]+')
    .replace(/\*/g, '.*')
  const regex = new RegExp(`^${patternRegex}$`)
  return regex.test(path)
}

/**
 * Get active route from navigation items
 * @param {Array} items - Navigation items
 * @param {string} currentPath - Current path
 * @returns {Object|null} Active item or null
 */
export function getActiveNavItem(items, currentPath) {
  return items.find(item => {
    if (item.path === currentPath) return true
    if (item.exact) return isPathMatch(item.path, currentPath)
    return currentPath.startsWith(item.path)
  }) || null
}

export default {
  useNavigation,
  useReturnPath,
  buildPath,
  isPathMatch,
  getActiveNavItem,
}
