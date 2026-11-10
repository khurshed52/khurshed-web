import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import AIRecruiterChat from "@/components/ai/AIRecruiterChat";
import { ThemeProvider } from "next-themes";

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
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
      <body className={`${jetbrains.variable} bg-editor text-zinc-200 antialiased`}>
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
