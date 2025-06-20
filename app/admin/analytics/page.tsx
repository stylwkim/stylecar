"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Download, Filter, RefreshCw, ArrowUpRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "@/components/date-range-picker"
import AdminLayout from "@/components/admin-layout"
import { AnalyticsBarChart } from "@/components/analytics/bar-chart"
import { AnalyticsPieChart } from "@/components/analytics/pie-chart"
import { DataTable } from "@/components/analytics/data-table"
import { downloadToExcel } from "@/lib/excel-export"

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  })
  const [trafficData, setTrafficData] = useState<any[]>([])
  const router = useRouter()

  // 실제 구현에서는 API에서 데이터를 가져와야 합니다
  useEffect(() => {
    // 데모 데이터 생성
    const generateDemoData = () => {
      setIsLoading(true)

      // 실제 구현에서는 API 호출로 대체
      setTimeout(() => {
        const sources = [
          "Google",
          "Naver",
          "Daum",
          "Direct",
          "Facebook",
          "Instagram",
          "YouTube",
          "Kakao",
          "Referral",
          "Email",
        ]

        const demoData = Array.from({ length: 100 }, (_, i) => {
          const date = new Date(
            dateRange.from.getTime() + Math.random() * (dateRange.to.getTime() - dateRange.from.getTime()),
          )

          const source = sources[Math.floor(Math.random() * sources.length)]
          const campaign =
            Math.random() > 0.5 ? ["summer_sale", "new_product", "discount_event"][Math.floor(Math.random() * 3)] : null

          const medium =
            source === "Direct"
              ? "direct"
              : ["organic", "cpc", "social", "email", "referral"][Math.floor(Math.random() * 5)]

          // 검색 키워드 추가
          const searchKeywords = [
            "카매트",
            "자동차매트",
            "차량용매트",
            "카본매트",
            "가죽매트",
            "3D매트",
            "입체매트",
            "아반떼 매트",
            "쏘나타 매트",
            "그랜저 매트",
            "투싼 매트",
            "싼타페 매트",
            "BMW 매트",
            "벤츠 매트",
            "아우디 매트",
            "제네시스 매트",
            "트렁크매트",
            "풀세트매트",
            "방수매트",
            "세차용품",
            "차량용품",
            "자동차인테리어",
            "튜닝용품",
            "스타일카",
            "09car",
          ]

          const keyword =
            (source === "Google" || source === "Naver" || source === "Daum") && Math.random() > 0.3
              ? searchKeywords[Math.floor(Math.random() * searchKeywords.length)]
              : null

          const device = ["desktop", "mobile", "tablet"][Math.floor(Math.random() * 3)]
          const landingPage = ["/", "/categories", "/products/1", "/sale"][Math.floor(Math.random() * 4)]
          const conversionValue = Math.random() > 0.7 ? Math.floor(Math.random() * 300000) + 10000 : 0

          return {
            id: i + 1,
            date: date.toISOString().split("T")[0],
            time: date.toTimeString().split(" ")[0],
            source,
            medium,
            campaign,
            device,
            landingPage,
            conversionValue,
            keyword, // 검색 키워드 추가
            ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            userAgent: "Mozilla/5.0 (compatible)",
            referrer: source !== "Direct" ? `https://www.${source.toLowerCase()}.com` : null,
          }
        })

        setTrafficData(demoData)
        setIsLoading(false)
      }, 800)
    }

    generateDemoData()
  }, [dateRange])

  const handleRefresh = () => {
    setIsLoading(true)
    // 실제 구현에서는 API 호출로 데이터를 새로고침
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const handleExport = () => {
    downloadToExcel(trafficData, "traffic-data")
  }

  // 소스별 방문자 수 계산
  const sourceData = trafficData.reduce((acc, item) => {
    const source = item.source
    if (!acc[source]) acc[source] = 0
    acc[source]++
    return acc
  }, {})

  // 매체별 방문자 수 계산
  const mediumData = trafficData.reduce((acc, item) => {
    const medium = item.medium
    if (!acc[medium]) acc[medium] = 0
    acc[medium]++
    return acc
  }, {})

  // 디바이스별 방문자 수 계산
  const deviceData = trafficData.reduce((acc, item) => {
    const device = item.device
    if (!acc[device]) acc[device] = 0
    acc[device]++
    return acc
  }, {})

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">유입 경로 분석</h1>
          <p className="text-gray-500">방문자 유입 경로 및 트래픽 소스를 분석합니다.</p>
        </div>
        <div className="flex items-center gap-4">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            엑셀 다운로드
          </Button>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 방문자 수</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trafficData.length}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20) + 5}% 지난 기간 대비</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전환율</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((trafficData.filter((item) => item.conversionValue > 0).length / trafficData.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10) + 1}% 지난 기간 대비</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 체류 시간</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2분 34초</div>
            <p className="text-xs text-muted-foreground">+12% 지난 기간 대비</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이탈률</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.8%</div>
            <p className="text-xs text-muted-foreground">-3.2% 지난 기간 대비</p>
          </CardContent>
        </Card>
      </div>

      {/* 차트 및 데이터 테이블 */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="sources">유입 소스</TabsTrigger>
          <TabsTrigger value="keywords">검색 키워드</TabsTrigger>
          <TabsTrigger value="campaigns">캠페인</TabsTrigger>
          <TabsTrigger value="raw-data">원본 데이터</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>유입 소스별 방문자</CardTitle>
                <CardDescription>기간 내 유입 소스별 방문자 수</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AnalyticsBarChart data={Object.entries(sourceData).map(([key, value]) => ({ name: key, value }))} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>디바이스 분포</CardTitle>
                <CardDescription>방문자 디바이스 유형</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsPieChart data={Object.entries(deviceData).map(([key, value]) => ({ name: key, value }))} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>매체 분포</CardTitle>
                <CardDescription>유입 매체 유형</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsPieChart data={Object.entries(mediumData).map(([key, value]) => ({ name: key, value }))} />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>랜딩 페이지 분석</CardTitle>
                <CardDescription>가장 많이 방문한 첫 페이지</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsBarChart
                  data={Object.entries(
                    trafficData.reduce((acc, item) => {
                      const page = item.landingPage
                      if (!acc[page]) acc[page] = 0
                      acc[page]++
                      return acc
                    }, {}),
                  ).map(([key, value]) => ({ name: key, value }))}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>유입 소스 상세 분석</CardTitle>
              <CardDescription>각 유입 소스별 방문자 및 전환 데이터</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="소스 검색..." className="max-w-sm" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">소스</th>
                        <th className="py-3 px-4 text-left">방문자 수</th>
                        <th className="py-3 px-4 text-left">전환 수</th>
                        <th className="py-3 px-4 text-left">전환율</th>
                        <th className="py-3 px-4 text-left">매출 기여</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(sourceData).map(([source, count], index) => {
                        const conversions = trafficData.filter(
                          (item) => item.source === source && item.conversionValue > 0,
                        ).length

                        const conversionRate = ((conversions / Number(count)) * 100).toFixed(1)

                        const revenue = trafficData
                          .filter((item) => item.source === source)
                          .reduce((sum, item) => sum + item.conversionValue, 0)
                          .toLocaleString()

                        return (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">{source}</td>
                            <td className="py-3 px-4">{count}</td>
                            <td className="py-3 px-4">{conversions}</td>
                            <td className="py-3 px-4">{conversionRate}%</td>
                            <td className="py-3 px-4">{revenue}원</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>검색 키워드 분석</CardTitle>
              <CardDescription>방문자들이 사용한 검색 키워드 분석</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="키워드 검색..." className="max-w-sm" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">검색 키워드</th>
                        <th className="py-3 px-4 text-left">유입 소스</th>
                        <th className="py-3 px-4 text-left">검색 횟수</th>
                        <th className="py-3 px-4 text-left">전환 수</th>
                        <th className="py-3 px-4 text-left">전환율</th>
                        <th className="py-3 px-4 text-left">매출 기여</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(
                        trafficData
                          .filter((item) => item.keyword)
                          .reduce((acc, item) => {
                            const keyword = item.keyword
                            if (!acc[keyword]) {
                              acc[keyword] = {
                                count: 0,
                                conversions: 0,
                                revenue: 0,
                                sources: new Set(),
                                referrers: new Set(),
                              }
                            }
                            acc[keyword].count++
                            acc[keyword].sources.add(item.source)
                            if (item.referrer) {
                              acc[keyword].referrers.add(item.referrer)
                            }
                            if (item.conversionValue > 0) {
                              acc[keyword].conversions++
                              acc[keyword].revenue += item.conversionValue
                            }
                            return acc
                          }, {}),
                      )
                        .sort(([, a], [, b]) => b.count - a.count)
                        .slice(0, 20)
                        .map(([keyword, data], index) => {
                          const conversionRate = ((data.conversions / data.count) * 100).toFixed(1)
                          const sourcesArray = Array.from(data.sources)
                          const referrersArray = Array.from(data.referrers)

                          return (
                            <tr key={index} className="border-b">
                              <td className="py-3 px-4 font-medium">{keyword}</td>
                              <td className="py-3 px-4">
                                <div className="space-y-1">
                                  <div className="flex flex-wrap gap-1">
                                    {sourcesArray.map((source, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                                      >
                                        {source}
                                      </span>
                                    ))}
                                  </div>
                                  {referrersArray.length > 0 && (
                                    <div
                                      className="text-xs text-gray-500 max-w-xs truncate"
                                      title={referrersArray.join(", ")}
                                    >
                                      {referrersArray[0]}
                                      {referrersArray.length > 1 && ` +${referrersArray.length - 1}개`}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4">{data.count}</td>
                              <td className="py-3 px-4">{data.conversions}</td>
                              <td className="py-3 px-4">{conversionRate}%</td>
                              <td className="py-3 px-4">{data.revenue.toLocaleString()}원</td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>캠페인 성과 분석</CardTitle>
              <CardDescription>마케팅 캠페인별 성과 지표</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="캠페인 유형" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 캠페인</SelectItem>
                      <SelectItem value="summer_sale">여름 세일</SelectItem>
                      <SelectItem value="new_product">신제품 출시</SelectItem>
                      <SelectItem value="discount_event">할인 이벤트</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    필터
                  </Button>
                </div>

                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">캠페인</th>
                        <th className="py-3 px-4 text-left">소스</th>
                        <th className="py-3 px-4 text-left">방문자 수</th>
                        <th className="py-3 px-4 text-left">전환율</th>
                        <th className="py-3 px-4 text-left">매출</th>
                        <th className="py-3 px-4 text-left">ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["summer_sale", "new_product", "discount_event"].map((campaign, index) => {
                        const visits = trafficData.filter((item) => item.campaign === campaign).length
                        const conversions = trafficData.filter(
                          (item) => item.campaign === campaign && item.conversionValue > 0,
                        ).length

                        const conversionRate = visits > 0 ? ((conversions / visits) * 100).toFixed(1) : "0.0"

                        const revenue = trafficData
                          .filter((item) => item.campaign === campaign)
                          .reduce((sum, item) => sum + item.conversionValue, 0)

                        // 가상의 캠페인 비용
                        const cost = {
                          summer_sale: 2000000,
                          new_product: 1500000,
                          discount_event: 1000000,
                        }[campaign]

                        const roi = revenue > 0 ? (((revenue - cost) / cost) * 100).toFixed(1) : "0.0"

                        return (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">
                              {
                                {
                                  summer_sale: "여름 세일",
                                  new_product: "신제품 출시",
                                  discount_event: "할인 이벤트",
                                }[campaign]
                              }
                            </td>
                            <td className="py-3 px-4">다양한 소스</td>
                            <td className="py-3 px-4">{visits}</td>
                            <td className="py-3 px-4">{conversionRate}%</td>
                            <td className="py-3 px-4">{revenue.toLocaleString()}원</td>
                            <td
                              className="py-3 px-4"
                              className={`py-3 px-4 ${Number(roi) >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {roi}%
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="raw-data">
          <Card>
            <CardHeader>
              <CardTitle>원본 방문 데이터</CardTitle>
              <CardDescription>모든 방문 기록 원본 데이터</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable data={trafficData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}
