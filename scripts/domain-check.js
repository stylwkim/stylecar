const dns = require("dns")
const https = require("https")

console.log("🔍 도메인 상태를 확인하는 중...")

// 1. DNS 확인
dns.lookup("stylecar.co.kr", (err, address, family) => {
  if (err) {
    console.log("❌ 도메인이 등록되지 않았거나 DNS 설정이 필요합니다.")
    console.log("📝 해결 방법:")
    console.log("   1. 도메인 등록: https://www.gabia.com")
    console.log("   2. DNS 설정: Vercel DNS 서버로 변경")
    console.log("   3. 임시 도메인 사용: your-project.vercel.app")
  } else {
    console.log(`✅ 도메인 IP: ${address}`)

    // 2. HTTPS 연결 확인
    const options = {
      hostname: "stylecar.co.kr",
      port: 443,
      path: "/",
      method: "GET",
      timeout: 5000,
    }

    const req = https.request(options, (res) => {
      console.log(`✅ 웹사이트 상태: ${res.statusCode}`)
      console.log("🌍 웹사이트가 정상적으로 작동합니다!")
    })

    req.on("error", (err) => {
      console.log("⚠️  HTTPS 연결 실패:", err.message)
      console.log("🔧 SSL 인증서 설정이 필요할 수 있습니다.")
    })

    req.on("timeout", () => {
      console.log("⏰ 연결 시간 초과")
      req.destroy()
    })

    req.end()
  }
})

// 3. 대안 도메인 제안
console.log("\n🎯 대안 방법:")
console.log("1. 로컬 개발: npm run dev → http://localhost:3000")
console.log("2. Vercel 임시 도메인: your-project.vercel.app")
console.log("3. GitHub Pages: username.github.io/stylecar")
