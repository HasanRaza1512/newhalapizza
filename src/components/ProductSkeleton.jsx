function ProductSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-gray-900/40 p-4 space-y-4">
      <div className="aspect-square w-full animate-pulse rounded-full bg-gray-800" />
      <div className="space-y-3 py-4">
        <div className="h-5 w-3/4 animate-pulse rounded-lg bg-gray-800" />
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded-lg bg-gray-800/60" />
          <div className="h-3 w-5/6 animate-pulse rounded-lg bg-gray-800/60" />
        </div>
        <div className="pt-4 flex justify-between items-center">
          <div className="h-6 w-20 animate-pulse rounded-lg bg-gray-800" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-800" />
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton
