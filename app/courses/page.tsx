import { Metadata } from 'next'
import Courses from '@/components/pages/Courses'

export const metadata: Metadata = {
  title: 'Courses - CBSE Mathematics, Physics & Chemistry Classes 6-12 & JEE',
  description: 'Comprehensive CBSE NCERT Mathematics, Physics & Chemistry courses for Classes 6-12 and JEE Mains preparation. Mathematics available now, Physics & Chemistry coming soon with AI-powered learning.',
  keywords: ['CBSE Mathematics online', 'NCERT Class 6-12', 'Physics Chemistry courses', 'JEE Mains preparation', 'Mathematics available now', 'CBSE science courses', 'online education India', 'AI learning platform'],
  alternates: {
    canonical: 'https://www.smartlearners.ai/courses',
  },
}

export default function CoursesPage() {
  return <Courses />
}