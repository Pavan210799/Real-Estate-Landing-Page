import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  clearSession,
  getPendingReset,
  getSession,
  getStoredAuthView,
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  setStoredAuthView,
} from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [phase, setPhase] = useState(() => (getSession() ? 'landing' : 'splash'))
  const [authView, setAuthViewState] = useState(getStoredAuthView)
  const [user, setUser] = useState(() => getSession())
  const [resetContext, setResetContext] = useState(() => {
    const view = getStoredAuthView()
    return view === 'reset' ? getPendingReset() : null
  })
  const [pendingSignupName, setPendingSignupName] = useState('')

  const setAuthView = useCallback((view) => {
    setAuthViewState(view)
    setStoredAuthView(view)
  }, [])

  const completeSplash = useCallback(() => {
    setPhase(getSession() ? 'landing' : 'auth')
  }, [])

  const goToAuth = useCallback(
    (view = 'login') => {
      setAuthView(view)
      setPhase('auth')
    },
    [setAuthView],
  )

  const login = useCallback(({ email, password }) => {
    const result = loginUser({ email, password })
    if (result.ok) {
      setUser(result.user)
      setPhase('landing')
    }
    return result
  }, [])

  const signup = useCallback(
    ({ name, email, password }) => {
      const result = registerUser({ name, email, password })
      if (result.ok) {
        setPendingSignupName(name.trim())
        setAuthView('success')
      }
      return result
    },
    [setAuthView],
  )

  const forgotPassword = useCallback(
    ({ email }) => {
      const result = requestPasswordReset(email)
      if (result.ok) {
        setResetContext({ email: result.email, token: result.token })
        setAuthView('reset')
      }
      return result
    },
    [setAuthView],
  )

  const completeReset = useCallback(
    ({ email, token, password }) => {
      const result = resetPassword({ email, token, password })
      if (result.ok) {
        setResetContext(null)
        setAuthView('login')
      }
      return result
    },
    [setAuthView],
  )

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
    setAuthView('login')
    setPhase('auth')
    window.scrollTo(0, 0)
  }, [setAuthView])

  const value = useMemo(
    () => ({
      phase,
      authView,
      user,
      resetContext,
      pendingSignupName,
      setAuthView,
      completeSplash,
      goToAuth,
      login,
      signup,
      forgotPassword,
      completeReset,
      logout,
    }),
    [
      phase,
      authView,
      user,
      resetContext,
      pendingSignupName,
      setAuthView,
      completeSplash,
      goToAuth,
      login,
      signup,
      forgotPassword,
      completeReset,
      logout,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
