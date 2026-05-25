import Navbar from '../components/navbar'
import HeroSection, { EXPERIENCE_HERO_VIDEO } from '../components/HeroSection'
import ExperienceDetailSection from '../components/ExperienceDetailSection'
import ExperienceCollageSection from '../components/ExperienceCollageSection'
import StayInspiredSection from '../components/StayInspiredSection'
import SiteFooterGate from '../components/SiteFooterGate'
import FullPageScroll from '../components/FullPageScroll'
import './ExperiencePage.css'

export default function ExperiencePage() {
  return (
    <div className="experience-page">
      <Navbar />
      <FullPageScroll>
        <div className="experience-page-hero-wrap">
          <HeroSection
            id="experience-hero"
            titleLine1="EXPERIENCE THE FUTURE"
            titleLine2="NOW...."
            ctaText="LEARN MORE"
            ctaHref="#experience-services"
            videoSrc={EXPERIENCE_HERO_VIDEO}
          />
        </div>
        <ExperienceDetailSection />
        <ExperienceCollageSection />
        <StayInspiredSection />
      </FullPageScroll>
      <SiteFooterGate />
    </div>
  )
}
