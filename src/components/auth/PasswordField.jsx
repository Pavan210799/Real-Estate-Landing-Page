import { useState } from 'react'

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 3l18 18M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-1.18M9.88 5.09A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a18.35 18.35 0 0 1-4.28 5.12M6.12 6.12A18.3 18.3 0 0 0 2 12s3.5 7 10 7a10.9 10.9 0 0 0 5.09-1.24"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = false,
  minLength,
  id,
}) {
  const [visible, setVisible] = useState(false)
  const inputId = id || `password-${label.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <label className="auth-field" htmlFor={inputId}>
      <span>{label}</span>
      <div className="auth-field__password">
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="auth-field__toggle"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          <EyeIcon open={!visible} />
        </button>
      </div>
    </label>
  )
}
