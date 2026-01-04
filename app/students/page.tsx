'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// 7 Powerful Features for Students - SIMPLE ENGLISH, BENEFIT FOCUSED
const powerfulFeatures = [
  {
    number: '1️⃣',
    title: 'AI SOLUTION',
    subtitle: 'Get Full Marks in Every Answer',
    icon: '📝',
    color: '#3b82f6',
    points: [
      'See how to write perfect answers step by step',
      'Learn what the examiner wants to see',
      'No more losing marks for missing steps',
      'Write like a topper writes',
    ],
    result: 'You know it? Now you will score it too.'
  },
  {
    number: '2️⃣',
    title: 'CONCEPTS REQUIRED',
    subtitle: 'Understand First, Then Solve',
    icon: '💡',
    color: '#a855f7',
    points: [
      'Hard topics made easy to understand',
      'Real examples from daily life',
      'Short videos (3-5 mins) explain everything',
      'Learn once, remember forever',
    ],
    result: 'No more rote learning. Real understanding.'
  },
  {
    number: '3️⃣',
    title: 'AI CORRECTION',
    subtitle: 'Best Feature',
    icon: '⭐',
    color: '#f59e0b',
    isHighlight: true,
    points: [
      'AI shows exactly where you made a mistake',
      'Tells you which concept you got wrong',
      'Shows the right way to solve it',
      'Helps you never repeat the same mistake',
      'Your marks go up by 15-20%',
    ],
    result: 'Same mistakes will not happen again. Ever.'
  },
  {
    number: '4️⃣',
    title: '24/7 AI CHATBOT',
    subtitle: 'Ask Doubts Anytime',
    icon: '🤖',
    color: '#22c55e',
    isHighlight: true,
    points: [
      'Got a doubt at night? Ask AI anytime',
      'AI explains in simple words you understand',
      'Ask any question - no one will judge you',
      'Get answers in seconds, not hours',
    ],
    result: 'Never get stuck on any problem again.'
  },
  {
    number: '5️⃣',
    title: 'PERFORMANCE ANALYSIS',
    subtitle: 'Know Your Weak Points',
    icon: '📊',
    color: '#ec4899',
    points: [
      'See which chapters need more practice',
      'Don\'t waste time on what you already know',
      'Track your progress every week',
      'Find out why you keep losing marks',
    ],
    result: 'Study less time. Get better marks.'
  },
  {
    number: '6️⃣',
    title: 'EXAM GUIDE',
    subtitle: '7 Days to Exam? No Problem!',
    icon: '🎯',
    color: '#ef4444',
    isHighlight: true,
    examPlan: [
      { day: 'Day 1', task: 'Find your weak chapters' },
      { day: 'Day 2-5', task: '30 mins daily - practice only weak topics' },
      { day: 'Day 6', task: 'Easy questions to build confidence' },
      { day: 'Day 7', task: 'Quick revision + exam tips' },
    ],
    result: 'Go to exam with full confidence.'
  },
  {
    number: '7️⃣',
    title: 'PARENT UPDATES',
    subtitle: 'Parents Stay Happy',
    icon: '📱',
    color: '#25D366',
    points: [
      'Parents can see your hard work',
      'No more "Did you study?" questions',
      'Show them real proof of your progress',
      'They support you more, nag you less',
    ],
    result: 'Study peacefully. Parents trust you.'
  },
]

// Student Daily Routine
const dailyRoutine = {
  morning: { time: '10 mins', task: 'Watch 1 short video on today\'s topic' },
  evening: { time: '30-40 mins', task: 'Read topic → Solve 5 questions → AI checks your answers → Fix mistakes → Ask doubts' },
  weekend: { task: 'Practice weak chapters with extra questions' },
  examWeek: { task: 'Follow 7-day plan → Feel ready for exam' },
}

// Motivational Quotes
const motivationalQuotes = [
  'Studying more hours doesn\'t help. Fixing your mistakes does.',
  'When you understand, you feel confident. When you just memorize, you feel scared.',
  'Every mistake is a chance to learn. Don\'t skip it.',
  'In just 7 days, you can go from scared to confident.',
]

export default function StudentsPage() {
  return (
    <div className="overflow-hidden">
      {/* ========== FLOATING BACKGROUND ========== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        <div className="absolute rounded-full" style={{ width: 400, height: 400, background: '#3b82f6', top: '10%', left: '-10%', filter: 'blur(80px)', opacity: 0.3 }} />
        <div className="absolute rounded-full" style={{ width: 300, height: 300, background: '#a855f7', top: '60%', right: '-5%', filter: 'blur(80px)', opacity: 0.3 }} />
        <div className="absolute rounded-full" style={{ width: 250, height: 250, background: '#f472b6', bottom: '10%', left: '30%', filter: 'blur(80px)', opacity: 0.3 }} />
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-32 pb-20">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="badge badge-primary mb-6">
              🎓 For Students
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Study Smart. <span className="gradient-text">Not Harder.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
              All you need to do well in exams — in ONE place.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              No confusion. No fear. Just clear understanding. 🎯
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
              <Link href="/free-trial" className="btn-primary text-lg px-8 py-4">Start Free Trial - 1 Month →</Link>
              <Link href="#features" className="btn-secondary text-lg px-8 py-4">See 7 Features</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 7 POWERFUL FEATURES ========== */}
      <section className="section-padding" id="features">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium mb-4">
              🔥 7 POWERFUL FEATURES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Everything You Need to <span className="gradient-text">Do Well in Exams</span>
            </h2>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6">
            {powerfulFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`glass-card p-6 md:p-8 ${feature.isHighlight ? 'border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-900/10 to-orange-900/10' : ''}`}
                style={{ borderLeft: feature.isHighlight ? undefined : `4px solid ${feature.color}` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${feature.color}20` }}
                  >
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{feature.number}</span>
                      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                      {feature.isHighlight && <span className="text-yellow-400 text-sm">⭐ Most Powerful</span>}
                    </div>
                    <p className="text-gray-400">{feature.subtitle}</p>
                  </div>
                </div>

                {/* Result - Highlighted Benefit at Top */}
                <div className="mb-4 p-4 rounded-xl border-2 text-base font-semibold bg-blue-500/20 border-blue-500/50">
                  <span className="text-lg">🎯</span> <span className="text-white">Result:</span> <span className="text-blue-400">{feature.result}</span>
                </div>

                {/* Points or Exam Plan */}
                {feature.examPlan ? (
                  <div className="space-y-2">
                    {feature.examPlan.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <span className="text-blue-400 font-bold min-w-[70px]">📅 {item.day}</span>
                        <span className="text-white">{item.task}</span>
                      </div>
                    ))}
                  </div>
                ) : feature.points && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {feature.points.map((point, i) => (
                      <div key={i} className="flex items-start gap-2 text-white">
                        <span className="text-blue-400">✅</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== YOUR DAY WITH SMARTLEARNERS ========== */}
      <section className="section-padding bg-white/[0.02]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              💪 Your Day With <span className="gradient-text">SmartLearners.ai</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-xl">🌅</div>
                <div>
                  <h3 className="font-bold text-white">Morning</h3>
                  <span className="text-yellow-400 text-sm">{dailyRoutine.morning.time}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{dailyRoutine.morning.task}</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">🌆</div>
                <div>
                  <h3 className="font-bold text-white">Evening</h3>
                  <span className="text-blue-400 text-sm">{dailyRoutine.evening.time}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{dailyRoutine.evening.task}</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl">📅</div>
                <h3 className="font-bold text-white">Weekend</h3>
              </div>
              <p className="text-gray-400 text-sm">{dailyRoutine.weekend.task}</p>
            </div>

            <div className="glass-card p-6 border border-green-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-xl">🎯</div>
                <h3 className="font-bold text-white">Week Before Exam</h3>
              </div>
              <p className="text-green-400 text-sm font-medium">{dailyRoutine.examWeek.task}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== REMEMBER THIS - Motivational ========== */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              🔥 <span className="gradient-text">REMEMBER THIS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {motivationalQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <p className="text-lg text-gray-300 italic">&quot;{quote}&quot;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL MESSAGE FOR STUDENTS ========== */}
      <section className="section-padding bg-white/[0.02]">
        <div className="container-custom">
          <div className="glass-card p-8 md:p-12 text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20 max-w-4xl mx-auto">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">One Last Thing...</h2>
            <p className="text-2xl text-gray-300 mb-6">
              &quot;You are not weak. You just didn&apos;t know where you went wrong.&quot;
            </p>
            <div className="max-w-xl mx-auto mb-8 space-y-2 text-left">
              <p className="text-gray-300">✅ You will understand topics <span className="text-blue-400 font-semibold">clearly</span></p>
              <p className="text-gray-300">✅ You will fix mistakes <span className="text-blue-400 font-semibold">right away</span></p>
              <p className="text-gray-300">✅ You will practice the <span className="text-blue-400 font-semibold">right way</span></p>
              <p className="text-gray-300">✅ You will see your <span className="text-blue-400 font-semibold">progress every week</span></p>
              <p className="text-gray-300">✅ You will go to exams feeling <span className="text-green-400 font-semibold">fully ready</span></p>
            </div>
            <p className="text-lg text-gray-400 mb-8">
              When you know <span className="text-white font-semibold">WHAT</span> to write, <span className="text-white font-semibold">HOW</span> to write it, and <span className="text-white font-semibold">WHY</span> it is correct —<br />
              <span className="text-green-400 font-semibold">Good marks will come. 📈</span>
            </p>
            <Link href="/free-trial" className="btn-primary text-lg px-8 py-4">Start Free Trial - 1 Month →</Link>
            <p className="text-sm text-gray-500 mt-4">
              ✅ No credit card needed • ✅ Use all features • ✅ Stop anytime
            </p>
            <p className="text-sm text-green-400 mt-2 font-medium">
              Start your journey to better marks today. 🚀
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
