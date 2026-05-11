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
          className="fixed inset-0 z-70 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl md:w-112.5 border-l border-gray-100"
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
            <header className="flex items-center justify-between p-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-orange-100 text-orange-600">
                  <FiShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-gray-900">Your Order</h2>
                  <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</p>
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
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 no-scrollbar sm:custom-scrollbar">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8 flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-gray-50 text-gray-200 ring-8 sm:ring-12 ring-gray-50/50"
                  >
                    <FiShoppingCart className="h-10 w-10 sm:h-14 sm:w-14" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-900 uppercase">
                    Your cart is empty
                  </h3>
                  <p className="mt-3 max-w-60 text-[13px] sm:text-sm font-medium leading-relaxed text-gray-400">
                    Looks like you haven't discovered our delicious pizzas yet!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      navigate('/')
                    }}
                    className="mt-8 sm:mt-10 rounded-full bg-orange-500 px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm font-black text-white uppercase tracking-widest shadow-xl shadow-orange-500/20 transition-all hover:bg-orange-600 hover:-translate-y-1 active:scale-95"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4 sm:space-y-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key={item.cartKey}
                        className="group relative flex items-center gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-gray-50 bg-white p-3 sm:p-4 transition-all hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5"
                      >
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full bg-gray-50 shadow-inner">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover p-1"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="truncate text-sm sm:text-base font-bold text-gray-900 uppercase tracking-tight">
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
                          <p className="mt-0.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest line-clamp-1">
                            {item.options?.size}
                            {item.category?.toLowerCase() === 'pizza' && item.options?.crust ? ` • ${item.options.crust}` : ''}
                            {item.options?.toppings?.length ? ` • ${item.options.toppings.length} Extra` : ''}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <p className="text-sm sm:text-base font-black text-orange-600">
                              AED {(item.price * item.quantity).toFixed(0)}
                            </p>
                            <div className="inline-flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-gray-50 p-1 sm:p-1.5">
                              <button
                                type="button"
                                onClick={() => decreaseQuantity(item.cartKey)}
                                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl bg-white text-gray-900 shadow-sm transition hover:bg-orange-50 hover:text-orange-600 active:scale-90"
                              >
                                -
                              </button>
                              <motion.span
                                key={item.quantity}
                                initial={{ y: -5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="min-w-4 sm:min-w-6 text-center text-xs sm:text-sm font-black text-gray-900"
                              >
                                {item.quantity}
                              </motion.span>
                              <button
                                type="button"
                                onClick={() => increaseQuantity(item.cartKey)}
                                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl bg-white text-gray-900 shadow-sm transition hover:bg-orange-50 hover:text-orange-600 active:scale-90"
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
              <footer className="border-t border-gray-50 bg-gray-50/30 px-4 py-6 sm:px-6 sm:py-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-gray-900">AED {cartSubtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span>Delivery Fee</span>
                    <span className="text-gray-900">AED {deliveryFee.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 sm:pt-4">
                    <span className="text-lg sm:text-xl font-black uppercase tracking-tight text-gray-900">Total</span>
                    <motion.span
                      key={grandTotal}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl sm:text-3xl font-black text-gray-900"
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
                    className="mt-4 sm:mt-6 w-full rounded-2xl sm:rounded-3xl bg-orange-500 px-6 py-4 sm:py-5 text-sm sm:text-base font-black text-white uppercase tracking-widest shadow-xl sm:shadow-2xl shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:-translate-y-1 active:scale-95"
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
