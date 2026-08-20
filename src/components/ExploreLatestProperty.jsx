import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TextImage from './TextImage'
import CarouselNav from './CarouselNav'
import { normalizeIndex, useCarouselLayout } from '../hooks/useCarouselLayout'
import { sectionHeadings } from '../textImages'

const TOAST_DURATION_MS = 4200

function PropertyCard({ property, isFavorite, onShare, onFavorite, onAdd }) {
  const [clickedAction, setClickedAction] = useState(null)
  const clickEffectTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (clickEffectTimeoutRef.current) {
        window.clearTimeout(clickEffectTimeoutRef.current)
      }
    }
  }, [])

  const triggerActionEffect = (action, callback) => (event) => {
    event.stopPropagation()
    setClickedAction(action)
    if (clickEffectTimeoutRef.current) {
      window.clearTimeout(clickEffectTimeoutRef.current)
    }
    clickEffectTimeoutRef.current = window.setTimeout(() => {
      setClickedAction(null)
      clickEffectTimeoutRef.current = null
    }, 450)
    callback()
  }

  const handleShare = triggerActionEffect('share', () => onShare(property))
  const handleFavorite = triggerActionEffect('wishlist', () => onFavorite(property))
  const handleAdd = triggerActionEffect('add', () => onAdd(property))

  return (
    <article className="property-card" data-plumb-id={property.id}>
      <div className="property-card__media">
        <img src={property.image} alt={property.title} className="property-card__image" />
      </div>
      <div className="property-card__body">
        <div className="property-card__heading">
          <h3 className="property-card__title t-bg-900-24">{property.title}</h3>
          <p className="property-card__price t-bg-300-18-133">{property.price}</p>
        </div>
        <p
          className="property-card__description"
          data-plumb-id="it-is-a-long-established-fact-that-a-rea"
        >
          {property.description}
        </p>
        <div className="property-card__stats">
          <span className="property-card__stat t-bg-300-14-171">
            <img src="/images/frame.svg" alt="" width={24} height={24} />
            {property.beds}
          </span>
          <span className="property-card__stat t-bg-300-14-171">
            <img src="/images/frame-2.svg" alt="" width={24} height={24} />
            {property.baths}
          </span>
          <span className="property-card__stat t-bg-300-14-171">
            <img src="/images/frame-3.svg" alt="" width={24} height={24} />
            {property.area}
          </span>
        </div>
        <div className="property-card__divider" />
        <div className="property-card__agent">
          <img src={property.avatar} alt={property.agent} className="property-card__avatar" />
          <span className="property-card__agent-name t-bg-900-18-133">{property.agent}</span>
          <div className="property-card__actions">
            <button
              type="button"
              className={`property-card__action property-card__action--share ${clickedAction === 'share' ? 'property-card__action--clicked' : ''}`}
              aria-label={`Share ${property.title}`}
              onClick={handleShare}
            >
              <img src="/images/frame-4.svg" alt="" width={20} height={20} />
            </button>
            <button
              type="button"
              className={`property-card__action property-card__action--wishlist ${isFavorite ? 'property-card__action--active' : ''} ${clickedAction === 'wishlist' ? 'property-card__action--clicked' : ''}`}
              aria-label={isFavorite ? `Remove ${property.title} from favorites` : `Save ${property.title} to favorites`}
              aria-pressed={isFavorite}
              onClick={handleFavorite}
            >
              <svg className="property-card__heart-icon" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                {isFavorite ? (
                  <path
                    d="M10.0003 18.0413C9.74199 18.0413 9.49199 18.008 9.28366 17.933C6.10033 16.8413 1.04199 12.9663 1.04199 7.24134C1.04199 4.32467 3.40033 1.95801 6.30033 1.95801C7.70866 1.95801 9.02533 2.50801 10.0003 3.49134C10.9753 2.50801 12.292 1.95801 13.7003 1.95801C16.6003 1.95801 18.9587 4.33301 18.9587 7.24134C18.9587 12.9747 13.9003 16.8413 10.717 17.933C10.5087 18.008 10.2587 18.0413 10.0003 18.0413Z"
                    fill="var(--re-gold)"
                  />
                ) : (
                  <path
                    d="M10.0003 18.0413C9.74199 18.0413 9.49199 18.008 9.28366 17.933C6.10033 16.8413 1.04199 12.9663 1.04199 7.24134C1.04199 4.32467 3.40033 1.95801 6.30033 1.95801C7.70866 1.95801 9.02533 2.50801 10.0003 3.49134C10.9753 2.50801 12.292 1.95801 13.7003 1.95801C16.6003 1.95801 18.9587 4.33301 18.9587 7.24134C18.9587 12.9747 13.9003 16.8413 10.717 17.933C10.5087 18.008 10.2587 18.0413 10.0003 18.0413ZM6.30033 3.20801C4.09199 3.20801 2.29199 5.01634 2.29199 7.24134C2.29199 12.933 7.76699 16.0997 9.69199 16.758C9.84199 16.808 10.167 16.808 10.317 16.758C12.2337 16.0997 17.717 12.9413 17.717 7.24134C17.717 5.01634 15.917 3.20801 13.7087 3.20801C12.442 3.20801 11.267 3.79967 10.5087 4.82467C10.2753 5.14134 9.74199 5.14134 9.50866 4.82467C8.73366 3.79134 7.56699 3.20801 6.30033 3.20801Z"
                    fill="#0D1117"
                  />
                )}
              </svg>
            </button>
            <button
              type="button"
              className={`property-card__action property-card__action--add ${clickedAction === 'add' ? 'property-card__action--clicked' : ''}`}
              aria-label={`Add ${property.title} to list`}
              onClick={handleAdd}
            >
              <img src="/images/add.svg" alt="" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ExploreLatestProperty({ properties }) {
  const sectionRef = useRef(null)
  const animatingRef = useRef(false)
  const [strokeVisible, setStrokeVisible] = useState(false)
  const [offset, setOffset] = useState(0)
  const [animPhase, setAnimPhase] = useState('idle')
  const [direction, setDirection] = useState('next')
  const [favorites, setFavorites] = useState(() => new Set())
  const [toast, setToast] = useState({ visible: false, title: '', message: '' })
  const layout = useCarouselLayout()

  const { accent, title } = sectionHeadings.latestProperty

  const showToast = useCallback((titleText, message) => {
    setToast({ visible: true, title: titleText, message })
  }, [])

  useEffect(() => {
    if (!toast.visible) return undefined

    const timer = window.setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }))
    }, TOAST_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [toast.visible, toast.title, toast.message])

  useEffect(() => {
    setOffset(0)
    setAnimPhase('idle')
    animatingRef.current = false
  }, [layout.mode])

  useEffect(() => {
    const updateSectionState = () => {
      const section = sectionRef.current
      const agentsSection = document.getElementById('agents')
      if (!section || !agentsSection) return

      const sectionRect = section.getBoundingClientRect()
      const agentsRect = agentsSection.getBoundingClientRect()
      const revealLine = window.innerHeight * 0.58
      const hideLine = window.innerHeight * 0.72

      const sectionInView =
        sectionRect.top < revealLine && sectionRect.bottom > window.innerHeight * 0.22
      const nextSectionReached = agentsRect.top < hideLine

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

  const visibleProperties = useMemo(
    () =>
      Array.from({ length: layout.visible }, (_, index) =>
        properties[normalizeIndex(offset + index, properties.length)],
      ),
    [properties, layout.visible, offset],
  )

  const handleNavigate = useCallback(
    (dir) => {
      if (animatingRef.current || properties.length === 0) return

      animatingRef.current = true
      setDirection(dir)
      setAnimPhase('exit')

      window.setTimeout(() => {
        setOffset((prev) =>
          normalizeIndex(prev + (dir === 'next' ? layout.step : -layout.step), properties.length),
        )
        setAnimPhase('enter')

        window.setTimeout(() => {
          setAnimPhase('idle')
          animatingRef.current = false
        }, 480)
      }, 420)
    },
    [layout.step, properties.length],
  )

  const handleShare = useCallback(
    async (property) => {
      const shareText = `${property.title} · ${property.price}`
      const shareUrl = `${window.location.origin}${window.location.pathname}#property`

      if (navigator.share) {
        try {
          await navigator.share({
            title: property.title,
            text: shareText,
            url: shareUrl,
          })
          showToast('Shared successfully', `${property.title} link shared`)
          return
        } catch (error) {
          if (error?.name === 'AbortError') return
        }
      }

      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        showToast('Link copied', `Share link copied for ${property.title}`)
      } catch {
        showToast('Share property', `${property.title} · ${property.price}`)
      }
    },
    [showToast],
  )

  const handleFavorite = useCallback(
    (property) => {
      setFavorites((current) => {
        const next = new Set(current)
        if (next.has(property.id)) {
          next.delete(property.id)
          showToast('Removed from favorites', property.title)
        } else {
          next.add(property.id)
          showToast('Added to favorites', property.title)
        }
        return next
      })
    },
    [showToast],
  )

  const handleAdd = useCallback(
    (property) => {
      showToast('Added to your list', `${property.title} saved for later`)
    },
    [showToast],
  )

  const gridClassName = [
    'explore-property__grid',
    `explore-property__grid--${layout.mode}`,
    animPhase !== 'idle' ? `explore-property__grid--${animPhase}-${direction}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      ref={sectionRef}
      className={`explore-property ${strokeVisible ? 'explore-property--stroke-visible' : ''}`}
      id="property"
      data-plumb-id="explore-latest-property"
    >
      <div className="explore-property__header">
        <div className="section-heading section-heading--wide explore-property__heading">
          <div className="explore-property__accent-wrap">
            <TextImage asset={accent} className="section-heading__accent" plumbId="explore" />
          </div>
          <span className="section-heading__title-wrap">
            <TextImage
              asset={title}
              className="section-heading__title"
              plumbId="latest-property"
            />
          </span>
        </div>
        <CarouselNav onPrev={() => handleNavigate('prev')} onNext={() => handleNavigate('next')} />
      </div>

      <div className="explore-property__viewport">
        <div className={gridClassName}>
          {visibleProperties.map((property, index) => (
            <PropertyCard
              key={`${property.id}-${offset}-${index}`}
              property={property}
              isFavorite={favorites.has(property.id)}
              onShare={handleShare}
              onFavorite={handleFavorite}
              onAdd={handleAdd}
            />
          ))}
        </div>
      </div>

      <div
        className={`search-toast ${toast.visible ? 'search-toast--visible' : ''}`}
        role="status"
        aria-live="polite"
        aria-hidden={!toast.visible}
      >
        <span className="search-toast__pulse" aria-hidden="true" />
        <div className="search-toast__content">
          <p className="search-toast__title">{toast.title}</p>
          <p className="search-toast__message">{toast.message}</p>
        </div>
      </div>
    </section>
  )
}
