"use client"

import { memo } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  rating: number
  reviews: number
  image: string
  badge: string
  isNew?: boolean
}

interface FastProductCardProps {
  product: Product
  onClick: () => void
  priority?: boolean
}

const FastProductCard = memo(({ product, onClick, priority = false }: FastProductCardProps) => {
  return (
    <Card
      className="group hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">{product.badge}</Badge>
          {product.isNew && <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">NEW</Badge>}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-lg font-bold text-gray-900">{product.price}원</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}원</span>
              )}
            </div>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">장바구니 담기</Button>
        </div>
      </CardContent>
    </Card>
  )
})

FastProductCard.displayName = "FastProductCard"

export default FastProductCard
