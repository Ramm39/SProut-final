/** Masonry gallery columns — layout mirrors `photogallary.html`; assets live in `/public/gallery`. */
export type MasonryCell = {
  aspectRatio: string
  alt: string
  src: string
}

export type MasonryColumn = {
  id: string
  translateYPct: number
  cells: MasonryCell[]
}

/** Six local images copied from repo `gallary/` → `public/gallery/gallery-{6–11}.png`. */
export const EXPERIENCE_GALLERY_PUBLIC_IMAGES = [
  '/gallery/gallery-6.png',
  '/gallery/gallery-7.png',
  '/gallery/gallery-8.png',
  '/gallery/gallery-9.png',
  '/gallery/gallery-10.png',
  '/gallery/gallery-11.png',
] as const

const g = EXPERIENCE_GALLERY_PUBLIC_IMAGES

export const EXPERIENCE_MASONRY_GALLERY: MasonryColumn[] = [
  {
    id: 'col-1',
    translateYPct: 0,
    cells: [
      {
        aspectRatio: '3 / 4.5',
        alt: 'Campus experience',
        src: g[0],
      },
      {
        aspectRatio: '3 / 5.5',
        alt: 'Campus experience',
        src: g[1],
      },
    ],
  },
  {
    id: 'col-2',
    translateYPct: 15,
    cells: [
      {
        aspectRatio: '1 / 1',
        alt: 'Campus experience',
        src: g[2],
      },
      {
        aspectRatio: '3 / 5',
        alt: 'Campus experience',
        src: g[3],
      },
    ],
  },
  {
    id: 'col-3',
    translateYPct: 35,
    cells: [
      {
        aspectRatio: '1.4 / 1',
        alt: 'Campus experience',
        src: g[4],
      },
      {
        aspectRatio: '1 / 1',
        alt: 'Campus experience',
        src: g[5],
      },
      {
        aspectRatio: '3 / 4',
        alt: 'Campus experience',
        src: g[3],
      },
    ],
  },
  {
    id: 'col-4',
    translateYPct: 32,
    cells: [
      {
        aspectRatio: '1.4 / 1',
        alt: 'Campus experience',
        src: g[1],
      },
      {
        aspectRatio: '1 / 1',
        alt: 'Campus experience',
        src: g[2],
      },
    ],
  },
  {
    id: 'col-5',
    translateYPct: 3.5,
    cells: [
      {
        aspectRatio: '3 / 6',
        alt: 'Campus experience',
        src: g[3],
      },
      {
        aspectRatio: '1 / 1',
        alt: 'Campus experience',
        src: g[4],
      },
    ],
  },
]
