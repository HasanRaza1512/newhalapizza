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

  const deliveryFee = items.length ? 2.99 : 0
  const grandTotal = cartSubtotal + deliveryFee

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] bg-slate-950/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            className="absolute right-0 top-0 flex h-[100dvh] w-full flex-col bg-gray-950 shadow-2xl md:w-[420px] border-l border-gray-800"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between border-b border-gray-800 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-orange-500/10 p-2 text-orange-500">
                  <FiShoppingBag className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-white">Your Cart</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-800 hover:text-white"
                aria-label="Close cart sidebar"
              >
                <FiX className="h-6 w-6" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-900 text-gray-700 ring-8 ring-gray-900/50">
                    <FiShoppingCart className="h-10 w-10" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Your cart is empty
                  </h3>
                  <p className="mt-2 max-w-[200px] text-sm leading-relaxed text-gray-500">
                    Looks like you haven't added anything yet.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      navigate('/')
                    }}
                    className="mt-8 rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        key={item.cartKey}
                        className="group relative rounded-2xl border border-gray-800 bg-gray-900/50 p-4 transition-all hover:bg-gray-900 hover:border-gray-700"
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-800">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="truncate text-base font-bold text-white">
                                {item.name}
                              </h4>
                              <button
                                type="button"
                                onClick={() => removeItem(item.cartKey)}
                                className="text-slate-400 opacity-0 transition-all hover:text-rose-500 group-hover:opacity-100"
                                aria-label="Remove item"
                              >
                                <FiX className="h-5 w-5" />
                              </button>
                            </div>
                            <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                              {item.options?.size}
                              {item.options?.crust ? ` • ${item.options.crust}` : ''}
                              {item.options?.toppings?.length
                                ? ` • ${item.options.toppings.join(', ')}`
                                : ''}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                              <p className="text-base font-bold text-white">
                                AED {(item.price * item.quantity).toFixed(0)}
                              </p>
                              <div className="inline-flex items-center rounded-xl bg-gray-800 p-1">
                                <button
                                  type="button"
                                  onClick={() => decreaseQuantity(item.cartKey)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-700 text-white transition hover:bg-gray-600"
                                  aria-label={`Decrease quantity for ${item.name}`}
                                >
                                  -
                                </button>
                                <motion.span
                                  key={item.quantity}
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="min-w-[2rem] text-center text-sm font-bold text-white"
                                >
                                  {item.quantity}
                                </motion.span>
                                <button
                                  type="button"
                                  onClick={() => increaseQuantity(item.cartKey)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-700 text-white transition hover:bg-gray-600"
                                  aria-label={`Increase quantity for ${item.name}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            <footer className="border-t border-gray-800 bg-black/40 px-5 py-6 sm:px-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Subtotal ({cartCount} items)</span>
                  <motion.span
                    key={cartSubtotal}
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-bold text-white"
                  >
                    AED {cartSubtotal.toFixed(0)}
                  </motion.span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-white">AED {deliveryFee.toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-800 pt-4 text-lg font-black text-white uppercase tracking-tight">
                  <span>Total</span>
                  <motion.span
                    key={grandTotal}
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    AED {grandTotal.toFixed(0)}
                  </motion.span>
                </div>
                <button
                  type="button"
                  disabled={items.length === 0}
                  onClick={() => {
                    onClose()
                    navigate('/checkout')
                  }}
                  className="mt-6 w-full rounded-2xl bg-orange-500 px-6 py-4 text-base font-black text-white uppercase tracking-wide shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:shadow-orange-500/30 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-600 disabled:shadow-none active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
              </div>
            </footer>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default CartSidebar
