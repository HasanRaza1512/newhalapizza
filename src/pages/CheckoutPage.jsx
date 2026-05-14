import { useMemo, useState, useEffect } from 'react'
import { useCartStore } from '../stores/cartStore'
import { useLocationStore } from '../stores/locationStore'
import { useUIStore } from '../stores/uiStore'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiPackage, FiTruck, FiMapPin, FiPhone, FiUser, FiArrowLeft, FiStar, FiSend, FiHome, FiShoppingBag } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { cartToast, orderToast } from '../utils/toast'

// Import reusable checkout components
import CustomerInfoForm from '../components/checkout/CustomerInfoForm'
import OrderSummary from '../components/checkout/OrderSummary'
import PaymentMethod from '../components/checkout/PaymentMethod'
import OrderSuccess from '../components/checkout/OrderSuccess'

// Error boundary for debugging
const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (error) => {
      console.error('CheckoutPage Error:', error)
      setHasError(true)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleError)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleError)
    }
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">Please refresh the page and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  try {
    return children
  } catch (error) {
    console.error('ErrorBoundary caught:', error)
    return fallback || <div>Component error occurred</div>
  }
}

// Validation utilities
const validateName = (name) => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim())
}

function CheckoutPage() {
  const navigate = useNavigate()

  // Store hooks
  const {
    items,
    fulfillment,
    submitOrder,
    isSubmittingOrder,
    clearOrderError,
    getCartItemCount,
    increaseQuantity,
    decreaseQuantity,
    removeItem
  } = useCartStore()

  const {
    deliveryFee
  } = useLocationStore()

  const {
    setLoadingState,
    setError,
    addNotification
  } = useUIStore()

  // Derived state
  const fulfillmentType = fulfillment?.type || 'delivery'

  // Form state
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [orderStatus, setOrderStatus] = useState({ type: '', message: '', orderId: '' })

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    streetAddress: '',
    houseFlat: '',
    landmark: '',
    cashChange: '',
    email: '',
    notes: ''
  })

  // Validation errors
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    streetAddress: '',
    houseFlat: ''
  })

  // Touched fields
  const [touched, setTouched] = useState({
    name: false,
    streetAddress: false,
    houseFlat: false
  })

  // Calculations
  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [items])

  const totalDeliveryFee = fulfillmentType === 'delivery' && items.length ? (deliveryFee || 5.99) : 0
  const total = subtotal + totalDeliveryFee

  // Validation functions
  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required'
        } else if (!validateName(value)) {
          error = 'Please enter a valid name (letters only)'
        }
        break
      case 'streetAddress':
        if (fulfillmentType === 'delivery' && !value.trim()) {
          error = 'Street address is required'
        }
        break
      case 'houseFlat':
        if (fulfillmentType === 'delivery' && !value.trim()) {
          error = 'House/Apt is required'
        }
        break
    }
    return error
  }

  // Handle field changes
  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    if (touched[field]) {
      const error = validateField(field, value)
      setFieldErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  // Handle field blur
  const handleFieldBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field])
    setFieldErrors(prev => ({ ...prev, [field]: error }))
  }

  // Validate entire form
  const validateForm = () => {
    const errors = {}
    let isValid = true

    Object.keys(fieldErrors).forEach(field => {
      if ((field === 'streetAddress' || field === 'houseFlat') && fulfillmentType !== 'delivery') {
        return
      }

      const error = validateField(field, formData[field])
      if (error) {
        errors[field] = error
        isValid = false
      }
    })

    setFieldErrors(prev => ({ ...prev, ...errors }))
    return isValid
  }

  // Handle order submission
  const handlePlaceOrder = async (e) => {
    e?.preventDefault()

    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    // Mark all required fields as touched
    setTouched({
      name: true,
      streetAddress: fulfillmentType === 'delivery',
      houseFlat: fulfillmentType === 'delivery'
    })

    // Validate form
    if (!validateForm()) {
      toast.error('Please complete required fields')
      return
    }

    clearOrderError()
    setLoadingState('checkout', true)

    try {
      const customerInfo = {
        name: formData.name.trim(),
        phone: fulfillment?.phone || '',
        address: fulfillmentType === 'delivery' 
          ? `${formData.houseFlat.trim()}, ${formData.streetAddress.trim()}${formData.landmark ? ', ' + formData.landmark.trim() : ''}, ${fulfillment?.address || ''}`
          : 'Pickup',
        notes: formData.notes.trim(),
        cashChange: formData.cashChange.trim(),
        email: formData.email.trim()
      }

      const orderResult = await submitOrder(customerInfo)

      setOrderStatus({
        type: 'success',
        message: 'Order placed successfully!',
        orderId: orderResult.orderId
      })

      toast.success(`Order ${orderResult.orderId} placed successfully!`)

      // Add notification
      addNotification({
        type: 'success',
        title: 'Order Confirmed',
        message: `Your order ${orderResult.orderId} has been confirmed`,
        duration: 5000
      })

    } catch (error) {
      console.error("Order error:", error)
      setOrderStatus({
        type: 'error',
        message: error.message || 'Failed to place order. Please try again.'
      })

      toast.error(error.message || 'Failed to place order')
      setError('checkout', error.message)

    } finally {
      setLoadingState('checkout', false)
    }
  }

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !orderStatus.orderId) {
      navigate('/menu')
    }
  }, [items.length, navigate, orderStatus.orderId])

  if (orderStatus.type === 'success') {
    return (
      <OrderSuccess
        orderId={orderStatus.orderId}
        onBackToHome={() => navigate('/')}
        onBackToMenu={() => navigate('/menu')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28 sm:pb-12">
      {/* Header */}
      <div className="bg-white shadow-xs sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Back</span>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
          <div className="w-10 sm:w-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Main Checkout Form Area */}
          <div className="flex-1 space-y-6">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Auto-Fetched Info Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-sm p-5 sm:p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                    {fulfillment?.type === 'delivery' ? <FiTruck className="w-5 h-5" /> : <FiShoppingBag className="w-5 h-5" />}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 leading-tight">
                      {fulfillment?.type === 'delivery' ? 'Delivery Information' : 'Pickup Information'}
                    </h2>
                    <p className="text-[13px] text-gray-500 font-medium mt-0.5">Auto-filled from selection</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                        {fulfillment?.type === 'delivery' ? 'Delivery Area' : 'Pickup Location'}
                      </span>
                      <span className="font-semibold text-gray-900 text-[15px]">
                        {fulfillment?.address || 'Not Selected'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiPhone className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Phone Number</span>
                      <span className="font-semibold text-gray-900 text-[15px]">{fulfillment?.phone || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Customer Information Form */}
              <CustomerInfoForm
                formData={formData}
                fieldErrors={fieldErrors}
                touched={touched}
                onFieldChange={handleFieldChange}
                onFieldBlur={handleFieldBlur}
                fulfillmentType={fulfillmentType}
              />

              {/* Payment Method */}
              <PaymentMethod
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
              />

              {/* Order Status Messages */}
              <AnimatePresence>
                {orderStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-2xl flex items-center gap-3 ${orderStatus.type === 'error'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-green-50 text-green-700 border border-green-200'
                      }`}
                  >
                    {orderStatus.type === 'error' ? (
                      <FiAlertCircle className="w-5 h-5 shrink-0" />
                    ) : (
                      <FiCheckCircle className="w-5 h-5 shrink-0" />
                    )}
                    <span className="text-sm font-medium">{orderStatus.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop Place Order Button */}
              <div className="hidden sm:block">
                <motion.button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmittingOrder || items.length === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/25 transition-all duration-300 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {isSubmittingOrder ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Order...
                    </span>
                  ) : (
                    `Place Order • PKR ${total.toFixed(2)}`
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary (Sticky) */}
          <div className="w-full lg:w-[400px]">
            <div className="sticky top-24">
              <OrderSummary
                items={items}
                subtotal={subtotal}
                deliveryFee={totalDeliveryFee}
                total={total}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeItem={removeItem}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Place Order Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 sm:hidden">
        <motion.button
          type="submit"
          form="checkout-form"
          disabled={isSubmittingOrder || items.length === 0}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-[17px] shadow-lg shadow-orange-500/25 transition-all duration-300 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-between px-6"
        >
          {isSubmittingOrder ? (
            <span className="flex items-center justify-center gap-2 w-full">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            <>
              <span>Place Order</span>
              <span>PKR {total.toFixed(2)}</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}

// Wrap with ErrorBoundary for debugging
const CheckoutPageWithErrorBoundary = () => (
  <ErrorBoundary fallback={
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Checkout Error</h2>
        <p className="text-gray-600 mb-6">There was an error loading the checkout page.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
        >
          Refresh Page
        </button>
      </div>
    </div>
  }>
    <CheckoutPage />
  </ErrorBoundary>
)

export default CheckoutPageWithErrorBoundary
