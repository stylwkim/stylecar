import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/lib/simple-auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = authenticateUser(email, password)

    if (user) {
      // 간단한 세션 토큰 생성 (실제로는 JWT 등을 사용)
      const sessionToken = btoa(JSON.stringify({ userId: user.id, email: user.email, role: user.role }))

      const response = NextResponse.json({
        success: true,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      })

      // 쿠키에 세션 토큰 저장
      response.cookies.set("session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7일
      })

      return response
    } else {
      return NextResponse.json(
        { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 },
      )
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "로그인 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
