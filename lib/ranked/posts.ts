import { getRankedContentDetail, listRankedContent } from './client'
import { ensureUniqueCoverImages, committedCoverAlt, getRankedCoverImage } from './cover'
import { fetchGoogleDocHtml } from './google-doc'
import {
  ensureUniquePublishDates,
  htmlToBlogPost,
  isBlogContentType,
  isRankedPostLive,
  publishDateFromRanked,
  slugFromTitle,
} from './html-to-post'
import { getLocalBlogPosts } from './local-posts'
import { isThisSiteBlog, resolveThisSiteProjectId } from './this-site'
import type { BlogPostData, RankedContentDetail, RankedContentListItem } from './types'

async function resolveArticleHtml(
  item: RankedContentListItem,
  detail: RankedContentDetail | null,
): Promise<string | null> {
  const fromRanked = detail?.content_body?.trim()
  if (fromRanked) return fromRanked
  const docUrl = detail?.document_url || detail?.source_url || item.document_url || item.source_url
  return fetchGoogleDocHtml(docUrl)
}

function relatedFromPosts(
  posts: BlogPostData[],
  excludeSlug: string,
): { title: string; slug: string }[] {
  return [...posts]
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 3)
    .map((p) => ({ title: p.h1, slug: p.slug }))
}

function uniqueSlug(title: string, contentId: string, taken: Set<string>): string {
  const base = slugFromTitle(title)
  if (!taken.has(base)) return base
  const withId = `${base}-${contentId.slice(0, 8)}`
  if (!taken.has(withId)) return withId
  let i = 2
  while (taken.has(`${base}-${i}`)) i += 1
  return `${base}-${i}`
}

function normalizeTitle(title: string): string {
  return title
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/['’]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

export async function getLiveRankedBlogPosts(
  projectId?: string,
  opts: { generateCovers?: boolean; generateForSlug?: string } = {},
): Promise<BlogPostData[]> {
  if (!process.env.RANKED_API_KEY) return []
  const id = await resolveThisSiteProjectId()
  if (!id) return []
  if (projectId && projectId !== id) return []

  try {
    const items = await listRankedContent(id)
    const candidates = items.filter(
      (item) =>
        isBlogContentType(item.content_type) &&
        isRankedPostLive(item.status, item.scheduled_date) &&
        isThisSiteBlog(item.title, item.description),
    )
    const local = getLocalBlogPosts()
    const taken = new Set(local.map((p) => p.slug))
    const localTitles = new Set(local.map((p) => normalizeTitle(p.title)))
    const reservedCovers = new Set(local.map((p) => p.coverImage))
    const resolved = await Promise.all(
      candidates.map(async (item) => {
        let detail: RankedContentDetail | null = null
        try {
          detail = await getRankedContentDetail(item.id, id)
        } catch (err) {
          console.error(`[ranked] detail failed for ${item.id}`, err)
        }
        try {
          const html = await resolveArticleHtml(item, detail)
          if (!html) return null
          return { source: detail ?? item, html }
        } catch (err) {
          console.error(`[ranked] article HTML failed for ${item.id}`, err)
          return null
        }
      }),
    )

    const posts: BlogPostData[] = []
    for (const row of resolved) {
      if (!row) continue
      const { source, html } = row
      if (localTitles.has(normalizeTitle(source.title))) continue
      const slug = uniqueSlug(source.title, source.id, taken)
      const post = htmlToBlogPost({
        title: source.title,
        html,
        description: source.description,
        publishDate: publishDateFromRanked(source.scheduled_date, source.created_at),
        slug,
        coverImage: null,
      })
      if (!post) continue
      post.coverImage = await getRankedCoverImage({
        contentId: source.id,
        title: source.title,
        slug,
        generate: Boolean(opts.generateCovers) || opts.generateForSlug === slug,
        reservedUrls: reservedCovers,
      })
      post.coverAlt = committedCoverAlt(slug) ?? `${source.title} cover`
      posts.push(post)
      taken.add(slug)
    }
    const unique = ensureUniquePublishDates(ensureUniqueCoverImages(posts))
    return unique.map((post) => ({
      ...post,
      relatedPosts: relatedFromPosts([...local, ...unique], post.slug),
    }))
  } catch (err) {
    console.error('[ranked] failed to load content calendar', err)
    return []
  }
}

export async function getLiveRankedBlogPost(slug: string): Promise<BlogPostData | undefined> {
  const posts = await getLiveRankedBlogPosts(undefined, { generateForSlug: slug })
  return posts.find((p) => p.slug === slug)
}

export async function getPublishedBlogPost(slug: string): Promise<BlogPostData | undefined> {
  const posts = await getPublishedBlogPosts()
  return posts.find((p) => p.slug === slug)
}

export async function getPublishedBlogPosts(): Promise<BlogPostData[]> {
  const local = getLocalBlogPosts()
  const ranked = await getLiveRankedBlogPosts()
  const taken = new Set(local.map((p) => p.slug))
  const merged = [...local, ...ranked.filter((p) => !taken.has(p.slug))]
  const unique = ensureUniquePublishDates(ensureUniqueCoverImages(merged))
  return unique.map((post) => ({
    ...post,
    relatedPosts: relatedFromPosts(unique, post.slug),
  }))
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const posts = await getPublishedBlogPosts()
  return posts.map((p) => p.slug)
}
