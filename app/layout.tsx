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
  title: 'Khurshed Khan | Senior Frontend Developer',
  description: 'Cinematic portfolio of Khurshed Khan, a Senior Frontend Developer in Dubai building real-time FinTech, government and AI-enabled products.',
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
