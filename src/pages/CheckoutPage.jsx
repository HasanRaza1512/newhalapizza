import { useMemo, useState } from 'react'
import { useCartStore } from '../store'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const navigate = useNavigate()

  const [fulfillmentType, setFulfillmentType] = useState('delivery')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderStatus, setOrderStatus] = useState({ type: '', message: '' })

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )

  const deliveryFee = fulfillmentType === 'delivery' && items.length ? 2.99 : 0
  const total = subtotal + deliveryFee

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (items.length === 0) return

    setIsSubmitting(true)
    setOrderStatus({ type: '', message: '' })

    try {
      const ordersCol = collection(db, 'orders')
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
        createdAt: serverTimestamp(),
        status: 'pending'
      }

      await addDoc(ordersCol, orderData)
      
      setOrderStatus({ type: 'success', message: 'Order placed successfully! Redirecting...' })
      
      // Clear cart and redirect
      setTimeout(() => {
        clearCart()
        navigate('/')
      }, 3000)

    } catch (err) {
      console.error("Order error:", err)
      setOrderStatus({ type: 'error', message: 'Failed to place order. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_22rem] lg:gap-10">
      <section className="space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl uppercase">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Complete your order by providing your delivery details.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Phone</label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+971 50 123 4567"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Delivery Address</label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Street name, building, apartment number..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Delivery option</p>
              <div className="flex gap-3">
                {[
                  { id: 'delivery', label: 'Delivery' },
                  { id: 'pickup', label: 'Pickup' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFulfillmentType(option.id)}
                    className={`flex-1 rounded-2xl border-2 py-3 text-sm font-bold transition-all duration-300 ${
                      fulfillmentType === option.id
                        ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-lg shadow-orange-500/5'
                        : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Payment</p>
              <div className="flex gap-3">
                {[
                  { id: 'cod', label: 'Cash' },
                  { id: 'card', label: 'Card' },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex-1 rounded-2xl border-2 py-3 text-sm font-bold transition-all duration-300 ${
                      paymentMethod === method.id
                        ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-lg shadow-orange-500/5'
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

      <aside className="h-fit space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Summary</h2>
          <p className="mt-1 text-sm text-gray-500">
            {cartCount} item{cartCount === 1 ? '' : 's'} to be ordered
          </p>
        </div>

        <ul className="max-h-64 space-y-4 overflow-auto pr-1 custom-scrollbar">
          {items.map((item) => (
            <li
              key={item.cartKey}
              className="flex items-start justify-between gap-4 rounded-2xl border border-gray-50 bg-gray-50/50 p-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  {item.quantity} x AED {item.price.toFixed(0)}
                </p>
              </div>
              <p className="text-sm font-black text-gray-900">
                AED {(item.quantity * item.price).toFixed(0)}
              </p>
            </li>
          ))}
        </ul>

        <div className="space-y-4 border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span className="font-bold text-gray-900">AED {subtotal.toFixed(0)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Delivery</span>
            <span className="font-bold text-gray-900">AED {deliveryFee.toFixed(0)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 pt-6 text-2xl font-black text-gray-900 uppercase tracking-tight">
            <span>Total</span>
            <span className="text-orange-600">AED {total.toFixed(0)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={items.length === 0 || isSubmitting}
            className="w-full rounded-2xl bg-orange-500 py-5 text-[15px] font-black text-white uppercase tracking-widest shadow-xl shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 active:scale-95 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none"
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>

          <AnimatePresence>
            {orderStatus.message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`flex items-center gap-3 rounded-2xl p-4 text-sm font-bold ${
                  orderStatus.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}
              >
                {orderStatus.type === 'success' ? <FiCheckCircle className="shrink-0" /> : <FiAlertCircle className="shrink-0" />}
                {orderStatus.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </div>
  )
}

export default CheckoutPage
