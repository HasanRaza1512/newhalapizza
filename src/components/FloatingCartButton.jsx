import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag } from 'react-icons/fi'
import { useCartStore } from '../store'
import { useLocation } from 'react-router-dom'

function FloatingCartButton() {
  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.openCart)
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const location = useLocation()

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  )

  const cartSubtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  )

  // Only show the floating button if there are items, we are not on the checkout page, and the cart sidebar isn't currently open
  const isVisible = cartCount > 0 && location.pathname !== '/checkout' && !isCartOpen

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="floating-cart-btn"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={openCart}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center gap-4 rounded-full bg-slate-900 px-5 py-3.5 text-white shadow-2xl shadow-slate-900/40 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-500/50 cursor-pointer"
          aria-label="View cart"
        >
          <div className="relative flex items-center justify-center">
            <FiShoppingBag className="h-6 w-6 text-orange-400" />
            <motion.span 
              key={cartCount}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="absolute -right-2.5 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-slate-900"
            >
              {cartCount}
            </motion.span>
          </div>
          <div className="flex flex-col items-start pl-3 border-l border-slate-700/60">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 leading-none mb-1">Your Order</span>
            <motion.span 
              key={cartSubtotal}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-base font-bold leading-none"
            >
              ${cartSubtotal.toFixed(2)}
            </motion.span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default FloatingCartButton
