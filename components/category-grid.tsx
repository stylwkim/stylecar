"use client"

import { useRouter } from "next/navigation"
import { Grid3X3, Car, Sparkles, Droplets, Shield, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const iconMap = {
  Grid3X3,
  Car,
  Sparkles,
  Droplets,
  Shield,
  Star,
}

interface Category {
  id: string
  name: string
  icon: keyof typeof iconMap
  color: string
  count: number
}

interface CategoryGridProps {
  categories: readonly Category[]
  selectedCategory: string
}

export function CategoryGrid({ categories, selectedCategory }: CategoryGridProps) {
  const router = useRouter()

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId !== selectedCategory) {
      router.push(`/categories?category=${categoryId}`)
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
      {categories.map((category) => {
        const IconComponent = iconMap[category.icon]
        return (
          <Card
            key={category.id}
            className={`hover:shadow-lg transition-all duration-200 cursor-pointer group ${
              selectedCategory === category.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <CardContent className="p-4 text-center">
              <div
                className={`inline-flex p-3 rounded-full ${category.color} group-hover:scale-110 transition-transform duration-200 mb-3`}
              >
                <IconComponent className="w-6 h-6" />
              </div>
              <h2 className="font-semibold text-gray-900 text-sm mb-1">{category.name}</h2>
              <p className="text-xs text-gray-500">{category.count}개</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
