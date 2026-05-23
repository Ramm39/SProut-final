import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  Children,
  type ReactNode,
  type TouchEvent,
  type KeyboardEvent,
} from 'react'
import { useLocation } from 'react-router-dom'
import { useFullPageScroll } from './FullPageScrollContext'

/** Slide animation duration */
const TRANSITION_MS = 900
/** Extra pause after animation before the next slide can trigger */
const COOLDOWN_MS = 400
const NAV_LOCK_MS = TRANSITION_MS + COOLDOWN_MS

const WHEEL_ACCUM_THRESHOLD = 160
const WHEEL_RESET_MS = 280
const WHEEL_MIN_DELTA = 4
const TOUCH_THRESHOLD = 72
const ESCAPE_SCROLL_THRESHOLD = 6
const TRANSITION_EASING = 'cubic-bezier(0.65, 0, 0.35, 1)'

type FullPageScrollProps = {
  children: ReactNode
  initialIndex?: number
}

type Direction = 'up' | 'down'

function isDocumentScrolled() {
  return window.scrollY > ESCAPE_SCROLL_THRESHOLD
}

export default function FullPageScroll({ children, initialIndex = 0 }: FullPageScrollProps) {
  const slides = Children.toArray(children)
  const count = slides.length
  const { pathname } = useLocation()
  const { setState, setTotalSlides, setPageScrollUnlocked } = useFullPageScroll()
  const initKeyRef = useRef<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.max(0, Math.min(initialIndex, count - 1))
  )
  const [isTransitioning, setIsTransitioning] = useState(false)
  const lockUntilRef = useRef(0)
  const touchStartYRef = useRef(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(currentIndex)
  const wheelAccumRef = useRef(0)
  const wheelResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  indexRef.current = currentIndex

  const isLocked = useCallback(() => lockUntilRef.current > Date.now(), [])

  const resetWheelAccum = useCallback(() => {
    wheelAccumRef.current = 0
    if (wheelResetTimerRef.current) {
      clearTimeout(wheelResetTimerRef.current)
      wheelResetTimerRef.current = null
    }
  }, [])

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= count) return false
      if (isLocked()) return false
      const prev = indexRef.current
      if (nextIndex === prev) return false

      const direction: Direction = nextIndex > prev ? 'down' : 'up'
      const wasOnLast = prev >= count - 1
      const willBeOnLast = nextIndex >= count - 1
      setPageScrollUnlocked(false)
      if (wasOnLast && !willBeOnLast && isDocumentScrolled()) {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
      resetWheelAccum()
      lockUntilRef.current = Date.now() + NAV_LOCK_MS
      setIsTransitioning(true)
      indexRef.current = nextIndex
      setCurrentIndex(nextIndex)
      setState({ index: nextIndex, direction })

      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = setTimeout(() => {
        setIsTransitioning(false)
        transitionTimerRef.current = null
      }, TRANSITION_MS)

      return true
    },
    [count, isLocked, resetWheelAccum, setPageScrollUnlocked, setState]
  )

  const tryNavigate = useCallback(
    (direction: Direction) => {
      if (isLocked()) return false
      const idx = indexRef.current
      const isLast = idx >= count - 1
      const isFirst = idx <= 0

      if (direction === 'down') {
        if (isLast) return false
        return goTo(idx + 1)
      }

      if (isFirst) return false

      if (isLast && isDocumentScrolled()) {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }

      return goTo(idx - 1)
    },
    [count, goTo, isLocked]
  )

  const accumulateWheel = useCallback(
    (deltaY: number, event: WheelEvent) => {
      if (Math.abs(deltaY) < WHEEL_MIN_DELTA) return

      const idx = indexRef.current
      const isLast = idx >= count - 1
      const scrollingDown = deltaY > 0
      const scrollingUp = deltaY < 0

      if (isLocked()) {
        event.preventDefault()
        return
      }

      if (isLast && scrollingDown) {
        if (isDocumentScrolled()) return
        setPageScrollUnlocked(true)
        return
      }

      if (isLast && scrollingUp && isDocumentScrolled()) {
        return
      }

      if (idx <= 0 && scrollingUp) {
        return
      }

      event.preventDefault()

      wheelAccumRef.current += deltaY
      if (wheelResetTimerRef.current) clearTimeout(wheelResetTimerRef.current)
      wheelResetTimerRef.current = setTimeout(() => {
        wheelAccumRef.current = 0
        wheelResetTimerRef.current = null
      }, WHEEL_RESET_MS)

      if (wheelAccumRef.current >= WHEEL_ACCUM_THRESHOLD) {
        resetWheelAccum()
        tryNavigate('down')
      } else if (wheelAccumRef.current <= -WHEEL_ACCUM_THRESHOLD) {
        resetWheelAccum()
        tryNavigate('up')
      }
    },
    [isLocked, resetWheelAccum, setPageScrollUnlocked, tryNavigate]
  )

  const goToRef = useRef(goTo)
  goToRef.current = goTo

  const HASH_TO_INDEX: Record<string, number> = {
    home: 0,
    experience: 1,
    process: 2,
    mission: 3,
    story: 4,
    contact: 5,
  }

  useLayoutEffect(() => {
    const initKey = `${pathname}:${count}:${initialIndex}`
    if (initKeyRef.current === initKey) return
    initKeyRef.current = initKey

    const start = Math.max(0, Math.min(initialIndex, Math.max(count - 1, 0)))
    indexRef.current = start
    lockUntilRef.current = 0
    resetWheelAccum()
    setCurrentIndex(start)
    setState({ index: start, direction: null })
    setTotalSlides(count)
    setPageScrollUnlocked(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, count, initialIndex, resetWheelAccum, setPageScrollUnlocked, setState, setTotalSlides])

  useEffect(() => {
    const onScroll = () => {
      if (indexRef.current < count - 1) return
      if (window.scrollY > ESCAPE_SCROLL_THRESHOLD) {
        setPageScrollUnlocked(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [count, setPageScrollUnlocked])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const hash = target.getAttribute('href')?.slice(1) || ''
      const index = HASH_TO_INDEX[hash]
      if (index != null) {
        e.preventDefault()
        if (isDocumentScrolled()) window.scrollTo({ top: 0, behavior: 'auto' })
        resetWheelAccum()
        goToRef.current(index)
      }
    }
    viewport.addEventListener('click', handleClick)
    return () => viewport.removeEventListener('click', handleClick)
  }, [resetWheelAccum])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const handler = (e: WheelEvent) => accumulateWheel(e.deltaY, e)
    viewport.addEventListener('wheel', handler, { passive: false })
    return () => viewport.removeEventListener('wheel', handler)
  }, [accumulateWheel])

  useEffect(() => {
    const handler = (e: WheelEvent) => {
      const idx = indexRef.current
      if (idx < count - 1) return
      if (e.deltaY >= 0) return
      if (!isDocumentScrolled()) return
      if (window.scrollY > ESCAPE_SCROLL_THRESHOLD) return

      const viewport = viewportRef.current
      if (viewport?.contains(e.target as Node)) return

      accumulateWheel(e.deltaY, e)
    }
    window.addEventListener('wheel', handler, { passive: false })
    return () => window.removeEventListener('wheel', handler)
  }, [accumulateWheel, count])

  useEffect(() => {
    return () => {
      if (wheelResetTimerRef.current) clearTimeout(wheelResetTimerRef.current)
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    }
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (isLocked()) return
      const endY = e.changedTouches[0].clientY
      const delta = touchStartYRef.current - endY
      const idx = indexRef.current
      const isLast = idx >= count - 1

      if (isLast && delta > TOUCH_THRESHOLD && !isDocumentScrolled()) return
      if (isLast && delta < -TOUCH_THRESHOLD && isDocumentScrolled()) {
        if (window.scrollY > ESCAPE_SCROLL_THRESHOLD) return
      }

      if (delta > TOUCH_THRESHOLD) tryNavigate('down')
      else if (delta < -TOUCH_THRESHOLD) tryNavigate('up')
    },
    [isLocked, tryNavigate]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (isLocked()) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        tryNavigate('down')
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        tryNavigate('up')
      }
    },
    [isLocked, tryNavigate]
  )

  if (count === 0) return null

  const isLastSlide = currentIndex >= count - 1

  return (
    <div
      ref={viewportRef}
      className={`fullpage-viewport${isTransitioning ? ' fullpage-viewport--transitioning' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Full page sections"
      style={{ touchAction: isLastSlide ? 'pan-y' : 'none' }}
    >
      <div
        className="fullpage-track"
        style={{
          transform: `translate3d(0, -${currentIndex * 100}vh, 0)`,
          transition: isTransitioning
            ? `transform ${TRANSITION_MS}ms ${TRANSITION_EASING}`
            : 'none',
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`fullpage-slide${i === currentIndex ? ' fullpage-slide--active' : ''}`}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  )
}
