import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Grid3X3, Car, Sparkles, Droplets, Shield, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

// 카테고리 데이터 (정적)
const CATEGORIES = [
  { id: "all", name: "전체", icon: Grid3X3, color: "bg-gray-100 text-gray-600", count: 156 },
  { id: "carmat", name: "카매트", icon: Car, color: "bg-blue-100 text-blue-600", count: 45 },
  { id: "cleaning", name: "세차용품", icon: Droplets, color: "bg-cyan-100 text-cyan-600", count: 32 },
  { id: "fragrance", name: "방향제", icon: Sparkles, color: "bg-purple-100 text-purple-600", count: 28 },
  { id: "protection", name: "보호필름", icon: Shield, color: "bg-green-100 text-green-600", count: 21 },
  { id: "parking", name: "주차용품", icon: Car, color: "bg-orange-100 text-orange-600", count: 18 },
  { id: "accessories", name: "액세서리", icon: Star, color: "bg-pink-100 text-pink-600", count: 12 },
]

// 제품 데이터 (정적)
const PRODUCTS = [
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
  },
  {
    id: 3,
    name: "프리미엄 세차 케어 키트",
    price: "145,000",
    originalPrice: "180,000",
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    badge: "신상품",
    category: "cleaning",
    brand: "케어플러스",
    isNew: true,
  },
  {
    id: 4,
    name: "차량용 공기청정기",
    price: "65,000",
    originalPrice: "85,000",
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
    badge: "인기",
    category: "accessories",
    brand: "에어클린",
    isNew: false,
  },
  {
    id: 5,
    name: "럭셔리 가죽 카매트",
    price: "320,000",
    originalPrice: "450,000",
    rating: 4.9,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    badge: "프리미엄",
    category: "carmat",
    brand: "럭셔리카",
    isNew: false,
  },
  {
    id: 6,
    name: "차량용 방향제 세트",
    price: "25,000",
    originalPrice: "35,000",
    rating: 4.4,
    reviews: 145,
    image: "/placeholder.svg?height=300&width=300",
    badge: "할인",
    category: "fragrance",
    brand: "프레시",
    isNew: false,
  },
]

// 정적 경로 생성 (모든 카테고리에 대해 미리 빌드)
export async function generateStaticParams() {
  return [
    { category: "all" },
    { category: "carmat" },
    { category: "cleaning" },
    { category: "fragrance" },
    { category: "protection" },
    { category: "parking" },
    { category: "accessories" },
  ]
}

// 메타데이터 정적 생성
export function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string }
}): Metadata {
  const selectedCategory = searchParams.category || "all"
  const currentCategory = CATEGORIES.find((cat) => cat.id === selectedCategory) || CATEGORIES[0]

  const title =
    selectedCategory === "all"
      ? "전체 자동차용품 | 스타일카"
      : `${currentCategory.name} | 프리미엄 자동차용품 | 스타일카`

  const description =
    selectedCategory === "all"
      ? "스타일카의 모든 자동차용품을 한눈에! 카매트, 세차용품, 차량용 액세서리 등 프리미엄 제품을 합리적인 가격에 만나보세요."
      : `${currentCategory.name} 전문 쇼핑몰 스타일카. ${currentCategory.count}개의 프리미엄 ${currentCategory.name} 상품을 할인가에 만나보세요. 무료배송, 1년 A/S 보장.`

  return {
    title,
    description,
    keywords: `${currentCategory.name}, 자동차용품, 차량용품, 스타일카, 할인, 무료배송, 프리미엄`,
    openGraph: {
      title,
      description,
      url: `https://stylecar.co.kr/categories?category=${selectedCategory}`,
      type: "website",
    },
  }
}

// 정적 생성 페이지
export default function CategoriesPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const selectedCategory = searchParams.category || "all"
  const currentCategory = CATEGORIES.find((cat) => cat.id === selectedCategory) || CATEGORIES[0]

  // 서버에서 필터링 (빌드 시 처리)
  const filteredProducts =
    selectedCategory === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 브레드크럼 네비게이션 */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-600">
              홈
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/categories" className="hover:text-blue-600">
              제품카테고리
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{currentCategory.name}</li>
        </ol>
      </nav>

      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory === "all" ? "전체 제품" : currentCategory.name}
            </h1>
            <p className="text-lg text-gray-600">
              {selectedCategory === "all"
                ? "원하는 카테고리의 프리미엄 자동차용품을 찾아보세요"
                : `${currentCategory.count}개의 프리미엄 ${currentCategory.name} 상품을 만나보세요`}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories Grid - 정적 HTML로 렌더링 */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
            {CATEGORIES.map((category) => {
              const IconComponent = category.icon
              return (
                <Link
                  key={category.id}
                  href={`/categories?category=${category.id}`}
                  prefetch={true}
                  className={`block hover:no-underline`}
                >
                  <Card
                    className={`hover:shadow-lg transition-all duration-200 cursor-pointer group ${
                      selectedCategory === category.id ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`inline-flex p-3 rounded-full ${category.color} group-hover:scale-110 transition-transform duration-200 mb-3`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h2 className="font-semibold text-gray-900 text-sm mb-1">{category.name}</h2>
                      <p className="text-xs text-gray-500">{category.count}개</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Filters and Sort - 정적 HTML */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  필터
                </span>
              </Button>
              <div className="relative w-40">
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  defaultValue="popular"
                >
                  <option value="popular">인기순</option>
                  <option value="newest">최신순</option>
                  <option value="price-low">낮은 가격순</option>
                  <option value="price-high">높은 가격순</option>
                  <option value="rating">평점순</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="default" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </Button>
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Products Grid - 정적 HTML로 렌더링 */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                prefetch={true}
                className="block hover:no-underline"
              >
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-0 h-full">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={`${product.name} - ${product.brand}`}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={true}
                      />
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        {product.badge}
                      </div>
                      {product.isNew && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          NEW
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col h-[calc(100%-192px)]">
                      <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-lg font-bold text-gray-900">{product.price}원</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}원</span>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">장바구니 담기</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                이전
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                다음
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
