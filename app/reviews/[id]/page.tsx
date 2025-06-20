"use client"

import { useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Calendar,
  Eye,
  Heart,
  Share2,
  Bookmark,
  ThumbsUp,
  Flag,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Copy,
  Facebook,
  Twitter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BlogReviewSchema } from "@/components/blog-review-schema"
import Head from "next/head"

export default function ReviewDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [comment, setComment] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // 실제로는 params.id로 API에서 데이터를 가져와야 함
  const review = {
    id: 1,
    title: "아반떼 CN7 3D 카매트 6개월 사용 후기 - 완전 만족!",
    content: `
  <div class="blog-content">
    <p>안녕하세요! 아반떼 CN7을 타고 있는 직장인입니다.</p>
    
    <p>처음에는 가격이 좀 비싸다고 생각했는데, <strong>6개월 써보니 정말 돈값을 하는 제품</strong>이네요. 특히 겨울철 눈과 비에도 전혀 문제없고, 청소도 정말 쉬워요!</p>
    
    <p>이 제품은 <a href="https://stylecar.co.kr/products/avante-cn7-3d-carmat" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">스타일카 공식몰에서 구매</a>했습니다.</p>
    
    <h3>구매 이유</h3>
    <ul>
      <li>기존 카매트가 너무 얇아서 물이 스며들었음</li>
      <li>겨울철 눈 때문에 차 바닥이 항상 젖어있었음</li>
      <li>청소가 어려워서 냄새가 나기 시작했음</li>
    </ul>
    
    <h3>개봉기 및 첫인상</h3>
    <p>택배로 받았는데 포장이 정말 깔끔하게 되어있더라구요. 박스를 열어보니 <em>생각보다 두껍고 무게감</em>이 있어서 품질이 좋아 보였어요.</p>
    
    <div class="image-container">
      <a href="https://stylecar.co.kr/products/avante-cn7-3d-carmat" target="_blank" rel="noopener noreferrer">
        <img src="/placeholder.svg?height=400&width=600" alt="아반떼 CN7 카매트 개봉 사진" class="cursor-pointer hover:opacity-90 transition-opacity" />
      </a>
      <p class="image-caption">배송 온 패키지와 개봉 모습 (클릭하면 제품 페이지로 이동)</p>
    </div>
    
    <p>패키지를 열어보니 카매트가 깔끔하게 접혀있었고, 설치 가이드와 함께 고정용 클립도 들어있었어요. 재질을 만져보니 고급스러운 느낌이 확실히 들었습니다.</p>
    
    <div class="image-container">
      <img src="/placeholder.svg?height=400&width=600" alt="아반떼 CN7 카매트 설치 전" />
      <p class="image-caption">설치 전 기존 카매트 상태</p>
    </div>
    
    <h3>설치 과정</h3>
    <p>설치는 정말 간단했어요. 기존 카매트를 제거하고 새 카매트를 넣은 다음, 운전석은 고정 클립으로 고정해주기만 하면 됩니다.</p>
    
    <p>자세한 설치 방법은 <a href="https://blog.naver.com/stylecar/installation-guide" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">공식 설치 가이드</a>를 참고하세요!</p>
    
    <div class="image-container">
      <img src="/placeholder.svg?height=400&width=600" alt="아반떼 CN7 카매트 설치 과정" />
      <p class="image-caption">카매트 설치 과정</p>
    </div>
    
    <p>전체 설치 시간은 5분도 안 걸렸어요. 정말 쉽습니다!</p>
    
    <div class="video-container">
      <video controls poster="/placeholder.svg?height=400&width=600">
        <source src="/videos/carmat-demo.mp4" type="video/mp4" />
        브라우저가 동영상을 지원하지 않습니다.
      </video>
      <p class="video-caption">설치 과정 동영상</p>
    </div>
    
    <h3>장점</h3>
    <ul>
      <li><strong>완벽한 핏감</strong>: 차종별 전용 설계라서 정말 딱 맞아요</li>
      <li><strong>방수 기능</strong>: 물을 쏟아도 전혀 스며들지 않음</li>
      <li><strong>미끄럼 방지</strong>: 운전 중에도 전혀 밀리지 않음</li>
      <li><strong>청소 용이</strong>: 물티슈로 닦기만 하면 끝!</li>
      <li><strong>냄새 없음</strong>: 친환경 소재라서 냄새가 전혀 안남</li>
    </ul>
    
    <div class="image-container">
      <a href="https://stylecar.co.kr/products/avante-cn7-3d-carmat" target="_blank" rel="noopener noreferrer">
        <img src="/placeholder.svg?height=400&width=600" alt="아반떼 CN7 카매트 설치 완료" class="cursor-pointer hover:opacity-90 transition-opacity" />
      </a>
      <p class="image-caption">설치 완료된 모습 - 완벽한 핏감! (클릭하면 구매 페이지로 이동)</p>
    </div>
    
    <h3>가격 및 구매 정보</h3>
    <p>현재 <a href="https://stylecar.co.kr/sale" target="_blank" rel="noopener noreferrer" class="text-red-600 font-semibold hover:underline">특가 이벤트</a> 진행 중이니 관심 있으신 분들은 서둘러 주문하세요!</p>
    
    <h3>아쉬운 점</h3>
    <ul>
      <li>가격이 조금 비싼 편 (하지만 품질을 생각하면 합리적)</li>
      <li>처음에는 약간 딱딱한 느낌 (시간이 지나면서 부드러워짐)</li>
    </ul>
    
    <h3>총평</h3>
    <p>정말 만족스러운 구매였습니다! 다음에 차를 바꿔도 또 살 예정이에요. 특히 겨울철에 정말 유용해요. 눈이 녹아서 물이 되어도 전혀 스며들지 않고, 털어내기만 하면 깔끔하게 청소가 됩니다.</p>
    
    <div class="image-container">
      <img src="/placeholder.svg?height=400&width=600" alt="아반떼 CN7 카매트 3개월 사용 후" />
      <p class="image-caption">3개월 사용 후에도 깨끗한 상태 유지</p>
    </div>
    
    <p>혹시 아반떼 CN7 카매트 고민하시는 분들께 적극 추천드려요! 궁금한 점 있으시면 댓글로 물어보세요.</p>
    
    <div class="link-box" style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <h4 style="margin: 0 0 10px 0; color: #495057;">🔗 관련 링크</h4>
      <ul style="margin: 0; padding-left: 20px;">
        <li><a href="https://stylecar.co.kr/products/avante-cn7-3d-carmat" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">아반떼 CN7 3D 카매트 구매하기</a></li>
        <li><a href="https://stylecar.co.kr/categories/carmat" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">다른 차종 카매트 보기</a></li>
        <li><a href="https://blog.naver.com/stylecar/installation-guide" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">카매트 설치 가이드</a></li>
      </ul>
    </div>
  </div>
`,
    author: "carlife2024",
    authorImage: "/placeholder.svg?height=100&width=100",
    rating: 5,
    date: "2024.01.15",
    category: "카매트",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    videos: [
      {
        src: "/videos/carmat-demo.mp4",
        poster: "/placeholder.svg?height=400&width=600",
        title: "카매트 설치 과정",
      },
    ],
    likes: 124,
    comments: 18,
    views: 2847,
    tags: ["아반떼CN7", "3D카매트", "겨울용품", "실사용후기", "추천"],
    verified: true,
    helpful: 89,
    series: "자동차 용품 리뷰",
    blogName: "스타일카 공식 블로그",
  }

  const comments = [
    {
      id: 1,
      author: "cleancar_pro",
      authorImage: "/placeholder.svg?height=40&width=40",
      content: "저도 같은 제품 쓰고 있는데 정말 좋아요! 특히 청소가 쉬워서 만족해요.",
      date: "2024.01.16",
      likes: 12,
    },
    {
      id: 2,
      author: "car_newbie",
      authorImage: "/placeholder.svg?height=40&width=40",
      content: "혹시 뒷좌석 카매트도 같이 주문하셨나요? 가격이 어떻게 되는지 궁금해요.",
      date: "2024.01.16",
      likes: 5,
    },
    {
      id: 3,
      author: "carlife2024",
      authorImage: "/placeholder.svg?height=40&width=40",
      content:
        "네 뒷좌석도 같이 구매했어요! 세트로 구매하면 10% 할인받아서 총 12만원 정도 했습니다. 뒷좌석도 핏감 완벽해요!",
      date: "2024.01.17",
      likes: 8,
      isAuthor: true,
    },
  ]

  const relatedPosts = [
    {
      id: 2,
      title: "무선 차량용 청소기 리얼 후기 - 흡입력 테스트 결과 놀라워!",
      author: "cleancar_pro",
      date: "2024.01.12",
      thumbnail: "/placeholder.svg?height=100&width=150",
      views: 1923,
    },
    {
      id: 3,
      title: "프리미엄 세차 케어 키트 한 달 사용기 - 새 차 느낌 그대로",
      author: "winter_wash",
      date: "2024.01.10",
      thumbnail: "/placeholder.svg?height=100&width=150",
      views: 3421,
    },
    {
      id: 4,
      title: "아반떼 CN7 실내 LED 교체 과정 및 효과 - 확실히 달라진 분위기!",
      author: "carlife2024",
      date: "2024.01.05",
      thumbnail: "/placeholder.svg?height=100&width=150",
      views: 2156,
    },
  ]

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  const handleComment = () => {
    if (comment.trim()) {
      console.log("댓글 작성:", comment)
      setComment("")
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("링크가 복사되었습니다!")
  }

  return (
    <>
      <Head>
        <title>
          {review.title} - {review.blogName}
        </title>
        <meta
          name="description"
          content={`${review.author}님의 ${review.category} 실제구매후기. ${review.rating}점 만점에 ${review.rating}점! 생생한 사용 경험과 사진으로 확인하세요.`}
        />
        <meta
          name="keywords"
          content={`${review.tags.join(", ")}, 자동차용품 후기, 실제구매후기, ${review.category} 후기`}
        />
        <link rel="canonical" href={`https://stylecar.co.kr/reviews/${review.id}`} />

        {/* Open Graph */}
        <meta property="og:title" content={review.title} />
        <meta
          property="og:description"
          content={`${review.author}님의 솔직한 ${review.category} 사용후기. ${review.rating}점 평점!`}
        />
        <meta property="og:image" content={`https://stylecar.co.kr${review.images[0]}`} />
        <meta property="og:url" content={`https://stylecar.co.kr/reviews/${review.id}`} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content={review.author} />
        <meta property="article:published_time" content={review.date.replace(/\./g, "-")} />
        <meta property="article:section" content={review.category} />
        <meta property="article:tag" content={review.tags.join(", ")} />
      </Head>

      {/* 구조화된 데이터는 컴포넌트로 분리 */}
      <BlogReviewSchema review={review} />

      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* 블로그 헤더 */}
        <div className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Link href="/reviews" className="font-bold text-lg sm:text-xl text-blue-600 hover:underline">
                  {review.blogName}
                </Link>
                <span className="hidden sm:inline text-gray-400">|</span>
                <Link href={`/reviews/series/${review.series}`} className="text-sm text-gray-600 hover:underline">
                  {review.series}
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleBookmark}>
                  <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`} />
                </Button>
                <Button variant="outline" size="sm">
                  구독하기
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 메인 콘텐츠 */}
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* 포스트 헤더 */}
            <header className="p-4 sm:p-6 border-b">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-blue-600 text-white">{review.category}</Badge>
                {review.verified && <Badge className="bg-green-600 text-white text-xs">✓ 구매인증</Badge>}
                <Link
                  href={`/reviews/series/${review.series}`}
                  className="text-xs sm:text-sm text-gray-500 hover:underline"
                >
                  {review.series}
                </Link>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {review.title}
              </h1>

              {/* 작성자 정보 - 모바일 최적화 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                    <AvatarImage src={review.authorImage || "/placeholder.svg"} alt={review.author} />
                    <AvatarFallback>{review.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm sm:text-base">{review.author}</div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{review.date}</span>
                      <span className="mx-2">•</span>
                      <Eye className="w-3 h-3 mr-1" />
                      <span>{review.views.toLocaleString()}회</span>
                    </div>
                  </div>
                </div>

                {/* 공유 및 더보기 - 모바일 최적화 */}
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
                        <Share2 className="w-4 h-4 mr-1" />
                        <span className="sm:inline">공유</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-2">
                      <div className="grid gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center justify-start"
                          onClick={copyLink}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          <span>링크 복사</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center justify-start">
                          <Facebook className="w-4 h-4 mr-2" />
                          <span>페이스북</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center justify-start">
                          <Twitter className="w-4 h-4 mr-2" />
                          <span>트위터</span>
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                      <div className="grid gap-1">
                        <Button variant="ghost" size="sm" className="flex items-center justify-start">
                          <Flag className="w-4 h-4 mr-2" />
                          <span>신고</span>
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* 평점 - 모바일 최적화 */}
              <div className="flex items-center mb-2">
                <div className="text-base sm:text-lg font-medium mr-2">평점:</div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-base sm:text-lg font-medium ml-2">{review.rating}.0</span>
              </div>
            </header>

            {/* 본문 */}
            <div className="p-4 sm:p-6">
              {/* 본문 내용 */}
              <div
                ref={contentRef}
                className="prose prose-sm sm:prose max-w-none mb-8 blog-post-content"
                dangerouslySetInnerHTML={{ __html: review.content }}
              />

              {/* 태그 - 모바일 최적화 */}
              <div className="mb-8">
                <h3 className="text-base sm:text-lg font-semibold mb-3">태그</h3>
                <div className="flex flex-wrap gap-2">
                  {review.tags.map((tag, index) => (
                    <Link href={`/reviews/tag/${tag}`} key={index}>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100 text-xs sm:text-sm">
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 상호작용 버튼 - 모바일 최적화 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 border-t border-b">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <Button
                    variant={liked ? "default" : "outline"}
                    onClick={handleLike}
                    className={`text-sm ${liked ? "bg-red-500 hover:bg-red-600" : ""}`}
                    size="sm"
                  >
                    <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                    좋아요 {review.likes + (liked ? 1 : 0)}
                  </Button>
                  <Button variant="outline" size="sm" className="text-sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    도움돼요 {review.helpful}
                  </Button>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" onClick={handleBookmark} className="flex-1 sm:flex-none">
                    <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? "fill-yellow-400" : ""}`} />
                    {bookmarked ? "저장됨" : "저장"}
                  </Button>
                </div>
              </div>

              {/* 작성자 프로필 */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={review.authorImage || "/placeholder.svg"} alt={review.author} />
                    <AvatarFallback>{review.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{review.author}</h3>
                    <p className="text-gray-600 mb-2">자동차 용품 리뷰어 | 아반떼 CN7 오너</p>
                    <p className="text-sm text-gray-500">
                      자동차 용품에 관심이 많은 사용자입니다. 직접 사용해본 제품만 솔직하게 리뷰합니다.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    프로필 보기
                  </Button>
                </div>
              </div>
            </div>

            {/* 댓글 섹션 */}
            <div className="p-4 sm:p-6 bg-gray-50">
              <h3 className="text-base sm:text-lg font-semibold mb-4">댓글 {comments.length}개</h3>

              {/* 댓글 작성 - 모바일 최적화 */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="사용자" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm sm:text-base">방문자</span>
                </div>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="댓글을 작성해주세요..."
                  className="mb-3 text-sm sm:text-base"
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button onClick={handleComment} disabled={!comment.trim()} size="sm">
                    댓글 작성
                  </Button>
                </div>
              </div>

              {/* 댓글 목록 - 모바일 최적화 */}
              <div className="space-y-4 sm:space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3 flex-1">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.authorImage || "/placeholder.svg"} alt={comment.author} />
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2">
                            <span className="font-medium text-sm sm:text-base">{comment.author}</span>
                            {comment.isAuthor && (
                              <Badge variant="outline" className="text-xs">
                                작성자
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{comment.date}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        <span>좋아요 {comment.likes}</span>
                      </Button>
                      <span className="mx-2">•</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        답글 달기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* 관련 포스트 */}
          <section className="mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">관련 포스트</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <Link href={`/reviews/${post.id}`}>
                    <CardContent className="p-3 sm:p-4">
                      <div className="mb-3">
                        <img
                          src={post.thumbnail || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-24 sm:h-32 object-cover rounded"
                        />
                      </div>
                      <h3 className="font-medium mb-2 line-clamp-2 hover:text-blue-600 transition-colors text-sm sm:text-base">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Eye className="w-3 h-3 mr-1" />
                        <span>{post.views.toLocaleString()}회</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>

          {/* 이전/다음 포스트 네비게이션 - 모바일 최적화 */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/reviews/${Number.parseInt(params.id as string) - 1}`)}
              className="w-full sm:w-auto"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              이전 포스트
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`/reviews/${Number.parseInt(params.id as string) + 1}`)}
              className="w-full sm:w-auto"
            >
              다음 포스트
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <Footer />
      </div>

      <style jsx global>{`
        .blog-content {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          line-height: 1.8;
          color: #333;
        }

        .blog-content a {
          color: #1976d2;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .blog-content a:hover {
          border-bottom-color: #1976d2;
          background-color: rgba(25, 118, 210, 0.1);
        }

        .blog-content a[target="_blank"]::after {
          content: " ↗";
          font-size: 0.8em;
          opacity: 0.7;
        }

        .link-box {
          background: #f8f9fa !important;
          border: 1px solid #e9ecef !important;
          border-radius: 8px !important;
          padding: 16px !important;
          margin: 20px 0 !important;
        }

        .link-box h4 {
          margin: 0 0 10px 0 !important;
          color: #495057 !important;
          font-size: 1.1em !important;
        }

        .link-box ul {
          margin: 0 !important;
          padding-left: 20px !important;
        }

        .link-box li {
          margin-bottom: 8px !important;
        }

        /* 모바일 최적화 */
        @media (max-width: 640px) {
          .blog-content {
            font-size: 14px;
            line-height: 1.6;
          }
          
          .blog-content h3 {
            font-size: 1.25rem;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          
          .blog-content p {
            margin-bottom: 1rem;
          }
          
          .blog-content ul {
            margin-bottom: 1rem;
            padding-left: 1.25rem;
          }
          
          .image-container {
            margin: 1.5rem 0;
          }
          
          .video-container {
            margin: 1.5rem 0;
          }
          
          .image-caption, .video-caption {
            font-size: 0.75rem;
            padding: 0 0.5rem;
          }

          .link-box {
            padding: 12px !important;
            margin: 15px 0 !important;
          }

          .link-box h4 {
            font-size: 1em !important;
          }
        }

        /* 태블릿 최적화 */
        @media (min-width: 641px) and (max-width: 1024px) {
          .blog-content {
            font-size: 15px;
          }
          
          .blog-content h3 {
            font-size: 1.375rem;
          }
        }

        /* 데스크톱 */
        @media (min-width: 1025px) {
          .blog-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #111;
          }
          
          .blog-content p {
            margin-bottom: 1.5rem;
          }
          
          .blog-content ul {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
            list-style-type: disc;
          }
          
          .blog-content li {
            margin-bottom: 0.5rem;
          }
          
          .blog-content strong {
            font-weight: 600;
            color: #111;
          }
          
          .blog-content em {
            font-style: italic;
          }
          
          .image-container {
            margin: 2rem 0;
            text-align: center;
          }
          
          .image-container img {
            max-width: 100%;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
          }
          
          .image-caption {
            font-size: 0.875rem;
            color: #666;
          }
          
          .video-container {
            margin: 2rem 0;
            text-align: center;
          }
          
          .video-container video {
            max-width: 100%;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
          }
          
          .video-caption {
            font-size: 0.875rem;
            color: #666;
          }
        }
      `}</style>
    </>
  )
}
