import { DEFAULT_COVER, DEFAULT_COVER_ALT, DEFAULT_CTA } from './config'
import { isPublishDateLive, scheduledCalendarDate } from '@/lib/publish-date'
import type { BlogPostData } from './types'

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim()
}

function stripTags(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
}

function isSeoMetaLine(text: string): boolean {
  return /^(meta\s*title|meta\s*description|seo title|focus keyword)\s*:/i.test(text.trim())
}

/** Google Docs wraps exported links in a `google.com/url?q=...` redirect; unwrap to the real target. */
function unwrapGoogleRedirect(href: string): string {
  try {
    const url = new URL(href)
    if (/(^|\.)google\.com$/.test(url.hostname) && url.pathname === '/url') {
      const target = url.searchParams.get('q')
      if (target) return target
    }
  } catch {
    // not an absolute URL — leave as-is
  }
  return href
}

function htmlChunkToPlain(html: string): string {
  const withLinks = html.replace(
    /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (_m, href: string, inner: string) => {
      const label = stripTags(inner)
      if (!label) return ''
      return `[${label}](${unwrapGoogleRedirect(decodeEntities(href))})`
    },
  )
  return stripTags(withLinks)
}

function usableParas(parts: string[]): string[] {
  return parts.map(htmlChunkToPlain).filter((p) => p.length > 1 && !isSeoMetaLine(p))
}

export function slugFromTitle(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return slug || 'ranked-article'
}

function metaFromPlain(text: string, fallbackTitle: string): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return fallbackTitle.slice(0, 155)
  if (clean.length <= 155) return clean
  const cut = clean.slice(0, 152)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : 152).trim()}…`
}

export function htmlToBlogPost(input: {
  title: string
  html: string | null
  description: string | null
  publishDate: string
  slug: string
  coverImage: string | null
}): BlogPostData | null {
  const html = (input.html ?? '').trim()
  if (!html) return null

  const headingSplit = html.split(/<(h[1-6])[^>]*>/i)
  const sections: { heading: string; body: string[] }[] = []
  let intro = ''
  const titleNorm = input.title.replace(/\s+/g, ' ').trim().toLowerCase()

  if (headingSplit.length === 1) {
    const paras = usableParas(html.split(/<\/p>/i))
    if (paras.length === 0) return null
    intro = paras[0]
    sections.push({
      heading: input.title,
      body: paras.slice(1, 40).length ? paras.slice(1, 40) : paras,
    })
  } else {
    const preface = htmlChunkToPlain(headingSplit[0])
    if (preface && !isSeoMetaLine(preface)) intro = preface

    for (let i = 1; i < headingSplit.length; i += 2) {
      const tag = (headingSplit[i] ?? '').toLowerCase()
      const rest = headingSplit[i + 1] ?? ''
      const close = rest.indexOf('</')
      const headingHtml = close >= 0 ? rest.slice(0, close) : rest
      const heading = stripTags(headingHtml)
      const bodyHtml = close >= 0 ? rest.slice(rest.indexOf('>', close) + 1) : ''
      const paras = usableParas(bodyHtml.split(/<\/p>|<li>/i))

      const headingIsTitle =
        tag === 'h1' && heading.replace(/\s+/g, ' ').trim().toLowerCase() === titleNorm

      if (headingIsTitle) {
        if (!intro && paras[0]) intro = paras[0]
        if (paras.length > 1) {
          sections.push({ heading: input.title, body: paras.slice(1) })
        }
        continue
      }

      if (!heading && paras.length === 0) continue
      sections.push({
        heading: heading || input.title,
        body: paras.length ? paras : [htmlChunkToPlain(bodyHtml) || heading],
      })
    }
  }

  const usable = sections.filter((s) => s.body.some((p) => p.length > 8 && !isSeoMetaLine(p)))
  if (usable.length === 0) return null

  if (!intro || isSeoMetaLine(intro)) {
    intro = usable[0].body.find((p) => !isSeoMetaLine(p)) ?? input.description ?? input.title
  }

  return {
    slug: input.slug,
    title: input.title,
    metaDescription: metaFromPlain(input.description || intro, input.title),
    h1: input.title,
    publishDate: input.publishDate,
    coverImage: input.coverImage || DEFAULT_COVER,
    coverAlt: input.coverImage ? input.title : DEFAULT_COVER_ALT,
    intro,
    sections: usable,
    cta: DEFAULT_CTA,
  }
}

export function isBlogContentType(contentType: string | null): boolean {
  const type = (contentType ?? '').trim().toLowerCase()
  if (!type) return true
  return type.includes('blog')
}

export function isRankedPostLive(
  status: string,
  scheduledDate: string | null = null,
  now = new Date(),
): boolean {
  const s = status.trim().toLowerCase()
  if (
    s === 'revising' ||
    s === 'cancelled' ||
    s === 'canceled' ||
    s === 'draft' ||
    s === 'needs approval'
  ) {
    return false
  }
  // A scheduled item with no date is not live yet. Published items without a date stay up.
  if (!scheduledDate) return s !== 'scheduled'
  return isPublishDateLive(scheduledDate, now)
}

export function publishDateFromRanked(scheduledDate: string | null, fallback: string): string {
  return (
    scheduledCalendarDate(scheduledDate) ??
    scheduledCalendarDate(fallback) ??
    fallback.slice(0, 10)
  )
}

export function nextUniquePublishDate(preferred: string): string {
  return scheduledCalendarDate(preferred) ?? preferred.slice(0, 10)
}

/** Keep each post on its real scheduled calendar date. Do not move a future date backward. */
export function ensureUniquePublishDates<T extends { slug: string; publishDate: string }>(
  posts: T[],
): T[] {
  return posts.map((post) => {
    const date = scheduledCalendarDate(post.publishDate) ?? post.publishDate.slice(0, 10)
    return date === post.publishDate ? post : { ...post, publishDate: date }
  })
}
