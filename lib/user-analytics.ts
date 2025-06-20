// 사용자 행동 분석 (Hotjar/Microsoft Clarity 스타일)
export class UserAnalytics {
  private trackingId: string

  constructor(trackingId: string) {
    this.trackingId = trackingId
  }

  // 히트맵 데이터 수집
  trackHeatmap(element: HTMLElement, action: "click" | "hover" | "scroll") {
    const rect = element.getBoundingClientRect()
    const data = {
      timestamp: Date.now(),
      action,
      element: element.tagName.toLowerCase(),
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      page: window.location.pathname,
    }

    // 실제로는 분석 서비스로 데이터 전송
    console.log("히트맵 데이터:", data)
    this.sendToAnalytics("heatmap", data)
  }

  // 사용자 세션 녹화
  startSessionRecording() {
    console.log("세션 녹화 시작")

    // 마우스 움직임, 클릭, 스크롤 등 추적
    document.addEventListener("mousemove", this.trackMouseMovement.bind(this))
    document.addEventListener("click", this.trackClick.bind(this))
    document.addEventListener("scroll", this.trackScroll.bind(this))
  }

  private trackMouseMovement(event: MouseEvent) {
    // 마우스 움직임 데이터 수집
    const data = {
      timestamp: Date.now(),
      type: "mousemove",
      x: event.clientX,
      y: event.clientY,
    }

    // 실시간으로 서버에 전송하지 않고 배치로 처리
    this.bufferData("mouse", data)
  }

  private trackClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const data = {
      timestamp: Date.now(),
      type: "click",
      element: target.tagName.toLowerCase(),
      className: target.className,
      text: target.textContent?.substring(0, 50) || "",
      x: event.clientX,
      y: event.clientY,
    }

    this.sendToAnalytics("click", data)
  }

  private trackScroll(event: Event) {
    const data = {
      timestamp: Date.now(),
      type: "scroll",
      scrollY: window.scrollY,
      scrollX: window.scrollX,
      documentHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
    }

    this.bufferData("scroll", data)
  }

  private bufferData(type: string, data: any) {
    // 로컬 스토리지나 메모리에 임시 저장 후 배치 전송
    const key = `analytics_${type}`
    const existing = JSON.parse(localStorage.getItem(key) || "[]")
    existing.push(data)

    // 100개씩 모아서 전송
    if (existing.length >= 100) {
      this.sendToAnalytics(type, existing)
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(existing))
    }
  }

  private sendToAnalytics(type: string, data: any) {
    // 실제 분석 서비스로 데이터 전송
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data, trackingId: this.trackingId }),
    }).catch(console.error)
  }

  // 페이지 성능 분석
  analyzePagePerformance() {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    const paint = performance.getEntriesByType("paint")

    const metrics = {
      // 페이지 로드 시간
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      // DOM 준비 시간
      domReady: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      // 첫 번째 페인트
      firstPaint: paint.find((p) => p.name === "first-paint")?.startTime || 0,
      // 첫 번째 콘텐츠 페인트
      firstContentfulPaint: paint.find((p) => p.name === "first-contentful-paint")?.startTime || 0,
      // 네트워크 지연시간
      networkLatency: navigation.responseStart - navigation.requestStart,
    }

    console.log("페이지 성능 지표:", metrics)
    this.sendToAnalytics("performance", metrics)

    return metrics
  }
}
