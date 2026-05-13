import { useCartStore } from '../store'
import { FiShoppingBag } from 'react-icons/fi'

function StickyCategoryBar({ categories, activeCategory, onCategoryClick }) {
  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.openCart)

  const cartSubtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="sticky top-[72px] z-40 w-full bg-white py-3 transition-all duration-300 sm:top-18 sm:border-b sm:border-gray-100 sm:bg-white/80 sm:backdrop-blur-xl sm:py-3">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Navigation Links - Responsive */}
        <nav className="no-scrollbar flex flex-1 items-center gap-3 overflow-x-auto whitespace-nowrap sm:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryClick(category)}
              className={`shrink-0 rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                activeCategory === category
                  ? 'bg-orange-50 text-orange-600 sm:bg-orange-500 sm:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 sm:text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Cart Button - Desktop Only */}
        <button
          type="button"
          onClick={openCart}
          className="hidden sm:flex ml-4 shrink-0 items-center gap-2.5 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
        >
          <FiShoppingBag className="h-4 w-4" />
          <span>
            {cartCount > 0 ? `PKR ${cartSubtotal.toFixed(0)}` : 'Cart'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default StickyCategoryBar
