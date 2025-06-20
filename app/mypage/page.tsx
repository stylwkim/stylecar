"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Package, Heart, Settings, CreditCard, MapPin, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function MyPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
            <p>로딩 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!session) {
    redirect("/auth/signin")
  }

  const menuItems = [
    {
      title: "주문내역",
      description: "주문한 상품의 배송 상태를 확인하세요",
      icon: Package,
      href: "/mypage/orders",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "찜한상품",
      description: "관심있는 상품을 모아보세요",
      icon: Heart,
      href: "/mypage/wishlist",
      color: "bg-red-100 text-red-600",
    },
    {
      title: "배송지 관리",
      description: "자주 사용하는 배송지를 관리하세요",
      icon: MapPin,
      href: "/mypage/addresses",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "결제수단 관리",
      description: "등록된 결제수단을 관리하세요",
      icon: CreditCard,
      href: "/mypage/payment-methods",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "알림 설정",
      description: "주문, 배송, 이벤트 알림을 설정하세요",
      icon: Bell,
      href: "/mypage/notifications",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "계정 설정",
      description: "개인정보 및 계정 설정을 변경하세요",
      icon: Settings,
      href: "/mypage/settings",
      color: "bg-gray-100 text-gray-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 사용자 정보 카드 */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={session.user?.image || "/placeholder.svg?height=64&width=64"} alt="프로필" />
                <AvatarFallback className="text-lg">{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{session.user?.name}님</h1>
                <p className="text-gray-600">{session.user?.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">일반회원</span>
                  <span className="text-sm text-gray-500">가입일: 2024.01.15</span>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/mypage/settings">프로필 수정</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 빠른 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">총 주문수</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">₩1,234,567</div>
              <div className="text-sm text-gray-600">총 구매금액</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">찜한상품</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">2,500</div>
              <div className="text-sm text-gray-600">적립금</div>
            </CardContent>
          </Card>
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
              <Link href={item.href}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-sm">{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>

        {/* 최근 주문 */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>최근 주문</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/mypage/orders">전체보기</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "ORD-1234",
                  date: "2024.01.15",
                  product: "프리미엄 3D 카매트 풀세트",
                  amount: "189,000원",
                  status: "배송완료",
                },
                {
                  id: "ORD-1235",
                  date: "2024.01.10",
                  product: "무선 차량용 청소기",
                  amount: "89,000원",
                  status: "배송중",
                },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                      <div>
                        <p className="font-medium">{order.product}</p>
                        <p className="text-sm text-gray-500">주문번호: {order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        order.status === "배송완료" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
