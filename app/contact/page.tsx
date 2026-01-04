import { Metadata } from 'next'
import Contact from '@/components/pages/Contact'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Smart Learners.ai',
  description: 'Contact Smart Learners.ai for queries about our AI-powered learning platform. Get support for CBSE NCERT courses, technical assistance, or partnership opportunities.',
  keywords: ['contact Smart Learners', 'education support', 'CBSE learning help', 'customer service', 'edtech contact India'],
  alternates: {
    canonical: 'https://www.smartlearners.ai/contact',
  },
} 

export default function ContactPage() {
  return <Contact />
}