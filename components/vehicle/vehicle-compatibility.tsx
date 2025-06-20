"use client"

import { useState } from "react"
import { Search, Car, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VehicleCompatibilityProps {
  productId: string
  onCompatibilityCheck?: (isCompatible: boolean, vehicle: string) => void
}

export function VehicleCompatibility({ productId, onCompatibilityCheck }: VehicleCompatibilityProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [compatibilityResult, setCompatibilityResult] = useState<{
    isCompatible: boolean
    vehicle: string
    message: string
  } | null>(null)

  // 실제로는 API에서 가져올 데이터
  const vehicleDatabase = [
    { brand: "현대", model: "아반떼", year: "2023", generation: "CN7", compatible: true },
    { brand: "현대", model: "아반떼", year: "2022", generation: "CN7", compatible: true },
    { brand: "현대", model: "아반떼", year: "2021", generation: "CN7", compatible: true },
    { brand: "현대", model: "소나타", year: "2023", generation: "DN8", compatible: true },
    { brand: "현대", model: "소나타", year: "2022", generation: "DN8", compatible: true },
    { brand: "현대", model: "그랜저", year: "2023", generation: "IG", compatible: false },
    { brand: "기아", model: "K5", year: "2023", generation: "DL3", compatible: true },
    { brand: "기아", model: "K5", year: "2022", generation: "DL3", compatible: true },
    { brand: "기아", model: "스포티지", year: "2023", generation: "NQ5", compatible: false },
    { brand: "제네시스", model: "G90", year: "2023", generation: "RG3", compatible: true },
    { brand: "제네시스", model: "GV70", year: "2023", generation: "JK1", compatible: true },
  ]

  const filteredVehicles = vehicleDatabase.filter(
    (vehicle) =>
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.year.includes(searchTerm) ||
      vehicle.generation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleVehicleSelect = (vehicle: any) => {
    const vehicleString = `${vehicle.brand} ${vehicle.model} ${vehicle.year} (${vehicle.generation})`
    setSelectedVehicle(vehicleString)

    const result = {
      isCompatible: vehicle.compatible,
      vehicle: vehicleString,
      message: vehicle.compatible
        ? "✅ 이 제품은 선택하신 차량과 호환됩니다!"
        : "❌ 죄송합니다. 이 제품은 선택하신 차량과 호환되지 않습니다.",
    }

    setCompatibilityResult(result)
    onCompatibilityCheck?.(vehicle.compatible, vehicleString)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="w-5 h-5" />
          차량 호환성 확인
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="차량 모델을 검색하세요 (예: 아반떼 2023)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {searchTerm && (
          <div className="max-h-48 overflow-y-auto space-y-2">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, index) => (
                <div
                  key={index}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">
                      {vehicle.brand} {vehicle.model} {vehicle.year}
                    </p>
                    <p className="text-sm text-gray-500">{vehicle.generation}</p>
                  </div>
                  <Badge variant={vehicle.compatible ? "default" : "destructive"}>
                    {vehicle.compatible ? "호환" : "비호환"}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">검색 결과가 없습니다.</p>
            )}
          </div>
        )}

        {compatibilityResult && (
          <div
            className={`p-4 rounded-lg border ${
              compatibilityResult.isCompatible ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {compatibilityResult.isCompatible ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <X className="w-5 h-5 text-red-600" />
              )}
              <p className="font-medium">{compatibilityResult.vehicle}</p>
            </div>
            <p className={`text-sm ${compatibilityResult.isCompatible ? "text-green-700" : "text-red-700"}`}>
              {compatibilityResult.message}
            </p>
            {!compatibilityResult.isCompatible && (
              <div className="mt-3">
                <Button variant="outline" size="sm">
                  호환 제품 찾기
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500">💡 정확한 호환성 확인을 위해 차량 등록증의 모델명을 확인해주세요.</div>
      </CardContent>
    </Card>
  )
}
