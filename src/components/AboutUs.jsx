import { useCallback, useEffect, useRef, useState } from 'react'
import TextImage from './TextImage'
import Stamp from './Stamp'
import { textImages } from '../textImages'

const HOUSE_TOUR_VIDEO_SRC = 'https://assets.mixkit.co/videos/3090/3090-720.mp4'
const POSTER_IMAGE_SRC = '/images/vesper-02-2500.png'

export default function AboutUs() {
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
  const videoRef = useRef(null)
  const isPlayingRef = useRef(false)
  const [strokeVisible, setStrokeVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  const stopVideo = useCallback(() => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    const updateSectionState = () => {
      const section = sectionRef.current
      const citiesSection = document.getElementById('cities')
      if (!section || !citiesSection) return

      const sectionRect = section.getBoundingClientRect()
      const citiesRect = citiesSection.getBoundingClientRect()
      const revealLine = window.innerHeight * 0.58
      const hideLine = window.innerHeight * 0.72

      const sectionInView =
        sectionRect.top < revealLine && sectionRect.bottom > window.innerHeight * 0.22
      const nextSectionReached = citiesRect.top < hideLine
      const sectionLeft =
        sectionRect.bottom < window.innerHeight * 0.2 ||
        sectionRect.top > window.innerHeight * 0.85 ||
        nextSectionReached

      setStrokeVisible(sectionInView && !nextSectionReached)

      if (isPlayingRef.current && sectionLeft) {
        stopVideo()
      }
    }

    updateSectionState()
    window.addEventListener('scroll', updateSectionState, { passive: true })
    window.addEventListener('resize', updateSectionState)
    return () => {
      window.removeEventListener('scroll', updateSectionState)
      window.removeEventListener('resize', updateSectionState)
    }
  }, [stopVideo])

  useEffect(() => {
    const media = mediaRef.current
    if (!media) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || !isPlayingRef.current) return
        if (entry.intersectionRatio < 0.5) {
          stopVideo()
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    observer.observe(media)
    return () => observer.disconnect()
  }, [stopVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const handleEnded = () => {
      stopVideo()
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [stopVideo])

  const handleMediaToggle = async () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      stopVideo()
      return
    }

    try {
      await video.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  const handleMediaKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleMediaToggle()
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`about-us ${strokeVisible ? 'about-us--stroke-visible' : ''}`}
      id="about"
      data-plumb-id="about-us"
    >
      <Stamp />

      <div className="about-us__text" data-plumb-id="about-us-text">
        <div className="about-us__eyebrow-wrap">
          <TextImage asset={textImages.aboutUs} className="about-us__eyebrow" plumbId="about-us-2" />
        </div>
        <p className="about-us__description t-bg-300-16-188" data-plumb-id="it-is-a-long-established-fact-that-a-rea">
          It is a long established fact that a reader will be distracted by the readable content of a page when
          looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
          of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.
        </p>
        <button type="button" className="btn btn--gold btn--interactive t-bg-300-16-15" data-plumb-id="frame-1144">
          Know More
        </button>
      </div>

      <div
        ref={mediaRef}
        className={`about-us__media ${isPlaying ? 'about-us__media--playing' : ''}`}
        data-plumb-id="mask-group-2"
        role="button"
        tabIndex={0}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pause house tour video' : 'Play house tour video'}
        onClick={handleMediaToggle}
        onKeyDown={handleMediaKeyDown}
      >
        <img
          src={POSTER_IMAGE_SRC}
          alt="Modern interior living space"
          className="about-us__poster"
          data-plumb-id="vesper-02-2500"
        />
        <video
          ref={videoRef}
          className="about-us__video"
          src={HOUSE_TOUR_VIDEO_SRC}
          poster={POSTER_IMAGE_SRC}
          playsInline
          preload="metadata"
        />
        <div className="about-us__play" data-plumb-id="play" aria-hidden="true">
          <span className="about-us__play-ring" />
          <span className="about-us__play-inner" />
          <TextImage asset={textImages.play} className="about-us__play-label" plumbId="play-2" />
          <svg className="about-us__play-icon" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M18 10.5c0-1.35 1.48-2.18 2.64-1.43l17.72 11.5c1.08.7 1.08 2.16 0 2.86L20.64 34.93C19.48 35.68 18 34.85 18 33.5v-23z" />
          </svg>
        </div>
      </div>
    </section>
  )
}
