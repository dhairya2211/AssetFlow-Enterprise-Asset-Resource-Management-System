import { useAuthContext } from '@/context'

/**
 * Convenience hook for auth state and actions.
 */
export function useAuth() {
  return useAuthContext()
}

export default useAuth
