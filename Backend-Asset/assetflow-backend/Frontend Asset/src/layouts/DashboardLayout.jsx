import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, MobileSidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import { Breadcrumb } from './components/Breadcrumb'

/**
 * Dashboard layout — main ERP shell with sidebar, header, breadcrumb, and content area.
 * Responsive design with mobile sidebar support
 * 
 * @param {boolean} sidebarCollapsed - Initial sidebar collapsed state
 * @param {boolean} showBreadcrumb - Whether to show breadcrumb
 * @param {React.ReactNode} navbarLeftContent - Custom navbar left content
 * @param {React.ReactNode} navbarRightContent - Custom navbar right content
 * @param {boolean} showFooter - Whether to show footer
 * @param {string} className - Additional classes
 */
export function DashboardLayout({
  sidebarCollapsed = false,
  showBreadcrumb = true,
  navbarLeftContent = null,
  navbarRightContent = null,
  showFooter = false,
  className = ''
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(sidebarCollapsed)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false)
  }

  return (
    <div className={`flex min-h-screen bg-[rgb(var(--color-background))] ${className}`}>
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        className="hidden lg:block"
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={handleMobileSidebarClose}
      >
        <Sidebar
          collapsed={false}
          onToggle={() => {}}
          className="block lg:hidden"
        />
      </MobileSidebar>

      {/* Main Content Area */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Navbar */}
        <Navbar
          onMobileMenuToggle={handleMobileSidebarToggle}
          mobileMenuOpen={isMobileSidebarOpen}
          leftContent={navbarLeftContent}
          rightContent={navbarRightContent}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto w-full p-4 md:p-6 lg:p-8" style={{ maxWidth: 'var(--content-max-width)' }}>
            {/* Breadcrumb */}
            {showBreadcrumb && (
              <div className="mb-4">
                <Breadcrumb />
              </div>
            )}

            {/* Page Content */}
            <Outlet />
          </div>
        </main>

        {/* Optional Footer */}
        {showFooter && (
          <footer className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 py-4 md:px-6">
            <div className="mx-auto max-w-[var(--content-max-width)] text-sm text-[rgb(var(--color-text-secondary))]">
              © {new Date().getFullYear()} AssetFlow. All rights reserved.
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

/**
 * Dashboard layout without sidebar
 * For simplified dashboard views
 */
export function DashboardLayoutWithoutSidebar({
  showBreadcrumb = true,
  navbarLeftContent = null,
  navbarRightContent = null,
  showFooter = false,
  className = ''
}) {
  return (
    <div className={`flex min-h-screen flex-col bg-[rgb(var(--color-background))] ${className}`}>
      {/* Navbar */}
      <Navbar
        leftContent={navbarLeftContent}
        rightContent={navbarRightContent}
      />

      {/* Page Content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto w-full p-4 md:p-6 lg:p-8" style={{ maxWidth: 'var(--content-max-width)' }}>
          {/* Breadcrumb */}
          {showBreadcrumb && (
            <div className="mb-4">
              <Breadcrumb />
            </div>
          )}

          {/* Page Content */}
          <Outlet />
        </div>
      </main>

      {/* Optional Footer */}
      {showFooter && (
        <footer className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 py-4 md:px-6">
          <div className="mx-auto max-w-[var(--content-max-width)] text-sm text-[rgb(var(--color-text-secondary))]">
            © {new Date().getFullYear()} AssetFlow. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  )
}

export default DashboardLayout
