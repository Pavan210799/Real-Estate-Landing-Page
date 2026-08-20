import { useEffect, useState } from 'react'

export function normalizeIndex(index, length) {
  return ((index % length) + length) % length
}

const LAYOUT_PRESETS = {
  default: {
    desktop: { visible: 6, step: 6 },
    tablet: { visible: 2, step: 2 },
    mobile: { visible: 1, step: 1 },
  },
  testimonials: {
    desktop: { visible: 3, step: 1 },
    tablet: { visible: 2, step: 1 },
    mobile: { visible: 1, step: 1 },
  },
}

export function useCarouselLayout(preset = 'default', containerRef = null) {
  const presetConfig = LAYOUT_PRESETS[preset] ?? LAYOUT_PRESETS.default
  const [layout, setLayout] = useState({
    ...presetConfig.desktop,
    mode: 'desktop',
  })

  useEffect(() => {
    const updateLayout = () => {
      const width = containerRef?.current?.clientWidth ?? window.innerWidth
      if (width <= 640) {
        setLayout({ ...presetConfig.mobile, mode: 'mobile' })
        return
      }
      if (width <= 1200) {
        setLayout({ ...presetConfig.tablet, mode: 'tablet' })
        return
      }
      setLayout({ ...presetConfig.desktop, mode: 'desktop' })
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)

    const container = containerRef?.current
    let resizeObserver
    if (container && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateLayout)
      resizeObserver.observe(container)
    }

    return () => {
      window.removeEventListener('resize', updateLayout)
      resizeObserver?.disconnect()
    }
  }, [preset, containerRef])

  return layout
}
