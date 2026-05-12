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
        className="flex items-center py-4 px-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={onClick}
      >
        {/* Product Image */}
        <div className="shrink-0 mr-4">
          <img 
            src={image} 
            alt={title}
            className="w-20 h-20 object-cover rounded-full"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-black mb-1">
            {title}
          </h3>
          
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {description}
          </p>

          <button
            className="inline-flex items-center px-3 py-1 bg-orange-400 text-white font-medium rounded-full text-sm hover:bg-orange-500 transition-colors duration-200"
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
      <div className="border-t border-gray-100" />
    </>
  )
}

export default ProductCardMobile
