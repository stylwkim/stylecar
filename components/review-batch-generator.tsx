"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Wand2, FileText, Eye, Trash2, X } from "lucide-react"

interface Review {
  id: string
  title: string
  content: string
  tags: string[]
}

interface ReviewBatchGeneratorProps {
  titles: string[]
  productName: string
  productType: string
  carBrand: string
  textLength: string
  onReviewsGenerated: (reviews: Review[]) => void
}

export default function ReviewBatchGenerator({
  titles,
  productName,
  productType,
  carBrand,
  textLength,
  onReviewsGenerated,
}: ReviewBatchGeneratorProps) {
  const [batchSize, setBatchSize] = useState(5)
  const [maxReviews, setMaxReviews] = useState(25)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReviews, setGeneratedReviews] = useState<Review[]>([])
  const [currentBatch, setCurrentBatch] = useState(0)
  const [progress, setProgress] = useState(0)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)

  const generateBatchReviews = async () => {
    if (titles.length === 0) {
      alert("먼저 제목을 생성해주세요.")
      return
    }

    setIsGenerating(true)
    setProgress(0)
    setCurrentBatch(0)
    const newReviews: Review[] = []

    const totalBatches = Math.ceil(Math.min(maxReviews, titles.length) / batchSize)

    for (let batch = 0; batch < totalBatches; batch++) {
      setCurrentBatch(batch + 1)

      const batchReviews: Review[] = []
      const startIndex = batch * batchSize
      const endIndex = Math.min(startIndex + batchSize, Math.min(maxReviews, titles.length))

      for (let i = startIndex; i < endIndex; i++) {
        const review: Review = {
          id: `review-${Date.now()}-${i}`,
          title: titles[i],
          content: generateReviewContent(titles[i], productName, productType, carBrand, Number.parseInt(textLength)),
          tags: generateReviewTags(titles[i], productType, carBrand),
        }
        batchReviews.push(review)
      }

      newReviews.push(...batchReviews)
      setGeneratedReviews([...newReviews])

      const progressPercent = ((batch + 1) / totalBatches) * 100
      setProgress(progressPercent)

      // 배치 간 딜레이 (실제 AI API 호출 시뮬레이션)
      if (batch < totalBatches - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    onReviewsGenerated(newReviews)
    setIsGenerating(false)
  }

  const generateReviewContent = (title: string, product: string, type: string, brand: string, length: number) => {
    // 간단한 후기 콘텐츠 생성 로직
    const templates = [
      `${title}에 대한 상세한 후기입니다. ${product}을 실제로 사용해본 경험을 바탕으로 작성했습니다.`,
      `${brand} ${type}에 대한 솔직한 리뷰를 공유합니다. 품질과 성능 모든 면에서 만족스러웠습니다.`,
      `${product} 구매를 고민하시는 분들께 도움이 되길 바라며 후기를 작성합니다.`,
      `실제 사용 경험을 바탕으로 한 ${title} 후기입니다. 장단점을 솔직하게 말씀드리겠습니다.`,
      `${type} 중에서도 특히 이 제품을 선택한 이유와 사용 후기를 상세히 알려드립니다.`,
    ]

    let content = templates[Math.floor(Math.random() * templates.length)]

    // 길이에 맞춰 콘텐츠 확장
    while (content.length < length) {
      content += ` 추가적으로 이 제품의 장점은 뛰어난 품질과 합리적인 가격입니다. 사용해보시면 만족하실 것입니다.`
    }

    return content.substring(0, length)
  }

  const generateReviewTags = (title: string, type: string, brand: string) => {
    const baseTags = [type, brand, "후기", "리뷰"]
    const additionalTags = ["추천", "만족", "품질", "가성비", "실사용"]

    return [...baseTags, ...additionalTags.slice(0, 3)]
  }

  const deleteReview = (reviewId: string) => {
    const updatedReviews = generatedReviews.filter((review) => review.id !== reviewId)
    setGeneratedReviews(updatedReviews)
    onReviewsGenerated(updatedReviews)
  }

  return (
    <div className="space-y-6">
      {/* 배치 생성 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            배치 후기 생성
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>배치 크기 (한번에 생성할 개수)</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={batchSize}
                onChange={(e) => setBatchSize(Number.parseInt(e.target.value) || 5)}
              />
            </div>
            <div className="space-y-2">
              <Label>최대 생성 개수</Label>
              <Input
                type="number"
                min="1"
                max="500"
                value={maxReviews}
                onChange={(e) => setMaxReviews(Number.parseInt(e.target.value) || 25)}
              />
            </div>
            <div className="space-y-2">
              <Label>사용 가능한 제목</Label>
              <div className="p-2 bg-gray-50 rounded text-center">
                <Badge variant="outline">{titles.length}개</Badge>
              </div>
            </div>
          </div>

          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>배치 {currentBatch} 생성 중...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          <Button
            onClick={generateBatchReviews}
            disabled={isGenerating || titles.length === 0}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                배치 생성 중... ({currentBatch} 배치)
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                {Math.min(maxReviews, titles.length)}개 후기 배치 생성
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* 생성된 후기 목록 */}
      {generatedReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              생성된 후기 ({generatedReviews.length}개)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
              {generatedReviews.map((review, index) => (
                <Card key={review.id} className="border-2 hover:border-purple-200 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="mb-2">
                        #{index + 1}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => setSelectedReview(review)}>
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteReview(review.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <h4 className="text-sm font-medium line-clamp-2">{review.title}</h4>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-gray-600 line-clamp-3 mb-2">{review.content}</p>
                    <div className="flex flex-wrap gap-1">
                      {review.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {review.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{review.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 후기 상세 보기 모달 */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="flex-1 pr-4">{selectedReview.title}</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setSelectedReview(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>콘텐츠</Label>
                <Textarea value={selectedReview.content} readOnly className="min-h-[200px] mt-2" />
              </div>
              <div>
                <Label>태그</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedReview.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
