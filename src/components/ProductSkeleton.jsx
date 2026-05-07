function ProductSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6">
      <div className="aspect-square w-full overflow-hidden rounded-full animate-pulse bg-gray-100" />
      <div className="flex flex-col items-center mt-4 sm:mt-6 w-full px-4 space-y-3">
        <div className="flex flex-col items-center gap-2 min-h-[3rem] w-full">
          <div className="h-4 w-12 animate-pulse rounded-full bg-gray-100" />
          <div className="h-6 w-4/5 animate-pulse rounded-lg bg-gray-100" />
        </div>
        <div className="space-y-2 flex flex-col items-center w-full">
          <div className="h-3 w-3/4 animate-pulse rounded-lg bg-gray-100/60" />
          <div className="h-3 w-2/3 animate-pulse rounded-lg bg-gray-100/60" />
        </div>
        <div className="pt-2">
          <div className="h-10 w-24 animate-pulse rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton
