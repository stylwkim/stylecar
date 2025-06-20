"use client"

import { useState } from "react"
import { Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function AuthDemoNotice() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-medium text-blue-900 mb-2">데모 계정 안내</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                • <strong>일반 사용자:</strong> user@stylecar.co.kr / password
              </p>
              <p>
                • <strong>관리자:</strong> admin@stylecar.co.kr / admin123
              </p>
              <p>
                • <strong>테스트:</strong> test@stylecar.co.kr / test123
              </p>
              <p className="text-xs text-blue-600 mt-2">* 소셜 로그인은 실제 OAuth 설정이 필요합니다.</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-blue-600 hover:text-blue-800 p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
