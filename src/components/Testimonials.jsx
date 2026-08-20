import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TextImage from './TextImage'
import CarouselNav from './CarouselNav'
import { normalizeIndex, useCarouselLayout } from '../hooks/useCarouselLayout'
import { sectionHeadings } from '../textImages'

function TestimonialCard({ testimonial }) {
  return (
    <article className="testimonial-card">
      <img src="/images/favourite-31.svg" alt="5 stars" className="testimonial-card__stars" width={96} height={16} />
      <blockquote className="testimonial-card__quote t-bg-300-18-156">{testimonial.quote}</blockquote>
      <div className="testimonial-card__author">
        <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-card__avatar" />
        <div>
          <p className="testimonial-card__name t-bg-900-18-156">{testimonial.name}</p>
          <p className="testimonial-card__role t-bg-300-14-157">{testimonial.role}</p>
        </div>
      </div>
    </article>
  )
}

export default function Testimonials({ testimonials }) {
  const sectionRef = useRef(null)
  const animatingRef = useRef(false)
  const [strokeVisible, setStrokeVisible] = useState(false)
  const [offset, setOffset] = useState(0)
  const [animPhase, setAnimPhase] = useState('idle')
  const [direction, setDirection] = useState('next')
  const layout = useCarouselLayout('testimonials')

  const { accent, title } = sectionHeadings.ourTestimonials

  useEffect(() => {
    setOffset(0)
    setAnimPhase('idle')
    animatingRef.current = false
  }, [layout.mode])

  useEffect(() => {
    const updateSectionState = () => {
      const section = sectionRef.current
      const footerSection = document.getElementById('contact')
      if (!section || !footerSection) return

      const sectionRect = section.getBoundingClientRect()
      const footerRect = footerSection.getBoundingClientRect()
      const revealLine = window.innerHeight * 0.58
      const hideLine = window.innerHeight * 0.72

      const sectionInView =
        sectionRect.top < revealLine && sectionRect.bottom > window.innerHeight * 0.22
      const nextSectionReached = footerRect.top < hideLine

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

  const visibleTestimonials = useMemo(
    () =>
      Array.from({ length: layout.visible }, (_, index) =>
        testimonials[normalizeIndex(offset + index, testimonials.length)],
      ),
    [testimonials, layout.visible, offset],
  )

  const handleNavigate = useCallback(
    (dir) => {
      if (animatingRef.current || testimonials.length === 0) return

      animatingRef.current = true
      setDirection(dir)
      setAnimPhase('exit')

      window.setTimeout(() => {
        setOffset((prev) =>
          normalizeIndex(prev + (dir === 'next' ? layout.step : -layout.step), testimonials.length),
        )
        setAnimPhase('enter')

        window.setTimeout(() => {
          setAnimPhase('idle')
          animatingRef.current = false
        }, 480)
      }, 420)
    },
    [layout.step, testimonials.length],
  )

  const gridClassName = [
    'testimonials__grid',
    `testimonials__grid--${layout.mode}`,
    animPhase !== 'idle' ? `testimonials__grid--${animPhase}-${direction}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      ref={sectionRef}
      className={`testimonials ${strokeVisible ? 'testimonials--stroke-visible' : ''}`}
      id="reviews"
      data-plumb-id="testimonial"
    >
      <div className="testimonials__header">
        <div className="section-heading section-heading--wide testimonials__heading">
          <div className="testimonials__accent-wrap">
            <TextImage asset={accent} className="section-heading__accent" plumbId="explore" />
          </div>
          <span className="section-heading__title-wrap">
            <TextImage asset={title} className="section-heading__title" plumbId="our-testimonials" />
          </span>
        </div>
        <CarouselNav onPrev={() => handleNavigate('prev')} onNext={() => handleNavigate('next')} />
      </div>

      <div className="testimonials__viewport">
        <div className={gridClassName} data-plumb-id="list">
          {visibleTestimonials.map((item, index) => (
            <TestimonialCard key={`${item.name}-${offset}-${index}`} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
