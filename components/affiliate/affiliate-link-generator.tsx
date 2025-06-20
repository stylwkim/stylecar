"use client"

import { useState } from "react"
import { Copy, Check, Link, Users, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AffiliateLinkGenerator() {
  const [affiliateCode, setAffiliateCode] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [copied, setCopied] = useState(false)

  const generateLink = () => {
    if (affiliateCode) {
      const baseUrl = "https://stylecar.co.kr"
      const link = `${baseUrl}?ref=${affiliateCode}&utm_source=affiliate&utm_medium=referral&utm_campaign=partner`
      setGeneratedLink(link)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const affiliateStats = {
    totalClicks: 1250,
    conversions: 89,
    conversionRate: 7.1,
    totalEarnings: 450000,
    pendingPayment: 125000,
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">제휴 마케팅 센터</h1>
        <p className="text-gray-600">인플루언서와 블로거를 위한 제휴 링크 생성 및 관리</p>
      </div>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generator">링크 생성</TabsTrigger>
          <TabsTrigger value="stats">통계</TabsTrigger>
          <TabsTrigger value="rewards">리워드</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                제휴 링크 생성기
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="affiliate-code" className="block text-sm font-medium text-gray-700">
                  제휴 코드
                </label>
                <Input
                  id="affiliate-code"
                  placeholder="예: BLOGGER123"
                  value={affiliateCode}
                  onChange={(e) => setAffiliateCode(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  고유한 제휴 코드를 입력하세요. 이 코드로 추천 실적을 추적합니다.
                </p>
              </div>

              <Button onClick={generateLink} disabled={!affiliateCode} className="w-full">
                링크 생성하기
              </Button>

              {generatedLink && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">생성된 제휴 링크</label>
                  <div className="flex gap-2">
                    <Input value={generatedLink} readOnly className="flex-1" />
                    <Button variant="outline" size="icon" onClick={copyToClipboard}>
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  {copied && <p className="text-sm text-green-600">✅ 링크가 복사되었습니다!</p>}
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">💰 수수료 안내</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 일반 상품: 판매가의 5%</li>
                  <li>• 프리미엄 상품: 판매가의 7%</li>
                  <li>• 신규 고객 추천: 추가 2% 보너스</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{affiliateStats.totalClicks.toLocaleString()}</div>
                <div className="text-sm text-gray-600">총 클릭 수</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{affiliateStats.conversions}</div>
                <div className="text-sm text-gray-600">전환 수</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{affiliateStats.conversionRate}%</div>
                <div className="text-sm text-gray-600">전환율</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  ₩{affiliateStats.totalEarnings.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">총 수익</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>최근 실적</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "2024.01.15", product: "프리미엄 카매트", commission: 9450, status: "지급완료" },
                  { date: "2024.01.14", product: "차량용 청소기", commission: 4450, status: "지급완료" },
                  { date: "2024.01.13", product: "세차 키트", commission: 7250, status: "지급대기" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.product}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₩{item.commission.toLocaleString()}</p>
                      <Badge variant={item.status === "지급완료" ? "default" : "secondary"}>{item.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                리워드 프로그램
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">🎁 추천 리워드</h3>
                <p className="text-sm text-purple-800 mb-3">친구를 추천하고 포인트를 받으세요!</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">5,000P</div>
                    <div className="text-xs text-gray-600">추천인 혜택</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-lg font-bold text-pink-600">3,000P</div>
                    <div className="text-xs text-gray-600">신규 가입자 혜택</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">등급별 혜택</h4>
                {[
                  { level: "브론즈", requirement: "월 10만원 이상", commission: "5%", bonus: "생일 쿠폰" },
                  { level: "실버", requirement: "월 50만원 이상", commission: "7%", bonus: "무료 샘플" },
                  { level: "골드", requirement: "월 100만원 이상", commission: "10%", bonus: "전용 상담사" },
                ].map((tier, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Badge variant={index === 0 ? "secondary" : index === 1 ? "default" : "destructive"}>
                        {tier.level}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{tier.requirement}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">수수료 {tier.commission}</p>
                      <p className="text-sm text-gray-500">{tier.bonus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">현재 보유 포인트</span>
              </div>
              <div className="text-2xl font-bold text-green-700 mb-2">
                {affiliateStats.pendingPayment.toLocaleString()}P
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                포인트 사용하기
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
