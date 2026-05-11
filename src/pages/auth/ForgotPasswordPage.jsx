import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import AuthLayout from '../../components/auth/AuthLayout'
import AuthInput from '../../components/auth/AuthInput'
import AuthButton from '../../components/auth/AuthButton'

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [inputType, setInputType] = useState('email') // 'email' or 'phone'

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (inputType === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    } else {
      if (!formData.email) {
        newErrors.email = 'Phone number is required'
      } else if (!/^(?:\+971|0)?(?:5[0-9]|2[0-9]|3[0-9]|4[0-9]|6[0-9]|7[0-9]|9[0-9])[0-9]{7}$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid UAE phone number'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // TODO: Integrate with actual password reset API
      console.log('Password reset request:', { ...formData, inputType })
      
      setIsSubmitted(true)
      
    } catch (error) {
      setErrors({ general: 'Failed to send reset code. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      // TODO: Resend API call
      console.log('Resend reset code')
    } catch (error) {
      setErrors({ general: 'Failed to resend code. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email or phone to receive a reset code"
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
            Forgot Password?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg opacity-90 max-w-sm mx-auto"
          >
            No worries, we'll help you reset it
          </motion.p>
        </div>
      }
    >
      {!isSubmitted ? (
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

          {/* Input Type Toggle */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => setInputType('email')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                inputType === 'email'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setInputType('phone')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                inputType === 'phone'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Phone
            </button>
          </div>

          <AuthInput
            type={inputType === 'email' ? 'email' : 'tel'}
            label={inputType === 'email' ? 'Email Address' : 'Phone Number'}
            placeholder={inputType === 'email' ? 'Enter your email address' : 'Enter your phone number'}
            value={formData.email}
            onChange={handleInputChange('email')}
            error={errors.email}
            required
            icon={inputType === 'email' ? <FiMail className="w-5 h-5" /> : <FiPhone className="w-5 h-5" />}
          />

          <AuthButton
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className="w-full"
          >
            Send Reset Code
          </AuthButton>

          {/* Back to Login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 font-medium transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </motion.div>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
          >
            <FiMail className="w-10 h-10 text-green-600" />
          </motion.div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Reset Code Sent!
            </h3>
            <p className="text-gray-600 mb-6">
              We've sent a password reset code to your {inputType === 'email' ? 'email address' : 'phone number'}. 
              Please check your {inputType === 'email' ? 'inbox' : 'messages'} and enter the code.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/verify-otp"
              className="block w-full"
            >
              <AuthButton variant="primary" className="w-full">
                Enter Reset Code
              </AuthButton>
            </Link>
            
            <button
              onClick={handleResend}
              disabled={isLoading}
              className="text-sm text-gray-600 hover:text-orange-600 font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Didn\'t receive the code? Resend'}
            </button>
          </div>

          {/* Back to Login */}
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
        </motion.div>
      )}
    </AuthLayout>
  )
}

export default ForgotPasswordPage
