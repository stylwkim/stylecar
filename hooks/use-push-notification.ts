"use client"

import { useState, useEffect, useCallback } from "react"

export interface NotificationOptions {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  requireInteraction?: boolean
}

export function usePushNotification() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // 브라우저 지원 확인 (더 안전한 방법)
    if (typeof window !== "undefined" && "Notification" in window && typeof Notification !== "undefined") {
      setIsSupported(true)
      setPermission(Notification.permission)
    } else {
      setIsSupported(false)
      console.log("이 브라우저는 푸시 알림을 지원하지 않습니다.")
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      console.log("푸시 알림이 지원되지 않는 환경입니다.")
      return "denied" as NotificationPermission
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result
    } catch (error) {
      console.error("알림 권한 요청 중 오류:", error)
      return "denied" as NotificationPermission
    }
  }, [isSupported])

  const sendNotification = useCallback(
    (options: NotificationOptions) => {
      if (!isSupported) {
        console.log("푸시 알림 미지원:", options.title, "-", options.body)
        return null
      }

      if (permission !== "granted") {
        console.log("푸시 알림 권한이 없습니다:", options.title, "-", options.body)
        return null
      }

      try {
        const notification = new Notification(options.title, {
          body: options.body,
          icon: options.icon || "/images/stylecar-logo.jpg",
          badge: options.badge || "/images/stylecar-logo.jpg",
          tag: options.tag || "stylecar-notification",
          requireInteraction: options.requireInteraction || true,
          silent: false,
        })

        // 알림 클릭 시 창 포커스
        notification.onclick = () => {
          window.focus()
          notification.close()
        }

        // 5초 후 자동 닫기 (requireInteraction이 false인 경우)
        if (!options.requireInteraction) {
          setTimeout(() => {
            notification.close()
          }, 5000)
        }

        return notification
      } catch (error) {
        console.error("알림 생성 중 오류:", error)
        return null
      }
    },
    [isSupported, permission],
  )

  const sendChatNotification = useCallback(
    (customerName: string, message: string) => {
      return sendNotification({
        title: "🔔 새로운 상담 요청",
        body: `${customerName}: ${message.length > 50 ? message.substring(0, 50) + "..." : message}`,
        tag: "chat-notification",
        requireInteraction: true,
      })
    },
    [sendNotification],
  )

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    sendChatNotification,
  }
}
