import type { Metadata } from 'next'
import { IBM_Plex_Mono, Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import AIRecruiterChat from "@/components/ai/AIRecruiterChat";
import { ThemeProvider } from "next-themes";

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.khurshedkhan.dev'),
  title: 'Khurshed Khan | Senior FinTech Frontend & Full-Stack Developer Dubai',
  description: 'Senior frontend and full-stack developer in Dubai specialising in scalable fintech platforms, real-time dashboards, secure AI integrations and accessible multilingual digital products.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: 'https://www.khurshedkhan.dev/',
    title: 'Khurshed Khan | Senior FinTech Frontend & Full-Stack Developer Dubai',
    description: 'Senior frontend and full-stack developer in Dubai specialising in scalable fintech platforms, real-time dashboards, secure AI integrations and accessible multilingual digital products.',
    siteName: 'Khurshed Khan Portfolio',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Khurshed Khan — Senior FinTech Frontend and Full-Stack Developer in Dubai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khurshed Khan | Senior FinTech Frontend & Full-Stack Developer Dubai',
    description: 'Senior frontend and full-stack developer in Dubai specialising in scalable fintech platforms, real-time dashboards, secure AI integrations and accessible multilingual digital products.',
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrains.variable} ${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} bg-editor text-zinc-200 antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <AIRecruiterChat />
        </ThemeProvider>
      </body>
    </html>
  )
}
