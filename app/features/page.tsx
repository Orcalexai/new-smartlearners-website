import { Metadata } from 'next'
import Features from '@/components/pages/Features'

export const metadata: Metadata = {
  title: 'Features - AI-Powered Learning Tools & Benefits',
  description: 'Discover Smart Learners.ai\'s innovative features: AI-powered personalization, smart gap analysis, instant feedback, adaptive learning paths, and achievement certificates for students.',
  keywords: ['AI learning features', 'personalized education tools', 'smart gap analysis', 'adaptive learning', 'CBSE study features', 'educational technology'],
  alternates: {
    canonical: 'https://www.smartlearners.ai/features',
  },
}

export default function FeaturesPage() {
  return <Features />
}