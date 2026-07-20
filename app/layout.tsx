import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Khurshed Khan | Developer Portfolio',
  description: 'A VS Code-inspired developer portfolio built with Next.js, Tailwind CSS and GSAP.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jetbrains.variable} bg-editor text-zinc-200 antialiased`}>{children}</body>
    </html>
  )
}
