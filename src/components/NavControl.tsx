import { useState, type CSSProperties } from 'react'
import './NavControl.css'

const PILL_PROGRESS_PATH =
  'M 65 0 L 101 0 A 29 29 0 0 1 130 29 L 130 29 A 29 29 0 0 1 101 58 L 29 58 A 29 29 0 0 1 0 29 L 0 29 A 29 29 0 0 1 29 0 L 65 0'

export interface NavControlProps {
  currentIndex: number
  total: number
  onPrev: () => void
  onNext: () => void
  timerProgress?: number
}

export default function NavControl({
  currentIndex,
  total,
  onPrev,
  onNext,
  timerProgress,
}: NavControlProps) {
  const [isPrevPressed, setIsPrevPressed] = useState(false)
  const [isNextPressed, setIsNextPressed] = useState(false)
  const normalizedTimerProgress =
    typeof timerProgress === 'number' && Number.isFinite(timerProgress)
      ? Math.min(Math.max(timerProgress, 0), 1)
      : 0

  return (
    <div className="nav-control">
      <button
        type="button"
        className={`nav-btn prev active${isPrevPressed ? ' pressed' : ''}`}
        onClick={onPrev}
        onMouseDown={() => setIsPrevPressed(true)}
        onMouseUp={() => setIsPrevPressed(false)}
        onMouseLeave={() => setIsPrevPressed(false)}
        aria-label="Previous"
      >
        <span className="nav-btn-inner">
          <img
            src="/right-arrow.png"
            alt=""
            className="arrow-icon left"
            width={30}
            height={30}
            aria-hidden
          />
        </span>
      </button>

      <div className="nav-progress">
        <span className="current">{currentIndex + 1}</span>/
        <span className="total">{total}</span>
      </div>

      <button
        type="button"
        className={`nav-btn next active${isNextPressed ? ' pressed' : ''}`}
        onClick={onNext}
        onMouseDown={() => setIsNextPressed(true)}
        onMouseUp={() => setIsNextPressed(false)}
        onMouseLeave={() => setIsNextPressed(false)}
        style={{ '--nav-progress': normalizedTimerProgress } as CSSProperties}
        aria-label="Next"
      >
        <svg
          className="nav-btn-progress-svg"
          viewBox="0 0 130 58"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            className="nav-btn-progress-path"
            d={PILL_PROGRESS_PATH}
            fill="none"
            strokeWidth="1.8"
            pathLength={100}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="nav-btn-inner">
          <img
            src="/right-arrow.png"
            alt=""
            className="arrow-icon right"
            width={30}
            height={30}
            aria-hidden
          />
        </span>
      </button>
    </div>
  )
}
