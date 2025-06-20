import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "카매트 | 프리미엄 자동차용품 | 스타일카",
  description:
    "카매트 전문 쇼핑몰 스타일카. 45개의 프리미엄 카매트 상품을 할인가에 만나보세요. 무료배송, 1년 A/S 보장.",
}

// 정적 생성으로 빌드 시 미리 생성
export const dynamic = "force-static"

export default function CarmatPage() {
  const categories = [
    { name: "전체", href: "/categories", count: 156, active: false },
    { name: "카매트", href: "/categories/carmat", count: 45, active: true },
    { name: "세차용품", href: "/categories/cleaning", count: 32, active: false },
    { name: "방향제", href: "/categories/fragrance", count: 28, active: false },
    { name: "보호필름", href: "/categories/protection", count: 21, active: false },
    { name: "주차용품", href: "/categories/parking", count: 18, active: false },
    { name: "액세서리", href: "/categories/accessories", count: 12, active: false },
  ]

  const products = [
    {
      id: 1,
      name: "프리미엄 3D 카매트 풀세트",
      brand: "스타일카",
      price: 189000,
      originalPrice: 270000,
      rating: 4.8,
      reviews: 324,
      badge: "30% 할인",
      image: "/placeholder.svg?height=300&width=300&text=카매트",
    },
    {
      id: 5,
      name: "럭셔리 가죽 카매트",
      brand: "럭셔리카",
      price: 320000,
      originalPrice: 450000,
      rating: 4.9,
      reviews: 78,
      badge: "프리미엄",
      image: "/placeholder.svg?height=300&width=300&text=가죽카매트",
    },
    {
      id: 6,
      name: "방수 실리콘 카매트",
      brand: "프로텍트",
      price: 89000,
      originalPrice: 120000,
      rating: 4.6,
      reviews: 156,
      badge: "베스트",
      image: "/placeholder.svg?height=300&width=300&text=실리콘카매트",
    },
    {
      id: 7,
      name: "겨울용 털 카매트",
      brand: "윈터카",
      price: 145000,
      originalPrice: 180000,
      rating: 4.7,
      reviews: 89,
      badge: "시즌특가",
      image: "/placeholder.svg?height=300&width=300&text=털카매트",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              스타일카
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                홈
              </Link>
              <Link href="/categories" className="text-blue-600 font-medium">
                카테고리
              </Link>
              <Link href="/sale" className="text-gray-700 hover:text-blue-600">
                세일
              </Link>
              <Link href="/support" className="text-gray-700 hover:text-blue-600">
                고객지원
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            홈
          </Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-blue-600">
            제품카테고리
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">카매트</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">카매트</h1>
          <p className="text-xl text-gray-600">45개의 프리미엄 카매트 상품을 만나보세요</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`block p-4 rounded-lg border text-center transition-all hover:shadow-lg ${
                category.active
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="font-semibold">{category.name}</div>
              <div className="text-sm text-gray-500 mt-1">{category.count}개</div>
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                  {product.badge}
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">{"★".repeat(Math.floor(product.rating))}</div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">{product.price.toLocaleString()}원</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {product.originalPrice.toLocaleString()}원
                      </span>
                    )}
                  </div>
                </div>
                <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                  장바구니 담기
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">스타일카</h3>
              <p className="text-sm">프리미엄 자동차용품 전문 쇼핑몰</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">고객지원</h3>
              <div className="space-y-2 text-sm">
                <div>고객센터: 1588-1234</div>
                <div>운영시간: 09:00-18:00</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">정책</h3>
              <div className="space-y-2 text-sm">
                <Link href="/privacy" className="block hover:text-white">
                  개인정보처리방침
                </Link>
                <Link href="/terms" className="block hover:text-white">
                  이용약관
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
