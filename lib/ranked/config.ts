export const SITE_ORIGIN = (
  process.env.SITE_ORIGIN ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://alignedhealthoc.com'
).replace(/\/$/, '')

export const DEFAULT_COVER = '/images/blog/default-cover.jpg'
export const DEFAULT_COVER_ALT = 'Aligned Health chiropractic care in Laguna Hills'

export const DEFAULT_CTA = {
  label: 'Book your New Patient Appointment',
  href: '/contact-us',
}

/** Cover prompt for Aligned Health. No patient faces / medical gore. */
export function coverPrompt(title: string): string {
  return [
    'Editorial photograph, 16:9 landscape, premium chiropractic wellness brand photography.',
    'Aligned Health Laguna Hills clinic atmosphere: warm wood, linen, espresso tones, calm natural light.',
    `Theme inspired by: ${title.slice(0, 120)}.`,
    'Spine care, mobility, recovery, or wellness still life. Empty treatment table, hands-only adjustment, stretching, or clinic interior.',
    'Cinematic lighting, sharp, no grain, no watermark.',
    'No text, no letters, no logos, no captions, no readable signage.',
    'No identifiable patient faces, no medical gore, no blood, no surgery.',
  ].join(' ')
}

/**
 * Manual cover overrides for Ranked posts.
 * Prefer local /images/blog assets. Do not fs.stat public/ — that packs
 * images into the cron bundle.
 */
export const COMMITTED_COVER_BY_SLUG: Readonly<
  Record<string, { src: string; alt: string }>
> = {
  'diversified-chiropractic-vs-gentle-techniques-for-back-stiffness': {
    src: '/images/blog/diversified-chiro.png',
    alt: 'Chiropractor performing a diversified spinal adjustment on a patient at Aligned Health in Laguna Hills',
  },
}

/**
 * Slugs that already have a committed file at /images/blog/covers/{slug}.png
 * List only. Do not fs.stat public/ — that packs images into the cron bundle.
 */
export const COMMITTED_COVER_SLUGS: readonly string[] = []
