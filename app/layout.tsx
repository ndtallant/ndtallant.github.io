import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { SiteShell } from './components/site-shell'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/raleway/600.css'
import '@fontsource/raleway/700.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import { baseUrl } from './sitemap'

const description = 'Nick Tallant is a software engineer and civic technologist building tools and systems for social good.'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: 'Nick Tallant', template: '%s | Nick Tallant' },
  description,
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'Nick Tallant', description, url: baseUrl,
    siteName: 'Nick Tallant', locale: 'en_US', type: 'website',
  },
  alternates: { types: { 'application/rss+xml': '/rss' } },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
