import { type NextRequest, NextResponse } from "next/server"

// 가상의 데이터베이스 연결 (실제로는 Prisma, Supabase 등 사용)
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
  description?: string
  specifications?: Record<string, any>
}

// 메모리 캐시 (실제로는 Redis 사용 권장)
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5분

// 최적화된 제품 데이터 조회
async function getOptimizedProducts(
  category?: string,
  fields?: string[],
  limit?: number,
  offset?: number,
): Promise<Product[]> {
  const cacheKey = `products:${category || "all"}:${fields?.join(",") || "all"}:${limit}:${offset}`

  // 캐시 확인
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  // 실제 데이터 (DB에서 가져온다고 가정)
  const allProducts: Product[] = [
    {
      id: 1,
      name: "프리미엄 3D 카매트 풀세트",
      price: "189,000",
      originalPrice: "270,000",
      rating: 4.8,
      reviews: 324,
      image: "/placeholder.svg?height=300&width=300",
      badge: "30% 할인",
      category: "carmat",
      brand: "스타일카",
      isNew: false,
      description: "차량에 완벽하게 맞는 3D 카매트",
      specifications: { material: "TPE", color: "블랙", warranty: "1년" },
    },
    {
      id: 2,
      name: "무선 차량용 청소기 세트",
      price: "89,000",
      originalPrice: "120,000",
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      badge: "베스트",
      category: "cleaning",
      brand: "클린카",
      isNew: true,
      description: "강력한 흡입력의 무선 청소기",
      specifications: { power: "120W", battery: "2000mAh", warranty: "2년" },
    },
    // ... 더 많은 제품 데이터
  ]

  // 카테고리 필터링
  let filteredProducts =
    category && category !== "all" ? allProducts.filter((p) => p.category === category) : allProducts

  // 페이지네이션
  if (limit) {
    const start = offset || 0
    filteredProducts = filteredProducts.slice(start, start + limit)
  }

  // 필요한 필드만 선택 (메모리 최적화)
  if (fields && fields.length > 0) {
    filteredProducts = filteredProducts.map((product) => {
      const selectedProduct: any = {}
      fields.forEach((field) => {
        if (field in product) {
          selectedProduct[field] = product[field as keyof Product]
        }
      })
      return selectedProduct
    })
  }

  // 캐시에 저장
  cache.set(cacheKey, { data: filteredProducts, timestamp: Date.now() })

  return filteredProducts
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || undefined
    const fields = searchParams.get("fields")?.split(",") || undefined
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
    const offset = searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : undefined

    const products = await getOptimizedProducts(category, fields, limit, offset)

    return NextResponse.json({
      success: true,
      data: products,
      meta: {
        total: products.length,
        cached: cache.has(`products:${category || "all"}:${fields?.join(",") || "all"}:${limit}:${offset}`),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}
