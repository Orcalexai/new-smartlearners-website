import { Metadata } from 'next'
import Home from '@/components/pages/Home'

export const metadata: Metadata = {
  title: 'Home - AI-Powered Learning Platform for CBSE Students',
  description: 'Transform your academic journey with Smart Learners.ai. Experience personalized AI-powered education for CBSE NCERT Classes 6-12. Join 50,000+ students improving their scores.',
  keywords: ['CBSE online learning', 'NCERT solutions', 'AI education platform', 'personalized learning', 'Class 6-12 education', 'JEE preparation online', 'smart learning India'],
  alternates: {
    canonical: 'https://www.smartlearners.ai',
  },
}

export default function HomePage() {
  return <Home />
}               
