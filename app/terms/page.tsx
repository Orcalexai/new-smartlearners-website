import { Metadata } from 'next'
import Terms from '@/components/pages/Terms'

export const metadata: Metadata = {
  title: 'Terms & Conditions - Service Agreement',
  description: 'Read Smart Learners.ai\'s terms and conditions. Understand your rights and responsibilities when using our AI-powered CBSE learning platform and educational services.',
  keywords: ['terms and conditions', 'service agreement', 'user agreement', 'CBSE platform terms', 'educational service terms'],
  alternates: {
    canonical: 'https://www.smartlearners.ai/terms',
  },
}

export default function TermsPage() {
  return <Terms />
}