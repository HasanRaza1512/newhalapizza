import { motion } from 'framer-motion'

function ProductCard({ image, title, price, description, isNew, onAddToCart, onClick }) {
  return (
    <article
      className="group flex flex-col cursor-pointer overflow-hidden transition-all duration-300"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-full bg-slate-50">
        <motion.img
          src={image}
          alt={title}
          whileHover={{ scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col space-y-2 py-4">
        {/* New Tag */}
        {isNew && (
          <div className="flex">
            <span className="inline-flex items-center rounded-full bg-[#FF6900] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              new
            </span>
          </div>
        )}

        {/* Product Title */}
        <h3 className="text-lg font-bold leading-tight text-slate-900 group-hover:text-[#FF6900] transition-colors">
          {title}
        </h3>

        {/* Product Description */}
        <p className="line-clamp-3 text-xs leading-relaxed text-slate-500">
          {description}
        </p>

        {/* Price / Add Button */}
        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onAddToCart?.(event)
            }}
            className="inline-flex items-center rounded-full bg-[#FFF0E6] px-5 py-2.5 text-sm font-bold text-[#D15700] transition-all duration-200 hover:bg-[#FFE0CC] active:scale-95"
          >
            AED from {price.toFixed(0)}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
