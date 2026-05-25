import { HERO_VIDEOS } from './HeroSection'
import './VideoOverlaySection.css'

type VideoOverlaySectionProps = {
  /** Video source (default: first hero video) */
  videoSrc?: string
  /** Render internal section video (disable when page provides shared video layer) */
  showBackgroundVideo?: boolean
  /** Which side the white box sits on */
  side?: 'left' | 'right'
  /** Content to render inside the white box */
  children?: React.ReactNode
}

export default function VideoOverlaySection({
  videoSrc = HERO_VIDEOS[0],
  showBackgroundVideo = true,
  side = 'right',
  children,
}: VideoOverlaySectionProps) {
  const sectionClass =
    'video-overlay-section' + (side === 'left' ? ' video-overlay-section--left' : ' video-overlay-section--right')

  const cardClass =
    'video-overlay-card' + (side === 'left' ? ' video-overlay-card--left' : ' video-overlay-card--right')

  return (
    <section className={sectionClass}>
      {showBackgroundVideo && (
        <div className="video-overlay-video-wrap">
          <video
            className="video-overlay-video"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />
          <div className="video-overlay-gradient" aria-hidden />
        </div>
      )}
      <div className={cardClass}>
        {children}
      </div>
    </section>
  )
}
