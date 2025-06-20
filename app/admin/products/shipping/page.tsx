"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Search, Save, RefreshCw, Truck, Package, AlertCircle, CheckCircle } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

interface ProductShipping {
  id: string
  name: string
  category: string
  image: string
  useCustomShipping: boolean
  shippingFee: number
  freeShippingThreshold: number
  expressShippingFee: number
  shippingType: "standard" | "heavy" | "fragile" | "express"
  shippingNote: string
}

export default function ProductShippingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<ProductShipping[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [shippingFilter, setShippingFilter] = useState("all")

  // 데모 데이터 생성
  useEffect(() => {
    const generateDemoProducts = () => {
      setIsLoading(true)

      const categories = ["카매트", "세차용품", "차량용품", "인테리어", "익스테리어", "전자기기"]
      const shippingTypes = ["standard", "heavy", "fragile", "express"] as const

      const demoProducts: ProductShipping[] = Array.from({ length: 30 }, (_, i) => {
        const id = `PROD-${String(i + 1).padStart(3, "0")}`
        const category = categories[Math.floor(Math.random() * categories.length)]
        const shippingType = shippingTypes[Math.floor(Math.random() * shippingTypes.length)]
        const useCustomShipping = Math.random() > 0.6

        return {
          id,
          name: `${category} ${["프리미엄", "스탠다드", "베이직"][Math.floor(Math.random() * 3)]} ${
            ["A", "B", "C", "S", "X", "Pro", "Plus"][Math.floor(Math.random() * 7)]
          }`,
          category,
          image: `/placeholder.svg?height=60&width=60&text=${encodeURIComponent(category)}`,
          useCustomShipping,
          shippingFee: useCustomShipping ? Math.floor(Math.random() * 8000) + 2000 : 3000,
          freeShippingThreshold: useCustomShipping ? Math.floor(Math.random() * 50000) + 50000 : 100000,
          expressShippingFee: useCustomShipping ? Math.floor(Math.random() * 5000) + 5000 : 5000,
          shippingType,
          shippingNote:
            shippingType === "heavy"
              ? "대형상품 - 별도 배송"
              : shippingType === "fragile"
                ? "파손주의 - 안전포장"
                : shippingType === "express"
                  ? "당일배송 가능"
                  : "",
        }
      })

      setTimeout(() => {
        setProducts(demoProducts)
        setIsLoading(false)
      }, 800)
    }

    generateDemoProducts()
  }, [])

  const handleToggleCustomShipping = (productId: string, enabled: boolean) => {
    setProducts(
      products.map((product) => (product.id === productId ? { ...product, useCustomShipping: enabled } : product)),
    )
  }

  const handleUpdateShipping = (productId: string, field: string, value: any) => {
    setProducts(products.map((product) => (product.id === productId ? { ...product, [field]: value } : product)))
  }

  const handleSaveAll = async () => {
    setIsLoading(true)
    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setIsLoading(false)
      alert("모든 배송 설정이 저장되었습니다.")
    }, 1000)
  }

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((product) => (categoryFilter === "all" ? true : product.category === categoryFilter))
    .filter((product) => {
      if (shippingFilter === "all") return true
      if (shippingFilter === "custom") return product.useCustomShipping
      if (shippingFilter === "default") return !product.useCustomShipping
      return product.shippingType === shippingFilter
    })

  const getShippingTypeColor = (type: string) => {
    switch (type) {
      case "standard":
        return "bg-blue-100 text-blue-800"
      case "heavy":
        return "bg-orange-100 text-orange-800"
      case "fragile":
        return "bg-red-100 text-red-800"
      case "express":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getShippingTypeName = (type: string) => {
    switch (type) {
      case "standard":
        return "일반배송"
      case "heavy":
        return "대형배송"
      case "fragile":
        return "안전배송"
      case "express":
        return "특급배송"
      default:
        return "일반배송"
    }
  }

  const uniqueCategories = ["all", ...new Set(products.map((product) => product.category))]

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">제품별 배송비 관리</h1>
          <p className="text-gray-500">각 상품별로 개별 배송비를 설정할 수 있습니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSaveAll} disabled={isLoading}>
            {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            전체 저장
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">전체 상품</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">개별 배송비 설정</p>
                <p className="text-2xl font-bold">{products.filter((p) => p.useCustomShipping).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">기본 배송비 사용</p>
                <p className="text-2xl font-bold">{products.filter((p) => !p.useCustomShipping).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">특수 배송</p>
                <p className="text-2xl font-bold">
                  {products.filter((p) => p.shippingType === "heavy" || p.shippingType === "fragile").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 필터 및 검색 */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="상품명 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 카테고리</SelectItem>
                {uniqueCategories
                  .filter((cat) => cat !== "all")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select value={shippingFilter} onValueChange={setShippingFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="배송 설정" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="custom">개별 설정</SelectItem>
                <SelectItem value="default">기본 설정</SelectItem>
                <SelectItem value="standard">일반배송</SelectItem>
                <SelectItem value="heavy">대형배송</SelectItem>
                <SelectItem value="fragile">안전배송</SelectItem>
                <SelectItem value="express">특급배송</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                    <div className="w-32 h-8 bg-gray-200 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))
          : filteredProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-contain bg-gray-50 rounded"
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{product.category}</Badge>
                            <Badge className={getShippingTypeColor(product.shippingType)}>
                              {getShippingTypeName(product.shippingType)}
                            </Badge>
                            <span className="text-sm text-gray-500">{product.id}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`custom-${product.id}`} className="text-sm">
                            개별 배송비 설정
                          </Label>
                          <Switch
                            id={`custom-${product.id}`}
                            checked={product.useCustomShipping}
                            onCheckedChange={(checked) => handleToggleCustomShipping(product.id, checked)}
                          />
                        </div>
                      </div>

                      {product.useCustomShipping ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 p-4 bg-blue-50 rounded-lg">
                          <div>
                            <Label className="text-sm">배송비 (원)</Label>
                            <Input
                              type="number"
                              value={product.shippingFee}
                              onChange={(e) => handleUpdateShipping(product.id, "shippingFee", Number(e.target.value))}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">무료배송 기준 (원)</Label>
                            <Input
                              type="number"
                              value={product.freeShippingThreshold}
                              onChange={(e) =>
                                handleUpdateShipping(product.id, "freeShippingThreshold", Number(e.target.value))
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">특급배송비 (원)</Label>
                            <Input
                              type="number"
                              value={product.expressShippingFee}
                              onChange={(e) =>
                                handleUpdateShipping(product.id, "expressShippingFee", Number(e.target.value))
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">배송 유형</Label>
                            <Select
                              value={product.shippingType}
                              onValueChange={(value) => handleUpdateShipping(product.id, "shippingType", value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">일반배송</SelectItem>
                                <SelectItem value="heavy">대형배송</SelectItem>
                                <SelectItem value="fragile">안전배송</SelectItem>
                                <SelectItem value="express">특급배송</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {product.shippingNote && (
                            <div className="md:col-span-4">
                              <Label className="text-sm">배송 안내</Label>
                              <Input
                                value={product.shippingNote}
                                onChange={(e) => handleUpdateShipping(product.id, "shippingNote", e.target.value)}
                                placeholder="배송 관련 특이사항"
                                className="mt-1"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <Truck className="inline w-4 h-4 mr-1" />
                            기본 배송비 설정을 사용합니다 (배송비: 3,000원, 무료배송: 100,000원 이상)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </AdminLayout>
  )
}
