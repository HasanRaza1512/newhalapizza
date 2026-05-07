import { motion } from 'framer-motion'
import { FiTruck, FiShoppingBag, FiMapPin } from 'react-icons/fi'

const FulfillmentType = ({ 
  fulfillmentType, 
  onFulfillmentTypeChange,
  selectedArea,
  deliveryAreas,
  isValidatingArea,
  isValidDeliveryArea,
  estimatedDeliveryTime
}) => {
  const fulfillmentOptions = [
    {
      id: 'delivery',
      label: 'Delivery',
      icon: FiTruck,
      description: 'We deliver to your doorstep',
      available: true
    },
    {
      id: 'pickup',
      label: 'Pickup',
      icon: FiShoppingBag,
      description: 'Collect from our store',
      available: true
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 }}
      className="bg-white rounded-3xl shadow-sm p-6 space-y-6"
    >
      <h2 className="text-lg font-bold text-gray-900">Order Type</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fulfillmentOptions.map((option, index) => {
          const Icon = option.icon
          const isSelected = fulfillmentType === option.id
          
          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => onFulfillmentTypeChange(option.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`relative p-6 border-2 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                isSelected
                  ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/10'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors ${
                isSelected
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              
              {/* Content */}
              <div className="text-center">
                <span className={`font-bold text-lg transition-colors ${
                  isSelected
                    ? 'text-orange-600'
                    : 'text-gray-900'
                }`}>
                  {option.label}
                </span>
                
                <p className="text-sm text-gray-500 mt-1">
                  {option.description}
                </p>
              </div>
              
              {/* Selected Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Delivery Area Selection (only for delivery) */}
      {fulfillmentType === 'delivery' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FiMapPin className="w-4 h-4" />
            Delivery Area
          </div>
          
          <select
            value={selectedArea || ''}
            onChange={(e) => onFulfillmentTypeChange('area', e.target.value)}
            disabled={isValidatingArea}
            className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none transition-colors disabled:opacity-50"
          >
            <option value="">Select your area</option>
            {deliveryAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          
          {/* Area Validation Status */}
          {selectedArea && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-xl flex items-center gap-2 ${
                isValidDeliveryArea
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {isValidatingArea ? (
                <>
                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium">Validating area...</span>
                </>
              ) : isValidDeliveryArea ? (
                <>
                  <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span className="text-sm font-medium">
                    Delivery available to {selectedArea}
                    {estimatedDeliveryTime && ` • ${estimatedDeliveryTime}`}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span className="text-sm font-medium">
                    Delivery not available to {selectedArea}
                  </span>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default FulfillmentType
