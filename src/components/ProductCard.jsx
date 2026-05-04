import { motion } from 'framer-motion'

function ProductCard({ image, title, price, description, isNew, onAddToCart, onClick }) {
  return (
    <article
      className="group relative flex flex-col cursor-pointer overflow-hidden rounded-2xl bg-gray-900/50 p-4 transition-all duration-300 hover:bg-gray-900 hover:shadow-2xl hover:shadow-orange-500/10"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-full bg-gray-800/50">
        <motion.img
          src={image}
          alt={title}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="h-full w-full object-cover p-2"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col space-y-2 py-4">
        {/* New Tag */}
        {isNew && (
          <div className="flex">
            <span className="inline-flex items-center rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg shadow-orange-500/30">
              new
            </span>
          </div>
        )}

        {/* Product Title */}
        <h3 className="text-lg font-bold leading-tight text-white group-hover:text-orange-500 transition-colors">
          {title}
        </h3>

        {/* Product Description */}
        <p className="line-clamp-2 text-[13px] leading-relaxed text-gray-400">
          {description}
        </p>

        {/* Price / Add Button */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            <span className="text-xs text-gray-500 mr-1">from</span>
            {price.toFixed(0)} <span className="text-xs">AED</span>
          </span>
          <button
            type="button"
            id="add-to-cart-btn"
            onClick={(event) => {
              event.stopPropagation()
              onAddToCart?.(event)
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] active:scale-90"
          >
            <span className="text-xl font-bold">+</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
