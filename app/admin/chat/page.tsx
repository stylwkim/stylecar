"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Bell, Users, Clock, Phone } from "lucide-react"
import { AdminNotificationSetup } from "@/components/admin-notification-setup"
import { usePushNotification } from "@/hooks/use-push-notification"

interface ChatSession {
  id: string
  customerName: string
  lastMessage: string
  timestamp: string
  status: "active" | "waiting" | "closed"
  unreadCount: number
}

export default function AdminChatPage() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      customerName: "김철수",
      lastMessage: "카매트 배송 언제 되나요?",
      timestamp: "2분 전",
      status: "waiting",
      unreadCount: 2,
    },
    {
      id: "2",
      customerName: "이영희",
      lastMessage: "세차용품 추천 부탁드려요",
      timestamp: "5분 전",
      status: "active",
      unreadCount: 1,
    },
    {
      id: "3",
      customerName: "박민수",
      lastMessage: "주문 취소하고 싶어요",
      timestamp: "10분 전",
      status: "waiting",
      unreadCount: 3,
    },
  ])

  const { permission, sendNotification } = usePushNotification()

  // 새로운 메시지 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newMessage = {
          id: Date.now().toString(),
          customerName: `고객${Math.floor(Math.random() * 100)}`,
          lastMessage: "새로운 문의가 있습니다.",
          timestamp: "방금 전",
          status: "waiting" as const,
          unreadCount: 1,
        }

        setChatSessions((prev) => [newMessage, ...prev])

        // 푸시 알림 발송
        if (permission === "granted") {
          sendNotification({
            title: "🔔 새로운 상담 요청",
            body: `${newMessage.customerName}님이 상담을 요청했습니다.`,
            tag: "new-chat",
            requireInteraction: true,
          })
        }
      }
    }, 30000) // 30초마다 체크

    return () => clearInterval(interval)
  }, [permission, sendNotification])

  const totalUnread = chatSessions.reduce((sum, session) => sum + session.unreadCount, 0)
  const activeChats = chatSessions.filter((session) => session.status === "active").length
  const waitingChats = chatSessions.filter((session) => session.status === "waiting").length

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">실시간 채팅 관리</h1>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {totalUnread > 0 && (
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs mr-2">{totalUnread}</span>
          )}
          총 {chatSessions.length}개 세션
        </Badge>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">전체 채팅</p>
                <p className="text-2xl font-bold">{chatSessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">진행 중</p>
                <p className="text-2xl font-bold text-green-600">{activeChats}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">대기 중</p>
                <p className="text-2xl font-bold text-yellow-600">{waitingChats}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">읽지 않음</p>
                <p className="text-2xl font-bold text-red-600">{totalUnread}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 채팅 세션 목록 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                채팅 세션 목록
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {chatSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      {session.status === "active" && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{session.customerName}</p>
                      <p className="text-sm text-gray-600 truncate max-w-48">{session.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{session.timestamp}</p>
                    {session.unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white mt-1">{session.unreadCount}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 알림 설정 */}
        <div className="space-y-4">
          <AdminNotificationSetup />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                빠른 응답 템플릿
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm">
                안녕하세요! 무엇을 도와드릴까요?
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                확인해보겠습니다. 잠시만 기다려주세요.
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                주문번호를 알려주시면 확인 가능합니다.
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                추가 문의사항이 있으시면 말씀해주세요.
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
