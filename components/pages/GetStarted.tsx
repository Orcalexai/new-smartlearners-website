'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '@/components/Card'
import Button from '@/components/Button'
import { FaUser, FaCreditCard, FaCheckCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const GetStarted = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    studentName: '',
    studentClass: '',
    schoolName: '',
    mobileNumber: '',
    email: '',
    selectedCourse: '',
    howDidYouHear: '',
    otherSource: '',
    studentConsent: false,
    studentSignature: '',
    parentalConsent: false,
    parentSignature: '',
    termsAccepted: false
  })

  const courses = [
    { value: 'cbse-6-10', label: 'CBSE Class 6-10 - ₹200/month', price: 200 },
    { value: 'cbse-11-12', label: 'CBSE Class 11-12 - ₹300/month', price: 300 },
    { value: 'cbse-jee-foundation', label: 'CBSE+ JEE Foundation (Class 8-10) - ₹500/month', price: 500 },
    { value: 'jee-mains', label: 'JEE Mains (Class 11-12) - ₹800/month', price: 800 },
    { value: 'jee-advanced', label: 'JEE Advanced (Class 11-12) - ₹1000/month', price: 1000 }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.studentName || !formData.studentClass ||
            !formData.schoolName || !formData.mobileNumber ||
            !formData.email || !formData.howDidYouHear) {
          alert('Please fill in all required fields')
          return false
        }
        if (formData.howDidYouHear === 'others' && !formData.otherSource) {
          alert('Please specify how you heard about us')
          return false
        }
        if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
          alert('Please enter a valid 10-digit mobile number')
          return false
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          alert('Please enter a valid email address')
          return false
        }
        return true
      case 2:
        if (!formData.selectedCourse) {
          alert('Please select a course')
          return false
        }
        return true
      case 3:
        if (!formData.studentConsent || !formData.parentalConsent || !formData.termsAccepted) {
          alert('Please accept all terms and provide consent')
          return false
        }
        if (!formData.studentSignature.trim()) {
          alert('Please provide student digital signature')
          return false
        }
        if (!formData.parentSignature.trim()) {
          alert('Please provide parent/guardian digital signature')
          return false
        }
        return true
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    if (validateStep(3)) {
      try {
        // Step 1: Register the user
        const registrationPayload = {
          student_name: formData.studentName,
          email: formData.email,
          mobile_number: formData.mobileNumber,
          class_level: formData.studentClass,
          school_name: formData.schoolName,
          selected_course: formData.selectedCourse,
          how_did_you_hear: formData.howDidYouHear,
          other_source: formData.otherSource || null,
          student_consent: formData.studentConsent,
          parental_consent: formData.parentalConsent,
          terms_accepted: formData.termsAccepted,
          student_signature: formData.studentSignature,
          parent_signature: formData.parentSignature,
        }

        console.log('🚀 Starting registration...', registrationPayload)

        const registrationResponse = await fetch('https://smartgen.smartlearners.ai/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationPayload),
        })

        console.log('📝 Registration response status:', registrationResponse.status)

        if (!registrationResponse.ok) {
          const errorData = await registrationResponse.json()
          console.error('❌ Registration error:', errorData)
          throw new Error(errorData.detail || 'Registration failed')
        }

        const registrationData = await registrationResponse.json()
        console.log('✅ Registration successful:', registrationData)

        if (!registrationData.success) {
          throw new Error('Registration failed')
        }

        // Step 2: Initiate payment
        console.log('💳 Starting payment initiation...', {
          registration_id: registrationData.registration_id
        })

        const paymentResponse = await fetch('https://smartgen.smartlearners.ai/api/payment/initiate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            registration_id: registrationData.registration_id,
          }),
        })

        console.log('💳 Payment response status:', paymentResponse.status)
        console.log('💳 Payment response headers:', Object.fromEntries(paymentResponse.headers.entries()))

        if (!paymentResponse.ok) {
          const errorData = await paymentResponse.json()
          console.error('Payment API Error:', errorData)

          let errorMessage = 'Payment initiation failed'
          if (errorData.detail) {
            if (Array.isArray(errorData.detail)) {
              errorMessage = errorData.detail.map((err: any) => err.msg || err).join(', ')
            } else if (typeof errorData.detail === 'string') {
              errorMessage = errorData.detail
            }
          }
          throw new Error(errorMessage)
        }

        const paymentData = await paymentResponse.json()
        console.log('Payment Response:', paymentData)

        if (paymentData.success && paymentData.redirect_url) {
          // Directly redirect to PhonePe payment URL
          window.location.href = paymentData.redirect_url
        } else {
          const errorMsg = paymentData.error || paymentData.detail || 'Payment initiation failed'
          throw new Error(errorMsg)
        }
      } catch (error) {
        console.error('Error submitting form:', error)

        let errorMessage = 'Unknown error occurred'
        if (error instanceof Error) {
          errorMessage = error.message
        } else if (typeof error === 'string') {
          errorMessage = error
        } else if (error && typeof error === 'object') {
          errorMessage = JSON.stringify(error)
        }

        alert(`Error: ${errorMessage}`)
      }
    }
  }

  const steps = [
    { number: 1, title: 'Basic Details', icon: <FaUser /> },
    { number: 2, title: 'Select Plan', icon: <FaCreditCard /> },
    { number: 3, title: 'Consent & Terms', icon: <FaCheckCircle /> }
  ]

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Dark Navy Background - Same as website */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1628] via-[#1a1f3a] to-[#0f1628]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
      </div>
      
      {/* Floating shapes for visual interest */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '4s' }} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-center mb-8 text-white">
            Get Started with <span className="gradient-text">Smart Learners</span>
          </h1>
          <p className="text-center text-gray-400 mb-8 text-lg">
            Join thousands of students on their AI-powered learning journey
          </p>

          <div className="flex justify-between items-center mb-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step.icon}
                </div>
                <div className="ml-3">
                  <p className={`text-sm ${currentStep >= step.number ? 'text-white font-semibold' : 'text-gray-500'}`}>
                    Step {step.number}
                  </p>
                  <p className={`text-xs ${currentStep >= step.number ? 'text-gray-300' : 'text-gray-600'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                      currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="p-8 bg-[#1a1f3a]/90 backdrop-blur-lg shadow-2xl border border-gray-700/50">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 gradient-text">Basic Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#0f1628] text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-500"
                        placeholder="Enter student's full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Class *
                      </label>
                      <select
                        name="studentClass"
                        value={formData.studentClass}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#0f1628] text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-500"
                        required
                      >
                        <option value="">Select class</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        School Name *
                      </label>
                      <input
                        type="text"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#0f1628] text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-500"
                        placeholder="Enter school name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#0f1628] text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-500"
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#0f1628] text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-500"
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        How did you hear about us? *
                      </label>
                      <select
                        name="howDidYouHear"
                        value={formData.howDidYouHear}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#0f1628] text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-500"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="google">Google</option>
                        <option value="social-media">Social Media (Instagram, Facebook, LinkedIn, etc.)</option>
                        <option value="friend-family">Friend or Family Recommendation</option>
                        <option value="school-college">School / College Reference</option>
                        <option value="others">Others</option>
                      </select>
                    </div>

                    {formData.howDidYouHear === 'others' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Please specify *
                        </label>
                        <input
                          type="text"
                          name="otherSource"
                          value={formData.otherSource}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#0f1628] text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-500"
                          placeholder="Tell us how you heard about us"
                          required
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 gradient-text">Select Your Plan</h2>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Choose a Course *
                    </label>
                    <select
                      name="selectedCourse"
                      value={formData.selectedCourse}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-[#0f1628] text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-500"
                      required
                    >
                      <option value="">Select a course</option>
                      {courses.map(course => (
                        <option key={course.value} value={course.value}>
                          {course.label}
                        </option>
                      ))}
                    </select>

                    {formData.selectedCourse && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-6 bg-[#0f1628] rounded-xl border border-blue-500/30 shadow-lg"
                      >
                        <h3 className="font-semibold text-lg mb-3 text-white">Payment Information</h3>
                        <p className="text-gray-300 mb-2">
                          Selected Course: <span className="font-medium text-blue-400">
                            {courses.find(c => c.value === formData.selectedCourse)?.label}
                          </span>
                        </p>
                        <p className="text-sm text-gray-400">
                          Payment will be processed after form submission. Our team will contact you within 24 hours.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 gradient-text">Consent & Terms</h2>
                  <div className="space-y-6">
                    {/* Student Consent with Privacy Policy */}
                    <div className="p-4 bg-[#0f1628] rounded-lg border border-gray-700">
                      <h3 className="font-semibold text-lg mb-3 text-white">Student Consent & Privacy Policy</h3>

                      {/* Scrollable Privacy Policy */}
                      <div className="mb-4 p-4 bg-[#0a0f1a] rounded-lg border border-gray-700 h-48 overflow-y-auto">
                        <div className="text-sm text-gray-300 space-y-3">
                          <p><strong className="text-blue-400">1. Information We Collect</strong></p>
                          <p>When you register or use our services, we may collect: Full name and contact details (email, phone number), Educational background and class level, Parent/guardian details (for minors), Payment information (processed securely by trusted third-party providers).</p>

                          <p><strong className="text-blue-400">2. How We Use Your Information</strong></p>
                          <p>We process your information for: Personalized tutoring, study plans, certificates, progress tracking and performance analysis. Account notifications, updates, support, and (with consent) marketing offers.</p>

                          <p><strong className="text-blue-400">3. Data Sharing and Disclosure</strong></p>
                          <p>We never sell or rent your personal data. We may share it only with trusted vendors (e.g., cloud hosting, analytics, payment processors) bound by strict confidentiality agreements, or to comply with laws, court orders, or prevent fraud/abuse.</p>

                          <p><strong className="text-blue-400">4. Data Security</strong></p>
                          <p>We use industry-standard measures to secure your data: SSL/TLS encryption for all transmissions, Encrypted and access-controlled storage, Regular security audits and monitoring, Employee training and restricted access, Incident response protocols.</p>

                          <p><strong className="text-blue-400">5. Your Rights</strong></p>
                          <p>You may have the right to: Access your personal data, Correct or update your information, Request deletion of your account and data, Export your learning data, Opt out of marketing communications.</p>

                          <p><strong className="text-blue-400">6. Cookies and Tracking</strong></p>
                          <p>We use cookies to remember your login preferences, analyze platform usage, and personalize learning content. You can manage cookies via your browser settings.</p>

                          <p><strong className="text-blue-400">7. Data Retention</strong></p>
                          <p>We retain personal data only as long as necessary for educational services, legal obligations, or dispute resolution. After that, your data is securely deleted or anonymized.</p>

                          <p><strong className="text-blue-400">8. Contact Us</strong></p>
                          <p>Email: hello@smartlearners.ai | Phone: +91 6303974827 | Address: 4th Floor, Veer Chambers, Prakash Nagar, Hyderabad-500016, India</p>
                        </div>
                      </div>

                      {/* Checkbox */}
                      <label className="flex items-start cursor-pointer mb-4">
                        <input
                          type="checkbox"
                          name="studentConsent"
                          checked={formData.studentConsent}
                          onChange={handleInputChange}
                          className="mt-1 mr-3 accent-blue-500"
                        />
                        <p className="text-sm text-gray-300">
                          I, as a student, agree to use the Smart Learners platform responsibly and accept the privacy policy above.
                        </p>
                      </label>

                      {/* Student Digital Signature */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Student Digital Signature *
                        </label>
                        <input
                          type="text"
                          name="studentSignature"
                          value={formData.studentSignature}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#0f1628] text-white placeholder-gray-500"
                          placeholder="Type your full name as digital signature"
                          required
                        />
                      </div>
                    </div>

                    {/* Parental Consent */}
                    <div className="p-4 bg-[#0f1628] rounded-lg border border-gray-700">
                      <h3 className="font-semibold text-lg mb-3 text-white">Parental Consent</h3>

                      {/* Checkbox */}
                      <label className="flex items-start cursor-pointer mb-4">
                        <input
                          type="checkbox"
                          name="parentalConsent"
                          checked={formData.parentalConsent}
                          onChange={handleInputChange}
                          className="mt-1 mr-3 accent-blue-500"
                        />
                        <p className="text-sm text-gray-300">
                          I, as a parent/guardian, consent to my child using the Smart Learners platform and agree to monitor their progress.
                        </p>
                      </label>

                      {/* Parent Digital Signature */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Parent/Guardian Digital Signature *
                        </label>
                        <input
                          type="text"
                          name="parentSignature"
                          value={formData.parentSignature}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#0f1628] text-white placeholder-gray-500"
                          placeholder="Type parent/guardian full name as digital signature"
                          required
                        />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="p-4 bg-[#0f1628] rounded-lg border border-gray-700">
                      <h3 className="font-semibold text-lg mb-3 text-white">Terms and Conditions</h3>

                      {/* Scrollable Terms and Conditions */}
                      <div className="mb-4 p-4 bg-[#0a0f1a] rounded-lg border border-gray-700 h-48 overflow-y-auto">
                        <div className="text-sm text-gray-300 space-y-3">
                          <p><strong className="text-blue-400">1. Legal Agreement</strong></p>
                          <p>These Terms constitute a binding legal agreement between you and Smart Learners.ai (Orcalex Technologies LLP).</p>

                          <p><strong className="text-blue-400">2. Description of Service</strong></p>
                          <p>Smart Learners.ai provides an AI-powered educational platform offering: Personalized learning experiences, AI-driven tutoring and assessments, Progress tracking and analytics, Interactive courses for Classes 6–12, JEE preparation materials and tests, Certificates and performance reports.</p>

                          <p><strong className="text-blue-400">3. User Registration and Accounts</strong></p>
                          <p>Users must provide accurate and complete information during registration. One account per user is allowed. Users under 18 may only register with verifiable parental or guardian consent. You are responsible for maintaining the confidentiality of your credentials.</p>

                          <p><strong className="text-blue-400">4. Acceptable Use Policy</strong></p>
                          <p>Permitted Uses: Access and use content for personal learning, Complete assignments honestly, Interact respectfully with AI tutors and peers. Prohibited: Share accounts or login credentials, Copy or distribute content without permission, Submit false information or cheat on assessments.</p>

                          <p><strong className="text-blue-400">5. Subscription and Payment Terms</strong></p>
                          <p>Free plan with limited access, Premium subscriptions with full access, Annual and monthly billing options. All payments are processed securely by third-party providers. Payments are non-refundable, except where required by law. Subscriptions renew automatically unless cancelled.</p>

                          <p><strong className="text-blue-400">6. Intellectual Property Rights</strong></p>
                          <p>All content, software, AI algorithms, design, trademarks, and technology are the property of Smart Learners.ai and protected by applicable laws. By submitting content, you grant us a non-exclusive, royalty-free, worldwide license to use and improve services.</p>

                          <p><strong className="text-blue-400">7. Privacy and Data Protection</strong></p>
                          <p>Your privacy is important to us. Our Privacy Policy explains what information we collect, how we use it, and your rights.</p>

                          <p><strong className="text-blue-400">8. Disclaimers and Limitations</strong></p>
                          <p>Smart Learners.ai is a supplementary tool. We do not guarantee specific academic outcomes or uninterrupted access. We are not liable for indirect, incidental, or consequential damages.</p>

                          <p><strong className="text-blue-400">9. Termination</strong></p>
                          <p>You may terminate your account at any time. We may suspend or terminate your account if Terms are violated, fraudulent activity is detected, or the account remains inactive.</p>

                          <p><strong className="text-blue-400">10. Contact Information</strong></p>
                          <p>Email: hello@smartlearners.ai | Phone: +91 6303974827 | Address: 4th Floor, Veer Chambers, Prakash Nagar, Hyderabad-500016, India | Support Hours: Mon–Sat, 9:00 AM – 6:00 PM IST</p>
                        </div>
                      </div>

                      {/* Checkbox */}
                      <label className="flex items-start cursor-pointer mt-4">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleInputChange}
                          className="mt-1 mr-3 accent-blue-500"
                        />
                        <p className="text-sm text-gray-300">
                          I agree to all terms and conditions as detailed above.
                        </p>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex items-center border-2 border-gray-600 hover:bg-gray-700/30 text-white transition-all duration-300"
                >
                  <FaArrowLeft className="mr-2" />
                  Previous
                </Button>
              )}
              
              <div className={currentStep === 1 ? 'ml-auto' : ''}>
                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Next
                    <FaArrowRight className="ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-xl transform hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-3"
                  >
                    Checkout
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default GetStarted