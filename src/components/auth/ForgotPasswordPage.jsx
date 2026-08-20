import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function ForgotPasswordPage() {
  const { forgotPassword, setAuthView } = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    const result = forgotPassword({ email })
    if (result.ok) {
      setMessageType('success')
      setMessage('Reset token generated. Continue to set a new password.')
    } else {
      setMessageType('error')
      setMessage(result.message)
    }
    setLoading(false)
  }

  return (
    <div className="auth-form">
      <h1 className="auth-form__title">Forgot Password</h1>
      <p className="auth-form__subtitle">Enter your email and we&apos;ll help you reset your password.</p>

      <form className="auth-form__fields" onSubmit={handleSubmit}>
        <label className="auth-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setMessage('')
            }}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </label>

        {message ? (
          <p className={`auth-form__msg auth-form__msg--${messageType}`} role="status">
            {message}
          </p>
        ) : null}

        <button type="submit" className="auth-form__submit btn-premium btn-premium--gold" disabled={loading}>
          {loading ? 'Sending…' : 'Send Reset Link'}
        </button>
      </form>

      <div className="auth-form__links">
        <button type="button" className="auth-link" onClick={() => setAuthView('login')}>
          Back to sign in
        </button>
      </div>
    </div>
  )
}
