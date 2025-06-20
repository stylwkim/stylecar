"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Package, Heart, Settings, CreditCard, MapPin, Bell } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function MyPage() {
  // useSession()이 undefined일 수 있으므로 안전하게 처리
  const sessionResult = useSession()
  const session = sessionResult?.data
  const status = sessionResult?.status || "loading"

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
                <AvatarImage src={session?.user?.image || "/placeholder.svg?height=64&width=64"} alt="프로필" />
                <AvatarFallback className="text-lg">{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{session?.user?.name || "사용자"}님</h1>
                <p className="text-gray-600">{session?.user?.email || "이메일 없음"}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">일반회원</span>
                  <span className="text-sm text-gray-500">가입일:
