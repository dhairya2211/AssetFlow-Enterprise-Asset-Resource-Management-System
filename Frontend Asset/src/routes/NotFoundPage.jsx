import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants'

/**
 * 404 Not Found Page
 * Displayed when a user navigates to a non-existent route
 */
export function NotFoundPage() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--color-background))] px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[rgb(var(--color-primary-500))]">404</h1>
          <p className="mt-4 text-2xl font-semibold text-[rgb(var(--color-text-primary))]">
            Page Not Found
          </p>
          <p className="mt-2 text-[rgb(var(--color-text-secondary))]">
            The page you're looking for doesn't exist or has been moved.
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
            to={ROUTES.DASHBOARD}
            className="inline-flex items-center justify-center rounded-lg bg-[rgb(var(--color-primary-500))] px-4 py-2 text-sm font-medium text-[rgb(var(--color-primary-foreground))] transition-colors hover:bg-[rgb(var(--color-primary-600))]"
          >
            Go to Dashboard
          </Link>
        </div>

        <div className="mt-8 text-sm text-[rgb(var(--color-text-muted))]">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
