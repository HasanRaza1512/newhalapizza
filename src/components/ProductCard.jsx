import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'

function ProductCard({ image, title, price, description, isNew, onAddToCart, onClick }) {
  return (
    <article
      className="group relative flex flex-col items-center text-center cursor-pointer transition-all duration-500"
      onClick={onClick}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-105">
        <motion.img
          src={image}
          alt={title}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        
        {/* Subtle shadow under image on hover - implemented via container or drop-shadow */}
        <div className="absolute inset-0 rounded-full transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] pointer-events-none" />
      </div>

      <div className="flex flex-col items-center mt-6 w-full px-2">
        {/* Title & Badge */}
        <div className="flex flex-col items-center gap-2 min-h-[3.5rem] justify-center">
          {isNew && (
            <span className="inline-flex items-center rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              New
            </span>
          )}
          <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-orange-500 line-clamp-1">
            {title}
          </h3>
        </div>

        {/* Product Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-500 font-medium max-w-[240px]">
          {description}
        </p>

        {/* Price Pill */}
        <div className="mt-5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
            className="rounded-full bg-orange-100 px-6 py-2.5 text-sm font-black text-orange-600 transition-all hover:bg-orange-200 active:scale-95"
          >
            AED from {price.toFixed(0)}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
