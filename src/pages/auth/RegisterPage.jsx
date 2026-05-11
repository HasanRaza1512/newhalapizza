import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiPhone, FiLock, FiCheck } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import AuthLayout from '../../components/auth/AuthLayout'
import AuthInput from '../../components/auth/AuthInput'
import PasswordInput from '../../components/auth/PasswordInput'
import AuthButton from '../../components/auth/AuthButton'
import SocialButton from '../../components/auth/SocialButton'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^(?:\+971|0)?(?:5[0-9]|2[0-9]|3[0-9]|4[0-9]|6[0-9]|7[0-9]|9[0-9])[0-9]{7}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid UAE phone number'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions'
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
      
      // TODO: Integrate with actual registration API
      console.log('Registration attempt:', { ...formData, agreedToTerms })
      
      // Show success message (in real app, would navigate to verification or dashboard)
      alert('Registration successful! (This is a demo - no actual registration)')
      
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const socialButtons = [
    {
      icon: <FiFacebook />,
      label: 'Facebook',
      onClick: () => console.log('Facebook register')
    },
    {
      icon: <FiFacebook />,
      label: 'Facebook',
      onClick: () => console.log('Facebook register')
    }
  ]

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us to start ordering delicious pizza"
      showSocialButtons={true}
      socialButtons={socialButtons}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
          >
            {errors.general}
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthInput
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
            error={errors.fullName}
            required
            icon={<FiUser className="w-5 h-5" />}
          />

          <AuthInput
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange('email')}
            error={errors.email}
            required
            icon={<FiMail className="w-5 h-5" />}
          />
        </div>

        <AuthInput
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleInputChange('phone')}
          error={errors.phone}
          required
          icon={<FiPhone className="w-5 h-5" />}
        />

        <PasswordInput
          label="Password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={errors.password}
          showPasswordStrength={true}
          required
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          error={errors.confirmPassword}
          showPasswordStrength={false}
          required
        />

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 mt-1 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700 leading-relaxed">
              I agree to the{' '}
              <Link to="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
                Terms and Conditions
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="text-sm text-red-600"
            >
              {errors.terms}
            </motion.p>
          )}
        </div>

        <AuthButton
          type="submit"
          loading={isLoading}
          disabled={isLoading || !agreedToTerms}
          className="w-full"
        >
          Create Account
        </AuthButton>

        {/* Login Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-600"
        >
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
          >
            Sign In
          </Link>
        </motion.p>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
