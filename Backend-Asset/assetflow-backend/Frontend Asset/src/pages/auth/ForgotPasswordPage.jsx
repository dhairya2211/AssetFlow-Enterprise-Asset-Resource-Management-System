import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '@/components'
import { LuMail, LuArrowLeft, LuCheckCircle, LuCircleAlert } from 'react-icons/lu'

/**
 * Forgot Password page with glassmorphism design
 * Modern, minimal, animated, responsive, accessible
 */
export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simulate API call - replace with actual auth call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Glassmorphism card */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
        
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Back button */}
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
          >
            <LuArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to login</span>
          </button>

          {!success ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-2xl shadow-lg mb-4 animate-in zoom-in duration-500">
                  <LuMail className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot password?</h1>
                <p className="text-gray-600 text-sm">
                  No worries, we'll send you reset instructions.
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="relative">
                    <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  fullWidth
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-cyan-600 hover:from-indigo-600 hover:to-cyan-700 shadow-lg"
                >
                  Send reset link
                </Button>
              </form>

              {/* Sign in link */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Remember your password?{' '}
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
                <p className="text-gray-600 text-sm mb-6">
                  We sent a password reset link to{' '}
                  <span className="font-medium text-gray-900">{email}</span>
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    Didn't receive the email? Check your spam folder or request another link.
                  </p>
                </div>
                <Button
                  onClick={() => setSuccess(false)}
                  variant="outline"
                  fullWidth
                  size="lg"
                >
                  Try another email
                </Button>
                <p className="text-center text-sm text-gray-600 mt-6">
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    Back to login
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
