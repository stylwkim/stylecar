// 클라이언트 사이드 캐싱 유틸리티

export interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

class ClientCache {
  private cache = new Map<string, CacheItem<any>>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5분

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)

    if (!item) {
      return null
    }

    // TTL 체크
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  has(key: string): boolean {
    const item = this.cache.get(key)

    if (!item) {
      return false
    }

    // TTL 체크
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // 만료된 캐시 정리
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

export const clientCache = new ClientCache()

// 세션 스토리지 캐싱 (페이지 새로고침 시에도 유지)
export const sessionCache = {
  set<T>(key: string, data: T): void {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          key,
          JSON.stringify({
            data,
            timestamp: Date.now(),
          }),
        )
      } catch (error) {
        console.warn("SessionStorage set failed:", error)
      }
    }
  },

  get<T>(key: string, maxAge: number = 5 * 60 * 1000): T | null {
    if (typeof window === "undefined") {
      return null
    }

    try {
      const item = sessionStorage.getItem(key)
      if (!item) {
        return null
      }

      const parsed = JSON.parse(item)

      // 만료 체크
      if (Date.now() - parsed.timestamp > maxAge) {
        sessionStorage.removeItem(key)
        return null
      }

      return parsed.data
    } catch (error) {
      console.warn("SessionStorage get failed:", error)
      return null
    }
  },

  delete(key: string): void {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(key)
    }
  },
}

// 이미지 프리로딩
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// 여러 이미지 프리로딩
export const preloadImages = async (srcs: string[]): Promise<void> => {
  try {
    await Promise.all(srcs.map(preloadImage))
  } catch (error) {
    console.warn("Image preloading failed:", error)
  }
}
