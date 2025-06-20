"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // 실제 구현에서는 API 호출로 인증 처리
      // 여기서는 간단한 데모로 처리
      if (username === "admin" && password === "password") {
        // 로그인 성공 시 쿠키나 세션 설정 후 리다이렉트
        setTimeout(() => {
          router.push("/admin/analytics")
        }, 1000)
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.")
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin.</h1>
          <p className="mt-2 text-gray-600">스타일카 관리자 페이지에 로그인하세요</p>
        </div>

        <div className="space-y-6">
          {/* 이메일 로그인 폼 */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md border border-red-200">{error}</div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="관리자 아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/admin/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="keep-signed-in"
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="keep-signed-in" className="ml-2 block text-sm text-gray-700">
                Keep me signed in
              </label>
            </div>

            {/* reCAPTCHA */}
            <div className="border border-gray-300 rounded-md p-3 flex items-center">
              <input
                type="checkbox"
                id="recaptcha"
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="recaptcha" className="ml-2 block text-sm text-gray-700">
                로봇이 아닙니다.
              </label>
              <div className="ml-auto">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="reCAPTCHA"
                  width={32}
                  height={32}
                  className="opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {isLoading ? "로그인 중..." : "Sign in"}
            </button>
          </form>

          {/* 추가 옵션 */}
          <div className="flex items-center justify-between text-sm">
            <Link href="/admin/help" className="text-blue-600 hover:text-blue-500">
              Need help?
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Data host region:</span>
              <select className="text-blue-600 bg-transparent border-none focus:outline-none">
                <option>South Korea</option>
                <option>United States</option>
                <option>Europe</option>
              </select>
            </div>
          </div>

          {/* 푸터 */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">© 2024 스타일카. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
