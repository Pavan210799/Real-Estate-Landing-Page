import { useEffect, useState } from 'react'

export default function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFadeOut(true), 1200)
    const doneTimer = window.setTimeout(() => onComplete(), 1800)
    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <div className={`splash${fadeOut ? ' splash--out' : ''}`}>
      <div className="splash__bg" aria-hidden="true">
        <div className="splash__split">
          <div className="splash__panel">
            <div className="splash__panel-glow" />
          </div>
          <div className="splash__scene">
            <div className="splash__photo" />
            <div className="splash__wash" />
            <div className="splash__gold-accent" />
          </div>
        </div>
      </div>

      <div className="splash__content">
        <img src="/images/group-1077.svg" alt="" className="splash__logo-mark" aria-hidden="true" />
        <h1 className="splash__title">Meneto</h1>
        <p className="splash__tagline">Signature Real Estate</p>
        <div className="splash__progress" aria-hidden="true">
          <span className="splash__progress-fill" />
        </div>
      </div>
    </div>
  )
}
