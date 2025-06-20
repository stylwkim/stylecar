"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Eye, Edit, Trash2, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import AdminLayout from "@/components/admin-layout"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  registrationDate: string
  status: string
  grade: string
  address: string
}

export default function CustomersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // 데모 데이터 생성
  useEffect(() => {
    const generateDemoCustomers = () => {
      setIsLoading(true)

      const statuses = ["활성", "휴면", "탈퇴"]
      const grades = ["VIP", "골드", "실버", "일반"]

      const demoCustomers: Customer[] = Array.from({ length: 50 }, (_, i) => {
        const id = `CUST-${String(i + 1).padStart(5, "0")}`
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const grade = grades[Math.floor(Math.random() * grades.length)]
        const totalOrders = Math.floor(Math.random() * 20)
        const totalSpent = Math.floor(Math.random() * 2000000) + 10000

        const regDate = new Date()
        regDate.setDate(regDate.getDate() - Math.floor(Math.random() * 365))

        const lastOrderDate = new Date(regDate)
        if (totalOrders > 0) {
          lastOrderDate.setDate(lastOrderDate.getDate() + Math.floor(Math.random() * 300))
        }

        return {
          id,
          name: ["김철수", "이영희", "박민수", "정수진", "최동훈", "윤지영", "강현우", "조미영", "장성호", "한지민"][
            Math.floor(Math.random() * 10)
          ],
          email: `customer${i + 1}@example.com`,
          phone: `010-${String(Math.floor(Math.random() * 9000) + 1000)}-${String(
            Math.floor(Math.random() * 9000) + 1000,
          )}`,
          totalOrders,
          totalSpent,
          lastOrderDate: lastOrderDate.toISOString().split("T")[0],
          registrationDate: regDate.toISOString().split("T")[0],
          status,
          grade,
          address: `서울시 ${
            ["강남구", "서초구", "마포구", "송파구", "강서구"][Math.floor(Math.random() * 5)]
          } 예시로 ${Math.floor(Math.random() * 999) + 1}`,
        }
      })

      setTimeout(() => {
        setCustomers(demoCustomers)
        setIsLoading(false)
      }, 1000)
    }

    generateDemoCustomers()
  }, [])

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)

    const matchesGrade = gradeFilter === "all" || customer.grade === gradeFilter
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesGrade && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "활성":
        return "bg-green-100 text-green-800"
      case "휴면":
        return "bg-yellow-100 text-yellow-800"
      case "탈퇴":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "VIP":
        return "bg-purple-100 text-purple-800"
      case "골드":
        return "bg-yellow-100 text-yellow-800"
      case "실버":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsViewDialogOpen(true)
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span>고객 데이터를 불러오는 중...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">고객 관리</h1>
          <p className="text-gray-500">고객 정보를 조회하고 관리합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            엑셀 다운로드
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            고객 추가
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 고객</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% 지난 달 대비</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 고객</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter((c) => c.status === "활성").length.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              전체의 {Math.round((customers.filter((c) => c.status === "활성").length / customers.length) * 100)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP 고객</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter((c) => c.grade === "VIP").length.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              전체의 {Math.round((customers.filter((c) => c.grade === "VIP").length / customers.length) * 100)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 구매액</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}
            </div>
            <p className="text-xs text-muted-foreground">+8% 지난 달 대비</p>
          </CardContent>
        </Card>
      </div>

      {/* 필터 및 검색 */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="이름, 이메일, 전화번호로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="등급 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 등급</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="골드">골드</SelectItem>
                <SelectItem value="실버">실버</SelectItem>
                <SelectItem value="일반">일반</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="활성">활성</SelectItem>
                <SelectItem value="휴면">휴면</SelectItem>
                <SelectItem value="탈퇴">탈퇴</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 고객 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>고객 목록</CardTitle>
          <CardDescription>총 {filteredCustomers.length}명의 고객</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">고객명</th>
                  <th className="py-3 px-4 text-left">연락처</th>
                  <th className="py-3 px-4 text-left">등급</th>
                  <th className="py-3 px-4 text-left">상태</th>
                  <th className="py-3 px-4 text-left">주문수</th>
                  <th className="py-3 px-4 text-left">총 구매액</th>
                  <th className="py-3 px-4 text-left">가입일</th>
                  <th className="py-3 px-4 text-left">작업</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{customer.phone}</td>
                    <td className="py-3 px-4">
                      <Badge className={getGradeColor(customer.grade)}>{customer.grade}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                    </td>
                    <td className="py-3 px-4">{customer.totalOrders}회</td>
                    <td className="py-3 px-4">{formatCurrency(customer.totalSpent)}</td>
                    <td className="py-3 px-4">{customer.registrationDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewCustomer(customer)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 고객 상세 보기 다이얼로그 */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>고객 상세 정보</DialogTitle>
            <DialogDescription>고객의 상세 정보를 확인합니다.</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>고객명</Label>
                  <p className="text-sm font-medium">{selectedCustomer.name}</p>
                </div>
                <div>
                  <Label>이메일</Label>
                  <p className="text-sm">{selectedCustomer.email}</p>
                </div>
                <div>
                  <Label>전화번호</Label>
                  <p className="text-sm">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <Label>고객 등급</Label>
                  <Badge className={getGradeColor(selectedCustomer.grade)}>{selectedCustomer.grade}</Badge>
                </div>
                <div>
                  <Label>상태</Label>
                  <Badge className={getStatusColor(selectedCustomer.status)}>{selectedCustomer.status}</Badge>
                </div>
                <div>
                  <Label>가입일</Label>
                  <p className="text-sm">{selectedCustomer.registrationDate}</p>
                </div>
                <div>
                  <Label>총 주문수</Label>
                  <p className="text-sm font-medium">{selectedCustomer.totalOrders}회</p>
                </div>
                <div>
                  <Label>총 구매액</Label>
                  <p className="text-sm font-medium">{formatCurrency(selectedCustomer.totalSpent)}</p>
                </div>
              </div>
              <div>
                <Label>주소</Label>
                <p className="text-sm">{selectedCustomer.address}</p>
              </div>
              <div>
                <Label>최근 주문일</Label>
                <p className="text-sm">{selectedCustomer.lastOrderDate}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
