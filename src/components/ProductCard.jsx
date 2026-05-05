import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'

function ProductCard({ image, title, price, description, isNew, onAddToCart, onClick }) {
  return (
    <article
      className="group relative flex flex-col cursor-pointer transition-all duration-500"
      onClick={onClick}
    >
      {/* Product Image Container */}
      <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-full bg-gray-50/50 p-4 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-orange-500/10">
        <motion.img
          src={image}
          alt={title}
          whileHover={{ rotate: 10 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="h-full w-full object-cover drop-shadow-2xl"
          loading="lazy"
        />
        
        {/* Hover Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart?.(e)
            }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/40 transition-transform hover:scale-110 active:scale-90"
          >
            <FiPlus className="h-8 w-8" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        {/* Title & Badge */}
        <div className="flex items-start gap-2">
          {isNew && (
            <span className="shrink-0 mt-1 inline-flex items-center rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-black text-white uppercase tracking-widest">
              New
            </span>
          )}
          <h3 className="text-xl font-black leading-tight text-gray-900 transition-colors group-hover:text-orange-500">
            {title}
          </h3>
        </div>

        {/* Product Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
          {description}
        </p>

        {/* Price & Add Action */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-black text-orange-600">
            AED {price.toFixed(0)}
          </span>
          
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onAddToCart?.(event)
            }}
            className="rounded-full bg-orange-100 px-5 py-2 text-[13px] font-black text-orange-600 transition-all hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
