import { useRouteConfig } from '@/hooks'

/**
 * Page header component
 * Displays page title, description, and actions
 * 
 * @param {string} title - Custom title (overrides route config)
 * @param {string} description - Page description
 * @param {React.ReactNode} actions - Action buttons/content
 * @param {React.ReactNode} leftContent - Left side content
 * @param {boolean} showBreadcrumb - Whether to show breadcrumb
 * @param {string} className - Additional classes
 */
export function PageHeader({
  title = null,
  description = null,
  actions = null,
  leftContent = null,
  showBreadcrumb = true,
  className = ''
}) {
  const routeConfig = useRouteConfig()
  const pageTitle = title || routeConfig?.title || 'Page'

  return (
    <div className={`mb-6 space-y-4 ${className}`}>
      {/* Breadcrumb */}
      {showBreadcrumb && (
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {/* Breadcrumb component would be imported here */}
            {/* <Breadcrumb /> */}
          </div>
          {leftContent && (
            <div className="ml-4">{leftContent}</div>
          )}
        </div>
      )}

      {/* Header Content */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1 space-y-1">
          <h1 className="text-2xl font-semibold text-[rgb(var(--color-text-primary))] md:text-3xl">
            {pageTitle}
          </h1>
          {description && (
            <p className="text-[rgb(var(--color-text-secondary))]">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Simple page header without breadcrumb
 * For pages with minimal header needs
 */
export function SimplePageHeader({
  title = null,
  description = null,
  actions = null,
  className = ''
}) {
  const routeConfig = useRouteConfig()
  const pageTitle = title || routeConfig?.title || 'Page'

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1 space-y-1">
          <h1 className="text-2xl font-semibold text-[rgb(var(--color-text-primary))]">
            {pageTitle}
          </h1>
          {description && (
            <p className="text-[rgb(var(--color-text-secondary))]">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Compact page header for smaller spaces
 */
export function CompactPageHeader({
  title = null,
  actions = null,
  className = ''
}) {
  const routeConfig = useRouteConfig()
  const pageTitle = title || routeConfig?.title || 'Page'

  return (
    <div className={`mb-4 flex items-center justify-between ${className}`}>
      <h2 className="text-xl font-semibold text-[rgb(var(--color-text-primary))]">
        {pageTitle}
      </h2>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  )
}

export default PageHeader
