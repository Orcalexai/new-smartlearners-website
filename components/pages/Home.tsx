'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useUserType } from '@/contexts/UserTypeContext'
import UserTypeSelection from '@/components/UserTypeSelection'

// The Real Problem - Parent Pain Points
const realProblems = [
  { icon: '❌', text: 'Studies 3 hours daily → Still makes same errors' },
  { icon: '❌', text: 'Expensive tuitions → No clarity on weak areas' },
  { icon: '❌', text: 'Parents don\'t know → Where exactly child is struggling' },
  { icon: '❌', text: 'Board exams coming → Rising panic, no plan' },
]

// What Parents Get - WhatsApp Updates
const whatsappFeatures = [
  'Chapter-wise performance weekly',
  'Exact weak concepts identified',
  'Improvement progress tracked',
  'Exam readiness score (60%? 90%?)',
]

// Traditional vs SmartLearners comparison
const comparisonData = {
  traditional: {
    features: [
      'Same mistakes again & again',
      'Parents don\'t know what\'s wrong',
      'Doubts stay unsolved',
      'Exam panic, no plan',
    ],
    result: 'Stress, low marks, frustration'
  },
  smart: {
    features: [
      'AI finds & fixes every mistake',
      'WhatsApp updates daily to parents',
      'Ask AI 24/7, instant answers',
      '7-day exam guide = Full confidence',
    ],
    result: 'Better marks, happy learning!'
  }
}

// 7-Day Exam Guide
const examGuide = [
  { day: 'Day 1', task: 'AI tests weak chapters' },
  { day: 'Day 2-5', task: 'Daily remedial plan (30 mins)' },
  { day: 'Day 6', task: 'Confidence practice' },
  { day: 'Day 7', task: 'Full revision + exam tips' },
]

// Parent Testimonials
const parentTestimonials = [
  {
    name: 'Mr. Patel',
    location: 'Bangalore',
    quote: 'Finally could see WHERE she was making mistakes.',
    result: 'Priya: 62% → 87% in Math (2 months)'
  },
  {
    name: 'Mrs. Reddy',
    location: 'Hyderabad',
    quote: '7-day plan gave him clarity. Confidence changed everything.',
    result: 'Arjun stopped exam panic'
  },
]


const testimonials = [
  { quote: "SmartLearners.ai transformed how I study. The AI tutor helped me improve my math scores by 40%!", name: 'Priya Sharma', role: 'Class 12 Student, Delhi' },
  { quote: "The analytics dashboard gives me insights I never had before. It's a game-changer for our institution.", name: 'Rajesh Kumar', role: 'Teacher, Hyderabad' },
  { quote: "My daughter loves the gamified approach. She actually asks to study now!", name: 'Anita Desai', role: 'Parent' },
]

export default function Home() {
  const { userType } = useUserType()

  // Determine content based on user type
  const isParent = userType === 'parent'
  const isSchool = userType === 'school'

  return (
    <div className="overflow-hidden">
      {/* ========== FLOATING BACKGROUND ========== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        <div className="absolute rounded-full" style={{ width: 400, height: 400, background: '#3b82f6', top: '10%', left: '-10%', filter: 'blur(80px)', opacity: 0.3 }} />
        <div className="absolute rounded-full" style={{ width: 300, height: 300, background: '#a855f7', top: '60%', right: '-5%', filter: 'blur(80px)', opacity: 0.3 }} />
        <div className="absolute rounded-full" style={{ width: 250, height: 250, background: '#f472b6', bottom: '10%', left: '30%', filter: 'blur(80px)', opacity: 0.3 }} />
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-20 pb-4">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {isParent ? (
              <>
                {/* Parent View Hero */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="badge badge-primary mb-8">
                  🎯 AI-Powered Learning for Class 6-12
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                  Your Child Studies Hard.<br />
                  <span className="gradient-text">Why Aren&apos;t the Marks Improving?</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
                  Because the <span className="text-red-400 font-semibold">same mistakes keep repeating</span>.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-lg text-gray-500 mb-6 max-w-2xl mx-auto">
                  Your child doesn&apos;t see them. Teachers don&apos;t catch them.<br />
                  <span className="text-blue-400 font-semibold">SmartLearners.ai does.</span>
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                  AI finds the exact mistake, explains why it&apos;s wrong, and makes sure it <span className="text-green-400 font-semibold">never happens again</span>.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex flex-wrap justify-center gap-4 mb-8">
                  <Link href="/free-trial" className="btn-primary text-lg px-8 py-4">Start Free Trial - 1 Month →</Link>
                  <Link href="/contact" className="btn-secondary text-lg px-8 py-4">Download Demo</Link>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-sm text-gray-500">
                  ✅ No credit card needed • CBSE Class 6-12 (All subjects) • 15-day money-back guarantee
                </motion.p>
              </>
            ) : isSchool ? (
              <>
                {/* School View Hero */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="badge badge-primary mb-8">
                  🏫 AI-Powered Platform for Schools
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                  Know Every Student&apos;s<br />
                  <span className="gradient-text">Weak Points Instantly</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
                  AI analyzes exams and shows you exactly where each student needs help.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                  Better results. Less guesswork. Happy parents.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4 mb-8">
                  <Link href="/schools" className="btn-primary text-lg px-8 py-4">See School Plans →</Link>
                  <Link href="/contact" className="btn-secondary text-lg px-8 py-4">Download Demo</Link>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-sm text-gray-500">
                  ✅ Used by 100+ schools • Easy setup • Full support
                </motion.p>
              </>
            ) : (
              <>
                {/* Default Hero - Main landing page */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="badge badge-primary mb-2">
                  🚀 AI-Powered Learning Platform for Class 6-12
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white leading-tight">
                  NO.1 Agentic AI <span className="gradient-text">All-in-One Educational Platform</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base text-gray-400 mb-4 max-w-2xl mx-auto">
                  Personalized <span className="text-blue-400 font-bold">CBSE</span> & <span className="text-purple-400 font-bold">JEE FOUNDATION</span> courses for Class 6-12.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-3 mb-2">
                  <Link href="/free-trial" className="btn-primary px-6 py-3">Start Free Trial →</Link>
                  <Link href="/contact" className="btn-secondary px-6 py-3">Download Demo</Link>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xs text-gray-500">
                  ✅ No credit card needed • CBSE Class 6-12 (All subjects) • 15-day money-back guarantee
                </motion.p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ========== USER TYPE SELECTION ========== */}
      {!userType && <UserTypeSelection />}

      {/* ========== CONTENT SECTIONS - Only show after user type is selected ========== */}
      {userType && (
        <>
          {/* ========== STATS BAR ========== */}
          <section className="py-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-y border-white/5">
            <div className="container-custom">
              <div className="flex flex-wrap justify-center gap-16 md:gap-24 lg:gap-32">
                {isParent ? (
                  <>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">50,000+</div>
                      <div className="text-gray-400 text-sm">Active Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">95%</div>
                      <div className="text-gray-400 text-sm">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
                      <div className="text-gray-400 text-sm">AI Tutor Available</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">10+ hrs</div>
                      <div className="text-gray-400 text-sm">Time Saved per Exam</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">99%</div>
                      <div className="text-gray-400 text-sm">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">200+</div>
                      <div className="text-gray-400 text-sm">Partner Schools</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* ========== FEATURES/BENEFITS SECTION ========== */}
          <section className="section-padding" id="features">
            <div className="container-custom">
              {isParent ? (
                <>
                  {/* THE REAL PROBLEM Section */}
                  <div className="mb-16">
                    <div className="text-center mb-10">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        THE <span className="text-red-400">REAL PROBLEM</span>
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
                      {realProblems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-gray-300">{item.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-xl text-blue-400 font-semibold">👉 SmartLearners.ai solves all of this.</p>
                    </div>
                  </div>

                  {/* TRADITIONAL vs SMARTLEARNERS Comparison */}
                  <div className="mb-16">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Traditional <span className="text-red-400">vs</span> <span className="gradient-text">SmartLearners.ai</span>
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                      {/* Traditional Card */}
                      <div className="glass-card p-6 border-red-500/20">
                        <div className="text-center mb-4">
                          <span className="inline-block px-4 py-2 rounded-full bg-red-500/10 text-red-400 font-bold">Traditional Learning</span>
                        </div>
                        {/* Result - Highlighted Benefit at Top */}
                        <div className="p-3 rounded-xl bg-red-500/20 border-2 border-red-500/40 mb-4">
                          <span className="text-red-400 font-bold">🎯 Result: </span>
                          <span className="text-red-300 font-medium">{comparisonData.traditional.result}</span>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
                          <div className="relative w-40 h-48 md:w-52 md:h-60 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src="/traditional-learning.png"
                              alt="Traditional learning struggles"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="space-y-2">
                            {comparisonData.traditional.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-red-500/5">
                                <span className="text-red-400 text-sm">❌</span>
                                <span className="text-gray-400 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* SmartLearners Card */}
                      <div className="glass-card p-6 border-green-500/20">
                        <div className="text-center mb-4">
                          <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 text-green-400 font-bold">SmartLearners.ai</span>
                        </div>
                        {/* Result - Highlighted Benefit at Top */}
                        <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 mb-4">
                          <span className="text-green-400 font-bold">🎯 Result: </span>
                          <span className="text-green-300">{comparisonData.smart.result}</span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                          <div className="space-y-2">
                            {comparisonData.smart.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-green-500/5">
                                <span className="text-green-400 text-sm">✅</span>
                                <span className="text-gray-300 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <div className="relative w-40 h-48 md:w-52 md:h-60 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src="/smart-learning.png"
                              alt="Smart learning with AI"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HOW IT WORKS - 3 Steps with Images */}
                  <div className="mb-16">
                    <div className="text-center mb-10">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        💡 HOW IT <span className="gradient-text">WORKS</span>
                      </h2>
                      <p className="text-gray-400">3 Simple Steps</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {[
                        { step: '1', title: 'Child practices', desc: 'Solves questions, writes answers', image: '/step-signup.png' },
                        { step: '2', title: 'AI finds mistakes', desc: 'Shows exact wrong line + concept gap', image: '/step-learn-ai.png' },
                        { step: '3', title: 'Learn & improve', desc: 'Step-by-step correction + progress tracked', image: '/step-track-progress.png' },
                      ].map((item, index) => (
                        <div key={index} className="glass-card p-6 text-center">
                          <div className="w-full h-32 mx-auto rounded-2xl overflow-hidden mb-4 relative">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-gray-300">Parents get WhatsApp update automatically. 📲</p>
                    </div>
                  </div>

                  {/* THE GAME-CHANGER - AI Correction */}
                  <div className="glass-card p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 mb-16">
                    <div className="text-center mb-8">
                      <div className="badge badge-primary mb-4">⭐ THE GAME-CHANGER FEATURE</div>
                      <h2 className="text-3xl font-bold text-white mb-2">AI CORRECTION</h2>
                      <p className="text-gray-400">Your child uploads handwritten answer. AI tells:</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {[
                        { image: '/ai-correction-1.png', text: 'Exact line where mistake started' },
                        { image: '/ai-correction-2.png', text: 'Which concept is wrong' },
                        { image: '/ai-correction-3.png', text: 'Correct method step-by-step' },
                        { image: '/ai-correction-4.png', text: 'How to never repeat it' },
                      ].map((item, index) => (
                        <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                          <div className="relative w-24 h-24 mx-auto mb-3">
                            <Image
                              src={item.image}
                              alt={item.text}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p className="text-gray-300 text-sm">{item.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-blue-400 font-semibold">This saves 2 hours of &quot;figuring out what went wrong.&quot;</p>
                    </div>
                  </div>

                  {/* EXAM WEEK - 7-Day Guide */}
                  <div className="mb-16">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        🎯 EXAM WEEK? <span className="gradient-text">NO PANIC.</span>
                      </h2>
                      <p className="text-gray-400">7-Day Exam Guide</p>
                    </div>
                    <div className="glass-card p-6 max-w-5xl mx-auto">
                      <div className="grid md:grid-cols-2 gap-6 items-center">
                        {/* Student studying image */}
                        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                          <Image
                            src="/student-exam-prep.png"
                            alt="Student preparing for exams"
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* 7-Day Guide content */}
                        <div>
                          <div className="space-y-3 mb-6">
                            {examGuide.map((item, index) => (
                              <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                                <span className="text-blue-400 font-bold min-w-[80px]">📅 {item.day}</span>
                                <span className="text-white">{item.task}</span>
                              </div>
                            ))}
                          </div>
                          <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                            <p className="text-green-400 font-bold">Result: Confidence 60% → 99% ✅</p>
                            <p className="text-gray-400 text-sm mt-1">Parents get daily WhatsApp updates on progress.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* REAL RESULTS - Testimonials */}
                  <div className="mb-16">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        📈 <span className="gradient-text">REAL RESULTS</span>
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {parentTestimonials.map((t, index) => (
                        <div key={index} className="glass-card p-6">
                          <div className="text-green-400 font-bold mb-3">&quot;{t.result}&quot;</div>
                          <p className="text-gray-300 italic mb-4">&quot;{t.quote}&quot;</p>
                          <p className="text-gray-500 text-sm">— {t.name}, {t.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PERSONALIZED LEARNING JOURNEY - Compact Card */}
                  <div className="glass-card p-6 mb-16">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src="/personalized-learning.png"
                          alt="Personalized Learning"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">Personalized Learning Journey</h3>
                        <p className="text-gray-400 text-sm">AI-powered CBSE & NCERT curriculum for Class 6-12. All subjects included.</p>
                      </div>
                      <Link href="/courses" className="btn-primary whitespace-nowrap">Explore Courses →</Link>
                    </div>
                  </div>

                  {/* WHAT YOUR CHILD GETS - Student Benefits */}
                  <div className="mb-16">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        🎓 What Your Child <span className="gradient-text">Gets</span>
                      </h2>
                      <p className="text-gray-400">Everything they need to succeed</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { icon: '📝', title: 'AI Solutions', desc: 'Step-by-step perfect answers for every question' },
                        { icon: '💡', title: 'Concept Videos', desc: '3-5 min videos that make hard topics easy' },
                        { icon: '🤖', title: '24/7 AI Chatbot', desc: 'Ask doubts anytime, get instant answers' },
                        { icon: '📊', title: 'Progress Tracking', desc: 'Know weak areas, focus on what matters' },
                      ].map((item, index) => (
                        <div key={index} className="glass-card p-5 text-center">
                          <div className="text-3xl mb-3">{item.icon}</div>
                          <h3 className="font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-6">
                      <Link href="/students" className="text-blue-400 hover:text-blue-300 font-medium">
                        See all 7 features for students →
                      </Link>
                    </div>
                  </div>


                  {/* WHAT YOU GET AS A PARENT - WhatsApp Section */}
                  <div className="glass-card p-8 bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-500/20 mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-2xl">📱</div>
                          <span className="text-green-400 font-bold text-lg">Real-Time WhatsApp Updates</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">What You Get as a Parent</h3>
                        <div className="space-y-3 mb-6">
                          {whatsappFeatures.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 text-gray-300">
                              <span className="text-green-400">✔️</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-400 italic">
                          No more guessing. You&apos;ll KNOW exactly where your child stands.
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="bg-[#075E54] rounded-t-xl p-3 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">🎓</div>
                          <div className="text-white text-sm font-medium">SmartLearners.ai</div>
                        </div>
                        <div className="bg-[#ECE5DD] p-3 rounded-b-xl space-y-2">
                          <div className="bg-white rounded-lg p-3 shadow-sm text-xs">
                            <p className="text-gray-800 font-medium">📊 Example Update</p>
                            <p className="text-gray-600 mt-1">&quot;Arjun practiced 5 questions today. 3 correct. 2 mistakes in Thermodynamics. Remedial plan sent.&quot;</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* JEE MAINS & ADVANCED Card */}
                  <div className="glass-card p-6 md:p-8 mb-16 bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/20">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium mb-4">
                          🚀 JEE Preparation
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          JEE Mains & Advanced
                        </h3>
                        <p className="text-gray-300 mb-4">
                          Complete preparation for India&apos;s toughest engineering entrance exams.
                        </p>
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-orange-400">✅</span>
                            <span>Physics, Chemistry & Mathematics</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-orange-400">✅</span>
                            <span>Previous year questions with AI solutions</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-orange-400">✅</span>
                            <span>Mock tests with detailed analysis</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-orange-400">✅</span>
                            <span>Personalized weak area improvement</span>
                          </div>
                        </div>
                        <Link href="/courses" className="btn-primary" style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}>
                          Explore JEE Courses →
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-4 text-center bg-white/5">
                          <div className="text-3xl mb-2">📐</div>
                          <div className="text-white font-bold">Mathematics</div>
                          <div className="text-gray-400 text-sm">All chapters covered</div>
                        </div>
                        <div className="glass-card p-4 text-center bg-white/5">
                          <div className="text-3xl mb-2">⚛️</div>
                          <div className="text-white font-bold">Physics</div>
                          <div className="text-gray-400 text-sm">Concept + Numericals</div>
                        </div>
                        <div className="glass-card p-4 text-center bg-white/5">
                          <div className="text-3xl mb-2">🧪</div>
                          <div className="text-white font-bold">Chemistry</div>
                          <div className="text-gray-400 text-sm">Organic + Inorganic</div>
                        </div>
                        <div className="glass-card p-4 text-center bg-white/5">
                          <div className="text-3xl mb-2">🎯</div>
                          <div className="text-white font-bold">Mock Tests</div>
                          <div className="text-gray-400 text-sm">JEE pattern</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* JEE FOUNDATION Card - Class 8-10 */}
                  <div className="glass-card p-6 md:p-8 mb-16 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium mb-4">
                          🌟 For Class 8-10
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          JEE Foundation
                        </h3>
                        <p className="text-gray-300 mb-4">
                          Build a strong foundation early. Start JEE preparation from Class 8 itself.
                        </p>
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-purple-400">✅</span>
                            <span>NCERT + JEE-level concepts together</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-purple-400">✅</span>
                            <span>Build problem-solving skills early</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-purple-400">✅</span>
                            <span>Smooth transition to Class 11 JEE prep</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="text-purple-400">✅</span>
                            <span>Competitive edge from the start</span>
                          </div>
                        </div>
                        <Link href="/courses" className="btn-primary" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>
                          Explore JEE Foundation →
                        </Link>
                      </div>
                      <div className="space-y-4">
                        <div className="glass-card p-4 bg-white/5">
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">📚</div>
                            <div>
                              <div className="text-white font-bold">Class 8</div>
                              <div className="text-gray-400 text-sm">Basic concepts + logical thinking</div>
                            </div>
                          </div>
                        </div>
                        <div className="glass-card p-4 bg-white/5">
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">📖</div>
                            <div>
                              <div className="text-white font-bold">Class 9</div>
                              <div className="text-gray-400 text-sm">Foundation concepts + problem solving</div>
                            </div>
                          </div>
                        </div>
                        <div className="glass-card p-4 bg-white/5">
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">🎓</div>
                            <div>
                              <div className="text-white font-bold">Class 10</div>
                              <div className="text-gray-400 text-sm">Advanced foundation + JEE readiness</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  {/* FINAL MESSAGE FOR PARENTS */}
                  <div className="glass-card p-8 md:p-12 text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20">
                    <div className="text-4xl mb-4">❤️</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Final Message for Parents</h2>
                    <p className="text-gray-300 text-lg mb-4">
                      You invest in school, tuition, and books.<br />
                      But one thing is missing:
                    </p>
                    <div className="max-w-xl mx-auto mb-6 space-y-2 text-center">
                      <p className="text-gray-300">✨ Someone who tracks <span className="text-blue-400 font-semibold">EVERY mistake</span>.</p>
                      <p className="text-gray-300">✨ Explains <span className="text-blue-400 font-semibold">WHY it happened</span>.</p>
                      <p className="text-gray-300">✨ Makes sure it <span className="text-green-400 font-semibold">NEVER repeats</span>.</p>
                    </div>
                    <p className="text-xl text-white font-semibold mb-6">That&apos;s SmartLearners.ai.</p>
                    <div className="text-gray-400 mb-8">
                      When your child knows: <span className="text-white">WHAT</span> to write, <span className="text-white">HOW</span> to write it, <span className="text-white">WHY</span> it&apos;s correct —<br />
                      <span className="text-green-400 font-semibold">Marks improve automatically. 📈</span>
                    </div>
                    <Link href="/free-trial" className="btn-primary text-lg px-8 py-4">Start Free Trial Now →</Link>
                    <p className="text-sm text-gray-500 mt-4">
                      ⏰ Limited: 500 students per batch (We limit for personalized AI tracking)
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* School View - Exam Correction Only */}
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">AI-Powered <span className="gradient-text">Exam Correction</span></h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">Upload exam papers. Get detailed analysis. Find student weak areas.</p>
                  </div>

                  {/* How Exam Correction Works */}
                  <div className="glass-card p-8 md:p-12 mb-12">
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="relative w-full h-56 mx-auto mb-4">
                          <Image
                            src="/how-it-works-1.png"
                            alt="Upload Answer Sheets"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Upload Answer Sheets</h4>
                        <p className="text-gray-400 text-sm">Scan or photo of student answer sheets</p>
                      </div>
                      <div className="text-center">
                        <div className="relative w-full h-56 mx-auto mb-4">
                          <Image
                            src="/how-it-works-2.png"
                            alt="AI Checks & Marks"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">AI Checks & Marks</h4>
                        <p className="text-gray-400 text-sm">AI reads answers and gives marks based on marking scheme</p>
                      </div>
                      <div className="text-center">
                        <div className="relative w-full h-56 mx-auto mb-4">
                          <Image
                            src="/how-it-works-3.png"
                            alt="Get Gap Report"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Get Gap Report</h4>
                        <p className="text-gray-400 text-sm">See which topics each student is weak in</p>
                      </div>
                    </div>
                  </div>

                  {/* What You Get */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">What You Get</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="glass-card p-6" style={{ borderLeft: '4px solid #a855f7' }}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">📝</div>
                          <h4 className="text-lg font-bold text-white">Auto Correction</h4>
                        </div>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li className="flex items-start gap-2"><span className="text-purple-400">✅</span>AI reads handwritten answers</li>
                          <li className="flex items-start gap-2"><span className="text-purple-400">✅</span>Marks given based on your marking scheme</li>
                          <li className="flex items-start gap-2"><span className="text-purple-400">✅</span>Saves teacher time</li>
                        </ul>
                      </div>
                      <div className="glass-card p-6" style={{ borderLeft: '4px solid #ec4899' }}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-2xl">📊</div>
                          <h4 className="text-lg font-bold text-white">Gap Analysis Report</h4>
                        </div>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li className="flex items-start gap-2"><span className="text-pink-400">✅</span>Student-wise weak topics</li>
                          <li className="flex items-start gap-2"><span className="text-pink-400">✅</span>Class-wise common mistakes</li>
                          <li className="flex items-start gap-2"><span className="text-pink-400">✅</span>Chapter-wise performance</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="glass-card p-8 md:p-12 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20 mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Schools Use This</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-3xl mb-2">⏱️</div>
                        <h4 className="font-bold text-white mb-1">Save Time</h4>
                        <p className="text-gray-400 text-sm">Teachers spend less time on paper checking</p>
                      </div>
                      <div>
                        <div className="text-3xl mb-2">🎯</div>
                        <h4 className="font-bold text-white mb-1">Find Weak Areas</h4>
                        <p className="text-gray-400 text-sm">Know exactly where each student needs help</p>
                      </div>
                      <div>
                        <div className="text-3xl mb-2">📈</div>
                        <h4 className="font-bold text-white mb-1">Improve Results</h4>
                        <p className="text-gray-400 text-sm">Focus on gaps, get better board results</p>
                      </div>
                    </div>
                  </div>

                  {/* School CTA */}
                  <div className="glass-card p-8 md:p-12 text-center">
                    <div className="text-4xl mb-4">🏫</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Want to Try Exam Correction?</h2>
                    <p className="text-gray-300 text-lg mb-6">
                      Download a free demo and see how it works for your school
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                      <Link href="/contact" className="btn-primary text-lg px-8 py-4" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>Download Demo →</Link>
                      <Link href="/schools" className="btn-secondary text-lg px-8 py-4">See Pricing</Link>
                    </div>
                    <p className="text-sm text-gray-500">
                      ✅ Free demo • ✅ Easy to use • ✅ Works with any exam
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* ========== TESTIMONIALS ========== */}
          <section className="section-padding">
            <div className="container-custom">
              {isParent ? (
                <>
                  {/* Parent Testimonials - What parents say */}
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Parents <span className="gradient-text">Love Us</span></h2>
                    <p className="text-xl text-gray-400">Join thousands of happy parents</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        quote: "My son went from failing to topping his class. The daily WhatsApp reports keep me informed without nagging him!",
                        name: 'Sunita Verma',
                        role: 'Mother of Class 10 Student',
                        improvement: '45% → 88%'
                      },
                      {
                        quote: "Better than ₹5000/month tuition! My daughter actually understands concepts now. The AI explains things so clearly.",
                        name: 'Rajesh Kumar',
                        role: 'Father of Class 8 Student',
                        improvement: '52% → 85%'
                      },
                      {
                        quote: "Finally, I know what my child is actually studying. The weak area alerts helped us focus on what matters.",
                        name: 'Priya Mehta',
                        role: 'Mother of Class 7 Student',
                        improvement: '60% → 92%'
                      },
                    ].map((t) => (
                      <div key={t.name} className="glass-card p-6 hover-lift">
                        <div className="flex justify-between items-start mb-4">
                          <div className="text-3xl text-blue-400">&quot;</div>
                          <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-bold">
                            {t.improvement}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-6 italic leading-relaxed">{t.quote}</p>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-white">{t.name}</div>
                            <div className="text-gray-500 text-sm">{t.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* School Testimonials */}
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Loved by Learners & Educators</h2>
                    <p className="text-xl text-gray-400">See what our community has to say</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                      <div key={t.name} className="glass-card p-6 hover-lift">
                        <div className="text-3xl text-blue-400 mb-4">&quot;</div>
                        <p className="text-gray-300 mb-6 italic leading-relaxed">{t.quote}</p>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-white">{t.name}</div>
                            <div className="text-gray-500 text-sm">{t.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* ========== SCHOOL SUBSCRIPTION PLANS - Only for School View ========== */}
          {!isParent && (
            <section className="section-padding" id="pricing">
              <div className="container-custom">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="glass-card p-8 md:p-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl mb-6">📊</div>
                        <h3 className="text-3xl font-bold text-white mb-4">Exam Analysis & Gap Assessment</h3>
                        <p className="text-gray-400 mb-6">Comprehensive exam analysis system to identify learning gaps and improve student performance with AI-powered insights.</p>
                        <ul className="space-y-3 mb-8">
                          {['Detailed exam performance reports', 'Chapter-wise gap analysis', 'Student strength & weakness mapping', 'Class & section comparison analytics', 'Personalized improvement recommendations'].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-gray-300">
                              <span className="text-purple-400">✓</span> {item}
                            </li>
                          ))}
                        </ul>
                        <Link href="/schools" className="btn-primary" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>Learn More →</Link>
                      </div>
                      <div className="glass-card p-8">
                        <div className="text-center mb-6">
                          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">School Plans</span>
                        </div>
                        <div className="space-y-3 mb-8">
                          {[
                            { range: 'Up to 500 students', price: '₹199/student/year' },
                            { range: '500 - 2,000 students', price: '₹149/student/year' },
                            { range: '2,000+ students', price: 'Custom pricing' },
                          ].map((tier) => (
                            <div key={tier.range} className="flex justify-between p-4 rounded-xl bg-white/5">
                              <span className="text-gray-400">{tier.range}</span>
                              <span className="font-semibold text-white">{tier.price}</span>
                            </div>
                          ))}
                        </div>
                        <Link href="/contact" className="btn-primary w-full text-center block" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>Get Free Demo</Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* ========== CTA SECTION ========== */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="cta-gradient p-12 md:p-16 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Learning?</h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of students and schools already using SmartLearners.ai</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {isParent ? (
                      <>
                        <Link href="/signup" className="btn-primary text-lg px-8 py-4">Get Started Free</Link>
                        <Link href="/contact" className="btn-secondary text-lg px-8 py-4">Download Demo</Link>
                      </>
                    ) : (
                      <>
                        <Link href="/contact" className="btn-primary text-lg px-8 py-4" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>Download Demo</Link>
                        <Link href="/schools" className="btn-secondary text-lg px-8 py-4">Learn More</Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}