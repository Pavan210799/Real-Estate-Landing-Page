import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TextImage from './TextImage'
import CarouselNav from './CarouselNav'
import { normalizeIndex, useCarouselLayout } from '../hooks/useCarouselLayout'
import { sectionHeadings } from '../textImages'

function CityCard({ city }) {
  return (
    <article className="city-card">
      <div className="city-card__media">
        <img src={city.image} alt={city.name} className="city-card__image" />
      </div>
      <div className="city-card__footer">
        <h3 className="city-card__name t-bg-900-24">{city.name}</h3>
        <p className="city-card__country t-bg-300-18-133">{city.country}</p>
      </div>
    </article>
  )
}

export default function ExploreCities({ cities }) {
  const sectionRef = useRef(null)
  const animatingRef = useRef(false)
  const [strokeVisible, setStrokeVisible] = useState(false)
  const [offset, setOffset] = useState(0)
  const [animPhase, setAnimPhase] = useState('idle')
  const [direction, setDirection] = useState('next')
  const layout = useCarouselLayout()

  const { accent, title } = sectionHeadings.cities

  useEffect(() => {
    setOffset(0)
    setAnimPhase('idle')
    animatingRef.current = false
  }, [layout.mode])

  useEffect(() => {
    const updateSectionState = () => {
      const section = sectionRef.current
      const propertySection = document.getElementById('property')
      if (!section || !propertySection) return

      const sectionRect = section.getBoundingClientRect()
      const propertyRect = propertySection.getBoundingClientRect()
      const revealLine = window.innerHeight * 0.58
      const hideLine = window.innerHeight * 0.72

      const sectionInView =
        sectionRect.top < revealLine && sectionRect.bottom > window.innerHeight * 0.22
      const nextSectionReached = propertyRect.top < hideLine

      setStrokeVisible(sectionInView && !nextSectionReached)
    }

    updateSectionState()
    window.addEventListener('scroll', updateSectionState, { passive: true })
    window.addEventListener('resize', updateSectionState)
    return () => {
      window.removeEventListener('scroll', updateSectionState)
      window.removeEventListener('resize', updateSectionState)
    }
  }, [])

  const visibleCities = useMemo(
    () =>
      Array.from({ length: layout.visible }, (_, index) =>
        cities[normalizeIndex(offset + index, cities.length)],
      ),
    [cities, layout.visible, offset],
  )

  const handleNavigate = useCallback(
    (dir) => {
      if (animatingRef.current || cities.length === 0) return

      animatingRef.current = true
      setDirection(dir)
      setAnimPhase('exit')

      window.setTimeout(() => {
        setOffset((prev) =>
          normalizeIndex(prev + (dir === 'next' ? layout.step : -layout.step), cities.length),
        )
        setAnimPhase('enter')

        window.setTimeout(() => {
          setAnimPhase('idle')
          animatingRef.current = false
        }, 480)
      }, 420)
    },
    [cities.length, layout.step],
  )

  const gridClassName = [
    'explore-cities__grid',
    `explore-cities__grid--${layout.mode}`,
    animPhase !== 'idle' ? `explore-cities__grid--${animPhase}-${direction}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      ref={sectionRef}
      className={`explore-cities ${strokeVisible ? 'explore-cities--stroke-visible' : ''}`}
      id="cities"
      data-plumb-id="explore-cities"
    >
      <div className="explore-cities__header">
        <div className="section-heading explore-cities__heading">
          <div className="explore-cities__accent-wrap">
            <TextImage asset={accent} className="section-heading__accent" plumbId="explore" />
          </div>
          <span className="section-heading__title-wrap">
            <TextImage asset={title} className="section-heading__title" plumbId="cities" />
          </span>
        </div>
        <CarouselNav onPrev={() => handleNavigate('prev')} onNext={() => handleNavigate('next')} />
      </div>

      <div className="explore-cities__viewport">
        <div className={gridClassName}>
          {visibleCities.map((city, index) => (
            <CityCard key={`${city.name}-${offset}-${index}`} city={city} />
          ))}
        </div>
      </div>
    </section>
  )
}
