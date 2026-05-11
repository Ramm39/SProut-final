import Navbar from '../components/navbar'
import HeroSection, { HOW_IT_WORKS_HERO_VIDEO } from '../components/HeroSection'
import VideoOverlaySection from '../components/VideoOverlaySection'
import StayInspiredSection from '../components/StayInspiredSection'
import SiteFooter from '../components/SiteFooter'
import FullPageScroll from '../components/FullPageScroll'
import './HowItWorksPage.css'

export default function HowItWorksPage() {
  return (
    <div className="how-it-works-page">
      <Navbar />
      <FullPageScroll>
        <main>
          <HeroSection
            id="how-it-works-hero"
            titleLine1="HOW IT WORKS"
            titleLine2="WITH THE SPROUT"
            ctaText="Start the Conversation"
            ctaHref="/contact"
            videoSrc={HOW_IT_WORKS_HERO_VIDEO}
            showBackgroundVideo
          />
        </main>
        <VideoOverlaySection side="right" showBackgroundVideo={false}>
          {/* Content for right-side card */}
        </VideoOverlaySection>
        <VideoOverlaySection side="left" showBackgroundVideo={false}>
          {/* Content for left-side card */}
        </VideoOverlaySection>
        <StayInspiredSection />
      </FullPageScroll>
      <SiteFooter />
    </div>
  )
}
