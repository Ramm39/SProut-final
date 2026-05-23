import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Direction = 'up' | 'down' | null

export type FullPageScrollState = {
  index: number
  direction: Direction
  totalSlides: number
  pageScrollUnlocked: boolean
}

type FullPageScrollContextValue = FullPageScrollState & {
  isLastSlide: boolean
  setState: (next: Partial<FullPageScrollState> & Pick<FullPageScrollState, 'index' | 'direction'>) => void
  setTotalSlides: (total: number) => void
  setPageScrollUnlocked: (unlocked: boolean) => void
}

const INITIAL_STATE: FullPageScrollState = {
  index: 0,
  direction: null,
  totalSlides: 0,
  pageScrollUnlocked: false,
}

const FullPageScrollContext = createContext<FullPageScrollContextValue | undefined>(undefined)

export function FullPageScrollProvider({ children }: { children: ReactNode }) {
  const [state, setStateInternal] = useState<FullPageScrollState>(INITIAL_STATE)

  const isLastSlide =
    state.totalSlides > 0 && state.index === state.totalSlides - 1

  const setState = useCallback(
    (next: Partial<FullPageScrollState> & Pick<FullPageScrollState, 'index' | 'direction'>) => {
      setStateInternal((prev) => ({ ...prev, ...next }))
    },
    []
  )

  const setTotalSlides = useCallback((total: number) => {
    setStateInternal((prev) => (prev.totalSlides === total ? prev : { ...prev, totalSlides: total }))
  }, [])

  const setPageScrollUnlocked = useCallback((unlocked: boolean) => {
    setStateInternal((prev) =>
      prev.pageScrollUnlocked === unlocked ? prev : { ...prev, pageScrollUnlocked: unlocked }
    )
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      isLastSlide,
      setState,
      setTotalSlides,
      setPageScrollUnlocked,
    }),
    [state, isLastSlide, setState, setTotalSlides, setPageScrollUnlocked]
  )

  return (
    <FullPageScrollContext.Provider value={value}>
      {children}
    </FullPageScrollContext.Provider>
  )
}

export function useFullPageScroll() {
  const ctx = useContext(FullPageScrollContext)
  if (!ctx) {
    throw new Error('useFullPageScroll must be used within FullPageScrollProvider')
  }
  return ctx
}
