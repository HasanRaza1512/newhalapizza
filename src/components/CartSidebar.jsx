import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiShoppingBag, FiShoppingCart, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store'

function CartSidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const cartSubtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )

  const deliveryFee = items.length ? 5.00 : 0
  const grandTotal = cartSubtotal + deliveryFee

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl md:w-[450px] border-l border-gray-100"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <header className="flex items-center justify-between border-b border-gray-50 px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <FiShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">Your Order</h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close cart sidebar"
              >
                <FiX className="h-5 w-5" />
              </button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gray-50 text-gray-200 ring-12 ring-gray-50/50"
                  >
                    <FiShoppingCart className="h-14 w-14" />
                  </motion.div>
                  <h3 className="text-xl font-black text-gray-900 uppercase">
                    Your cart is empty
                  </h3>
                  <p className="mt-3 max-w-[240px] text-sm font-medium leading-relaxed text-gray-400">
                    Looks like you haven't discovered our delicious pizzas yet!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      navigate('/')
                    }}
                    className="mt-10 rounded-full bg-orange-500 px-10 py-4 text-sm font-black text-white uppercase tracking-widest shadow-xl shadow-orange-500/20 transition-all hover:bg-orange-600 hover:-translate-y-1 active:scale-95"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key={item.cartKey}
                        className="group relative flex items-center gap-4 rounded-3xl border border-gray-50 bg-white p-4 transition-all hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5"
                      >
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-gray-50 shadow-inner">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover p-1"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="truncate text-base font-bold text-gray-900 uppercase tracking-tight">
                              {item.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeItem(item.cartKey)}
                              className="text-gray-300 transition-colors hover:text-rose-500"
                            >
                              <FiX className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest line-clamp-1">
                            {item.options?.size} • {item.options?.crust}
                            {item.options?.toppings?.length ? ` • ${item.options.toppings.length} Extra` : ''}
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <p className="text-base font-black text-orange-600">
                              AED {(item.price * item.quantity).toFixed(0)}
                            </p>
                            <div className="inline-flex items-center gap-3 rounded-2xl bg-gray-50 p-1.5">
                              <button
                                type="button"
                                onClick={() => decreaseQuantity(item.cartKey)}
                                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-gray-900 shadow-sm transition hover:bg-orange-50 hover:text-orange-600 active:scale-90"
                              >
                                -
                              </button>
                              <motion.span
                                key={item.quantity}
                                initial={{ y: -5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="min-w-[1.5rem] text-center text-sm font-black text-gray-900"
                              >
                                {item.quantity}
                              </motion.span>
                              <button
                                type="button"
                                onClick={() => increaseQuantity(item.cartKey)}
                                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-gray-900 shadow-sm transition hover:bg-orange-50 hover:text-orange-600 active:scale-90"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <footer className="border-t border-gray-50 bg-gray-50/30 px-6 py-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-gray-900">AED {cartSubtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span>Delivery Fee</span>
                    <span className="text-gray-900">AED {deliveryFee.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-xl font-black uppercase tracking-tight text-gray-900">Total</span>
                    <motion.span
                      key={grandTotal}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-black text-gray-900"
                    >
                      AED {grandTotal.toFixed(0)}
                    </motion.span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      navigate('/checkout')
                    }}
                    className="mt-6 w-full rounded-3xl bg-orange-500 px-6 py-5 text-base font-black text-white uppercase tracking-widest shadow-2xl shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:-translate-y-1 active:scale-95"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </footer>
            )}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default CartSidebar
