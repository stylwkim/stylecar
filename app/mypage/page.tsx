"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Bell, Settings } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/Header";


const MyPage = () => {
  const { data: session } = useSession();

  const menuItems = [
    {
      title: "알림 설정",
      description: "주문, 배송, 이벤트 알림을 설정하세요",
      icon: Bell,
      href: "/mypage/notifications",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "계정 설정",
      description: "계정 정보 및 계정 설정을 변경하세요",
      icon: Settings,
      href: "/mypage/settings",
      color: "bg-gray-100 text-gray-600",
    },
  ];

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>로그인 정보 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header /> 

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="H-16 w-16">
                <AvatarImage src={session?.user?.image || "/placeholder.svg?height=64&width=64"} alt="프로필" />
                <AvatarFallback className="text-lg">{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{session?.user?.name || "[사용자]"}</h1>
                <p className="text-gray-600">{session?.user?.email || "이메일 없음"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} legacyBehavior>
              <a className={`flex items-center p-4 rounded-lg shadow-sm ${item.color}`}>
                <item.icon className="h-6 w-6 mr-3" /> 
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
