import { useCallback, useState } from 'react'
import { storage } from '@/utils'

/**
 * Syncs state with localStorage — persists user preferences and UI state.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return storage.get(key, initialValue)
  })

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value
        storage.set(key, nextValue)
        return nextValue
      })
    },
    [key],
  )

  const removeValue = useCallback(() => {
    storage.remove(key)
    setStoredValue(initialValue)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage
