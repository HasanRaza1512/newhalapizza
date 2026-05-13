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
            className="w-35 h-35 object-contain"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-black mb-1">
            {title}
          </h3>
          
          <p className="text-gray-500 text-base leading-relaxed line-clamp-3 mb-2">
            {description}
          </p>

          <button
            className="inline-flex items-center px-5 py-2 bg-orange-50 text-orange-600 font-semibold rounded-full hover:bg-orange-100 transition-colors duration-200"
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
      <div className="border-b border-gray-100" />
    </>
  )
}

export default ProductCardMobile
