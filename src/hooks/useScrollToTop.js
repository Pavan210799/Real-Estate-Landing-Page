import { useEffect } from 'react'

function scrollAllRootsToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  document.querySelector('.auth-shell')?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

export function useScrollToTop(deps = []) {
  useEffect(() => {
    scrollAllRootsToTop()
  }, deps)
}
