"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Star, Eye, Heart, MessageCircle, Calendar, ShoppingBag, Zap, Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function StyleCarHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showMoreReviews, setShowMoreReviews] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
    // 자동 슬라이드
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const heroSlides = [
    {
      title: "🎉 STYLECAR MALL 그랜드 오픈! 🎉",
      subtitle: "프리미엄 자동차용품 전문몰에 오신 것을 환영합니다",
      cta: "쇼핑 시작하기",
      bg: "bg-gradient-to-r from-[#03C75A] to-[#02B351]",
    },
    {
      title: "프리미엄 카매트 한정 특가",
      subtitle: "최대 30% 할인 + 무료배송",
      cta: "지금 구매하기",
      bg: "bg-gradient-to-r from-blue-600 to-blue-800",
    },
    {
      title: "신차급 세차용품 세트",
      subtitle: "전문가가 선택한 베스트 조합",
      cta: "세트 보기",
      bg: "bg-gradient-to-r from-slate-700 to-slate-900",
    },
    {
      title: "겨울 준비 완료",
      subtitle: "방한용품 & 타이어 체인 특가",
      cta: "겨울용품 보기",
      bg: "bg-gradient-to-r from-orange-600 to-red-600",
    },
  ]

  const products = [
    {
      id: 1,
      name: "프리미엄 3D 카매트 풀세트",
      price: "189,000",
      originalPrice: "270,000",
      rating: 4.8,
      reviews: 324,
      image: "/placeholder.svg?height=300&width=300&text=프리미엄+카매트",
      badge: "30% 할인",
      isNew: false,
      isHot: true,
    },
    {
      id: 2,
      name: "무선 차량용 청소기 세트",
      price: "89,000",
      originalPrice: "120,000",
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300&text=무선+청소기",
      badge: "베스트",
      isNew: true,
      isHot: false,
    },
    {
      id: 3,
      name: "프리미엄 세차 케어 키트",
      price: "145,000",
      originalPrice: "180,000",
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300&text=세차+키트",
      badge: "신상품",
      isNew: true,
      isHot: true,
    },
    {
      id: 4,
      name: "차량용 공기청정기",
      price: "65,000",
      originalPrice: "85,000",
      rating: 4.7,
      reviews: 203,
      image: "/placeholder.svg?height=300&width=300&text=공기청정기",
      badge: "인기",
      isNew: false,
      isHot: false,
    },
  ]

  const blogReviews = [
    {
      id: 1,
      title: "제네시스 GV70에 3D 카매트 설치 후기 - 완벽한 핏감에 감동!",
      excerpt:
        "새 차 구매 후 가장 먼저 설치한 3D 카매트. 정말 차에 딱 맞게 제작되어서 놀랐습니다. 특히 운전석 발밑 부분까지 완벽하게 커버되어 있어서...",
      author: "carlife2024",
      authorImage: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024.01.15",
      category: "카매트",
      media: "/placeholder.svg?height=300&width=600&text=GV70+카매트+설치",
      mediaType: "image",
      imageCount: 5,
      likes: 24,
      comments: 8,
      views: 156,
      thumbnail: "/placeholder.svg?height=300&width=600&text=GV70+카매트",
      productId: 1,
      verified: true,
    },
    {
      id: 2,
      title: "무선 차량용 청소기 실제 사용 테스트 - 흡입력 체크!",
      excerpt:
        "구매 전 많이 고민했던 무선 청소기를 드디어 구매했습니다. 실제로 차 안 청소를 해보니 생각보다 흡입력이 좋아서 만족스럽네요...",
      author: "cleancar_pro",
      authorImage: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2024.01.12",
      category: "세차용품",
      media: "/placeholder.svg?height=300&width=600&text=청소기+테스트",
      mediaType: "video",
      imageCount: 1,
      likes: 18,
      comments: 12,
      views: 89,
      thumbnail: "/placeholder.svg?height=300&width=600&text=청소기+사용",
      productId: 2,
      verified: true,
    },
    {
      id: 3,
      title: "겨울철 세차 완벽 가이드 - 프리미엄 세차용품 세트 사용기",
      excerpt:
        "겨울철 세차가 어려워서 미루고 있었는데, 이번에 구매한 세차용품 세트로 집에서도 전문가급 세차가 가능했습니다. 단계별로 사용법을 공유해드릴게요...",
      author: "winter_wash",
      authorImage: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024.01.10",
      category: "세차용품",
      media: "/placeholder.svg?height=300&width=600&text=겨울+세차+가이드",
      mediaType: "image",
      imageCount: 8,
      likes: 31,
      comments: 15,
      views: 203,
      thumbnail: "/placeholder.svg?height=300&width=600&text=겨울+세차",
      productId: 3,
      verified: true,
    },
    {
      id: 4,
      title: "차량용 공기청정기 1개월 사용 후기 - 미세먼지 차단 효과는?",
      excerpt:
        "미세먼지가 심한 요즘, 차 안 공기질이 걱정되어 구매한 공기청정기. 1개월 사용해본 솔직한 후기와 함께 필터 교체 과정까지 보여드립니다...",
      author: "clean_air99",
      authorImage: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2024.01.08",
      category: "공기청정기",
      media: "/placeholder.svg?height=300&width=600&text=공기청정기+후기",
      mediaType: "image",
      imageCount: 3,
      likes: 19,
      comments: 6,
      views: 127,
      thumbnail: "/placeholder.svg?height=300&width=600&text=공기청정기",
      productId: 4,
      verified: true,
    },
  ]

  const handleProductClick = (productId: number) => {
    if (typeof window !== "undefined") {
      const productData = products.find((p) => p.id === productId)
      if (productData) {
        sessionStorage.setItem(`product-${productId}`, JSON.stringify(productData))
      }
    }
    router.push(`/products/${productId}`)
  }

  const handleReviewClick = (reviewId: number) => {
    if (typeof window !== "undefined") {
      const reviewData = blogReviews.find((r) => r.id === reviewId)
      if (reviewData) {
        sessionStorage.setItem(`review-${reviewId}`, JSON.stringify(reviewData))
      }
    }
    router.push(`/reviews/${reviewId}`)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const displayedReviews = showMoreReviews ? blogReviews : blogReviews.slice(0, 4)

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Header />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm md:text-base font-medium">🎊 STYLECAR MALL 오픈 기념 특가! 전 상품 최대 50% 할인 🎊</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className={`absolute inset-0 ${heroSlides[currentSlide].bg} transition-all duration-1000`}>
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="relative h-full flex items-center justify-center text-center text-white px-4">
            <div className="max-w-4xl animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{heroSlides[currentSlide].title}</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">{heroSlides[currentSlide].subtitle}</p>
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-200"
                onClick={() => router.push("/categories")}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {heroSlides[currentSlide].cta}
              </Button>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
              <Zap className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="font-semibold">빠른 배송</h3>
                <p className="text-sm text-gray-600">당일 발송, 익일 도착</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
              <Gift className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="font-semibold">무료 배송</h3>
                <p className="text-sm text-gray-600">5만원 이상 구매시</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
              <Star className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-semibold">품질 보장</h3>
                <p className="text-sm text-gray-600">1년 A/S 무상 지원</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">카테고리별 쇼핑</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                id: "all",
                name: "전체",
                count: 156,
                icon: "🛍️",
                color: "bg-gray-100 text-gray-600",
              },
              {
                id: "carmat",
                name: "카매트",
                count: 45,
                icon: "🚗",
                color: "bg-blue-100 text-blue-600",
              },
              {
                id: "cleaning",
                name: "세차용품",
                count: 32,
                icon: "💧",
                color: "bg-cyan-100 text-cyan-600",
              },
              {
                id: "fragrance",
                name: "방향제",
                count: 28,
                icon: "✨",
                color: "bg-purple-100 text-purple-600",
              },
              {
                id: "protection",
                name: "보호필름",
                count: 21,
                icon: "🛡️",
                color: "bg-green-100 text-green-600",
              },
              {
                id: "accessories",
                name: "액세서리",
                count: 12,
                icon: "⭐",
                color: "bg-pink-100 text-pink-600",
              },
            ].map((category) => (
              <Link
                key={category.id}
                href={`/categories?category=${category.id}`}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group transform hover:scale-105"
                prefetch={true}
              >
                <div
                  className={`inline-flex p-4 rounded-full ${category.color} group-hover:scale-110 transition-transform mb-4 text-2xl`}
                >
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{category.count}개</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">🔥 인기 상품 🔥</h2>
            <p className="text-gray-600">고객들이 가장 많이 선택한 프리미엄 자동차용품</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] bg-white"
                onClick={() => handleProductClick(product.id)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={product.id <= 4}
                    />
                    <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">{product.badge}</Badge>
                    {product.isNew && (
                      <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">NEW</Badge>
                    )}
                    {product.isHot && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                        🔥 HOT
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-gray-900">{product.price}원</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}원</span>
                        )}
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      장바구니 담기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/categories" prefetch={true}>
              <Button variant="outline" size="lg" className="transform hover:scale-105 transition-all duration-200">
                전체 상품 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-12 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">⚡ 특가 상품 ⚡</h2>
            <p className="text-gray-600">놓치면 후회하는 한정 특가! 지금 바로 확인하세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={`sale-${product.id}`}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden transform hover:scale-[1.02] bg-white"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-sm font-bold z-10 rounded-br-lg">
                  특가 🔥
                </div>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 animate-pulse">
                      {product.badge}
                    </Badge>
                    {/* 할인율 표시 */}
                    {product.originalPrice && (
                      <div className="absolute bottom-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                        {Math.round(
                          ((Number.parseInt(product.originalPrice.replace(",", "")) -
                            Number.parseInt(product.price.replace(",", ""))) /
                            Number.parseInt(product.originalPrice.replace(",", ""))) *
                            100,
                        )}
                        % 할인
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-red-500">{product.price}원</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}원</span>
                        )}
                      </div>
                    </div>
                    {/* 특가 타이머 (가상) */}
                    <div className="bg-red-100 text-red-700 text-xs p-2 rounded mb-3 text-center">
                      ⏰ 특가 종료까지: 23시간 45분
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all duration-200">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      특가로 구매하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/sale" prefetch={true}>
              <Button
                variant="outline"
                size="lg"
                className="transform hover:scale-105 transition-all duration-200 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                특가 상품 더보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">💬 실제 구매 후기</h2>
            <p className="text-gray-600">고객들의 생생한 사용 후기와 팁을 확인해보세요</p>
          </div>

          <div className="space-y-6">
            {displayedReviews.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.01]"
                onClick={() => handleReviewClick(review.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="relative overflow-hidden rounded-lg">
                        <Image
                          src={review.thumbnail || "/placeholder.svg"}
                          alt={review.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {review.verified && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-green-600 text-white text-xs">구매인증</Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-blue-100 text-blue-600">{review.category}</Badge>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors duration-200 mb-2">
                        {review.title}
                      </h3>

                      <div className="flex items-center mb-3">
                        <Avatar className="w-8 h-8 mr-2">
                          <AvatarImage src={review.authorImage || "/placeholder.svg"} alt={review.author} />
                          <AvatarFallback>{review.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-gray-700 text-sm">{review.author}</span>
                        <span className="text-gray-500 mx-2">•</span>
                        <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>

                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">{review.rating}.0</span>
                      </div>

                      <p className="text-gray-600 line-clamp-3 mb-4">{review.excerpt}</p>

                      <div className="flex items-center justify-between text-gray-500">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            <span>{review.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            <span>{review.comments}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            <span>{review.views}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          자세히 보기 →
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/reviews" prefetch={true}>
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 transform hover:scale-105 transition-all duration-200">
                전체 후기 보러가기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
