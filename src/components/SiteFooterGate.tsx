import { useEffect, useRef, useState } from 'react'
import SiteFooter from './SiteFooter'
import { useFullPageScroll } from './FullPageScrollContext'

type SiteFooterGateProps = {
  /**
   * Requires last full-page slide + user scrolled past it.
   * afterPageContent – also waits for sentinel (end of Stay Inspired on experience).
   */
  reveal?: 'default' | 'afterPageContent'
}

export default function SiteFooterGate({ reveal = 'default' }: SiteFooterGateProps) {
  const { isLastSlide, pageScrollUnlocked } = useFullPageScroll()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [pastTailContent, setPastTailContent] = useState(false)

  useEffect(() => {
    if (reveal !== 'afterPageContent' || !pageScrollUnlocked) {
      setPastTailContent(false)
      return
    }

    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPastTailContent(true)
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [reveal, pageScrollUnlocked])

  const visible =
    isLastSlide &&
    pageScrollUnlocked &&
    (reveal === 'default' || pastTailContent)

  return (
    <>
      {reveal === 'afterPageContent' && pageScrollUnlocked && (
        <div ref={sentinelRef} className="footer-reveal-sentinel" aria-hidden />
      )}
      <div
        className={
          visible ? 'site-footer-gate site-footer-gate--visible' : 'site-footer-gate'
        }
      >
        <SiteFooter />
      </div>
    </>
  )
}
