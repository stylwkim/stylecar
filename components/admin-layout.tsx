"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  BarChart,
  LogOut,
  Menu,
  X,
  Package,
  MessageSquare,
  Bell,
  User,
  Wand2,
  Home,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "대시보드", href: "/admin", icon: LayoutDashboard },
    { name: "상품 관리", href: "/admin/products", icon: Package },
    { name: "주문 관리", href: "/admin/orders", icon: ShoppingBag },
    { name: "고객 관리", href: "/admin/customers", icon: Users },
    { name: "후기 자동생성", href: "/admin/reviews/auto-generate", icon: Wand2 },
    { name: "유입 분석", href: "/admin/analytics", icon: BarChart },
    { name: "문의 관리", href: "/admin/inquiries", icon: MessageSquare },
    { name: "설정", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 사이드바 - 데스크톱 */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-bold text-gray-900">스타일카 관리자</span>
          </div>
          <div className="mt-8 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      pathname === item.href ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                  {item.name === "후기 자동생성" && (
                    <span className="ml-auto text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">AI</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="관리자" />
                  <AvatarFallback>관리자</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">관리자</p>
                <Button variant="link" className="text-xs text-gray-500 p-0 h-auto" asChild>
                  <Link href="/admin/logout">
                    <LogOut className="h-3 w-3 mr-1" />
                    로그아웃
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 사이드바 */}
      {isSidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="sr-only">사이드바 닫기</span>
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center justify-between px-4 mb-4">
                <span className="text-xl font-bold text-gray-900">스타일카 관리자</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      pathname === item.href
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon
                      className={`mr-4 flex-shrink-0 h-6 w-6 ${
                        pathname === item.href ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.name === "후기 자동생성" && (
                      <span className="ml-auto text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">AI</span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="관리자" />
                    <AvatarFallback>관리자</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">관리자</p>
                  <Button variant="link" className="text-xs text-gray-500 p-0 h-auto" asChild>
                    <Link href="/admin/logout">
                      <LogOut className="h-3 w-3 mr-1" />
                      로그아웃
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-14">{/* 강제 사이드바 축소 */}</div>
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">메뉴 열기</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* 상단 헤더 */}
        <div className="hidden md:flex items-center justify-between h-16 bg-white border-b px-4 md:px-8">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
            asChild
          >
            <Link href="/" target="_blank" rel="noopener noreferrer">
              <Home className="h-4 w-4" />
              <span>홈페이지 보기</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>프로필</DropdownMenuItem>
                <DropdownMenuItem>설정</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
