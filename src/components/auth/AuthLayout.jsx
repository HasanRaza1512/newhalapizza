import { motion } from 'framer-motion'
import { useState } from 'react'

const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  leftContent,
  showSocialButtons = false,
  socialButtons = []
}) => {
  const [isMobile, setIsMobile] = useState(false)

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-150">
            {/* Left Side - Branding/Illustration */}
            <div className="flex-1 bg-linear-to-br from-orange-400 to-orange-600 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full blur-2xl" />
              </div>
              
              <div className="relative z-10 text-center text-white">
                {leftContent || (
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="mb-8"
                    >
                      <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-4xl">🍕</span>
                      </div>
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-3xl font-bold mb-4"
                    >
                      Hala Pizza
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-lg opacity-90 max-w-sm mx-auto"
                    >
                      Delicious pizza delivered to your door
                    </motion.p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="flex-1 p-8 lg:p-12 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="w-full max-w-md"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                  {subtitle && (
                    <p className="text-gray-600">{subtitle}</p>
                  )}
                </div>

                {children}

                {/* Social Login Buttons */}
                {showSocialButtons && socialButtons.length > 0 && (
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {socialButtons.map((button, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.3 }}
                          type="button"
                          onClick={button.onClick}
                          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
                        >
                          <span className="text-xl">{button.icon}</span>
                          <span>{button.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthLayout
