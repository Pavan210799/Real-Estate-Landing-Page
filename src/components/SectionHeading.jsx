import TextImage from './TextImage'
import { sectionHeadings } from '../textImages'

export default function SectionHeading({ sectionKey, className = '' }) {
  const { accent, title } = sectionHeadings[sectionKey]

  return (
    <div className={`section-heading ${className}`} data-plumb-id="group-1080">
      <TextImage asset={accent} className="section-heading__accent" plumbId="explore" />
      <TextImage asset={title} className="section-heading__title" plumbId={title.alt.toLowerCase().replace(/\s+/g, '-')} />
    </div>
  )
}
