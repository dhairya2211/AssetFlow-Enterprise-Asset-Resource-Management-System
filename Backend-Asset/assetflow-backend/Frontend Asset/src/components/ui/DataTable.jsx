import React, { useState } from 'react'
import { cn } from '@/utils'
import { LuArrowUpDown, LuChevronUp, LuChevronDown } from 'react-icons/lu'
import { Pagination } from './Pagination'

/**
 * Reusable Data Table component with modern enterprise design
 * Supports sorting, filtering, pagination, and custom cell renderers
 */
export function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No data available',
  onSort,
  onRowClick,
  selectable = false,
  onSelectionChange,
  pagination = null,
  className = '',
  tableClassName = ''
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [selectedRows, setSelectedRows] = useState(new Set())

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    onSort?.(key, direction)
  }

  const handleRowSelect = (rowId) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId)
    } else {
      newSelected.add(rowId)
    }
    setSelectedRows(newSelected)
    onSelectionChange?.(Array.from(newSelected))
  }

  const handleSelectAll = () => {
    if (selectedRows.size === data.length && data.length > 0) {
      setSelectedRows(new Set())
      onSelectionChange?.([])
    } else {
      const allIds = data.map(row => row.id)
      setSelectedRows(new Set(allIds))
      onSelectionChange?.(allIds)
    }
  }

  const getSortedData = () => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue === bValue) return 0

      const comparison = aValue < bValue ? -1 : 1
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
  }

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <LuArrowUpDown className="h-4 w-4 text-[rgb(var(--color-text-muted))]" />
    }
    return sortConfig.direction === 'asc' 
      ? <LuChevronUp className="h-4 w-4 text-[rgb(var(--color-primary-500))]" />
      : <LuChevronDown className="h-4 w-4 text-[rgb(var(--color-primary-500))]" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--color-primary-500))] border-t-transparent" />
          <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">Loading data...</p>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-[rgb(var(--color-text-muted))]">{emptyMessage}</p>
      </div>
    )
  }

  const sortedData = getSortedData()

  // Render pagination if it's an object, otherwise render as-is
  const renderPagination = () => {
    if (typeof pagination === 'object' && pagination !== null && !React.isValidElement(pagination)) {
      return <Pagination {...pagination} />
    }
    return pagination
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="overflow-x-auto">
        <table className={cn('w-full border-collapse', tableClassName)}>
          <thead>
            <tr className="border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface-hover))]">
              {selectable && (
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === data.length && data.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-[rgb(var(--color-border))] text-[rgb(var(--color-primary-500))] focus:ring-[rgb(var(--color-primary-500))]"
                  />
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider',
                    'text-[rgb(var(--color-text-secondary))]',
                    column.sortable && 'cursor-pointer hover:text-[rgb(var(--color-text-primary))] transition-colors',
                    column.className
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && renderSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'border-b border-[rgb(var(--color-border))] transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-[rgb(var(--color-surface-hover))]'
                )}
                onClick={() => onRowClick?.(row)}
              >
                {selectable && (
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded border-[rgb(var(--color-border))] text-[rgb(var(--color-primary-500))] focus:ring-[rgb(var(--color-primary-500))]"
                    />
                  </td>
                )}
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={cn(
                      'px-4 py-3 text-sm',
                      'text-[rgb(var(--color-text-primary))]',
                      column.className
                    )}
                  >
                    {column.render ? column.render(row[column.key], row, rowIndex) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="mt-4">
          {renderPagination()}
        </div>
      )}
    </div>
  )
}

/**
 * Compact data table for smaller spaces
 */
export function CompactTable({
  columns = [],
  data = [],
  loading = false,
  className = ''
}) {
  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      className={cn('text-xs', className)}
      tableClassName="text-xs"
    />
  )
}

/**
 * Data table with actions column
 */
export function ActionTable({
  columns = [],
  data = [],
  actions = [],
  loading = false,
  onAction,
  className = ''
}) {
  const actionColumns = [
    ...columns,
    {
      key: 'actions',
      header: '',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => onAction?.(action.key, row)}
              className="p-1 rounded text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))] transition-colors"
              title={action.label}
            >
              {action.icon}
            </button>
          ))}
        </div>
      )
    }
  ]

  return (
    <DataTable
      columns={actionColumns}
      data={data}
      loading={loading}
      className={className}
    />
  )
}

export default DataTable
