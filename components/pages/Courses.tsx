'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const courses = [
  {
    category: 'CBSE',
    image: '/course-cbse.png',
    color: '#3b82f6',
    items: [
      { name: 'Class 6', subjects: 'Mathematics, Science, English', price: 200 },
      { name: 'Class 7', subjects: 'Mathematics, Science, English', price: 200 },
      { name: 'Class 8', subjects: 'Mathematics, Science, English', price: 200 },
      { name: 'Class 9', subjects: 'Mathematics, Science, English', price: 200 },
      { name: 'Class 10', subjects: 'Mathematics, Science, English', price: 200 },
      { name: 'Class 11', subjects: 'Mathematics,Physics, Chemistry, Biology', price: 300 },
      { name: 'Class 12', subjects: 'Mathematics,Physics, Chemistry, Biology', price: 300 },
    ]
  },
  {
    category: 'CBSE + JEE Foundation',
    image: '/course-jee-foundation.png',
    color: '#a855f7',
    items: [
      { name: 'Class 8 Foundation', price: '500', subjects: 'Mathematics' },
      { name: 'Class 9 Foundation', price: '500', subjects: 'Mathematics' },
      { name: 'Class 10 Foundation', price: '500', subjects: 'Mathematics' },
    ]
  },
  {
    category: 'JEE Mains',
    image: '/course-jee-mains.png',
    color: '#f59e0b',
    items: [
       { name: 'Class 11 & 12 JEE Mains', price: '800', subjects: 'Mathematics' },
    ]
  },
  {
    category: 'JEE Advanced',
    image: '/course-jee-advanced.png',
    color: '#ef4444',
    items: [
      { name: 'Class 11 & 12 JEE Advanced', price: '1000', subjects: 'Mathematics' },
    ]
  },
]

const subjects = [
  { name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600', chapters: '15+ Chapters' },
  { name: 'Science', icon: '🔬', color: 'from-green-500 to-green-600', chapters: '18+ Chapters' },
  { name: 'Physics', icon: '⚡', color: 'from-yellow-500 to-yellow-600', chapters: '14+ Chapters' },
  { name: 'Chemistry', icon: '🧪', color: 'from-purple-500 to-purple-600', chapters: '16+ Chapters' },
  { name: 'Biology', icon: '🧬', color: 'from-pink-500 to-pink-600', chapters: '12+ Chapters' },
  { name: 'English', icon: '📖', color: 'from-indigo-500 to-indigo-600', chapters: '10+ Chapters' },
]

const features = [
  { icon: '🎬', title: 'Video Lessons', desc: 'HD quality video tutorials by expert teachers' },
  { icon: '📝', title: 'Practice Tests', desc: 'Chapter-wise and full mock tests' },
  { icon: '🤖', title: 'AI Doubt Solving', desc: '24/7 AI chatbot for instant help' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Detailed analytics and reports' },
  { icon: '📱', title: 'Mobile Access', desc: 'Learn anywhere on any device' },
  { icon: '🏆', title: 'Certificates', desc: 'Get certified on completion' },
]

export default function Courses() {
  return (
    <div className="overflow-hidden">
      {/* ========== FLOATING BACKGROUND ========== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="floating-shape" style={{ width: 400, height: 400, background: '#3b82f6', top: '10%', left: '-10%' }} />
        <div className="floating-shape" style={{ width: 300, height: 300, background: '#a855f7', top: '60%', right: '-5%', animationDelay: '2s' }} />
        <div className="floating-shape" style={{ width: 250, height: 250, background: '#f472b6', bottom: '10%', left: '30%', animationDelay: '4s' }} />
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-32 pb-20">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="badge badge-primary mb-6"
            >
              📚 Our Courses
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
            >
              Complete Curriculum for{' '}
              <span className="gradient-text">Class 6-12</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }} 
              className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              <span className="text-blue-400 font-bold">CBSE</span>,{' '}
              <span className="text-purple-400 font-bold">JEE Foundation</span>,{' '}
              <span className="text-yellow-400 font-bold">JEE Mains</span> &{' '}
              <span className="text-red-400 font-bold">JEE Advanced</span> courses with AI-powered learning
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }} 
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/signup" className="btn-primary text-lg px-8 py-4">
                Enroll Now →
              </Link>
              <Link href="#courses" className="btn-secondary text-lg px-8 py-4">
                View All Courses
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

       {/* ========== PRICING COMPARISON ========== */}
      <section className="section-padding bg-white/[0.02]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-gray-400">One-time payment, lifetime access</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'CBSE Class 6-10', price: 200, color: '#3b82f6', features: ['All Subjects', 'Video Lessons', 'Practice Tests', 'AI Support'] },
              { name: 'CBSE Class 11-12', price: 300, color: '#3b82f6', features: ['All Subjects', 'Video Lessons', 'Practice Tests', 'AI Support'] },
              { name: 'JEE Mains', price: 800, color: '#f59e0b', features: ['PCM Complete', 'Mock Tests', 'AI Analysis', 'Doubt Support'], popular: true },
              { name: 'JEE Advanced', price: 1000, color: '#ef4444', features: ['Advanced Problems', 'Full Mock Tests', 'AI Remedial', 'Expert Support'] },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`glass-card p-6 relative ${plan.popular ? 'border-2' : ''}`}
                style={{ borderColor: plan.popular ? plan.color : 'transparent' }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span 
                      className="text-white text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: plan.color }}
                    >
                      POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold" style={{ color: plan.color }}>₹{plan.price}</span>
                    <span className="text-gray-500 text-sm">/one-time</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span style={{ color: plan.color }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/signup" 
                  className="btn-primary w-full text-center block"
                  style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)` }}
                >
                  Enroll Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      {/* <section className="py-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-y border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '50+', label: 'Courses' },
              { stat: '1000+', label: 'Video Lessons' },
              { stat: '10,000+', label: 'Practice Questions' },
              { stat: '100+', label: 'Mock Tests' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-3xl md:text-4xl font-bold gradient-text">{item.stat}</div>
                <div className="text-gray-400 text-sm mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ========== COURSES SECTION ========== */}
      <section className="section-padding" id="courses">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Choose Your <span className="gradient-text">Course</span>
            </h2>
            <p className="text-xl text-gray-400">Select from our comprehensive range of courses</p>
          </div>

          <div className="space-y-12">
            {courses.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0"
                    style={{ background: `${category.color}15` }}
                  >
                    <Image
                      src={category.image}
                      alt={category.category}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{category.category}</h3>
                    <p className="text-gray-500 text-sm">{category.items.length} courses available</p>
                  </div>
                </div>

                {/* Course Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.items.map((course, index) => (
                    <motion.div
                      key={course.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="glass-card p-6 hover-lift cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {course.name}
                        </h4>
                        <span 
                          className="text-lg font-bold"
                          style={{ color: category.color }}
                        >
                          ₹{course.price}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-4">{course.subjects}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">1 Month </span>
                        <Link 
                          href="/signup" 
                          className="text-sm font-semibold transition-colors"
                          style={{ color: category.color }}
                        >
                          Enroll →
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SUBJECTS COVERED ========== */}
      <section className="section-padding bg-white/[0.02]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Subjects <span className="gradient-text">Covered</span>
            </h2>
            <p className="text-xl text-gray-400">Comprehensive coverage of all subjects</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center hover-lift cursor-pointer"
                style={{ minWidth: '160px' }}
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-3xl mb-4`}>
                  {subject.icon}
                </div>
                <h3 className="font-semibold text-white mb-1">{subject.name}</h3>
                <p className="text-gray-500 text-xs">{subject.chapters}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT YOU GET ========== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              What You <span className="gradient-text">Get</span>
            </h2>
            <p className="text-xl text-gray-400">Every course includes these features</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover-lift"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     

      {/* ========== CTA SECTION ========== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="cta-gradient p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of students already excelling with SmartLearners.ai
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/signup" className="btn-primary text-lg px-8 py-4">
                  Get Started Free →
                </Link>
                <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}