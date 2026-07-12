/**
 * Form validation helpers used across ERP forms.
 */
export function isRequired(value) {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '')
}

export function minLength(value, min) {
  return (value ?? '').length >= min
}

export function maxLength(value, max) {
  return (value ?? '').length <= max
}

export function isPositiveNumber(value) {
  const num = Number(value)
  return !Number.isNaN(num) && num > 0
}

export function isValidAssetTag(tag) {
  return /^[A-Z0-9-]{3,20}$/i.test(tag ?? '')
}

export function getFieldError(value, rules = []) {
  for (const rule of rules) {
    const error = rule(value)
    if (error) return error
  }
  return null
}
