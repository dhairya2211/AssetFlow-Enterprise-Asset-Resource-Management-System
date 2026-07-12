import { useState } from 'react'
import { cn } from '@/utils'
import { LuFilter, LuX, LuChevronDown } from 'react-icons/lu'

/**
 * Reusable Filter component with modern enterprise design
 * Supports multiple filter types and custom filter logic
 */
export function Filter({
  filters = [],
  activeFilters = {},
  onFilterChange,
  onClearAll,
  onApply,
  showClearAll = true,
  showApplyButton = false,
  variant = 'dropdown',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(activeFilters)

  const activeCount = Object.keys(activeFilters).filter(
    key => activeFilters[key] !== '' && activeFilters[key] !== null && activeFilters[key] !== undefined
  ).length

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    if (!showApplyButton) {
      onFilterChange(newFilters)
    }
  }

  const handleClearAll = () => {
    const clearedFilters = {}
    filters.forEach(filter => {
      clearedFilters[filter.key] = filter.defaultValue || ''
    })
    setLocalFilters(clearedFilters)
    onFilterChange(clearedFilters)
    onClearAll?.()
  }

  const handleApply = () => {
    onFilterChange(localFilters)
    onApply?.(localFilters)
    setIsOpen(false)
  }

  const renderFilterInput = (filter) => {
    const value = localFilters[filter.key] ?? filter.defaultValue ?? ''

    switch (filter.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
          >
            <option value="">{filter.placeholder || 'Select...'}</option>
            {filter.options?.map((option, i) => (
              <option key={i} value={option.value}>{option.label}</option>
            ))}
          </select>
        )

      case 'multiselect':
        return (
          <select
            multiple
            value={Array.isArray(value) ? value : []}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map(opt => opt.value)
              handleFilterChange(filter.key, selected)
            }}
            className="w-full px-3 py-2 text-sm rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
          >
            {filter.options?.map((option, i) => (
              <option key={i} value={option.value}>{option.label}</option>
            ))}
          </select>
        )

      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
          />
        )

      case 'daterange':
        return (
          <div className="flex gap-2">
            <input
              type="date"
              value={value?.start || ''}
              onChange={(e) => handleFilterChange(filter.key, { ...value, start: e.target.value })}
              placeholder="Start"
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
            />
            <input
              type="date"
              value={value?.end || ''}
              onChange={(e) => handleFilterChange(filter.key, { ...value, end: e.target.value })}
              placeholder="End"
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
            />
          </div>
        )

      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleFilterChange(filter.key, e.target.checked)}
              className="w-4 h-4 rounded border-[rgb(var(--color-border))] text-[rgb(var(--color-primary-500))] focus:ring-[rgb(var(--color-primary-500))]"
            />
            <span className="text-sm text-[rgb(var(--color-text-primary))]">{filter.label}</span>
          </label>
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {filter.options?.map((option, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={filter.key}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className="w-4 h-4 border-[rgb(var(--color-border))] text-[rgb(var(--color-primary-500))] focus:ring-[rgb(var(--color-primary-500))]"
                />
                <span className="text-sm text-[rgb(var(--color-text-primary))]">{option.label}</span>
              </label>
            ))}
          </div>
        )

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            placeholder={filter.placeholder}
            className="w-full px-3 py-2 text-sm rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
          />
        )
    }
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium text-sm transition-colors',
            isOpen || activeCount > 0
              ? 'bg-[rgb(var(--color-primary-500))] text-[rgb(var(--color-primary-foreground))] border-[rgb(var(--color-primary-500))]'
              : 'bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] border-[rgb(var(--color-border))] hover:bg-[rgb(var(--color-surface-hover))]'
          )}
        >
          <LuFilter className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-[rgb(var(--color-primary-600))]">
              {activeCount}
            </span>
          )}
          <LuChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 z-20 mt-2 w-80 p-4 bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] rounded-lg shadow-lg">
              <div className="space-y-4">
                {filters.map((filter, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-2">
                      {filter.label}
                    </label>
                    {renderFilterInput(filter)}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[rgb(var(--color-border))]">
                {showClearAll && (
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] transition-colors"
                  >
                    Clear all
                  </button>
                )}
                {showApplyButton && (
                  <button
                    onClick={handleApply}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-[rgb(var(--color-primary-500))] text-[rgb(var(--color-primary-foreground))] hover:bg-[rgb(var(--color-primary-600))] transition-colors"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={cn('flex flex-wrap items-center gap-3', className)}>
        {filters.map((filter, index) => (
          <div key={index} className="flex items-center gap-2">
            <label className="text-sm font-medium text-[rgb(var(--color-text-primary))]">
              {filter.label}:
            </label>
            {renderFilterInput(filter)}
          </div>
        ))}
        {showClearAll && activeCount > 0 && (
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-surface-hover))] transition-colors"
          >
            <LuX className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>
    )
  }

  return null
}

/**
 * Simple filter bar with preset filters
 */
export function FilterBar({
  filters = [],
  activeFilters = {},
  onFilterChange,
  className = ''
}) {
  return (
    <Filter
      filters={filters}
      activeFilters={activeFilters}
      onFilterChange={onFilterChange}
      variant="inline"
      showClearAll={false}
      showApplyButton={false}
      className={className}
    />
  )
}

export default Filter
