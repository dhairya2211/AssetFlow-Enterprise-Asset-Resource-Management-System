import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth, useNavItems } from '@/hooks'
import { NAV_ITEMS, USER_ROLES } from '@/constants'
import {
  LuLayoutDashboard,
  LuBox,
  LuPackage,
  LuWrench,
  LuTrendingUp,
  LuUsers,
  LuSettings,
  LuChevronLeft,
  LuChevronRight,
  LuChevronDown,
  LuMenu,
  LuX,
} from 'react-icons/lu'

/**
 * Enterprise sidebar with premium features
 * Collapsible, nested menus, role-based navigation, keyboard navigation, dark mode
 */
export function Sidebar({ collapsed = false, onToggle, className = '' }) {
  const location = useLocation()
  const { user } = useAuth()
  const navItems = useNavItems(user?.role, NAV_ITEMS)
  const [expandedItems, setExpandedItems] = useState({})
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const sidebarRef = useRef(null)

  // Navigation items with icons and nested structure
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: LuLayoutDashboard,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER, USER_ROLES.VIEWER],
    },
    {
      id: 'assets',
      label: 'Assets',
      path: '/assets',
      icon: LuBox,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER, USER_ROLES.VIEWER],
      children: [
        { id: 'assets-list', label: 'All Assets', path: '/assets', roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER, USER_ROLES.VIEWER] },
        { id: 'assets-create', label: 'Create Asset', path: '/assets/new', roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR] },
        { id: 'assets-categories', label: 'Categories', path: '/assets/categories', roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER] },
      ],
    },
    {
      id: 'inventory',
      label: 'Inventory',
      path: '/inventory',
      icon: LuPackage,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER, USER_ROLES.VIEWER],
      children: [
        { id: 'inventory-stock', label: 'Stock Levels', path: '/inventory/stock', roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER] },
        { id: 'inventory-movements', label: 'Movements', path: '/inventory/movements', roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER] },
        { id: 'inventory-locations', label: 'Locations', path: '/inventory/locations', roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR] },
      ],
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      path: '/maintenance',
      icon: LuWrench,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER],
      children: [
        { id: 'maintenance-work-orders', label: 'Work Orders', path: '/maintenance/work-orders', roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.USER] },
        { id: 'maintenance-schedules', label: 'Schedules', path: '/maintenance/schedules', roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR] },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      path: '/reports',
      icon: LuTrendingUp,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SUPERVISOR, USER_ROLES.VIEWER],
    },
    {
      id: 'users',
      label: 'Users',
      path: '/users',
      icon: LuUsers,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: LuSettings,
      roles: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    },
  ]

  // Filter items by user role
  const filteredItems = navigationItems.filter(item => {
    if (!item.roles) return true
    return item.roles.includes(user?.role)
  })

  // Check if item is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  // Toggle nested menu
  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex(prev => Math.min(prev + 1, filteredItems.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault()
        const item = filteredItems[focusedIndex]
        if (item.children) {
          toggleExpanded(item.id)
        } else {
          window.location.href = item.path
        }
      } else if (e.key === 'Escape') {
        setFocusedIndex(-1)
      }
    }

    if (sidebarRef.current) {
      sidebarRef.current.addEventListener('keydown', handleKeyDown)
      return () => sidebarRef.current?.removeEventListener('keydown', handleKeyDown)
    }
  }, [filteredItems, focusedIndex])

  const renderNavItem = (item, level = 0, index = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems[item.id]
    const isItemActive = isActive(item.path)
    const Icon = item.icon

    return (
      <li key={item.id} role="none" className={level > 0 ? 'ml-4' : ''}>
        <Link
          to={item.path}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault()
              toggleExpanded(item.id)
            }
          }}
          className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
            isItemActive
              ? 'bg-[rgb(var(--color-primary-50))] text-[rgb(var(--color-primary-600))] shadow-sm'
              : 'text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))]'
          } ${focusedIndex === index ? 'ring-2 ring-[rgb(var(--color-primary-500))] ring-offset-2' : ''}`}
          role="menuitem"
          aria-current={isItemActive ? 'page' : undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
          tabIndex={level === 0 ? 0 : -1}
        >
          <Icon className={`h-5 w-5 flex-shrink-0 transition-colors ${isItemActive ? 'text-[rgb(var(--color-primary-600))]' : 'text-[rgb(var(--color-text-muted))]'}`} aria-hidden="true" />
          {!collapsed && (
            <>
              <span className="flex-1 truncate">{item.label}</span>
              {hasChildren && (
                <LuChevronDown
                  className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              )}
            </>
          )}
        </Link>

        {hasChildren && isExpanded && !collapsed && (
          <ul className="mt-1 space-y-1" role="menu">
            {item.children.map((child, childIndex) => renderNavItem(child, level + 1, childIndex))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <aside
      ref={sidebarRef}
      className={`hidden shrink-0 border-r border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] transition-all duration-300 ease-in-out lg:block ${
        collapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-width)]'
      } ${className}`}
      aria-label="Main navigation"
      role="menu"
    >
      {/* Logo/Brand */}
      <div className="flex h-[var(--header-height)] items-center border-b border-[rgb(var(--color-border))] px-4 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[rgb(var(--color-primary-500))] to-[rgb(var(--color-primary-600))] shadow-lg shadow-[rgb(var(--color-primary-500))]/20">
            <span className="text-sm font-bold text-[rgb(var(--color-primary-foreground))]">A</span>
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold text-[rgb(var(--color-text-primary))] transition-opacity duration-200">
              AssetFlow
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        <ul className="space-y-1" role="menu">
          {filteredItems.map((item, index) => renderNavItem(item, 0, index))}
        </ul>
      </nav>

      {/* Toggle Button */}
      <div className="border-t border-[rgb(var(--color-border))] p-3">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[rgb(var(--color-text-secondary))] transition-all duration-200 hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))] focus:ring-offset-2"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <LuChevronRight className="h-5 w-5" aria-hidden="true" />
          ) : (
            <>
              <LuChevronLeft className="h-5 w-5" aria-hidden="true" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}

/**
 * Mobile sidebar drawer with smooth animations
 */
export function MobileSidebar({ isOpen, onClose, children }) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    }
  }, [isOpen])

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-[rgb(var(--color-neutral-900))]/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[var(--sidebar-width)] transform bg-[rgb(var(--color-surface))] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* Mobile Header */}
        <div className="flex h-[var(--header-height)] items-center justify-between border-b border-[rgb(var(--color-border))] px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[rgb(var(--color-primary-500))] to-[rgb(var(--color-primary-600))]">
              <span className="text-sm font-bold text-[rgb(var(--color-primary-foreground))]">A</span>
            </div>
            <span className="text-lg font-semibold text-[rgb(var(--color-text-primary))]">
              AssetFlow
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[rgb(var(--color-text-secondary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
            aria-label="Close menu"
          >
            <LuX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  )
}

export default Sidebar
