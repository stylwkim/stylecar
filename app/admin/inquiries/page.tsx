"use client"

import { useState, useEffect } from "react"
import { Search, Eye, MessageSquare, Clock, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import AdminLayout from "@/components/admin-layout"

interface Inquiry {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  category: string
  subject: string
  content: string
  status: string
  priority: string
  createdAt: string
  updatedAt: string
  response?: string
  responseAt?: string
  adminName?: string
}

export default function InquiriesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [response, setResponse] = useState("")

  // 데모 데이터 생성
  useEffect(() => {
    const generateDemoInquiries = () => {
      setIsLoading(true)

      const categories = ["주문/결제", "배송", "교환/환불", "상품 문의", "A/S", "기타"]
      const statuses = ["대기", "처리중", "완료", "보류"]
      const priorities = ["높음", "보통", "낮음"]

      const subjects = [
        "주문 취소 요청",
        "배송 지연 문의",
        "상품 불량 신고",
        "교환 신청",
        "환불 요청",
        "카매트 사이즈 문의",
        "설치 방법 문의",
        "A/S 신청",
        "할인 쿠폰 문의",
        "회원 탈퇴 요청",
      ]

      const demoInquiries: Inquiry[] = Array.from({ length: 30 }, (_, i) => {
        const id = `INQ-${String(i + 1).padStart(5, "0")}`
        const category = categories[Math.floor(Math.random() * categories.length)]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const priority = priorities[Math.floor(Math.random() * priorities.length)]
        const subject = subjects[Math.floor(Math.random() * subjects.length)]

        const createdAt = new Date()
        createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30))

        const updatedAt = new Date(createdAt)
        updatedAt.setHours(updatedAt.getHours() + Math.floor(Math.random() * 48))

        const hasResponse = status === "완료" || Math.random() > 0.6

        return {
          id,
          customerName: ["김철수", "이영희", "박민수", "정수진", "최동훈", "윤지영", "강현우", "조미영"][
            Math.floor(Math.random() * 8)
          ],
          customerEmail: `customer${i + 1}@example.com`,
          customerPhone: `010-${String(Math.floor(Math.random() * 9000) + 1000)}-${String(
            Math.floor(Math.random() * 9000) + 1000,
          )}`,
          category,
          subject,
          content: `${subject}에 대한 상세 문의 내용입니다. 빠른 처리 부탁드립니다.`,
          status,
          priority,
          createdAt: createdAt.toISOString(),
          updatedAt: updatedAt.toISOString(),
          response: hasResponse
            ? "문의해 주신 내용에 대해 확인하여 처리해드렸습니다. 추가 문의사항이 있으시면 언제든 연락 주세요."
            : undefined,
          responseAt: hasResponse ? updatedAt.toISOString() : undefined,
          adminName: hasResponse ? "관리자" : undefined,
        }
      })

      setTimeout(() => {
        setInquiries(demoInquiries)
        setIsLoading(false)
      }, 1000)
    }

    generateDemoInquiries()
  }, [])

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || inquiry.category === categoryFilter
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter
    const matchesPriority = priorityFilter === "all" || inquiry.priority === priorityFilter

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "대기":
        return "bg-red-100 text-red-800"
      case "처리중":
        return "bg-yellow-100 text-yellow-800"
      case "완료":
        return "bg-green-100 text-green-800"
      case "보류":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "높음":
        return "bg-red-100 text-red-800"
      case "보통":
        return "bg-blue-100 text-blue-800"
      case "낮음":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "대기":
        return <Clock className="h-4 w-4" />
      case "처리중":
        return <AlertCircle className="h-4 w-4" />
      case "완료":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setResponse(inquiry.response || "")
    setIsViewDialogOpen(true)
  }

  const handleSaveResponse = () => {
    if (selectedInquiry) {
      const updatedInquiries = inquiries.map((inquiry) =>
        inquiry.id === selectedInquiry.id
          ? {
              ...inquiry,
              response,
              responseAt: new Date().toISOString(),
              status: "완료",
              adminName: "관리자",
            }
          : inquiry,
      )
      setInquiries(updatedInquiries)
      setIsViewDialogOpen(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span>문의 데이터를 불러오는 중...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">문의 관리</h1>
          <p className="text-gray-500">고객 문의를 확인하고 답변을 관리합니다.</p>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 문의</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiries.length}</div>
            <p className="text-xs text-muted-foreground">+5% 지난 주 대비</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">대기 중</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{inquiries.filter((i) => i.status === "대기").length}</div>
            <p className="text-xs text-muted-foreground">즉시 처리 필요</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">처리 중</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {inquiries.filter((i) => i.status === "처리중").length}
            </div>
            <p className="text-xs text-muted-foreground">진행 중인 문의</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {inquiries.filter((i) => i.status === "완료").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((inquiries.filter((i) => i.status === "완료").length / inquiries.length) * 100)}% 완료율
            </p>
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
                  placeholder="고객명, 제목, 이메일로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 카테고리</SelectItem>
                <SelectItem value="주문/결제">주문/결제</SelectItem>
                <SelectItem value="배송">배송</SelectItem>
                <SelectItem value="교환/환불">교환/환불</SelectItem>
                <SelectItem value="상품 문의">상품 문의</SelectItem>
                <SelectItem value="A/S">A/S</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="대기">대기</SelectItem>
                <SelectItem value="처리중">처리중</SelectItem>
                <SelectItem value="완료">완료</SelectItem>
                <SelectItem value="보류">보류</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="우선순위" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 우선순위</SelectItem>
                <SelectItem value="높음">높음</SelectItem>
                <SelectItem value="보통">보통</SelectItem>
                <SelectItem value="낮음">낮음</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 문의 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>문의 목록</CardTitle>
          <CardDescription>총 {filteredInquiries.length}건의 문의</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">상태</th>
                  <th className="py-3 px-4 text-left">우선순위</th>
                  <th className="py-3 px-4 text-left">고객명</th>
                  <th className="py-3 px-4 text-left">카테고리</th>
                  <th className="py-3 px-4 text-left">제목</th>
                  <th className="py-3 px-4 text-left">등록일</th>
                  <th className="py-3 px-4 text-left">작업</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(inquiry.status)}
                        <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getPriorityColor(inquiry.priority)}>{inquiry.priority}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{inquiry.customerName}</p>
                        <p className="text-xs text-gray-500">{inquiry.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{inquiry.category}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium truncate max-w-[200px]">{inquiry.subject}</p>
                    </td>
                    <td className="py-3 px-4">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon" onClick={() => handleViewInquiry(inquiry)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 문의 상세 보기 다이얼로그 */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>문의 상세 정보</DialogTitle>
            <DialogDescription>문의 내용을 확인하고 답변을 작성합니다.</DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="grid gap-6">
              {/* 문의 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>문의 번호</Label>
                  <p className="text-sm font-medium">{selectedInquiry.id}</p>
                </div>
                <div>
                  <Label>등록일</Label>
                  <p className="text-sm">{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <Label>고객명</Label>
                  <p className="text-sm font-medium">{selectedInquiry.customerName}</p>
                </div>
                <div>
                  <Label>연락처</Label>
                  <p className="text-sm">{selectedInquiry.customerPhone}</p>
                </div>
                <div>
                  <Label>이메일</Label>
                  <p className="text-sm">{selectedInquiry.customerEmail}</p>
                </div>
                <div>
                  <Label>카테고리</Label>
                  <p className="text-sm">{selectedInquiry.category}</p>
                </div>
                <div>
                  <Label>상태</Label>
                  <Badge className={getStatusColor(selectedInquiry.status)}>{selectedInquiry.status}</Badge>
                </div>
                <div>
                  <Label>우선순위</Label>
                  <Badge className={getPriorityColor(selectedInquiry.priority)}>{selectedInquiry.priority}</Badge>
                </div>
              </div>

              {/* 문의 내용 */}
              <div>
                <Label>문의 제목</Label>
                <p className="text-sm font-medium mb-2">{selectedInquiry.subject}</p>
                <Label>문의 내용</Label>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm whitespace-pre-wrap">{selectedInquiry.content}</p>
                </div>
              </div>

              {/* 답변 작성 */}
              <div>
                <Label>답변 내용</Label>
                <Textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="고객에게 보낼 답변을 작성해주세요..."
                  rows={6}
                  className="mt-2"
                />
              </div>

              {/* 기존 답변 표시 */}
              {selectedInquiry.response && (
                <div>
                  <Label>기존 답변</Label>
                  <div className="bg-blue-50 p-4 rounded-md mt-2">
                    <p className="text-sm whitespace-pre-wrap">{selectedInquiry.response}</p>
                    {selectedInquiry.responseAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        답변일: {new Date(selectedInquiry.responseAt).toLocaleString()} ({selectedInquiry.adminName})
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* 액션 버튼 */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={handleSaveResponse}>답변 저장</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
