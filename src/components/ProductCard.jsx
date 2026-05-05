import { motion } from 'framer-motion'

function ProductCard({ image, title, price, description, isNew, onAddToCart, onClick }) {
  return (
    <article
      className="group flex flex-col cursor-pointer transition-all duration-500"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-full bg-gray-50/50">
        <motion.img
          src={image}
          alt={title}
          whileHover={{ scale: 1.08, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="h-full w-full object-cover drop-shadow-xl"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col pt-6">
        {/* Title & Badge */}
        <div className="flex items-start gap-2">
          {isNew && (
            <span className="shrink-0 mt-1 inline-flex items-center rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
              new
            </span>
          )}
          <h3 className="text-xl font-bold leading-tight text-gray-900 group-hover:text-orange-500 transition-colors">
            {title}
          </h3>
        </div>

        {/* Product Description */}
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-gray-500">
          {description}
        </p>

        {/* Price Pill Button */}
        <div className="mt-5">
          <button
            type="button"
            id="add-to-cart-btn"
            onClick={(event) => {
              event.stopPropagation()
              onAddToCart?.(event)
            }}
            className="inline-flex items-center rounded-full bg-orange-100 px-5 py-2 text-[13px] font-bold text-orange-600 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
          >
            AED from {price.toFixed(0)}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
