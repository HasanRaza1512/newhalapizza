import { useCartStore } from '../store'
import { FiChevronDown } from 'react-icons/fi'

function StickyCategoryBar({ categories, activeCategory, onCategoryClick }) {
  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.openCart)

  const cartSubtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 py-3 backdrop-blur-md shadow-sm transition-all">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Links */}
        <nav className="flex flex-1 items-center gap-5 overflow-x-auto pr-4 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryClick(category)}
              className={`shrink-0 whitespace-nowrap text-[15px] font-semibold transition-colors ${
                activeCategory === category
                  ? 'text-[#FF6900]'
                  : 'text-slate-900 hover:text-[#FF6900]'
              }`}
            >
              {category}
            </button>
          ))}
          <button className="flex shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-[15px] font-semibold text-slate-900 transition-colors hover:bg-slate-200">
            See more <FiChevronDown className="h-4 w-4" />
          </button>
        </nav>

        {/* My Order Button */}
        <button
          type="button"
          onClick={openCart}
          className="ml-4 shrink-0 rounded-full bg-[#FF6900] px-5 py-2.5 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#FF822B] hover:shadow-md"
        >
          {items.length > 0 ? `My order • $${cartSubtotal.toFixed(2)}` : 'My order'}
        </button>
      </div>
    </div>
  )
}

export default StickyCategoryBar
