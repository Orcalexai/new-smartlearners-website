'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/Card'
import { FaShieldAlt, FaUserShield, FaLock, FaEye } from 'react-icons/fa'

const Privacy = () => {
  const principles = [
    {
      icon: <FaShieldAlt className="text-3xl text-blue-600" />,
      title: 'Data Protection',
      description: 'We use industry-standard encryption to protect your personal information'
    },
    {
      icon: <FaUserShield className="text-3xl text-green-600" />,
      title: 'Privacy First',
      description: 'Your privacy is our top priority in everything we do'
    },
    {
      icon: <FaLock className="text-3xl text-purple-600" />,
      title: 'Secure Storage',
      description: 'All data is stored securely with advanced security measures'
    },
    {
      icon: <FaEye className="text-3xl text-indigo-600" />,
      title: 'Transparency',
      description: 'We are transparent about what data we collect and how we use it'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              At Smart Learners.ai(Orcalex Technologies LLP), we are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data, in compliance with applicable data protection laws.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: August 29, 2025
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
        <div className="absolute inset-0 bg-mesh opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-2">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card hover className="text-center h-full">
                  <div className="mb-4 p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl w-fit mx-auto">
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{principle.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-2 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="absolute inset-0 bg-mesh opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Card className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h3>
            <p className="text-gray-600 mb-4">
              When you register or use our services, we may collect:
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Full name and contact details (email, phone number)</li>
              <li>• Educational background and class level</li>
              <li>• Parent/guardian details (for minors)</li>
              <li>• Payment information (processed securely by trusted third-party providers; we do not store credit/debit card details)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Learning Data</h3>
            <p className="text-gray-600 mb-4">
              To provide personalized learning, we collect:
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Course progress and completion records</li>
              <li>• Quiz and test results</li>
              <li>• Time spent on topics</li>
              <li>• Learning preferences and interaction logs</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technical Information</h3>
            <p className="text-gray-600 mb-4">
              We automatically collect:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Platform usage patterns</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. How We Use Your Information</h2>
            
            <p className="text-gray-600 mb-6">We process your information for:</p>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Educational Services</h3>
            <p className="text-gray-600 mb-4">Personalized tutoring, study plans, certificates, progress tracking and performance analysis</p>


            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Communication</h3>
            <p className="text-gray-600 mb-8">Account notifications, updates, support, and (with consent) marketing offers</p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Data Sharing and Disclosure</h2>
            
            <p className="text-gray-600 mb-6">
              We never sell or rent your personal data. We may share it only in these cases:
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Service Providers</h3>
            <p className="text-gray-600 mb-4">
              with trusted vendors (e.g., cloud hosting, analytics, payment processors, customer support tools) bound by strict confidentiality agreements
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Legal Obligations</h3>
            <p className="text-gray-600 mb-4">
              to comply with laws, court orders, or prevent fraud/abuse
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Business Transfers</h3>
            <p className="text-gray-600 mb-8">
              in the event of a merger, acquisition, or reorganization, with safeguards in place
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Data Security</h2>
            
            <p className="text-gray-600 mb-4">
              We use industry-standard measures to secure your data:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• SSL/TLS encryption for all transmissions</li>
              <li>• Encrypted and access-controlled storage</li>
              <li>• Regular security audits and monitoring</li>
              <li>• Employee training and restricted access</li>
              <li>• Incident response protocols</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Your Rights</h2>
            
            <p className="text-gray-600 mb-4">Depending on your location, you may have the right to:</p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Access your personal data</li>
              <li>• Correct or update your information</li>
              <li>• Request deletion of your account and data</li>
              <li>• Export your learning data in a machine-readable format</li>
              <li>• Opt out of marketing communications</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Parental Rights</h3>
            <p className="text-gray-600 mb-8">
              For users under 18, parents/guardians may access, update, or request deletion of their child's information by contacting us.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Cookies and Tracking</h2>
            
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Remember your login preferences</li>
              <li>• Analyze platform usage</li>
              <li>• Personalize learning content</li>
            </ul>
            <p className="text-gray-600 mb-8">
              You can manage cookies via your browser settings.
            </p>

            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Retention of Data</h2>
            
            <p className="text-gray-600 mb-8">
              We retain personal data only as long as necessary for educational services, legal obligations, or dispute resolution. After that, your data is securely deleted or anonymized.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Changes to This Policy</h2>

            <p className="text-gray-600 mb-8">
              We may update this Privacy Policy from time to time. Material changes will be communicated via email or in-app notification. The updated version will be effective immediately upon posting.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Contact Us</h2>
            
            <p className="text-gray-600 mb-4">
              If you have questions or concerns about this Privacy Policy or your data rights, please contact:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>📧 Email:</strong> hello@smartlearners.ai</p>
              <p className="text-gray-700 mb-2"><strong>📞 Phone:</strong> +91 6303974827</p>
              <p className="text-gray-700 mb-2"><strong>🏢 Address:</strong> 4th Floor, Veer Chambers, Prakash Nagar, Hyderabad-500016, India</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Privacy