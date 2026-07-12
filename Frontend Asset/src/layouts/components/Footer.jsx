/**
 * Footer component
 * Application footer with links, copyright, and optional content
 * 
 * @param {React.ReactNode} leftContent - Left side content
 * @param {React.ReactNode} centerContent - Center content
 * @param {React.ReactNode} rightContent - Right side content
 * @param {boolean} showCopyright - Whether to show copyright
 * @param {string} className - Additional classes
 */
export function Footer({
  leftContent = null,
  centerContent = null,
  rightContent = null,
  showCopyright = true,
  className = ''
}) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 py-4 md:px-6 ${className}`}>
      <div className="mx-auto flex max-w-[var(--content-max-width)] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left Content */}
        <div className="flex items-center gap-4 text-sm text-[rgb(var(--color-text-secondary))]">
          {leftContent}
          {showCopyright && (
            <span>© {currentYear} AssetFlow. All rights reserved.</span>
          )}
        </div>

        {/* Center Content */}
        {centerContent && (
          <div className="flex items-center justify-center gap-4 text-sm">
            {centerContent}
          </div>
        )}

        {/* Right Content */}
        {rightContent && (
          <div className="flex items-center justify-end gap-4 text-sm">
            {rightContent}
          </div>
        )}
      </div>
    </footer>
  )
}

/**
 * Simple footer with minimal content
 */
export function SimpleFooter({ className = '' }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 py-4 text-center text-sm text-[rgb(var(--color-text-secondary))] ${className}`}>
      <p>© {currentYear} AssetFlow. All rights reserved.</p>
    </footer>
  )
}

/**
 * Footer with navigation links
 */
export function FooterWithLinks({ links = [], className = '' }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 py-6 md:px-6 ${className}`}>
      <div className="mx-auto max-w-[var(--content-max-width)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Links */}
          <nav className="flex flex-wrap gap-4 text-sm" aria-label="Footer navigation">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-[rgb(var(--color-text-secondary))] transition-colors hover:text-[rgb(var(--color-primary-500))]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-[rgb(var(--color-text-secondary))]">
            © {currentYear} AssetFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

/**
 * Sticky footer that stays at bottom of viewport
 */
export function StickyFooter({ children, className = '' }) {
  return (
    <footer className={`sticky bottom-0 border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-4 py-4 md:px-6 ${className}`}>
      <div className="mx-auto max-w-[var(--content-max-width)]">
        {children}
      </div>
    </footer>
  )
}

export default Footer
