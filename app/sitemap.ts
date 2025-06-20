import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stylecar.co.kr"
  const currentDate = new Date()

  // 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sale`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews/write`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]

  // 카테고리 페이지들
  const categoryPages = ["all", "carmat", "cleaning", "fragrance", "protection", "parking", "accessories"].map(
    (category) => ({
      url: `${baseUrl}/categories?category=${category}`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }),
  )

  // 상품 페이지들 (실제로는 데이터베이스에서 가져와야 함)
  const productPages = Array.from({ length: 100 }, (_, i) => ({
    url: `${baseUrl}/products/${i + 1}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // 후기 페이지들 (실제로는 데이터베이스에서 가져와야 함)
  const reviewPages = Array.from({ length: 50 }, (_, i) => ({
    url: `${baseUrl}/reviews/${i + 1}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...productPages, ...reviewPages]
}
