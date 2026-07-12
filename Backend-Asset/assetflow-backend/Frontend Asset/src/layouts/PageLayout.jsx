import { Outlet } from 'react-router-dom'
import { PageHeader } from './components/PageHeader'
import { Breadcrumb } from './components/Breadcrumb'
import { Footer } from './components/Footer'

/**
 * Page layout — content wrapper with page header, breadcrumb, and footer
 * For individual pages within the app
 * 
 * @param {string} title - Custom page title
 * @param {string} description - Page description
 * @param {React.ReactNode} actions - Page header actions
 * @param {React.ReactNode} headerLeftContent - Page header left content
 * @param {boolean} showBreadcrumb - Whether to show breadcrumb
 * @param {boolean} showFooter - Whether to show footer
 * @param {React.ReactNode} footerContent - Custom footer content
 * @param {string} className - Additional classes
 */
export function PageLayout({
  title = null,
  description = null,
  actions = null,
  headerLeftContent = null,
  showBreadcrumb = true,
  showFooter = false,
  footerContent = null,
  className = ''
}) {
  return (
    <div className={`flex min-h-screen flex-col ${className}`}>
      {/* Page Header */}
      <PageHeader
        title={title}
        description={description}
        actions={actions}
        leftContent={headerLeftContent}
        showBreadcrumb={showBreadcrumb}
      />

      {/* Page Content */}
      <main className="flex-1">
        <div className="mx-auto w-full p-4 md:p-6 lg:p-8" style={{ maxWidth: 'var(--content-max-width)' }}>
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      {showFooter && (
        <Footer>{footerContent}</Footer>
      )}
    </div>
  )
}

/**
 * Simple page layout without header
 * For minimal pages
 */
export function SimplePageLayout({
  showFooter = false,
  footerContent = null,
  className = ''
}) {
  return (
    <div className={`flex min-h-screen flex-col ${className}`}>
      {/* Page Content */}
      <main className="flex-1">
        <div className="mx-auto w-full p-4 md:p-6 lg:p-8" style={{ maxWidth: 'var(--content-max-width)' }}>
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      {showFooter && (
        <Footer>{footerContent}</Footer>
      )}
    </div>
  )
}

/**
 * Page layout with full-width content
 * For pages that need full width (e.g., tables, dashboards)
 */
export function FullWidthPageLayout({
  title = null,
  description = null,
  actions = null,
  headerLeftContent = null,
  showBreadcrumb = true,
  showFooter = false,
  footerContent = null,
  className = ''
}) {
  return (
    <div className={`flex min-h-screen flex-col ${className}`}>
      {/* Page Header */}
      <PageHeader
        title={title}
        description={description}
        actions={actions}
        leftContent={headerLeftContent}
        showBreadcrumb={showBreadcrumb}
      />

      {/* Page Content */}
      <main className="flex-1">
        <div className="w-full p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      {showFooter && (
        <Footer>{footerContent}</Footer>
      )}
    </div>
  )
}

/**
 * Page layout with centered content
 * For focused content like forms, modals
 */
export function CenteredPageLayout({
  title = null,
  description = null,
  actions = null,
  showBreadcrumb = true,
  showFooter = false,
  footerContent = null,
  maxWidth = 'md',
  className = ''
}) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  }

  return (
    <div className={`flex min-h-screen flex-col ${className}`}>
      {/* Page Header */}
      {title && (
        <div className="border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 py-6 md:px-6">
          <div className="mx-auto" style={{ maxWidth: 'var(--content-max-width)' }}>
            {showBreadcrumb && <Breadcrumb />}
            <div className="mt-4">
              <PageHeader
                title={title}
                description={description}
                actions={actions}
                showBreadcrumb={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1">
        <div className={`mx-auto flex w-full flex-col p-4 md:p-6 lg:p-8 ${maxWidthClasses[maxWidth] || maxWidthClasses.md}`}>
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      {showFooter && (
        <Footer>{footerContent}</Footer>
      )}
    </div>
  )
}

export default PageLayout
