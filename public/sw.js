const CACHE_NAME = "stylecar-v1"
const STATIC_ASSETS = [
  "/",
  "/categories-static.html",
  "/categories-carmat.html",
  "/categories-cleaning.html",
  "/categories-fragrance.html",
  "/manifest.json",
]

// 설치 이벤트
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)))
})

// 네트워크 요청 인터셉트
self.addEventListener("fetch", (event) => {
  // 정적 자산은 캐시 우선
  if (STATIC_ASSETS.includes(event.request.url)) {
    event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)))
    return
  }

  // API 요청은 네트워크 우선, 실패 시 캐시
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone))
          return response
        })
        .catch(() => caches.match(event.request)),
    )
    return
  }

  // 기타 요청은 네트워크 우선
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)))
})
