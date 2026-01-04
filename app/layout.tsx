import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { UserTypeProvider } from '@/contexts/UserTypeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://smartlearners.ai'),
  title: {
    default: 'Smart Learners.ai - AI-Powered Learning Platform for CBSE Students',
    template: '%s | Smart Learners.ai'
  },
  description: 'Experience personalized education with AI-powered learning for CBSE NCERT students. Master Classes 6-12 with adaptive learning, smart gap analysis, and achievement certificates.',
  keywords: ['CBSE learning', 'NCERT solutions', 'AI education', 'online learning platform', 'Class 6-12', 'JEE preparation', 'personalized learning', 'smart education', 'Indian education'],
  authors: [{ name: 'Smart Learners.ai' }],
  creator: 'Smart Learners.ai',
  publisher: 'Smart Learners.ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.jpg' },
      { url: '/favicon.ico' }
    ],
    apple: '/apple-icon.jpg',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Smart Learners.ai - AI-Powered Learning Platform',
    description: 'Experience personalized education with AI-powered learning for CBSE NCERT students.',
    url: 'https://smartlearners.ai',
    siteName: 'Smart Learners.ai',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Learners.ai - AI-Powered Learning Platform',
    description: 'Experience personalized education with AI-powered learning for CBSE NCERT students.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserTypeProvider>
          <div className="min-h-screen flex flex-col relative">
            <Navbar />
            <main className="flex-grow relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </UserTypeProvider>
      </body>
    </html>
  )
}