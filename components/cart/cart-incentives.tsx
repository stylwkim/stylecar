"use client"

import { useState, useEffect } from "react"
import { Truck, Clock, Gift, Percent } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface CartIncentivesProps {
  currentTotal: number
  freeShippingThreshold?: number
}

export function CartIncentives({ currentTotal, freeShippingThreshold = 100000 }: CartIncentivesProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - currentTotal)
  const progressPercentage = Math.min(100, (currentTotal / freeShippingThreshold) * 100)

  return (
    <div className="space-y-4">
      {/* 무료배송 프로그레스 바 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Truck className="w-5 h-5 text-green-600" />
            <span className="font-medium">무료배송까지</span>
          </div>

          <Progress value={progressPercentage} className="mb-2" />

          {remainingForFreeShipping > 0 ? (
            <p className="text-sm text-gray-600">
              <span className="font-medium text-green-600">{remainingForFreeShipping.toLocaleString()}원</span> 더
              구매하시면 무료배송!
            </p>
          ) : (
            <p className="text-sm text-green-600 font-medium">🎉 무료배송 혜택을 받으실 수 있습니다!</p>
          )}
        </CardContent>
      </Card>

      {/* 할인 타이머 */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-orange-800">⚡ 한정 특가</span>
            <Badge variant="destructive" className="text-xs">
              {timeLeft.hours.toString().padStart(2, "0")}:{timeLeft.minutes.toString().padStart(2, "0")}:
              {timeLeft.seconds.toString().padStart(2, "0")}
            </Badge>
          </div>
          <p className="text-sm text-orange-700">
            지금 결제하시면 <span className="font-bold">추가 10% 할인</span> 혜택!
          </p>
        </CardContent>
      </Card>

      {/* 추천 상품 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-purple-600" />
            <span className="font-medium">함께 구매한 상품</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-12 h-12 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">차량용 무선 청소기</p>
                <p className="text-xs text-gray-500">89,000원</p>
              </div>
              <Badge variant="outline" className="text-xs">
                <Percent className="w-3 h-3 mr-1" />
                15% 할인
              </Badge>
            </div>

            <div className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-12 h-12 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">프리미엄 세차 키트</p>
                <p className="text-xs text-gray-500">145,000원</p>
              </div>
              <Badge variant="outline" className="text-xs">
                <Percent className="w-3 h-3 mr-1" />
                20% 할인
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 첫 구매 쿠폰 */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">🎁 신규 고객 혜택</span>
          </div>
          <p className="text-sm text-blue-700 mb-2">
            첫 구매 고객님께 <span className="font-bold">5,000원 쿠폰</span> 증정!
          </p>
          <Badge variant="secondary" className="text-xs">
            자동 적용됨
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
