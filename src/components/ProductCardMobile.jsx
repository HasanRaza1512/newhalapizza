const ProductCardMobile = ({ 
  image, 
  title, 
  description, 
  price, 
  isNew = false, 
  onAddToCart, 
  onClick 
}) => {
  return (
    <div 
      className="flex items-center gap-4 py-6 border-b border-gray-100 cursor-pointer active:bg-gray-50 transition-colors duration-200 px-4 last:border-0 sm:px-0"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="shrink-0">
        <img 
          src={image} 
          alt={title}
          className="w-[140px] h-[140px] object-contain"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-500 text-base leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        <button
          className="bg-orange-50 text-orange-600 rounded-full px-5 py-2 font-semibold active:bg-orange-100 transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart?.(e)
          }}
        >
          PKR {price}
        </button>
      </div>
    </div>
  )
}

export default ProductCardMobile
