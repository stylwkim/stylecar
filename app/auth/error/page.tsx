"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return {
          title: "서버 설정 오류",
          description: "인증 서버 설정에 문제가 있습니다. 관리자에게 문의해주세요.",
          suggestion: "잠시 후 다시 시도해주세요.",
        }
      case "AccessDenied":
        return {
          title: "접근 거부",
          description: "로그인 권한이 없거나 접근이 거부되었습니다.",
          suggestion: "계정 정보를 확인하고 다시 시도해주세요.",
        }
      case "Verification":
        return {
          title: "인증 실패",
          description: "이메일 인증 또는 계정 확인에 실패했습니다.",
          suggestion: "인증 링크를 다시 확인하거나 새로운 인증 요청을 해주세요.",
        }
      case "Default":
        return {
          title: "로그인 오류",
          description: "로그인 과정에서 알 수 없는 오류가 발생했습니다.",
          suggestion: "다른 로그인 방법을 시도하거나 잠시 후 다시 시도해주세요.",
        }
      case "Signin":
        return {
          title: "로그인 실패",
          description: "로그인 정보가 올바르지 않거나 계정에 문제가 있습니다.",
          suggestion: "아이디와 비밀번호를 확인하고 다시 시도해주세요.",
        }
      case "OAuthSignin":
        return {
          title: "소셜 로그인 오류",
          description: "소셜 로그인 과정에서 오류가 발생했습니다.",
          suggestion: "다른 로그인 방법을 시도하거나 잠시 후 다시 시도해주세요.",
        }
      case "OAuthCallback":
        return {
          title: "소셜 로그인 콜백 오류",
          description: "소셜 로그인 인증 과정에서 오류가 발생했습니다.",
          suggestion: "브라우저를 새로고침하고 다시 시도해주세요.",
        }
      case "OAuthCreateAccount":
        return {
          title: "계정 생성 오류",
          description: "소셜 로그인으로 계정을 생성하는 과정에서 오류가 발생했습니다.",
          suggestion: "이미 가입된 계정이 있는지 확인하거나 다른 방법으로 가입해주세요.",
        }
      case "EmailCreateAccount":
        return {
          title: "이메일 계정 생성 오류",
          description: "이메일로 계정을 생성하는 과정에서 오류가 발생했습니다.",
          suggestion: "이메일 주소를 확인하고 다시 시도해주세요.",
        }
      case "Callback":
        return {
          title: "콜백 오류",
          description: "인증 콜백 처리 과정에서 오류가 발생했습니다.",
          suggestion: "브라우저를 새로고침하고 처음부터 다시 시도해주세요.",
        }
      case "OAuthAccountNotLinked":
        return {
          title: "계정 연결 오류",
          description: "이미 다른 방법으로 가입된 이메일 주소입니다.",
          suggestion: "기존 로그인 방법을 사용하거나 계정을 연결해주세요.",
        }
      case "EmailSignin":
        return {
          title: "이메일 로그인 오류",
          description: "이메일 로그인 과정에서 오류가 발생했습니다.",
          suggestion: "이메일 주소를 확인하고 다시 시도해주세요.",
        }
      case "CredentialsSignin":
        return {
          title: "로그인 정보 오류",
          description: "입력하신 로그인 정보가 올바르지 않습니다.",
          suggestion: "아이디와 비밀번호를 다시 확인해주세요.",
        }
      case "SessionRequired":
        return {
          title: "로그인 필요",
          description: "이 페이지에 접근하려면 로그인이 필요합니다.",
          suggestion: "로그인 후 다시 시도해주세요.",
        }
      default:
        return {
          title: "인증 오류",
          description: "인증 과정에서 예상치 못한 오류가 발생했습니다.",
          suggestion: "잠시 후 다시 시도해주세요.",
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="mt-4 text-xl font-semibold text-gray-900">{errorInfo.title}</CardTitle>
            <CardDescription className="mt-2 text-sm text-gray-600">{errorInfo.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-800">
                <strong>해결 방법:</strong> {errorInfo.suggestion}
              </p>
            </div>

            {error && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <p className="text-xs text-gray-500">
                  <strong>오류 코드:</strong> {error}
                </p>
              </div>
            )}

            <div className="flex flex-col space-y-3">
              <Button asChild className="w-full">
                <Link href="/auth/signin">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  로그인 페이지로 돌아가기
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/">홈페이지로 이동</Link>
              </Button>

              <Button variant="ghost" onClick={() => window.location.reload()} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                페이지 새로고침
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                문제가 계속 발생하면{" "}
                <Link href="/support" className="text-blue-600 hover:text-blue-500">
                  고객지원
                </Link>
                으로 문의해주세요.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 데모 계정 안내 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">데모 계정 안내</CardTitle>
            <CardDescription>테스트용 계정으로 로그인해보세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="font-medium text-gray-900">일반 사용자:</p>
              <p className="text-gray-600">user@stylecar.co.kr / password</p>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">관리자:</p>
              <p className="text-gray-600">admin@stylecar.co.kr / admin123</p>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">테스트:</p>
              <p className="text-gray-600">test@stylecar.co.kr / test123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
