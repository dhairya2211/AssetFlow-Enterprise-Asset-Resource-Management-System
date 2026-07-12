import { Outlet } from 'react-router-dom'

/**
 * Auth layout — centered shell for login, register, and password flows.
 * No sidebar; minimal chrome to keep focus on authentication.
 * 
 * @param {React.ReactNode} headerContent - Custom header content
 * @param {React.ReactNode} footerContent - Custom footer content
 * @param {string} className - Additional classes
 */
export function AuthLayout({ headerContent = null, footerContent = null, className = '' }) {
  return (
    <div className={`flex min-h-screen flex-col bg-slate-50 ${className}`}>
      {/* Optional Header */}
      {headerContent && (
        <div className="border-b border-slate-200 bg-white px-4 py-4">
          {headerContent}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Optional Footer */}
      {footerContent && (
        <div className="border-t border-slate-200 bg-white px-4 py-4">
          {footerContent}
        </div>
      )}
    </div>
  )
}

/**
 * Split auth layout with branding on left, form on right
 * For desktop displays
 */
export function SplitAuthLayout({
  leftContent = null,
  rightContent = null,
  className = ''
}) {
  return (
    <div className={`flex min-h-screen ${className}`}>
      {/* Left Side - Branding */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-blue-600 p-12 lg:flex">
        {leftContent || (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">
              AssetFlow
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Enterprise Asset Management
            </p>
          </div>
        )}
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-1 items-center justify-center bg-slate-50 px-4 py-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

/**
 * Minimal auth layout for simple auth pages
 */
export function MinimalAuthLayout({ className = '' }) {
  return (
    <div className={`flex min-h-screen items-center justify-center bg-slate-50 px-4 ${className}`}>
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
