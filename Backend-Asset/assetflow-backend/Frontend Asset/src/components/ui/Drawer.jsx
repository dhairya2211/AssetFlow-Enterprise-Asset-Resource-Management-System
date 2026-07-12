import { useEffect, useRef } from 'react'
import { cn } from '@/utils'
import { LuX } from 'react-icons/lu'

/**
 * Reusable Drawer component with modern enterprise design
 * Supports multiple positions, sizes, and custom content
 */
export function Drawer({
  isOpen = false,
  onClose,
  position = 'right',
  size = 'md',
  title = null,
  description = null,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  footer = null,
  className = '',
  overlayClassName = '',
  contentClassName = ''
}) {
  const drawerRef = useRef(null)

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
    if (!isOpen || !drawerRef.current) return

    const focusableElements = drawerRef.current.querySelectorAll(
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

  // Prevent body scroll when drawer is open
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
    sm: 'w-80',
    md: 'w-96',
    lg: 'w-[480px]',
    xl: 'w-[600px]',
    '2xl': 'w-[720px]',
    full: 'w-full'
  }

  const positions = {
    left: 'left-0',
    right: 'right-0',
    top: 'top-0 left-0 right-0 h-auto max-h-[80vh]',
    bottom: 'bottom-0 left-0 right-0 h-auto max-h-[80vh]'
  }

  const isHorizontal = position === 'left' || position === 'right'

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
        position === 'top' && 'items-start',
        position === 'bottom' && 'items-end',
        (position === 'left' || position === 'right') && 'items-center',
        overlayClassName
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
      aria-describedby={description ? 'drawer-description' : undefined}
    >
      <div
        ref={drawerRef}
        className={cn(
          'h-full bg-[rgb(var(--color-surface))] shadow-2xl',
          'border border-[rgb(var(--color-border))]',
          isHorizontal ? 'h-full' : 'w-full',
          sizes[position === 'top' || position === 'bottom' ? 'md' : size],
          positions[position],
          isHorizontal && 'transition-transform duration-300 ease-in-out',
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
                  id="drawer-title"
                  className="text-lg font-semibold text-[rgb(var(--color-text-primary))]"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="drawer-description"
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
                aria-label="Close drawer"
              >
                <LuX className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn(
          'flex-1 overflow-y-auto',
          'px-6 py-4',
          !title && !showCloseButton && 'pt-6'
        )}>
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
 * Simple drawer without header/footer
 */
export function SimpleDrawer({
  isOpen,
  onClose,
  position = 'right',
  size = 'md',
  children,
  className = ''
}) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position={position}
      size={size}
      showCloseButton={false}
      contentClassName={className}
    >
      {children}
    </Drawer>
  )
}

export default Drawer
