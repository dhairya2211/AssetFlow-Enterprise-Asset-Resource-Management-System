import { useState } from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Content wrapper — flexible content container with various sizing options
 * Used to wrap page content with consistent spacing and width constraints
 * 
 * @param {string} size - Container size: 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'custom'
 * @param {string} customMaxWidth - Custom max-width when size is 'custom'
 * @param {boolean} centered - Whether to center content horizontally
 * @param {string} padding - Padding size: 'none', 'sm', 'md', 'lg', 'xl'
 * @param {boolean} scrollable - Whether content area is scrollable
 * @param {string} className - Additional classes
 */
export function ContentWrapper({
  size = 'lg',
  customMaxWidth = null,
  centered = true,
  padding = 'md',
  scrollable = false,
  className = ''
}) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
    custom: customMaxWidth ? `max-w-[${customMaxWidth}]` : 'max-w-[var(--content-max-width)]',
  }

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-2 md:p-3 lg:p-4',
    md: 'p-4 md:p-6 lg:p-8',
    lg: 'p-6 md:p-8 lg:p-12',
    xl: 'p-8 md:p-12 lg:p-16',
  }

  const centeredClass = centered ? 'mx-auto' : ''
  const scrollableClass = scrollable ? 'overflow-auto' : ''

  return (
    <div
      className={`${sizeClasses[size]} ${paddingClasses[padding]} ${centeredClass} ${scrollableClass} w-full ${className}`}
    >
      <Outlet />
    </div>
  )
}

/**
 * Content wrapper with sidebar layout
 * Main content area with optional sidebar
 */
export function ContentWithSidebar({
  sidebarContent = null,
  sidebarPosition = 'left',
  sidebarWidth = 'w-64',
  className = ''
}) {
  const positionClass = sidebarPosition === 'left' ? 'flex-row' : 'flex-row-reverse'

  return (
    <div className={`flex ${positionClass} gap-6 ${className}`}>
      {/* Sidebar */}
      {sidebarContent && (
        <aside className={`shrink-0 ${sidebarWidth}`}>
          {sidebarContent}
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}

/**
 * Content wrapper with grid layout
 * For dashboard-style layouts with multiple content areas
 */
export function ContentGrid({
  columns = 2,
  gap = 'gap-6',
  className = ''
}) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    12: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6',
  }

  return (
    <div className={`grid ${gridClasses[columns]} ${gap} ${className}`}>
      <Outlet />
    </div>
  )
}

/**
 * Content wrapper with tabs layout
 * For tabbed content interfaces
 */
export function ContentWithTabs({
  tabs = [],
  defaultTab = 0,
  className = ''
}) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className="border-b border-[rgb(var(--color-border))]">
        <nav className="flex gap-4" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === index
                  ? 'border-b-2 border-[rgb(var(--color-primary-500))] text-[rgb(var(--color-primary-600))]'
                  : 'text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))]'
              }`}
              aria-selected={activeTab === index}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {tabs[activeTab]?.content || <Outlet />}
      </div>
    </div>
  )
}

/**
 * Content wrapper with split layout
 * Two-column layout with adjustable proportions
 */
export function SplitContent({
  leftContent = null,
  rightContent = null,
  splitRatio = '1/2',
  className = ''
}) {
  const ratioClasses = {
    '1/1': 'grid-cols-1 md:grid-cols-2',
    '1/2': 'grid-cols-1 md:grid-cols-3',
    '2/1': 'grid-cols-1 md:grid-cols-3',
    '1/3': 'grid-cols-1 md:grid-cols-4',
    '3/1': 'grid-cols-1 md:grid-cols-4',
  }

  const leftSpan = {
    '1/1': 'md:col-span-1',
    '1/2': 'md:col-span-1',
    '2/1': 'md:col-span-2',
    '1/3': 'md:col-span-1',
    '3/1': 'md:col-span-3',
  }

  return (
    <div className={`grid ${ratioClasses[splitRatio]} gap-6 ${className}`}>
      <div className={leftSpan[splitRatio]}>
        {leftContent || <Outlet />}
      </div>
      <div className="md:col-span-1">
        {rightContent}
      </div>
    </div>
  )
}

/**
 * Minimal content wrapper
 * For simple content without extra styling
 */
export function MinimalContent({ className = '' }) {
  return (
    <div className={className}>
      <Outlet />
    </div>
  )
}

export default ContentWrapper
