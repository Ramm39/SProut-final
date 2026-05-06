import Navbar from '../components/navbar'
import HeroSection, { HERO_VIDEOS, HOW_IT_WORKS_HERO_VIDEO } from '../components/HeroSection'
import VideoOverlaySection from '../components/VideoOverlaySection'
import StayInspiredSection from '../components/StayInspiredSection'
import SiteFooter from '../components/SiteFooter'
import FullPageScroll from '../components/FullPageScroll'
import './HowItWorksPage.css'

export default function HowItWorksPage() {
  return (
    <div className="how-it-works-page">
      <div className="how-it-works-background" aria-hidden>
        <video
          className="how-it-works-background-video"
          src={HOW_IT_WORKS_HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="how-it-works-background-overlay" />
      </div>
      <Navbar />
      <FullPageScroll>
        <main>
          <HeroSection
            id="how-it-works-hero"
            titleLine1="HOW IT WORKS"
            titleLine2="WITH THE SPROUT"
            ctaText="Start the Conversation"
            ctaHref="/contact"
            showBackgroundVideo={false}
          />
        </main>
        <VideoOverlaySection videoSrc={HERO_VIDEOS[1]} side="right" showBackgroundVideo={false}>
          {/* Content for right-side card */}
        </VideoOverlaySection>
        <VideoOverlaySection videoSrc={HERO_VIDEOS[0]} side="left" showBackgroundVideo={false}>
          {/* Content for left-side card */}
        </VideoOverlaySection>
        <StayInspiredSection />
      </FullPageScroll>
      <SiteFooter />
    </div>
  )
}

