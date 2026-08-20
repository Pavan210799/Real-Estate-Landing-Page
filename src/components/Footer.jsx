import { useCallback, useEffect, useRef, useState } from 'react'
import TextImage from './TextImage'
import { textImages } from '../textImages'
import { contactInfo, footerLegalLinks } from '../data'

function phoneHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

const SOCIAL_ICONS = {
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14 8.5V6.75C14 5.783 14.783 5 15.75 5H17V2H15.75C13.679 2 12 3.679 12 5.75V8.5H10V11.5H12V22H14V11.5H16.5L17 8.5H14Z"
        fill="currentColor"
      />
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 2C4.243 2 2 4.243 2 7V17C2 19.757 4.243 22 7 22H17C19.757 22 22 19.757 22 17V7C22 4.243 19.757 2 17 2H7ZM12 7C14.761 7 17 9.239 17 12C17 14.761 14.761 17 12 17C9.239 17 7 14.761 7 12C7 9.239 9.239 7 12 7ZM18.5 6.25C18.914 6.25 19.25 5.914 19.25 5.5C19.25 5.086 18.914 4.75 18.5 4.75C18.086 4.75 17.75 5.086 17.75 5.5C17.75 5.914 18.086 6.25 18.5 6.25Z"
        fill="currentColor"
      />
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M18.244 2H21.5L14.28 10.26L22.827 22H16.17L10.636 14.933L4.99 22H1.73L9.296 13.446L1.254 2H8.08L13.213 8.77L18.244 2ZM17.08 20.2H18.9L7.083 3.68H5.117L17.08 20.2Z"
        fill="currentColor"
      />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.98 3.5C4.98 4.881 3.881 6 2.5 6C1.119 6 0.02 4.881 0.02 3.5C0.02 2.119 1.119 1 2.5 1C3.881 1 4.98 2.119 4.98 3.5ZM0.25 8.25H4.75V23.5H0.25V8.25ZM8.75 8.25H13.08V10.58H13.13C13.73 9.45 15.18 8.25 17.25 8.25C21.58 8.25 22.25 11.02 22.25 14.78V23.5H17.75V15.58C17.75 13.78 17.71 11.48 15.25 11.48C12.73 11.48 12.33 13.38 12.33 15.45V23.5H8.75V8.25Z"
        fill="currentColor"
      />
    </svg>
  ),
}

export default function Footer({ footerLinks }) {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const modalRef = useRef(null)

  const openContactModal = useCallback(() => {
    setContactModalOpen(true)
  }, [])

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false)
  }, [])

  const handleFooterLinkClick = useCallback(
    (event, link) => {
      if (link.action === 'contact-modal') {
        event.preventDefault()
        openContactModal()
      }
    },
    [openContactModal],
  )

  useEffect(() => {
    if (!contactModalOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeContactModal()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    modalRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [contactModalOpen, closeContactModal])

  return (
    <footer className="footer" id="contact" data-plumb-id="group-1090">
      <div className="footer__cta" data-plumb-id="rectangle-1007-2">
        <TextImage
          asset={textImages.doYouHaveQuestions}
          className="footer__cta-title"
          plumbId="do-you-have-questions"
        />
        <button
          type="button"
          className="footer__cta-btn t-bg-300-16-15"
          data-plumb-id="frame-1144-2"
          onClick={openContactModal}
        >
          Connect Us Today
        </button>
      </div>

      <div className="footer__main" data-plumb-id="rectangle-1008">
        <div className="footer__content">
          <div className="footer__widgets" data-plumb-id="2">
            {footerLinks.map((widget) => (
              <div key={widget.title} className="footer__widget">
                <h3 className="footer__widget-title t-bg-900-16-175">{widget.title}</h3>
                <ul className="footer__widget-list">
                  {widget.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="footer__link t-bg-300-14-286"
                        onClick={(event) => handleFooterLinkClick(event, link)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer__bottom" data-plumb-id="bottom">
            <p className="footer__copyright t-bg-900-14-186" data-plumb-id="copyright-2022-all-rights-reserved">
              © Copyright 2022, All Rights Reserved
            </p>
            <div className="footer__legal" data-plumb-id="privacy-policy-terms-conditions">
              {footerLegalLinks.map((link) => (
                <a
                  key={link.label}
                  id={link.href.replace('#', '')}
                  href={link.href}
                  className="footer__link footer__legal-link t-bg-300-14-186"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {contactModalOpen ? (
        <div className="contact-modal" role="presentation" onClick={closeContactModal}>
          <div
            ref={modalRef}
            className="contact-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="contact-modal__close"
              aria-label="Close contact dialog"
              onClick={closeContactModal}
            >
              ×
            </button>
            <h2 id="contact-modal-title" className="contact-modal__title t-bg-900-24">
              Get in touch
            </h2>
            <p className="contact-modal__subtitle t-bg-300-18-133">
              Reach out by email or phone and we&apos;ll get back to you soon.
            </p>
            <div className="contact-modal__links">
              <a href={`mailto:${contactInfo.email}`} className="contact-modal__link t-bg-900-18-133">
                {contactInfo.email}
              </a>
              <a href={phoneHref(contactInfo.phone)} className="contact-modal__link t-bg-900-18-133">
                {contactInfo.phone}
              </a>
            </div>
            <div className="contact-modal__social">
              <p className="contact-modal__social-label t-bg-300-14-157">Follow us</p>
              <div className="contact-modal__social-list">
                {contactInfo.social.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="contact-modal__social-link"
                    aria-label={item.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {SOCIAL_ICONS[item.id]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </footer>
  )
}
