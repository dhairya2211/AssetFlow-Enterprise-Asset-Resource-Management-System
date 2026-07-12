import { Outlet } from 'react-router-dom'

/**
 * Root layout — top-level shell wrapping the entire application.
 * Handles global elements: error boundaries, toasts, analytics (future).
 */
export function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Outlet />
    </div>
  )
}

export default RootLayout
