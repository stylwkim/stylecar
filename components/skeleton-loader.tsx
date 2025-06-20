export function CategoryCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <div className="inline-flex p-3 rounded-full bg-gray-200 mb-3">
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-8 mx-auto"></div>
      </div>
    </div>
  )
}

export function ProductCardSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-lg shadow p-4 flex gap-4">
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-24"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="w-full h-48 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-24"></div>
          <div className="h-6 bg-gray-200 rounded mb-4 w-20"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}
