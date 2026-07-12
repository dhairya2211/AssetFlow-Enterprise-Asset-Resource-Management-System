import { createContext, useContext, useEffect, useState } from 'react'
import { cn } from '@/utils'
import { LuCheck, LuX, LuInfo, LuCircleAlert } from 'react-icons/lu'

/**
 * Toast context for managing toasts
 */
const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    const id = Date.now()
    setToasts(prev => [...prev, { ...toast, id }])
    
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 5000)
    }
    
    return id
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const success = (message, options = {}) => addToast({ type: 'success', message, ...options })
  const error = (message, options = {}) => addToast({ type: 'error', message, ...options })
  const warning = (message, options = {}) => addToast({ type: 'warning', message, ...options })
  const info = (message, options = {}) => addToast({ type: 'info', message, ...options })

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

/**
 * Toast container component
 */
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

/**
 * Individual Toast component
 */
function Toast({ toast, onRemove }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    return () => setIsVisible(false)
  }, [])

  const icons = {
    success: <LuCheck className="h-5 w-5" />,
    error: <LuX className="h-5 w-5" />,
    warning: <LuCircleAlert className="h-5 w-5" />,
    info: <LuInfo className="h-5 w-5" />
  }

  const variants = {
    success: 'bg-[rgb(var(--color-success-50))] border-[rgb(var(--color-success-200))] text-[rgb(var(--color-success-800))]',
    error: 'bg-[rgb(var(--color-error-50))] border-[rgb(var(--color-error-200))] text-[rgb(var(--color-error-800))]',
    warning: 'bg-[rgb(var(--color-warning-50))] border-[rgb(var(--color-warning-200))] text-[rgb(var(--color-warning-800))]',
    info: 'bg-[rgb(var(--color-info-50))] border-[rgb(var(--color-info-200))] text-[rgb(var(--color-info-800))]'
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4 shadow-lg',
        'min-w-[300px] max-w-md',
        'transition-all duration-300',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        variants[toast.type]
      )}
      role="alert"
    >
      <span className="flex-shrink-0 mt-0.5">{icons[toast.type]}</span>
      <div className="flex-1">
        <p className="text-sm font-medium">{toast.message}</p>
        {toast.description && (
          <p className="mt-1 text-xs opacity-80">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onRemove}
        className="flex-shrink-0 rounded p-1 hover:bg-black/5 transition-colors"
        aria-label="Close toast"
      >
        <LuX className="h-4 w-4" />
      </button>
    </div>
  )
}

export default Toast
