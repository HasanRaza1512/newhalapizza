function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5">
      <div className="h-44 w-full animate-pulse bg-slate-200 sm:h-48" />
      <div className="space-y-4 p-4 sm:p-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="flex items-center justify-between gap-3">
          <div className="h-6 w-16 animate-pulse rounded bg-slate-200" />
          <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton
