import { Outlet } from 'react-router-dom'

/**
 * Dashboard layout — main ERP shell with sidebar, header, and content area.
 * Sidebar and header components will be added under components/layout/.
 */
export function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar slot — components/layout/Sidebar.jsx */}
      <aside
        className="hidden shrink-0 border-r border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] lg:block"
        style={{ width: 'var(--sidebar-width)' }}
        aria-label="Main navigation"
      />

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header slot — components/layout/Header.jsx */}
        <header
          className="sticky top-0 z-10 border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))]"
          style={{ height: 'var(--header-height)' }}
        />

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full" style={{ maxWidth: 'var(--content-max-width)' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
