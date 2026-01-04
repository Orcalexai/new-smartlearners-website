'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const howItWorks = [
  {
    step: '01',
    title: 'Upload Question Paper',
    desc: 'Teacher uploads the question paper with marking scheme and correct answers.',
    icon: '📄',
    color: '#3b82f6',
    image: '/upload-question.png'
  },
  {
    step: '02',
    title: 'Upload Answer Sheets',
    desc: 'Upload bundled scanned answer sheets of all students in one go.',
    icon: '📚',
    color: '#a855f7',
    image: '/upload-answers.png'
  },
  {
    step: '03',
    title: 'AI Corrects & Analyzes',
    desc: 'Our AI automatically corrects all answer sheets and identifies mistakes.',
    icon: '🤖',
    color: '#f472b6',
    image: '/ai-corrects.png'
  },
  {
    step: '04',
    title: 'Get Detailed Reports',
    desc: 'View student-wise and question-wise analysis with actionable insights.',
    icon: '📊',
    color: '#34d399',
    image: '/detailed-reports.png'
  },
]

const studentWiseFeatures = [
  { icon: '📝', title: 'Individual Score', desc: 'Total marks obtained by each student' },
  { icon: '❌', title: 'Mistakes Highlighted', desc: 'Exact questions where student went wrong' },
  { icon: '📈', title: 'Performance Grade', desc: 'Grade and percentile ranking' },
  { icon: '💡', title: 'Improvement Tips', desc: 'Personalized suggestions for each student' },
  { icon: '📋', title: 'Detailed Breakdown', desc: 'Section-wise and topic-wise analysis' },
  { icon: '📤', title: 'Shareable Report', desc: 'Download and share with parents' },
]

const questionWiseFeatures = [
  { icon: '📊', title: 'Success Rate', desc: 'How many students got each question right' },
  { icon: '🎯', title: 'Difficulty Level', desc: 'Identify which questions were hardest' },
  { icon: '❓', title: 'Common Mistakes', desc: 'Most frequent wrong answers per question' },
  { icon: '📚', title: 'Topic Mapping', desc: 'Link questions to syllabus topics' },
  { icon: '⚠️', title: 'Problem Areas', desc: 'Topics that need more teaching focus' },
  { icon: '📉', title: 'Class Average', desc: 'Average marks per question across class' },
]


export default function SchoolsPage() {
  return (
    <div className="overflow-hidden">
      {/* ========== FLOATING BACKGROUND ========== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="floating-shape" style={{ width: 400, height: 400, background: '#a855f7', top: '10%', right: '-10%' }} />
        <div className="floating-shape" style={{ width: 300, height: 300, background: '#3b82f6', top: '60%', left: '-5%', animationDelay: '2s' }} />
        <div className="floating-shape" style={{ width: 250, height: 250, background: '#f472b6', bottom: '10%', right: '30%', animationDelay: '4s' }} />
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-32 pb-20">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="badge badge-secondary mb-6">
              🏫 For Schools (B2B)
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              AI-Powered <span className="gradient-text">Exam Analysis</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Upload question papers and answer sheets. Our AI corrects them instantly and shows exactly where each student made mistakes — <span className="text-purple-400 font-semibold">Student-wise</span> and <span className="text-blue-400 font-semibold">Question-wise</span> analysis.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
                Download Demo →
              </Link>
              <Link href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
                See How It Works
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      
      {/* ========== HOW IT WORKS ========== */}
      <section className="section-padding" id="how-it-works">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It <span className="gradient-text">Works</span></h2>
            <p className="text-xl text-gray-400">Simple 4-step process to analyze your exams</p>
          </div>

          <div className="space-y-12">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: `${item.color}20` }}
                    >
                      {item.icon}
                    </div>
                    <div 
                      className="text-sm font-bold px-3 py-1 rounded-full"
                      style={{ background: `${item.color}20`, color: item.color }}
                    >
                      STEP {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="glass-card p-2 overflow-hidden">
                    <div className="relative w-full h-72 md:h-80 lg:h-96">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STUDENT-WISE ANALYSIS ========== */}
      <section className="section-padding bg-white/[0.02]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge badge-primary mb-4">👨‍🎓 Student-Wise Analysis</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                See Where Each <span className="gradient-text">Student Went Wrong</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Get detailed individual reports for every student. Know exactly which questions they got wrong, why they made mistakes, and how they can improve.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {studentWiseFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-lg flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                      <p className="text-gray-500 text-xs">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Sample Student Report Visual */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Sample Student Report</h3>
                <span className="text-xs text-gray-500">PDF Exportable</span>
              </div>
              
              {/* Mock Student Card */}
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl">
                    👨‍🎓
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Rahul Sharma</h4>
                    <p className="text-gray-500 text-sm">Class 10-A | Roll No: 15</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-2xl font-bold text-green-400">78/100</div>
                    <p className="text-gray-500 text-xs">Score</p>
                  </div>
                </div>
                
                {/* Questions Analysis */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-400">Q1, Q2, Q3, Q5, Q7, Q8, Q10</span>
                    <span className="text-green-400 ml-auto">Correct</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-400">✗</span>
                    <span className="text-gray-400">Q4, Q6, Q9</span>
                    <span className="text-red-400 ml-auto">Wrong</span>
                  </div>
                </div>
              </div>
              
              {/* Mistakes Detail */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Mistakes Analysis:</h4>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">Q4:</span>
                    <div>
                      <p className="text-gray-300 text-sm">Trigonometry - Sin/Cos confusion</p>
                      <p className="text-gray-500 text-xs mt-1">Student wrote sin(30°) = 1/2 instead of cos(60°)</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">Q6:</span>
                    <div>
                      <p className="text-gray-300 text-sm">Algebra - Sign error</p>
                      <p className="text-gray-500 text-xs mt-1">Calculation mistake in step 3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== QUESTION-WISE ANALYSIS ========== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Sample Question Report Visual */}
            <div className="glass-card p-6 lg:order-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Question-Wise Report</h3>
                <span className="text-xs text-gray-500">Class Overview</span>
              </div>
              
              {/* Question Stats */}
              <div className="space-y-4">
                {[
                  { q: 'Q1', correct: 45, wrong: 5, total: 50, topic: 'Algebra Basics', difficulty: 'Easy' },
                  { q: 'Q4', correct: 20, wrong: 30, total: 50, topic: 'Trigonometry', difficulty: 'Hard' },
                  { q: 'Q6', correct: 25, wrong: 25, total: 50, topic: 'Quadratic Eq.', difficulty: 'Medium' },
                  { q: 'Q9', correct: 15, wrong: 35, total: 50, topic: 'Geometry', difficulty: 'Hard' },
                ].map((item) => (
                  <div key={item.q} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white">{item.q}</span>
                        <span className="text-gray-400 text-sm">{item.topic}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        item.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {item.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                          style={{ width: `${(item.correct / item.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400">{item.correct}/{item.total}</span>
                    </div>
                    {item.wrong > item.correct && (
                      <p className="text-red-400 text-xs mt-2">⚠️ Most students struggled with this question</p>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Common Mistakes */}
              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <h4 className="text-sm font-semibold text-purple-400 mb-2">🎯 Teaching Focus Areas</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Trigonometry concepts need revision</li>
                  <li>• Geometry theorems require more practice</li>
                  <li>• Sign errors in algebra are common</li>
                </ul>
              </div>
            </div>

            <div className="lg:order-2">
              <div className="badge badge-secondary mb-4">📊 Question-Wise Analysis</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Identify <span className="gradient-text">Problem Questions</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                See which questions the class struggled with most. Identify topics that need more teaching focus and common mistakes across all students.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {questionWiseFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-lg flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                      <p className="text-gray-500 text-xs">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT TEACHERS UPLOAD ========== */}
      <section className="section-padding bg-white/[0.02]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Teachers <span className="gradient-text">Upload</span></h2>
            <p className="text-xl text-gray-400">Simple upload process for instant results</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Question Paper Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center hover-lift"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-500/20 flex items-center justify-center text-4xl mb-6">
                📄
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Question Paper</h3>
              <p className="text-gray-400 mb-4">Upload the question paper with:</p>
              <ul className="text-left space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> All questions clearly visible
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> Marking scheme (marks per question)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> Correct answers / Answer key
                </li>
              </ul>
              <div className="mt-6 p-3 bg-blue-500/10 rounded-lg">
                <p className="text-blue-400 text-sm">Formats: PDF, JPG, PNG</p>
              </div>
            </motion.div>

            {/* Answer Sheets Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center hover-lift"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-500/20 flex items-center justify-center text-4xl mb-6">
                📚
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Answer Sheets Bundle</h3>
              <p className="text-gray-400 mb-4">Upload scanned answer sheets:</p>
              <ul className="text-left space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> All students&apos; sheets in one PDF
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Or upload individual files
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Student name/roll on each sheet
                </li>
              </ul>
              <div className="mt-6 p-3 bg-purple-500/10 rounded-lg">
                <p className="text-purple-400 text-sm">Bulk upload up to 500 sheets</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== AI ANALYSIS VISUAL ========== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl mb-6 animate-pulse">
                🤖
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                AI Does the <span className="gradient-text">Heavy Lifting</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Our AI reads handwritten answers, compares with the answer key, and generates detailed analysis reports in minutes.
              </p>
              
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="glass-card p-4">
                  <div className="text-2xl mb-2">📖</div>
                  <div className="text-white font-semibold">Reads</div>
                  <div className="text-gray-500 text-xs">Handwriting</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-2xl mb-2">⚖️</div>
                  <div className="text-white font-semibold">Compares</div>
                  <div className="text-gray-500 text-xs">With Answer Key</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-white font-semibold">Generates</div>
                  <div className="text-gray-500 text-xs">Reports</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="cta-gradient p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Exam Analysis?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Schedule a demo to see how our AI can save teachers 10+ hours per exam and provide actionable insights.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
                  Schedule Free Demo
                </Link>
                <a href="tel:+919963885782" className="btn-secondary text-lg px-8 py-4">
                  📞 Call: +91 9963885782
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}