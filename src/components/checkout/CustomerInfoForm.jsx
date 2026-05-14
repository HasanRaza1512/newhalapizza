import { motion } from 'framer-motion'
import { FiUser, FiHome, FiAlertCircle, FiMapPin, FiMessageSquare, FiDollarSign, FiMail } from 'react-icons/fi'

const CustomerInfoForm = ({ 
  formData, 
  fieldErrors, 
  touched, 
  onFieldChange, 
  onFieldBlur, 
  fulfillmentType 
}) => {
  const isDelivery = fulfillmentType === 'delivery';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-3xl shadow-sm p-4 sm:p-6"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-6">Customer Information</h2>
      
      <div className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
              className={`w-full pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:outline-none transition-all duration-200 ${
                fieldErrors.name
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'
              }`}
            />
          </div>
          {touched.name && fieldErrors.name && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <FiAlertCircle className="w-4 h-4 shrink-0" />
              {fieldErrors.name}
            </p>
          )}
        </div>

        {isDelivery && (
          <>
            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <div className="relative">
                <FiHome className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) => onFieldChange('streetAddress', e.target.value)}
                  onBlur={() => onFieldBlur('streetAddress')}
                  placeholder="e.g. 123 Main St"
                  className={`w-full pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:outline-none transition-all duration-200 ${
                    fieldErrors.streetAddress
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'
                  }`}
                />
              </div>
              {touched.streetAddress && fieldErrors.streetAddress && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4 shrink-0" />
                  {fieldErrors.streetAddress}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* House / Apartment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  House/Apt *
                </label>
                <input
                  type="text"
                  value={formData.houseFlat}
                  onChange={(e) => onFieldChange('houseFlat', e.target.value)}
                  onBlur={() => onFieldBlur('houseFlat')}
                  placeholder="e.g. Apt 4B"
                  className={`w-full px-4 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:outline-none transition-all duration-200 ${
                    fieldErrors.houseFlat
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'
                  }`}
                />
                {touched.houseFlat && fieldErrors.houseFlat && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <FiAlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.houseFlat}
                  </p>
                )}
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Landmark
                </label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => onFieldChange('landmark', e.target.value)}
                  placeholder="e.g. Near park"
                  className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-orange-500 focus:outline-none transition-all duration-200 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>
            
            {/* Cash Change */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cash Change Required?
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.cashChange}
                  onChange={(e) => onFieldChange('cashChange', e.target.value)}
                  placeholder="e.g. Need change for 5000"
                  className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-orange-500 focus:outline-none transition-all duration-200 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>
          </>
        )}

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address (Optional)
          </label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              placeholder="e.g. your@email.com"
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-orange-500 focus:outline-none transition-all duration-200 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>
        </div>

        {/* Order Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isDelivery ? 'Delivery Instructions / Notes' : 'Order Notes (Optional)'}
          </label>
          <div className="relative">
             <FiMessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <textarea
              value={formData.notes}
              onChange={(e) => onFieldChange('notes', e.target.value)}
              placeholder="Special instructions or notes for your order"
              rows={2}
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-orange-500 focus:outline-none transition-all duration-200 resize-none focus:ring-4 focus:ring-orange-500/10"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CustomerInfoForm
