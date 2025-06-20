"use client"

import { Suspense, lazy } from "react"
import { SkeletonLoader } from "./skeleton-loader"

// 동적 임포트로 코드 분할
const ProductCard = lazy(() => import("./optimized-product-card"))
const ProductFilters = lazy(() => import("./product-filters"))

interface DynamicProductGridProps {
  products: any[]
  category: string
}

export default function DynamicProductGrid({ products, category }: DynamicProductGridProps) {
  return (
    <div className="space-y-6">
      {/* 필터 컴포넌트 - 필요할 때만 로드 */}
      <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse rounded"></div>}>
        <ProductFilters category={category} />
      </Suspense>

      {/* 제품 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Suspense key={product.id} fallback={<SkeletonLoader />}>
            <ProductCard
              product={product}
              priority={index < 4} // 첫 4개 제품만 우선 로딩
            />
          </Suspense>
        ))}
      </div>
    </div>
  )
}
