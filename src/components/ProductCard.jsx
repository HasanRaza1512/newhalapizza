function ProductCard({ image, title, price, onAddToCart, onClick }) {
  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick?.()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      <img
        src={image}
        alt={title}
        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-48"
        loading="lazy"
      />
      <div className="space-y-4 p-4 sm:p-5">
        <h3 className="truncate text-base font-semibold tracking-tight text-slate-900">
          {title}
        </h3>

        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-bold text-slate-900">${price.toFixed(2)}</p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onAddToCart?.(event)
            }}
            className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
