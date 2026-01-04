import { Metadata } from 'next'
import Privacy from '@/components/pages/Privacy'

export const metadata: Metadata = {
  title: 'Privacy Policy - How We Protect Your Data',
  description: 'Read Smart Learners.ai\'s comprehensive privacy policy. Learn how we collect, use, and protect your personal information while using our AI-powered learning platform.',
  keywords: ['privacy policy', 'data protection', 'student privacy', 'CBSE learning privacy', 'educational platform security'],
  alternates: {
    canonical: 'https://www.smartlearners.ai/privacy',
  },
}

export default function PrivacyPage() {
  return <Privacy />
}