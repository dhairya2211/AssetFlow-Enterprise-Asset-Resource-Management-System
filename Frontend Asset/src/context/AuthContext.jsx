import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { authService } from '@/services'
import { STORAGE_KEYS } from '@/constants'
import { storage } from '@/utils'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getStoredUser())
  const [isLoading, setIsLoading] = useState(false)

  const isAuthenticated = useMemo(() => authService.isAuthenticated(), [user])

  const login = useCallback(async (credentials) => {
    setIsLoading(true)
    try {
      const session = await authService.login(credentials)
      authService.persistSession(session)
      setUser(session.user ?? null)
      return session
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await authService.logout()
    } finally {
      setUser(null)
      setIsLoading(false)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      setUser,
    }),
    [user, isAuthenticated, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}

export default AuthContext
