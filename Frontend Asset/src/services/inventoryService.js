import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from '@/constants'

/**
 * Inventory service — stock levels, movements, and warehouse operations.
 */
export const inventoryService = {
  getAll(params) {
    return axiosInstance.get(API_ENDPOINTS.INVENTORY.BASE, { params })
  },

  getStock(params) {
    return axiosInstance.get(API_ENDPOINTS.INVENTORY.STOCK, { params })
  },

  getMovements(params) {
    return axiosInstance.get(API_ENDPOINTS.INVENTORY.MOVEMENTS, { params })
  },
}
