import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Responsive layout — adaptive layout that responds to screen size
 * Automatically adjusts layout based on breakpoint
 * 
 * @param {string} breakpoint - Breakpoint for layout changes: 'sm', 'md', 'lg', 'xl', '2xl'
 * @param {Object} layouts - Layout configurations for different breakpoints
 * @param {string} className - Additional classes
 */
export function ResponsiveLayout({ breakpoint = 'md', layouts = {}, className = '' }) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(breakpoint)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let newBreakpoint = breakpoint

      if (width < 640) newBreakpoint = 'xs'
      else if (width < 768) newBreakpoint = 'sm'
      else if (width < 1024) newBreakpoint = 'md'
      else if (width < 1280) newBreakpoint = 'lg'
      else if (width < 1536) newBreakpoint = 'xl'
      else newBreakpoint = '2xl'

      setCurrentBreakpoint(newBreakpoint)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  const layoutConfig = layouts[currentBreakpoint] || layouts[breakpoint] || {}

  return (
    <div className={className}>
      <Outlet context={{ breakpoint: currentBreakpoint, ...layoutConfig }} />
    </div>
  )
}

/**
 * Responsive grid layout
 * Grid that adjusts columns based on screen size
 */
export function ResponsiveGrid({
  cols = { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, '2xl': 4 },
  gap = 'gap-4 md:gap-6 lg:gap-8',
  className = ''
}) {
  const gridClasses = [
    `grid-cols-${cols.xs || 1}`,
    `sm:grid-cols-${cols.sm || cols.xs || 1}`,
    `md:grid-cols-${cols.md || cols.sm || cols.xs || 1}`,
    `lg:grid-cols-${cols.lg || cols.md || cols.sm || cols.xs || 1}`,
    `xl:grid-cols-${cols.xl || cols.lg || cols.md || cols.sm || cols.xs || 1}`,
    `2xl:grid-cols-${cols['2xl'] || cols.xl || cols.lg || cols.md || cols.sm || cols.xs || 1}`,
  ].join(' ')

  return (
    <div className={`grid ${gridClasses} ${gap} ${className}`}>
      <Outlet />
    </div>
  )
}

/**
 * Responsive container
 * Container that adjusts padding and max-width based on screen size
 */
export function ResponsiveContainer({
  padding = { xs: 'p-4', sm: 'p-4', md: 'p-6', lg: 'p-8', xl: 'p-8', '2xl': 'p-8' },
  maxWidth = 'var(--content-max-width)',
  centered = true,
  className = ''
}) {
  const paddingClasses = [
    padding.xs || 'p-4',
    padding.sm || padding.xs || 'p-4',
    padding.md || padding.sm || padding.xs || 'p-6',
    padding.lg || padding.md || padding.sm || padding.xs || 'p-8',
    padding.xl || padding.lg || padding.md || padding.sm || padding.xs || 'p-8',
    padding['2xl'] || padding.xl || padding.lg || padding.md || padding.sm || padding.xs || 'p-8',
  ].join(' ')

  const centeredClass = centered ? 'mx-auto' : ''

  return (
    <div
      className={`${paddingClasses} ${centeredClass} w-full ${className}`}
      style={{ maxWidth }}
    >
      <Outlet />
    </div>
  )
}

/**
 * Responsive sidebar layout
 * Sidebar that collapses or becomes off-canvas on smaller screens
 */
export function ResponsiveSidebarLayout({
  sidebarContent = null,
  sidebarWidth = 'w-64',
  sidebarCollapsedWidth = 'w-16',
  breakpoint = 'lg',
  className = ''
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`flex min-h-screen ${className}`}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgb(var(--color-neutral-900))]/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform bg-[rgb(var(--color-surface))] shadow-lg transition-transform duration-300 lg:relative lg:z-auto lg:shadow-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${isCollapsed ? sidebarCollapsedWidth : sidebarWidth}`}
      >
        {sidebarContent}
      </aside>

      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Mobile Header with Menu Toggle */}
        <header className="flex h-[var(--header-height)] items-center justify-between border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-[rgb(var(--color-text-secondary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))]"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

/**
 * Responsive card grid
 * Cards that adjust layout based on available space
 */
export function ResponsiveCardGrid({
  minCardWidth = 280,
  gap = 'gap-4',
  className = ''
}) {
  return (
    <div
      className={`grid gap-4 ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minCardWidth}px, 1fr))`,
        gap: '1rem',
      }}
    >
      <Outlet />
    </div>
  )
}

/**
 * Responsive flex layout
 * Flex container that adjusts direction and wrapping based on screen size
 */
export function ResponsiveFlex({
  direction = { xs: 'col', sm: 'col', md: 'row', lg: 'row', xl: 'row', '2xl': 'row' },
  wrap = { xs: 'wrap', sm: 'wrap', md: 'nowrap', lg: 'nowrap', xl: 'nowrap', '2xl': 'nowrap' },
  justify = 'justify-start',
  align = 'items-start',
  gap = 'gap-4',
  className = ''
}) {
  const directionClasses = {
    col: 'flex-col',
    row: 'flex-row',
  }

  const wrapClasses = {
    wrap: 'flex-wrap',
    nowrap: 'flex-nowrap',
  }

  return (
    <div
      className={`flex ${directionClasses[direction.xs]} ${wrapClasses[wrap.xs]} ${justify} ${align} ${gap} sm:${directionClasses[direction.sm]} sm:${wrapClasses[wrap.sm]} md:${directionClasses[direction.md]} md:${wrapClasses[wrap.md]} lg:${directionClasses[direction.lg]} lg:${wrapClasses[wrap.lg]} xl:${directionClasses[direction.xl]} xl:${wrapClasses[wrap.xl]} 2xl:${directionClasses[direction['2xl']]} 2xl:${wrapClasses[wrap['2xl']]} ${className}`}
    >
      <Outlet />
    </div>
  )
}

/**
 * Responsive text layout
 * Typography that scales based on screen size
 */
export function ResponsiveText({
  size = { xs: 'base', sm: 'base', md: 'lg', lg: 'xl', xl: '2xl', '2xl': '3xl' },
  weight = 'font-medium',
  className = ''
}) {
  const sizeClasses = {
    xs: `text-${size.xs}`,
    sm: `sm:text-${size.sm}`,
    md: `md:text-${size.md}`,
    lg: `lg:text-${size.lg}`,
    xl: `xl:text-${size.xl}`,
    '2xl': `2xl:text-${size['2xl']}`,
  }

  return (
    <div className={`${sizeClasses.xs} ${sizeClasses.sm} ${sizeClasses.md} ${sizeClasses.lg} ${sizeClasses.xl} ${sizeClasses['2xl']} ${weight} ${className}`}>
      <Outlet />
    </div>
  )
}

export default ResponsiveLayout
