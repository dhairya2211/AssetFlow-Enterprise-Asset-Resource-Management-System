import { STORAGE_KEYS } from '@/constants'

/**
 * Type-safe localStorage helpers with JSON serialization.
 */
export const storage = {
  get(key, fallback = null) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : fallback
    } catch {
      return fallback
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  remove(key) {
    localStorage.removeItem(key)
  },

  clearAuth() {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN)
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
    storage.remove(STORAGE_KEYS.USER)
  },
}
