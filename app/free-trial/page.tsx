import { Metadata } from 'next'
import FreeTrialForm from '@/components/pages/FreeTrialForm'

export const metadata: Metadata = {
  title: 'Start Your Free Trial - Smart Learners AI',
  description: 'Experience Smart Learners AI-powered platform with a free trial. No payment required. Start learning today!',
  keywords: ['free trial', 'AI learning platform', 'NCERT solutions', 'online education', 'smart learning'],


}

export default function FreeTrialPage() {
  return <FreeTrialForm />
}