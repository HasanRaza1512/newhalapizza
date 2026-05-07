import { useMemo, useState } from 'react'
import { useCartStore } from '../store'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiPackage, FiTruck, FiMapPin, FiPhone, FiUser, FiArrowLeft, FiStar, FiSend } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { submitOrder } from '../services/orderService'

function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const navigate = useNavigate()

  const fulfillment = useCartStore((state) => state.fulfillment)
  const [fulfillmentType, setFulfillmentType] = useState(fulfillment?.type || 'delivery')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderStatus, setOrderStatus] = useState({ type: '', message: '', orderId: '' })
  
  // Feedback state
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: fulfillment?.phone || '',
    address: fulfillment?.address || ''
  })

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )

  const deliveryFee = fulfillmentType === 'delivery' && items.length ? 5.00 : 0
  const total = subtotal + deliveryFee

  const handlePlaceOrder = async (e) => {
    e?.preventDefault()
    if (items.length === 0) return

    // Basic validation
    if (!formData.name || !formData.phone || (fulfillmentType === 'delivery' && !formData.address)) {
      setOrderStatus({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }

    setIsSubmitting(true)
    setOrderStatus({ type: '', message: '', orderId: '' })

    try {
      const orderData = {
        customer: formData,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          options: item.options
        })),
        fulfillment: fulfillmentType,
        payment: paymentMethod,
        subtotal,
        deliveryFee,
        total,
        createdAt: new Date().toISOString(),
        status: 'pending'
      }

      // Submit order using service
      const result = await submitOrder(orderData)
      
      setOrderStatus({ 
        type: 'success', 
        message: 'Order placed successfully!', 
        orderId: result.orderId 
      })
      
      clearCart()

    } catch (err) {
      console.error("Order error:", err)
      setOrderStatus({ type: 'error', message: 'Failed to place order. Please check your connection.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendFeedback = async () => {
    if (rating === 0) return
    setFeedbackSent(true)
    // In a real app, you'd save this to a 'feedback' collection
    console.log("Feedback sent:", { rating, feedback, orderId: orderStatus.orderId })
  }

  if (orderStatus.type === 'success') {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl overflow-hidden rounded-[3rem] bg-white shadow-2xl border border-gray-50"
        >
          <div className="relative bg-emerald-500 px-8 py-16 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white text-emerald-500 shadow-xl"
            >
              <FiCheckCircle className="h-12 w-12" strokeWidth={3} />
            </motion.div>
            <motion.h2 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-black uppercase tracking-tight"
            >
              Order Placed!
            </motion.h2>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-emerald-100"
            >
              Your order ID: <span className="font-mono font-bold text-white">{orderStatus.orderId}</span>
            </motion.p>
            
            {/* Animated particles background simulation */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
               {[...Array(6)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                     y: [-20, 100], 
                     x: [Math.random() * 400, Math.random() * 400],
                     rotate: 360 
                   }}
                   transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear" }}
                   className="absolute h-4 w-4 bg-white rounded-sm"
                   style={{ top: -20, left: i * 100 }}
                 />
               ))}
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Next Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                      <FiPackage className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-bold text-gray-600">Kitchen is preparing your pizza</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <FiTruck className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-bold text-gray-600">Courier will pick up shortly</p>
                  </div>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Rate your experience</h3>
                {!feedbackSent ? (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          onClick={() => setRating(s)}
                          className={`text-2xl transition-all hover:scale-110 ${s <= rating ? 'text-orange-500' : 'text-gray-200'}`}
                        >
                          <FiStar fill={s <= rating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Any special requests or feedback?"
                      className="w-full resize-none rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5"
                      rows={2}
                    />
                    <button
                      onClick={handleSendFeedback}
                      disabled={rating === 0}
                      className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-black disabled:opacity-30"
                    >
                      <FiSend /> Send Feedback
                    </button>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-2xl bg-emerald-50 p-6 text-center"
                  >
                    <p className="text-sm font-bold text-emerald-600">Thank you for your feedback! ❤️</p>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="mt-12 flex justify-center pt-8 border-t border-gray-50">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 rounded-2xl border-2 border-gray-100 px-8 py-4 text-sm font-black uppercase tracking-widest text-gray-900 transition-all hover:border-gray-200 hover:bg-gray-50"
              >
                <FiArrowLeft /> Back to Menu
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_24rem]">
        <section className="space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl uppercase">
              Checkout
            </h1>
            <p className="max-w-md text-sm font-medium leading-relaxed text-gray-400">
              Just a few more details and your delicious pizza will be on its way to your doorstep.
            </p>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-12">
            {/* Delivery Info */}
            <div className="space-y-8 rounded-[2.5rem] border border-gray-50 bg-white p-8 shadow-sm sm:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <FiMapPin className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">Delivery Details</h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <FiUser className="h-3 w-3" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-5 py-4 text-sm text-gray-900 outline-none transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-8 focus:ring-orange-500/5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <FiPhone className="h-3 w-3" /> Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 000 0000"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-5 py-4 text-sm text-gray-900 outline-none transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-8 focus:ring-orange-500/5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  <FiMapPin className="h-3 w-3" /> Delivery Address
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street name, building, apartment number..."
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-gray-100 bg-gray-50/50 px-5 py-4 text-sm text-gray-900 outline-none transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-8 focus:ring-orange-500/5"
                />
              </div>
            </div>

            {/* Fulfillment & Payment */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4 rounded-[2.5rem] border border-gray-50 bg-white p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Fulfillment</p>
                <div className="flex gap-3">
                  {[
                    { id: 'delivery', label: 'Delivery' },
                    { id: 'pickup', label: 'Pickup' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFulfillmentType(option.id)}
                      className={`flex-1 rounded-2xl border-2 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                        fulfillmentType === option.id
                          ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-xl shadow-orange-500/5'
                          : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-[2.5rem] border border-gray-50 bg-white p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Payment Mode</p>
                <div className="flex gap-3">
                  {[
                    { id: 'cod', label: 'Cash' },
                    { id: 'card', label: 'Card' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex-1 rounded-2xl border-2 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                        paymentMethod === method.id
                          ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-xl shadow-orange-500/5'
                          : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* Sidebar Summary */}
        <aside className="h-fit sticky top-32 space-y-8 rounded-[3rem] border border-gray-50 bg-white p-8 shadow-2xl shadow-gray-100/50 sm:p-10">
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Order Summary</h2>
            <p className="mt-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
              {cartCount} item{cartCount === 1 ? '' : 's'} to be ordered
            </p>
          </div>

          <ul className="max-h-72 space-y-4 overflow-auto pr-2 custom-scrollbar">
            {items.map((item) => (
              <li
                key={item.cartKey}
                className="flex items-start justify-between gap-4 rounded-3xl border border-gray-50 bg-gray-50/30 p-5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-gray-900 uppercase tracking-tight">
                    {item.name}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {item.quantity} x AED {item.price.toFixed(0)}
                  </p>
                </div>
                <p className="text-sm font-black text-gray-900">
                  AED {(item.quantity * item.price).toFixed(0)}
                </p>
              </li>
            ))}
          </ul>

          <div className="space-y-4 border-t border-gray-50 pt-8">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
              <span>Subtotal</span>
              <span className="text-gray-900">AED {subtotal.toFixed(0)}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
              <span>Delivery</span>
              <span className="text-gray-900">AED {deliveryFee.toFixed(0)}</span>
            </div>
            <div className="flex items-center justify-between pt-6">
              <span className="text-2xl font-black text-gray-900 uppercase tracking-tight">Total</span>
              <span className="text-3xl font-black text-orange-600">AED {total.toFixed(0)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={items.length === 0 || isSubmitting}
              className="w-full rounded-4xl bg-orange-500 py-6 text-base font-black text-white uppercase tracking-widest shadow-2xl shadow-orange-500/30 transition-all duration-500 hover:bg-orange-600 hover:-translate-y-1 active:scale-95 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none"
            >
              {isSubmitting ? 'Processing Order...' : 'Place Order Now'}
            </button>

            <AnimatePresence>
              {orderStatus.message && orderStatus.type === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 rounded-2xl bg-rose-50 p-5 text-xs font-bold text-rose-600 border border-rose-100"
                >
                  <FiAlertCircle className="shrink-0 h-4 w-4" />
                  {orderStatus.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default CheckoutPage
