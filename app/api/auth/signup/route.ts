import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, phone, agreements } = body

    // 유효성 검사
    if (!name || !email || !password) {
      return NextResponse.json({ message: "필수 정보를 모두 입력해주세요." }, { status: 400 })
    }

    if (!agreements.terms || !agreements.privacy) {
      return NextResponse.json({ message: "필수 약관에 동의해주세요." }, { status: 400 })
    }

    // 이메일 중복 확인 (실제 구현에서는 데이터베이스 확인)
    // const existingUser = await getUserByEmail(email)
    // if (existingUser) {
    //   return NextResponse.json(
    //     { message: "이미 가입된 이메일입니다." },
    //     { status: 409 }
    //   )
    // }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 12)

    // 사용자 생성 (실제 구현에서는 데이터베이스에 저장)
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      phone,
      agreements,
      createdAt: new Date().toISOString(),
      emailVerified: false,
    }

    // 실제 구현에서는 데이터베이스에 저장
    // await createUser(newUser)

    // 이메일 인증 메일 발송 (선택사항)
    // await sendVerificationEmail(email)

    return NextResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("회원가입 오류:", error)
    return NextResponse.json({ message: "회원가입 중 오류가 발생했습니다." }, { status: 500 })
  }
}
