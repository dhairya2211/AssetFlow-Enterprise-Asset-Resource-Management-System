import { useState, useRef, useEffect } from 'react'
import { cn } from '@/utils'
import { LuSearch, LuX } from 'react-icons/lu'

/**
 * Reusable Search component with modern enterprise design
 * Supports debounced search, keyboard shortcuts, and custom actions
 */
export function Search({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  showClearButton = true,
  autoFocus = false,
  disabled = false,
  size = 'md',
  className = '',
  inputClassName = ''
}) {
  const [localValue, setLocalValue] = useState(value)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleChange = (e) => {
    const newValue = e.target.value
    setLocalValue(newValue)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      onChange?.(newValue)
      onSearch?.(newValue)
    }, debounceMs)
  }

  const handleClear = () => {
    setLocalValue('')
    onChange?.('')
    onSearch?.('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear()
      inputRef.current?.blur()
    }
  }

  const sizes = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base'
  }

  return (
    <div
      className={cn(
        'relative flex items-center',
        'rounded-lg border transition-all duration-200',
        isFocused ? 'ring-2 ring-[rgb(var(--color-primary-500))] border-[rgb(var(--color-primary-500))]' : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-border-hover))]',
        disabled ? 'opacity-50 cursor-not-allowed bg-[rgb(var(--color-surface-hover))]' : 'bg-[rgb(var(--color-surface))]',
        sizes[size],
        className
      )}
    >
      <LuSearch className="h-4 w-4 text-[rgb(var(--color-text-muted))] ml-3 flex-shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'flex-1 bg-transparent border-none outline-none',
          'text-[rgb(var(--color-text-primary))] placeholder-[rgb(var(--color-text-muted))]',
          'mx-2',
          inputClassName
        )}
      />
      {showClearButton && localValue && !disabled && (
        <button
          onClick={handleClear}
          className="mr-2 p-1 rounded text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-surface-hover))] transition-colors"
          aria-label="Clear search"
        >
          <LuX className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

/**
 * Search with advanced filters dropdown
 */
export function AdvancedSearch({
  value = '',
  onChange,
  onSearch,
  filters = [],
  onFilterChange,
  placeholder = 'Search...',
  className = ''
}) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Search
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        placeholder={placeholder}
        className="flex-1"
      />
      {filters.length > 0 && (
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'px-4 py-2 rounded-lg border font-medium text-sm transition-colors',
            showFilters
              ? 'bg-[rgb(var(--color-primary-500))] text-[rgb(var(--color-primary-foreground))] border-[rgb(var(--color-primary-500))]'
              : 'bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] border-[rgb(var(--color-border))] hover:bg-[rgb(var(--color-surface-hover))]'
          )}
        >
          Filters
        </button>
      )}
      {showFilters && filters.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-lg shadow-lg z-10">
          {filters.map((filter, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-2">
                {filter.label}
              </label>
              {filter.type === 'select' ? (
                <select
                  value={filter.value}
                  onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                >
                  {filter.options.map((option, i) => (
                    <option key={i} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={filter.value}
                  onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
                  placeholder={filter.placeholder}
                  className="w-full px-3 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
