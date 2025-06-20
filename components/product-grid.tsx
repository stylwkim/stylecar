"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Grid3X3, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import OptimizedProductCard from "./optimized-product-card"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  rating: number
  reviews: number
  image: string
  badge: string
  category: string
  brand: string
  isNew: boolean
}

interface ProductGridProps {
  products: readonly Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const router = useRouter()

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`)
  }

  return (
    <>
      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            필터
          </Button>
          <Select defaultValue="popular">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">인기순</SelectItem>
              <SelectItem value="newest">최신순</SelectItem>
              <SelectItem value="price-low">낮은 가격순</SelectItem>
              <SelectItem value="price-high">높은 가격순</SelectItem>
              <SelectItem value="rating">평점순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}
      >
        {products.map((product) => (
          <OptimizedProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </div>
    </>
  )
}
