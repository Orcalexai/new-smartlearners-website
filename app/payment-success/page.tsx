'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Link from 'next/link'
import { FaCheckCircle, FaUser, FaLock, FaCopy, FaSpinner } from 'react-icons/fa'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  const [loading, setLoading] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<any>(null)
  const [copied, setCopied] = useState({ username: false, password: false })

  useEffect(() => {
    if (orderId) {
      checkPaymentStatus()
    }
  }, [orderId])

  const checkPaymentStatus = async () => {
    try {
      console.log('🔍 Checking payment status for order:', orderId)
      const response = await fetch(`https://smartgen.smartlearners.ai/api/payment/status/${orderId}`)
      console.log('📊 Payment status response:', response.status, response.statusText)

      const data = await response.json()
      console.log('📊 Payment status data:', data)

      setPaymentStatus(data)
    } catch (error) {
      console.error('❌ Error checking payment status:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, field: 'username' | 'password') => {
    navigator.clipboard.writeText(text)
    setCopied({ ...copied, [field]: true })
    setTimeout(() => {
      setCopied({ ...copied, [field]: false })
    }, 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-lg">Checking payment status...</p>
        </div>
      </div>
    )
  }

  if (!paymentStatus || !paymentStatus.success) {
    console.log('❌ Payment status check failed:', {
      paymentStatus,
      hasPaymentStatus: !!paymentStatus,
      successValue: paymentStatus?.success,
      paymentStatusValue: paymentStatus?.payment_status
    })

    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md p-8">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Payment Failed</h1>
          <p className="mb-4">Your payment could not be processed. Please try again.</p>
          <p className="text-sm text-gray-600 mb-4">
            Debug: {paymentStatus ? JSON.stringify(paymentStatus) : 'No payment status'}
          </p>
          <Link href="/get-started">
            <Button>Try Again</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.3),transparent_50%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 bg-white/90 backdrop-blur-lg shadow-2xl">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
              </motion.div>

              <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-gray-600">Welcome to Smart Learners! Your account has been created.</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Your Login Credentials</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white rounded-lg p-4">
                  <div className="flex items-center">
                    <FaUser className="text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-mono font-semibold">{paymentStatus.credentials?.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentStatus.credentials?.username, 'username')}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {copied.username ? 'Copied!' : <FaCopy />}
                  </button>
                </div>

                <div className="flex items-center justify-between bg-white rounded-lg p-4">
                  <div className="flex items-center">
                    <FaLock className="text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Password</p>
                      <p className="font-mono font-semibold">{paymentStatus.credentials?.password}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentStatus.credentials?.password, 'password')}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {copied.password ? 'Copied!' : <FaCopy />}
                  </button>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Please save these credentials securely. You can change your password after logging in.
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href={paymentStatus.credentials?.login_url || '/login'}>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  Go to Login
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  Go to Homepage
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}