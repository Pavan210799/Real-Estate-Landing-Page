import { useAuth } from '../../context/AuthContext'
import ForgotPasswordPage from './ForgotPasswordPage'
import LoginPage from './LoginPage'
import ResetPasswordPage from './ResetPasswordPage'
import SignupPage from './SignupPage'
import SignupSuccessPage from './SignupSuccessPage'

function AuthShellBrand() {
  return (
    <div className="auth-shell__brand">
      <img src="/images/group-1077.svg" alt="Meneto" className="auth-shell__logo-mark" />
    </div>
  )
}

export default function AuthShell() {
  const { authView } = useAuth()
  const cardVariant =
    authView === 'signup' ||
    authView === 'success' ||
    authView === 'login' ||
    authView === 'forgot'
      ? 'signup'
      : 'login'

  return (
    <div className="auth-app">
      <div className="auth-bg" aria-hidden="true">
        <div className="auth-bg__split">
          <div className="auth-bg__panel">
            <div className="auth-bg__panel-glow" />
            <div className="auth-bg__panel-line auth-bg__panel-line--1" />
            <div className="auth-bg__panel-line auth-bg__panel-line--2" />
          </div>
          <div className="auth-bg__scene">
            <div className="auth-bg__photo" />
            <div className="auth-bg__wash" />
            <div className="auth-bg__grid">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="auth-bg__gold-accent" />
          </div>
        </div>
      </div>

      <div className="auth-shell">
        <div className="auth-shell__panel">
          <AuthShellBrand />
          <div
            key={authView}
            className={`auth-shell__content auth-shell__content--enter auth-shell__content--${cardVariant}`}
          >
            {authView === 'login' ? <LoginPage /> : null}
            {authView === 'signup' ? <SignupPage /> : null}
            {authView === 'forgot' ? <ForgotPasswordPage /> : null}
            {authView === 'reset' ? <ResetPasswordPage /> : null}
            {authView === 'success' ? <SignupSuccessPage /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
