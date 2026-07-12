import { Outlet } from 'react-router-dom'

/**
 * Auth layout — centered shell for login, register, and password flows.
 * No sidebar; minimal chrome to keep focus on authentication.
 */
export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
