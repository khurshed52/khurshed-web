import chromium from '@sparticuz/chromium'
import type { Browser } from 'puppeteer-core'
import puppeteerCore from 'puppeteer-core'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const isVercel = Boolean(process.env.VERCEL)

const viewport = {
  width: 1280,
  height: 1600,
  deviceScaleFactor: 1,
}

async function launchBrowser(): Promise<Browser> {
  if (isVercel) {
    chromium.setGraphicsMode = false

    const executablePath =
      await chromium.executablePath()

    const args = await puppeteerCore.defaultArgs({
      args: chromium.args,
      headless: 'shell',
    })

    console.log('Launching Vercel Chromium', {
      executablePath,
      argsCount: args.length,
    })

    return puppeteerCore.launch({
      args,
      executablePath,
      headless: 'shell',
      defaultViewport: viewport,
      timeout: 30_000,
    })
  }

  /*
   * The full Puppeteer package is used only locally.
   * It provides a compatible local Chrome installation.
   */
  const { default: localPuppeteer } =
    await import('puppeteer')

  return localPuppeteer.launch({
    headless: true,
    defaultViewport: viewport,
    timeout: 30_000,
  })
}

function getResumeSourceUrl(request: Request): string {
  return new URL('/resume-source', request.url).toString()
}

async function waitForResumeAssets(
  page: Awaited<ReturnType<Browser['newPage']>>
) {
  await page.waitForSelector(
    '[data-resume-ready="true"]',
    {
      timeout: 20_000,
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
          const finish = () => resolve()

          image.addEventListener('load', finish, {
            once: true,
          })

          image.addEventListener('error', finish, {
            once: true,
          })
        })
      })
    )
  })
}

export async function GET(request: Request) {
  let browser: Browser | undefined

  try {
    const requestUrl = new URL(request.url)

    const shouldDownload =
      requestUrl.searchParams.get('download') === '1'

    browser = await launchBrowser()

    const page = await browser.newPage()

    page.on('console', (message) => {
      console.log(
        `[resume-source:${message.type()}]`,
        message.text()
      )
    })

    page.on('pageerror', (error) => {
  if (error instanceof Error) {
    console.error('Resume source page error:', {
      message: error.message,
      stack: error.stack,
    })
  } else {
    console.error(
      'Resume source page error:',
      String(error)
    )
  }
})

    page.on('requestfailed', (request) => {
      console.error(
        'Resume source request failed:',
        request.url(),
        request.failure()?.errorText
      )
    })

    await page.emulateMediaType('print')

    const sourceUrl = getResumeSourceUrl(request)

    console.log('Opening resume source:', sourceUrl)

    const sourceResponse = await page.goto(sourceUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 45_000,
    })

    if (!sourceResponse) {
      throw new Error(
        'The resume source returned no response.'
      )
    }

    if (!sourceResponse.ok()) {
      throw new Error(
        `The resume source returned HTTP ${sourceResponse.status()}.`
      )
    }

    await waitForResumeAssets(page)

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

        'Content-Length': String(pdf.byteLength),

        'Cache-Control':
          process.env.NODE_ENV === 'development'
            ? 'no-store'
            : 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error)

    const stack =
      error instanceof Error
        ? error.stack
        : undefined

    console.error('Resume PDF generation failed:', {
      message,
      stack,
    })

    return Response.json(
      {
        error: 'Unable to generate Resume.pdf',

        /*
         * Keep this temporarily while debugging Vercel.
         * Remove "details" after the issue is fixed.
         */
        details: message,
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  } finally {
    if (browser) {
      await browser.close().catch((error) => {
        console.error(
          'Failed to close Chromium:',
          error
        )
      })
    }
  }
}