'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useUserType } from '@/contexts/UserTypeContext'

export default function UserTypeSelection() {
  const { setUserType } = useUserType()

  const handleSelection = (type: 'parent' | 'school') => {
    setUserType(type)
    // Scroll to top after selection to show the hero first
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="py-4 relative">
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-1 text-white">
              Are you a <span className="gradient-text">Parent</span> or <span className="gradient-text">School Management</span>?
            </h2>
            <p className="text-sm text-gray-400">
              Select the option that best describes you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* Parent / Student Option */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => handleSelection('parent')}
              className="cursor-pointer group relative overflow-hidden rounded-xl border-2 border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #0c1929 0%, #0a1628 50%, #061020 100%)' }}
            >
              <div className="relative z-10 p-4">
                {/* Image Container */}
                <div className="w-full h-28 md:h-32 relative mb-3 rounded-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="/parent-student.png"
                    alt="Parent and Student"
                    fill
                    className="object-contain"
                  />
                </div>

                <h2 className="text-lg md:text-xl font-bold text-white mb-2 text-center">
                  Parent / Student
                </h2>

                <div className="text-center">
                  <button className="px-5 py-2 rounded-lg font-semibold text-white text-sm transition-all bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/25">
                    Select Parent/Student →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* School Management Option */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => handleSelection('school')}
              className="cursor-pointer group relative overflow-hidden rounded-xl border-2 border-purple-500/30 hover:border-pink-400/60 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #1a0a29 0%, #180828 50%, #120520 100%)' }}
            >
              <div className="relative z-10 p-4">
                {/* Image Container */}
                <div className="w-full h-28 md:h-32 relative mb-3 rounded-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="/school-management.png"
                    alt="School Management"
                    fill
                    className="object-contain"
                  />
                </div>

                <h2 className="text-lg md:text-xl font-bold text-white mb-2 text-center">
                  School Management
                </h2>

                <div className="text-center">
                  <button className="px-5 py-2 rounded-lg font-semibold text-white text-sm transition-all bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 hover:shadow-lg hover:shadow-purple-500/25">
                    Select School →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
