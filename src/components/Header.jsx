import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getInitials } from '../utils/auth'

const NAV_LINKS = [
  { label: 'Home', id: 'hero' },
  { label: 'Cities', id: 'cities' },
  { label: 'Property', id: 'property' },
  { label: 'Agents', id: 'agents' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Contact us', id: 'contact' },
]

export default function Header() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSolid, setIsSolid] = useState(false)
  const menuRef = useRef(null)
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const updateHeaderBackground = () => {
      const hero = document.getElementById('hero')
      const searchSection = document.getElementById('search')
      if (!hero || !searchSection) return

      const headerHeight = 90
      const heroPast = hero.getBoundingClientRect().bottom <= 0
      const searchAtTop = searchSection.getBoundingClientRect().top <= headerHeight

      setIsSolid(heroPast && searchAtTop)
    }

    updateHeaderBackground()
    window.addEventListener('scroll', updateHeaderBackground, { passive: true })
    window.addEventListener('resize', updateHeaderBackground)
    return () => {
      window.removeEventListener('scroll', updateHeaderBackground)
      window.removeEventListener('resize', updateHeaderBackground)
    }
  }, [])

  useEffect(() => {
    if (!searchOpen) return undefined
    searchInputRef.current?.focus()
    return undefined
  }, [searchOpen])

  useEffect(() => {
    if (!menuOpen && !searchOpen) return undefined

    const handlePointerDown = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
      if (searchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown, { passive: true })
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen, searchOpen])

  useEffect(() => {
    document.body.classList.toggle('header-drawer-open', menuOpen)
    document.body.classList.toggle('header-search-open', searchOpen)
    return () => {
      document.body.classList.remove('header-drawer-open')
      document.body.classList.remove('header-search-open')
    }
  }, [menuOpen, searchOpen])

  const scrollToSection = (event, sectionId) => {
    event.preventDefault()
    setMenuOpen(false)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLogout = () => {
    setMenuOpen(false)
    logout()
  }

  const displayName = user?.name || 'Guest'
  const initials = getInitials(displayName)

  const toggleSearch = () => {
    setMenuOpen(false)
    setSearchOpen((open) => !open)
    if (searchOpen) setSearchQuery('')
  }

  return (
    <header className={`header ${isSolid ? 'header--solid' : ''}`} data-plumb-id="header">
      <div className={`header__bar ${searchOpen ? 'header__bar--search-open' : ''}`} data-plumb-id="header-1">
        <div className="header__left" ref={menuRef}>
          <button
            type="button"
            className={`header__menu-btn ${menuOpen ? 'header__menu-btn--active' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="header-menu-drawer"
            onClick={() => {
              setSearchOpen(false)
              setMenuOpen((open) => !open)
            }}
            data-plumb-id="vuesax-bulk-category-2"
          >
            <img src="/images/category-2.svg" alt="" width={24} height={24} />
          </button>
          <a
            href="#search"
            className="header__menu header__menu-link t-source-16"
            data-plumb-id="menu"
            onClick={(event) => scrollToSection(event, 'search')}
          >
            Menu
          </a>

          <div
            id="header-menu-drawer"
            className={`header__menu-drawer ${menuOpen ? 'header__menu-drawer--open' : ''}`}
            role="dialog"
            aria-label="Navigation menu"
            aria-hidden={!menuOpen}
          >
            <div className="header__menu-drawer-user">
              <div className="header__menu-drawer-profile">
                <div
                  className="header__menu-drawer-avatar header__menu-drawer-avatar--initials"
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <p className="header__menu-drawer-name t-bg-900-18-133">{displayName}</p>
              </div>
            </div>

            <nav className="header__menu-drawer-nav" aria-label="Page sections">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="header__menu-drawer-link t-source-16"
                  onClick={(event) => scrollToSection(event, link.id)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button type="button" className="header__menu-drawer-logout t-source-16" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <a
          href="#hero"
          className="header__logo"
          aria-label="Meneto Home"
          data-plumb-id="group-1077"
          onClick={(event) => scrollToSection(event, 'hero')}
        >
          <img src="/images/group-1077.svg" alt="Meneto" className="header__logo-img" />
        </a>

        <div className="header__right" ref={searchRef}>
          <div className={`header__contact ${searchOpen ? 'header__contact--hidden' : ''}`}>
            <a
              href="tel:+3127648976"
              className="header__phone header__phone--desktop t-source-16"
              data-plumb-id="312-764-8976"
            >
              +312 764 8976
            </a>
            <a
              href="mailto:contact@realestate.com"
              className="header__email header__email--desktop t-source-16"
              data-plumb-id="contact-realestate-com"
            >
              contact@realestate.com
            </a>
          </div>

          <div className={`header__search-panel ${searchOpen ? 'header__search-panel--open' : ''}`}>
            <img src="/images/search-normal.svg" alt="" width={20} height={20} className="header__search-icon" />
            <input
              ref={searchInputRef}
              type="search"
              className="header__search-input t-source-16"
              placeholder="Search properties, locations..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Search"
            />
            <button
              type="button"
              className="header__search-close"
              aria-label="Close search"
              onClick={toggleSearch}
            >
              ×
            </button>
          </div>

          <button
            type="button"
            className={`header__search-btn ${searchOpen ? 'header__search-btn--active' : ''}`}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
            onClick={toggleSearch}
            data-plumb-id="vuesax-bulk-search-normal"
          >
            <img src="/images/search-normal.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </header>
  )
}
