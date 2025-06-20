"use client"
import { useState } from "react"
import Link from "next/link"
import { Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BlogReviewSchema } from "@/components/blog-review-schema"

// 리뷰 데이터 (실제로는 API에서 가져올 것입니다)
const reviewsData = [
  {
    id: "1",
    title: "최고의 카매트! 완벽한 맞춤형 제품",
    content:
      "스타일카에서 구매한 카매트는 정말 기대 이상입니다. 3D 스캔 기술로 제작되어 제 차량에 완벽하게 맞아요. 방수 기능도 뛰어나고 고급스러운 느낌이 듭니다.",
    author: "김현우",
    date: "2023-05-15",
    rating: 5,
    productId: "carmat-001",
    productName: "프리미엄 가죽자수 카매트 - 현대 팰리세이드",
    images: ["/placeholder.svg?height=300&width=400"],
    tags: ["카매트", "맞춤형", "고품질"],
  },
  {
    id: "2",
    title: "트렁크매트 구매 후기",
    content:
      "캠핑과 차박을 자주 다니는데 스타일카 트렁크매트는 정말 필수품입니다. 방수 기능이 뛰어나고 내구성도 좋아요. 다른 제품과 비교했을 때 확실히 품질 차이가 느껴집니다.",
    author: "이지연",
    date: "2023-06-22",
    rating: 4,
    productId: "trunk-002",
    productName: "풀커버 트렁크매트 - 기아 쏘렌토",
    images: ["/placeholder.svg?height=300&width=400"],
    tags: ["트렁크매트", "캠핑", "방수"],
  },
  {
    id: "3",
    title: "카본매트 사용 후기",
    content:
      "스타일카의 카본매트를 사용한 지 6개월이 지났는데도 처음 구매했을 때와 같은 상태를 유지하고 있어요. 냄새도 없고 관리도 쉬워서 매우 만족스럽습니다.",
    author: "박준호",
    date: "2023-07-10",
    rating: 5,
    productId: "carbon-003",
    productName: "프리미엄 카본매트 - BMW 5시리즈",
    images: ["/placeholder.svg?height=300&width=400"],
    tags: ["카본매트", "내구성", "프리미엄"],
  },
  // 추가 리뷰 데이터
  {
    id: "4",
    title: "라텍스 코일매트 사용 후기 - 냄새 없고 관리 쉬워요",
    content:
      "스타일카의 라텍스 코일매트를 사용한 지 3개월이 지났습니다. 다른 매트와 달리 냄새가 전혀 없고, 물세척이 가능해서 관리가 정말 편리합니다. 특히 아이가 있는 가정에서는 필수품인 것 같아요.",
    author: "정민지",
    date: "2023-08-05",
    rating: 5,
    productId: "latex-004",
    productName: "라텍스 코일매트 - 기아 K5",
    images: ["/placeholder.svg?height=300&width=400"],
    tags: ["라텍스코일매트", "친환경", "관리편리"],
  },
  {
    id: "5",
    title: "벤츠 S클래스 맞춤형 카매트 - 완벽한 핏팅감",
    content:
      "수입차 맞춤형 카매트를 찾기가 정말 어려웠는데, 스타일카에서 벤츠 S클래스에 딱 맞는 카매트를 제작해주셨어요. 3D 스캔 기술로 제작되어 완벽하게 맞고, 고급스러운 느낌까지 더해져서 만족도가 높습니다.",
    author: "김태우",
    date: "2023-09-12",
    rating: 5,
    productId: "benz-005",
    productName: "프리미엄 가죽자수 카매트 - 벤츠 S클래스",
    images: ["/placeholder.svg?height=300&width=400"],
    tags: ["벤츠", "수입차", "맞춤형", "고급형"],
  },
  {
    id: "6",
    title: "TPE 카매트 - 가성비 최고의 선택",
    content:
      "가성비 좋은 카매트를 찾다가 스타일카의 TPE 카매트를 구매했습니다. 가격 대비 품질이 정말 좋고, 방수 기능도 뛰어나서 만족스럽게 사용 중입니다. 다음에도 스타일카 제품을 구매할 것 같아요.",
    author: "이준호",
    date: "2023-10-08",
    rating: 4,
    productId: "tpe-006",
    productName: "TPE 카매트 - 현대 아반떼",
    images: ["/placeholder.svg?height=300&width=400"],
    tags: ["TPE", "가성비", "방수"],
  },
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentTab, setCurrentTab] = useState("all")
  const [visibleReviews, setVisibleReviews] = useState(3) // 초기에 3개의 리뷰만 표시

  // 실제구매후기 데이터 (실제로는 API에서 가져와야 함)
  const reviews = reviewsData

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || review.tags.includes(categoryFilter)
    const matchesTab =
      currentTab === "all" ||
      (currentTab === "카매트" && review.tags.includes("카매트")) ||
      (currentTab === "세차용품" && review.tags.includes("세차용품")) ||
      (currentTab === "차량용품" && review.tags.includes("차량용품"))

    return matchesSearch && matchesCategory && matchesTab
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        // likes와 comments가 없으므로 rating으로 대체
        return b.rating - a.rating
      case "views":
        // views가 없으므로 rating으로 대체
        return b.rating - a.rating
      case "rating":
        return b.rating - a.rating
      default:
        return new Date(b.date.replace(/\./g, "-")).getTime() - new Date(a.date.replace(/\./g, "-")).getTime()
    }
  })

  // 더 많은 후기 보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    setVisibleReviews((prev) => Math.min(prev + 3, sortedReviews.length))
  }

  // 현재 표시할 리뷰 목록
  const currentReviews = sortedReviews.slice(0, visibleReviews)

  const popularTags = [
    { name: "3D카매트", count: 42 },
    { name: "세차용품", count: 38 },
    { name: "실사용후기", count: 127 },
    { name: "추천", count: 95 },
    { name: "아반떼CN7", count: 23 },
    { name: "K5", count: 19 },
    { name: "방수", count: 31 },
    { name: "TPE", count: 27 },
  ]

  const popularAuthors = [
    { name: "carlife2024", image: "/placeholder.svg?height=40&width=40", posts: 24 },
    { name: "cleancar_pro", image: "/placeholder.svg?height=40&width=40", posts: 18 },
    { name: "winter_wash", image: "/placeholder.svg?height=40&width=40", posts: 15 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 블로그 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">고객 리뷰</h1>
          <Link href="/reviews/write">
            <Button>리뷰 작성하기</Button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 사이드바 */}
          <div className="w-full lg:w-1/4">
            {/* 프로필 카드 */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="스타일카" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold mb-1">스타일카 공식 블로그</h2>
                  <p className="text-gray-500 text-sm mb-4">자동차 용품 전문 리뷰</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-gray-700">1,200+</span>
                      <span>포스트</span>
                    </div>
                    <div className="border-r border-gray-200 h-10"></div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-gray-700">15,000+</span>
                      <span>구독자</span>
                    </div>
                  </div>
                  <Button className="w-full">구독하기</Button>
                </div>
              </CardContent>
            </Card>

            {/* 카테고리 */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">카테고리</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Link href="/reviews?category=all" className="text-gray-700 hover:text-blue-600">
                      전체 카테고리
                    </Link>
                    <Badge variant="secondary">{reviews.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/reviews?category=카매트" className="text-gray-700 hover:text-blue-600">
                      카매트
                    </Link>
                    <Badge variant="secondary">{reviews.filter((r) => r.tags.includes("카매트")).length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/reviews?category=세차용품" className="text-gray-700 hover:text-blue-600">
                      세차용품
                    </Link>
                    <Badge variant="secondary">{reviews.filter((r) => r.tags.includes("세차용품")).length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/reviews?category=차량용품" className="text-gray-700 hover:text-blue-600">
                      차량용품
                    </Link>
                    <Badge variant="secondary">{reviews.filter((r) => r.tags.includes("차량용품")).length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/reviews?category=방향제" className="text-gray-700 hover:text-blue-600">
                      방향제
                    </Link>
                    <Badge variant="secondary">{reviews.filter((r) => r.tags.includes("방향제")).length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 인기 태그 */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">인기 태그</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Link href={`/reviews/tag/${tag.name}`} key={index}>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
                        #{tag.name} <span className="ml-1 text-gray-500">({tag.count})</span>
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 인기 작성자 */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">인기 작성자</h3>
                <div className="space-y-4">
                  {popularAuthors.map((author, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="w-8 h-8 mr-3">
                          <AvatarImage src={author.image || "/placeholder.svg"} alt={author.name} />
                          <AvatarFallback>{author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-gray-700">{author.name}</span>
                      </div>
                      <Badge variant="outline">{author.posts}개</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="w-full lg:w-3/4">
            {/* 검색 및 필터 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="후기 제목이나 태그로 검색하세요..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="카테고리" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 카테고리</SelectItem>
                      <SelectItem value="카매트">카매트</SelectItem>
                      <SelectItem value="세차용품">세차용품</SelectItem>
                      <SelectItem value="차량용품">차량용품</SelectItem>
                      <SelectItem value="방향제">방향제</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="정렬" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">최신순</SelectItem>
                      <SelectItem value="popular">인기순</SelectItem>
                      <SelectItem value="views">조회순</SelectItem>
                      <SelectItem value="rating">평점순</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 탭 메뉴 */}
            <Tabs defaultValue="all" className="mb-8" onValueChange={setCurrentTab}>
              <TabsList className="w-full bg-white">
                <TabsTrigger value="all" className="flex-1">
                  전체
                </TabsTrigger>
                <TabsTrigger value="카매트" className="flex-1">
                  카매트
                </TabsTrigger>
                <TabsTrigger value="세차용품" className="flex-1">
                  세차용품
                </TabsTrigger>
                <TabsTrigger value="차량용품" className="flex-1">
                  차량용품
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* 후기 작성 버튼 */}
            <div className="text-center mb-8">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <Link href="/reviews/write">✍️ 나도 후기 작성하기</Link>
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                실제 구매고객만 후기 작성 가능 • 포토/동영상 후기 시 적립금 지급
              </p>
            </div>

            {/* 후기 목록 - 블로그 스타일 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentReviews.map((review) => (
                <Link href={`/reviews/${review.id}`} key={review.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{review.title}</CardTitle>
                      <CardDescription>
                        {review.author} • {review.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 h-48 overflow-hidden rounded-md">
                        <img
                          src={review.images[0] || "/placeholder.svg"}
                          alt={review.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="line-clamp-3 text-sm text-gray-600">{review.content}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex flex-wrap gap-2">
                        {review.tags.map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            {/* 더보기 버튼 */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="px-8 py-3"
                onClick={handleLoadMore}
                disabled={visibleReviews >= sortedReviews.length}
              >
                {visibleReviews >= sortedReviews.length ? "모든 후기를 불러왔습니다" : "더 많은 후기 보기"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BlogReviewSchema reviews={currentReviews || []} />
      <Footer />
    </div>
  )
}
