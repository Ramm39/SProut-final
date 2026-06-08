/** Experience category card media under `public/experience/`. */
const experience = (file: string) => `/experience/${file}` as const

/** Homepage experience section — static images under `public/homepage/`. */
const homepage = (file: string) => `/homepage/${file}` as const

export const HOME_EDUCATION_MEDIA = [
  homepage('ED1.png'),
  homepage('ED2.png'),
  homepage('ED3.png'),
] as const

export const HOME_WORKFORCE_MEDIA = [
  homepage('WF1.png'),
  homepage('WF2.png'),
  homepage('WF3.png'),
] as const

export const HOME_COMMUNITY_MEDIA = [
  homepage('CM1.png'),
  homepage('CM2.png'),
  homepage('CM3.png'),
] as const

export const HOME_CONFERENCES_MEDIA = [
  homepage('CON1.png'),
  homepage('CON2.png'),
  homepage('CON3.png'),
] as const

/** Education (Orientation) — OR1–OR3 */
export const EDUCATION_MEDIA = [
  experience('OR1.mp4'),
  experience('OR2.mp4'),
  experience('OR3.mp4'),
] as const

/** Workforce — WF1–WF3 */
export const WORKFORCE_MEDIA = [
  experience('WF1.mp4'),
  experience('WF2.mp4'),
  experience('WF3.mp4'),
] as const

/** Adventure tab on Experience page — same assets as workforce */
export const ADVENTURE_MEDIA = WORKFORCE_MEDIA

/** Community — CE1–CE3 */
export const COMMUNITY_MEDIA = [
  experience('CE1.mp4'),
  experience('CE2.mp4'),
  experience('CE3.mp4'),
] as const

/** Conferences — CONF1–CONF3 */
export const CONFERENCES_MEDIA = [
  experience('CONF1.mp4'),
  experience('CONF2.mp4'),
  experience('CONF3.mp4'),
] as const

/** Detail carousel order: Education → Community → Conferences → Adventure */
export const EXPERIENCE_DETAIL_MEDIA = [
  ...EDUCATION_MEDIA,
  ...COMMUNITY_MEDIA,
  ...CONFERENCES_MEDIA,
  ...ADVENTURE_MEDIA,
] as const

export function experiencePoster(mp4Src: string): string {
  return mp4Src.replace(/\.mp4$/i, '.gif')
}

export function isExperienceVideo(src: string): boolean {
  return src.endsWith('.mp4') || src.endsWith('.webm')
}
