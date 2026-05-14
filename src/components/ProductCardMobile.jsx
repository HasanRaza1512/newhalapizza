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
    <>
      <div 
        className="flex items-center py-6 gap-4 px-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={onClick}
      >
        {/* Product Image */}
        <div className="shrink-0">
          <img 
            src={image} 
            alt={title}
            className="w-32 h-32 object-contain sm:w-35 sm:h-35"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-black mb-1 sm:text-2xl">
            {title}
          </h3>
          
          <p className="text-gray-500 text-sm leading-snug line-clamp-2 mb-2 sm:text-base sm:leading-relaxed sm:line-clamp-3">
            {description}
          </p>

          <button
            className="inline-flex items-center px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-semibold rounded-full hover:bg-orange-100 transition-colors duration-200 sm:px-5 sm:py-2 sm:text-base"
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart?.(e)
            }}
          >
            PKR {price}
          </button>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-b border-gray-100 mx-4" />
    </>
  )
}

export default ProductCardMobile
