"use client"

import type React from "react"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PrefetchLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function PrefetchLink({ href, children, className }: PrefetchLinkProps) {
  const router = useRouter()

  useEffect(() => {
    // 모든 카테고리 페이지를 미리 로드
    const prefetchCategories = async () => {
      const categories = ["all", "carmat", "cleaning", "fragrance", "protection", "parking", "accessories"]

      for (const category of categories) {
        const url = `/categories?category=${category}`
        await router.prefetch(url)
      }
    }

    prefetchCategories()
  }, [router])

  return (
    <Link href={href} className={className} prefetch={true}>
      {children}
    </Link>
  )
}
