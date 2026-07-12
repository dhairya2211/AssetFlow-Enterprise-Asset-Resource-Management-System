import { useState, useRef, useEffect } from 'react'
import { cn } from '@/utils'

/**
 * Reusable Tooltip component with modern enterprise design
 * Supports multiple positions and custom content
 */
export function Tooltip({
  content,
  position = 'top',
  delay = 200,
  children,
  className = '',
  contentClassName = ''
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  const tooltipRef = useRef(null)

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setIsVisible(false)
  }

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  const arrows = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-l-transparent border-r-transparent border-b-transparent border-t-[rgb(var(--color-surface-elevated))]',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-l-transparent border-r-transparent border-t-transparent border-b-[rgb(var(--color-surface-elevated))]',
    left: 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-t-transparent border-b-transparent border-r-transparent border-l-[rgb(var(--color-surface-elevated))]',
    right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-t-transparent border-b-transparent border-l-transparent border-r-[rgb(var(--color-surface-elevated))]'
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            'absolute z-50 px-3 py-1.5 text-xs font-medium text-[rgb(var(--color-text-primary))]',
            'bg-[rgb(var(--color-surface-elevated))] border border-[rgb(var(--color-border))] rounded-lg shadow-lg',
            'whitespace-nowrap',
            positions[position],
            contentClassName
          )}
          role="tooltip"
        >
          {content}
          <div
            className={cn(
              'absolute border-4',
              arrows[position]
            )}
          />
        </div>
      )}
    </div>
  )
}

export default Tooltip
