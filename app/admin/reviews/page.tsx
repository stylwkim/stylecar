"use client"

import { useState, useEffect } from "react"
import { Plus, Wand2, Search, Eye, Edit, Trash2, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminLayout from "@/components/admin-layout"

interface Review {
  id: string
  title: string
  content: string
  category: string
  rating: number
  author: string
  status: "published" | "draft" | "scheduled"
  publishDate: string
  createdAt: string
  views: number
  likes: number
  tags: string[]
  productId?: string
  productName?: string
  isAuto: boolean
}

export default function ReviewsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // 데모 데이터 생성
  useEffect(() => {
    const generateDemoReviews = () => {
      setIsLoading(true)

      const categories = ["카매트", "세차용품", "차량용품", "인테리어", "익스테리어", "전자기기"]
      const statuses: ("published" | "draft" | "scheduled")[] = ["published", "draft", "scheduled"]
      const authors = ["김철수", "이영희", "박민수", "최지영", "정우진"]

      const demoReviews: Review[] = Array.from({ length: 30 }, (_, i) => {
        const id = `REV-${String(i + 1).padStart(3, "0")}`
        const category = categories[Math.floor(Math.random() * categories.length)]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const author = authors[Math.floor(Math.random() * authors.length)]
        const rating = Math.floor(Math.random() * 2) + 4 // 4-5점
        const views = Math.floor(Math.random() * 1000) + 50
        const likes = Math.floor(Math.random() * 100) + 5
        const isAuto = Math.random() > 0.6

        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 30))

        const publishDate =
          status === "scheduled"
            ? new Date(Date.now() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
            : date.toISOString().split("T")[0]

        const carModels = ["아반떼 CN7", "쏘나타 DN8", "그랜저 GN7", "투싼 NX4", "싼타페 MX5"]
        const carModel = carModels[Math.floor(Math.random() * carModels.length)]

        return {
          id,
          title: isAuto
            ? `${carModel} ${category} 스타일카 제품 리얼 후기 | ${["6개월", "1년", "3개월"][Math.floor(Math.random() * 3)]} 사용기`
            : `${category} 구매 후기 - ${carModel} 오너의 솔직한 평가`,
          content: `${category} 제품에 대한 상세한 사용 후기입니다. ${carModel}에 완벽하게 맞는 제품으로...`,
          category,
          rating,
          author,
          status,
          publishDate,
          createdAt: date.toISOString().split("T")[0],
          views,
          likes,
          tags: [`${carModel}`, `${category}`, "스타일카", "후기", "리뷰"],
          productId: `PROD-${String(Math.floor(Math.random() * 50) + 1).padStart(3, "0")}`,
          productName: `${carModel} ${category}`,
          isAuto,
        }
      })

      setTimeout(() => {
        setReviews(demoReviews)
        setIsLoading(false)
      }, 800)
    }

    generateDemoReviews()
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const filteredReviews = reviews
    .filter((review) => review.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((review) => (categoryFilter === "all" ? true : review.category === categoryFilter))
    .filter((review) => (statusFilter === "all" ? true : review.status === statusFilter))
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === "views") {
        return b.views - a.views
      } else if (sortBy === "likes") {
        return b.likes - a.likes
      } else if (sortBy === "rating") {
        return b.rating - a.rating
      }
      return 0
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "text-green-600 bg-green-100"
      case "draft":
        return "text-gray-600 bg-gray-100"
      case "scheduled":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "발행됨"
      case "draft":
        return "임시저장"
      case "scheduled":
        return "예약발행"
      default:
        return status
    }
  }

  const uniqueCategories = ["all", ...new Set(reviews.map((review) => review.category))]

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">후기 관리</h1>
          <p className="text-gray-500">총 {reviews.length}개의 후기가 등록되어 있습니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleRefresh} variant="outline" size="icon" disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button
            onClick={() => router.push("/admin/reviews/auto-generate")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            AI 후기 생성
          </Button>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            수동 작성
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="후기 제목 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 카테고리</SelectItem>
                {uniqueCategories
                  .filter((cat) => cat !== "all")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="published">발행됨</SelectItem>
                <SelectItem value="draft">임시저장</SelectItem>
                <SelectItem value="scheduled">예약발행</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">최신순</SelectItem>
                <SelectItem value="oldest">오래된순</SelectItem>
                <SelectItem value="views">조회수순</SelectItem>
                <SelectItem value="likes">좋아요순</SelectItem>
                <SelectItem value="rating">평점순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">리스트 보기</TabsTrigger>
            <TabsTrigger value="grid">그리드 보기</TabsTrigger>
            <TabsTrigger value="analytics">분석</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-4 border rounded-md animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-[100px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredReviews.map((review) => (
                  <Card key={review.id} className="hover:bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-lg">{review.title}</h3>
                            <Badge className={`text-xs ${getStatusColor(review.status)}`}>
                              {getStatusText(review.status)}
                            </Badge>
                            {review.isAuto && (
                              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-600">
                                AI 생성
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{review.category}</span>
                            <span>작성자: {review.author}</span>
                            <span>평점: {"★".repeat(review.rating)}</span>
                            <span>조회수: {review.views.toLocaleString()}</span>
                            <span>좋아요: {review.likes}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            {review.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {review.status === "scheduled"
                              ? `예약발행: ${review.publishDate}`
                              : `작성일: ${review.createdAt}`}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            미리보기
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            수정
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            삭제
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="grid" className="space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${getStatusColor(review.status)}`}>
                          {getStatusText(review.status)}
                        </Badge>
                        {review.isAuto && (
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-600">
                            AI
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-sm line-clamp-2">{review.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{review.category}</span>
                          <span>{"★".repeat(review.rating)}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>조회 {review.views}</span>
                          <span>좋아요 {review.likes}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {review.status === "scheduled" ? `예약: ${review.publishDate}` : review.createdAt}
                        </div>
                        <div className="flex items-center justify-end space-x-1 pt-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">총 후기</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reviews.length}</div>
                  <p className="text-xs text-gray-500">전체 후기 수</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">발행된 후기</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reviews.filter((r) => r.status === "published").length}</div>
                  <p className="text-xs text-gray-500">현재 공개 중</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI 생성 후기</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reviews.filter((r) => r.isAuto).length}</div>
                  <p className="text-xs text-gray-500">자동 생성됨</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">평균 평점</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                  </div>
                  <p className="text-xs text-gray-500">5점 만점</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
