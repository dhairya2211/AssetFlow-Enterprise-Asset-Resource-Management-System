import { Outlet } from 'react-router-dom'

/**
 * Root layout — top-level shell wrapping the entire application.
 * Handles global elements: error boundaries, toasts, analytics (future).
 */
export function RootLayout() {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] text-[rgb(var(--color-text-primary))]">
      <Outlet />
    </div>
  )
}

export default RootLayout
