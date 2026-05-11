import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

import AuthLayout from '../../components/auth/AuthLayout'
import AuthButton from '../../components/auth/AuthButton'

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes
  const [isExpired, setIsExpired] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsExpired(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleInputChange = (index) => (e) => {
    const value = e.target.value.slice(0, 1)
    
    if (value && index < otp.length - 1) {
      inputRefs[index + 1].current?.focus()
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Clear error when user starts typing
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: '' }))
    }
  }

  const handleKeyDown = (index) => (e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 4)
    
    if (/^\d{4}$/.test(pastedData)) {
      const newOtp = pastedData.split('')
      setOtp(newOtp)
      
      // Focus last input
      setTimeout(() => {
        inputRefs[newOtp.length - 1].current?.focus()
      }, 0)
    }
  }

  const validateOtp = () => {
    const otpString = otp.join('')
    if (otpString.length !== 4) {
      setErrors({ otp: 'Please enter all 4 digits' })
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateOtp()) return

    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // TODO: Integrate with actual OTP verification API
      console.log('OTP verification:', otp.join(''))
      
      // Show success message (in real app, would navigate to reset password or dashboard)
      alert('OTP verified successfully! (This is a demo - no actual verification)')
      
      // Navigate to reset password page
      navigate('/reset-password')
      
    } catch (error) {
      setErrors({ otp: 'Invalid OTP. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // TODO: Resend OTP API call
      console.log('Resend OTP')
      
      // Reset timer and OTP
      setTimeLeft(120)
      setIsExpired(false)
      setOtp(['', '', '', ''])
      inputRefs[0].current?.focus()
      
    } catch (error) {
      setErrors({ general: 'Failed to resend OTP. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the 4-digit code sent to your email"
      leftContent={
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-4xl">🔐</span>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold mb-4"
          >
            Verify Your Code
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg opacity-90 max-w-sm mx-auto"
          >
            Check your email for the verification code
          </motion.p>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
          >
            {errors.general}
          </motion.div>
        )}

        {/* Timer */}
        <div className="text-center">
          <div className={`text-lg font-mono font-semibold ${
            isExpired ? 'text-red-500' : timeLeft < 30 ? 'text-orange-500' : 'text-gray-700'
          }`}>
            {isExpired ? 'Expired' : formatTime(timeLeft)}
          </div>
          {isExpired && (
            <p className="text-sm text-gray-600 mt-2">
              The verification code has expired. Please request a new one.
            </p>
          )}
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <input
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={handleInputChange(index)}
                onKeyDown={handleKeyDown(index)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={isExpired || isLoading}
                className={`
                  w-16 h-16 text-center text-2xl font-bold border-2 rounded-xl
                  bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                  transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed
                  ${errors.otp ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
                  ${digit ? 'border-orange-500' : ''}
                `}
              />
            </motion.div>
          ))}
        </div>

        {errors.otp && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="text-center text-sm text-red-600"
          >
            {errors.otp}
          </motion.p>
        )}

        <AuthButton
          type="submit"
          loading={isLoading}
          disabled={isExpired || isLoading || otp.join('').length !== 4}
          className="w-full"
        >
          Verify Code
        </AuthButton>

        {/* Resend OTP */}
        <div className="text-center space-y-4">
          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="text-sm text-gray-600 hover:text-orange-600 font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Didn\'t receive the code? Resend'}
          </button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 font-medium transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </motion.div>
        </div>
      </form>
    </AuthLayout>
  )
}

export default VerifyOtpPage
