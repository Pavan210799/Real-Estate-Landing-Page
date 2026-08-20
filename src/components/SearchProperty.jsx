import { useEffect, useState } from 'react'

const SEARCH_DETAILS = {
  location: 'Ahmedabad, India',
  price: '$1000 - $10,000',
  property: 'Apartment',
}

const TOAST_DURATION_MS = 4200

export default function SearchProperty() {
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    if (!toastVisible) return undefined

    const timer = window.setTimeout(() => setToastVisible(false), TOAST_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [toastVisible])

  const handleSearch = () => {
    setToastVisible(true)
  }

  return (
    <section className="search-property" id="search" data-plumb-id="search-property">
      <div className="search-property__card" data-plumb-id="rectangle-4099">
        <div className="search-property__fields" data-plumb-id="frame-1143">
          <button type="button" className="search-field" data-plumb-id="group-1077">
            <div className="search-field__icon-wrap">
              <img src="/images/location.svg" alt="" width={30} height={30} />
            </div>
            <div className="search-field__text">
              <span className="search-field__label t-bg-900-24" data-plumb-id="location">
                Location
              </span>
              <span className="search-field__value t-bg-300-18-133" data-plumb-id="ahmedabad-india">
                {SEARCH_DETAILS.location}
              </span>
            </div>
          </button>

          <div className="search-field__divider" aria-hidden="true" />

          <button type="button" className="search-field" data-plumb-id="group-1078">
            <div className="search-field__icon-wrap">
              <img src="/images/dollar-circle.svg" alt="" width={30} height={30} />
            </div>
            <div className="search-field__text">
              <span className="search-field__label t-bg-900-24" data-plumb-id="price">
                Price
              </span>
              <span className="search-field__value t-bg-300-18-133" data-plumb-id="1000-10-000">
                {SEARCH_DETAILS.price}
              </span>
            </div>
          </button>

          <div className="search-field__divider" aria-hidden="true" />

          <button type="button" className="search-field" data-plumb-id="group-1079">
            <div className="search-field__icon-wrap">
              <img src="/images/house.svg" alt="" width={30} height={30} />
            </div>
            <div className="search-field__text">
              <span className="search-field__label search-field__label--full t-bg-900-24" data-plumb-id="type-of-property">
                Type of Property
              </span>
              <span className="search-field__label search-field__label--tablet t-bg-900-24">
                Property
              </span>
              <span className="search-field__value t-bg-300-18-133" data-plumb-id="apartment">
                {SEARCH_DETAILS.property}
              </span>
            </div>
          </button>
        </div>

        <button
          type="button"
          className="search-property__btn t-bg-300-16-15"
          data-plumb-id="frame-1142"
          onClick={handleSearch}
        >
          <img src="/images/search-normal-2.svg" alt="" width={24} height={24} />
          <span data-plumb-id="search">Search</span>
        </button>
      </div>

      <div
        className={`search-toast ${toastVisible ? 'search-toast--visible' : ''}`}
        role="status"
        aria-live="polite"
        aria-hidden={!toastVisible}
      >
        <span className="search-toast__pulse" aria-hidden="true" />
        <div className="search-toast__content">
          <p className="search-toast__title">Searching for</p>
          <p className="search-toast__message">
            {SEARCH_DETAILS.property} in {SEARCH_DETAILS.location} · {SEARCH_DETAILS.price}
          </p>
        </div>
      </div>
    </section>
  )
}
