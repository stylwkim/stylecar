"use client"

import { useEffect } from "react"

interface Review {
  id: string
  title: string
  content: string
  author: string
  date: string
  rating: number
  productId: string
  productName: string
  images: string[]
}

interface BlogReviewSchemaProps {
  reviews?: Review[]
}

export function BlogReviewSchema({ reviews = [] }: BlogReviewSchemaProps) {
  useEffect(() => {
    // reviews가 없거나 빈 배열인 경우 스키마를 추가하지 않음
    if (!reviews || reviews.length === 0) {
      return
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "스타일카 실제구매후기",
      description: "자동차용품 실제 구매고객들의 솔직한 사용후기 블로그",
      url: "https://stylecar.co.kr/reviews",
      publisher: {
        "@type": "Organization",
        name: "스타일카",
        logo: {
          "@type": "ImageObject",
          url: "https://stylecar.co.kr/images/stylecar-logo.jpg",
        },
      },
      blogPost: reviews.map((review) => ({
        "@type": "BlogPosting",
        headline: review.title,
        description: review.content,
        author: {
          "@type": "Person",
          name: review.author,
        },
        datePublished: review.date.replace(/\./g, "-"),
        image: `https://stylecar.co.kr${review.images?.[0] || "/placeholder.svg"}`,
        url: `https://stylecar.co.kr/reviews/${review.id}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
          ratingCount: 1,
        },
      })),
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(schemaData)
    script.id = "blog-review-schema"

    // 기존 스키마가 있다면 제거
    const existingScript = document.getElementById("blog-review-schema")
    if (existingScript) {
      document.head.removeChild(existingScript)
    }

    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById("blog-review-schema")
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove)
      }
    }
  }, [reviews])

  return null
}
