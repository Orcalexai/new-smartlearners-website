'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/Card'
import { FaBan, FaBalanceScale, FaFileContract, FaInfoCircle } from 'react-icons/fa'

const Refund = () => {
  const policies = [
    {
      icon: <FaBan className="text-3xl text-red-600" />,
      title: 'No Refunds',
      description: 'All payments are final and non-refundable'
    },
    {
      icon: <FaBalanceScale className="text-3xl text-yellow-600" />,
      title: 'Transparent Policy',
      description: 'Clear terms stated before purchase'
    },
    {
      icon: <FaFileContract className="text-3xl text-blue-600" />,
      title: 'Legally Binding',
      description: 'Payments confirm acceptance of terms'
    },
    {
      icon: <FaInfoCircle className="text-3xl text-purple-600" />,
      title: 'Support Available',
      description: 'We assist with any platform issues'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 bg-gradient-to-br from-red-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Refund <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              At <b>Smart Learners.ai (Orcalex Technologies LLP)</b>, we strive to provide high-quality digital learning experiences. Since our services include <b>instant access to digital content and personalized AI-driven tools</b>, we operate under a <b>non-refundable digital services policy</b>.
            </p>
            <p className="text-sm text-gray-500">Last updated: July 31, 2025</p>
          </motion.div>
        </div>
      </section>

      <section className="py-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 relative">
        <div className="absolute inset-0 bg-mesh opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card hover className="text-center h-full">
                  <div className="mb-4 p-3 bg-gradient-to-br from-yellow-100 to-red-100 rounded-xl w-fit mx-auto">
                    {policy.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{policy.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 bg-gradient-to-br from-gray-50 to-yellow-50 relative">
        <div className="absolute inset-0 bg-mesh opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Card className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Important Notice</h2>

            <p className="text-gray-600 mb-4">
              By accessing and using the Smart Learners.ai platform, you acknowledge and accept that all payments are final and non-refundable. This includes, but is not limited to:
            </p>

            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Monthly or annual subscription fees</li>
              <li>• One-time course or module purchases</li>
              <li>• Promotional or discounted offers</li>
              <li>• Institutional and bulk orders</li>
              <li>• Trial-to-paid conversions</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Legal Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              Under the Consumer Protection Act of India and international digital commerce regulations, digital content and educational services are exempt from standard return policies once access is granted. Since Smart Learners.ai delivers immediate access to digital learning materials, we are legally not obligated to provide refunds.
            </p>

            <p className="text-gray-600 mb-8">
              Your transaction is considered a legally binding agreement, confirming your understanding and acceptance of these terms. Please read our Terms of Service and Privacy Policy before completing your purchase.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              While we do not issue refunds, we are committed to providing a seamless experience. For platform issues, technical difficulties, or learning concerns, please contact our support team:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Support Email:</strong> hello@smartlearners.ai</p>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91 6303974827</p>

              <h4 className="font-semibold text-gray-800 mt-4 mb-2">Support Hours:</h4>
              <p className="text-gray-700 mb-2">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
              <p className="text-gray-700 mb-4">Response time: Within 24 hours</p>

              <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-600">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Reminder:</h4>
                <p className="text-yellow-700 text-sm">
                  Please ensure that you fully understand our offerings before purchasing. Our team is happy to answer any pre-sales questions or provide demos.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Refund
