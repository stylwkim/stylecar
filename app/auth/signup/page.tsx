"use client"

import type React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { AuthDemoNotice } from "@/components/auth-demo-notice"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
    allAgree: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAgreementChange = (key: string, checked: boolean) => {
    if (key === "allAgree") {
      setAgreements({
        terms: checked,
        privacy: checked,
        marketing: checked,
        allAgree: checked,
      })
    } else {
      const newAgreements = { ...agreements, [key]: checked }
      newAgreements.allAgree = newAgreements.terms && newAgreements.privacy && newAgreements.marketing
      setAgreements(newAgreements)
    }
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // 유효성 검사
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.")
      setIsLoading(false)
      return
    }

    if (!agreements.terms || !agreements.privacy) {
      setError("필수 약관에 동의해주세요.")
      setIsLoading(false)
      return
    }

    try {
      // 실제 구현에서는 회원가입 API 호출
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          agreements,
        }),
      })

      if (response.ok) {
        // 회원가입 성공 후 자동 로그인
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.ok) {
          router.push("/")
        } else {
          // 회원가입은 성공했지만 로그인 실패
          router.push("/auth/signin?message=signup_success")
        }
      } else {
        const data = await response.json()
        setError(data.message || "회원가입 중 오류가 발생했습니다.")
      }
    } catch (error) {
      setError("회원가입 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignUp = async (provider: string) => {
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn(provider, {
        callbackUrl: "/",
        redirect: false,
      })

      if (result?.error) {
        setError(`${provider} 회원가입 중 오류가 발생했습니다.`)
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (error) {
      setError(`${provider} 회원가입 중 오류가 발생했습니다.`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Create account.</h1>
        </div>

        <AuthDemoNotice />

        <div className="space-y-4">
          {/* 소셜 회원가입 버튼들 */}
          <div className="space-y-3">
            {/* Google 회원가입 버튼 */}
            <button
              onClick={() => handleSocialSignUp("google")}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-[#4285F4] text-white py-3 px-4 rounded-md hover:bg-[#3367d6] transition-colors disabled:opacity-50"
            >
              <div className="bg-white p-1 rounded">
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
              </div>
              <span className="font-medium">Sign up with Google</span>
            </button>

            {/* 카카오 회원가입 버튼 */}
            <button
              onClick={() => handleSocialSignUp("kakao")}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#FFEB3B] text-black py-3 px-4 rounded-md transition-colors disabled:opacity-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 3C7.03 3 3 6.14 3 10.1c0 2.52 1.65 4.74 4.1 6.05l-.96 3.52c-.07.25.18.46.4.33L10.4 17.8c.53.08 1.06.12 1.6.12 4.97 0 9-3.14 9-7.1S16.97 3 12 3z"
                />
              </svg>
              <span className="font-medium">카카오로 회원가입</span>
            </button>

            {/* 네이버 회원가입 버튼 */}
            <button
              onClick={() => handleSocialSignUp("naver")}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-[#03C75A] hover:bg-[#02B351] text-white py-3 px-4 rounded-md transition-colors disabled:opacity-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
              </svg>
              <span className="font-medium">네이버로 회원가입</span>
            </button>
          </div>

          {/* 구분선 */}
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">Or, sign up with your email</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* 이메일 회원가입 폼 */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            {error && (
              <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md border border-red-200">{error}</div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="홍길동"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Work Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="8자 이상 입력해주세요"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={8}
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="space-y-3 p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center space-x-2">
                <input
                  id="allAgree"
                  type="checkbox"
                  checked={agreements.allAgree}
                  onChange={(e) => handleAgreementChange("allAgree", e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="allAgree" className="text-sm font-medium text-gray-700">
                  전체 동의
                </label>
              </div>
              <hr className="border-gray-300" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={agreements.terms}
                      onChange={(e) => handleAgreementChange("terms", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      이용약관 동의 (필수)
                    </label>
                  </div>
                  <Link href="/terms" className="text-xs text-blue-600 hover:text-blue-500">
                    보기
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="privacy"
                      type="checkbox"
                      checked={agreements.privacy}
                      onChange={(e) => handleAgreementChange("privacy", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      개인정보 처리방침 동의 (필수)
                    </label>
                  </div>
                  <Link href="/privacy" className="text-xs text-blue-600 hover:text-blue-500">
                    보기
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="marketing"
                      type="checkbox"
                      checked={agreements.marketing}
                      onChange={(e) => handleAgreementChange("marketing", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="marketing" className="text-sm text-gray-600">
                      마케팅 정보 수신 동의 (선택)
                    </label>
                  </div>
                  <Link href="/marketing" className="text-xs text-blue-600 hover:text-blue-500">
                    보기
                  </Link>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !agreements.terms || !agreements.privacy}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? "회원가입 중..." : "Sign up"}
            </button>
          </form>

          {/* 로그인 링크 */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{" "}
              <Link href="/auth/signin" className="text-blue-600 hover:text-blue-500 font-medium">
                로그인
              </Link>
            </p>
          </div>

          {/* 추가 옵션 */}
          <div className="flex items-center justify-end text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Data host region:</span>
              <select className="text-blue-600 bg-transparent border-none focus:outline-none">
                <option>South Korea</option>
                <option>United States</option>
                <option>Europe</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
