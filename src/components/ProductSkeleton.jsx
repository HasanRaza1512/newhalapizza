function ProductSkeleton() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="mx-auto aspect-square w-full max-w-[240px] animate-pulse rounded-full bg-gray-100" />
      <div className="space-y-4 pt-4">
        <div className="flex gap-2">
          <div className="h-4 w-10 animate-pulse rounded-full bg-gray-100" />
          <div className="h-6 w-3/4 animate-pulse rounded-lg bg-gray-100" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded-lg bg-gray-100/60" />
          <div className="h-3 w-5/6 animate-pulse rounded-lg bg-gray-100/60" />
        </div>
        <div className="pt-2">
          <div className="h-10 w-32 animate-pulse rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton
