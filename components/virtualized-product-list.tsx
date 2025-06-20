"use client"

import type React from "react"

import { memo, useMemo } from "react"
import { FixedSizeList as List } from "react-window"
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

interface VirtualizedProductListProps {
  products: Product[]
  viewMode: "grid" | "list"
  onProductClick: (productId: number) => void
}

const VirtualizedProductList = memo(({ products, viewMode, onProductClick }: VirtualizedProductListProps) => {
  const itemHeight = viewMode === "grid" ? 400 : 200
  const itemsPerRow = viewMode === "grid" ? 4 : 1

  const rows = useMemo(() => {
    const result = []
    for (let i = 0; i < products.length; i += itemsPerRow) {
      result.push(products.slice(i, i + itemsPerRow))
    }
    return result
  }, [products, itemsPerRow])

  const Row = memo(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const rowProducts = rows[index]

    return (
      <div style={style}>
        <div className={`grid gap-6 px-4 ${viewMode === "grid" ? "grid-cols-4" : "grid-cols-1"}`}>
          {rowProducts.map((product) => (
            <OptimizedProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              onClick={() => onProductClick(product.id)}
            />
          ))}
        </div>
      </div>
    )
  })

  Row.displayName = "Row"

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">해당 카테고리에 상품이 없습니다.</p>
      </div>
    )
  }

  return (
    <List height={600} itemCount={rows.length} itemSize={itemHeight} width="100%">
      {Row}
    </List>
  )
})

VirtualizedProductList.displayName = "VirtualizedProductList"

export default VirtualizedProductList
