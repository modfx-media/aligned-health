import type { BlogBlock, BlogPost } from '@/lib/blog'
import { getAllPosts } from '@/lib/blog'
import { isSharedDefaultCover } from '@/lib/cms/media-url'
import { getPublishedCmsPosts, mergePostsBySlug } from '@/lib/cms/posts'
import { isPublishDateLive } from '@/lib/publish-date'
import { getPublishedBlogPosts } from './posts'
import type { BlogPostData } from './types'

const AUTHOR = {
  name: 'Dr. Dustin Hack, D.C.',
  role: 'Chiropractor · Aligned Health',
}

function inferCategory(title: string): string {
  const hay = title.toLowerCase()
  if (/sciatica|disc|decompression/.test(hay)) return 'Back &amp; Disc Care'
  if (/sport|athlete|rehab|game ready|ice/.test(hay)) return 'Sports Recovery'
  if (/percussion|stretch|red light|recovery|pemf|cupping/.test(hay)) return 'Recovery'
  return 'Chiropractic Care'
}

function inferServices(title: string): string[] {
  const hay = title.toLowerCase()
  const slugs: string[] = []
  if (/adjust|chiro/.test(hay)) slugs.push('chiropractic-adjustments')
  if (/decompression|sciatica|disc/.test(hay)) slugs.push('spinal-decompression')
  if (/percussion/.test(hay)) slugs.push('percussion-therapy')
  if (/red light/.test(hay)) slugs.push('red-light-therapy')
  if (/stretch/.test(hay)) slugs.push('assisted-stretching')
  if (/ice|game ready|compression/.test(hay)) slugs.push('game-ready-ice-compressions')
  if (/pemf/.test(hay)) slugs.push('pemf-therapy')
  if (slugs.length === 0) slugs.push('chiropractic-adjustments')
  return slugs.slice(0, 3)
}

function readingTimeFrom(post: BlogPostData): number {
  const words = [post.intro, ...post.sections.flatMap((s) => [s.heading, ...s.body])]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(3, Math.round(words / 200))
}

const BULLET_PREFIX = /^[•\u2022\-*]\s+/
const NUMBERED_PREFIX = /^\d+[.)]\s+/

/** Group consecutive bullet-/number-prefixed paragraphs into real list blocks, stripping the prefix. */
function pushParagraphBlocks(body: BlogBlock[], paragraphs: string[]): void {
  let i = 0
  while (i < paragraphs.length) {
    const paragraph = paragraphs[i]
    if (BULLET_PREFIX.test(paragraph)) {
      const items: string[] = []
      while (i < paragraphs.length && BULLET_PREFIX.test(paragraphs[i])) {
        items.push(paragraphs[i].replace(BULLET_PREFIX, '').trim())
        i++
      }
      body.push({ type: 'ul', items })
      continue
    }
    if (NUMBERED_PREFIX.test(paragraph)) {
      const items: string[] = []
      while (i < paragraphs.length && NUMBERED_PREFIX.test(paragraphs[i])) {
        items.push(paragraphs[i].replace(NUMBERED_PREFIX, '').trim())
        i++
      }
      body.push({ type: 'ol', items })
      continue
    }
    if (paragraph.length > 1) body.push({ type: 'p', text: paragraph })
    i++
  }
}

export function rankedPostToSitePost(post: BlogPostData): BlogPost {
  const body: BlogBlock[] = []
  if (post.intro) body.push({ type: 'lead', text: post.intro })
  for (const section of post.sections) {
    const headingNorm = section.heading.replace(/\s+/g, ' ').trim().toLowerCase()
    const titleNorm = post.title.replace(/\s+/g, ' ').trim().toLowerCase()
    if (section.heading && headingNorm !== titleNorm) {
      body.push({ type: 'h2', text: section.heading })
    }
    pushParagraphBlocks(body, section.body)
  }


  return {
    slug: post.slug,
    title: post.title,
    description: post.metaDescription,
    keywords: [
      'chiropractor laguna hills',
      'aligned health blog',
      'orange county chiropractic',
    ],
    category: inferCategory(post.title),
    datePublished: post.publishDate,
    readingTime: readingTimeFrom(post),
    author: AUTHOR,
    hero: {
      src: post.coverImage,
      alt: post.coverAlt || post.title,
    },
    body,
    relatedServiceSlugs: inferServices(post.title),
  }
}

export async function getPublishedSitePosts(): Promise<BlogPost[]> {
  const local = [...getAllPosts()]
  const published = await getPublishedBlogPosts()
  const localBySlug = new Map(local.map((post) => [post.slug, post]))

  const rankedAndLocal = published.map((data) => {
    const original = localBySlug.get(data.slug)
    if (original) {
      const rankedCoverIsReal = !isSharedDefaultCover(data.coverImage)
      const originalCoverIsReal = !isSharedDefaultCover(original.hero.src)
      return {
        ...original,
        datePublished: data.publishDate,
        hero:
          originalCoverIsReal || !rankedCoverIsReal
            ? original.hero
            : {
                ...original.hero,
                src: data.coverImage,
                alt: original.hero.alt || data.coverAlt,
              },
      }
    }
    return rankedPostToSitePost(data)
  })

  const cms = await getPublishedCmsPosts()
  return mergePostsBySlug(rankedAndLocal, cms).filter((post) =>
    isPublishDateLive(post.datePublished),
  )
}

export async function getPublishedSitePost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPublishedSitePosts()
  return posts.find((post) => post.slug === slug)
}

export async function getRecentSitePosts(limit = 3): Promise<BlogPost[]> {
  const posts = await getPublishedSitePosts()
  return posts.slice(0, limit)
}
