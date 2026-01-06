'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaCheckCircle } from 'react-icons/fa'
import { useUserType } from '@/contexts/UserTypeContext'

const Features = () => {
  const { userType } = useUserType()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Features for Parents/Students
  const parentFeatures = [
    // 1. SELF STUDY (01)
    {
      title: 'Self-Study Learning Cycle',
      subtitle: 'SmartLearners.ai makes students independent learners.',
      icon: '🔄',
      number: '01',
      videoPlaceholder: '/self study.mp4',
      benefits: [
        'Write exam/homework and upload it to SmartLearners.ai',
        'AI evaluates answers and shows mistakes, marks, and concepts needed',
        'Ask Chatbot for previous performance and remedial program',
        'Practice questions from weak chapters',
        'Get step-by-step solutions with concepts and videos',
        'Continue practicing more questions',
      ],
      whyItHelps: [
        '• No tuition needed',
        '• Real Understanding',
        '• Continuous improvement with personalized feedback'
      ],
      gradient: 'from-indigo-500 via-blue-500 to-sky-500',
      accentColor: 'indigo'
    },
    // 2. CHATBOT (02)
    {
      title: 'Smart AI Chatbot (24×7 Tutor)',
      subtitle: 'Students can ask anything, anytime:',
      icon: '🤖',
      number: '02',
      videoPlaceholder: '/feature-video-5.mp4',
      benefits: [
        'Check my homework',
        'Give exam analysis',
        'What are my weak areas?',
        'Give a remedial plan for these chapters',
        'Explain this concept with real examples',
        'Give step-by-step solution for this question'
      ],
      whyItHelps: 'A personal teacher available any time.',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      accentColor: 'violet'
    },
    // 3. AI-CORRECTION (03)
    {
      title: 'AI-Correction (Handwritten Answers)',
      subtitle: 'Students upload their handwritten answers directly. The AI instantly evaluates the response and provides:',
      icon: '✅',
      number: '03',
      videoPlaceholder: '/ai-correction-demo.mp4',
      benefits: [
        'Corrected solution with proper steps',
        'Instant marks',
        'Mistake identification (calculation / conceptual / presentation)',
        'Concepts required for the question',
        'Gap analysis showing exactly where they went wrong'
      ],
      whyItHelps: 'Instant learning — instant correction. No waiting for manual checking. Students improve faster with step-by-step feedback.',
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      accentColor: 'emerald'
    },
    // 4. EXAM CORRECTION (04)
    {
      title: 'Exam Correction (AI Auto-Evaluation)',
      subtitle: 'SmartLearners.ai completely automates exam correction.',
      icon: '✅',
      number: '04',
      videoPlaceholder: '/feature-video-1.mp4',
      benefits: [
        'Upload handwritten answer sheets',
        'AI reads every line',
        'Shows the exact line where the mistake happened',
        'Provides correct method + steps',
        'Shows marks scored, missed steps, and concepts to improve'
      ],
      whyItHelps: 'Students know exactly what went wrong — not just the final result.',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      accentColor: 'purple'
    },
    // 5. PARENTAL WHATSAPP (05)
    {
      title: 'WhatsApp Reports for Parents',
      subtitle: 'Parents can simply text on WhatsApp anytime, 24/7, and instantly view the child\'s complete performance.',
      icon: '📱',
      number: '05',
      videoPlaceholder: '/feature-video-2.mp4',
      benefits: [
        'Chapter-wise score',
        'Overall exam performance',
        'Weak concepts & areas to improve',
        'Exam-wise & homework-wise progress',
        'Marks and accuracy of homework & classwork'
      ],
      whyItHelps: 'No need to open the app — parents just send a WhatsApp message and get a clear, instant report of their child\'s progress.',
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      accentColor: 'blue'
    },
    // 6. EXAM MODE (06)
    {
      title: 'Exam Mode',
      subtitle: 'Real exam-level practice with complete performance analysis and personalized improvement plans.',
      icon: '🎓',
      number: '06',
      videoPlaceholder: '/exam-mode-demo.mp4',
      benefits: [
        'Real exam-level question experience',
        'Clear marks and performance breakdown',
        'Exact questions where marks were lost',
        'Identification of weak chapters and concepts',
        'Personalized day-wise improvement plan',
        'Right questions to practice at the right time',
        'Visual progress tracking after every practice',
        'Confidence to face the real exam'
      ],
      whyItHelps: 'Exam Mode delivers exam-ready practice by pinpointing mark loss and weak concepts, guiding focused revision with a personalized plan, and boosting exam confidence.',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      accentColor: 'orange'
    },
    // 7. WORKSHEETS & CUSTOM QUESTIONS (07)
    {
      title: 'Worksheets & Custom Questions',
      subtitle: 'Teachers can create their own questions and assignments inside SmartLearners.ai.',
      icon: '📝',
      number: '07',
      videoPlaceholder: '/feature-video-6.mp4',
      benefits: [
        'Create custom worksheets',
        'Assign for homework or classwork',
        'Students can also use these worksheets for extra practice'
      ],
      whyItHelps: 'Complete flexibility for teachers to customize learning materials according to their teaching style and student needs.',
      gradient: 'from-pink-500 via-rose-500 to-red-500',
      accentColor: 'pink'
    }
  ]

  // Features for Schools - Single combined feature
  const schoolFeatures = [
    {
      title: 'Assessment as a Service',
      subtitle: 'Complete solution for teachers and schools to automate exam evaluation and improve learning outcomes.',
      icon: '🏫',
      number: '01',
      videoPlaceholder: '/school-demo.mp4',
      benefits: [
        '👩‍🏫 What Teachers Get:',
        'Automatic exam correction',
        'Step-wise mistake identification',
        'Clear marks for every question',
        'Exact step where students lost marks',
        'Ready-to-use remedial guidance',
        '',
        '💡 How It Helps Schools:',
        'Saves hours of exam correction time',
        'Reduces teacher workload significantly',
        'Ensures fair and consistent evaluation',
        'Delivers clear academic insights',
        'Improves overall learning outcomes'
      ],
      whyItHelps: 'Transform your school\'s exam correction process with AI - save time, ensure accuracy, and improve student results.',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      accentColor: 'purple'
    }
  ]

  // Select features based on user type
  const carouselFeatures = userType === 'school' ? schoolFeatures : parentFeatures

  const nextFeature = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselFeatures.length)
  }

  const prevFeature = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselFeatures.length) % carouselFeatures.length)
  }

  const goToFeature = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1628] pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-bold text-white mb-6 text-5xl">
              Powerful <span className="gradient-text">Features</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {userType === 'school'
                ? 'Discover the comprehensive school management features that make Smart Learners.ai the most effective platform for educational institutions.'
                : 'Discover the advanced AI-powered features that make Smart Learners.ai the most effective learning platform for students.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Carousel Section */}
      <section className="relative overflow-hidden bg-[#0f172a] pt-4 pb-16">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className={`absolute inset-0 bg-gradient-to-br ${carouselFeatures[currentIndex].gradient} opacity-5 transition-all duration-1000`}></div>
          <motion.div
            className="absolute top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1.2, 1, 1.2]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                {/* Main Card Container */}
                <div className="bg-gradient-to-br from-[#1a1f3a] via-[#1a1f3a] to-[#0f1628] rounded-3xl shadow-2xl backdrop-blur-sm border-2 relative overflow-hidden p-8 lg:p-12"
                  style={{
                    borderImage: `linear-gradient(135deg, ${
                      currentIndex === 0 ? '#10b981, #14b8a6' :
                      currentIndex === 1 ? '#8b5cf6, #d946ef' :
                      currentIndex === 2 ? '#3b82f6, #8b5cf6' :
                      currentIndex === 3 ? '#a855f7, #ec4899' :
                      currentIndex === 4 ? '#6366f1, #0ea5e9' :
                      currentIndex === 5 ? '#f97316, #fbbf24' :
                      currentIndex === 6 ? '#22c55e, #06b6d4' :
                      '#ec4899, #ef4444'
                    }) 1`,
                    boxShadow: `0 20px 60px -15px ${
                      currentIndex === 0 ? 'rgba(16, 185, 129, 0.3)' :
                      currentIndex === 1 ? 'rgba(139, 92, 246, 0.3)' :
                      currentIndex === 2 ? 'rgba(59, 130, 246, 0.3)' :
                      currentIndex === 3 ? 'rgba(168, 85, 247, 0.3)' :
                      currentIndex === 4 ? 'rgba(99, 102, 241, 0.3)' :
                      currentIndex === 5 ? 'rgba(249, 115, 22, 0.3)' :
                      currentIndex === 6 ? 'rgba(34, 197, 94, 0.3)' :
                      'rgba(236, 72, 153, 0.3)'
                    }`
                  }}
                >
                  {/* Enhanced gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${carouselFeatures[currentIndex].gradient} opacity-[0.08] -z-10`}></div>

                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${carouselFeatures[currentIndex].gradient} opacity-20 rounded-bl-full blur-2xl`}></div>

                  {/* Bottom left accent */}
                  <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${carouselFeatures[currentIndex].gradient} opacity-15 rounded-tr-full blur-xl`}></div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Text Content */}
                    <div className="space-y-5">
                      <div>
                        <h2 className="font-bold text-white mb-2 leading-tight text-4xl">
                          {carouselFeatures[currentIndex].title}
                        </h2>
                      </div>

                      <p className="text-gray-300 leading-relaxed text-xl">
                        {carouselFeatures[currentIndex].subtitle}
                      </p>

                      <div className="space-y-3">
                        {carouselFeatures[currentIndex].benefits.map((benefit, idx) => {
                          // Check if it's a heading (contains emoji like 👩‍🏫 or 💡)
                          const isHeading = benefit.includes('👩‍🏫') || benefit.includes('💡');
                          // Skip empty strings
                          if (benefit === '') return null;

                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 + 0.3 }}
                              className={isHeading ? "mt-4 first:mt-0" : "flex items-start gap-3"}
                            >
                              {isHeading ? (
                                <span className="text-white text-xl font-bold">{benefit}</span>
                              ) : (
                                <>
                                  <FaCheckCircle
                                    className="flex-shrink-0 mt-1"
                                    style={{
                                      color: currentIndex === 0 ? '#10b981' :
                                        currentIndex === 1 ? '#8b5cf6' :
                                        currentIndex === 2 ? '#3b82f6' :
                                        currentIndex === 3 ? '#a855f7' :
                                        currentIndex === 4 ? '#6366f1' :
                                        currentIndex === 5 ? '#f97316' :
                                        currentIndex === 6 ? '#22c55e' :
                                        '#ec4899'
                                    }}
                                  />
                                  <span className="text-gray-300 text-lg">{benefit}</span>
                                </>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative rounded-xl border-l-4 shadow-md hover:shadow-xl transition-all duration-300 bg-[#0f1628]/50 p-6"
                        style={{
                          background: `linear-gradient(135deg, ${
                            currentIndex === 0 ? 'rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.05)' :
                            currentIndex === 1 ? 'rgba(139, 92, 246, 0.1), rgba(217, 70, 239, 0.05)' :
                            currentIndex === 2 ? 'rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05)' :
                            currentIndex === 3 ? 'rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.05)' :
                            currentIndex === 4 ? 'rgba(99, 102, 241, 0.1), rgba(14, 165, 233, 0.05)' :
                            currentIndex === 5 ? 'rgba(249, 115, 22, 0.1), rgba(251, 191, 36, 0.05)' :
                            currentIndex === 6 ? 'rgba(34, 197, 94, 0.1), rgba(6, 182, 212, 0.05)' :
                            'rgba(236, 72, 153, 0.1), rgba(239, 68, 68, 0.05)'
                          })`,
                          borderLeftColor: currentIndex === 0 ? '#10b981' :
                            currentIndex === 1 ? '#8b5cf6' :
                            currentIndex === 2 ? '#3b82f6' :
                            currentIndex === 3 ? '#a855f7' :
                            currentIndex === 4 ? '#6366f1' :
                            currentIndex === 5 ? '#f97316' :
                            currentIndex === 6 ? '#22c55e' :
                            '#ec4899'
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 rounded-lg bg-gradient-to-br ${carouselFeatures[currentIndex].gradient} flex items-center justify-center shadow-lg w-10 h-10`}>
                            <span className="text-white text-xl">💡</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-lg mb-2">How it helps:</h3>
                            <p className="text-gray-300 leading-relaxed">
                              {carouselFeatures[currentIndex].whyItHelps}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Side - Video/Animation Placeholder */}
                    <div className="relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="relative rounded-2xl shadow-xl border-2 p-6"
                        style={{
                          background: `linear-gradient(135deg, ${
                            currentIndex === 0 ? 'rgba(16, 185, 129, 0.05), rgba(20, 184, 166, 0.02)' :
                            currentIndex === 1 ? 'rgba(139, 92, 246, 0.05), rgba(217, 70, 239, 0.02)' :
                            currentIndex === 2 ? 'rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.02)' :
                            currentIndex === 3 ? 'rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.02)' :
                            currentIndex === 4 ? 'rgba(99, 102, 241, 0.05), rgba(14, 165, 233, 0.02)' :
                            currentIndex === 5 ? 'rgba(249, 115, 22, 0.05), rgba(251, 191, 36, 0.02)' :
                            currentIndex === 6 ? 'rgba(34, 197, 94, 0.05), rgba(6, 182, 212, 0.02)' :
                            'rgba(236, 72, 153, 0.05), rgba(239, 68, 68, 0.02)'
                          })`,
                          borderColor: currentIndex === 0 ? 'rgba(16, 185, 129, 0.2)' :
                            currentIndex === 1 ? 'rgba(139, 92, 246, 0.2)' :
                            currentIndex === 2 ? 'rgba(59, 130, 246, 0.2)' :
                            currentIndex === 3 ? 'rgba(168, 85, 247, 0.2)' :
                            currentIndex === 4 ? 'rgba(99, 102, 241, 0.2)' :
                            currentIndex === 5 ? 'rgba(249, 115, 22, 0.2)' :
                            currentIndex === 6 ? 'rgba(34, 197, 94, 0.2)' :
                            'rgba(236, 72, 153, 0.2)'
                        }}
                      >
                        {currentIndex === 0 ? (
                          // Actual video for Self-Study Learning Cycle feature (at index 0)
                          <div className="rounded-xl overflow-hidden">
                            <video
                              className="w-full h-auto rounded-xl"
                              style={{ maxHeight: '550px' }}
                              controls
                              autoPlay
                              muted
                              loop
                            >
                              <source src="/self study.mp4" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : currentIndex === 1 ? (
                          // Actual video for Smart AI Chatbot feature (at index 1)
                          <div className="rounded-xl overflow-hidden">
                            <video
                              className="w-full h-auto rounded-xl"
                              style={{ maxHeight: '550px' }}
                              controls
                              autoPlay
                              muted
                              loop
                            >
                              <source src="/chatbot-demo.mp4" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : currentIndex === 2 ? (
                          // Actual video for AI-Correction feature (at index 2)
                          <div className="rounded-xl overflow-hidden">
                            <video
                              className="w-full h-auto rounded-xl"
                              style={{ maxHeight: '550px' }}
                              controls
                              autoPlay
                              muted
                              loop
                            >
                              <source src="/ai-correction-demo.mp4" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : currentIndex === 3 ? (
                          // Actual video for Exam Correction feature (at index 3)
                          <div className="rounded-xl overflow-hidden">
                            <video
                              className="w-full h-auto rounded-xl"
                              style={{ maxHeight: '550px' }}
                              controls
                              autoPlay
                              muted
                              loop
                            >
                              <source src="/exam-correction-demo.mp4" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : currentIndex === 4 ? (
                          // Actual video for WhatsApp Reports for Parents feature (at index 4)
                          <div className="rounded-xl overflow-hidden">
                            <video
                              className="w-full h-auto rounded-xl"
                              style={{ maxHeight: '550px' }}
                              controls
                              autoPlay
                              muted
                              loop
                            >
                              <source src="/whatsapp-parental-demo.mp4" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : currentIndex === 5 && userType !== 'school' ? (
                          // Actual video for Exam Mode feature (at index 5 for parents)
                          <div className="rounded-xl overflow-hidden">
                            <video
                              className="w-full h-auto rounded-xl"
                              style={{ maxHeight: '550px' }}
                              controls
                              autoPlay
                              muted
                              loop
                            >
                              <source src="/exam-mode-demo.mp4" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : userType === 'school' ? (
                          // Actual video for School feature
                          <div className="rounded-xl overflow-hidden">
                            <video
                              className="w-full h-auto rounded-xl"
                              style={{ maxHeight: '550px' }}
                              controls
                              autoPlay
                              muted
                              loop
                            >
                              <source src="/school-demo.mp4" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : (
                          // Placeholder for other features
                          <div className="rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden aspect-video">
                            <div className="text-center">
                              <div className="text-6xl mb-4">🎥</div>
                              <p className="text-gray-600 font-medium">Video Demo Placeholder</p>
                              <p className="text-sm text-gray-500 mt-2">Add your video here</p>
                            </div>

                            {/* Animated shimmer effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{
                                x: ['-100%', '100%']
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            />
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Decorative shadow blob */}
                <div className={`absolute -bottom-8 -right-8 w-96 h-96 bg-gradient-to-br ${carouselFeatures[currentIndex].gradient} rounded-full blur-3xl opacity-10 -z-10`}></div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevFeature}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-20 bg-white/10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-full shadow-lg hover:bg-white/20 hover:shadow-2xl transition-all duration-300 z-10 group"
              aria-label="Previous feature"
            >
              <FaChevronLeft className="text-2xl group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={nextFeature}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-20 bg-white/10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-full shadow-lg hover:bg-white/20 hover:shadow-2xl transition-all duration-300 z-10 group"
              aria-label="Next feature"
            >
              <FaChevronRight className="text-2xl group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {carouselFeatures.map((_, index) => (
              <button
                key={index}
                onClick={() => goToFeature(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-white/40'
                    : 'w-3 h-3 bg-white/10 hover:bg-white/20'
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Features