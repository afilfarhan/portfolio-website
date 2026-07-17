import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import StarfieldBackground from '@/app/components/StarfieldBackgroundClient'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mohammed Afil Farhan — AI & ML Specialist · Data Engineer',
  description:
    'AI Engineer and Machine Learning specialist (MSc AI, Heriot-Watt University) building production-grade multi-agent systems, RAG pipelines, and full-stack AI applications. Based in Riyadh, Saudi Arabia.',
  generator: 'v0.app',
  openGraph: {
    title: 'Mohammed Afil Farhan — AI & ML Specialist · Data Engineer',
    description:
      'Production multi-agent LLM systems, RAG pipelines, and full-stack AI applications. MSc Artificial Intelligence, Heriot-Watt University.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
width: 'device-width',
initialScale: 1,
maximumScale: 5,
colorScheme: 'dark',
themeColor: '#0A0A0F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background dark ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <StarfieldBackground />
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
