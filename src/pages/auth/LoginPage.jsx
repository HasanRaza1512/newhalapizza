import { useState, useRef } from 'react'
// import { motion } from 'framer-motion'
import { FiMail, FiLock, FiFacebook } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import AuthLayoutSimple from '../../components/auth/AuthLayoutSimple'
import AuthInput from '../../components/auth/AuthInput'
import PasswordInput from '../../components/auth/PasswordInput'
import AuthButton from '../../components/auth/AuthButton'
import SocialButton from '../../components/auth/SocialButton'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginType, setLoginType] = useState('email') // 'email' or 'phone'

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (loginType === 'email') {
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

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
      
      // TODO: Integrate with actual authentication API
      console.log('Login attempt:', { ...formData, rememberMe })
      
      // Show success message (in real app, would navigate to dashboard)
      alert('Login successful! (This is a demo - no actual authentication)')
      
    } catch (error) {
      setErrors({ general: 'Invalid email or password' })
    } finally {
      setIsLoading(false)
    }
  }

  const socialButtons = [
    {
      icon: <FiFacebook />,
      label: 'Facebook',
      onClick: () => console.log('Facebook login')
    }
  ]

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue ordering"
      showSocialButtons={true}
      socialButtons={socialButtons}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Login Type Toggle */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => setLoginType('email')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              loginType === 'email'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setLoginType('phone')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              loginType === 'phone'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Phone
          </button>
        </div>

        {errors.general && (
          <div
            className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
          >
            {errors.general}
          </div>
        )}

        <AuthInput
          type={loginType === 'email' ? 'email' : 'tel'}
          label={loginType === 'email' ? 'Email Address' : 'Phone Number'}
          placeholder={loginType === 'email' ? 'Enter your email' : 'Enter your phone number'}
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
          required
          icon={loginType === 'email' ? <FiMail className="w-5 h-5" /> : null}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={errors.password}
          required
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>
          
          <Link
            to="/forgot-password"
            className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          className="w-full"
        >
          Sign In
        </AuthButton>

        {/* Sign Up Link */}
        <div
          className="w-full max-w-6xl mx-auto"
        >
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
