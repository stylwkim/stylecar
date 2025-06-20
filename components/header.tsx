"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Car,
  Sparkles,
  Droplets,
  Shield,
  Star,
  LogOut,
  Settings,
  Package,
  Heart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface UserType {
  name: string
  email: string
  role: string
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // 클라이언트 사이드에서만 실행되도록 설정
  useEffect(() => {
    setIsClient(true)

    // 주요 페이지 프리페치
    const prefetchPages = async () => {
      router.prefetch("/categories")
      router.prefetch("/sale")
      router.prefetch("/support")
    }

    prefetchPages()

    // 사용자 정보 확인
    checkUserSession()
  }, [router])

  const checkUserSession = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.log("No active session")
    } finally {
      setIsLoading(false)
    }
  }

  // 카테고리 데이터 - 동적 라우트로 연결
  const categories = [
    {
      name: "카매트",
      icon: Car,
      color: "bg-blue-100 text-blue-600",
      href: "/categories?category=carmat",
      id: "carmat",
    },
    {
      name: "세차용품",
      icon: Droplets,
      color: "bg-cyan-100 text-cyan-600",
      href: "/categories?category=cleaning",
      id: "cleaning",
    },
    {
      name: "방향제",
      icon: Sparkles,
      color: "bg-purple-100 text-purple-600",
      href: "/categories?category=fragrance",
      id: "fragrance",
    },
    {
      name: "보호필름",
      icon: Shield,
      color: "bg-green-100 text-green-600",
      href: "/categories?category=protection",
      id: "protection",
    },
    {
      name: "주차용품",
      icon: Car,
      color: "bg-orange-100 text-orange-600",
      href: "/categories?category=parking",
      id: "parking",
    },
    {
      name: "액세서리",
      icon: Star,
      color: "bg-pink-100 text-pink-600",
      href: "/categories?category=accessories",
      id: "accessories",
    },
  ]

  const navigation = [
    { name: "홈", href: "/" },
    { name: "제품카테고리", href: "/categories" },
    { name: "특가할인", href: "/sale" },
    { name: "고객센터", href: "/support" },
  ]

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // 카테고리 프리페치 함수
  const prefetchCategory = (categoryId: string) => {
    router.prefetch(`/categories?category=${categoryId}`)
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" prefetch={true}>
              <Image
                src="/images/stylecar-logo.jpg"
                alt="스타일카 로고"
                width={80}
                height={48}
                className="h-12 w-20"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  prefetch={true}
                  className={`font-medium ${
                    pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
                {item.name === "제품카테고리" && isClient && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2">
                    <div className="p-4 space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={category.href}
                          prefetch={true}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg"
                          onMouseEnter={() => prefetchCategory(category.id)}
                        >
                          <div className={`p-2 rounded-lg ${category.color}`}>
                            <category.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input type="text" placeholder="원하는 상품을 검색하세요" className="pl-4 pr-10" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* 장바구니 */}
            <Button variant="ghost" size="sm" className="hidden md:flex relative">
              <ShoppingCart className="w-5 h-5" />
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                3
              </Badge>
            </Button>

            {/* 사용자 인증 영역 */}
            {isLoading ? (
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            ) : user ? (
              /* 로그인된 상태 */
              <div className="hidden md:flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="프로필" />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/mypage" prefetch={true} className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>마이페이지</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/mypage/orders" prefetch={true} className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        <span>주문내역</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/mypage/wishlist" prefetch={true} className="flex items-center">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>찜한상품</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/mypage/settings" prefetch={true} className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>설정</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>로그아웃</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              /* 로그인되지 않은 상태 */
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/signin" prefetch={true}>
                    로그인
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup" prefetch={true}>
                    회원가입
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            {/* 모바일 검색 */}
            <div className="relative">
              <Input type="text" placeholder="상품 검색" className="pl-4 pr-10" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* 모바일 네비게이션 */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className={`block py-2 font-medium ${pathname === item.href ? "text-blue-600" : "text-gray-700"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* 모바일 사용자 영역 */}
            {user ? (
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="프로필" />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/mypage" prefetch={true} onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      마이페이지
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/mypage/orders" prefetch={true} onClick={() => setIsMobileMenuOpen(false)}>
                      <Package className="w-4 h-4 mr-2" />
                      주문내역
                    </Link>
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    handleSignOut()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  로그아웃
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href="/auth/signin" prefetch={true} onClick={() => setIsMobileMenuOpen(false)}>
                    로그인
                  </Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link href="/auth/signup" prefetch={true} onClick={() => setIsMobileMenuOpen(false)}>
                    회원가입
                  </Link>
                </Button>
              </div>
            )}

            {/* 모바일 장바구니 */}
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/cart" prefetch={true} onClick={() => setIsMobileMenuOpen(false)}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                장바구니
                <Badge className="ml-2 bg-red-500 text-white">3</Badge>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
