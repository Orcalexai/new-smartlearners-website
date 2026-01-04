'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserType } from '@/contexts/UserTypeContext'

// Type definitions
interface SubmenuItem {
  name: string
  href: string
  desc: string
}

interface NavLink {
  name: string
  href: string
  submenu?: SubmenuItem[]
}

const getNavLinks = (userType: 'parent' | 'school' | null): NavLink[] => {
  const baseLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
  ]

  // Only show Courses for parents
  if (userType === 'parent') {
    baseLinks.push({ name: 'Courses', href: '/courses' })
  }

  // Solutions link based on user type
  if (userType === 'parent') {
    baseLinks.push({ name: 'For Students', href: '/students' })
  } else if (userType === 'school') {
    baseLinks.push({ name: 'For Schools', href: '/schools' })
  } else {
    // If no user type selected, show both options in dropdown
    baseLinks.push({
      name: 'Solutions',
      href: '#',
      submenu: [
        { name: 'For Students (B2C)', href: '/students', desc: 'Chatbot, Gap Analysis, Exam Prep' },
        { name: 'For Schools (B2B)', href: '/schools', desc: 'Assessment Gap Analysis' },
      ]
    })
  }

  baseLinks.push({ name: 'About', href: '/about' })
  baseLinks.push({ name: 'Contact', href: '/contact' })

  return baseLinks
}

export default function Navbar() {
  const { userType, setUserType } = useUserType()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navLinks = getNavLinks(userType)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChangeUserType = () => {
    setUserType(null)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0f172a]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo - clean and prominent */}
            <div className="h-10 w-auto rounded-xl overflow-hidden flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="SmartLearners.ai Logo"
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="text-[26px] font-bold text-white group-hover:text-blue-300 transition-colors">
                SmartLearners<span className="text-blue-400">.ai</span>
              </span>
              <span className="text-[10px] text-gray-500 -mt-1 hidden sm:block">AI-Powered Learning</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.submenu ? (
                  <>
                    <button className="nav-link flex items-center gap-1">
                      {link.name}
                      <svg className={`w-4 h-4 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-72 glass-card p-2"
                          style={{ background: 'rgba(17, 24, 39, 0.98)' }}
                        >
                          {link.submenu.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                            >
                              <span className="font-medium text-white block">{item.name}</span>
                              <span className="text-sm text-gray-400">{item.desc}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link href={link.href} className="nav-link">{link.name}</Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Button - Fixed alignment */}
          <div className="hidden lg:flex items-center gap-3">
            {userType && (
              <button
                onClick={handleChangeUserType}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
                title="Change view"
              >
                {userType === 'parent' ? '👨‍👩‍👧‍👦 Parent View' : '🏫 School View'}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}
            <Link href="/get-started" className="px-5 py-2 text-sm font-semibold rounded-lg text-white transition-all bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25">
              Get Subscription
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#111827] border-t border-white/5"
          >
            <div className="container-custom py-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.submenu ? (
                    <div className="py-2">
                      <span className="block px-4 py-2 font-medium text-white">{link.name}</span>
                      <div className="ml-4 border-l border-white/10 pl-4">
                        {link.submenu.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block py-2 text-gray-400 hover:text-blue-400 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-4 py-3 font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              {/* Mobile CTA Button */}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                {userType && (
                  <button
                    onClick={handleChangeUserType}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                  >
                    {userType === 'parent' ? '👨‍👩‍👧‍👦 Parent View' : '🏫 School View'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                )}
                <Link
                  href="/get-started"
                  className="btn-primary text-center block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Subscribed
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
