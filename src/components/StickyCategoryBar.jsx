import { useCartStore } from '../store'
import { FiChevronDown } from 'react-icons/fi'

function StickyCategoryBar({ categories, activeCategory, onCategoryClick }) {
  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.openCart)

  const cartSubtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="sticky top-[108px] z-40 w-full border-b border-gray-800/50 bg-[#0B0B0F]/80 py-3 backdrop-blur-xl transition-all">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Links */}
        <nav className="flex flex-1 items-center gap-5 overflow-x-auto pr-4 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryClick(category)}
              className={`shrink-0 whitespace-nowrap text-[14px] font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? 'text-orange-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
          <button className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-800 px-4 py-1.5 text-[13px] font-bold text-gray-300 transition-all hover:bg-gray-700 hover:text-white">
            See more <FiChevronDown className="h-4 w-4" />
          </button>
        </nav>

        {/* My Order Button */}
        <button
          type="button"
          onClick={openCart}
          className="ml-4 shrink-0 rounded-full bg-orange-500 px-6 py-2.5 text-[14px] font-black text-white uppercase tracking-tight transition-all hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] active:scale-95"
        >
          {items.length > 0 ? `My order • AED ${cartSubtotal.toFixed(0)}` : 'My order'}
        </button>
      </div>
    </div>
  )
}

export default StickyCategoryBar
