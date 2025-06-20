"use client"

import { useState } from "react"
import { Play, FileText, Download, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DIYGuideProps {
  productName: string
  category: string
}

export function DIYGuide({ productName, category }: DIYGuideProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  // 실제로는 API에서 가져올 데이터
  const diyGuides = {
    videos: [
      {
        id: "1",
        title: `${productName} 설치 가이드`,
        description: "전문가가 알려주는 정확한 설치 방법",
        duration: "8:32",
        difficulty: "쉬움",
        views: 12500,
        rating: 4.8,
        thumbnail: "/placeholder.svg?height=180&width=320",
        videoUrl: "https://example.com/video1.mp4",
      },
      {
        id: "2",
        title: "카매트 관리 및 청소 방법",
        description: "오래 사용하기 위한 관리 팁",
        duration: "5:15",
        difficulty: "쉬움",
        views: 8900,
        rating: 4.6,
        thumbnail: "/placeholder.svg?height=180&width=320",
        videoUrl: "https://example.com/video2.mp4",
      },
      {
        id: "3",
        title: "차종별 맞춤 설치 주의사항",
        description: "차량 모델에 따른 설치 포인트",
        duration: "12:45",
        difficulty: "보통",
        views: 6700,
        rating: 4.9,
        thumbnail: "/placeholder.svg?height=180&width=320",
        videoUrl: "https://example.com/video3.mp4",
      },
    ],
    documents: [
      {
        id: "1",
        title: "설치 매뉴얼 PDF",
        description: "상세한 설치 가이드 문서",
        fileSize: "2.3MB",
        downloadUrl: "/guides/installation-manual.pdf",
      },
      {
        id: "2",
        title: "관리 가이드",
        description: "제품 관리 및 A/S 정보",
        fileSize: "1.8MB",
        downloadUrl: "/guides/maintenance-guide.pdf",
      },
    ],
    tips: [
      "설치 전 차량 바닥을 깨끗하게 청소해주세요",
      "제품의 앞뒤 방향을 확인한 후 설치하세요",
      "고정 클립은 차량 손상을 방지하기 위해 적당한 힘으로 체결하세요",
      "설치 후 운전석에서 페달 작동에 방해가 없는지 확인하세요",
    ],
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔧 DIY 설치 가이드</h2>
        <p className="text-gray-600">전문가의 도움 없이도 쉽게 설치할 수 있습니다</p>
      </div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="videos">설치 영상</TabsTrigger>
          <TabsTrigger value="documents">매뉴얼</TabsTrigger>
          <TabsTrigger value="tips">설치 팁</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {diyGuides.videos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100"
                      onClick={() => setSelectedVideo(video.videoUrl)}
                    >
                      <Play className="w-6 h-6 mr-2" />
                      재생
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black bg-opacity-70">{video.duration}</Badge>
                  <Badge
                    className={`absolute top-2 left-2 ${
                      video.difficulty === "쉬움"
                        ? "bg-green-500"
                        : video.difficulty === "보통"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {video.difficulty}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{video.rating}</span>
                    </div>
                    <span>{video.views.toLocaleString()} 조회</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diyGuides.documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{doc.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{doc.fileSize}</span>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          다운로드
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">💡 설치 전 꼭 확인하세요!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {diyGuides.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">예상 설치 시간</span>
              </div>
              <p className="text-sm text-yellow-700">
                약 <span className="font-bold">15-20분</span> 소요 (초보자 기준)
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 비디오 모달 */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">설치 가이드 영상</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedVideo(null)}>
                ✕
              </Button>
            </div>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-white">영상 플레이어 (실제 구현 시 video 태그 사용)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
