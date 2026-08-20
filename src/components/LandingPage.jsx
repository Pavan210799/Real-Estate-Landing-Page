import Header from './Header'
import Hero from './Hero'
import SearchProperty from './SearchProperty'
import AboutUs from './AboutUs'
import ExploreCities from './ExploreCities'
import ExploreLatestProperty from './ExploreLatestProperty'
import ExploreOurAgents from './ExploreOurAgents'
import Testimonials from './Testimonials'
import Footer from './Footer'
import { agents, cities, footerLinks, properties, testimonials } from '../data'

export default function LandingPage() {
  return (
    <div className="landing-page" data-plumb-id="real-estate-landing-page">
      <Header />
      <Hero />
      <div className="landing-page__light-section">
        <SearchProperty />
        <AboutUs />
      </div>
      <ExploreCities cities={cities} />
      <ExploreLatestProperty properties={properties} />
      <ExploreOurAgents agents={agents} />
      <Testimonials testimonials={testimonials} />
      <Footer footerLinks={footerLinks} />
    </div>
  )
}