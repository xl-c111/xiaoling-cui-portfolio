import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ClientEffects } from '@/components/client-effects'
import { Navigation } from '@/components/navigation'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://xiaoling-cui-portfolio.vercel.app'),
  title: 'Xiaoling Cui | Software Engineer',
  description: 'Full-stack software engineer specializing in AI integrations, scalable systems, and polished user experiences.',
  generator: 'portfolio',
  icons: {
    icon: {
      url: '/icon.svg',
      type: 'image/svg+xml',
    },
  },
  openGraph: {
    title: 'Xiaoling Cui | Software Engineer',
    description: 'Explore Xiaoling Cui’s portfolio of AI-powered products, full-stack platforms, and DevOps workflows.',
    url: 'https://xiaoling-cui-portfolio.vercel.app',
    siteName: 'Xiaoling Cui Portfolio',
    images: [
      {
        url: '/hero.jpg',
        width: 1600,
        height: 900,
        alt: 'Xiaoling Cui portfolio hero image',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xiaoling Cui | Software Engineer',
    description: 'Full-stack engineer building high-impact AI, healthcare, and marketplace solutions.',
    images: ['/hero.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Navigation />
        <ClientEffects />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: '1.5rem',
              overflow: 'hidden',
              padding: 0,
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
            },
          }}
        />
        <div className="content-perspective">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  )
}
