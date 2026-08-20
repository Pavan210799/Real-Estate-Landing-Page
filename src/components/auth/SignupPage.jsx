import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PasswordField from './PasswordField'

export default function SignupPage() {
  const { signup, setAuthView } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    setLoading(true)
    const result = signup({ name, email, password })
    if (!result.ok) setMessage(result.message)
    setLoading(false)
  }

  return (
    <div className="auth-form">
      <h1 className="auth-form__title">Create Account</h1>
      <p className="auth-form__subtitle">Join Meneto and discover your next home.</p>

      <form className="auth-form__fields" onSubmit={handleSubmit}>
        <label className="auth-field">
          <span>Full name</span>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              setMessage('')
            }}
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </label>

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
          placeholder="Repeat your password"
          autoComplete="new-password"
          required
          minLength={6}
        />

        {message ? (
          <p className="auth-form__msg auth-form__msg--error" role="alert">
            {message}
          </p>
        ) : null}

        <button type="submit" className="auth-form__submit btn-premium btn-premium--gold" disabled={loading}>
          {loading ? 'Creating…' : 'Sign Up'}
        </button>
      </form>

      <div className="auth-form__links">
        <p>
          Already have an account?{' '}
          <button type="button" className="auth-link" onClick={() => setAuthView('login')}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
