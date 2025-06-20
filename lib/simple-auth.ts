// 간단한 인증 시스템
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
}

// 테스트용 사용자 데이터
const users: User[] = [
  {
    id: "1",
    email: "admin@stylecar.co.kr",
    name: "관리자",
    role: "admin",
  },
  {
    id: "2",
    email: "user@stylecar.co.kr",
    name: "일반사용자",
    role: "user",
  },
]

export function authenticateUser(email: string, password: string): User | null {
  // 간단한 인증 로직 (실제로는 데이터베이스와 연동)
  const validCredentials = [
    { email: "admin@stylecar.co.kr", password: "admin123" },
    { email: "user@stylecar.co.kr", password: "password" },
  ]

  const credential = validCredentials.find((cred) => cred.email === email && cred.password === password)

  if (credential) {
    return users.find((user) => user.email === email) || null
  }

  return null
}

export function isAdmin(user: User | null): boolean {
  return user?.role === "admin"
}
