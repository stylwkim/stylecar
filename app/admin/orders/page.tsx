"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  RefreshCw,
  Truck,
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Download,
  MessageSquare,
  Gift,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
  }
  items: OrderItem[]
  total: number
  status: string
  paymentMethod: string
  shippingAddress: string
  createdAt: string
  updatedAt: string
  trackingNumber?: string
}

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const [trackingNumber, setTrackingNumber] = useState("")
  const [statusNote, setStatusNote] = useState("")

  // 데모 데이터 생성
  useEffect(() => {
    const generateDemoOrders = () => {
      setIsLoading(true)

      const statuses = [
        "결제완료",
        "상품준비중",
        "배송중",
        "배송완료",
        "취소요청",
        "취소완료",
        "반품처리중",
        "교환처리중",
      ]
      const paymentMethods = ["신용카드", "무통장입금", "카카오페이", "네이버페이", "토스"]
      const productNames = [
        "프리미엄 3D 카매트",
        "차량용 공기청정기",
        "세차용품 세트",
        "차량용 방향제",
        "무선 청소기",
        "차량용 햇빛가리개",
        "트렁크 정리함",
        "차량용 쿨링시트",
      ]

      const demoOrders: Order[] = Array.from({ length: 50 }, (_, i) => {
        const id = `ORD-${String(i + 1).padStart(5, "0")}`
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
        const itemCount = Math.floor(Math.random() * 3) + 1
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 30))
        const updatedDate = new Date(date)
        updatedDate.setHours(updatedDate.getHours() + Math.floor(Math.random() * 48))

        const items: OrderItem[] = Array.from({ length: itemCount }, (_, j) => {
          const productName = productNames[Math.floor(Math.random() * productNames.length)]
          const price = Math.floor(Math.random() * 150000) + 10000
          const quantity = Math.floor(Math.random() * 3) + 1
          return {
            id: `ITEM-${i}-${j}`,
            name: productName,
            price,
            quantity,
            image: `/placeholder.svg?height=60&width=60&text=${encodeURIComponent(productName.split(" ")[0])}`,
          }
        })

        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const trackingNumber =
          status === "배송중" || status === "배송완료" ? `TRACK-${Math.floor(Math.random() * 1000000)}` : undefined

        return {
          id,
          customer: {
            name: ["김철수", "이영희", "박민수", "정수진", "최동훈", "윤지영", "강현우"][Math.floor(Math.random() * 7)],
            email: `customer${i + 1}@example.com`,
            phone: `010-${String(Math.floor(Math.random() * 9000) + 1000)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
          },
          items,
          total,
          status,
          paymentMethod,
          shippingAddress: `서울시 ${["강남구", "서초구", "마포구", "송파구", "강서구"][Math.floor(Math.random() * 5)]} 예시로 ${Math.floor(Math.random() * 100) + 1}길 ${Math.floor(Math.random() * 100) + 1}`,
          createdAt: date.toISOString(),
          updatedAt: updatedDate.toISOString(),
          trackingNumber,
        }
      })

      setTimeout(() => {
        setOrders(demoOrders)
        setIsLoading(false)
      }, 800)
    }

    generateDemoOrders()
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setTrackingNumber(order.trackingNumber || "")
    setIsUpdateDialogOpen(true)
  }

  const handleSaveStatus = () => {
    if (!selectedOrder) return

    const updatedOrders = orders.map((order) => {
      if (order.id === selectedOrder.id) {
        return {
          ...order,
          status: newStatus,
          trackingNumber: newStatus === "배송중" || newStatus === "배송완료" ? trackingNumber : order.trackingNumber,
          updatedAt: new Date().toISOString(),
        }
      }
      return order
    })

    setOrders(updatedOrders)
    setIsUpdateDialogOpen(false)
    setStatusNote("")
  }

  const filteredOrders = orders
    .filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((order) => (statusFilter === "all" ? true : order.status === statusFilter))
    .filter((order) => {
      if (dateFilter === "all") return true
      const orderDate = new Date(order.createdAt)
      const now = new Date()
      const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))

      if (dateFilter === "today") return daysDiff === 0
      if (dateFilter === "yesterday") return daysDiff === 1
      if (dateFilter === "week") return daysDiff <= 7
      if (dateFilter === "month") return daysDiff <= 30
      return true
    })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "결제완료":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "상품준비중":
        return <Package className="h-4 w-4 text-blue-500" />
      case "배송중":
        return <Truck className="h-4 w-4 text-purple-500" />
      case "배송완료":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "취소요청":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "취소완료":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "반품처리중":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "교환처리중":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "결제완료":
        return "bg-green-100 text-green-800"
      case "상품준비중":
        return "bg-blue-100 text-blue-800"
      case "배송중":
        return "bg-purple-100 text-purple-800"
      case "배송완료":
        return "bg-green-100 text-green-800"
      case "취소요청":
        return "bg-yellow-100 text-yellow-800"
      case "취소완료":
        return "bg-red-100 text-red-800"
      case "반품처리중":
        return "bg-yellow-100 text-yellow-800"
      case "교환처리중":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const countOrdersByStatus = (status: string) => {
    return orders.filter((order) => order.status === status).length
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">주문 관리</h1>
          <p className="text-gray-500">총 {orders.length}개의 주문이 있습니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleRefresh} variant="outline" size="icon" disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">결제완료</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countOrdersByStatus("결제완료")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">상품준비중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countOrdersByStatus("상품준비중")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">배송중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countOrdersByStatus("배송중")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">취소/반품/교환</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {countOrdersByStatus("취소요청") +
                countOrdersByStatus("취소완료") +
                countOrdersByStatus("반품처리중") +
                countOrdersByStatus("교환처리중")}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="주문번호, 고객명, 이메일 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="주문 상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="결제완료">결제완료</SelectItem>
                <SelectItem value="상품준비중">상품준비중</SelectItem>
                <SelectItem value="배송중">배송중</SelectItem>
                <SelectItem value="배송완료">배송완료</SelectItem>
                <SelectItem value="취소요청">취소요청</SelectItem>
                <SelectItem value="취소완료">취소완료</SelectItem>
                <SelectItem value="반품처리중">반품처리중</SelectItem>
                <SelectItem value="교환처리중">교환처리중</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="기간" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 기간</SelectItem>
                <SelectItem value="today">오늘</SelectItem>
                <SelectItem value="yesterday">어제</SelectItem>
                <SelectItem value="week">최근 7일</SelectItem>
                <SelectItem value="month">최근 30일</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">전체 주문</TabsTrigger>
            <TabsTrigger value="new">신규 주문</TabsTrigger>
            <TabsTrigger value="shipping">배송 관리</TabsTrigger>
            <TabsTrigger value="delivered">배송완료</TabsTrigger>
            <TabsTrigger value="issues">취소/반품/교환</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-4 border rounded-md animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-[100px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{order.id}</h3>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            <span className="flex items-center">
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {order.customer.name} ({order.customer.email})
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)} | {order.paymentMethod}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col items-end">
                        <p className="font-bold">{formatCurrency(order.total)}</p>
                        <p className="text-sm text-gray-500">{order.items.length}개 상품</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            상세보기
                          </Button>
                          <Button size="sm" onClick={() => handleUpdateStatus(order)}>
                            상태변경
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <div className="space-y-2">
              {orders
                .filter((order) => order.status === "결제완료")
                .map((order) => (
                  <div key={order.id} className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{order.id}</h3>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            <span className="flex items-center">
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {order.customer.name} ({order.customer.email})
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)} | {order.paymentMethod}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col items-end">
                        <p className="font-bold">{formatCurrency(order.total)}</p>
                        <p className="text-sm text-gray-500">{order.items.length}개 상품</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            상세보기
                          </Button>
                          <Button size="sm" onClick={() => handleUpdateStatus(order)}>
                            상태변경
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4">
            <div className="space-y-2">
              {orders
                .filter((order) => order.status === "상품준비중" || order.status === "배송중")
                .map((order) => (
                  <div key={order.id} className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{order.id}</h3>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            <span className="flex items-center">
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {order.customer.name} ({order.customer.email})
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)} | {order.paymentMethod}
                        </p>
                        {order.trackingNumber && (
                          <p className="text-sm text-blue-600">운송장번호: {order.trackingNumber}</p>
                        )}
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col items-end">
                        <p className="font-bold">{formatCurrency(order.total)}</p>
                        <p className="text-sm text-gray-500">{order.items.length}개 상품</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            상세보기
                          </Button>
                          <Button size="sm" onClick={() => handleUpdateStatus(order)}>
                            상태변경
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            <div className="space-y-2">
              {orders
                .filter(
                  (order) =>
                    order.status === "취소요청" ||
                    order.status === "취소완료" ||
                    order.status === "반품처리중" ||
                    order.status === "교환처리중",
                )
                .map((order) => (
                  <div key={order.id} className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{order.id}</h3>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            <span className="flex items-center">
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {order.customer.name} ({order.customer.email})
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)} | {order.paymentMethod}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col items-end">
                        <p className="font-bold">{formatCurrency(order.total)}</p>
                        <p className="text-sm text-gray-500">{order.items.length}개 상품</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            상세보기
                          </Button>
                          <Button size="sm" onClick={() => handleUpdateStatus(order)}>
                            상태변경
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="delivered" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">배송완료 주문 관리</h3>
                <p className="text-sm text-gray-500">배송이 완료된 주문들을 관리합니다</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  배송완료 목록 다운로드
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  새로고침
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">오늘 배송완료</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {
                      orders.filter(
                        (order) =>
                          order.status === "배송완료" &&
                          new Date(order.updatedAt).toDateString() === new Date().toDateString(),
                      ).length
                    }
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">이번 주 배송완료</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {
                      orders.filter((order) => {
                        const orderDate = new Date(order.updatedAt)
                        const weekAgo = new Date()
                        weekAgo.setDate(weekAgo.getDate() - 7)
                        return order.status === "배송완료" && orderDate >= weekAgo
                      }).length
                    }
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">총 배송완료</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{countOrdersByStatus("배송완료")}</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              {orders
                .filter((order) => order.status === "배송완료")
                .map((order) => (
                  <div key={order.id} className="p-4 border rounded-md hover:bg-gray-50 bg-green-50 border-green-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{order.id}</h3>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            <span className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              배송완료
                            </span>
                          </Badge>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            완료일: {formatDate(order.updatedAt)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {order.customer.name} ({order.customer.email})
                        </p>
                        <p className="text-sm text-gray-500">
                          주문일: {formatDate(order.createdAt)} | {order.paymentMethod}
                        </p>
                        {order.trackingNumber && (
                          <p className="text-sm text-blue-600">운송장번호: {order.trackingNumber}</p>
                        )}
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col items-end">
                        <p className="font-bold">{formatCurrency(order.total)}</p>
                        <p className="text-sm text-gray-500">{order.items.length}개 상품</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            상세보기
                          </Button>
                          <Button size="sm" variant="outline" className="bg-yellow-50 hover:bg-yellow-100">
                            <MessageSquare className="h-3.5 w-3.5 mr-1" />
                            후기 요청
                          </Button>
                          <Button size="sm" variant="outline" className="bg-purple-50 hover:bg-purple-100">
                            <Gift className="h-3.5 w-3.5 mr-1" />
                            재주문 유도
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 주문 상세 보기 다이얼로그 */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>주문 상세 정보</DialogTitle>
            <DialogDescription>주문번호: {selectedOrder?.id}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">주문 상태</h3>
                  <Badge variant="outline" className={getStatusColor(selectedOrder.status)}>
                    <span className="flex items-center">
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-1">{selectedOrder.status}</span>
                    </span>
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">주문일시</p>
                  <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">고객 정보</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">이름</p>
                    <p>{selectedOrder.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">이메일</p>
                    <p>{selectedOrder.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">연락처</p>
                    <p>{selectedOrder.customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">결제방법</p>
                    <p>{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">배송 정보</h3>
                <div className="text-sm">
                  <p className="text-gray-500">배송지</p>
                  <p>{selectedOrder.shippingAddress}</p>
                  {selectedOrder.trackingNumber && (
                    <>
                      <p className="text-gray-500 mt-2">운송장번호</p>
                      <p>{selectedOrder.trackingNumber}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">주문 상품</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-2 border rounded-md">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-contain bg-gray-50 rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatCurrency(item.price)} x {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">총 결제금액</h3>
                  <p className="font-bold text-lg">{formatCurrency(selectedOrder.total)}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              닫기
            </Button>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false)
                handleUpdateStatus(selectedOrder!)
              }}
            >
              상태 변경
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 주문 상태 변경 다이얼로그 */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>주문 상태 변경</DialogTitle>
            <DialogDescription>주문번호: {selectedOrder?.id}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">상태 선택</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="결제완료">결제완료</SelectItem>
                    <SelectItem value="상품준비중">상품준비중</SelectItem>
                    <SelectItem value="배송중">배송중</SelectItem>
                    <SelectItem value="배송완료">배송완료</SelectItem>
                    <SelectItem value="취소요청">취소요청</SelectItem>
                    <SelectItem value="취소완료">취소완료</SelectItem>
                    <SelectItem value="반품처리중">반품처리중</SelectItem>
                    <SelectItem value="교환처리중">교환처리중</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(newStatus === "배송중" || newStatus === "배송완료") && (
                <div className="space-y-2">
                  <Label htmlFor="tracking">운송장번호</Label>
                  <Input
                    id="tracking"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="운송장번호를 입력하세요"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="note">메모</Label>
                <Textarea
                  id="note"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="상태 변경에 대한 메모를 입력하세요 (선택사항)"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSaveStatus}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
