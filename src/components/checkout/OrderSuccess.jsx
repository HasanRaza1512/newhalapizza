import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiPackage, FiTruck, FiHome, FiArrowLeft, FiStar } from 'react-icons/fi'

const OrderSuccess = ({ orderId, onBackToHome, onBackToMenu }) => {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)

  const handleSendFeedback = () => {
    if (rating === 0) return
    
    setFeedbackSent(true)
    // In a real app, send feedback to backend
    console.log('Feedback submitted:', { orderId, rating, feedback })
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="w-full max-w-2xl"
      >
        {/* Success Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative bg-linear-to-r from-orange-500 to-red-500 p-8 text-center text-white">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-20, 100],
                    x: [Math.random() * 400, Math.random() * 400],
                    rotate: 360
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5
                  }}
                  className="absolute w-4 h-4 bg-white/20 rounded-sm"
                  style={{ top: -20, left: i * 100 }}
                />
              ))}
            </div>
            
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FiCheckCircle className="w-10 h-10 text-green-500" />
            </motion.div>
            
            {/* Success Message */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-3xl font-black text-white mb-2">Order Confirmed!</h1>
              <p className="text-orange-100 text-lg">
                Order ID: <span className="font-mono font-bold text-white">{orderId}</span>
              </p>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Next Steps */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">What's Next?</h3>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl"
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                      <FiPackage className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Kitchen Preparing</p>
                      <p className="text-sm text-gray-600">Your order is being prepared</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl"
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <FiTruck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">On the Way</p>
                      <p className="text-sm text-gray-600">Delivery in 30-45 minutes</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Rate Your Experience</h3>
                
                {!feedbackSent ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-4"
                  >
                    {/* Star Rating */}
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setRating(star)}
                          className={`text-3xl transition-all duration-200 ${
                            star <= rating
                              ? 'text-yellow-400'
                              : 'text-gray-300 hover:text-yellow-200'
                          }`}
                        >
                          <FiStar
                            className={star <= rating ? 'fill-current' : ''}
                          />
                        </motion.button>
                      ))}
                    </div>

                    {/* Feedback Text */}
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share your experience (optional)"
                      rows={3}
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    />

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSendFeedback}
                      disabled={rating === 0}
                      className={`w-full py-3 rounded-2xl font-semibold transition-all duration-200 ${
                        rating === 0
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-orange-500 text-white hover:bg-orange-600'
                      }`}
                    >
                      Send Feedback
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-green-50 rounded-2xl text-center"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiCheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-green-700 font-semibold">Thank you for your feedback!</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 pt-6 border-t border-gray-100"
            >
              <button
                onClick={onBackToHome}
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FiHome className="w-4 h-4" />
                Back to Home
              </button>
              
              <button
                onClick={onBackToMenu}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-2xl font-semibold hover:bg-orange-600 transition-colors"
              >
                <FiPackage className="w-4 h-4" />
                Order More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OrderSuccess
