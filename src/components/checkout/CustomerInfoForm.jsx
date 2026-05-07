import { motion } from 'framer-motion'
import { FiUser, FiPhone, FiHome, FiAlertCircle } from 'react-icons/fi'

const CustomerInfoForm = ({ 
  formData, 
  fieldErrors, 
  touched, 
  onFieldChange, 
  onFieldBlur, 
  fulfillmentType 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-3xl shadow-sm p-6"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h2>
      
      <div className="space-y-6">
        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              onBlur={() => onFieldBlur('name')}
              placeholder="Enter your full name"
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-200 ${
                fieldErrors.name
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'
              }`}
            />
          </div>
          {touched.name && fieldErrors.name && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <FiAlertCircle className="w-4 h-4 shrink-0" />
              {fieldErrors.name}
            </motion.p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
              onBlur={() => onFieldBlur('phone')}
              placeholder="+92 3XX XXXXXXX"
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-200 ${
                fieldErrors.phone
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'
              }`}
            />
          </div>
          {touched.phone && fieldErrors.phone && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <FiAlertCircle className="w-4 h-4 shrink-0" />
              {fieldErrors.phone}
            </motion.p>
          )}
        </div>

        {/* Address Field (only for delivery) */}
        {fulfillmentType === 'delivery' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Address *
            </label>
            <div className="relative">
              <FiHome className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <textarea
                value={formData.address}
                onChange={(e) => onFieldChange('address', e.target.value)}
                onBlur={() => onFieldBlur('address')}
                placeholder="Enter your complete delivery address"
                rows={3}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-200 resize-none ${
                  fieldErrors.address
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'
                }`}
              />
            </div>
            {touched.address && fieldErrors.address && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              >
                <FiAlertCircle className="w-4 h-4 shrink-0" />
                {fieldErrors.address}
              </motion.p>
            )}
          </div>
        )}

        {/* Order Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => onFieldChange('notes', e.target.value)}
            placeholder="Special instructions or notes for your order"
            rows={2}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none transition-all duration-200 resize-none focus:ring-4 focus:ring-orange-500/10"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default CustomerInfoForm
