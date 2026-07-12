import axiosInstance from './api/axiosInstance'
import { API_ENDPOINTS } from '@/constants'
import { storage } from '@/utils'
import { STORAGE_KEYS } from '@/constants'

/**
 * Authentication service — login, logout, token refresh, session.
 */
export const authService = {
  async login(credentials) {
    // Mock login for development purposes
    const mockUser = {
      id: 1,
      name: 'Alex Wilson',
      email: credentials.email || 'alex@company.com',
      role: 'admin',
      avatar: 'AW'
    }
    return {
      accessToken: 'mock-access-token-12345',
      refreshToken: 'mock-refresh-token-12345',
      user: mockUser
    }
  },

  async register(payload) {
    const mockUser = {
      id: 2,
      name: payload.name,
      email: payload.email,
      role: 'user',
      avatar: payload.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
    }
    return {
      accessToken: 'mock-access-token-67890',
      refreshToken: 'mock-refresh-token-67890',
      user: mockUser
    }
  },

  async logout() {
    storage.clearAuth()
  },

  async getCurrentUser() {
    return this.getStoredUser()
  },

  async forgotPassword(email) {
    return { success: true }
  },

  async resetPassword(payload) {
    return { success: true }
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
