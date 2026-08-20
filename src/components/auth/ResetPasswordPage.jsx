import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PasswordField from './PasswordField'

export default function ResetPasswordPage() {
  const { completeReset, resetContext, setAuthView } = useAuth()
  const [token, setToken] = useState(resetContext?.token || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)

  const email = resetContext?.email || ''

  function handleSubmit(event) {
    event.preventDefault()

    if (password !== confirmPassword) {
      setMessageType('error')
      setMessage('Passwords do not match.')
      return
    }

    setLoading(true)
    const result = completeReset({ email, token, password })
    if (result.ok) {
      setMessageType('success')
      setMessage('Password reset! You can now sign in.')
    } else {
      setMessageType('error')
      setMessage(result.message)
    }
    setLoading(false)
  }

  if (!email) {
    return (
      <div className="auth-form">
        <h1 className="auth-form__title">Reset Password</h1>
        <p className="auth-form__subtitle">Request a reset token from the forgot password page first.</p>
        <button
          type="button"
          className="auth-form__submit btn-premium btn-premium--navy"
          onClick={() => setAuthView('forgot')}
        >
          Go to Forgot Password
        </button>
      </div>
    )
  }

  return (
    <div className="auth-form">
      <h1 className="auth-form__title">Reset Password</h1>
      <p className="auth-form__subtitle">
        Set a new password for <strong>{email}</strong>
      </p>

      <form className="auth-form__fields" onSubmit={handleSubmit}>
        <label className="auth-field">
          <span>Reset token</span>
          <input
            type="text"
            value={token}
            onChange={(event) => {
              setToken(event.target.value)
              setMessage('')
            }}
            placeholder="Enter reset token"
            required
          />
        </label>

        <PasswordField
          label="New password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            setMessage('')
          }}
          placeholder="At least 6 characters"
          autoComplete="new-password"
          required
          minLength={6}
        />

        <PasswordField
          label="Confirm password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value)
            setMessage('')
          }}
          placeholder="Repeat new password"
          autoComplete="new-password"
          required
          minLength={6}
        />

        {message ? (
          <p className={`auth-form__msg auth-form__msg--${messageType}`} role="status">
            {message}
          </p>
        ) : null}

        <button type="submit" className="auth-form__submit btn-premium btn-premium--navy" disabled={loading}>
          {loading ? 'Updating…' : 'Update Password'}
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
