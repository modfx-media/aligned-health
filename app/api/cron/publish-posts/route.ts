import { NextResponse } from 'next/server'
import { upsertRankedPostsAsDrafts } from '@/lib/cms/ranked-upsert'
import { getPublishedSitePosts } from '@/lib/ranked/site-posts'
import { syncAllRankedSites } from '@/lib/ranked/sync'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

function unauthorized() {
  return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
}

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return request.headers.get('authorization') === `Bearer ${secret}`
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized()
  const result = await syncAllRankedSites()
  const posts = await getPublishedSitePosts().catch(() => [])
  await upsertRankedPostsAsDrafts(posts)
  return NextResponse.json({ ok: true, ranAt: new Date().toISOString(), ...result })
}
