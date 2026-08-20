import { useAuth } from '../../context/AuthContext'

const CONFETTI_PIECES = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  type: ['dot', 'ribbon', 'spark', 'key'][index % 4],
  x: ((index * 17) % 31) - 15,
  drift: 40 + (index % 7) * 18,
  delay: index * 0.06,
  spin: (index * 53) % 360,
}))

export default function SignupSuccessPage() {
  const { pendingSignupName, setAuthView } = useAuth()

  return (
    <div className="auth-form auth-form--success">
      <div className="auth-celebration" aria-hidden="true">
        {CONFETTI_PIECES.map((piece) => (
          <span
            key={piece.id}
            className={`auth-celebration__piece auth-celebration__piece--${piece.type}`}
            style={{
              '--x': piece.x,
              '--drift': `${piece.drift}px`,
              '--delay': `${piece.delay}s`,
              '--spin': `${piece.spin}deg`,
            }}
          />
        ))}
      </div>

      <div className="auth-success__icon" aria-hidden="true">
        ✓
      </div>
      <h1 className="auth-form__title">Welcome, {pendingSignupName || 'Guest'}!</h1>
      <p className="auth-form__subtitle">
        Your account has been created. Sign in to browse cities, properties, and agents.
      </p>

      <button
        type="button"
        className="auth-form__submit btn-premium btn-premium--gold"
        onClick={() => setAuthView('login')}
      >
        Continue to Sign In
      </button>
    </div>
  )
}
