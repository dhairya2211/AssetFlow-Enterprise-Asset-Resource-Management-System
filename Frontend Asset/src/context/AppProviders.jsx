import { AuthProvider } from './AuthContext'
import { ThemeProvider } from './ThemeContext'

/**
 * Composes all global context providers in the correct order.
 * Add new providers here as the app grows (e.g. NotificationProvider).
 */
export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}

export default AppProviders
