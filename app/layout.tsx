import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Syed Rauhan Ali — Senior Full Stack & Blockchain Engineer',
  description: 'Senior Full Stack & Blockchain Engineer specializing in scalable systems, DeFi protocols, and Web3 infrastructure. Available for high-impact projects.',
  icons: {
    icon: '/rauhan.png',
    apple: '/rauhan.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
          defer
        />
      </head>
      <body suppressHydrationWarning style={{ fontFamily: "'Inter', sans-serif", background: '#020408', color: '#e8f4ff' }}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
