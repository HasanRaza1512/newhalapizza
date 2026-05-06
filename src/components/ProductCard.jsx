import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'

function ProductCard({ image, title, price, description, isNew, onAddToCart, onClick }) {
  return (
    <article
      className="group relative flex flex-col items-center text-center cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square overflow-hidden rounded-full transition-all duration-500 group-hover:scale-105">
        <motion.img
          src={image}
          alt={title}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        
        {/* Soft shadow under image on hover */}
        <div className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 shadow-[0_15px_30px_rgba(0,0,0,0.1)] pointer-events-none" />
      </div>

      <div className="flex flex-col items-center mt-6 w-full px-4 space-y-3">
        {/* Title & Badge */}
        <div className="flex flex-col items-center gap-1 min-h-[3rem] justify-center">
          {isNew && (
            <span className="inline-flex items-center rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider mb-1">
              New
            </span>
          )}
          <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-orange-500 line-clamp-1">
            {title}
          </h3>
        </div>

        {/* Product Description */}
        <p className="line-clamp-2 text-xs leading-relaxed text-gray-400 font-medium max-w-[200px]">
          {description}
        </p>

        {/* Price Pill */}
        <div className="pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
            className="rounded-full bg-orange-100 px-5 py-2 text-sm font-medium text-orange-600 transition-all hover:bg-orange-500 hover:text-white active:scale-95 shadow-sm shadow-orange-200/50 hover:shadow-lg hover:shadow-orange-500/20"
          >
            AED {price.toFixed(0)}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
