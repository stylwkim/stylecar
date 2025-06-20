"use client"

import { useState } from "react"
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  HelpCircle,
  FileText,
  Truck,
  CreditCard,
  Shield,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const contactMethods = [
    {
      icon: Phone,
      title: "전화 상담",
      description: "1588-1234",
      detail: "평일 09:00-18:00 (점심시간 12:00-13:00)",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: MessageCircle,
      title: "카카오톡 상담",
      description: "@스타일카",
      detail: "평일 09:00-18:00 실시간 상담",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: Mail,
      title: "이메일 문의",
      description: "help@stylecar.co.kr",
      detail: "24시간 접수, 평일 24시간 내 답변",
      color: "bg-green-100 text-green-600",
    },
  ]

  const faqCategories = [
    {
      title: "주문/결제",
      icon: CreditCard,
      faqs: [
        {
          question: "주문 취소는 어떻게 하나요?",
          answer:
            "주문 완료 후 배송 준비 전까지 마이페이지에서 직접 취소하실 수 있습니다. 배송 준비 중인 경우 고객센터로 연락 주시기 바랍니다.",
        },
        {
          question: "결제 방법은 어떤 것들이 있나요?",
          answer: "신용카드, 체크카드, 무통장입금, 카카오페이, 네이버페이, 토스페이 등 다양한 결제 방법을 지원합니다.",
        },
        {
          question: "할부 결제가 가능한가요?",
          answer: "신용카드로 결제시 2-12개월 무이자 할부가 가능합니다. 카드사별로 무이자 혜택이 다를 수 있습니다.",
        },
      ],
    },
    {
      title: "배송/교환/환불",
      icon: Truck,
      faqs: [
        {
          question: "배송비는 얼마인가요?",
          answer: "10만원 이상 구매시 무료배송이며, 10만원 미만 구매시 배송비 3,000원이 부과됩니다.",
        },
        {
          question: "교환/환불은 언제까지 가능한가요?",
          answer:
            "상품 수령 후 7일 이내에 교환/환불 신청이 가능합니다. 단, 사용한 상품이나 포장이 훼손된 경우는 제외됩니다.",
        },
        {
          question: "배송 기간은 얼마나 걸리나요?",
          answer: "평일 오후 2시 이전 주문시 당일 발송되며, 일반적으로 1-2일 내 배송됩니다.",
        },
      ],
    },
    {
      title: "상품 정보",
      icon: HelpCircle,
      faqs: [
        {
          question: "카매트 사이즈는 어떻게 확인하나요?",
          answer:
            "차종별 전용 카매트를 제공하며, 상품 페이지에서 차종을 선택하시면 호환 가능한 모델을 확인할 수 있습니다.",
        },
        {
          question: "A/S는 어떻게 받을 수 있나요?",
          answer: "제품 하자나 불량인 경우 구매일로부터 1년간 무상 A/S를 제공합니다. 고객센터로 연락 주시기 바랍니다.",
        },
        {
          question: "설치는 어떻게 하나요?",
          answer:
            "대부분의 상품은 간단한 설치가 가능하며, 상품과 함께 설치 가이드를 제공합니다. 어려운 경우 설치 서비스도 이용 가능합니다.",
        },
      ],
    },
  ]

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">고객센터</h1>
            <p className="text-lg text-gray-600">궁금한 점이 있으시면 언제든 문의해 주세요</p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">문의 방법</h2>
            <p className="text-gray-600">편리한 방법으로 문의해 주세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`inline-flex p-4 rounded-full ${method.color} mb-4`}>
                    <method.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-lg font-medium text-blue-600 mb-2">{method.description}</p>
                  <p className="text-sm text-gray-500">{method.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Operating Hours */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">운영시간</h3>
                  <p className="text-gray-600">평일 09:00 - 18:00 (점심시간 12:00 - 13:00)</p>
                  <p className="text-sm text-gray-500">주말 및 공휴일 휴무</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ and Contact Form */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="faq">자주 묻는 질문</TabsTrigger>
              <TabsTrigger value="contact">1:1 문의</TabsTrigger>
            </TabsList>

            <TabsContent value="faq">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
                <p className="text-gray-600">고객님들이 자주 문의하시는 내용입니다</p>
              </div>

              <div className="space-y-6">
                {faqCategories.map((category, categoryIndex) => (
                  <Card key={categoryIndex}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <category.icon className="w-5 h-5 mr-2 text-blue-600" />
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.faqs.map((faq, faqIndex) => {
                          const globalIndex = categoryIndex * 10 + faqIndex
                          return (
                            <div key={faqIndex} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                              <button
                                onClick={() => toggleFaq(globalIndex)}
                                className="flex justify-between items-center w-full text-left py-2"
                              >
                                <span className="font-medium text-gray-900">{faq.question}</span>
                                {expandedFaq === globalIndex ? (
                                  <ChevronUp className="w-5 h-5 text-gray-500" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                              </button>
                              {expandedFaq === globalIndex && (
                                <div className="mt-2 text-gray-600 leading-relaxed">{faq.answer}</div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contact">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">1:1 문의</h2>
                <p className="text-gray-600">궁금한 점을 남겨주시면 빠르게 답변드리겠습니다</p>
              </div>

              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                        <Input placeholder="이름을 입력해주세요" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
                        <Input placeholder="연락처를 입력해주세요" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                      <Input type="email" placeholder="이메일을 입력해주세요" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">문의 유형 *</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="문의 유형을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">주문/결제</SelectItem>
                          <SelectItem value="delivery">배송</SelectItem>
                          <SelectItem value="exchange">교환/환불</SelectItem>
                          <SelectItem value="product">상품 문의</SelectItem>
                          <SelectItem value="as">A/S</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">제목 *</label>
                      <Input placeholder="문의 제목을 입력해주세요" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">문의 내용 *</label>
                      <Textarea placeholder="문의 내용을 자세히 입력해주세요" rows={6} />
                    </div>

                    <div className="text-sm text-gray-500">
                      <p>* 개인정보 수집 및 이용에 동의합니다.</p>
                      <p>* 문의 답변은 평일 24시간 내에 등록하신 이메일로 발송됩니다.</p>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-2" />
                      문의하기
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">이용약관</h3>
                <p className="text-gray-600 mb-4">서비스 이용약관을 확인하세요</p>
                <Button variant="outline">보기</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">개인정보처리방침</h3>
                <p className="text-gray-600 mb-4">개인정보 보호정책을 확인하세요</p>
                <Button variant="outline">보기</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Truck className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">배송/교환/환불</h3>
                <p className="text-gray-600 mb-4">배송 및 교환환불 정책을 확인하세요</p>
                <Button variant="outline">보기</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
