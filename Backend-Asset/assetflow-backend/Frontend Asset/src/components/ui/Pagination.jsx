import { cn } from '@/utils'
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from 'react-icons/lu'

/**
 * Reusable Pagination component with modern enterprise design
 * Supports multiple variants and custom page ranges
 */
export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showSizeChanger = false,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  showTotal = true,
  totalItems = 0,
  className = ''
}) {
  const getPageNumbers = () => {
    const pages = []
    const showPages = 5

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4', className)}>
      {/* Page info */}
      {showTotal && (
        <div className="text-sm text-[rgb(var(--color-text-secondary))]">
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-surface-hover))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="First page"
        >
          <LuChevronsLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-surface-hover))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <LuChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-[rgb(var(--color-text-muted))]">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={cn(
                  'min-w-[32px] px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  currentPage === page
                    ? 'bg-[rgb(var(--color-primary-500))] text-[rgb(var(--color-primary-foreground))]'
                    : 'text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-surface-hover))]'
                )}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-surface-hover))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <LuChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-surface-hover))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Last page"
        >
          <LuChevronsRight className="h-4 w-4" />
        </button>
      </div>

      {/* Page size changer */}
      {showSizeChanger && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-[rgb(var(--color-text-secondary))]">Items per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-3 py-1.5 text-sm rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

/**
 * Simple pagination without extra features
 */
export function SimplePagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = ''
}) {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      showTotal={false}
      showSizeChanger={false}
      className={className}
    />
  )
}

export default Pagination
