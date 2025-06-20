import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          // 데모용 사용자 인증
          const demoUsers = [
            { email: "admin@stylecar.co.kr", password: "admin123", name: "관리자", role: "admin" },
            { email: "user@stylecar.co.kr", password: "password", name: "스타일카 사용자", role: "user" },
            { email: "test@stylecar.co.kr", password: "test123", name: "테스트 사용자", role: "user" },
            { email: "demo@stylecar.co.kr", password: "demo123", name: "데모 사용자", role: "user" },
          ]

          const user = demoUsers.find((u) => u.email === credentials.email && u.password === credentials.password)

          if (user) {
            return {
              id: user.email,
              email: user.email,
              name: user.name,
              image: "/placeholder.svg?height=40&width=40",
              role: user.role,
            }
          }

          return null
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user"
      }
      return token
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as string
      }
      return session
    },
    async signIn() {
      return true
    },
    async redirect({ url, baseUrl }) {
      // 상대 URL인 경우 baseUrl과 결합
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // 같은 origin인 경우 허용
      else if (new URL(url).origin === baseUrl) return url
      // 기본적으로 baseUrl로 리다이렉트
      return baseUrl
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "development-secret-key-change-in-production",
  debug: false, // 프로덕션에서는 false로 설정
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
