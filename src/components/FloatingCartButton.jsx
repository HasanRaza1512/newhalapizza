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
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center gap-4 rounded-2xl bg-orange-500 px-6 py-4 text-white shadow-2xl shadow-orange-500/30 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/20 cursor-pointer transition-all active:scale-95"
          aria-label="View cart"
        >
          <div className="relative flex items-center justify-center">
            <FiShoppingBag className="h-6 w-6 text-white" />
            <motion.span
              key={cartCount}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="absolute -right-3 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-orange-600 shadow-sm ring-2 ring-orange-500"
            >
              {cartCount}
            </motion.span>
          </div>
          <div className="flex flex-col items-start pl-4 border-l border-white/20">
            <span className="text-[10px] uppercase tracking-widest font-black text-white/80 leading-none mb-1">Your Order</span>
            <motion.span
              key={cartSubtotal}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-base font-black leading-none uppercase"
            >
              PKR {cartSubtotal.toFixed(0)}
            </motion.span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default FloatingCartButton
