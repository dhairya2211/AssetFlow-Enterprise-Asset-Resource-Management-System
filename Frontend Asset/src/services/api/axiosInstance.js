import axios from 'axios'
import { STORAGE_KEYS, HTTP_STATUS } from '@/constants'
import { storage } from '@/utils'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1'

/**
 * Central Axios instance — all API calls go through this client.
 * Interceptors handle auth tokens and global error normalization.
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.get(STORAGE_KEYS.ACCESS_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status

    if (status === HTTP_STATUS.UNAUTHORIZED) {
      storage.clearAuth()
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
