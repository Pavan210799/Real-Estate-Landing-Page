import { useEffect, useRef, useState } from 'react'
import TextImage from './TextImage'
import { sectionHeadings } from '../textImages'

function phoneHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

function AgentCard({ agent }) {
  return (
    <article className="agent-card">
      <div className="agent-card__media">
        <img src={agent.image} alt={agent.name} className="agent-card__photo" />
      </div>
      <div className="agent-card__info">
        <h3 className="agent-card__name t-bg-900-24">{agent.name}</h3>
        <a href={phoneHref(agent.phone)} className="agent-card__phone t-bg-300-14-186">
          <img src="/images/call-calling.svg" alt="" width={20} height={20} />
          <span className="agent-card__phone-number">{agent.phone}</span>
        </a>
      </div>
    </article>
  )
}

export default function ExploreOurAgents({ agents }) {
  const sectionRef = useRef(null)
  const [strokeVisible, setStrokeVisible] = useState(false)

  const { accent, title } = sectionHeadings.ourAgents

  useEffect(() => {
    const updateSectionState = () => {
      const section = sectionRef.current
      const reviewsSection = document.getElementById('reviews')
      if (!section || !reviewsSection) return

      const sectionRect = section.getBoundingClientRect()
      const reviewsRect = reviewsSection.getBoundingClientRect()
      const revealLine = window.innerHeight * 0.58
      const hideLine = window.innerHeight * 0.72

      const sectionInView =
        sectionRect.top < revealLine && sectionRect.bottom > window.innerHeight * 0.22
      const nextSectionReached = reviewsRect.top < hideLine

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

  return (
    <section
      ref={sectionRef}
      className={`explore-agents ${strokeVisible ? 'explore-agents--stroke-visible' : ''}`}
      id="agents"
      data-plumb-id="explore-our-agents"
    >
      <div className="section-heading section-heading--wide explore-agents__heading">
        <div className="explore-agents__accent-wrap">
          <TextImage asset={accent} className="section-heading__accent" plumbId="explore" />
        </div>
        <span className="section-heading__title-wrap">
          <TextImage asset={title} className="section-heading__title" plumbId="our-agents" />
        </span>
      </div>

      <div className="explore-agents__viewport">
        <div className="explore-agents__grid">
          {agents.map((agent) => (
            <AgentCard key={agent.name} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  )
}
