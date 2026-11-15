import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/resume-generator', '/resume-source'] },
    sitemap: 'https://www.khurshedkhan.dev/sitemap.xml',
    host: 'https://www.khurshedkhan.dev',
  }
}
