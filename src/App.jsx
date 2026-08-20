import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import AuthShell from './components/auth/AuthShell'
import LandingPage from './components/LandingPage'
import LandingSkeleton from './components/LandingSkeleton'
import SplashScreen from './components/SplashScreen'
import { useScrollToTop } from './hooks/useScrollToTop'

function AppShell() {
  const { phase, authView, completeSplash } = useAuth()
  const [landingReady, setLandingReady] = useState(false)

  useScrollToTop([phase, authView])

  useEffect(() => {
    if (phase !== 'landing') {
      setLandingReady(false)
      return undefined
    }

    const timer = window.setTimeout(() => setLandingReady(true), 900)
    return () => window.clearTimeout(timer)
  }, [phase])

  if (phase === 'splash') {
    return <SplashScreen onComplete={completeSplash} />
  }

  if (phase === 'auth') {
    return <AuthShell />
  }

  return (
    <div className={`landing-app${landingReady ? ' landing-app--ready' : ''}`}>
      {!landingReady ? <LandingSkeleton /> : null}
      <div className={`landing-app__content${landingReady ? ' landing-app__content--visible' : ''}`}>
        <LandingPage />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}
