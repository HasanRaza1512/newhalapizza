import { motion } from 'framer-motion'
import { FiShoppingCart, FiSearch, FiPackage, FiInbox, FiRefreshCw, FiHome, FiPlus } from 'react-icons/fi'

// Empty cart state
export const EmptyCart = ({ onBackToMenu }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-4"
  >
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <FiShoppingCart className="w-12 h-12 text-gray-400" />
    </div>
    
    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
    <p className="text-gray-600 text-center mb-8 max-w-md">
      Looks like you haven't added any delicious items yet. Start exploring our menu!
    </p>
    
    <button
      onClick={onBackToMenu}
      className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
    >
      <FiPlus className="w-5 h-5" />
      Browse Menu
    </button>
  </motion.div>
)

// Empty search results
export const EmptySearch = ({ query, onClearSearch }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-4"
  >
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <FiSearch className="w-12 h-12 text-gray-400" />
    </div>
    
    <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
    <p className="text-gray-600 text-center mb-8 max-w-md">
      We couldn't find any items matching "{query}". Try searching with different keywords.
    </p>
    
    <button
      onClick={onClearSearch}
      className="bg-gray-100 text-gray-700 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
    >
      <FiRefreshCw className="w-5 h-5" />
      Clear Search
    </button>
  </motion.div>
)

// Empty products state
export const EmptyProducts = ({ onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-4"
  >
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <FiPackage className="w-12 h-12 text-gray-400" />
    </div>
    
    <h3 className="text-2xl font-bold text-gray-900 mb-2">No products available</h3>
    <p className="text-gray-600 text-center mb-8 max-w-md">
      We're having trouble loading our menu. Please try again in a moment.
    </p>
    
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
      >
        <FiRefreshCw className="w-5 h-5" />
        Try Again
      </button>
    )}
  </motion.div>
)

// Empty orders state
export const EmptyOrders = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-4"
  >
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <FiInbox className="w-12 h-12 text-gray-400" />
    </div>
    
    <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
    <p className="text-gray-600 text-center mb-8 max-w-md">
      You haven't placed any orders yet. Your order history will appear here once you start ordering.
    </p>
    
    <button
      onClick={() => window.location.href = '/menu'}
      className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
    >
      <FiHome className="w-5 h-5" />
      Browse Menu
    </button>
  </motion.div>
)

// Empty category state
export const EmptyCategory = ({ category, onBackToMenu }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-4"
  >
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <FiPackage className="w-12 h-12 text-gray-400" />
    </div>
    
    <h3 className="text-2xl font-bold text-gray-900 mb-2">No items in {category}</h3>
    <p className="text-gray-600 text-center mb-8 max-w-md">
      We're currently out of items in this category. Please check back later or explore other categories.
    </p>
    
    <button
      onClick={onBackToMenu}
      className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
    >
      <FiHome className="w-5 h-5" />
      Back to Menu
    </button>
  </motion.div>
)

// Network error state
export const NetworkError = ({ onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-4"
  >
    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
      <FiRefreshCw className="w-12 h-12 text-red-500" />
    </div>
    
    <h3 className="text-2xl font-bold text-gray-900 mb-2">Connection error</h3>
    <p className="text-gray-600 text-center mb-8 max-w-md">
      We're having trouble connecting to our servers. Please check your internet connection and try again.
    </p>
    
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
      >
        <FiRefreshCw className="w-5 h-5" />
        Try Again
      </button>
    )}
  </motion.div>
)

// Generic empty state with custom icon
export const EmptyState = ({ 
  icon = FiInbox, 
  title = "Nothing here", 
  description = "There's nothing to show at the moment.",
  action = null,
  className = ""
}) => {
  const Icon = icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}
    >
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">{description}</p>
      
      {action && (
        <div className="flex gap-4">
          {action}
        </div>
      )}
    </motion.div>
  )
}

export default {
  EmptyCart,
  EmptySearch,
  EmptyProducts,
  EmptyOrders,
  EmptyCategory,
  NetworkError,
  EmptyState
}
