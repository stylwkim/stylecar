import { RefreshCw } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex items-center space-x-2">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <span>후기 자동 생성 페이지를 불러오는 중...</span>
      </div>
    </div>
  )
}
