import Navbar from '../components/navbar'
import HeroSection, { HOW_IT_WORKS_HERO_VIDEO } from '../components/HeroSection'
import ShubhamHowItWorksSection from '../components/ShubhamHowItWorksSection'
import PrinceHowItWorksSection from '../components/PrinceHowItWorksSection'
import OurStoryHowItWorksSection from '../components/OurStoryHowItWorksSection'
import StayInspiredSection from '../components/StayInspiredSection'
import SiteFooterGate from '../components/SiteFooterGate'
import FullPageScroll from '../components/FullPageScroll'
import './HowItWorksPage.css'

export default function HowItWorksPage() {
  return (
    <div className="how-it-works-page">
      <Navbar />
      <FullPageScroll>
        <HeroSection
          id="how-it-works-hero"
          titleEyebrow=""
          titleLine1="Humanizing The Brand"
          titleLine2={
            <>
              One Voice.{' '}
              <span className="how-it-works-hero-accent">One Belief.</span>
            </>
          }
          ctaText="LEARN MORE"
          ctaHref="/contact"
          videoSrc={HOW_IT_WORKS_HERO_VIDEO}
          showBackgroundVideo
        />
        <ShubhamHowItWorksSection />
        <PrinceHowItWorksSection />
        <OurStoryHowItWorksSection />
        <StayInspiredSection />
      </FullPageScroll>
      <SiteFooterGate />
    </div>
  )
}
