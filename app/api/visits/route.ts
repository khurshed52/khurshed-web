import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

const VISIT_KEY = 'portfolio:total-visits'
const VISITOR_COOKIE = 'portfolio_visitor_24h'
const COOKIE_MAX_AGE = 60 * 60 * 24
const BOT_PATTERN = /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit|headless|lighthouse|pagespeed|pingdom|uptimerobot/i

const noStoreHeaders = {
  'Cache-Control': 'private, no-store, no-cache, max-age=0, must-revalidate',
  Pragma: 'no-cache',
  Vary: 'Cookie, User-Agent',
}

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: noStoreHeaders })
}

export async function GET(request: NextRequest) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!redisUrl || !redisToken) {
    return json({ error: 'Visit counter is unavailable.' }, 503)
  }

  try {
    const redis = new Redis({ url: redisUrl, token: redisToken })
    const userAgent = request.headers.get('user-agent') ?? ''
    const hostname = request.nextUrl.hostname
    const isDevelopment = process.env.NODE_ENV !== 'production' || hostname === 'localhost' || hostname === '127.0.0.1'
    const shouldIgnoreVisit = isDevelopment || BOT_PATTERN.test(userAgent)
    const hasRecentVisit = request.cookies.has(VISITOR_COOKIE)

    const count = shouldIgnoreVisit || hasRecentVisit
      ? await redis.get<number>(VISIT_KEY) ?? 0
      : await redis.incr(VISIT_KEY)

    const response = json({ count })

    if (!shouldIgnoreVisit && !hasRecentVisit) {
      response.cookies.set({
        name: VISITOR_COOKIE,
        value: 'counted',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
      })
    }

    return response
  } catch {
    return json({ error: 'Visit counter is temporarily unavailable.' }, 503)
  }
}
