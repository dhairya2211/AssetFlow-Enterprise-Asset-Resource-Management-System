import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEYS } from '@/constants'
import { storage } from '@/utils'

const ThemeContext = createContext(null)

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => storage.get(STORAGE_KEYS.THEME) ?? THEMES.LIGHT,
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    storage.set(STORAGE_KEYS.THEME, theme)
  }, [theme])

  const setTheme = useCallback((nextTheme) => {
    setThemeState(nextTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === THEMES.DARK,
      setTheme,
      toggleTheme,
      THEMES,
    }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }
  return context
}

export default ThemeContext
