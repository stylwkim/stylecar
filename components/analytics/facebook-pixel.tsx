"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function FacebookPixel() {
  const pathname = usePathname()

  useEffect(() => {
    // Facebook Pixel 초기화
    if (typeof window !== "undefined") {
      ;((f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) => {
        if (f.fbq) return
        n = f.fbq = () => {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = "2.0"
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js")

      window.fbq("init", process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID)
      window.fbq("track", "PageView")
    }
  }, [])

  useEffect(() => {
    // 페이지 변경 시 추적
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView")
    }
  }, [pathname])

  return null
}

// 전환 이벤트 추적 함수들
export const trackPurchase = (value: number, currency = "KRW") => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", {
      value: value,
      currency: currency,
    })
  }
}

export const trackAddToCart = (contentName: string, value: number) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToCart", {
      content_name: contentName,
      value: value,
      currency: "KRW",
    })
  }
}

export const trackViewContent = (contentName: string, contentCategory: string) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", {
      content_name: contentName,
      content_category: contentCategory,
    })
  }
}
