import { useState, useCallback, useRef, useEffect } from 'react'
import {
  EXPERIENCE_DETAIL_TABS,
  EXPERIENCE_DETAIL_SLIDES,
  SLIDES_PER_TAB,
} from '../data/experienceDetailSlides'
import {
  experiencePoster,
  isExperienceVideo,
} from '../data/experienceMedia'
import NavControl from './NavControl'
import './ExperienceDetailSection.css'

const TRANSITION_DURATION_MS = 600
const DETAIL_CARD_INTERVAL_MS = 5000
const BORDER_CYCLE_COMPLETE_HOLD_MS = 120

function SlideCopy({
  title,
  paragraph1,
  paragraph2,
  ctaOverlayText,
  ctaButtonText,
  className = '',
}: {
  title: string
  paragraph1: string
  paragraph2: string
  ctaOverlayText: string
  ctaButtonText: string
  className?: string
}) {
  return (
    <div className={`experience-detail-copy ${className}`.trim()}>
      <div className="experience-detail-text">
        <h2 className="experience-detail-title">{title}</h2>
        <p className="experience-detail-p1">{paragraph1}</p>
        <p className="experience-detail-p2">{paragraph2}</p>
      </div>
      <div className="experience-detail-cta-box">
        <p className="experience-detail-cta-text">{ctaOverlayText}</p>
        <a href="/contact" className="experience-detail-cta-btn">
          {ctaButtonText}
        </a>
      </div>
    </div>
  )
}

export default function ExperienceDetailSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [activePointIndex, setActivePointIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [exitingIndex, setExitingIndex] = useState<number | null>(null)
  const [isEntering, setIsEntering] = useState(false)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null)
  const progressStartRef = useRef(0)

  const contentIndex = activeTabIndex * SLIDES_PER_TAB + activePointIndex
  const totalSlides = EXPERIENCE_DETAIL_SLIDES.length

  const goToIndex = useCallback((nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= totalSlides) return
    if (nextIndex === contentIndex) return

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
      transitionTimeoutRef.current = null
    }

    setExitingIndex(contentIndex)
    setIsEntering(true)
    setProgress(0)
    progressStartRef.current = Date.now()

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisplayIndex(nextIndex)
        setActiveTabIndex(Math.floor(nextIndex / SLIDES_PER_TAB))
        setActivePointIndex(nextIndex % SLIDES_PER_TAB)
      })
    })

    transitionTimeoutRef.current = setTimeout(() => {
      setExitingIndex(null)
      setIsEntering(false)
      transitionTimeoutRef.current = null
    }, TRANSITION_DURATION_MS)
  }, [contentIndex, totalSlides])

  const goToPrev = useCallback(() => {
    if (activePointIndex > 0) {
      goToIndex(activeTabIndex * SLIDES_PER_TAB + activePointIndex - 1)
    } else {
      goToIndex(activeTabIndex * SLIDES_PER_TAB + SLIDES_PER_TAB - 1)
    }
  }, [activeTabIndex, activePointIndex, goToIndex])

  const goToNext = useCallback(() => {
    if (activePointIndex < SLIDES_PER_TAB - 1) {
      goToIndex(activeTabIndex * SLIDES_PER_TAB + activePointIndex + 1)
    } else {
      goToIndex(activeTabIndex * SLIDES_PER_TAB + 0)
    }
  }, [activeTabIndex, activePointIndex, goToIndex])

  const handleTabClick = (tabI: number) => {
    if (tabI === activeTabIndex) return
    goToIndex(tabI * SLIDES_PER_TAB)
  }

  useEffect(() => {
    progressStartRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (isCarouselPaused) return
    intervalRef.current = setInterval(() => {
      setProgress(1)
      setTimeout(() => {
        goToNext()
      }, BORDER_CYCLE_COMPLETE_HOLD_MS)
    }, DETAIL_CARD_INTERVAL_MS + BORDER_CYCLE_COMPLETE_HOLD_MS)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [goToNext, isCarouselPaused])

  useEffect(() => {
    if (isCarouselPaused) return
    const start = progressStartRef.current
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / DETAIL_CARD_INTERVAL_MS, 1)
      setProgress(p)
      if (p < 1) progressRef.current = requestAnimationFrame(tick)
    }
    progressRef.current = requestAnimationFrame(tick)
    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current)
    }
  }, [displayIndex, isCarouselPaused])

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressRef.current) cancelAnimationFrame(progressRef.current)
    }
  }, [])

  const displaySlide = EXPERIENCE_DETAIL_SLIDES[displayIndex]
  const exitingSlide = exitingIndex !== null ? EXPERIENCE_DETAIL_SLIDES[exitingIndex] : null

  return (
    <section
      id="experience-services"
      className="experience-detail experience-detail-fullscreen"
      aria-label="Experience detail"
    >
      <div className="experience-detail-floating-nav">
        <div className="experience-detail-tabs">
          {EXPERIENCE_DETAIL_TABS.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              className={`experience-detail-tab ${i === activeTabIndex ? 'active' : ''}`}
              onClick={() => handleTabClick(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="experience-detail-inner">
        <div className="experience-detail-content">
          <div className="experience-detail-left">
            <div className="experience-detail-copy-wrapper">
              {exitingSlide && (
                <SlideCopy
                  title={exitingSlide.title}
                  paragraph1={exitingSlide.paragraph1}
                  paragraph2={exitingSlide.paragraph2}
                  ctaOverlayText={exitingSlide.ctaOverlayText}
                  ctaButtonText={exitingSlide.ctaButtonText}
                  className="experience-detail-copy-exit"
                />
              )}
              <SlideCopy
                title={displaySlide.title}
                paragraph1={displaySlide.paragraph1}
                paragraph2={displaySlide.paragraph2}
                ctaOverlayText={displaySlide.ctaOverlayText}
                ctaButtonText={displaySlide.ctaButtonText}
                className={`experience-detail-copy-current${isEntering ? ' experience-detail-copy-enter' : ''}`}
              />
            </div>
          </div>

          <div className="experience-detail-right">
            <div className="experience-detail-media-card">
              <div className="experience-detail-media-wrap">
                {isExperienceVideo(displaySlide.mediaImage) ? (
                  <video
                    key={displaySlide.mediaImage}
                    src={displaySlide.mediaImage}
                    poster={experiencePoster(displaySlide.mediaImage)}
                    className="experience-detail-media-img"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden
                  />
                ) : (
                  <img
                    src={displaySlide.mediaImage}
                    alt=""
                    className="experience-detail-media-img"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
            <div
              className="experience-detail-nav-wrap"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <NavControl
                currentIndex={activePointIndex}
                total={SLIDES_PER_TAB}
                onPrev={goToPrev}
                onNext={goToNext}
                timerProgress={progress}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
