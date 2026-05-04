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
            className="absolute right-0 top-0 flex h-[100dvh] w-full flex-col bg-white shadow-2xl ring-1 ring-slate-900/5 md:w-[400px]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2.5">
                <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                  <FiShoppingBag className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Your Cart</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close cart sidebar"
              >
                <FiX className="h-6 w-6" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-slate-300 ring-8 ring-slate-50/50">
                    <FiShoppingCart className="h-10 w-10" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Your cart is empty
                  </h3>
                  <p className="mt-2 max-w-[200px] text-sm leading-relaxed text-slate-500">
                    Looks like you haven't added any pizza yet.
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
                        className="group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="truncate text-base font-bold text-slate-900">
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
                              <p className="text-base font-bold text-slate-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
                                <button
                                  type="button"
                                  onClick={() => decreaseQuantity(item.cartKey)}
                                  className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-slate-600 shadow-sm transition hover:text-slate-900"
                                  aria-label={`Decrease quantity for ${item.name}`}
                                >
                                  -
                                </button>
                                <motion.span
                                  key={item.quantity}
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="min-w-[2rem] text-center text-sm font-semibold text-slate-900"
                                >
                                  {item.quantity}
                                </motion.span>
                                <button
                                  type="button"
                                  onClick={() => increaseQuantity(item.cartKey)}
                                  className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-slate-600 shadow-sm transition hover:text-slate-900"
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

            <footer className="border-t border-slate-200 bg-slate-50 px-5 py-6 sm:px-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <motion.span
                    key={cartSubtotal}
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-medium text-slate-900"
                  >
                    ${cartSubtotal.toFixed(2)}
                  </motion.span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-slate-900">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <motion.span
                    key={grandTotal}
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    ${grandTotal.toFixed(2)}
                  </motion.span>
                </div>
                <button
                  type="button"
                  disabled={items.length === 0}
                  onClick={() => {
                    onClose()
                    navigate('/checkout')
                  }}
                  className="mt-6 w-full rounded-2xl bg-orange-500 px-6 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:translate-y-0 disabled:hover:shadow-none"
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
