function ProductSkeleton() {
  return (
    <div className="flex flex-col space-y-4 py-4">
      <div className="aspect-square w-full animate-pulse rounded-full bg-slate-100" />
      <div className="space-y-3">
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="pt-2">
          <div className="h-10 w-32 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton
