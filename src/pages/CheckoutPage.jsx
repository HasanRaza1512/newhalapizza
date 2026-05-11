import { useMemo, useState, useEffect } from 'react'
import { useCartStore } from '../stores/cartStore'
import { useLocationStore } from '../stores/locationStore'
import { useUIStore } from '../stores/uiStore'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiPackage, FiTruck, FiMapPin, FiPhone, FiUser, FiArrowLeft, FiStar, FiSend, FiHome, FiShoppingBag } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { cartToast, orderToast } from '../utils/toast'

// Import reusable checkout components
import CustomerInfoForm from '../components/checkout/CustomerInfoForm'
import OrderSummary from '../components/checkout/OrderSummary'
import PaymentMethod from '../components/checkout/PaymentMethod'
import FulfillmentType from '../components/checkout/FulfillmentType'
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
const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/
  return phoneRegex.test(phone.trim())
}

const validateName = (name) => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim())
}

const validateAddress = (address) => {
  return address.trim().length >= 10
}

function CheckoutPage() {
  const navigate = useNavigate()

  // Store hooks
  const {
    items,
    fulfillment,
    setFulfillment,
    clearCart,
    submitOrder,
    isSubmittingOrder,
    orderError,
    lastOrder,
    clearOrderError,
    getCartTotal,
    getCartItemCount,
    increaseQuantity,
    decreaseQuantity,
    removeItem
  } = useCartStore()

  const {
    selectedArea,
    setSelectedArea,
    isValidDeliveryArea,
    deliveryFee,
    estimatedDeliveryTime,
    isValidatingArea,
    deliveryAreas
  } = useLocationStore()

  const {
    setLoadingState,
    setError,
    clearError,
    addNotification
  } = useUIStore()

  // Form state
  const [fulfillmentType, setFulfillmentType] = useState(fulfillment?.type || 'delivery')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [orderStatus, setOrderStatus] = useState({ type: '', message: '', orderId: '' })

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    phone: fulfillment?.phone || '',
    address: fulfillment?.address || '',
    notes: ''
  })

  // Validation errors
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    phone: '',
    address: ''
  })

  // Touched fields
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    address: false
  })

  // Feedback state
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)

  // Calculations
  const cartCount = useMemo(() => getCartItemCount(), [getCartItemCount])
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
          error = 'Please enter a valid name (letters only, min 2 characters)'
        }
        break
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required'
        } else if (!validatePhone(value)) {
          error = 'Please enter a valid phone number'
        }
        break
      case 'address':
        if (fulfillmentType === 'delivery' && !value.trim()) {
          error = 'Address is required for delivery'
        } else if (fulfillmentType === 'delivery' && !validateAddress(value)) {
          error = 'Please enter a complete address (min 10 characters)'
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

    // Validate all fields
    Object.keys(formData).forEach(field => {
      if (field === 'address' && fulfillmentType !== 'delivery') return

      const error = validateField(field, formData[field])
      if (error) {
        errors[field] = error
        isValid = false
      }
    })

    // Validate delivery area
    if (fulfillmentType === 'delivery' && !isValidDeliveryArea) {
      errors.area = 'Please select a valid delivery area'
      isValid = false
    }

    setFieldErrors(prev => ({ ...prev, ...errors }))
    return isValid
  }

  // Handle area selection
  const handleAreaChange = async (area) => {
    await setSelectedArea(area)
    if (area) {
      handleFieldChange('address', `${area}, Quetta`)
    }
  }

  // Handle fulfillment type change
  const handleFulfillmentTypeChange = (type) => {
    setFulfillmentType(type)
    setFulfillment({ type })

    // Clear address error if switching to pickup
    if (type === 'pickup') {
      setFieldErrors(prev => ({ ...prev, address: '' }))
    }
  }

  // Handle order submission
  const handlePlaceOrder = async (e) => {
    e?.preventDefault()

    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    // Mark all fields as touched
    setTouched({
      name: true,
      phone: true,
      address: fulfillmentType === 'delivery'
    })

    // Validate form
    if (!validateForm()) {
      toast.error('Please correct the errors in the form')
      return
    }

    clearOrderError()
    setLoadingState('checkout', true)

    try {
      const customerInfo = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: fulfillmentType === 'delivery' ? formData.address.trim() : 'Pickup',
        notes: formData.notes.trim()
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

  // Handle feedback
  const handleSendFeedback = async () => {
    if (rating === 0) {
      toast.error('Please select a rating')
      return
    }

    setFeedbackSent(true)
    toast.success('Thank you for your feedback!')

    // In a real app, you'd save this to a backend
    console.log("Feedback sent:", {
      rating,
      feedback,
      orderId: orderStatus.orderId
    })
  }

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !orderStatus.orderId) {
      navigate('/menu')
    }
  }, [items.length, navigate, orderStatus.orderId])

  // Initialize fulfillment from store
  useEffect(() => {
    if (fulfillment) {
      setFulfillmentType(fulfillment.type)
      if (fulfillment.phone) {
        handleFieldChange('phone', fulfillment.phone)
      }
      if (fulfillment.address) {
        handleFieldChange('address', fulfillment.address)
      }
    }
  }, [fulfillment])

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
          {/* Left Column - Order Summary */}
          <div className="space-y-6">
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

          {/* Right Column - Checkout Form */}
          <div className="space-y-6">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Fulfillment Type */}
              <FulfillmentType
                fulfillmentType={fulfillmentType}
                onFulfillmentTypeChange={handleFulfillmentTypeChange}
                selectedArea={selectedArea}
                deliveryAreas={deliveryAreas}
                isValidatingArea={isValidatingArea}
                isValidDeliveryArea={isValidDeliveryArea}
                estimatedDeliveryTime={estimatedDeliveryTime}
              />

              {/* Customer Information */}
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

              {/* Place Order Button */}
              <motion.button
                type="submit"
                disabled={isSubmittingOrder || items.length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-orange-500 text-white py-4 rounded-4xl font-bold text-lg transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
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
            </form>
          </div>
        </div>
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
