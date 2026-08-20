import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PasswordField from './PasswordField'

export default function LoginPage() {
  const { login, setAuthView } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    const result = login({ email, password })
    if (!result.ok) setMessage(result.message)
    setLoading(false)
  }

  return (
    <div className="auth-form">
      <h1 className="auth-form__title">Welcome Back</h1>
      <p className="auth-form__subtitle">Sign in to explore premium properties and agents.</p>

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

        <PasswordField
          label="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            setMessage('')
          }}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        {message ? (
          <p className="auth-form__msg auth-form__msg--error" role="alert">
            {message}
          </p>
        ) : null}

        <button type="submit" className="auth-form__submit btn-premium btn-premium--gold" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <div className="auth-form__links">
        <button type="button" className="auth-link" onClick={() => setAuthView('forgot')}>
          Forgot password?
        </button>
        <p>
          New here?{' '}
          <button type="button" className="auth-link" onClick={() => setAuthView('signup')}>
            Create account
          </button>
        </p>
      </div>
    </div>
  )
}
