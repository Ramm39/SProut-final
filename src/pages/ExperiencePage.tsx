import Navbar from '../components/navbar'
import HeroSection, { EXPERIENCE_HERO_VIDEO } from '../components/HeroSection'
import ExperienceDetailSection from '../components/ExperienceDetailSection'
import ExperienceCollageSection from '../components/ExperienceCollageSection'
import StayInspiredSection from '../components/StayInspiredSection'
import SiteFooter from '../components/SiteFooter'
import FullPageScroll from '../components/FullPageScroll'

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <FullPageScroll>
        <main>
          <div className="experience-page-hero-wrap">
            <HeroSection
              id="experience-hero"
              titleLine1="EXPERIENCE THE FUTURE"
              titleLine2="NOW...."
              ctaText="Learn More"
              ctaHref="/#experience"
              videoSrc={EXPERIENCE_HERO_VIDEO}
            />
          </div>
        </main>
        <ExperienceDetailSection />
        <ExperienceCollageSection />
        <StayInspiredSection />
      </FullPageScroll>
      <SiteFooter />
    </>
  )
}
