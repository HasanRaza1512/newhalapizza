import { useEffect, useRef } from 'react'
import { useCartStore } from '../store'
import { FiShoppingBag } from 'react-icons/fi'

function StickyCategoryBar({ categories, activeCategory, onCategoryClick }) {
  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.openCart)
  const navRef = useRef(null)

  const cartSubtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    if (navRef.current) {
      const activeElement = navRef.current.querySelector('[data-active="true"]')
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [activeCategory])

  return (
    <div className="sticky top-16 z-40 w-full border-b border-gray-100 bg-white/80 py-2.5 backdrop-blur-xl transition-all duration-300 sm:top-18 sm:py-3">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Navigation Links - Responsive */}
        <nav ref={navRef} className="flex flex-1 items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth px-4 py-3 sm:gap-3 sm:px-0 sm:py-0">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              data-active={activeCategory === category}
              onClick={() => onCategoryClick(category)}
              className={`shrink-0 rounded-full flex items-center justify-center h-[44px] px-5 text-[16px] sm:h-auto sm:px-5 sm:py-2 sm:text-[17px] font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-orange-50 text-orange-500 sm:bg-orange-100 sm:text-orange-600'
                  : 'bg-gray-100 text-gray-500 sm:text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Cart Button - Responsive */}
        <button
          type="button"
          onClick={openCart}
          className="hidden md:flex ml-2 shrink-0 items-center gap-2 rounded-full bg-orange-500 px-4 py-2 sm:ml-4 sm:gap-2.5 sm:px-5 sm:py-2.5 text-sm font-medium text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
        >
          <FiShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">
            {cartCount > 0 ? `PKR ${cartSubtotal.toFixed(0)}` : 'Cart'}
          </span>
          {cartCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-orange-600 sm:hidden">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

export default StickyCategoryBar
