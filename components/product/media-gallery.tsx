"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type MediaItem = {
  type: "image" | "video"
  src: string
  alt?: string
  poster?: string
}

interface MediaGalleryProps {
  items: MediaItem[]
  aspectRatio?: "square" | "video"
  className?: string
}

export function MediaGallery({ items, aspectRatio = "square", className }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const activeItem = items[activeIndex]
  const isVideo = activeItem?.type === "video"

  // 비디오 재생/일시정지 토글
  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  // 비디오 상태 업데이트
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("ended", handleEnded)
    }
  }, [videoRef.current])

  // 아이템 변경 시 비디오 재생 상태 초기화
  useEffect(() => {
    setIsPlaying(false)
  }, [activeIndex])

  // 이전 아이템으로 이동
  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  // 다음 아이템으로 이동
  const goToNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={cn("space-y-2", className)}>
      {/* 메인 미디어 표시 영역 */}
      <div className="relative border rounded-md overflow-hidden bg-gray-100">
        <div className={cn("relative", aspectRatio === "square" ? "aspect-square" : "aspect-video")}>
          {isVideo ? (
            <div className="w-full h-full">
              <video
                ref={videoRef}
                src={activeItem.src}
                poster={activeItem.poster}
                className="w-full h-full object-cover"
                playsInline
                controls={false}
                loop
              />
              <button
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
                aria-label={isPlaying ? "일시정지" : "재생"}
              >
                <div className="bg-white/80 rounded-full p-3">
                  {isPlaying ? <Pause className="w-8 h-8 text-gray-800" /> : <Play className="w-8 h-8 text-gray-800" />}
                </div>
              </button>
            </div>
          ) : (
            <Image
              src={activeItem.src || "/placeholder.svg"}
              alt={activeItem.alt || "상품 이미지"}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              priority={activeIndex === 0}
            />
          )}
        </div>

        {/* 좌우 네비게이션 버튼 */}
        {items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
              aria-label="이전 이미지"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white transition-colors"
              aria-label="다음 이미지"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* 썸네일 목록 */}
      {items.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative flex-shrink-0 border-2 rounded overflow-hidden",
                aspectRatio === "square" ? "w-16 h-16" : "w-24 h-14",
                activeIndex === index ? "border-blue-500" : "border-gray-200",
              )}
              aria-label={`${index + 1}번 ${item.type === "video" ? "동영상" : "이미지"} 보기`}
              aria-current={activeIndex === index ? "true" : "false"}
            >
              {item.type === "video" ? (
                <>
                  <Image
                    src={item.poster || item.src}
                    alt={`동영상 썸네일 ${index + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </>
              ) : (
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={`상품 이미지 ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
