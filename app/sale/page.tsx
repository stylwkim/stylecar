"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Clock, Percent, Gift, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SalePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  const saleProducts = [
    {
      id: 1,
      name: "프리미엄 3D 카매트 풀세트",
      price: "189,000",
      originalPrice: "270,000",
      discount: 30,
      rating: 4.8,
      reviews: 324,
      image: "/placeholder.svg?height=300&width=300",
      badge: "타임세일",
      category: "카매트",
      timeLeft: "12시간",
      soldCount: 156,
      stock: 44,
    },
    {
      id: 2,
      name: "무선 차량용 청소기 세트",
      price: "89,000",
      originalPrice: "120,000",
      discount: 26,
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      badge: "특가",
      category: "청소용품",
      timeLeft: "6시간",
      soldCount: 89,
      stock: 21,
    },
    {
      id: 3,
      name: "프리미엄 세차 케어 키트",
      price: "145,000",
      originalPrice: "180,000",
      discount: 19,
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      badge: "한정특가",
      category: "세차용품",
      timeLeft: "18시간",
      soldCount: 67,
      stock: 33,
    },
    {
      id: 4,
      name: "차량용 공기청정기",
      price: "65,000",
      originalPrice: "85,000",
      discount: 24,
      rating: 4.7,
      reviews: 203,
      image: "/placeholder.svg?height=300&width=300",
      badge: "깜짝세일",
      category: "액세서리",
      timeLeft: "3시간",
      soldCount: 234,
      stock: 16,
    },
  ]

  const events = [
    {
      title: "신규회원 첫 구매 30% 할인",
      description: "회원가입 후 첫 구매시 최대 30% 할인 혜택",
      image: "/placeholder.svg?height=200&width=400",
      badge: "신규혜택",
      endDate: "2024.02.29",
    },
    {
      title: "10만원 이상 구매시 무료배송",
      description: "전국 어디든 무료배송 + 당일발송",
      image: "/placeholder.svg?height=200&width=400",
      badge: "무료배송",
      endDate: "상시진행",
    },
    {
      title: "리뷰 작성시 적립금 5,000원",
      description: "구매 후 리뷰 작성시 적립금 지급",
      image: "/placeholder.svg?height=200&width=400",
      badge: "적립혜택",
      endDate: "2024.03.31",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">🔥 특가 할인</h1>
          <p className="text-xl md:text-2xl mb-8">최대 50% 할인! 놓치면 후회하는 특가 상품들</p>

          {/* Countdown Timer */}
          <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">⏰ 타임세일 종료까지</h3>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="bg-white text-red-500 rounded-lg p-3 font-bold text-2xl">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
                <p className="text-sm mt-1">시간</p>
              </div>
              <div className="text-center">
                <div className="bg-white text-red-500 rounded-lg p-3 font-bold text-2xl">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
                <p className="text-sm mt-1">분</p>
              </div>
              <div className="text-center">
                <div className="bg-white text-red-500 rounded-lg p-3 font-bold text-2xl">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
                <p className="text-sm mt-1">초</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="flash" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="flash" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                타임세일
              </TabsTrigger>
              <TabsTrigger value="discount" className="flex items-center gap-2">
                <Percent className="w-4 h-4" />
                할인상품
              </TabsTrigger>
              <TabsTrigger value="event" className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                이벤트
              </TabsTrigger>
              <TabsTrigger value="free-shipping" className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                무료배송
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flash">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">⚡ 타임세일</h2>
                <p className="text-gray-600">시간 한정! 놓치면 다시 없는 특가</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {saleProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-sm font-bold z-10">
                      -{product.discount}%
                    </div>
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">{product.badge}</Badge>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          ⏰ {product.timeLeft} 남음
                        </div>
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
                        <div className="mb-3">
                          <span className="text-xl font-bold text-red-500">{product.price}원</span>
                          <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}원</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>{product.soldCount}개 판매</span>
                            <span>{product.stock}개 남음</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${(product.soldCount / (product.soldCount + product.stock)) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <Button className="w-full bg-red-600 hover:bg-red-700">지금 구매하기</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discount">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">💰 할인 상품</h2>
                <p className="text-gray-600">최대 50% 할인된 인기 상품들</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {saleProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
                          {product.discount}% 할인
                        </Badge>
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
                            <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}원</span>
                          </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">장바구니 담기</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="event">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">🎁 진행중인 이벤트</h2>
                <p className="text-gray-600">다양한 혜택과 이벤트를 놓치지 마세요</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 left-2 bg-purple-500 hover:bg-purple-600">{event.badge}</Badge>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">종료: {event.endDate}</span>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            자세히 보기
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="free-shipping">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">🚚 무료배송 상품</h2>
                <p className="text-gray-600">배송비 걱정 없이 편리하게 쇼핑하세요</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {saleProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">무료배송</Badge>
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
                            <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}원</span>
                          </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">장바구니 담기</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
