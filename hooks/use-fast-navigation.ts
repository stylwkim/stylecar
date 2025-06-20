"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { sessionCache, preloadImages } from "@/lib/cache-utils"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  rating: number
  reviews: number
  image: string
  badge: string
  isNew?: boolean
}

interface Review {
  id: number
  title: string
  excerpt: string
  author: string
  authorImage: string
  rating: number
  date: string
  category: string
  thumbnail: string
  productId?: number
}

export function useFastNavigation() {
  const router = useRouter()

  const navigateToProduct = useCallback(
    async (productId: number, productData?: Product) => {
      // 상품 데이터 캐싱
      if (productData) {
        sessionCache.set(`product-${productId}`, productData)

        // 이미지 프리로딩
        if (productData.image) {
          preloadImages([productData.image]).catch(() => {})
        }
      }

      // 빠른 네비게이션
      router.push(`/products/${productId}`)
    },
    [router],
  )

  const navigateToReview = useCallback(
    async (reviewId: number, reviewData?: Review, productId?: number) => {
      // 후기 데이터 캐싱
      if (reviewData) {
        sessionCache.set(`review-${reviewId}`, reviewData)

        // 썸네일 이미지 프리로딩
        if (reviewData.thumbnail) {
          preloadImages([reviewData.thumbnail, reviewData.authorImage]).catch(() => {})
        }
      }

      // 상품 상세 페이지의 후기 탭으로 이동 또는 후기 상세 페이지로 이동
      if (productId) {
        router.push(`/products/${productId}?tab=reviews&highlight=${reviewId}`)
      } else {
        router.push(`/reviews/${reviewId}`)
      }
    },
    [router],
  )

  const navigateToCategory = useCallback(
    (categoryId: string) => {
      router.push(`/categories?category=${categoryId}`)
    },
    [router],
  )

  const navigateToSale = useCallback(() => {
    router.push("/sale")
  }, [router])

  return {
    navigateToProduct,
    navigateToReview,
    navigateToCategory,
    navigateToSale,
  }
}
