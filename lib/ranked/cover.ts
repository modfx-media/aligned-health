import { BlobNotFoundError, head, put } from '@vercel/blob'
import { COMMITTED_COVER_BY_SLUG, COMMITTED_COVER_SLUGS, coverPrompt } from './config'

const TOPIC_COVERS: Record<string, readonly string[]> = {
  sciatica: [
    'photo-1579684385127-1ef15d508118',
    'photo-1559757148-5c350d0d3c56',
    'photo-1581595220892-b0739db3ba8c',
    'photo-1576091160399-112ba8d25d1d',
  ],
  disc: [
    'photo-1579684453423-f84349ef60b0',
    'photo-1516549655169-df83a0774514',
    'photo-1582719478250-c89cae4dc85b',
    'photo-1559757175-0eb30cd8c063',
  ],
  stretch: [
    'photo-1544367567-0f2fcb009e0b',
    'photo-1518611012118-696072aa579a',
    'photo-1506126613408-eca07ce68773',
    'photo-1571019613454-1cb2f99b2d8b',
  ],
  hip: [
    'photo-1571019614242-c5c5dee9f50b',
    'photo-1594381898411-846e7d193883',
    'photo-1518611012118-696072aa579a',
    'photo-1544367567-0f2fcb009e0b',
  ],
  percussion: [
    'photo-1517836357463-d25dfeac3438',
    'photo-1571019614242-c5c5dee9f50b',
    'photo-1571019613454-1cb2f99b2d8b',
    'photo-1518611012118-696072aa579a',
  ],
  ice: [
    'photo-1576091160399-112ba8d25d1d',
    'photo-1559757148-5c350d0d3c56',
    'photo-1517836357463-d25dfeac3438',
    'photo-1476480862126-209bfaa8edc8',
  ],
  sports: [
    'photo-1476480862126-209bfaa8edc8',
    'photo-1517836357463-d25dfeac3438',
    'photo-1571019613454-1cb2f99b2d8b',
    'photo-1594381898411-846e7d193883',
  ],
  light: [
    'photo-1516549655169-df83a0774514',
    'photo-151537790570-3bf31be2d7db',
    'photo-1544161515-4ab6ce6db874',
    'photo-1600334129128-685c5582fd35',
  ],
  massage: [
    'photo-1600334129128-685c5582fd35',
    'photo-1544161515-4ab6ce6db874',
    'photo-1519824145371-29645405f2ed',
    'photo-151537790570-3bf31be2d7db',
  ],
  clinic: [
    'photo-1519494026892-80bbd2d6fd0d',
    'photo-1666214280557-f1b5022eb634',
    'photo-1629909613654-28e377c37b09',
    'photo-1576091160550-2173dba999ef',
  ],
  neck: [
    'photo-1559839734-2b71ea197ec2',
    'photo-1612349317150-e413f6a5b16d',
    'photo-1576091160550-2173dba999ef',
    'photo-1582750433449-648ed127bb54',
  ],
  chiropractic: [
    'photo-1576091160550-2173dba999ef',
    'photo-1582750433449-648ed127bb54',
    'photo-1559839734-2b71ea197ec2',
    'photo-1612349317150-e413f6a5b16d',
    'photo-1666214280557-f1b5022eb634',
    'photo-1519494026892-80bbd2d6fd0d',
  ],
}

const FALLBACK_UNSPLASH = [
  ...TOPIC_COVERS.chiropractic,
  ...TOPIC_COVERS.clinic,
  ...TOPIC_COVERS.stretch,
  ...TOPIC_COVERS.sports,
  ...TOPIC_COVERS.massage,
  ...TOPIC_COVERS.sciatica,
  ...TOPIC_COVERS.disc,
  ...TOPIC_COVERS.light,
  'photo-1551836022-d5d88e9218df',
  'photo-1600880292203-757bb62b4baf',
  'photo-1573496359142-b8d87734a5a2',
  'photo-1542744173-8e7e53415bb0',
  'photo-1522202176988-66273c2fd55f',
  'photo-1584982751601-97dcc096659c',
  'photo-1497366216548-37526070297c',
  'photo-1450101499163-c8848c66ca85',
] as const

function coverPngPath(contentId: string): string {
  return `blog-covers/${contentId}.png`
}

function coverJpgPath(contentId: string): string {
  return `blog-covers/${contentId}.jpg`
}

function committedCoverUrl(slug?: string): string | null {
  if (!slug) return null
  if (COMMITTED_COVER_BY_SLUG[slug]) return COMMITTED_COVER_BY_SLUG[slug].src
  return COMMITTED_COVER_SLUGS.includes(slug) ? `/images/blog/covers/${slug}.png` : null
}

export function committedCoverAlt(slug?: string): string | null {
  if (!slug) return null
  return COMMITTED_COVER_BY_SLUG[slug]?.alt ?? null
}

function hashSlug(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  return hash
}

function unsplashUrl(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?w=1200&q=80&fit=crop`
}

function picsumUrl(slug: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(`aligned-health-${slug}`)}/1200/630`
}

function topicPool(title?: string): string[] {
  const hay = (title ?? '').toLowerCase()
  const ids: string[] = []
  const push = (key: keyof typeof TOPIC_COVERS) => {
    for (const id of TOPIC_COVERS[key]) {
      if (!ids.includes(id)) ids.push(id)
    }
  }

  if (/sciatica|leg pain|nerve/.test(hay)) push('sciatica')
  if (/disc|decompression|herniat|bulg/.test(hay)) push('disc')
  if (/stretch|flexibility|mobility/.test(hay)) push('stretch')
  if (/\bhip\b|pelvis/.test(hay)) push('hip')
  if (/percussion|massage gun|myofascial/.test(hay)) push('percussion')
  if (/ice|cold|game ready|compression/.test(hay)) push('ice')
  if (/sport|athlete|rehab|return to/.test(hay)) push('sports')
  if (/red light|photobio|infrared/.test(hay)) push('light')
  if (/massage|cupping|soft tissue/.test(hay)) push('massage')
  if (/neck|cervical/.test(hay)) push('neck')
  if (/clinic|office|visit|adjustment|chiro/.test(hay)) push('chiropractic')
  push('clinic')
  push('chiropractic')
  for (const id of FALLBACK_UNSPLASH) {
    if (!ids.includes(id)) ids.push(id)
  }
  return ids
}

export function uniqueWebCoverUrl(
  slug: string,
  reserved: Set<string> = new Set(),
  title?: string,
): string {
  const pool = topicPool(title)
  const start = hashSlug(slug) % pool.length
  for (let i = 0; i < pool.length; i++) {
    const url = unsplashUrl(pool[(start + i) % pool.length])
    if (!reserved.has(url)) return url
  }
  let seed = slug
  let n = 0
  let url = picsumUrl(seed)
  while (reserved.has(url) && n < 50) {
    n += 1
    seed = `${slug}-${n}`
    url = picsumUrl(seed)
  }
  return url
}

function imageModels(): string[] {
  const preferred = process.env.OPENAI_IMAGE_MODEL?.trim()
  const models = [preferred, 'gpt-image-2', 'gpt-image-1'].filter((m): m is string => Boolean(m))
  return [...new Set(models)]
}

async function existingBlobUrl(contentId: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.VERCEL) return null
  for (const pathname of [coverPngPath(contentId), coverJpgPath(contentId)]) {
    try {
      const meta = await head(pathname)
      if (meta.url) return meta.url
    } catch (err) {
      if (!(err instanceof BlobNotFoundError)) return null
    }
  }
  return null
}

async function persistBuffer(pathname: string, bytes: Buffer, contentType: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.VERCEL) return null
  const blob = await put(pathname, bytes, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType,
  })
  return blob.url
}

async function generatePng(title: string): Promise<Buffer | null> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null
  const prompt = coverPrompt(title)
  let lastError = ''
  for (const model of imageModels()) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, prompt, size: '1536x1024', quality: 'medium', n: 1 }),
    })
    const text = await res.text()
    if (!res.ok) {
      lastError = `${model} ${res.status}: ${text.slice(0, 240)}`
      continue
    }
    const json = JSON.parse(text) as { data?: Array<{ url?: string; b64_json?: string }> }
    const row = json.data?.[0]
    if (row?.b64_json) return Buffer.from(row.b64_json, 'base64')
    if (row?.url) {
      const img = await fetch(row.url)
      if (img.ok) return Buffer.from(await img.arrayBuffer())
    }
  }
  console.error(`[ranked] OpenAI cover generation exhausted: ${lastError}`)
  return null
}

export async function getRankedCoverImage(input: {
  contentId: string
  title: string
  generate: boolean
  slug?: string
  reservedUrls?: Set<string>
}): Promise<string> {
  const slug = input.slug ?? input.contentId
  const reserved = input.reservedUrls ?? new Set<string>()

  const committed = committedCoverUrl(input.slug)
  if (committed) {
    reserved.add(committed)
    return committed
  }

  const cached = await existingBlobUrl(input.contentId)
  if (cached) {
    reserved.add(cached)
    return cached
  }

  const webUrl = uniqueWebCoverUrl(slug, reserved, input.title)
  if (!input.generate) {
    reserved.add(webUrl)
    return webUrl
  }

  try {
    const png = await generatePng(input.title)
    if (png) {
      const url = await persistBuffer(coverPngPath(input.contentId), png, 'image/png')
      if (url) {
        reserved.add(url)
        return url
      }
    }

    const sourceUrl = uniqueWebCoverUrl(slug, reserved, input.title)
    const img = await fetch(sourceUrl)
    if (img.ok) {
      const bytes = Buffer.from(await img.arrayBuffer())
      const persisted = await persistBuffer(coverJpgPath(input.contentId), bytes, 'image/jpeg')
      const url = persisted || sourceUrl
      reserved.add(url)
      return url
    }
  } catch (err) {
    console.error(`[ranked] cover failed for ${input.contentId}`, err)
  }

  reserved.add(webUrl)
  return webUrl
}

export function ensureUniqueCoverImages<T extends { slug: string; coverImage: string; title?: string }>(
  posts: T[],
): T[] {
  const used = new Set<string>()
  return posts.map((post) => {
    let cover = post.coverImage
    if (!cover || used.has(cover)) cover = uniqueWebCoverUrl(post.slug, used, post.title)
    used.add(cover)
    return cover === post.coverImage ? post : { ...post, coverImage: cover }
  })
}
