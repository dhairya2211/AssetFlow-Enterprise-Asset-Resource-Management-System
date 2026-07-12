import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks'
import { useNavigation } from '@/utils/navigation'
import { useBreadcrumbs, useRouteConfig } from '@/hooks'
import {
  LuSearch,
  LuBell,
  LuSun,
  LuMoon,
  LuUser,
  LuSettings,
  LuLogOut,
  LuChevronDown,
  LuMenu,
  LuX,
  LuLayoutDashboard,
} from 'react-icons/lu'

/**
 * Enterprise navbar with premium features
 * Search, notifications, theme toggle, profile, avatar, breadcrumb, page title
 */
export function Navbar({
  onMobileMenuToggle,
  mobileMenuOpen = false,
  leftContent = null,
  rightContent = null,
  className = ''
}) {
  const { user, logout } = useAuth()
  const nav = useNavigation()
  const breadcrumbs = useBreadcrumbs()
  const routeConfig = useRouteConfig()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [theme, setTheme] = useState('light')
  const searchInputRef = useRef(null)
  const userMenuRef = useRef(null)
  const notificationMenuRef = useRef(null)

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  // Handle logout
  const handleLogout = async () => {
    await logout()
    nav.toLogin()
  }

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target)) {
        setNotificationMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
      // Escape to close menus
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setUserMenuOpen(false)
        setNotificationMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const pageTitle = routeConfig?.title || 'Dashboard'

  return (
    <header
      className={`sticky top-0 z-30 flex h-[var(--header-height)] items-center justify-between border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 md:px-6 shadow-sm transition-all duration-300 ${className}`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden rounded-lg p-2 text-[rgb(var(--color-text-secondary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <LuX className="h-6 w-6" aria-hidden="true" />
          ) : (
            <LuMenu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>

        {/* Breadcrumb & Page Title */}
        <div className="hidden md:flex flex-col">
          <nav className="flex items-center gap-2 text-xs text-[rgb(var(--color-text-muted))]">
            {breadcrumbs.map((item, index) => (
              <div key={item.path} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                <span className={index === breadcrumbs.length - 1 ? 'text-[rgb(var(--color-text-secondary))]' : ''}>
                  {item.title}
                </span>
              </div>
            ))}
          </nav>
          <h1 className="text-sm font-semibold text-[rgb(var(--color-text-primary))]">
            {pageTitle}
          </h1>
        </div>

        {/* Custom Left Content */}
        {leftContent}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative">
          {!searchOpen ? (
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-lg p-2 text-[rgb(var(--color-text-secondary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
              aria-label="Search"
              title="Search (⌘K)"
            >
              <LuSearch className="h-5 w-5" aria-hidden="true" />
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[rgb(var(--color-primary-500))]">
              <LuSearch className="h-4 w-4 text-[rgb(var(--color-text-muted))]" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 bg-transparent text-sm text-[rgb(var(--color-text-primary))] placeholder-[rgb(var(--color-text-muted))] focus:outline-none"
                aria-label="Search"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="rounded p-1 text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text-primary))]"
                aria-label="Close search"
              >
                <LuX className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationMenuRef}>
          <button
            onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
            className="relative rounded-lg p-2 text-[rgb(var(--color-text-secondary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
            aria-label="Notifications"
            aria-expanded={notificationMenuOpen}
          >
            <LuBell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[rgb(var(--color-error-500))] ring-2 ring-[rgb(var(--color-surface))]" aria-hidden="true" />
          </button>

          {notificationMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setNotificationMenuOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute right-0 z-20 mt-2 w-80 rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-lg">
                <div className="border-b border-[rgb(var(--color-border))] px-4 py-3">
                  <h3 className="text-sm font-semibold text-[rgb(var(--color-text-primary))]">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto py-2">
                  <div className="px-4 py-3 text-sm text-[rgb(var(--color-text-muted))]">
                    No new notifications
                  </div>
                </div>
                <div className="border-t border-[rgb(var(--color-border))] px-4 py-2">
                  <button className="text-sm text-[rgb(var(--color-primary-600))] hover:text-[rgb(var(--color-primary-700))]">
                    Mark all as read
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-[rgb(var(--color-text-secondary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <LuMoon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <LuSun className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        {/* Custom Right Content */}
        {rightContent}

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[rgb(var(--color-text-secondary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
            aria-label="User menu"
            aria-expanded={userMenuOpen}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(var(--color-primary-500))] to-[rgb(var(--color-primary-600))] text-sm font-medium text-[rgb(var(--color-primary-foreground))] shadow-md">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="hidden sm:block">{user?.name || 'User'}</span>
            <LuChevronDown className={`h-4 w-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>

          {userMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setUserMenuOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-lg">
                <div className="border-b border-[rgb(var(--color-border))] px-4 py-3">
                  <p className="text-sm font-medium text-[rgb(var(--color-text-primary))]">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-[rgb(var(--color-text-muted))]">
                    {user?.email || ''}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false)
                      nav.toDashboard()
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-[rgb(var(--color-text-secondary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))]"
                  >
                    <LuLayoutDashboard className="h-4 w-4" aria-hidden="true" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false)
                      nav.toSettings()
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-[rgb(var(--color-text-secondary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))] hover:text-[rgb(var(--color-text-primary))]"
                  >
                    <LuSettings className="h-4 w-4" aria-hidden="true" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-[rgb(var(--color-border))] py-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-[rgb(var(--color-error-600))] transition-colors hover:bg-[rgb(var(--color-error-50))]"
                  >
                    <LuLogOut className="h-4 w-4" aria-hidden="true" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

/**
 * Simple navbar without user menu
 * For public pages or simplified layouts
 */
export function SimpleNavbar({
  leftContent = null,
  rightContent = null,
  className = ''
}) {
  return (
    <header
      className={`flex h-[var(--header-height)] items-center justify-between border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 md:px-6 ${className}`}
    >
      <div className="flex items-center gap-4">
        {leftContent}
      </div>
      <div className="flex items-center gap-4">
        {rightContent}
      </div>
    </header>
  )
}

export default Navbar
