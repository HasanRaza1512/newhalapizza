import { useMemo, useState } from 'react'
import { useCartStore } from '../stores/cartStore'
import { useLocationStore } from '../stores/locationStore'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function CheckoutPageSimple() {
  const navigate = useNavigate()
  
  // Store hooks
  const { 
    items, 
    clearCart, 
    getCartTotal,
    getCartItemCount
  } = useCartStore()
  
  const { 
    selectedArea, 
    deliveryFee
  } = useLocationStore()

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )

  const total = useMemo(
    () => subtotal + (deliveryFee || 0),
    [subtotal, deliveryFee],
  )

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            Browse Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
          
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-sm p-6 space-y-6"
            >
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
                <span className="ml-auto text-sm text-gray-500">
                  {cartCount} items
                </span>
              </div>
              
              {/* Order Items */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.cartKey} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × AED {item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <p className="font-semibold text-gray-900">
                      AED {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">AED {subtotal.toFixed(2)}</span>
                </div>
                
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-medium">AED {deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-orange-600">AED {total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Placeholder for checkout form */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-sm p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-6">Checkout Form</h2>
              <p className="text-gray-600">Checkout form will be available soon.</p>
              <div className="p-8 bg-blue-50 rounded-2xl text-center">
                <p className="text-blue-700 font-medium">🚧 Under Development</p>
                <p className="text-blue-600 text-sm mt-2">Advanced checkout features are being implemented.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPageSimple
