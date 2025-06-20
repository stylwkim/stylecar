import AdminLayout from "@/components/admin-layout"

export default function AdminLoading() {
  return (
    <AdminLayout>
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded"></div>
        </div>

        {/* 통계 카드 스켈레톤 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          ))}
        </div>

        {/* 탭 스켈레톤 */}
        <div className="space-y-4">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded w-20"></div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4 bg-white p-6 rounded-lg border">
              <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-40 mb-4"></div>
              <div className="h-[200px] bg-gray-100 rounded"></div>
            </div>
            <div className="col-span-3 bg-white p-6 rounded-lg border">
              <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-36 mb-4"></div>
              <div className="h-[200px] bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
