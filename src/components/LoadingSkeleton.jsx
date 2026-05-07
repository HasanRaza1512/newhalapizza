import { motion } from 'framer-motion'

// Product skeleton for product cards
export const ProductSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white rounded-3xl shadow-sm overflow-hidden"
  >
    <div className="relative">
      <div className="w-full h-48 bg-linear-to-r from-gray-200 to-gray-300 animate-pulse" />
      {Math.random() > 0.5 && (
        <div className="absolute top-4 left-4 w-16 h-6 bg-orange-200 rounded-full animate-pulse" />
      )}
    </div>
    <div className="p-6 space-y-3">
      <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-full" />
      <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-2/3" />
      <div className="flex items-center justify-between pt-4">
        <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-20" />
        <div className="h-10 bg-gray-200 rounded-2xl animate-pulse w-24" />
      </div>
    </div>
  </motion.div>
)

// Cart item skeleton
export const CartItemSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100"
  >
    <div className="w-16 h-16 bg-gray-200 rounded-xl animate-pulse" />
    <div className="flex-1 space-y-2">
      <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/2" />
    </div>
    <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-16" />
  </motion.div>
)

// Hero slide skeleton
export const HeroSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="relative h-96 bg-linear-to-r from-gray-200 to-gray-300 rounded-3xl overflow-hidden animate-pulse"
  >
    <div className="absolute inset-0 bg-black/20" />
    <div className="relative h-full flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <div className="h-12 bg-white/30 rounded-lg animate-pulse w-64 mx-auto" />
        <div className="h-6 bg-white/20 rounded-lg animate-pulse w-96 mx-auto" />
        <div className="h-10 bg-white/30 rounded-xl animate-pulse w-32 mx-auto mt-8" />
      </div>
    </div>
  </motion.div>
)

// Category button skeleton
export const CategorySkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="h-12 bg-gray-200 rounded-2xl animate-pulse w-24"
  />
)

// Order summary skeleton
export const OrderSummarySkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white rounded-3xl shadow-sm p-6 space-y-4"
  >
    <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/3" />
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <CartItemSkeleton key={i} />
      ))}
    </div>
    <div className="border-t pt-4 space-y-2">
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-16" />
        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-20" />
      </div>
      <div className="flex justify-between pt-2">
        <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-12" />
        <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-24" />
      </div>
    </div>
  </motion.div>
)

// Form field skeleton
export const FormFieldSkeleton = () => (
  <div className="space-y-2">
    <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-24" />
    <div className="h-12 bg-gray-200 rounded-2xl animate-pulse" />
  </div>
)

// Loading spinner component
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  return (
    <div
      className={`border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin ${sizeClasses[size]} ${className}`}
    />
  )
}

// Full page loading skeleton
export const PageSkeleton = () => (
  <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50 p-4">
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-32" />
        <div className="h-10 bg-gray-200 rounded-2xl animate-pulse w-48" />
        <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-20" />
      </div>
      
      {/* Hero skeleton */}
      <HeroSkeleton />
      
      {/* Categories skeleton */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
      
      {/* Products grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
)

// Skeleton loader for different contexts
export const SkeletonLoader = ({ type, count = 1, className = '' }) => {
  const skeletons = {
    product: <ProductSkeleton />,
    cartItem: <CartItemSkeleton />,
    hero: <HeroSkeleton />,
    category: <CategorySkeleton />,
    orderSummary: <OrderSummarySkeleton />,
    formField: <FormFieldSkeleton />,
    page: <PageSkeleton />
  }

  const SkeletonComponent = skeletons[type] || skeletons.product

  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{SkeletonComponent}</div>
      ))}
    </div>
  )
}

export default {
  ProductSkeleton,
  CartItemSkeleton,
  HeroSkeleton,
  CategorySkeleton,
  OrderSummarySkeleton,
  FormFieldSkeleton,
  LoadingSpinner,
  PageSkeleton,
  SkeletonLoader
}
