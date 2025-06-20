"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleSearchConsole } from "@/lib/google-search-console"
import { UserAnalytics } from "@/lib/user-analytics"

export function AnalyticsDashboard() {
  const [searchData, setSearchData] = useState<any>(null)
  const [performanceData, setPerformanceData] = useState<any>(null)

  useEffect(() => {
    // Google Search Console 데이터 로드
    const gsc = new GoogleSearchConsole()
    gsc.getSearchPerformance("2024-01-01", "2024-12-31").then(setSearchData)

    // 사용자 분석 시작
    const analytics = new UserAnalytics("stylecar-tracking-id")
    analytics.startSessionRecording()

    // 페이지 성능 분석
    const performance = analytics.analyzePagePerformance()
    setPerformanceData(performance)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>검색 노출</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{searchData?.impressions?.toLocaleString() || "로딩중..."}</div>
          <p className="text-xs text-muted-foreground">월간 노출 횟수</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>검색 클릭</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{searchData?.clicks?.toLocaleString() || "로딩중..."}</div>
          <p className="text-xs text-muted-foreground">월간 클릭 수</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>클릭률</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{searchData?.ctr?.toFixed(1) || "0.0"}%</div>
          <p className="text-xs text-muted-foreground">평균 클릭률</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>페이지 속도</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {performanceData?.loadTime ? (performanceData.loadTime / 1000).toFixed(2) + "s" : "측정중..."}
          </div>
          <p className="text-xs text-muted-foreground">평균 로드 시간</p>
        </CardContent>
      </Card>
    </div>
  )
}
