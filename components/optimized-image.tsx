"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "50px", // 50px 전에 미리 로드
      },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // WebP 지원 확인 및 최적화된 src 생성
  const getOptimizedSrc = (originalSrc: string) => {
    // 실제 환경에서는 서버에서 WebP 변환 또는 CDN 사용
    if (originalSrc.includes("placeholder.svg")) {
      return originalSrc
    }

    // WebP 지원 시 WebP 버전 사용
    const supportsWebP =
      typeof window !== "undefined" &&
      document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0

    if (supportsWebP && !originalSrc.includes(".webp")) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, ".webp")
    }

    return originalSrc
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {isInView && (
        <Image
          src={getOptimizedSrc(src) || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      {/* 로딩 스켈레톤 */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
