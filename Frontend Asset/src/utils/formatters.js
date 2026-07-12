/**
 * Currency, date, and number formatting utilities for ERP displays.
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount ?? 0)
}

export function formatNumber(value, locale = 'en-US') {
  return new Intl.NumberFormat(locale).format(value ?? 0)
}

export function formatDate(date, options = { dateStyle: 'medium' }) {
  if (!date) return '—'
  const parsed = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat('en-US', options).format(parsed)
}

export function formatRelativeTime(date) {
  if (!date) return '—'
  const parsed = date instanceof Date ? date : new Date(date)
  const diffMs = parsed.getTime() - Date.now()
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (Math.abs(diffDays) < 1) {
    const diffHours = Math.round(diffMs / (1000 * 60 * 60))
    return rtf.format(diffHours, 'hour')
  }

  return rtf.format(diffDays, 'day')
}

export function truncate(text, maxLength = 50) {
  if (!text || text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}…`
}

export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
