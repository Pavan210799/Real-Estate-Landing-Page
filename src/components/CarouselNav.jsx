const FIGMA_ARROW_PATHS = {
  prev: 'M38.0898 42.9201L31.5698 36.4001C30.7998 35.6301 30.7998 34.3701 31.5698 33.6001L38.0898 27.0801',
  next: 'M31.91 42.9201L38.43 36.4001C39.2 35.6301 39.2 34.3701 38.43 33.6001L31.91 27.0801',
}

function CarouselArrowButton({ direction, onClick, label }) {
  return (
    <button type="button" className="carousel-nav__btn" aria-label={label} onClick={onClick}>
      <svg className="carousel-nav__icon" viewBox="0 0 70 70" fill="none" aria-hidden="true">
        <circle className="carousel-nav__circle" cx="35" cy="35" r="35" />
        <path
          className="carousel-nav__arrow"
          d={FIGMA_ARROW_PATHS[direction]}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default function CarouselNav({ className = '', onPrev, onNext }) {
  return (
    <div className={`carousel-nav ${className}`} data-plumb-id="group-1089">
      <CarouselArrowButton direction="prev" onClick={onPrev} label="Previous" />
      <CarouselArrowButton direction="next" onClick={onNext} label="Next" />
    </div>
  )
}
