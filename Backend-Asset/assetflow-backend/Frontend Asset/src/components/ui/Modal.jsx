import { useEffect, useRef } from 'react'
import { cn } from '@/utils'
import { LuX } from 'react-icons/lu'

/**
 * Reusable Modal component with modern enterprise design
 * Supports multiple sizes, positions, and custom content
 */
export function Modal({
  isOpen = false,
  onClose,
  title = null,
  description = null,
  size = 'md',
  position = 'center',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  footer = null,
  className = '',
  overlayClassName = '',
  contentClassName = ''
}) {
  const modalRef = useRef(null)

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    firstElement?.focus()

    const handleTab = (e) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-6xl'
  }

  const positions = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-20',
    bottom: 'items-end justify-center pb-20'
  }

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex',
        'bg-black/50 backdrop-blur-sm',
        positions[position],
        overlayClassName
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
    >
      <div
        ref={modalRef}
        className={cn(
          'relative w-full mx-4',
          'bg-[rgb(var(--color-surface))] rounded-xl shadow-2xl',
          'border border-[rgb(var(--color-border))]',
          sizes[size],
          contentClassName
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgb(var(--color-border))]">
            <div className="flex-1">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-[rgb(var(--color-text-primary))]"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-sm text-[rgb(var(--color-text-secondary))]"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="ml-4 rounded-lg p-2 text-[rgb(var(--color-text-secondary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                aria-label="Close modal"
              >
                <LuX className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn('px-6 py-4', !title && !showCloseButton && 'pt-6')}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgb(var(--color-border))]">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Confirmation modal with predefined actions
 */
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-[rgb(var(--color-text-primary))] rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] hover:bg-[rgb(var(--color-surface-hover))] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
              variant === 'danger'
                ? 'bg-[rgb(var(--color-error-500))] text-[rgb(var(--color-error-foreground))] hover:bg-[rgb(var(--color-error-600))]'
                : 'bg-[rgb(var(--color-primary-500))] text-[rgb(var(--color-primary-foreground))] hover:bg-[rgb(var(--color-primary-600))]'
            )}
          >
            {loading ? 'Loading...' : confirmText}
          </button>
        </>
      }
    />
  )
}

export default Modal
