import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPackage, FiMinus, FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi'

const OrderSummary = ({
  items,
  subtotal,
  deliveryFee,
  total,
  increaseQuantity,
  decreaseQuantity,
  removeItem
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-3xl shadow-sm overflow-hidden"
    >
      <div 
        className="p-4 sm:p-6 flex items-center justify-between cursor-pointer sm:cursor-default bg-white border-b sm:border-b-0 border-gray-100 z-10 relative"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <FiPackage className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
          <span className="text-sm text-gray-500 hidden sm:inline">
            ({itemCount} items)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-900 sm:hidden">
            PKR {total.toFixed(2)}
          </span>
          <button className="text-gray-400 sm:hidden">
            {isExpanded ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {(isExpanded || typeof window !== 'undefined' && window.innerWidth >= 640) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:block"
          >
            <div className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-6">
              {/* Order Items */}
              <div className="space-y-4 max-h-[50vh] sm:max-h-80 overflow-y-auto pr-2">
        {items.map((item, index) => (
          <motion.div
            key={item.cartKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>

              {/* Options */}
              {item.options.size && (
                <p className="text-sm text-gray-500">
                  Size: {item.options.size}
                  {item.options.crust && ` • Crust: ${item.options.crust}`}
                </p>
              )}

              {/* Toppings */}
              {item.options.toppings && item.options.toppings.length > 0 && (
                <p className="text-xs text-gray-400">
                  Toppings: {item.options.toppings.join(', ')}
                </p>
              )}

              {/* Price and Quantity Controls */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-semibold text-gray-900">
                  PKR {item.price.toFixed(2)} each
                </span>

                <div className="flex items-center gap-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl">
                    <button
                      onClick={() => decreaseQuantity(item.cartKey)}
                      className="p-2 hover:bg-gray-100 transition-colors rounded-l-xl"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus className="w-3 h-3 text-gray-600" />
                    </button>

                    <span className="px-3 py-1 text-sm font-semibold text-gray-900 min-w-12 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.cartKey)}
                      className="p-2 hover:bg-gray-100 transition-colors rounded-r-xl"
                      aria-label="Increase quantity"
                    >
                      <FiPlus className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.cartKey)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    aria-label="Remove item"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">PKR {subtotal.toFixed(2)}</span>
                </div>

                {deliveryFee > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-medium">PKR {deliveryFee.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-orange-600">PKR {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default OrderSummary
