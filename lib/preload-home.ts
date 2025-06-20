// 홈페이지 리소스를 미리 로드하는 함수
export function preloadHomepage() {
  // 주요 홈페이지 리소스를 미리 가져오기
  const resources = ["/", "/api/products", "/api/categories"]

  // 백그라운드에서 리소스 프리페치
  resources.forEach((url) => {
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = url
    document.head.appendChild(link)
  })

  // 이미지 프리로드
  const preloadImages = [
    "/images/stylecar-logo.jpg",
    "/placeholder.svg?height=400&width=600&text=카매트",
    "/placeholder.svg?height=400&width=600&text=세차용품",
  ]

  preloadImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}
