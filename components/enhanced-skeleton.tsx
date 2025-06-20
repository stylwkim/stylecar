"use client"

interface SkeletonProps {
  className?: string
  variant?: "text" | "rectangular" | "circular"
  animation?: "pulse" | "wave"
  width?: string | number
  height?: string | number
}

export function Skeleton({
  className = "",
  variant = "rectangular",
  animation = "pulse",
  width,
  height,
}: SkeletonProps) {
  const baseClasses = "bg-gray-200"

  const variantClasses = {
    text: "rounded",
    rectangular: "rounded",
    circular: "rounded-full",
  }

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-wave",
  }

  const style = {
    width: width || "100%",
    height: height || (variant === "text" ? "1em" : "100%"),
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  )
}

// 제품 카드 스켈레톤
export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <Skeleton height={200} className="w-full" />
      <div className="p-4 space-y-3">
        <Skeleton height={16} width="60%" />
        <Skeleton height={20} width="80%" />
        <div className="flex items-center space-x-2">
          <Skeleton height={16} width={80} variant="circular" />
          <Skeleton height={16} width={40} />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton height={20} width={100} />
          <Skeleton height={16} width={60} />
        </div>
        <Skeleton height={36} className="w-full" />
      </div>
    </div>
  )
}

// 카테고리 그리드 스켈레톤
export function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <Skeleton height={48} width={48} variant="circular" className="mx-auto mb-3" />
          <Skeleton height={16} width="70%" className="mx-auto mb-1" />
          <Skeleton height={12} width="40%" className="mx-auto" />
        </div>
      ))}
    </div>
  )
}
