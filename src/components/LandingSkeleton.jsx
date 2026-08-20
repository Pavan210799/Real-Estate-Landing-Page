export default function LandingSkeleton() {
  return (
    <div className="landing-skeleton" aria-hidden="true">
      <div className="landing-skeleton__header" />
      <div className="landing-skeleton__hero">
        <div className="landing-skeleton__hero-panel" />
        <div className="landing-skeleton__hero-media" />
      </div>
      <div className="landing-skeleton__search" />
      <div className="landing-skeleton__section">
        <div className="landing-skeleton__line landing-skeleton__line--md" />
        <div className="landing-skeleton__grid landing-skeleton__grid--3">
          <div className="landing-skeleton__card" />
          <div className="landing-skeleton__card" />
          <div className="landing-skeleton__card" />
        </div>
      </div>
    </div>
  )
}
