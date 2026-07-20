import chromium from '@sparticuz/chromium'
import type { Browser } from 'puppeteer-core'
import puppeteerCore from 'puppeteer-core'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const isVercel = Boolean(process.env.VERCEL)

async function launchBrowser(): Promise<Browser> {
  if (isVercel) {
    chromium.setGraphicsMode = false

    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
      defaultViewport: {
        width: 1280,
        height: 1600,
        deviceScaleFactor: 1,
      },
    })
  }

  /*
   * Puppeteer is imported only during local development.
   * It supplies a macOS-compatible Chrome installation.
   */
  const { default: localPuppeteer } = await import('puppeteer')

  return localPuppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 1600,
      deviceScaleFactor: 1,
    },
  })
}

function getResumeSourceUrl(request: Request): string {
  return new URL('/resume-source', request.url).toString()
}

export async function GET(request: Request) {
  let browser: Browser | undefined

  try {
    const requestUrl = new URL(request.url)

    const shouldDownload =
      requestUrl.searchParams.get('download') === '1'

    browser = await launchBrowser()

    const page = await browser.newPage()

    await page.emulateMediaType('print')

    await page.goto(getResumeSourceUrl(request), {
      waitUntil: 'networkidle0',
      timeout: 45_000,
    })

    await page.waitForSelector(
      '[data-resume-ready="true"]',
      {
        timeout: 15_000,
      }
    )

    await page.evaluate(async () => {
      await document.fonts.ready

      const images = Array.from(document.images)

      await Promise.all(
        images.map((image) => {
          if (image.complete) {
            return Promise.resolve()
          }

          return new Promise<void>((resolve) => {
            image.addEventListener(
              'load',
              () => resolve(),
              { once: true }
            )

            image.addEventListener(
              'error',
              () => resolve(),
              { once: true }
            )
          })
        })
      )
    })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      },
    })

    return new Response(Buffer.from(pdf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',

        'Content-Disposition': shouldDownload
          ? 'attachment; filename="Khurshed-Khan-Resume.pdf"'
          : 'inline; filename="Khurshed-Khan-Resume.pdf"',

        'Cache-Control':
          process.env.NODE_ENV === 'development'
            ? 'no-store'
            : 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Resume PDF generation failed:', error)

    return Response.json(
      {
        error: 'Unable to generate Resume.pdf',
        details:
          process.env.NODE_ENV === 'development' &&
          error instanceof Error
            ? error.message
            : undefined,
      },
      {
        status: 500,
      }
    )
  } finally {
    await browser?.close()
  }
}