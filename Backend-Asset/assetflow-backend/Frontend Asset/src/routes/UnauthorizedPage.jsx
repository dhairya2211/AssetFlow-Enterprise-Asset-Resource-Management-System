import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants'

/**
 * 401 Unauthorized Page
 * Displayed when a user lacks permission to access a route
 */
export function UnauthorizedPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromPath = location.state?.from?.pathname || ROUTES.DASHBOARD

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--color-background))] px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[rgb(var(--color-error-50))]">
            <svg
              className="h-10 w-10 text-[rgb(var(--color-error-500))]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--color-text-primary))]">
            Access Denied
          </h1>
          <p className="mt-2 text-[rgb(var(--color-text-secondary))]">
            You don't have permission to access this page.
          </p>
          <p className="mt-1 text-sm text-[rgb(var(--color-text-muted))]">
            Please contact your administrator if you believe this is an error.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 py-2 text-sm font-medium text-[rgb(var(--color-text-primary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))]"
          >
           Go Back
          </button>
          <Link
            to={fromPath}
            className="inline-flex items-center justify-center rounded-lg bg-[rgb(var(--color-primary-500))] px-4 py-2 text-sm font-medium text-[rgb(var(--color-primary-foreground))] transition-colors hover:bg-[rgb(var(--color-primary-600))]"
          >
            Return to Previous Page
          </Link>
        </div>

        <div className="mt-8 text-sm text-[rgb(var(--color-text-muted))]">
          <Link to={ROUTES.DASHBOARD} className="hover:text-[rgb(var(--color-primary-500))]">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage
