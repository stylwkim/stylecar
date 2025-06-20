"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Head from "next/head"
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, MessageCircle, Plus, Minus, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { DIYGuide } from "@/components/diy/diy-guide"
import { VehicleCompatibility } from "@/components/vehicle/vehicle-compatibility"
import { SocialShare } from "@/components/social/social-share"
import { ProductSchema } from "@/components/seo/product-schema"
import { MediaGallery } from "@/components/product/media-gallery"

export default function ProductDetailPage() {
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState("")
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // 실제로는 params.id를 사용해서 API에서 데이터를 가져와야 합니다
  const product = {
    id: 1,
    name: "프리미엄 3D 카매트 풀세트",
    brand: "스타일카",
    price: "189,000",
    originalPrice: "270,000",
    discount: 30,
    rating: 4.8,
    reviewCount: 324,
    soldCount: 1250,
    sku: "SC-CARMAT-001",
    gtin: "8801234567890",
    mpn: "CARMAT-3D-PREMIUM",
    category: "카매트",
    availability: "InStock",
    condition: "NewCondition",
    media: [
      {
        type: "image" as const,
        src: "/placeholder.svg?height=1000&width=1000",
        alt: "프리미엄 3D 카매트 풀세트 메인 이미지",
      },
      {
        type: "video" as const,
        src: "https://example.com/videos/carmat-demo.mp4", // 실제 비디오 URL로 교체 필요
        poster: "/placeholder.svg?height=1000&width=1000",
        alt: "프리미엄 3D 카매트 사용 영상",
      },
      {
        type: "image" as const,
        src: "/placeholder.svg?height=1000&width=1000",
        alt: "프리미엄 3D 카매트 상세 이미지 1",
      },
      {
        type: "image" as const,
        src: "/placeholder.svg?height=1000&width=1000",
        alt: "프리미엄 3D 카매트 상세 이미지 2",
      },
      {
        type: "image" as const,
        src: "/placeholder.svg?height=1000&width=1000",
        alt: "프리미엄 3D 카매트 상세 이미지 3",
      },
    ],
    options: [
      { name: "아반떼 CN7 (2020~)", price: 0 },
      { name: "소나타 DN8 (2019~)", price: 0 },
      { name: "그랜저 IG (2016~2022)", price: 10000 },
      { name: "제네시스 G90 (2022~)", price: 20000 },
    ],
    features: [
      "차종별 전용 설계로 완벽한 핏감",
      "프리미엄 TPE 소재 사용",
      "미끄럼 방지 처리",
      "친환경 무독성 소재",
      "세척 및 관리 용이",
    ],
    specifications: {
      소재: "TPE (열가소성 엘라스토머)",
      색상: "블랙",
      구성: "운전석, 조수석, 뒷좌석 풀세트",
      두께: "5mm",
      원산지: "한국",
    },
    deliveryInfo: {
      배송비: "무료배송 (10만원 이상)",
      배송기간: "1-2일 (평일 오후 2시 이전 주문시 당일발송)",
      배송지역: "전국 (제주/도서산간 추가비용)",
    },
    reviews: [
      {
        id: 1,
        author: "김민수",
        rating: 5,
        date: "2024.01.15",
        content: "차에 딱 맞게 제작되어서 정말 만족합니다. 품질도 좋고 설치도 쉬워요.",
        images: ["/placeholder.svg?height=100&width=100"],
        helpful: 24,
      },
      {
        id: 2,
        author: "박지영",
        rating: 4,
        date: "2024.01.12",
        content: "생각보다 두껍고 튼튼해요. 색상도 차 내부와 잘 어울립니다.",
        images: [],
        helpful: 18,
      },
    ],
  }

  const relatedProducts = [
    {
      id: 2,
      name: "무선 차량용 청소기",
      price: "89,000",
      originalPrice: "120,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
    },
    {
      id: 3,
      name: "세차 케어 키트",
      price: "145,000",
      originalPrice: "180,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
    },
    {
      id: 4,
      name: "차량용 공기청정기",
      price: "65,000",
      originalPrice: "85,000",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
    },
  ]

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1)
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // 구조화된 데이터 생성
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.brand}의 ${product.name}. ${product.features.join(", ")}`,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    sku: product.sku,
    gtin: product.gtin,
    mpn: product.mpn,
    image: product.media.filter((item) => item.type === "image").map((item) => `https://stylecar.co.kr${item.src}`),
    offers: {
      "@type": "Offer",
      url: `https://stylecar.co.kr/products/${product.id}`,
      priceCurrency: "KRW",
      price: product.price.replace(",", ""),
      priceValidUntil: "2024-12-31",
      availability: `https://schema.org/${product.availability}`,
      itemCondition: `https://schema.org/${product.condition}`,
      seller: {
        "@type": "Organization",
        name: "스타일카",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "KRW",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: product.reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      datePublished: review.date.replace(/\./g, "-"),
      reviewBody: review.content,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
    additionalProperty: Object.entries(product.specifications).map(([key, value]) => ({
      "@type": "PropertyValue",
      name: key,
      value: value,
    })),
  }

  return (
    <>
      <Head>
        <title>{`${product.name} - ${product.brand} | 스타일카`}</title>
        <meta
          name="description"
          content={`${product.name} ${product.discount}% 할인가 ${product.price}원. ${product.features.join(", ")}. 무료배송, 1년 A/S 보장. 실제 구매 후기 ${product.reviewCount}개.`}
        />
        <meta
          name="keywords"
          content={`${product.name}, ${product.brand}, ${product.category}, 자동차용품, 카매트, 할인, 무료배송`}
        />
        <link rel="canonical" href={`https://stylecar.co.kr/products/${product.id}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} - ${product.brand} | 스타일카`} />
        <meta
          property="og:description"
          content={`${product.name} ${product.discount}% 할인가 ${product.price}원. 무료배송, 1년 A/S 보장.`}
        />
        <meta property="og:image" content={`https://stylecar.co.kr${product.media[0].src}`} />
        <meta property="og:url" content={`https://stylecar.co.kr/products/${product.id}`} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price.replace(",", "")} />
        <meta property="product:price:currency" content="KRW" />
        <meta property="product:availability" content="in stock" />
        <meta property="product:condition" content="new" />
        <meta property="product:retailer_item_id" content={product.sku} />

        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productStructuredData),
          }}
        />

        {/* 브레드크럼 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "홈",
                  item: "https://stylecar.co.kr",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "제품카테고리",
                  item: "https://stylecar.co.kr/categories",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: product.category,
                  item: `https://stylecar.co.kr/categories?category=${product.category}`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: product.name,
                  item: `https://stylecar.co.kr/products/${product.id}`,
                },
              ],
            }),
          }}
        />
        <ProductSchema
          product={{
            id: product.id.toString(),
            name: product.name,
            description: `${product.brand}의 ${product.name}. ${product.features.join(", ")}`,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice,
            rating: product.rating,
            reviewCount: product.reviewCount,
            image: product.media[0].src,
            category: product.category,
            sku: product.sku,
            availability: product.availability,
            condition: product.condition,
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        {/* 브레드크럼 네비게이션 */}
        <nav className="w-[860px] mx-auto py-4 px-6" aria-label="breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-blue-600">
                홈
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/categories" className="hover:text-blue-600">
                제품카테고리
              </a>
            </li>
            <li>/</li>
            <li>
              <a href={`/categories?category=${product.category}`} className="hover:text-blue-600">
                {product.category}
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* 네이버 스타일 860px 고정 너비 컨테이너 */}
        <div className="w-full bg-gray-50 py-8">
          <div className="w-[860px] mx-auto bg-white">
            {/* 상품 기본 정보 섹션 */}
            <div className="p-6 border-b">
              <div className="grid grid-cols-2 gap-8">
                {/* 상품 이미지 */}
                <div>
                  <MediaGallery items={product.media} className="mb-4" />
                </div>

                {/* 상품 정보 */}
                <div>
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">{product.brand}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>

                  {/* 평점 및 리뷰 */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center" role="img" aria-label={`평점 ${product.rating}점`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviewCount}개 리뷰)
                    </span>
                    <span className="text-sm text-gray-500 ml-4">{product.soldCount}개 판매</span>
                  </div>

                  {/* 가격 */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <Badge className="bg-red-500 text-white mr-2">{product.discount}% 할인</Badge>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}원</span>
                    </div>
                    <div className="text-3xl font-bold text-red-500">{product.price}원</div>
                  </div>

                  {/* 옵션 선택 */}
                  <div className="mb-6">
                    <label htmlFor="car-model" className="block text-sm font-medium text-gray-700 mb-2">
                      차종 선택 *
                    </label>
                    <Select value={selectedOption} onValueChange={setSelectedOption}>
                      <SelectTrigger className="w-full" id="car-model">
                        <SelectValue placeholder="차종을 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.options.map((option, index) => (
                          <SelectItem key={index} value={option.name}>
                            {option.name} {option.price > 0 && `(+${option.price.toLocaleString()}원)`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 수량 선택 */}
                  <div className="mb-6">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                      수량
                    </label>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange("decrease")}
                        className="w-8 h-8 border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-50"
                        aria-label="수량 감소"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div
                        className="w-16 h-8 border-t border-b border-gray-300 flex items-center justify-center bg-white"
                        id="quantity"
                        role="spinbutton"
                        aria-valuenow={quantity}
                        aria-valuemin={1}
                        aria-valuemax={99}
                      >
                        {quantity}
                      </div>
                      <button
                        onClick={() => handleQuantityChange("increase")}
                        className="w-8 h-8 border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-50"
                        aria-label="수량 증가"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 총 가격 */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">총 상품금액</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {(Number.parseInt(product.price.replace(",", "")) * quantity).toLocaleString()}원
                      </span>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1" aria-label="찜하기">
                        <Heart className="w-4 h-4 mr-2" />
                        찜하기
                      </Button>
                      <SocialShare
                        url={`https://stylecar.co.kr/products/${product.id}`}
                        title={product.name}
                        description={`${product.brand}의 ${product.name}. ${product.discount}% 할인가 ${product.price}원`}
                        image={`https://stylecar.co.kr${product.media[0].src}`}
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      장바구니 담기
                    </Button>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">바로 구매하기</Button>
                  </div>

                  {/* 배송/혜택 정보 */}
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 text-green-600 mr-2" />
                      <span>무료배송 (평일 오후 2시 이전 주문시 당일발송)</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-blue-600 mr-2" />
                      <span>1년 품질보증 및 A/S</span>
                    </div>
                    <div className="flex items-center">
                      <RotateCcw className="w-4 h-4 text-purple-600 mr-2" />
                      <span>7일 무료 교환/환불</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 차량 호환성 확인 */}
              <div className="mt-6">
                <VehicleCompatibility
                  productId={product.id.toString()}
                  onCompatibilityCheck={(isCompatible, vehicle) => {
                    console.log(`호환성: ${isCompatible}, 차량: ${vehicle}`)
                  }}
                />
              </div>
            </div>

            {/* 상품 상세 정보 탭 */}
            <div className="p-6">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="details">상품상세</TabsTrigger>
                  <TabsTrigger value="reviews">리뷰 ({product.reviewCount})</TabsTrigger>
                  <TabsTrigger value="qna">문의</TabsTrigger>
                  <TabsTrigger value="delivery">배송/교환/환불</TabsTrigger>
                  <TabsTrigger value="diy">DIY 가이드</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6">
                  <div className="space-y-6">
                    {/* 상품 특징 */}
                    <section>
                      <h2 className="text-lg font-semibold mb-4">상품 특징</h2>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* 상품 사양 */}
                    <section>
                      <h2 className="text-lg font-semibold mb-4">상품 사양</h2>
                      <div className="border rounded-lg overflow-hidden">
                        {Object.entries(product.specifications).map(([key, value], index) => (
                          <div key={index} className={`flex ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                            <div className="w-32 p-3 font-medium text-gray-700 border-r">{key}</div>
                            <div className="flex-1 p-3">{value}</div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* 상품 상세 이미지 */}
                    <section>
                      <h2 className="text-lg font-semibold mb-4">상품 상세 이미지</h2>
                      <div className="space-y-4">
                        <img
                          src="/placeholder.svg?height=1000&width=1000"
                          alt={`${product.name} 상세 이미지 1`}
                          className="w-full rounded-lg"
                        />
                        <img
                          src="/placeholder.svg?height=1000&width=1000"
                          alt={`${product.name} 상세 이미지 2`}
                          className="w-full rounded-lg"
                        />
                      </div>
                    </section>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-6">
                    {/* 리뷰 통계 */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold">{product.rating}</div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{product.reviewCount}개 리뷰</div>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">리뷰 작성하기</Button>
                      </div>
                    </div>

                    {/* 리뷰 목록 */}
                    <div className="space-y-4">
                      {product.reviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <div className="font-medium">{review.author}</div>
                                <div className="flex items-center mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">{review.content}</p>
                            {review.images.length > 0 && (
                              <div className="flex space-x-2 mb-3">
                                {review.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={image || "/placeholder.svg"}
                                    alt={`${review.author}님의 리뷰 이미지 ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded border"
                                  />
                                ))}
                              </div>
                            )}
                            <div className="flex items-center text-sm text-gray-500">
                              <button className="flex items-center hover:text-blue-600">
                                <Heart className="w-4 h-4 mr-1" />
                                도움돼요 {review.helpful}
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="qna" className="mt-6">
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">상품 문의</h3>
                    <p className="text-gray-600 mb-6">상품에 대해 궁금한 점을 문의해보세요</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">문의하기</Button>
                  </div>
                </TabsContent>

                <TabsContent value="delivery" className="mt-6">
                  <div className="space-y-6">
                    {/* 배송 정보 */}
                    <section>
                      <h3 className="text-lg font-semibold mb-4">배송 정보</h3>
                      <div className="border rounded-lg overflow-hidden">
                        {Object.entries(product.deliveryInfo).map(([key, value], index) => (
                          <div key={index} className={`flex ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                            <div className="w-32 p-3 font-medium text-gray-700 border-r">{key}</div>
                            <div className="flex-1 p-3">{value}</div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* 교환/환불 정책 */}
                    <section>
                      <h3 className="text-lg font-semibold mb-4">교환/환불 정책</h3>
                      <div className="space-y-3 text-sm text-gray-700">
                        <p>• 상품 수령 후 7일 이내 교환/환불 신청 가능</p>
                        <p>• 단순 변심으로 인한 교환/환불 시 배송비 고객 부담</p>
                        <p>• 상품 하자 시 무료 교환/환불 및 배송비 당사 부담</p>
                        <p>• 사용한 상품이나 포장이 훼손된 경우 교환/환불 불가</p>
                      </div>
                    </section>
                  </div>
                </TabsContent>
                <TabsContent value="diy" className="mt-6">
                  <DIYGuide productName={product.name} category={product.category} />
                </TabsContent>
              </Tabs>
            </div>

            {/* 연관 상품 */}
            <section className="p-6 border-t bg-gray-50">
              <h2 className="text-lg font-semibold mb-4">함께 보면 좋은 상품</h2>
              <div className="grid grid-cols-3 gap-4">
                {relatedProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                      <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold text-red-500">{product.price}원</span>
                        <span className="text-gray-500 line-through ml-2 text-xs">{product.originalPrice}원</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
