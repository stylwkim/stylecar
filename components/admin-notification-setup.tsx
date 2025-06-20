"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, BellOff, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { usePushNotification } from "@/hooks/use-push-notification"
import { useToast } from "@/hooks/use-toast"

export function AdminNotificationSetup() {
  const { isSupported, permission, requestPermission, sendNotification } = usePushNotification()
  const { toast } = useToast()
  const [isEnabled, setIsEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsEnabled(permission === "granted")
  }, [permission])

  const handleEnableNotifications = async () => {
    setIsLoading(true)
    try {
      const result = await requestPermission()
      if (result === "granted") {
        setIsEnabled(true)
        toast({
          title: "알림 설정 완료",
          description: "푸시 알림이 활성화되었습니다.",
        })

        // 테스트 알림 발송
        setTimeout(() => {
          sendNotification({
            title: "🎉 알림 설정 완료!",
            body: "이제 새로운 상담 요청을 실시간으로 받을 수 있습니다.",
            requireInteraction: false,
          })
        }, 1000)
      } else {
        toast({
          title: "알림 설정 실패",
          description: "알림 권한이 거부되었습니다.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "알림 설정 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestNotification = () => {
    sendNotification({
      title: "🧪 테스트 알림",
      body: "푸시 알림이 정상적으로 작동합니다!",
      requireInteraction: false,
    })
    toast({
      title: "테스트 알림 발송",
      description: "테스트 알림을 발송했습니다.",
    })
  }

  const getStatusInfo = () => {
    if (!isSupported) {
      return {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        status: "지원 안함",
        color: "bg-red-100 text-red-800",
        description: "이 브라우저는 푸시 알림을 지원하지 않습니다.",
      }
    }

    switch (permission) {
      case "granted":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          status: "활성화",
          color: "bg-green-100 text-green-800",
          description: "푸시 알림이 활성화되어 있습니다.",
        }
      case "denied":
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          status: "차단됨",
          color: "bg-red-100 text-red-800",
          description: "알림이 차단되었습니다. 브라우저 설정에서 허용해주세요.",
        }
      default:
        return {
          icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
          status: "대기 중",
          color: "bg-yellow-100 text-yellow-800",
          description: "알림 권한을 요청해주세요.",
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          푸시 알림 설정
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 상태 표시 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {statusInfo.icon}
            <span className="font-medium">알림 상태</span>
          </div>
          <Badge className={statusInfo.color}>{statusInfo.status}</Badge>
        </div>

        <p className="text-sm text-gray-600">{statusInfo.description}</p>

        {/* 알림 토글 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            <span className="text-sm font-medium">실시간 알림</span>
          </div>
          <Switch checked={isEnabled} disabled={!isSupported || permission === "denied"} readOnly />
        </div>

        {/* 버튼들 */}
        <div className="space-y-2">
          {!isEnabled && isSupported && permission !== "denied" && (
            <Button onClick={handleEnableNotifications} disabled={isLoading} className="w-full">
              {isLoading ? "설정 중..." : "알림 활성화"}
            </Button>
          )}

          {isEnabled && (
            <Button onClick={handleTestNotification} variant="outline" className="w-full">
              테스트 알림 발송
            </Button>
          )}

          {permission === "denied" && (
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
              💡 <strong>알림 허용 방법:</strong>
              <br />
              주소창 왼쪽 🔒 아이콘 클릭 → 알림 허용
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
