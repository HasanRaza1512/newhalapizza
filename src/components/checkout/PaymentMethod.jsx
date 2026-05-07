import { motion } from 'framer-motion'
import { FiCreditCard, FiDollarSign } from 'react-icons/fi'

const PaymentMethod = ({ paymentMethod, onPaymentMethodChange }) => {
  const paymentOptions = [
    {
      id: 'cod',
      label: 'Cash on Delivery',
      icon: FiDollarSign,
      description: 'Pay when your order arrives',
      available: true
    },
    {
      id: 'card',
      label: 'Card Payment',
      icon: FiCreditCard,
      description: 'Pay securely with credit/debit card',
      available: false
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-3xl shadow-sm p-6"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-6">Payment Method</h2>
      
      <div className="space-y-3">
        {paymentOptions.map((option, index) => {
          const Icon = option.icon
          const isSelected = paymentMethod === option.id
          
          return (
            <motion.label
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`relative block cursor-pointer transition-all duration-200 ${
                !option.available 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-[1.02]'
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={option.id}
                checked={isSelected}
                onChange={() => option.available && onPaymentMethodChange(option.id)}
                disabled={!option.available}
                className="sr-only"
              />
              
              <div className={`p-4 border-2 rounded-2xl transition-all duration-200 ${
                isSelected
                  ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/10'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }${!option.available ? ' cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`p-2 rounded-xl transition-colors ${
                    isSelected
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold transition-colors ${
                        isSelected
                          ? 'text-orange-600'
                          : 'text-gray-900'
                      }`}>
                        {option.label}
                      </span>
                      
                      {!option.available && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1">
                      {option.description}
                    </p>
                  </div>
                  
                  {/* Selected Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.label>
          )
        })}
      </div>
      
      {/* Security Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 text-blue-600 mt-0.5">
            🔒
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900">Secure Payment</p>
            <p className="text-xs text-blue-700 mt-1">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PaymentMethod
