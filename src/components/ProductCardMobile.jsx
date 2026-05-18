const ProductCardMobile = ({ 
  image, 
  title, 
  description, 
  price, 
  isNew = false,
  oldPrice,
  isDeal = false,
  onAddToCart, 
  onClick 
}) => {
  const badge = isDeal ? 'Deal' : isNew ? 'New' : null

  return (
    <>
      <div 
        className="flex items-center gap-4 py-5 px-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 sm:py-6 sm:gap-3 sm:px-4"
        onClick={onClick}
      >
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img 
            src={image} 
            alt={title}
            className="w-[110px] h-[110px] object-contain drop-shadow-sm rounded-full sm:w-35 sm:h-35"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          {badge && (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[8px] font-bold text-white uppercase tracking-wider mb-1 ${isDeal ? 'bg-red-500' : 'bg-orange-500'}`}>
              {badge}
            </span>
          )}

          <h3 className="text-[18px] font-bold text-gray-900 mb-1 leading-tight sm:text-2xl sm:leading-none">
            {title}
          </h3>
          
          <p className="text-[14px] leading-snug text-gray-500 line-clamp-2 mb-2.5 sm:text-base sm:leading-relaxed">
            {description}
          </p>

          <div className="flex items-center gap-2">
            {oldPrice && (
              <span className="text-xs text-gray-400 line-through font-medium">
                PKR {oldPrice.toLocaleString()}
              </span>
            )}
            <button
              className="inline-flex items-center bg-orange-50 text-orange-500 rounded-full px-4 py-1.5 text-[16px] font-semibold hover:bg-orange-100 transition-colors duration-200 sm:text-base sm:px-5 sm:py-2"
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart?.(e)
              }}
            >
              PKR {typeof price === 'number' ? price.toLocaleString() : price}
            </button>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-b border-gray-100 mx-4" />
    </>
  )
}

export default ProductCardMobile
