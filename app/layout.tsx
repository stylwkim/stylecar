import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ChatWidget } from "@/components/chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "스타일카 - 자동차 용품 전문 쇼핑몰",
  description: "카매트, 세차용품, 방향제, 보호필름 등 다양한 자동차 용품을 만나보세요",
  keywords: "자동차용품, 카매트, 세차용품, 방향제, 보호필름, 주차용품, 액세서리",
  authors: [{ name: "스타일카" }],
  creator: "스타일카",
  publisher: "스타일카",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "스타일카 - 자동차 용품 전문 쇼핑몰",
    description: "카매트, 세차용품, 방향제, 보호필름 등 다양한 자동차 용품을 만나보세요",
    url: "http://localhost:3000",
    siteName: "스타일카",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "스타일카 - 자동차 용품 전문 쇼핑몰",
    description: "카매트, 세차용품, 방향제, 보호필름 등 다양한 자동차 용품을 만나보세요",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
