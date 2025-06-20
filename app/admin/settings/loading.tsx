import AdminLayout from "@/components/admin-layout"

export default function SettingsLoading() {
  return (
    <AdminLayout>
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        <div className="bg-white rounded-lg border">
          <div className="p-6">
            <div className="flex space-x-1 mb-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded w-20"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
