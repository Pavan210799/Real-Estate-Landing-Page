import { useState } from 'react'
import TextImage from './TextImage'
import { textImages } from '../textImages'

const TOTAL_SLIDES = 5
const HERO_IMAGE = {
  src: '/images/vesper-19-2500.png',
  alt: 'Luxury home exterior',
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeLayer, setActiveLayer] = useState(0)
  const [clickedBtn, setClickedBtn] = useState(null)

  const triggerClickAnim = (btn) => {
    setClickedBtn(btn)
    window.setTimeout(() => setClickedBtn(null), 420)
  }

  const changeSlide = (dir) => {
    triggerClickAnim(dir === 'prev' ? 'up' : 'down')
    setActiveLayer((layer) => 1 - layer)
    setCurrentSlide((prev) => {
      if (dir === 'prev') return prev === 0 ? TOTAL_SLIDES - 1 : prev - 1
      return prev === TOTAL_SLIDES - 1 ? 0 : prev + 1
    })
  }

  const fillPercent = ((currentSlide + 1) / TOTAL_SLIDES) * 100

  return (
    <section className="hero" id="hero" data-plumb-id="hero-section">
      <div className="hero__panel" data-plumb-id="rectangle-4091" />
      <div className="hero__image-wrap" data-plumb-id="mask-group">
        {[0, 1].map((layer) => (
          <img
            key={layer}
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            className={`hero__image ${layer === activeLayer ? 'hero__image--active' : ''}`}
            data-plumb-id={layer === 0 ? 'vesper-19-2500' : undefined}
            data-plumb-asset={layer === 0 ? '12c98d89d95a455cc1ad649f7c97aad0fea7c440' : undefined}
            draggable={false}
          />
        ))}
      </div>

      <div className="hero__content">
        <div className="hero__eyebrow-wrap">
          <TextImage asset={textImages.signatureHomes} className="hero__eyebrow" plumbId="signature-homes" />
        </div>
        <TextImage asset={textImages.heroTitle} className="hero__title" plumbId="all-homes-are-for-a-lifetime-this-one-is" />
      </div>

      <div className="hero__slider" data-plumb-id="group-1069">
        <button
          type="button"
          className={`hero__slider-btn hero__slider-btn--up ${clickedBtn === 'up' ? 'hero__slider-btn--clicked' : ''}`}
          aria-label="Previous slide"
          onClick={() => changeSlide('prev')}
        >
          <img src="/images/arrow-up.svg" alt="" width={24} height={24} />
        </button>

        <div className="hero__slider-track hero__slider-track--top">
          <span
            className="hero__slider-track-fill"
            aria-hidden="true"
            style={{ height: `${fillPercent}%` }}
          />
        </div>

        <span className="hero__slider-count t-source-14" data-plumb-id="1-5">
          {currentSlide + 1} / {TOTAL_SLIDES}
        </span>

        <div className="hero__slider-track hero__slider-track--bottom" />

        <button
          type="button"
          className={`hero__slider-btn hero__slider-btn--down ${clickedBtn === 'down' ? 'hero__slider-btn--clicked' : ''}`}
          aria-label="Next slide"
          onClick={() => changeSlide('next')}
        >
          <img src="/images/arrow-up-2.svg" alt="" width={24} height={24} />
        </button>
      </div>
    </section>
  )
}
