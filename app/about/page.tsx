import { Metadata } from 'next'
import About from '@/components/pages/About'

export const metadata: Metadata = {
  title: 'About Us - Our Mission to Transform Education',
  description: 'Learn about Smart Learners.ai\'s mission to revolutionize education through AI. Discover our story, values, and commitment to empowering 50,000+ CBSE students across India.',
  keywords: ['about Smart Learners', 'AI education mission', 'education technology India', 'CBSE learning platform story', 'edtech innovation'],
  alternates: {
    canonical: 'https://www.smartlearners.ai/about',
  },
}

export default function AboutPage() {
  return <About />
}