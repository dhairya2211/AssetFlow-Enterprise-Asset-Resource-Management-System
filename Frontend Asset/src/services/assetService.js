import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from '@/constants'

/**
 * Asset management service — CRUD and domain operations for fixed assets.
 */
export const assetService = {
  getAll(params) {
    return axiosInstance.get(API_ENDPOINTS.ASSETS.BASE, { params })
  },

  getById(id) {
    return axiosInstance.get(API_ENDPOINTS.ASSETS.BY_ID(id))
  },

  create(payload) {
    return axiosInstance.post(API_ENDPOINTS.ASSETS.BASE, payload)
  },

  update(id, payload) {
    return axiosInstance.put(API_ENDPOINTS.ASSETS.BY_ID(id), payload)
  },

  remove(id) {
    return axiosInstance.delete(API_ENDPOINTS.ASSETS.BY_ID(id))
  },

  getCategories() {
    return axiosInstance.get(API_ENDPOINTS.ASSETS.CATEGORIES)
  },

  getDepreciation(id) {
    return axiosInstance.get(API_ENDPOINTS.ASSETS.DEPRECIATION(id))
  },
}
