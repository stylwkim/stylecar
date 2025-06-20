"use client"

import type React from "react"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

interface NextAuthSessionProviderProps {
  children: React.ReactNode
  session: Session | null
}

export default function NextAuthSessionProvider({ children, session }: NextAuthSessionProviderProps) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60} // 5분마다 세션 새로고침
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  )
}
