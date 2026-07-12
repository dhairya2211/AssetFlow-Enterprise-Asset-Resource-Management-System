import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Input } from '@/components'
import { LuLock, LuEye, LuEyeOff, LuArrowLeft, LuCheckCircle, LuCircleAlert } from 'react-icons/lu'

/**
 * Reset Password page with glassmorphism design
 * Modern, minimal, animated, responsive, accessible
 */
export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const checkPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/)) strength++
    if (password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^a-zA-Z0-9]/)) strength++
    return strength
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (passwordStrength < 3) {
      setError('Password is too weak')
      return
    }

    setLoading(true)

    try {
      // Simulate API call - replace with actual auth call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value
    setFormData({ ...formData, password })
    setPasswordStrength(checkPasswordStrength(password))
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="relative w-full max-w-md">
          <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <LuCircleAlert className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid reset link</h1>
            <p className="text-gray-600 text-sm mb-6">
              This password reset link is invalid or has expired.
            </p>
            <Button
              onClick={() => navigate('/forgot-password')}
              fullWidth
              size="lg"
              className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 shadow-lg"
            >
              Request new link
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Glassmorphism card */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
        
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {!success ? (
            <>
              {/* Back button */}
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
              >
                <LuArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to login</span>
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-lg mb-4 animate-in zoom-in duration-500">
                  <LuLock className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Set new password</h1>
                <p className="text-gray-600 text-sm">
                  Must be at least 8 characters with mixed case, numbers, and symbols
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
                  <LuCircleAlert className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New password
                  </label>
                  <div className="relative">
                    <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      required
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <LuEyeOff className="h-5 w-5" /> : <LuEye className="h-5 w-5" />}
                    </button>
                  </div>
                  {/* Password strength indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              passwordStrength >= level
                                ? level <= 2
                                  ? 'bg-red-500'
                                  : level <= 3
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        {passwordStrength < 3 && 'Weak password'}
                        {passwordStrength === 3 && 'Medium password'}
                        {passwordStrength >= 4 && 'Strong password'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm new password
                  </label>
                  <div className="relative">
                    <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <LuEyeOff className="h-5 w-5" /> : <LuEye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                      <LuCheckCircle className="h-4 w-4" />
                      Passwords match
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  fullWidth
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg"
                >
                  Reset password
                </Button>
              </form>

              {/* Sign in link */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Remember your password?{' '}
                <Link
                  to="/login"
                  className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            <>
              {/* Success state */}
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <LuCheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Password reset!</h1>
                <p className="text-gray-600 text-sm mb-6">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
                <Button
                  onClick={() => navigate('/login')}
                  fullWidth
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg"
                >
                  Continue to login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
