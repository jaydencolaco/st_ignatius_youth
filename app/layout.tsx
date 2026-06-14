import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Youth Ignited — St. Ignatius Church, Jacobs Circle',
  description:
    'Youth Ignited is the official youth group of St. Ignatius Church, Jacobs Circle, Mumbai. Be part of something that outlasts you.',
  generator: 'v0.app',
  keywords: ['Youth Ignited', 'St. Ignatius Church', 'Jacobs Circle', 'Mumbai', 'Catholic Youth'],
  openGraph: {
    title: 'Youth Ignited',
    description: 'Be part of something that outlasts you.',
    siteName: 'Youth Ignited',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#07090F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-[#07090F]`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#07090F] text-[#F0F4FF]">
        {children}
      </body>
    </html>
  )
}
