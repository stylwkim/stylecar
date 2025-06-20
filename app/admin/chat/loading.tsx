import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminChatLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* 세션 목록 스켈레톤 */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-2 w-2 rounded-full" />
                </div>
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 채팅 영역 스켈레톤 */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3 mb-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <Skeleton className="h-12 w-48 rounded-lg" />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
