import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "실제구매후기 - 스타일카 자동차용품 리얼 사용 후기 | 네이버 블로그 스타일",
  description:
    "스타일카 자동차용품 실제 구매고객들의 솔직한 사용후기. 카매트, 세차용품, 차량용품 리얼 후기와 사진, 동영상으로 확인하세요. 검증된 구매후기만 엄선!",
  keywords:
    "자동차용품 후기, 카매트 후기, 세차용품 후기, 실제구매후기, 차량용품 리뷰, 스타일카 후기, 자동차 블로그, 차량 관리",
  openGraph: {
    title: "실제구매후기 - 스타일카 자동차용품 리얼 사용 후기",
    description: "검증된 실제 구매고객들의 솔직한 자동차용품 사용후기. 사진과 동영상으로 생생하게 확인하세요!",
    images: ["https://stylecar.co.kr/images/reviews-og.jpg"],
    url: "https://stylecar.co.kr/reviews",
    type: "website",
  },
  alternates: {
    canonical: "https://stylecar.co.kr/reviews",
  },
}

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
