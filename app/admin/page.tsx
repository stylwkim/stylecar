"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  CalendarIcon,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"
import { ko } from "date-fns/locale"
import AdminLayout from "@/components/admin-layout"
import { AnalyticsBarChart } from "@/components/analytics/bar-chart"

// 대시보드 데이터 타입 정의
interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  salesGrowth: number
  ordersGrowth: number
  customersGrowth: number
  productsGrowth: number
}

interface DailySales {
  date: string
  sales: number
  orders: number
  customers: number
  avgOrderValue: number
  growth: number
}

interface RecentOrder {
  id: string
  customer: string
  product: string
  amount: number
  status: string
  date: string
}

interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  image: string
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("7days")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    salesGrowth: 0,
    ordersGrowth: 0,
    customersGrowth: 0,
    productsGrowth: 0,
  })

  const [dailySales, setDailySales] = useState<DailySales[]>([])
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])

  // 일별 매출 데이터 생성
  const generateDailySalesData = (period: string, baseDate: Date = new Date()) => {
    const data: DailySales[] = []
    let days = 7

    switch (period) {
      case "7days":
        days = 7
        break
      case "30days":
        days = 30
        break
      case "thisWeek":
        const weekStart = startOfWeek(baseDate, { weekStartsOn: 1 })
        const weekEnd = endOfWeek(baseDate, { weekStartsOn: 1 })
        days = Math.ceil((weekEnd.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)) + 1
        baseDate = weekStart
        break
      case "thisMonth":
        const monthStart = startOfMonth(baseDate)
        const monthEnd = endOfMonth(baseDate)
        days = Math.ceil((monthEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)) + 1
        baseDate = monthStart
        break
    }

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(baseDate)
      date.setDate(date.getDate() - i)

      // 실제 데이터 대신 랜덤 데모 데이터 생성
      const baseSales = Math.floor(Math.random() * 2000000) + 500000
      const orders = Math.floor(Math.random() * 50) + 10
      const customers = Math.floor(Math.random() * 40) + 8
      const avgOrderValue = Math.floor(baseSales / orders)
      const growth = (Math.random() - 0.5) * 40 // -20% ~ +20%

      data.push({
        date: format(date, "MM/dd", { locale: ko }),
        sales: baseSales,
        orders,
        customers,
        avgOrderValue,
        growth,
      })
    }

    return data
  }

  // 데모 데이터 생성
  useEffect(() => {
    const generateDemoData = () => {
      setIsLoading(true)

      // 통계 데이터 생성
      const demoStats: DashboardStats = {
        totalSales: 45230000,
        totalOrders: 1247,
        totalCustomers: 892,
        totalProducts: 156,
        salesGrowth: 12.5,
        ordersGrowth: 8.3,
        customersGrowth: 15.2,
        productsGrowth: 3.1,
      }

      // 일별 매출 데이터 생성
      const salesData = generateDailySalesData(selectedPeriod, selectedDate)

      // 최근 주문 데이터 생성
      const demoOrders: RecentOrder[] = [
        {
          id: "ORD-001",
          customer: "김철수",
          product: "프리미엄 3D 카매트",
          amount: 89000,
          status: "배송완료",
          date: "2024-01-15",
        },
        {
          id: "ORD-002",
          customer: "이영희",
          product: "세차용품 세트",
          amount: 45000,
          status: "배송중",
          date: "2024-01-15",
        },
        {
          id: "ORD-003",
          customer: "박민수",
          product: "차량용 공기청정기",
          amount: 120000,
          status: "주문확인",
          date: "2024-01-14",
        },
        {
          id: "ORD-004",
          customer: "정수진",
          product: "무선 청소기",
          amount: 78000,
          status: "배송완료",
          date: "2024-01-14",
        },
        {
          id: "ORD-005",
          customer: "최동훈",
          product: "차량용 방향제",
          amount: 25000,
          status: "배송중",
          date: "2024-01-13",
        },
      ]

      // 인기 상품 데이터 생성
      const demoProducts: TopProduct[] = [
        {
          id: "PROD-001",
          name: "프리미엄 3D 카매트",
          sales: 156,
          revenue: 13884000,
          image: "/placeholder.svg?height=60&width=60&text=카매트",
        },
        {
          id: "PROD-002",
          name: "세차용품 세트",
          sales: 89,
          revenue: 4005000,
          image: "/placeholder.svg?height=60&width=60&text=세차용품",
        },
        {
          id: "PROD-003",
          name: "차량용 공기청정기",
          sales: 67,
          revenue: 8040000,
          image: "/placeholder.svg?height=60&width=60&text=공기청정기",
        },
        {
          id: "PROD-004",
          name: "무선 청소기",
          sales: 45,
          revenue: 3510000,
          image: "/placeholder.svg?height=60&width=60&text=청소기",
        },
        {
          id: "PROD-005",
          name: "차량용 방향제",
          sales: 234,
          revenue: 5850000,
          image: "/placeholder.svg?height=60&width=60&text=방향제",
        },
      ]

      setTimeout(() => {
        setStats(demoStats)
        setDailySales(salesData)
        setRecentOrders(demoOrders)
        setTopProducts(demoProducts)
        setIsLoading(false)
      }, 1000)
    }

    generateDemoData()
  }, [selectedPeriod, selectedDate])

  // 초고속 홈페이지 보기 버튼 클릭 핸들러
  const handleFastHomePageView = (e: React.MouseEvent) => {
    e.preventDefault()

    // 즉시 새 창 열기
    const newWindow = window.open("/fast-home.html", "_blank", "noopener,noreferrer")

    if (!newWindow) {
      // 팝업이 차단된 경우 현재 탭에서 열기
      window.open("/fast-home.html", "_self")
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "배송완료":
        return "text-green-600 bg-green-100"
      case "배송중":
        return "text-blue-600 bg-blue-100"
      case "주문확인":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case "7days":
        return "최근 7일"
      case "30days":
        return "최근 30일"
      case "thisWeek":
        return "이번 주"
      case "thisMonth":
        return "이번 달"
      default:
        return "최근 7일"
    }
  }

  // 차트 데이터 변환
  const chartData = dailySales.map((day) => ({
    name: day.date,
    value: Math.floor(day.sales / 1000), // 천원 단위로 변환
  }))

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span>데이터를 불러오는 중...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
          <p className="text-gray-500">스타일카 관리자 대시보드에 오신 것을 환영합니다.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">최근 7일</SelectItem>
              <SelectItem value="30days">최근 30일</SelectItem>
              <SelectItem value="thisWeek">이번 주</SelectItem>
              <SelectItem value="thisMonth">이번 달</SelectItem>
            </SelectContent>
          </Select>

          <Popover open={showCalendar} onOpenChange={setShowCalendar}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date)
                    setShowCalendar(false)
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button onClick={handleRefresh} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 매출</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalSales)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats.salesGrowth > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              )}
              {Math.abs(stats.salesGrowth)}% 지난 달 대비
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 주문</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats.ordersGrowth > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              )}
              {Math.abs(stats.ordersGrowth)}% 지난 달 대비
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 고객</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats.customersGrowth > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              )}
              {Math.abs(stats.customersGrowth)}% 지난 달 대비
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 상품</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats.productsGrowth > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              )}
              {Math.abs(stats.productsGrowth)}% 지난 달 대비
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 탭 콘텐츠 */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="daily">일별 매출</TabsTrigger>
          <TabsTrigger value="orders">최근 주문</TabsTrigger>
          <TabsTrigger value="products">인기 상품</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>매출 현황</CardTitle>
                <CardDescription>{getPeriodLabel(selectedPeriod)}간의 매출 추이</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AnalyticsBarChart data={chartData} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>카테고리별 판매</CardTitle>
                <CardDescription>상품 카테고리별 판매 비율</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">카매트</span>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">세차용품</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "28%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">전자기기</span>
                    <span className="text-sm font-medium">22%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "22%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">기타</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>일별 매출 현황</CardTitle>
                <CardDescription>{getPeriodLabel(selectedPeriod)} 상세 데이터</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-600">평균 일매출</span>
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-blue-700">
                        {formatCurrency(dailySales.reduce((sum, day) => sum + day.sales, 0) / dailySales.length)}
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600">평균 주문건수</span>
                        <ShoppingCart className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-green-700">
                        {Math.round(dailySales.reduce((sum, day) => sum + day.orders, 0) / dailySales.length)}건
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">날짜</th>
                          <th className="text-right py-2">매출</th>
                          <th className="text-right py-2">주문수</th>
                          <th className="text-right py-2">고객수</th>
                          <th className="text-right py-2">평균주문금액</th>
                          <th className="text-right py-2">전일대비</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dailySales.map((day, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 font-medium">{day.date}</td>
                            <td className="text-right py-3">{formatCurrency(day.sales)}</td>
                            <td className="text-right py-3">{day.orders}건</td>
                            <td className="text-right py-3">{day.customers}명</td>
                            <td className="text-right py-3">{formatCurrency(day.avgOrderValue)}</td>
                            <td className="text-right py-3">
                              <span
                                className={`flex items-center justify-end ${
                                  day.growth > 0 ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {day.growth > 0 ? (
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                )}
                                {Math.abs(day.growth).toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>최근 주문</CardTitle>
              <CardDescription>최근 5개의 주문 내역</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.product}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrency(order.amount)}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>인기 상품</CardTitle>
              <CardDescription>판매량 기준 상위 5개 상품</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">판매량: {product.sales}개</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(product.revenue)}</p>
                      <p className="text-sm text-gray-500">총 매출</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}
