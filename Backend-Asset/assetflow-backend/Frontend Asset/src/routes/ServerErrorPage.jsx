import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants'

/**
 * 500 Server Error Page
 * Displayed when a server error occurs
 */
export function ServerErrorPage() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleRefresh = () => {
    window.location.reload()
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--color-text-primary))]">
            Server Error
          </h1>
          <p className="mt-2 text-[rgb(var(--color-text-secondary))]">
            Something went wrong on our end. Please try again later.
          </p>
          <p className="mt-1 text-sm text-[rgb(var(--color-text-muted))]">
            Error code: 500
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center justify-center rounded-lg bg-[rgb(var(--color-primary-500))] px-4 py-2 text-sm font-medium text-[rgb(var(--color-primary-foreground))] transition-colors hover:bg-[rgb(var(--color-primary-600))]"
          >
            Refresh Page
          </button>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 py-2 text-sm font-medium text-[rgb(var(--color-text-primary))] transition-colors hover:bg-[rgb(var(--color-surface-hover))]"
          >
            Go Back
          </button>
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

export default ServerErrorPage
