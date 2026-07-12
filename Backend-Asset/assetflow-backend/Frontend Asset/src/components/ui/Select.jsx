import { forwardRef, useState } from 'react'
import { cn } from '@/utils'
import { LuChevronDown, LuCheck } from 'react-icons/lu'

/**
 * Reusable Select component with modern enterprise design
 * Supports multiple variants, sizes, and states
 */
const Select = forwardRef(({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select an option',
  variant = 'default',
  size = 'md',
  error = false,
  disabled = false,
  label = null,
  helperText = null,
  errorMessage = null,
  fullWidth = false,
  searchable = false,
  className = '',
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const variants = {
    default: 'border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] focus:border-[rgb(var(--color-primary-500))]',
    filled: 'border-transparent bg-[rgb(var(--color-surface-hover))] focus:border-[rgb(var(--color-primary-500))]',
    outlined: 'border-2 border-[rgb(var(--color-border))] bg-transparent focus:border-[rgb(var(--color-primary-500))]',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }

  const errorClasses = error
    ? 'border-[rgb(var(--color-error-500))] focus:border-[rgb(var(--color-error-500))]'
    : ''

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options

  const selectedOption = options.find(option => option.value === value)

  const handleSelect = (optionValue) => {
    onChange?.(optionValue)
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-primary))]">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          ref={ref}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'w-full flex items-center justify-between rounded-lg border transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variants[variant],
            sizes[size],
            errorClasses,
            className
          )}
          {...props}
        >
          <span className={selectedOption ? 'text-[rgb(var(--color-text-primary))]' : 'text-[rgb(var(--color-text-muted))]'}>
            {selectedOption?.label || placeholder}
          </span>
          <LuChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 mt-2 w-full rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-lg">
              {searchable && (
                <div className="border-b border-[rgb(var(--color-border))] p-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full rounded-md border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface-hover))] px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                  />
                </div>
              )}
              <div className="max-h-60 overflow-y-auto py-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-[rgb(var(--color-text-muted))]">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        'flex w-full items-center justify-between px-4 py-2 text-sm transition-colors',
                        'hover:bg-[rgb(var(--color-surface-hover))]',
                        option.value === value
                          ? 'bg-[rgb(var(--color-primary-50))] text-[rgb(var(--color-primary-600))]'
                          : 'text-[rgb(var(--color-text-primary))]'
                      )}
                    >
                      {option.label}
                      {option.value === value && <LuCheck className="h-4 w-4" />}
                    </button>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {(helperText || errorMessage) && (
        <p className={cn(
          'mt-1.5 text-sm',
          errorMessage ? 'text-[rgb(var(--color-error-500))]' : 'text-[rgb(var(--color-text-muted))]'
        )}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select
