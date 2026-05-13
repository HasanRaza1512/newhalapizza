import { useCartStore } from '../store'
import { FiShoppingBag } from 'react-icons/fi'

function StickyCategoryBar({ categories, activeCategory, onCategoryClick }) {
  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.openCart)

  const cartSubtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="sticky top-16 z-40 w-full border-b border-gray-100 bg-white/80 py-2.5 backdrop-blur-xl transition-all duration-300 sm:top-18 sm:py-3">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Navigation Links - Responsive */}
        <nav className="flex flex-1 items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth sm:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryClick(category)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-[15px] font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
          className="ml-2 flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-4 py-2 sm:ml-4 sm:gap-2.5 sm:px-5 sm:py-2.5 text-sm font-medium text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
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
