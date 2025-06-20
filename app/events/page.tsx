"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Gift, Users, Star, ChevronRight, Tag, Percent } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  const ongoingEvents = [
    {
      id: 1,
      title: "🎉 신규회원 첫 구매 30% 할인",
      description: "회원가입 후 첫 구매시 최대 30% 할인 혜택을 받으세요!",
      image: "/placeholder.svg?height=300&width=500",
      startDate: "2024.01.01",
      endDate: "2024.02.29",
      discount: "30%",
      category: "신규혜택",
      participants: 1250,
      maxParticipants: 5000,
      status: "진행중",
      conditions: ["신규 회원 가입 후 7일 이내", "최소 주문금액 50,000원 이상", "일부 상품 제외"],
      benefits: ["최대 30% 할인", "무료배송", "적립금 5,000원 추가 지급"],
    },
    {
      id: 2,
      title: "🚚 10만원 이상 구매시 무료배송",
      description: "전국 어디든 무료배송 + 당일발송 서비스",
      image: "/placeholder.svg?height=300&width=500",
      startDate: "2024.01.01",
      endDate: "상시진행",
      discount: "무료배송",
      category: "배송혜택",
      participants: 8900,
      maxParticipants: null,
      status: "상시진행",
      conditions: ["주문금액 100,000원 이상", "제주/도서산간 지역 제외", "평일 오후 2시 이전 주문시 당일발송"],
      benefits: ["전국 무료배송", "당일발송 서비스", "배송 추적 서비스"],
    },
    {
      id: 3,
      title: "⭐ 리뷰 작성시 적립금 5,000원",
      description: "구매 후 리뷰 작성시 적립금을 지급해드립니다",
      image: "/placeholder.svg?height=300&width=500",
      startDate: "2024.01.01",
      endDate: "2024.03.31",
      discount: "5,000원",
      category: "적립혜택",
      participants: 3400,
      maxParticipants: 10000,
      status: "진행중",
      conditions: ["상품 구매 후 리뷰 작성", "사진 포함 리뷰 필수", "최소 50자 이상 작성"],
      benefits: ["적립금 5,000원 지급", "베스트 리뷰 선정시 추가 혜택", "리뷰 랭킹 시스템 참여"],
    },
    {
      id: 4,
      title: "🔥 겨울 특가 세일",
      description: "겨울 필수 자동차용품 최대 50% 할인",
      image: "/placeholder.svg?height=300&width=500",
      startDate: "2024.01.15",
      endDate: "2024.02.15",
      discount: "최대 50%",
      category: "시즌특가",
      participants: 2100,
      maxParticipants: 3000,
      status: "진행중",
      conditions: ["겨울용품 카테고리 상품만 해당", "중복할인 불가", "재고 소진시 조기 종료"],
      benefits: ["최대 50% 할인", "무료배송", "겨울용품 구매가이드 제공"],
    },
  ]

  const endedEvents = [
    {
      id: 5,
      title: "🎄 크리스마스 특별 이벤트",
      description: "크리스마스 기념 특가 할인 및 선물 증정",
      image: "/placeholder.svg?height=300&width=500",
      startDate: "2023.12.01",
      endDate: "2023.12.25",
      discount: "25%",
      category: "시즌특가",
      participants: 4500,
      maxParticipants: 5000,
      status: "종료",
    },
    {
      id: 6,
      title: "🛍️ 블랙프라이데이 메가세일",
      description: "1년 중 최대 할인 혜택",
      image: "/placeholder.svg?height=300&width=500",
      startDate: "2023.11.24",
      endDate: "2023.11.27",
      discount: "최대 70%",
      category: "메가세일",
      participants: 12000,
      maxParticipants: 15000,
      status: "종료",
    },
  ]

  const specialOffers = [
    {
      title: "친구 추천 이벤트",
      description: "친구를 추천하고 서로 혜택을 받으세요",
      icon: Users,
      reward: "각각 10,000원 적립금",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "생일 축하 쿠폰",
      description: "생일월에 특별한 할인 쿠폰을 드려요",
      icon: Gift,
      reward: "20% 할인 쿠폰",
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "VIP 등급 혜택",
      description: "누적 구매금액에 따른 등급별 혜택",
      icon: Star,
      reward: "최대 15% 추가 할인",
      color: "bg-yellow-100 text-yellow-600",
    },
  ]

  const handleEventParticipation = (eventId: number) => {
    alert(`이벤트 ${eventId}에 참여하였습니다!`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🎉 이벤트 & 혜택</h1>
          <p className="text-xl md:text-2xl mb-8">다양한 이벤트와 특별 혜택을 놓치지 마세요!</p>
          <div className="flex justify-center space-x-8 text-sm">
            <div>
              <div className="text-2xl font-bold">{ongoingEvents.length}</div>
              <div>진행중인 이벤트</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {ongoingEvents.reduce((sum, event) => sum + event.participants, 0).toLocaleString()}
              </div>
              <div>총 참여자 수</div>
            </div>
            <div>
              <div className="text-2xl font-bold">최대 50%</div>
              <div>할인 혜택</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="ongoing" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="ongoing">진행중</TabsTrigger>
              <TabsTrigger value="ended">종료된 이벤트</TabsTrigger>
              <TabsTrigger value="special">특별 혜택</TabsTrigger>
            </TabsList>

            <TabsContent value="ongoing">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">🔥 진행중인 이벤트</h2>
                <p className="text-gray-600">지금 참여할 수 있는 다양한 이벤트와 혜택</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {ongoingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                  >
                    <div className="relative">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-500 hover:bg-red-600">{event.category}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge
                          className={`${
                            event.status === "진행중"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                        {event.discount} 할인
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>
                            {event.startDate} ~ {event.endDate}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{event.participants.toLocaleString()}명 참여</span>
                        </div>
                      </div>

                      {event.maxParticipants && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>참여 현황</span>
                            <span>
                              {event.participants} / {event.maxParticipants}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {selectedEvent === event.id && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">참여 조건</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {event.conditions.map((condition, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    {condition}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">혜택 내용</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {event.benefits.map((benefit, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEventParticipation(event.id)
                          }}
                        >
                          이벤트 참여하기
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedEvent(selectedEvent === event.id ? null : event.id)
                          }}
                        >
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${selectedEvent === event.id ? "rotate-90" : ""}`}
                          />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ended">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">📋 종료된 이벤트</h2>
                <p className="text-gray-600">지난 이벤트들을 확인해보세요</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {endedEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden opacity-75">
                    <div className="relative">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover grayscale"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{event.category}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">종료</Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                        {event.discount} 할인
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>
                            {event.startDate} ~ {event.endDate}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{event.participants.toLocaleString()}명 참여</span>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full" disabled>
                        이벤트 종료
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="special">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">🎁 특별 혜택</h2>
                <p className="text-gray-600">회원님만을 위한 특별한 혜택들</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {specialOffers.map((offer, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`inline-flex p-4 rounded-full ${offer.color} mb-4`}>
                        <offer.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{offer.title}</h3>
                      <p className="text-gray-600 mb-4">{offer.description}</p>
                      <div className="text-lg font-bold text-blue-600 mb-4">{offer.reward}</div>
                      <Button className="w-full">자세히 보기</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 등급별 혜택 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">🏆 회원 등급별 혜택</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { grade: "일반", requirement: "가입시", discount: "0%", color: "bg-gray-100" },
                      { grade: "브론즈", requirement: "10만원 이상", discount: "3%", color: "bg-orange-100" },
                      { grade: "실버", requirement: "50만원 이상", discount: "5%", color: "bg-gray-200" },
                      { grade: "골드", requirement: "100만원 이상", discount: "7%", color: "bg-yellow-100" },
                    ].map((tier, index) => (
                      <div key={index} className={`p-4 rounded-lg text-center ${tier.color}`}>
                        <div className="text-lg font-bold mb-2">{tier.grade}</div>
                        <div className="text-sm text-gray-600 mb-2">{tier.requirement}</div>
                        <div className="text-xl font-bold text-blue-600">{tier.discount} 할인</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">🎯 놓치면 후회하는 특가!</h2>
          <p className="text-lg mb-6">지금 바로 참여하고 최대 50% 할인 혜택을 받으세요</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
              <Tag className="w-5 h-5 mr-2" />
              전체 상품 보기
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500"
            >
              <Percent className="w-5 h-5 mr-2" />
              할인 상품 보기
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
