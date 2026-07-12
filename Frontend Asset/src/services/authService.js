import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from '@/constants'
import { storage } from '@/utils'
import { STORAGE_KEYS } from '@/constants'

/**
 * Authentication service — login, logout, token refresh, session.
 */
export const authService = {
  async login(credentials) {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
    return data
  },

  async register(payload) {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, payload)
    return data
  },

  async logout() {
    try {
      await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT)
    } finally {
      storage.clearAuth()
    }
  },

  async getCurrentUser() {
    const { data } = await axiosInstance.get(API_ENDPOINTS.AUTH.ME)
    return data
  },

  async forgotPassword(email) {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
    return data
  },

  async resetPassword(payload) {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, payload)
    return data
  },

  persistSession({ accessToken, refreshToken, user }) {
    if (accessToken) storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
    if (refreshToken) storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
    if (user) storage.set(STORAGE_KEYS.USER, user)
  },

  getStoredUser() {
    return storage.get(STORAGE_KEYS.USER)
  },

  isAuthenticated() {
    return Boolean(storage.get(STORAGE_KEYS.ACCESS_TOKEN))
  },
}
