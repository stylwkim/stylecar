"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoadingProgress() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    let progressInterval: NodeJS.Timeout

    if (isLoading) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev
          return prev + Math.random() * 10
        })
      }, 100)
    } else {
      setProgress(100)
      setTimeout(() => setProgress(0), 500)
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval)
    }
  }, [isLoading])

  // 라우터 이벤트 리스닝 (실제 구현에서는 router events 사용)
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
      setProgress(0)
    }

    const handleComplete = () => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 200)
    }

    // 실제로는 router.events.on('routeChangeStart', handleStart) 등 사용

    return () => {
      // cleanup
    }
  }, [])

  if (!isLoading && progress === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className="h-1 bg-blue-500 transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: isLoading ? 1 : 0,
        }}
      />
    </div>
  )
}
