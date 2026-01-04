import { Metadata } from 'next'
import Refund from '@/components/pages/Refund'

export const metadata: Metadata = {
  title: 'Refund Policy - Money Back Guarantee',
  description: 'Learn about Smart Learners.ai\'s refund policy. Understand our money-back guarantee, refund eligibility, and process for our AI-powered learning courses and services.',
  keywords: ['refund policy', 'money back guarantee', 'course refund', 'CBSE course refund', 'educational service refund'],
  alternates: {
    canonical: 'https://www.smartlearners.ai/refund',
  },
}

export default function RefundPage() {
  return <Refund />
}